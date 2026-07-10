import { upload } from "@vercel/blob/client";

import { recordMedia } from "@/app/actions/media";
import type { MediaRow } from "@/db/schema";

export const ALLOWED_MEDIA_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
];
export const MAX_MEDIA_SIZE_BYTES = 10 * 1024 * 1024;

function getImageDimensions(file: File): Promise<{ width: number; height: number } | null> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

export function validateFile(file: File): string | null {
  if (!ALLOWED_MEDIA_TYPES.includes(file.type)) {
    return `${file.name}: unsupported file type.`;
  }
  if (file.size > MAX_MEDIA_SIZE_BYTES) {
    return `${file.name}: file is too large (max 10MB).`;
  }
  return null;
}

/** Uploads a file directly to Blob storage, then records it in the media table. */
export async function uploadMediaFile(file: File): Promise<MediaRow> {
  const dimensions = await getImageDimensions(file);
  const blob = await upload(file.name, file, {
    access: "public",
    handleUploadUrl: "/api/media/upload",
  });
  return recordMedia({
    url: blob.url,
    pathname: blob.pathname,
    filename: file.name,
    mimeType: file.type,
    size: file.size,
    width: dimensions?.width,
    height: dimensions?.height,
  });
}
