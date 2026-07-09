import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Wordmark } from "@/components/brand/wordmark";
import { Reveal } from "@/components/site/reveal";

/* EXAMPLE COPY — placeholder positioning for the meeting demo; Conor to refine. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b bg-background"
    >
      <div
        aria-hidden
        className="motif-facets pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <Reveal className="max-w-3xl">
          <Wordmark variant="full" />

          <p className="eyebrow mt-10">Supply Chain &amp; Operations Advisory</p>

          <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
            Clearer operations.
            <br />
            Stronger supply chains.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Cloon Operations Advisory helps manufacturers and growing businesses
            untangle their supply chain and operations — turning day-to-day
            firefighting into steady, dependable performance.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className={cn(buttonVariants({ size: "lg" }), "h-12 px-6 text-base")}
            >
              Start a conversation
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#approach"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-6 text-base"
              )}
            >
              See how I work
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
