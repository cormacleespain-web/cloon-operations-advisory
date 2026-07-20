import { Reveal } from "@/components/site/reveal";
import { RichInline, RichText } from "@/components/rich-text";
import type { HomeIntroContent } from "@/lib/content/schemas";

export function HomeIntro({ content }: { content: HomeIntroContent }) {
  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32 lg:px-8">
        <Reveal>
          <p className="eyebrow mx-auto">{content.eyebrow}</p>
          <h2 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
            <RichInline doc={content.heading} />
          </h2>
          <RichText
            doc={content.body}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          />
        </Reveal>
      </div>
    </section>
  );
}
