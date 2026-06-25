import React, { type ReactNode } from "react";

/**
 * Minimal, SAFE markdown renderer for assistant answers (Pillar A / plan 3.2).
 *
 * Why hand-rolled rather than react-markdown/marked: the docs site has no
 * markdown lib as a direct dependency, and the answers only ever use a small
 * subset (paragraphs, fenced code, bullet/number lists, and inline
 * bold/italic/code/links). Crucially this renders to React ELEMENTS — it never
 * uses `dangerouslySetInnerHTML`, so streamed LLM/tool output can't inject
 * markup. Anything unrecognized degrades to plain text.
 *
 * This is deliberately not a spec-complete parser; it's just enough to make
 * chat answers readable. Links open in a new tab with `rel=noopener`.
 */

let keySeq = 0;
const nextKey = () => `md-${keySeq++}`;

// ── Inline parsing: code spans, links, bold, italic ──────────────────────
// Order matters: inline code is matched first so its contents aren't further
// formatted, then links, then bold, then italic.
const renderInline = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let rest = text;

  // Combined matcher; we scan left-to-right finding the earliest match.
  const patterns: {
    re: RegExp;
    build: (m: RegExpExecArray) => ReactNode;
  }[] = [
    {
      // `code`
      re: /`([^`]+)`/,
      build: (m) => <code key={nextKey()}>{m[1]}</code>,
    },
    {
      // [label](url) — only http(s) or root-relative links are linkified.
      re: /\[([^\]]+)\]\(([^)\s]+)\)/,
      build: (m) => {
        const href = m[2];
        const safe = /^(https?:\/\/|\/)/i.test(href);
        if (!safe) return <span key={nextKey()}>{m[1]}</span>;
        const external = /^https?:\/\//i.test(href);
        return (
          <a
            key={nextKey()}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {m[1]}
          </a>
        );
      },
    },
    {
      // **bold**
      re: /\*\*([^*]+)\*\*/,
      build: (m) => <strong key={nextKey()}>{renderInline(m[1])}</strong>,
    },
    {
      // *italic* or _italic_
      re: /(?:\*([^*]+)\*|_([^_]+)_)/,
      build: (m) => <em key={nextKey()}>{renderInline(m[1] ?? m[2])}</em>,
    },
  ];

  // Guard against pathological inputs.
  let guard = 0;
  while (rest && guard++ < 5000) {
    let best: { index: number; len: number; node: ReactNode } | null = null;
    for (const { re, build } of patterns) {
      const m = re.exec(rest);
      if (m && (best === null || m.index < best.index)) {
        best = { index: m.index, len: m[0].length, node: build(m) };
      }
    }
    if (!best) {
      nodes.push(rest);
      break;
    }
    if (best.index > 0) nodes.push(rest.slice(0, best.index));
    nodes.push(best.node);
    rest = rest.slice(best.index + best.len);
  }
  return nodes;
};

// ── Block parsing: code fences, lists, paragraphs ────────────────────────
export const renderMarkdown = (text: string): ReactNode => {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block ```lang ... ```
    const fence = /^```/.test(line.trim());
    if (fence) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing fence (if present)
      blocks.push(
        <pre key={nextKey()}>
          <code>{codeLines.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    // Bullet / numbered list (consecutive list lines).
    const isBullet = /^\s*[-*]\s+/.test(line);
    const isNumber = /^\s*\d+\.\s+/.test(line);
    if (isBullet || isNumber) {
      const items: ReactNode[] = [];
      const ordered = isNumber;
      while (
        i < lines.length &&
        (ordered ? /^\s*\d+\.\s+/.test(lines[i]) : /^\s*[-*]\s+/.test(lines[i]))
      ) {
        const item = lines[i].replace(
          ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/,
          "",
        );
        items.push(<li key={nextKey()}>{renderInline(item)}</li>);
        i++;
      }
      blocks.push(
        ordered ? (
          <ol key={nextKey()}>{items}</ol>
        ) : (
          <ul key={nextKey()}>{items}</ul>
        ),
      );
      continue;
    }

    // Blank line → block separator.
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph: gather consecutive non-blank, non-special lines.
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^```/.test(lines[i].trim()) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(<p key={nextKey()}>{renderInline(para.join(" "))}</p>);
  }

  return <>{blocks}</>;
};
