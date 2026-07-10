"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dropzone } from "./dropzone";
import { MediaGrid } from "./media-grid";
import { listMedia } from "@/app/actions/media";
import { uploadMediaFile, validateFile } from "@/lib/media-client";
import type { MediaRow } from "@/db/schema";

export function MediaPicker({
  onSelect,
  children,
}: {
  onSelect: (item: MediaRow) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaRow[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, startLoadingTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    startLoadingTransition(async () => {
      const rows = await listMedia();
      setItems(rows);
    });
  }, [open]);

  async function handleFiles(files: FileList) {
    setUploading(true);
    for (const file of Array.from(files)) {
      const error = validateFile(file);
      if (error) {
        toast.error(error);
        continue;
      }
      try {
        const row = await uploadMediaFile(file);
        setItems((prev) => [row, ...prev]);
      } catch {
        toast.error(`${file.name} failed to upload.`);
      }
    }
    setUploading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" variant="outline" size="sm" />}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Choose an image</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] space-y-6 overflow-y-auto">
          <Dropzone onFiles={handleFiles} uploading={uploading} />
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <MediaGrid
              items={items.filter((item) => item.mimeType.startsWith("image/"))}
              onSelect={(item) => {
                onSelect(item);
                setOpen(false);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
