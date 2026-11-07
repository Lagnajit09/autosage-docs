import React, { type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "./styles.module.css";

/**
 * Renders assistant answers as GitHub-flavoured markdown: paragraphs, headings,
 * lists (nested too), tables, code, blockquotes, rules, strikethrough, task
 * lists and autolinks. It's the same stack the AutoSage app's Autobot chat uses
 * (react-markdown + remark-gfm), so an answer renders the same in both places.
 *
 * Safe for streamed LLM output: react-markdown builds React elements and never
 * renders raw HTML (no rehype-raw), so any HTML in an answer shows as text, and
 * its default URL transform drops unsafe link protocols such as `javascript:`.
 */

const components: Components = {
  // Links to other sites open in a new tab; links into the docs stay in this one.
  // An unsafe link arrives with its href stripped, and is shown as plain text.
  a: ({ node: _node, href, children, ...rest }) => {
    if (!href) return <span>{children}</span>;
    const external = /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  },
  // A wide table scrolls inside the bubble instead of stretching the panel.
  table: ({ node: _node, ...rest }) => (
    <div className={styles.tableWrap}>
      <table {...rest} />
    </div>
  ),
  // Answers shouldn't carry images; if one slips through, show its alt text.
  img: ({ alt }) => (alt ? <span>{alt}</span> : null),
};

export const renderMarkdown = (text: string): ReactNode => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
    {text}
  </ReactMarkdown>
);
