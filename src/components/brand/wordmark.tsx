import { cn } from "@/lib/utils";
import { LogoMark } from "./logo-mark";

type WordmarkProps = {
  className?: string;
  /** "full" stacks the practice descriptor; "compact" is a single line for nav/footer. */
  variant?: "full" | "compact";
};

/**
 * Cloon Operations Advisory lockup — faceted mark + mixed-case wordmark.
 * "Cloon" set in the display serif (heritage/land), the descriptor in the
 * sans (operations/engineering).
 */
export function Wordmark({ className, variant = "compact" }: WordmarkProps) {
  if (variant === "full") {
    return (
      <span className={cn("flex items-center gap-4", className)}>
        <LogoMark decorative className="h-14 w-14 shrink-0" />
        <span className="flex flex-col leading-none">
          <span className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Cloon
          </span>
          <span className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Operations Advisory
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark decorative className="h-8 w-8 shrink-0" />
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          Cloon
        </span>
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Operations Advisory
        </span>
      </span>
    </span>
  );
}
