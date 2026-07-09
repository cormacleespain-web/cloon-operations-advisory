"use client";

import { useEffect, useState } from "react";
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

const NAV_ITEMS = [
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
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
          <a
            href="#top"
            className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            aria-label="Cloon Operations Advisory — back to top"
          >
            <Wordmark variant="compact" />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-11 rounded-full px-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] md:inline-flex"
            )}
          >
            Get in touch
          </a>

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
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-12 items-center rounded-xl px-4 text-lg font-medium text-foreground transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto p-4">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 w-full rounded-full"
                  )}
                >
                  Get in touch
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
