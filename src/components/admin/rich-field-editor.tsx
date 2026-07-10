"use client";

import { useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Link2, Unlink } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { href as hrefSchema } from "@/lib/content/schemas";
import type { RichInline, RichText } from "@/lib/content/schemas";

const extensions = [
  StarterKit.configure({
    blockquote: false,
    bulletList: false,
    code: false,
    codeBlock: false,
    dropcursor: false,
    gapcursor: false,
    hardBreak: false,
    heading: false,
    horizontalRule: false,
    listItem: false,
    listKeymap: false,
    orderedList: false,
    strike: false,
    underline: false,
    trailingNode: false,
    link: { openOnClick: false },
  }),
];

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
        active && "bg-sage/10 text-sage"
      )}
    >
      {children}
    </button>
  );
}

function LinkButton({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | undefined>();
  const active = editor.isActive("link");

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setUrl((editor.getAttributes("link").href as string | undefined) ?? "");
          setError(undefined);
        }
      }}
    >
      <PopoverTrigger
        render={
          <button
            type="button"
            aria-pressed={active}
            aria-label="Link"
            title="Link"
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
              active && "bg-sage/10 text-sage"
            )}
          />
        }
      >
        <Link2 className="size-3.5" strokeWidth={1.75} aria-hidden />
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex items-center gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…"
            className="h-8 flex-1"
            aria-label="Link address"
          />
          <button
            type="button"
            onClick={() => {
              const parsed = hrefSchema.safeParse(url);
              if (!parsed.success) {
                setError(parsed.error.issues[0]?.message);
                return;
              }
              editor.chain().focus().extendMarkRange("link").setLink({ href: parsed.data }).run();
              setOpen(false);
            }}
            className="inline-flex h-8 items-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Apply
          </button>
          {active && (
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setOpen(false);
              }}
              aria-label="Remove link"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-destructive"
            >
              <Unlink className="size-4" strokeWidth={1.75} aria-hidden />
            </button>
          )}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </PopoverContent>
    </Popover>
  );
}

export function RichFieldEditor({
  value,
  onChange,
  inline = false,
  className,
  "aria-label": ariaLabel,
}: {
  value: RichText | RichInline;
  onChange: (value: RichText | RichInline) => void;
  inline?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: value,
    editorProps: {
      attributes: {
        class: "min-h-[2.25rem] focus:outline-none",
        ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
      },
      handleKeyDown: inline ? (_view, event) => event.key === "Enter" : undefined,
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON() as RichText | RichInline);
    },
  });

  if (!editor) return null;

  return (
    <div
      className={cn(
        "rounded-xl border border-input bg-background transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        className
      )}
    >
      <div className="flex items-center gap-0.5 border-b border-border px-1.5 py-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="Bold"
        >
          <Bold className="size-3.5" strokeWidth={1.75} aria-hidden />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="Italic"
        >
          <Italic className="size-3.5" strokeWidth={1.75} aria-hidden />
        </ToolbarButton>
        <LinkButton editor={editor} />
      </div>
      <EditorContent editor={editor} className="px-3 py-2 text-base [&_.tiptap]:outline-none" />
    </div>
  );
}
