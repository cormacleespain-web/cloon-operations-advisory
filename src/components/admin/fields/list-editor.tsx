"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from "lucide-react";

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

const controlClass =
  "inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring";

export function ListEditor<T>({
  items,
  onChange,
  renderItem,
  createItem,
  itemLabel,
  min = 0,
  max = Infinity,
  addLabel = "Add",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  createItem: () => T;
  itemLabel: (item: T, index: number) => string;
  min?: number;
  max?: number;
  addLabel?: string;
}) {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  function duplicate(i: number) {
    if (items.length >= max) return;
    const next = [...items];
    next.splice(i + 1, 0, structuredClone(items[i]));
    onChange(next);
  }
  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const label = itemLabel(item, i);
        return (
          <div key={i} className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label={`Move ${label} up`}
                  className={controlClass}
                >
                  <ArrowUp className="size-4" strokeWidth={1.75} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  aria-label={`Move ${label} down`}
                  className={controlClass}
                >
                  <ArrowDown className="size-4" strokeWidth={1.75} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => duplicate(i)}
                  disabled={items.length >= max}
                  aria-label={`Duplicate ${label}`}
                  className={controlClass}
                >
                  <Copy className="size-4" strokeWidth={1.75} aria-hidden />
                </button>
                <AlertDialog
                  open={deleteIndex === i}
                  onOpenChange={(next) => setDeleteIndex(next ? i : null)}
                >
                  <AlertDialogTrigger
                    render={
                      <button
                        type="button"
                        disabled={items.length <= min}
                        aria-label={`Delete ${label}`}
                        className={`${controlClass} hover:text-destructive`}
                      />
                    }
                  >
                    <Trash2 className="size-4" strokeWidth={1.75} aria-hidden />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete {label}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This won&apos;t affect the live site until you publish.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={() => {
                          setDeleteIndex(null);
                          remove(i);
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            {renderItem(item, i)}
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => items.length < max && onChange([...items, createItem()])}
        disabled={items.length >= max}
        className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Plus className="size-4" strokeWidth={1.75} aria-hidden />
        {addLabel}
      </button>
    </div>
  );
}
