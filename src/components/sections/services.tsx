import { Reveal } from "@/components/site/reveal";
import { RichText } from "@/components/rich-text";
import { getIcon } from "@/lib/content/icons";
import type { ServicesContent } from "@/lib/content/schemas";

export function Services({ content }: { content: ServicesContent }) {
  return (
    <section id="services" className="scroll-mt-28 border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
            {content.heading}
          </h2>
          <RichText doc={content.intro} className="mt-6 text-lg text-muted-foreground" />
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {content.items.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <Reveal key={service.title} delay={i * 90}>
                <article className="bezel-shell group h-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
                  <div className="bezel-core flex h-full flex-col p-8 transition-shadow duration-500 group-hover:shadow-premium">
                    <div className="flex items-start justify-between">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-sage/10 text-sage ring-1 ring-sage/15">
                        <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground/60">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-7 font-display text-2xl font-medium tracking-[-0.01em] text-foreground">
                      {service.title}
                    </h3>
                    <RichText doc={service.body} className="mt-3 leading-relaxed text-muted-foreground" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
