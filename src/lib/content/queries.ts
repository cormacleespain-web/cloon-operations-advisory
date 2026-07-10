import { cacheLife, cacheTag } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { contentSections } from "@/db/schema";
import { defaults } from "./defaults";
import {
  sectionKeys,
  sectionSchemas,
  type SectionContent,
  type SectionKey,
} from "./schemas";

export type PublishedContent = { [K in SectionKey]: SectionContent<K> };

function parseOrDefault<K extends SectionKey>(key: K, value: unknown): SectionContent<K> {
  if (value != null) {
    const result = sectionSchemas[key].safeParse(value);
    if (result.success) return result.data as SectionContent<K>;
  }
  return defaults[key] as SectionContent<K>;
}

/**
 * Published content for the public site — cached and tagged "content".
 * `publish()` in actions/content.ts calls `updateTag("content")` so a publish
 * is reflected immediately for the next request.
 */
export async function getPublishedContent(): Promise<PublishedContent> {
  "use cache";
  cacheTag("content");
  cacheLife("days");

  const rows = await db.select().from(contentSections);
  const byKey = new Map(rows.map((r) => [r.key, r]));

  const entries = sectionKeys.map(
    (key) => [key, parseOrDefault(key, byKey.get(key)?.published)] as const
  );
  return Object.fromEntries(entries) as PublishedContent;
}

/** Draft content for the admin editor — always fresh, never cached. */
export async function getDraftContent<K extends SectionKey>(
  key: K
): Promise<SectionContent<K>> {
  const [row] = await db
    .select()
    .from(contentSections)
    .where(eq(contentSections.key, key));
  return parseOrDefault(key, row?.draft ?? row?.published);
}

/** Draft content for every section — used by the admin draft preview. */
export async function getAllDraftContent(): Promise<PublishedContent> {
  const rows = await db.select().from(contentSections);
  const byKey = new Map(rows.map((r) => [r.key, r]));

  const entries = sectionKeys.map((key) => {
    const row = byKey.get(key);
    return [key, parseOrDefault(key, row?.draft ?? row?.published)] as const;
  });
  return Object.fromEntries(entries) as PublishedContent;
}

/**
 * `new Date()` in a Server Component needs a cached or request-bound data
 * source under Cache Components — this satisfies that for the footer's
 * copyright year (revalidates daily, which is more than often enough).
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export type SectionStatus = {
  key: SectionKey;
  hasUnpublishedChanges: boolean;
  publishedAt: Date | null;
  draftSavedAt: Date | null;
};

/** Per-section publish status for the admin overview page. */
export async function getContentOverview(): Promise<SectionStatus[]> {
  const rows = await db.select().from(contentSections);
  const byKey = new Map(rows.map((r) => [r.key, r]));

  return sectionKeys.map((key) => {
    const row = byKey.get(key);
    const hasDraft = row?.draft != null;
    const hasUnpublishedChanges =
      hasDraft && JSON.stringify(row!.draft) !== JSON.stringify(row!.published ?? null);
    return {
      key,
      hasUnpublishedChanges,
      publishedAt: row?.publishedAt ?? null,
      draftSavedAt: row?.draftSavedAt ?? null,
    };
  });
}
