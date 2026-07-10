"use server";

import crypto from "node:crypto";

import { z } from "zod";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AuthError } from "next-auth";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { adminUsers, passwordResetTokens } from "@/db/schema";
import { checkRateLimit, clearRateLimit, recordFailedAttempt } from "@/lib/rate-limit";

async function requestOrigin() {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  return `${protocol}://${host}`;
}

// --- Login ---

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export type LoginState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"email" | "password", string>>;
};

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    const fieldErrors: LoginState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<LoginState["fieldErrors"]>;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const email = parsed.data.email.trim().toLowerCase();
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const emailKey = `email:${email}`;
  const ipKey = `ip:${ip}`;

  if (!(await checkRateLimit(emailKey)) || !(await checkRateLimit(ipKey))) {
    return {
      status: "error",
      message: "Too many attempts. Please wait a few minutes and try again.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password: parsed.data.password,
      redirect: false,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      await recordFailedAttempt(emailKey);
      await recordFailedAttempt(ipKey);
      return { status: "error", message: "Incorrect email or password." };
    }
    throw err;
  }

  await clearRateLimit(emailKey);
  await clearRateLimit(ipKey);
  redirect("/admin");
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

// --- Forgot password ---

const forgotSchema = z.object({ email: z.email("Enter a valid email address.") });

export type ForgotState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"email", string>>;
};

const GENERIC_FORGOT_MESSAGE =
  "If that address is registered, a reset link is on its way.";

export async function requestPasswordReset(
  _prev: ForgotState,
  formData: FormData
): Promise<ForgotState> {
  const parsed = forgotSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted field.",
      fieldErrors: { email: parsed.error.issues[0]?.message },
    };
  }

  const email = parsed.data.email.trim().toLowerCase();
  const resetKey = `reset:${email}`;

  // Rate-limited (3/hour) and always returns the same generic message —
  // never reveals whether the address exists or is locked out.
  if (!(await checkRateLimit(resetKey, 3))) {
    return { status: "success", message: GENERIC_FORGOT_MESSAGE };
  }

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));

  if (user) {
    await recordFailedAttempt(resetKey, 60 * 60 * 1000);

    const rawToken = crypto.randomBytes(32).toString("base64url");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    await db.insert(passwordResetTokens).values({
      adminUserId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    const origin = await requestOrigin();
    const resetUrl = `${origin}/login/reset?token=${rawToken}`;
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL ?? "Cloon Admin <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your Cloon admin password",
        text: `Someone requested a password reset for the Cloon admin.\n\nReset your password:\n${resetUrl}\n\nThis link expires in 1 hour. If you didn't request this, you can ignore this email.`,
      });
      if (error) console.error("Password reset email failed to send:", error);
    } else {
      console.error("Password reset: RESEND_API_KEY not set. Reset link:", resetUrl);
    }
  }

  return { status: "success", message: GENERIC_FORGOT_MESSAGE };
}

// --- Reset password ---

const resetSchema = z
  .object({
    token: z.string().min(1),
    password: z.string().min(12, "Password must be at least 12 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export type ResetState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"password" | "confirmPassword", string>>;
};

export async function resetPassword(
  _prev: ResetState,
  formData: FormData
): Promise<ResetState> {
  const parsed = resetSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    const fieldErrors: ResetState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ResetState["fieldErrors"]>;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const tokenHash = crypto.createHash("sha256").update(parsed.data.token).digest("hex");
  const [row] = await db
    .select()
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.tokenHash, tokenHash));

  if (!row || row.usedAt || row.expiresAt.getTime() < Date.now()) {
    return {
      status: "error",
      message: "This reset link is invalid or has expired. Request a new one.",
    };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await db
    .update(adminUsers)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(adminUsers.id, row.adminUserId));
  await db
    .update(passwordResetTokens)
    .set({ usedAt: new Date() })
    .where(eq(passwordResetTokens.id, row.id));

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, row.adminUserId));
  if (user) await clearRateLimit(`email:${user.email}`);

  return { status: "success", message: "Password updated. You can now sign in." };
}
