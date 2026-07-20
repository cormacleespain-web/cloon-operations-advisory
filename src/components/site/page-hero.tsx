import { Reveal } from "@/components/site/reveal";
import { RichText } from "@/components/rich-text";
import type { RichText as RichTextDoc } from "@/lib/content/schemas";

export function PageHero({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: RichTextDoc;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div
        aria-hidden
        className="motif-facets pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-8 text-balance font-display text-[clamp(2.5rem,6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-foreground">
            {heading}
          </h1>
          {intro && (
            <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              <RichText doc={intro} />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
