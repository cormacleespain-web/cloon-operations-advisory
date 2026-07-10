"use server";

import { del } from "@vercel/blob";
import { desc, eq } from "drizzle-orm";

import { requireAdmin } from "@/lib/auth-guard";
import { db } from "@/db";
import { media } from "@/db/schema";

export async function listMedia() {
  await requireAdmin();
  return db.select().from(media).orderBy(desc(media.createdAt));
}

export async function recordMedia(input: {
  url: string;
  pathname: string;
  filename: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
}) {
  await requireAdmin();
  const [row] = await db.insert(media).values(input).returning();
  return row;
}

export async function updateMediaAlt(id: number, alt: string) {
  await requireAdmin();
  await db.update(media).set({ alt }).where(eq(media.id, id));
}

export type DeleteMediaResult = { status: "success" } | { status: "error"; message: string };

export async function deleteMedia(id: number): Promise<DeleteMediaResult> {
  await requireAdmin();
  const [row] = await db.select().from(media).where(eq(media.id, id));
  if (!row) return { status: "error", message: "That file could not be found." };

  await del(row.url);
  await db.delete(media).where(eq(media.id, id));
  return { status: "success" };
}
