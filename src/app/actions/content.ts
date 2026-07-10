"use server";

import { updateTag } from "next/cache";
import { desc, eq, inArray } from "drizzle-orm";
import type { z } from "zod";

import { requireAdmin } from "@/lib/auth-guard";
import { db } from "@/db";
import { contentRevisions, contentSections } from "@/db/schema";
import { defaults } from "@/lib/content/defaults";
import { sectionSchemas, type SectionContent, type SectionKey } from "@/lib/content/schemas";

const MAX_REVISIONS = 20;

export type ContentActionResult<K extends SectionKey> =
  | { status: "success"; message: string; data: SectionContent<K> }
  | { status: "error"; message: string };

function formatZodError(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "That content isn't valid.";
  const path = issue.path.join(".");
  return path ? `${path}: ${issue.message}` : issue.message;
}

async function upsertSection(key: SectionKey, set: Record<string, unknown>) {
  await db
    .insert(contentSections)
    .values({ key, ...set })
    .onConflictDoUpdate({ target: contentSections.key, set });
}

export async function saveDraft<K extends SectionKey>(
  key: K,
  data: unknown
): Promise<ContentActionResult<K>> {
  await requireAdmin();

  const parsed = sectionSchemas[key].safeParse(data);
  if (!parsed.success) {
    return { status: "error", message: formatZodError(parsed.error) };
  }
  const value = parsed.data as SectionContent<K>;

  await upsertSection(key, { draft: value, draftSavedAt: new Date() });

  return { status: "success", message: "Draft saved.", data: value };
}

export async function publish<K extends SectionKey>(key: K): Promise<ContentActionResult<K>> {
  await requireAdmin();

  const [row] = await db.select().from(contentSections).where(eq(contentSections.key, key));
  const source = row?.draft ?? row?.published;
  if (source == null) {
    return { status: "error", message: "Nothing to publish yet." };
  }

  const parsed = sectionSchemas[key].safeParse(source);
  if (!parsed.success) {
    return { status: "error", message: `The saved draft isn't valid. ${formatZodError(parsed.error)}` };
  }
  const value = parsed.data as SectionContent<K>;
  const now = new Date();

  await upsertSection(key, { draft: value, published: value, publishedAt: now });
  await db.insert(contentRevisions).values({ sectionKey: key, data: value });

  const revisions = await db
    .select({ id: contentRevisions.id })
    .from(contentRevisions)
    .where(eq(contentRevisions.sectionKey, key))
    .orderBy(desc(contentRevisions.createdAt));
  const staleIds = revisions.slice(MAX_REVISIONS).map((r) => r.id);
  if (staleIds.length) {
    await db.delete(contentRevisions).where(inArray(contentRevisions.id, staleIds));
  }

  updateTag("content");

  return { status: "success", message: "Published — the live site is updated.", data: value };
}

export async function discardDraft<K extends SectionKey>(key: K): Promise<ContentActionResult<K>> {
  await requireAdmin();

  const [row] = await db.select().from(contentSections).where(eq(contentSections.key, key));
  const restored = (row?.published as SectionContent<K> | null | undefined) ?? defaults[key];

  await upsertSection(key, { draft: row?.published ?? null, draftSavedAt: new Date() });

  return { status: "success", message: "Draft discarded.", data: restored as SectionContent<K> };
}

export async function restoreRevision<K extends SectionKey>(
  key: K,
  revisionId: number
): Promise<ContentActionResult<K>> {
  await requireAdmin();

  const [revision] = await db
    .select()
    .from(contentRevisions)
    .where(eq(contentRevisions.id, revisionId));
  if (!revision || revision.sectionKey !== key) {
    return { status: "error", message: "That version could not be found." };
  }

  const parsed = sectionSchemas[key].safeParse(revision.data);
  if (!parsed.success) {
    return { status: "error", message: "That version is no longer valid." };
  }
  const value = parsed.data as SectionContent<K>;

  await upsertSection(key, { draft: value, draftSavedAt: new Date() });

  return {
    status: "success",
    message: "Restored to draft — publish to make it live.",
    data: value,
  };
}

export async function listRevisions(key: SectionKey) {
  await requireAdmin();
  return db
    .select({ id: contentRevisions.id, createdAt: contentRevisions.createdAt })
    .from(contentRevisions)
    .where(eq(contentRevisions.sectionKey, key))
    .orderBy(desc(contentRevisions.createdAt))
    .limit(MAX_REVISIONS);
}
