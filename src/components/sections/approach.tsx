import { Reveal } from "@/components/site/reveal";
import { RichText } from "@/components/rich-text";
import type { ApproachContent } from "@/lib/content/schemas";

export function Approach({ content }: { content: ApproachContent }) {
  return (
    <section id="approach" className="section-dark relative scroll-mt-28 overflow-hidden">
      <div
        aria-hidden
        className="motif-facets pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
              {content.heading}
            </h2>
            <RichText
              doc={content.intro}
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
            />
          </Reveal>

          <ol className="relative space-y-px">
            {content.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <li className="group grid grid-cols-[auto_1fr] gap-6 border-t border-border/70 py-7 transition-colors duration-500 hover:border-sage/50">
                  <span className="font-display text-2xl font-light text-sage tabular-nums">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium text-foreground">
                      {step.title}
                    </h3>
                    <RichText doc={step.body} className="mt-2 leading-relaxed text-muted-foreground" />
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
