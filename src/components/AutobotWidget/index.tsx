import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { streamDocsChat, type DocsSource } from "./stream";
import { renderMarkdown } from "./markdown";
import styles from "./styles.module.css";

// Public docs assistant — an expandable/collapsible RIGHT sidebar that shrinks
// the docs content when open (Pillar A / plan 3.2). Mounted site-wide via the
// swizzled Root (3.1). It talks ONLY to the public, no-Clerk endpoint
// `POST /api/ai/docs/chat/stream/` built in Phase 2.
//
// Layout: the panel is position:fixed in a reserved right gutter; opening it
// sets `data-autobot-open` on <html>, and the CSS module pads <html> by the
// panel width on wide screens so the whole page reflows narrower. Below 996px
// the gutter is dropped and the panel overlays full-width (see styles).

const SESSION_COOKIE_NAME = "autobot_docs_session_id";
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days, in seconds
const FALLBACK_API_URL = "https://autosagex-api.duckdns.org";

type Role = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: Role;
  /** Live-updated as tokens stream in for assistant turns. */
  content: string;
  /** Source doc links surfaced from search_docs tool results. */
  sources?: DocsSource[];
  /** Set when this assistant turn ended in an error frame. */
  error?: boolean;
}

const mintSessionId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `s-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;

/** Read a cookie value by name, or null. */
const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const prefix = `${name}=`;
  for (const part of document.cookie.split(";")) {
    const c = part.trim();
    if (c.startsWith(prefix)) return decodeURIComponent(c.slice(prefix.length));
  }
  return null;
};

/** Stable opaque session id (satisfies the server's [A-Za-z0-9_-]{8,128}).
 *
 * Stored in a FIRST-PARTY cookie rather than localStorage. Note it is NOT
 * HttpOnly on purpose: the widget must read the value to send it in the
 * request body (the server reads session_id from the JSON body, not a
 * cookie), and HttpOnly would make it unreadable to JS. That's an acceptable
 * trade here because session_id is not a credential — it only names an
 * anonymous Redis key server-side, carries no authz weight, and a stolen one
 * grants nothing beyond continuing an anonymous docs chat. The cookie is
 * scoped tightly: SameSite=Lax (limits cross-site sends / CSRF surface),
 * Secure on https, Path=/, ~30-day expiry. */
const getSessionId = (): string => {
  if (typeof document === "undefined") return "";
  const existing = readCookie(SESSION_COOKIE_NAME);
  // Re-validate against the server's charset contract; mint fresh if a stale
  // or malformed value somehow ended up in the cookie.
  if (existing && /^[A-Za-z0-9_-]{8,128}$/.test(existing)) return existing;

  const fresh = mintSessionId();
  try {
    const secure = window.location?.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      `${SESSION_COOKIE_NAME}=${encodeURIComponent(fresh)}` +
      `; Max-Age=${SESSION_COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  } catch {
    // Cookies blocked (private mode / disabled) — fall through; the in-memory
    // value still works for the lifetime of this page load.
  }
  return fresh;
};

const newId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function AutobotWidget(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  // Resolve under the configured baseUrl so the asset path is correct even if
  // the site is served from a sub-path.
  const iconUrl = useBaseUrl("/img/autobot.svg");

  // API origin is build-time configurable (plan 3.3 wires customFields); until
  // then this falls back to the deployed default so 3.2 runs standalone.
  const apiUrl =
    (siteConfig.customFields?.autobotApiUrl as string | undefined) ||
    FALLBACK_API_URL;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  /** Transient status line ("Searching the docs…") shown during a tool call. */
  const [status, setStatus] = useState<string | null>(null);

  const sessionIdRef = useRef<string>("");
  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  // Drive the page-shrink purely via a data attribute on <html>; the CSS
  // module owns the actual padding + transition. Clean up on unmount so we
  // never leave the page padded.
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.setAttribute("data-autobot-open", "true");
    else root.removeAttribute("data-autobot-open");
    return () => root.removeAttribute("data-autobot-open");
  }, [open]);

  // Autoscroll to the latest content as tokens arrive.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, status]);

  // Abort any in-flight stream if the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const focusInput = useCallback(() => {
    // Defer to after the open transition so focus lands on a visible field.
    window.setTimeout(() => textareaRef.current?.focus(), 60);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
    focusInput();
  }, [focusInput]);

  const handleClose = useCallback(() => setOpen(false), []);

  const autosize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || busy) return;

    const userMsg: ChatMessage = { id: newId(), role: "user", content: text };
    const assistantId = newId();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setBusy(true);
    setStatus(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const updateAssistant = (patch: Partial<ChatMessage>) =>
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, ...patch } : m)),
      );

    const controller = new AbortController();
    abortRef.current = controller;
    let acc = "";
    const collectedSources: DocsSource[] = [];

    await streamDocsChat(
      apiUrl,
      { session_id: sessionIdRef.current, message: text },
      (event) => {
        switch (event.type) {
          case "token":
            acc += event.content;
            updateAssistant({ content: acc });
            setStatus(null);
            break;
          case "tool_call_start":
            setStatus("Searching the docs…");
            break;
          case "tool_result": {
            // search_docs returns {results:[{title,url,heading_path,snippet}]}.
            for (const src of event.sources) {
              if (src.url && !collectedSources.some((s) => s.url === src.url)) {
                collectedSources.push(src);
              }
            }
            updateAssistant({ sources: [...collectedSources] });
            break;
          }
          case "done":
            // `done` carries {content} — authoritative over concatenated
            // tokens (whitespace may have been trimmed server-side).
            updateAssistant({
              content: event.content || acc,
              sources: collectedSources.length
                ? [...collectedSources]
                : undefined,
            });
            setStatus(null);
            break;
          case "error":
            updateAssistant({
              content: event.message,
              error: true,
            });
            setStatus(null);
            break;
        }
      },
      { signal: controller.signal },
    );

    setBusy(false);
    setStatus(null);
    abortRef.current = null;
  }, [apiUrl, busy, input]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.toggleButton} ${
          open ? styles.toggleButtonHidden : ""
        }`}
        onClick={handleOpen}
        aria-label="Ask Autobot — open the docs assistant"
        aria-expanded={open}
      >
        <img
          className={styles.toggleIcon}
          src={iconUrl}
          alt=""
          aria-hidden="true"
        />
      </button>

      <aside
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="complementary"
        aria-label="Autosage docs assistant"
        aria-hidden={!open}
      >
        <div className={styles.header}>
          <span className={styles.headerIcon} aria-hidden="true">
            <img className={styles.headerIconImg} src={iconUrl} alt="" />
          </span>
          <div>
            <p className={styles.headerTitle}>Ask Autobot</p>
            <p className={styles.headerSub}>
              Grounded in Autosage Documentation
            </p>
          </div>
          <span className={styles.headerSpacer} />
          <button
            type="button"
            className={styles.headerButton}
            onClick={handleClose}
            aria-label="Close the docs assistant"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.messages}>
          {messages.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyTitle}>Hi, I'm Autobot 👋</div>
              Ask me anything about Autosage — how to create a workflow, run a
              script, set up a trigger, and more. I answer from the docs and
              link my sources.
            </div>
          ) : (
            messages.map((m) =>
              m.role === "user" ? (
                <div
                  key={m.id}
                  className={`${styles.message} ${styles.messageUser}`}
                >
                  <div className={`${styles.bubble} ${styles.bubbleUser}`}>
                    {m.content}
                  </div>
                </div>
              ) : (
                <div
                  key={m.id}
                  className={`${styles.message} ${styles.messageAssistant}`}
                >
                  <div
                    className={`${styles.bubble} ${styles.bubbleAssistant} ${
                      m.error ? styles.errorBubble : ""
                    }`}
                  >
                    {m.content
                      ? renderMarkdown(m.content)
                      : status
                        ? null
                        : "…"}
                  </div>
                  {m.sources && m.sources.length > 0 && (
                    <div className={styles.sources}>
                      <span className={styles.sourcesLabel}>Sources</span>
                      {m.sources.map((s) => (
                        <a
                          key={s.url}
                          className={styles.sourceLink}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.title || s.url}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )
          )}

          {status && (
            <div className={styles.status}>
              <span className={styles.spinner} aria-hidden="true" />
              {status}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.composer}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            placeholder="Ask about Autosage…"
            value={input}
            rows={1}
            onChange={(e) => {
              setInput(e.target.value);
              autosize();
            }}
            onKeyDown={onKeyDown}
            disabled={busy}
            aria-label="Your question"
          />
          <button
            type="button"
            className={styles.sendButton}
            onClick={() => void send()}
            disabled={busy || !input.trim()}
            aria-label="Send"
          >
            <svg
              className={styles.sendIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <p className={styles.disclaimer}>
          Autobot can make mistakes. Please verify the response.
        </p>
      </aside>
    </>
  );
}
