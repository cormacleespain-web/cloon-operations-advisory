import { ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { ScrollInk } from "@/components/site/scroll-ink";
import { RichText } from "@/components/rich-text";
import type { MyStoryContent } from "@/lib/content/schemas";

export function MyStoryPage({ content }: { content: MyStoryContent }) {
  return (
    <>
      <PageHero eyebrow={content.hero.eyebrow} heading={content.hero.heading} />

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20 lg:px-8">
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {content.paragraphsBefore.map((paragraph, i) => (
              <RichText key={i} doc={paragraph} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-dark border-b border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:px-8">
          <Reveal>
            <ScrollInk
              doc={content.pullQuote}
              className="text-balance font-display text-3xl font-medium italic leading-[1.2] tracking-[-0.01em] text-foreground sm:text-4xl"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20 lg:px-8">
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {content.paragraphsAfter.map((paragraph, i) => (
              <RichText key={i} doc={paragraph} />
            ))}
          </Reveal>

          <Reveal delay={90} className="mt-12">
            <a
              href={content.cta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-base font-medium text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {content.cta.label}
              <span className="flex size-9 items-center justify-center rounded-full bg-background/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
