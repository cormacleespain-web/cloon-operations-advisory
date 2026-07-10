import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { RichInline } from "@/components/rich-text";
import type { PositioningContent } from "@/lib/content/schemas";

export function Positioning({ content }: { content: PositioningContent }) {
  return (
    <section className="section-dark relative overflow-hidden">
      <div
        aria-hidden
        className="motif-facets pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_bottom_right,black,transparent_60%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="text-balance font-display text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.75rem]">
            <RichInline doc={content.heading} />
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {content.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="border-t border-border/70 pt-5">
                <h3 className="text-lg font-medium text-foreground">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-14">
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
  );
}
