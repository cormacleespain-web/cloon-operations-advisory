import { redirect } from "next/navigation";

import { auth } from "@/auth";

/** Real auth check — call at the top of every content/media server action and admin page. */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session.user;
}
