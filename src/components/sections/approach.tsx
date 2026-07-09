import { Reveal } from "@/components/site/reveal";

/* EXAMPLE COPY — an illustrative engagement flow for the demo; Conor to refine. */
const STEPS = [
  {
    n: "01",
    title: "Listen & diagnose",
    body: "We start on the ground — walking the operation, talking to the people doing the work, and looking honestly at the numbers to find what's really driving the pain.",
  },
  {
    n: "02",
    title: "Prioritise what matters",
    body: "Not everything is worth fixing at once. Together we agree the handful of changes that will move the needle most for cost, service and sanity.",
  },
  {
    n: "03",
    title: "Make it happen",
    body: "Plans are worth little without follow-through. I work alongside your team to implement changes, build the routines, and make sure they hold.",
  },
  {
    n: "04",
    title: "Hand back stronger",
    body: "The goal is a capable, confident team — not a dependency on me. I leave you with the tools and habits to keep improving on your own.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="section-dark relative scroll-mt-28 overflow-hidden">
      <div
        aria-hidden
        className="motif-facets pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">How I work</p>
            <h2 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
              A grounded, practical way of working
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              No thick reports left on a shelf. Just clear diagnosis, sensible
              priorities, and changes that make the day-to-day genuinely
              easier.
            </p>
          </Reveal>

          <ol className="relative space-y-px">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 90}>
                <li className="group grid grid-cols-[auto_1fr] gap-6 border-t border-border/70 py-7 transition-colors duration-500 hover:border-sage/50">
                  <span className="font-display text-2xl font-light text-sage tabular-nums">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
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
