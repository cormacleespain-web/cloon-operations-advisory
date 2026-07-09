import { Mail, MapPin } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { ContactForm } from "@/components/contact-form";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/* EXAMPLE COPY — placeholder contact details for the demo; Conor to replace. */
const DIRECT = [
  { icon: Mail, label: "Email", value: "hello@cloon.ie", href: "mailto:hello@cloon.ie" },
  { icon: LinkedinIcon, label: "LinkedIn", value: "Conor Lee", href: "https://www.linkedin.com/" },
  { icon: MapPin, label: "Based in", value: "Co. Clare, Ireland", href: null },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
              Let&apos;s talk about your operation
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Whether you have a specific problem in mind or just want a second
              opinion, drop a note or reach out directly. No hard sell — just a
              conversation.
            </p>

            <ul className="mt-12 space-y-6">
              {DIRECT.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage/10 text-sage ring-1 ring-sage/15">
                    <item.icon className="size-5" strokeWidth={1.5} aria-hidden />
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
              ))}
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
