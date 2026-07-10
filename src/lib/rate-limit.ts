import { eq } from "drizzle-orm";

import { db } from "@/db";
import { loginAttempts } from "@/db/schema";

const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_MAX_ATTEMPTS = 5;

/** True if `identifier` is still under its attempt limit for the current window. */
export async function checkRateLimit(
  identifier: string,
  maxAttempts = DEFAULT_MAX_ATTEMPTS
): Promise<boolean> {
  const [row] = await db
    .select()
    .from(loginAttempts)
    .where(eq(loginAttempts.identifier, identifier));
  if (!row) return true;
  if (row.resetAt.getTime() < Date.now()) return true;
  return row.count < maxAttempts;
}

export async function recordFailedAttempt(
  identifier: string,
  windowMs = DEFAULT_WINDOW_MS
): Promise<void> {
  const now = Date.now();
  const [row] = await db
    .select()
    .from(loginAttempts)
    .where(eq(loginAttempts.identifier, identifier));

  if (!row || row.resetAt.getTime() < now) {
    await db
      .insert(loginAttempts)
      .values({ identifier, count: 1, resetAt: new Date(now + windowMs) })
      .onConflictDoUpdate({
        target: loginAttempts.identifier,
        set: { count: 1, resetAt: new Date(now + windowMs) },
      });
  } else {
    await db
      .update(loginAttempts)
      .set({ count: row.count + 1 })
      .where(eq(loginAttempts.identifier, identifier));
  }
}

export async function clearRateLimit(identifier: string): Promise<void> {
  await db.delete(loginAttempts).where(eq(loginAttempts.identifier, identifier));
}
