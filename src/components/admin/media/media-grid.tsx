"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import type { MediaRow } from "@/db/schema";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaGrid({
  items,
  onSelect,
  onDelete,
  onAltChange,
}: {
  items: MediaRow[];
  onSelect?: (item: MediaRow) => void;
  onDelete?: (id: number) => void;
  onAltChange?: (id: number, alt: string) => void;
}) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        No files yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const isImage = item.mimeType.startsWith("image/");
        return (
          <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card">
            <button
              type="button"
              onClick={() => onSelect?.(item)}
              disabled={!onSelect}
              aria-label={onSelect ? `Use ${item.filename}` : undefined}
              className="relative flex aspect-4/3 w-full items-center justify-center bg-muted disabled:cursor-default"
            >
              {isImage ? (
                <Image
                  src={item.url}
                  alt={item.alt || item.filename}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, 45vw"
                />
              ) : (
                <FileText className="size-10 text-muted-foreground" strokeWidth={1.25} aria-hidden />
              )}
              {onSelect && (
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 text-sm font-medium text-transparent transition-colors hover:bg-foreground/40 hover:text-background">
                  Use this file
                </span>
              )}
            </button>

            <div className="space-y-2 p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground" title={item.filename}>
                    {item.filename}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatSize(item.size)}
                    {item.width && item.height ? ` · ${item.width}×${item.height}` : ""}
                  </p>
                </div>
                {onDelete && (
                  <AlertDialog
                    open={deleteId === item.id}
                    onOpenChange={(next) => setDeleteId(next ? item.id : null)}
                  >
                    <AlertDialogTrigger
                      render={
                        <button
                          type="button"
                          aria-label={`Delete ${item.filename}`}
                          className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-destructive focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
                        />
                      }
                    >
                      <Trash2 className="size-4" strokeWidth={1.75} aria-hidden />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {item.filename}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This removes the file everywhere it&apos;s used on the site. This can&apos;t
                          be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => {
                            setDeleteId(null);
                            onDelete(item.id);
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
              {onAltChange && isImage && (
                <Input
                  defaultValue={item.alt}
                  placeholder="Alt text for screen readers"
                  onBlur={(e) => onAltChange(item.id, e.target.value)}
                  className="h-9 rounded-lg bg-background text-sm"
                  aria-label={`Alt text for ${item.filename}`}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
