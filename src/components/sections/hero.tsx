import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { FacetField } from "@/components/brand/facet-field";
import { RichInline, RichText } from "@/components/rich-text";
import type { HeroContent } from "@/lib/content/schemas";

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[clamp(40rem,88svh,54rem)] items-center overflow-hidden border-b border-border/60 bg-background pt-28 pb-20"
    >
      {/* Signature facet centerpiece — right-biased, behind the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[85%] max-w-3xl opacity-90 [mask-image:radial-gradient(ellipse_at_right,black,transparent_72%)] sm:w-[70%] lg:w-[58%]"
      >
        <FacetField />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="size-1.5 rounded-full bg-sage" aria-hidden />
            {content.eyebrow}
          </p>

          <h1 className="mt-8 font-display text-[clamp(2.75rem,7vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.03em] text-foreground">
            {content.headingLine1}
            <br />
            <RichInline doc={content.headingLine2} />
          </h1>

          <RichText
            doc={content.subheading}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          />

          <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={content.primaryCta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-base font-medium text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {content.primaryCta.label}
              <span className="flex size-9 items-center justify-center rounded-full bg-background/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
              </span>
            </a>
            <a
              href={content.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3.5 text-base font-medium text-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-foreground/30 hover:bg-foreground/[0.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {content.secondaryCta.label}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Subtle scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground/70 md:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-muted-foreground/50 to-transparent" />
      </div>
    </section>
  );
}
