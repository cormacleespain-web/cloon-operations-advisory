import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { RichText } from "@/components/rich-text";
import type { HomeTeasersContent } from "@/lib/content/schemas";

export function HomeTeasers({ content }: { content: HomeTeasersContent }) {
  return (
    <section className="section-dark relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden
        className="motif-facets pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
            {content.heading}
          </h2>
        </Reveal>

        <div className="mt-14 space-y-6">
          {content.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <a
                href={item.cta.href}
                className="group bezel-shell block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1"
              >
                <div className="bezel-core flex flex-col gap-6 p-8 transition-shadow duration-500 group-hover:shadow-premium sm:flex-row sm:items-center sm:justify-between sm:p-10">
                  <div className="sm:max-w-xl">
                    <span className="font-mono text-xs tabular-nums text-muted-foreground/60">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.01em] text-foreground">
                      {item.title}
                    </h3>
                    <RichText doc={item.body} className="mt-2 leading-relaxed text-muted-foreground" />
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-base font-medium text-foreground">
                    {item.cta.label}
                    <span className="flex size-9 items-center justify-center rounded-full bg-foreground/5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
                    </span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
