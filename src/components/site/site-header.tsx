"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wordmark } from "@/components/brand/wordmark";
import type { NavigationContent } from "@/lib/content/schemas";

/** In-page anchors (#…) and external links are never "active" — only exact route matches. */
function isActiveHref(href: string, pathname: string) {
  return href.startsWith("/") && href === pathname;
}

export function SiteHeader({ content }: { content: NavigationContent }) {
  const navItems = content.items;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-5">
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-full border py-2 pl-5 pr-2 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            scrolled
              ? "border-border/70 bg-background/75 shadow-premium"
              : "border-transparent bg-background/40"
          )}
        >
          <Link
            href="/"
            className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            aria-label="Cloon Operations Advisory — home"
          >
            <Wordmark variant="compact" />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActiveHref(item.href, pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground focus-visible:text-foreground"
                      )}
                    >
                      {active && <span className="size-1.5 rounded-full bg-sage" aria-hidden />}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href={content.cta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-11 rounded-full px-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] md:inline-flex"
            )}
          >
            {content.cta.label}
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label="Open menu"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "size-11 rounded-full md:hidden"
                  )}
                />
              }
            >
              <MenuIcon strokeWidth={1.75} />
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-l-0">
              <SheetHeader className="border-b">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Wordmark variant="compact" />
              </SheetHeader>
              <nav aria-label="Mobile" className="px-3">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const active = isActiveHref(item.href, pathname);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center gap-2.5 rounded-xl px-4 text-lg font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
                            active ? "text-foreground" : "text-foreground/80"
                          )}
                        >
                          {active && <span className="size-1.5 rounded-full bg-sage" aria-hidden />}
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="mt-auto p-4">
                <Link
                  href={content.cta.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 w-full rounded-full"
                  )}
                >
                  {content.cta.label}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
