import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteRenderer } from "@/components/site-renderer";
import { getAllDraftContent } from "@/lib/content/queries";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function DraftPreviewPage() {
  await requireAdmin();
  const content = await getAllDraftContent();

  return (
    <div className="flex min-h-svh flex-col">
      <div className="sticky top-0 z-50 flex items-center justify-center gap-3 bg-sage px-4 py-2 text-sm font-medium text-white">
        <span>Draft preview — this may not match the live site</span>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowLeft className="size-3.5" strokeWidth={2} aria-hidden />
          Back to admin
        </Link>
      </div>
      <SiteRenderer content={content} />
    </div>
  );
}
