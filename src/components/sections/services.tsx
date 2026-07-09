import { Workflow, Gauge, LineChart, LifeBuoy } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

/* EXAMPLE COPY — representative service lines for the demo; Conor to refine. */
const SERVICES = [
  {
    icon: Workflow,
    title: "Supply Chain Strategy",
    body: "Map your sourcing, network and inventory end to end — then build a plan that balances cost, service and resilience against real-world disruption.",
  },
  {
    icon: Gauge,
    title: "Operations Improvement",
    body: "Find where throughput, quality and cost are leaking on the shop floor, and put practical, lean-informed changes in place that stick.",
  },
  {
    icon: LineChart,
    title: "Planning & S&OP",
    body: "Bring demand, supply and finance into one conversation with a planning rhythm that reduces firefighting and improves forecast accuracy.",
  },
  {
    icon: LifeBuoy,
    title: "Interim & Advisory",
    body: "Hands-on operational support when you need an extra pair of experienced hands — from a specific project to steadying a team through change.",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-28 border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What I do</p>
          <h2 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
            Advisory across the operation, not just one corner of it
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Every engagement is shaped around where you actually are — a
            targeted fix, a broader programme, or a steady hand alongside your
            team.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 90}>
              <article className="bezel-shell group h-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
                <div className="bezel-core flex h-full flex-col p-8 transition-shadow duration-500 group-hover:shadow-premium">
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-sage/10 text-sage ring-1 ring-sage/15">
                      <service.icon className="size-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <span className="font-mono text-xs tabular-nums text-muted-foreground/60">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-medium tracking-[-0.01em] text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {service.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
