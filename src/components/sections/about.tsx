import { LogoMark } from "@/components/brand/logo-mark";
import { Reveal } from "@/components/site/reveal";

/*
 * EXAMPLE COPY — the story is written to the right shape, but every square-
 * bracketed detail is a placeholder for Conor to replace with real facts.
 * Nothing here should be presented as verified until he confirms it.
 */
export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-b bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Hello, I&apos;m Conor Lee
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                I&apos;ve spent [X years] in supply chain and operations across
                [industries — e.g. medical devices, food, manufacturing],
                working through the messy reality of making, moving and
                delivering product when things rarely go to plan.
              </p>
              <p>
                Cloon is named for [home place / townland] in the Burren — a
                landscape of grey limestone and green pasture that says a lot
                about how I work: grounded, straightforward, and built to last.
                My background blends [engineering / operations qualification]
                with years on real shop floors, so the advice is practical, not
                theoretical.
              </p>
              <p>
                I set up Cloon Operations Advisory to bring that experience to
                businesses that need clarity and momentum — without the overhead
                of a big consultancy.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="flex items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl border bg-background">
              <div
                aria-hidden
                className="motif-facets absolute inset-0 opacity-40"
              />
              <LogoMark decorative className="relative size-28" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
