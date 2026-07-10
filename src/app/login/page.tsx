import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AuthShell } from "@/components/admin/auth-shell";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <AuthShell title="Sign in" subtitle="Manage the Cloon Operations Advisory website.">
      <LoginForm />
    </AuthShell>
  );
}
