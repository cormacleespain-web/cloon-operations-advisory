import type { Metadata } from "next";

import { AuthShell } from "@/components/admin/auth-shell";
import { ResetPasswordForm } from "@/components/admin/reset-password-form";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthShell title="Invalid link">
        <p className="text-muted-foreground">
          This reset link is missing its token. Request a new one from the sign-in page.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Choose a new password">
      <ResetPasswordForm token={token} />
    </AuthShell>
  );
}
