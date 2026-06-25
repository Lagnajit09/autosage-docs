/**
 * SSE reader for the public docs-chat endpoint (Pillar A / plan 3.2b).
 *
 * The endpoint `POST /api/ai/docs/chat/stream/` returns `text/event-stream`,
 * so we read the body manually rather than awaiting JSON. The frame format and
 * event vocabulary mirror `autobot/streaming/sse.py`:
 *
 *     event: <name>\n
 *     data:  <compact-json>\n
 *     \n
 *
 * Events on THIS (public) path: `token`, `tool_call_start`, `tool_result`,
 * `done`, `error`. Note it does NOT emit `stream_start`, and `done` carries
 * `{content}` (not a Django Message — no DB row exists for anonymous turns).
 *
 * Parsing is intentionally tolerant: unknown event names are ignored (so a
 * future server-side addition can't break the widget) and an HTTP-level
 * failure is surfaced as a synthetic `error` event so callers have a single
 * failure path with no try/catch.
 */

export interface DocsSource {
  title: string;
  url: string;
  heading_path?: string;
}

export interface DocsTokenEvent {
  type: "token";
  content: string;
}

export interface DocsToolCallStartEvent {
  type: "tool_call_start";
  id: string;
  name: string;
}

export interface DocsToolResultEvent {
  type: "tool_result";
  id: string;
  name: string;
  /** Sources extracted from a `search_docs` result; empty for errors. */
  sources: DocsSource[];
}

export interface DocsDoneEvent {
  type: "done";
  content: string;
}

export interface DocsErrorEvent {
  type: "error";
  message: string;
  code: string | null;
}

export type DocsStreamEvent =
  | DocsTokenEvent
  | DocsToolCallStartEvent
  | DocsToolResultEvent
  | DocsDoneEvent
  | DocsErrorEvent;

export interface DocsChatBody {
  session_id: string;
  message: string;
}

export interface StreamOptions {
  signal?: AbortSignal;
}

interface ParsedFrame {
  event: string;
  data: string;
}

/** Parse one SSE frame (text between blank lines); null for keep-alives. */
const parseFrame = (frame: string): ParsedFrame | null => {
  let event = "message";
  let data = "";
  for (const line of frame.split("\n")) {
    if (line.startsWith("event:")) {
      event = line.slice("event:".length).trim();
    } else if (line.startsWith("data:")) {
      if (data) data += "\n";
      data += line.slice("data:".length).trim();
    }
  }
  if (!data) return null;
  return { event, data };
};

/** Pull source links out of a `search_docs` tool result. The result is the
 * tool's data dict: `{results:[{title,url,heading_path,snippet}]}` on success
 * or `{error: "..."}` on failure (no sources in that case). */
const extractSources = (result: unknown): DocsSource[] => {
  if (!result || typeof result !== "object") return [];
  const results = (result as Record<string, unknown>).results;
  if (!Array.isArray(results)) return [];
  const out: DocsSource[] = [];
  for (const r of results) {
    if (r && typeof r === "object") {
      const url = String((r as Record<string, unknown>).url ?? "");
      if (!url) continue;
      out.push({
        title: String((r as Record<string, unknown>).title ?? ""),
        url,
        heading_path: String((r as Record<string, unknown>).heading_path ?? ""),
      });
    }
  }
  return out;
};

/** Turn a parsed frame into a typed event; null for unrecognized names. */
const buildEvent = (frame: ParsedFrame): DocsStreamEvent | null => {
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(frame.data);
  } catch {
    return {
      type: "error",
      message: `Malformed event payload: ${frame.data.slice(0, 120)}`,
      code: "parse_error",
    };
  }

  switch (frame.event) {
    case "token":
      return { type: "token", content: String(payload.content ?? "") };
    case "tool_call_start":
      return {
        type: "tool_call_start",
        id: String(payload.id ?? ""),
        name: String(payload.name ?? ""),
      };
    case "tool_result":
      return {
        type: "tool_result",
        id: String(payload.id ?? ""),
        name: String(payload.name ?? ""),
        sources: extractSources(payload.result),
      };
    case "done":
      return { type: "done", content: String(payload.content ?? "") };
    case "error":
      return {
        type: "error",
        message: String(payload.message ?? "Unknown stream error."),
        code: payload.code == null ? null : String(payload.code),
      };
    default:
      return null;
  }
};

/**
 * Open an SSE docs-chat stream and invoke `onEvent` once per frame, in order.
 * Resolves when the stream terminates (`done`/`error`, server close, or abort).
 * Initial HTTP failures are surfaced as a synthetic `error` event.
 */
export const streamDocsChat = async (
  apiUrl: string,
  body: DocsChatBody,
  onEvent: (event: DocsStreamEvent) => void,
  options: StreamOptions = {},
): Promise<void> => {
  const base = apiUrl.replace(/\/+$/, "");
  let response: Response;
  try {
    response = await fetch(`${base}/api/ai/docs/chat/stream/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(body),
      signal: options.signal,
    });
  } catch (e) {
    if ((e as Error)?.name === "AbortError") return;
    onEvent({
      type: "error",
      message:
        "Could not reach the docs assistant. Check your connection and try again.",
      code: "network_error",
    });
    return;
  }

  if (!response.ok || !response.body) {
    onEvent({
      type: "error",
      message: `The docs assistant returned an error (HTTP ${response.status}).`,
      code: `http_${response.status}`,
    });
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Frames are separated by a blank line. Normalize CRLF first.
      let sep: number;
      buffer = buffer.replace(/\r\n/g, "\n");
      while ((sep = buffer.indexOf("\n\n")) !== -1) {
        const rawFrame = buffer.slice(0, sep);
        buffer = buffer.slice(sep + 2);
        const parsed = parseFrame(rawFrame);
        if (!parsed) continue;
        const event = buildEvent(parsed);
        if (event) onEvent(event);
      }
    }
  } catch (e) {
    if ((e as Error)?.name === "AbortError") return;
    onEvent({
      type: "error",
      message: "The connection to the docs assistant was interrupted.",
      code: "stream_interrupted",
    });
  }
};
