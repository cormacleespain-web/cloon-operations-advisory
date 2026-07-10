import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/components/admin/auth-shell";
import { ForgotPasswordForm } from "@/components/admin/forgot-password-form";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
    >
      <ForgotPasswordForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="font-medium text-sage underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  );
}
