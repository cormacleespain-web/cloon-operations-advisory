import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  /** Decorative marks (paired with a visible wordmark) are hidden from AT. */
  decorative?: boolean;
  title?: string;
};

/**
 * Faceted "C" monogram for Cloon Operations Advisory.
 * A geometric octagonal C — navy body with slate + Burren-sage facets,
 * echoing the temp logo's grey/green + engineering geometry. Theme-aware
 * via CSS custom properties, so it recolors in dark mode automatically.
 */
export function LogoMark({
  className,
  decorative = false,
  title = "Cloon Operations Advisory",
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-9 w-9", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : "cloon-mark-title"}
      xmlns="http://www.w3.org/2000/svg"
    >
      {!decorative && <title id="cloon-mark-title">{title}</title>}
      <defs>
        <clipPath id="cloon-c-clip">
          <path d="M94,42 L94,28 L72,6 L28,6 L6,28 L6,72 L28,94 L72,94 L94,72 L94,58 L70,58 L58,70 L42,70 L30,58 L30,42 L42,30 L58,30 L70,42 Z" />
        </clipPath>
      </defs>

      {/* Base C body */}
      <path
        d="M94,42 L94,28 L72,6 L28,6 L6,28 L6,72 L28,94 L72,94 L94,72 L94,58 L70,58 L58,70 L42,70 L30,58 L30,42 L42,30 L58,30 L70,42 Z"
        fill="var(--foreground)"
      />

      {/* Facets clipped to the C body */}
      <g clipPath="url(#cloon-c-clip)">
        {/* upper-left darker facet */}
        <polygon points="6,28 28,6 40,40 20,44" fill="var(--foreground)" opacity="0.85" />
        {/* upper-right slate facet */}
        <polygon points="72,6 94,28 94,44 60,34" fill="var(--chart-2)" opacity="0.55" />
        {/* Burren-sage facet, lower-left (mirrors the temp logo's green) */}
        <polygon points="6,72 28,94 40,64 20,56" fill="var(--sage)" opacity="0.9" />
        {/* lower slate facet */}
        <polygon points="42,70 72,94 40,94" fill="var(--chart-2)" opacity="0.4" />
      </g>
    </svg>
  );
}
