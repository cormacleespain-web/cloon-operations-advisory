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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md transition-colors",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
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
                  className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
          >
            Get in touch
          </a>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "size-11 md:hidden"
                )}
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader className="border-b">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Wordmark variant="compact" />
            </SheetHeader>
            <nav aria-label="Mobile" className="px-2">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center rounded-md px-3 text-base font-medium text-foreground transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
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
                className={cn(buttonVariants({ size: "lg" }), "h-11 w-full")}
              >
                Get in touch
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
