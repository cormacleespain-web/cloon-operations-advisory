"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

import { cn } from "@/lib/utils";

export function Dropzone({
  onFiles,
  uploading,
}: {
  onFiles: (files: FileList) => void;
  uploading: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
      }}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors",
        dragOver && "border-sage/60 bg-sage/5",
        uploading && "pointer-events-none opacity-60"
      )}
    >
      <UploadCloud className="size-8 text-muted-foreground" strokeWidth={1.5} aria-hidden />
      <p className="text-sm text-foreground">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="font-medium text-sage underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Choose files
        </button>{" "}
        or drag and drop
      </p>
      <p className="text-xs text-muted-foreground">
        Images or PDFs, up to 10MB {uploading && "— uploading…"}
      </p>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,application/pdf"
        className="sr-only"
        onChange={(e) => {
          if (e.target.files?.length) onFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
