"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Dropzone } from "./dropzone";
import { MediaGrid } from "./media-grid";
import { deleteMedia, updateMediaAlt } from "@/app/actions/media";
import { uploadMediaFile, validateFile } from "@/lib/media-client";
import type { MediaRow } from "@/db/schema";

export function MediaLibrary({ initial }: { initial: MediaRow[] }) {
  const [items, setItems] = useState(initial);
  const [uploading, setUploading] = useState(false);

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
        toast.success(`${file.name} uploaded`);
      } catch {
        toast.error(`${file.name} failed to upload.`);
      }
    }
    setUploading(false);
  }

  async function handleDelete(id: number) {
    const result = await deleteMedia(id);
    if (result.status === "error") {
      toast.error(result.message);
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("File deleted");
  }

  async function handleAltChange(id: number, alt: string) {
    await updateMediaAlt(id, alt);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, alt } : item)));
    toast.success("Alt text saved");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-8 py-10">
      <div>
        <h1 className="font-display text-3xl font-medium tracking-[-0.01em] text-foreground">
          Media
        </h1>
        <p className="mt-2 text-muted-foreground">
          Upload and reuse images and files across the site.
        </p>
      </div>
      <Dropzone onFiles={handleFiles} uploading={uploading} />
      <MediaGrid items={items} onDelete={handleDelete} onAltChange={handleAltChange} />
    </div>
  );
}
