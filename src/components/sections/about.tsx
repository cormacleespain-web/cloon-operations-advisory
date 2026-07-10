import Image from "next/image";

import { LogoMark } from "@/components/brand/logo-mark";
import { FacetField } from "@/components/brand/facet-field";
import { Reveal } from "@/components/site/reveal";
import { RichInline, RichText } from "@/components/rich-text";
import type { AboutContent } from "@/lib/content/schemas";

export function About({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="scroll-mt-28 border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
              <RichInline doc={content.heading} />
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {content.paragraphs.map((paragraph, i) => (
                <RichText key={i} doc={paragraph} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="bezel-shell shadow-premium">
              <div className="bezel-core relative flex aspect-[4/5] items-center justify-center overflow-hidden">
                {content.image ? (
                  <Image
                    src={content.image.url}
                    alt={content.image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 30vw, 90vw"
                  />
                ) : (
                  <>
                    <FacetField className="absolute inset-0 opacity-80" />
                    <LogoMark decorative className="relative size-32" />
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
