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
    <section id="services" className="scroll-mt-24 border-b bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What I do</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Advisory across the operation, not just one corner of it
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every engagement is shaped around where you actually are — a
            targeted fix, a broader programme, or a steady hand alongside your
            team.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <article className="group h-full rounded-xl border bg-background p-7 transition-colors hover:border-sage/60">
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-sage/10 text-sage">
                  <service.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {service.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
