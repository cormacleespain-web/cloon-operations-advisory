import type { ReactNode } from "react";

import { renderTextNodes } from "@/components/rich-text";
import type { ParagraphNode, TextNode } from "@/components/rich-text";
import { cn } from "@/lib/utils";
import type { RichInline, RichText as RichTextDoc } from "@/lib/content/schemas";

/** Splits on whitespace, keeping each run of whitespace as its own unwrapped part. */
function wordSpans(text: string, keyPrefix: string): ReactNode {
  return text.split(/(\s+)/).map((part, i) =>
    part.trim() === "" ? (
      part
    ) : (
      <span key={`${keyPrefix}-${i}`} className="ink-word">
        {part}
      </span>
    )
  );
}

function renderInkParagraph(paragraph: ParagraphNode | undefined, keyPrefix: string): ReactNode {
  const nodes = paragraph?.content as TextNode[] | undefined;
  return renderTextNodes(nodes, {
    renderLeaf: (text, key) => wordSpans(text, `${keyPrefix}-${key}`),
    italicClassName: "font-display italic",
  });
}

/**
 * Progressive scroll-linked "ink-in" on a rich text doc — each word starts
 * muted and fills to full colour as it crosses the viewport (CSS
 * `animation-timeline: view()`, no JS). Server component, zero client JS.
 * Visual layer is `aria-hidden`; a plain-text `sr-only` duplicate carries the
 * accessible content for screen readers and the Firefox/no-support/
 * reduced-motion fallback (all render fully opaque via the `@supports` gate
 * in globals.css, so the visual layer never looks broken on its own).
 *
 * Renders one block-level span per paragraph (each taking `className`, same
 * contract as RichText's per-<p> className) — not a wrapping element, so it
 * composes safely whether used standalone or inline inside a heading.
 */
export function ScrollInk({
  doc,
  className,
}: {
  doc: RichTextDoc | RichInline;
  className?: string;
}) {
  const paragraphs = (doc.content ?? []) as ParagraphNode[];
  const plainText = paragraphs
    .map((p) => (p.content ?? []).map((n) => (n as TextNode).text ?? "").join(""))
    .join(" ");

  return (
    <>
      <span aria-hidden>
        {paragraphs.map((p, i) =>
          p.type === "paragraph" ? (
            <span key={i} className={cn("block", className)}>
              {renderInkParagraph(p, `p${i}`)}
            </span>
          ) : null
        )}
      </span>
      <span className="sr-only">{plainText}</span>
    </>
  );
}
