"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = React.ComponentProps<"div"> & {
  /** Stagger delay in ms, applied only when motion is allowed. */
  delay?: number;
};

/**
 * Fades + lifts children into view on scroll. Accessible by construction:
 * the hidden state uses `motion-safe:` only, so users with reduced-motion
 * (and, via a <noscript> fallback in layout) users without JS always see
 * content immediately.
 */
export function Reveal({ className, delay = 0, style, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={shown ? "shown" : "hidden"}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms", ...style }}
      className={cn(
        "motion-safe:transition motion-safe:duration-700 motion-safe:ease-out",
        !shown && "motion-safe:translate-y-4 motion-safe:opacity-0",
        className
      )}
      {...props}
    />
  );
}
