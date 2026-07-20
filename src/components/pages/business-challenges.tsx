import { ArrowUpRight, Check } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { ScrollInk } from "@/components/site/scroll-ink";
import { RichText } from "@/components/rich-text";
import type { BusinessChallengesContent } from "@/lib/content/schemas";

export function BusinessChallengesPage({ content }: { content: BusinessChallengesContent }) {
  return (
    <>
      <PageHero eyebrow={content.hero.eyebrow} heading={content.hero.heading} intro={content.hero.intro} />

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

      {content.areas.map((area, areaIndex) => {
        const dark = areaIndex % 2 === 1;
        return (
          <section
            key={area.title}
            className={dark ? "section-dark border-b border-border/60" : "border-b border-border/60 bg-background"}
          >
            <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:px-8">
              <Reveal>
                <p className="eyebrow">{area.title}</p>
              </Reveal>

              <div className="mt-10 space-y-10">
                {area.reviews.map((review) => (
                  <Reveal key={review.title}>
                    <div className="bezel-shell shadow-premium">
                      <div className="bezel-core grid gap-10 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                          <h3 className="text-balance font-display text-2xl font-medium tracking-[-0.01em] text-foreground sm:text-3xl">
                            {review.title}
                          </h3>
                          <p className="mt-6 text-sm font-medium text-muted-foreground">
                            {content.reviewLabels.symptoms}
                          </p>
                          <ul className="mt-3 space-y-4 border-l border-sage/30 pl-5">
                            {review.symptoms.map((symptom) => (
                              <li
                                key={symptom}
                                className="font-display text-lg italic leading-snug text-foreground/85"
                              >
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-8">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {content.reviewLabels.reality}
                            </p>
                            <ScrollInk
                              doc={review.reality}
                              className="mt-2 leading-relaxed text-foreground/90"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {content.reviewLabels.help}
                            </p>
                            <RichText doc={review.help} className="mt-2 leading-relaxed text-foreground/90" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {content.reviewLabels.outcomes}
                            </p>
                            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                              {review.outcomes.map((outcome) => (
                                <li key={outcome} className="flex items-start gap-2 text-sm text-foreground/90">
                                  <Check
                                    className="mt-0.5 size-4 shrink-0 text-sage"
                                    strokeWidth={1.75}
                                    aria-hidden
                                  />
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
              {content.closing.heading}
            </h2>
            <RichText
              doc={content.closing.body}
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
            />
            <a
              href={content.closing.cta.href}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-base font-medium text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {content.closing.cta.label}
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
