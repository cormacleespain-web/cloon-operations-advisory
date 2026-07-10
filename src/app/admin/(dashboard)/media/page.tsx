import type { Metadata } from "next";

import { MediaLibrary } from "@/components/admin/media/media-library";
import { listMedia } from "@/app/actions/media";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function MediaPage() {
  const items = await listMedia();
  return <MediaLibrary initial={items} />;
}
