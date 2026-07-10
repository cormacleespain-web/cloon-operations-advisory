"use client";

import { useState } from "react";

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
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PublishBar({
  sectionLabel,
  isDirty,
  isPending,
  onSave,
  onPublish,
  onDiscard,
  previewHref,
  historySlot,
}: {
  sectionLabel: string;
  isDirty: boolean;
  isPending: boolean;
  onSave: () => void;
  onPublish: () => void;
  onDiscard: () => void;
  previewHref: string;
  historySlot?: React.ReactNode;
}) {
  const [discardOpen, setDiscardOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);

  return (
    <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 border-t border-border bg-background/95 px-8 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground" role="status">
          {isDirty ? "Unsaved changes" : "No unsaved changes"}
        </span>
        {historySlot}
      </div>
      <div className="flex items-center gap-2">
        <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}>
          <AlertDialogTrigger
            render={<Button type="button" variant="outline" size="sm" disabled={isPending} />}
          >
            Discard draft
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard changes to {sectionLabel}?</AlertDialogTitle>
              <AlertDialogDescription>
                This reverts to the last published version. This can&apos;t be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => {
                  setDiscardOpen(false);
                  onDiscard();
                }}
              >
                Discard
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <a
          href={previewHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Preview
        </a>

        <Button type="button" variant="outline" size="sm" disabled={isPending} onClick={onSave}>
          Save draft
        </Button>

        <AlertDialog open={publishOpen} onOpenChange={setPublishOpen}>
          <AlertDialogTrigger render={<Button type="button" size="sm" disabled={isPending} />}>
            Publish
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Publish {sectionLabel}?</AlertDialogTitle>
              <AlertDialogDescription>
                This saves your changes and updates the live site right away.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setPublishOpen(false);
                  onPublish();
                }}
              >
                Publish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
