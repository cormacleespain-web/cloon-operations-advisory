import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteRenderer } from "@/components/site-renderer";
import type { SitePage } from "@/components/site-renderer";
import { getAllDraftContent } from "@/lib/content/queries";
import { requireAdmin } from "@/lib/auth-guard";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const PAGE_SWITCHER: { page: SitePage; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "businessChallenges", label: "Business Challenges" },
  { page: "howIWork", label: "How I Work" },
  { page: "myStory", label: "My Story" },
];

function isSitePage(value: string | undefined): value is SitePage {
  return PAGE_SWITCHER.some((p) => p.page === value);
}

export default async function DraftPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await requireAdmin();
  const { page: pageParam } = await searchParams;
  const page: SitePage = isSitePage(pageParam) ? pageParam : "home";
  const content = await getAllDraftContent();

  return (
    <div className="flex min-h-svh flex-col">
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-sage px-4 py-2 text-sm font-medium text-white">
        <span>Draft preview — this may not match the live site</span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {PAGE_SWITCHER.map((item) => (
            <Link
              key={item.page}
              href={`/admin/preview?page=${item.page}`}
              aria-current={item.page === page ? "page" : undefined}
              className={cn(
                "underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                item.page === page ? "underline" : "opacity-80"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowLeft className="size-3.5" strokeWidth={2} aria-hidden />
          Back to admin
        </Link>
      </div>
      <SiteRenderer content={content} page={page} />
    </div>
  );
}
