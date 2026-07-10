import { requireAdmin } from "@/lib/auth-guard";

/** Real auth check for everything rendered inside the admin layout. */
export async function AdminGuard({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <>{children}</>;
}
