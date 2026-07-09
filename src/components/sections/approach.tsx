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
    <section id="approach" className="scroll-mt-24 border-b bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">How I work</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              A grounded, practical way of working
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No thick reports left on a shelf. Just clear diagnosis, sensible
              priorities, and changes that make the day-to-day genuinely
              easier.
            </p>
          </Reveal>

          <ol className="relative space-y-10 border-l border-border pl-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 70}>
                <li className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[2.6rem] flex size-8 items-center justify-center rounded-full border bg-card font-mono text-xs font-medium text-sage"
                  >
                    {step.n}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
