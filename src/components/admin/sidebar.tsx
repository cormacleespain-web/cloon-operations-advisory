import Link from "next/link";
import { LayoutDashboard, ImageIcon, Compass as SiteDetailsIcon, Menu as NavIcon } from "lucide-react";

import { auth } from "@/auth";
import { logout } from "@/app/actions/auth";
import { Wordmark } from "@/components/brand/wordmark";
import { sectionMeta } from "@/lib/content/meta";
import { sectionKeys } from "@/lib/content/schemas";

const HOMEPAGE_SECTIONS = sectionKeys.filter((key) => sectionMeta[key].group === "Homepage");
const PAGE_SECTIONS = sectionKeys.filter((key) => sectionMeta[key].group === "Pages");

const linkClass =
  "flex min-h-10 items-center rounded-lg px-3 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:bg-sidebar-accent focus-visible:text-sidebar-accent-foreground focus-visible:outline-none";

export async function AdminSidebar() {
  const session = await auth();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <Link href="/admin" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          <Wordmark variant="compact" />
        </Link>
      </div>

      <nav aria-label="Admin" className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
        <div>
          <Link href="/admin" className={linkClass}>
            <LayoutDashboard className="mr-2.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden />
            Overview
          </Link>
        </div>

        <div>
          <p className="eyebrow px-3">Homepage</p>
          <ul className="mt-2 space-y-0.5">
            {HOMEPAGE_SECTIONS.map((key) => (
              <li key={key}>
                <Link href={`/admin/sections/${key}`} className={linkClass}>
                  {sectionMeta[key].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow px-3">Pages</p>
          <ul className="mt-2 space-y-0.5">
            {PAGE_SECTIONS.map((key) => (
              <li key={key}>
                <Link href={`/admin/sections/${key}`} className={linkClass}>
                  {sectionMeta[key].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow px-3">Site</p>
          <ul className="mt-2 space-y-0.5">
            <li>
              <Link href="/admin/navigation" className={linkClass}>
                <NavIcon className="mr-2.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                Navigation & footer
              </Link>
            </li>
            <li>
              <Link href="/admin/media" className={linkClass}>
                <ImageIcon className="mr-2.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                Media
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className={linkClass}>
                <SiteDetailsIcon className="mr-2.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                {sectionMeta.settings.title}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {session?.user && (
        <div className="border-t border-sidebar-border p-4">
          <p className="truncate text-xs text-sidebar-foreground/60">{session.user.email}</p>
          <form action={logout} className="mt-2">
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:bg-sidebar-accent focus-visible:outline-none"
            >
              Sign out
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
