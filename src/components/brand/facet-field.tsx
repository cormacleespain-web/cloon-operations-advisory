import { cn } from "@/lib/utils";

/**
 * Large faceted composition for the hero — the brand's "C" geometry exploded
 * into drifting angular shards. Purely decorative; GPU-safe drift (transform
 * only) that freezes automatically under prefers-reduced-motion via globals.
 */
export function FacetField({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden
      className={cn("h-full w-full", className)}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="facet-navy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--foreground)" stopOpacity="0.12" />
          <stop offset="1" stopColor="var(--foreground)" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="facet-slate" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--chart-2)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--chart-2)" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="facet-sage" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--sage)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--sage)" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* Layer A — large slow shards */}
      <g className="facet-layer-a">
        <polygon points="300,60 470,150 430,340 250,300" fill="url(#facet-navy)" />
        <polygon points="470,150 560,300 430,340" fill="url(#facet-slate)" />
        <polygon
          points="300,60 470,150 250,300"
          fill="none"
          stroke="var(--foreground)"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
      </g>

      {/* Layer B — mid shards */}
      <g className="facet-layer-b">
        <polygon points="250,300 430,340 380,520 210,470" fill="url(#facet-navy)" />
        <polygon
          points="430,340 560,300 500,500 380,520"
          fill="none"
          stroke="var(--chart-2)"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <polygon points="120,220 250,300 210,470 80,400" fill="url(#facet-slate)" />
      </g>

      {/* Layer C — sage accent shards (mirrors the logo's green facet) */}
      <g className="facet-layer-c">
        <polygon points="80,400 210,470 160,560 60,520" fill="url(#facet-sage)" />
        <polygon points="250,300 210,470 120,220" fill="url(#facet-sage)" opacity="0.5" />
      </g>
    </svg>
  );
}
