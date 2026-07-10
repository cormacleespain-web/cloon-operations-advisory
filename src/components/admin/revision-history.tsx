"use client";

import { useEffect, useState, useTransition } from "react";
import { History } from "lucide-react";
import { toast } from "sonner";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
import { Button } from "@/components/ui/button";
import { listRevisions, restoreRevision } from "@/app/actions/content";
import type { SectionContent, SectionKey } from "@/lib/content/schemas";

export function RevisionHistory<K extends SectionKey>({
  sectionKey,
  onRestore,
}: {
  sectionKey: K;
  onRestore: (value: SectionContent<K>) => void;
}) {
  const [open, setOpen] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [revisions, setRevisions] = useState<{ id: number; createdAt: Date }[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isLoading, startLoadingTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    startLoadingTransition(async () => {
      const rows = await listRevisions(sectionKey);
      setRevisions(rows);
    });
  }, [open, sectionKey]);

  function restore(id: number) {
    startTransition(async () => {
      const result = await restoreRevision(sectionKey, id);
      if (result.status === "error") {
        toast.error(result.message);
        return;
      }
      onRestore(result.data);
      toast.success(result.message);
      setOpen(false);
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
        }
      >
        <History className="size-4" strokeWidth={1.75} aria-hidden />
        History
      </SheetTrigger>
      <SheetContent side="right" className="w-96">
        <SheetHeader className="border-b">
          <SheetTitle>Published versions</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {!isLoading && revisions.length === 0 && (
            <p className="text-sm text-muted-foreground">Nothing published yet.</p>
          )}
          <ul className="space-y-2">
            {revisions.map((rev, i) => (
              <li
                key={rev.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {i === 0 ? "Current" : `Version ${revisions.length - i}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(rev.createdAt).toLocaleString("en-IE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {i !== 0 && (
                  <AlertDialog
                    open={confirmId === rev.id}
                    onOpenChange={(next) => setConfirmId(next ? rev.id : null)}
                  >
                    <AlertDialogTrigger
                      render={<Button type="button" variant="outline" size="sm" disabled={isPending} />}
                    >
                      Restore
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Restore this version?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This replaces your current draft. You&apos;ll still need to publish to
                          make it live.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            setConfirmId(null);
                            restore(rev.id);
                          }}
                        >
                          Restore
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
