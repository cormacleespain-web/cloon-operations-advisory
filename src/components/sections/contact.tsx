import { Reveal } from "@/components/site/reveal";
import { ContactForm } from "@/components/contact-form";
import { RichText } from "@/components/rich-text";
import { getIcon } from "@/lib/content/icons";
import type { ContactContent } from "@/lib/content/schemas";

export function Contact({ content }: { content: ContactContent }) {
  return (
    <section id="contact" className="scroll-mt-28 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
              {content.heading}
            </h2>
            <RichText doc={content.intro} className="mt-6 text-lg leading-relaxed text-muted-foreground" />

            <ul className="mt-12 space-y-6">
              {content.methods.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage/10 text-sage ring-1 ring-sage/15">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg font-medium text-foreground underline-offset-4 transition-colors hover:text-sage focus-visible:text-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-lg font-medium text-foreground">
                        {item.value}
                      </span>
                    )}
                  </span>
                </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={90}>
            <div className="bezel-shell shadow-premium">
              <div className="bezel-core p-6 sm:p-9">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
