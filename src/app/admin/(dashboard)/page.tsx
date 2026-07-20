import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getContentOverview, type SectionStatus } from "@/lib/content/queries";
import { sectionMeta } from "@/lib/content/meta";
import type { SectionKey } from "@/lib/content/schemas";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const GROUP_ORDER = ["Homepage", "Pages", "Site"] as const;

function editHrefFor(key: SectionKey) {
  if (key === "navigation" || key === "footer") return "/admin/navigation";
  if (key === "settings") return "/admin/settings";
  return `/admin/sections/${key}`;
}

export default async function AdminOverviewPage() {
  const overview = await getContentOverview();
  const byGroup = new Map<(typeof GROUP_ORDER)[number], SectionStatus[]>();
  for (const status of overview) {
    const group = sectionMeta[status.key].group;
    byGroup.set(group, [...(byGroup.get(group) ?? []), status]);
  }

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <h1 className="font-display text-3xl font-medium tracking-[-0.01em] text-foreground">
        Overview
      </h1>
      <p className="mt-2 text-muted-foreground">
        Everything you can edit on the website. Publishing a section updates the live
        site right away.
      </p>

      {GROUP_ORDER.map((group) => {
        const statuses = byGroup.get(group);
        if (!statuses?.length) return null;
        return (
          <section key={group} className="mt-10 first:mt-8">
            <h2 className="eyebrow">{group}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {statuses.map((status) => {
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
                          <span className="inline-flex items-center gap-1 font-medium text-foreground opacity-60 transition-opacity group-hover:opacity-100">
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
          </section>
        );
      })}
    </div>
  );
}
