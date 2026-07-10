import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getContentOverview } from "@/lib/content/queries";
import { sectionMeta } from "@/lib/content/meta";
import type { SectionKey } from "@/lib/content/schemas";

export const metadata: Metadata = { robots: { index: false, follow: false } };

function editHrefFor(key: SectionKey) {
  if (key === "navigation" || key === "footer") return "/admin/navigation";
  if (key === "settings") return "/admin/settings";
  return `/admin/sections/${key}`;
}

export default async function AdminOverviewPage() {
  const overview = await getContentOverview();

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <h1 className="font-display text-3xl font-medium tracking-[-0.01em] text-foreground">
        Overview
      </h1>
      <p className="mt-2 text-muted-foreground">
        Everything you can edit on the website. Publishing a section updates the live
        site right away.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {overview.map((status) => {
          const meta = sectionMeta[status.key];
          return (
            <Link key={status.key} href={editHrefFor(status.key)} className="group block">
              <Card className="h-full transition-shadow duration-300 group-hover:shadow-premium">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg">{meta.title}</CardTitle>
                    {status.hasUnpublishedChanges ? (
                      <Badge variant="outline" className="border-sage/40 text-sage">
                        Unpublished changes
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Live</Badge>
                    )}
                  </div>
                  <CardDescription>{meta.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {status.publishedAt
                        ? `Published ${status.publishedAt.toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric" })}`
                        : "Not published yet"}
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      Edit
                      <ArrowUpRight className="size-3.5" strokeWidth={1.75} aria-hidden />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
