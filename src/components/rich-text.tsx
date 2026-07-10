import type { ReactNode } from "react";

import type { RichInline, RichText as RichTextDoc } from "@/lib/content/schemas";

type Mark = { type: string; attrs?: { href?: string } };
type TextNode = { type: string; text?: string; marks?: Mark[] };
type ParagraphNode = { type: string; content?: TextNode[] };

const SAFE_HREF = /^(https?:\/\/|mailto:|#|\/)/;

function renderTextNodes(nodes: TextNode[] | undefined): ReactNode {
  if (!nodes) return null;
  return nodes.map((node, i) => {
    if (node.type !== "text" || typeof node.text !== "string") return null;
    let content: ReactNode = node.text;
    for (const mark of node.marks ?? []) {
      if (mark.type === "bold") {
        content = <strong key={`b-${i}`}>{content}</strong>;
      } else if (mark.type === "italic") {
        content = (
          <span key={`i-${i}`} className="italic font-light">
            {content}
          </span>
        );
      } else if (mark.type === "link" && mark.attrs?.href && SAFE_HREF.test(mark.attrs.href)) {
        const external = mark.attrs.href.startsWith("http");
        content = (
          <a
            key={`l-${i}`}
            href={mark.attrs.href}
            className="underline underline-offset-4 transition-colors hover:text-sage focus-visible:text-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {content}
          </a>
        );
      }
    }
    return content;
  });
}

/** Renders allowlisted multi-paragraph rich text (paragraph/text/bold/italic/link only). */
export function RichText({ doc, className }: { doc: RichTextDoc; className?: string }) {
  const paragraphs = (doc.content ?? []) as ParagraphNode[];
  return (
    <>
      {paragraphs.map((p, i) =>
        p.type === "paragraph" ? (
          <p key={i} className={className}>
            {renderTextNodes(p.content)}
          </p>
        ) : null
      )}
    </>
  );
}

/** Renders a single-line rich doc inline (for use inside headings) — no wrapping <p>. */
export function RichInline({ doc }: { doc: RichInline }) {
  const paragraph = doc.content?.[0] as ParagraphNode | undefined;
  return <>{renderTextNodes(paragraph?.content)}</>;
}
