import { ArrowUpRight, Check } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { RichText } from "@/components/rich-text";
import type { HowIWorkContent } from "@/lib/content/schemas";

export function HowIWorkPage({ content }: { content: HowIWorkContent }) {
  return (
    <>
      <PageHero eyebrow={content.hero.eyebrow} heading={content.hero.heading} intro={content.hero.intro} />

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:px-8">
          <Reveal>
            <h2 className="text-balance font-display text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl">
              {content.experience.heading}
            </h2>
            <RichText
              doc={content.experience.body}
              className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-dark relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="motif-facets pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:px-8">
          <Reveal>
            <p className="eyebrow">Principles</p>
          </Reveal>
          <ol className="relative mt-10 space-y-px">
            {content.principles.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 90}>
                <li className="group grid grid-cols-[auto_1fr] gap-6 border-t border-border/70 py-7 transition-colors duration-500 hover:border-sage/50 sm:grid-cols-[auto_0.9fr_1.1fr]">
                  <span className="font-display text-2xl font-light text-sage tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl font-medium text-foreground">{principle.title}</h3>
                  <RichText
                    doc={principle.body}
                    className="mt-2 leading-relaxed text-muted-foreground sm:mt-0"
                  />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:px-8">
          <Reveal>
            <h2 className="text-balance font-display text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl">
              {content.expectations.heading}
            </h2>
            <ul className="mt-8 space-y-4">
              {content.expectations.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg text-foreground/90">
                  <Check className="mt-1 size-5 shrink-0 text-sage" strokeWidth={1.75} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
              {content.outcome.heading}
            </h2>
            <RichText
              doc={content.outcome.body}
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
            />
            <a
              href={content.cta.href}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-base font-medium text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
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
