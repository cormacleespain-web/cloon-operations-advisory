import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";
import { RichText } from "@/components/rich-text";
import { getCurrentYear } from "@/lib/content/queries";
import type { FooterContent } from "@/lib/content/schemas";

export async function SiteFooter({ content }: { content: FooterContent }) {
  const year = await getCurrentYear();

  return (
    <footer className="section-dark border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark variant="compact" />
            <RichText doc={content.tagline} className="mt-5 leading-relaxed text-muted-foreground" />
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {content.links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {content.copyrightName}. All rights reserved.{" "}
            <Link
              href="/login"
              className="text-muted-foreground/50 transition-colors hover:text-muted-foreground focus-visible:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Admin
            </Link>
          </p>
          <a
            href={`mailto:${content.email}`}
            className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {content.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
