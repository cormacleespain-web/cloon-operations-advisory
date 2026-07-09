import { LogoMark } from "@/components/brand/logo-mark";
import { FacetField } from "@/components/brand/facet-field";
import { Reveal } from "@/components/site/reveal";

/*
 * EXAMPLE COPY — the story is written to the right shape, but every square-
 * bracketed detail is a placeholder for Conor to replace with real facts.
 * Nothing here should be presented as verified until he confirms it.
 */
export function About() {
  return (
    <section id="about" className="scroll-mt-28 border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
              Hello, I&apos;m <span className="italic font-light">Conor Lee</span>
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
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

          <Reveal delay={90}>
            <div className="bezel-shell shadow-premium">
              <div className="bezel-core relative flex aspect-[4/5] items-center justify-center overflow-hidden">
                <FacetField className="absolute inset-0 opacity-80" />
                <LogoMark decorative className="relative size-32" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
