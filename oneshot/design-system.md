# Design System — Cloon Operations Advisory

**Generated:** 2026-07-09 via `brand` + `ui-ux-pro-max` (oneshot Stage 1)
**Stack:** Next.js 16 (App Router) + Tailwind v4 + shadcn/ui

## Pattern & Style
Grounded, credible, quietly precise. A serif/sans duality expresses the brand rationale:
warm serif (heritage / Burren land) for display, clean geometric sans (engineering /
operations) for UI and body. Generous whitespace, light-mode primary, restrained motion.
Not a flashy SaaS site — a trustworthy advisory practice.

## Colors (light-mode primary)
| Token | Hex | Role |
|---|---|---|
| Cream | `#F4F1E7` | `--background` |
| Warm white | `#FBFAF4` | `--card`, `--popover` |
| Ink navy | `#1F2A38` | `--foreground`, `--primary` |
| Slate blue-grey | `#6E7F92` | `--muted-foreground`, `--secondary` |
| Burren sage | `#5A6E52` | `--accent` — CTAs / active states / facet highlight only |
| Sage deep | `#47583F` | accent hover |
| Border | `#E1DCCB` | hairline dividers on cream |

Dark variant (optional polish): navy `#161F2A` background, cream `#F4F1E7` text, sage
accent lightened for contrast. Wired via `prefers-color-scheme` + `data-theme`.

**Contrast notes:** navy-on-cream ≈ 12:1 (AAA body). Sage is accent-only — never small
body text; verify ≥3:1 for UI use. Slate blue-grey used for muted/secondary text at
larger sizes only.

## Typography
- **Display / eyebrow:** Fraunces (serif, `--font-display`) — hero lockup, section H2s optional.
- **UI / body:** Geist (sans, `--font-sans`) — nav, body, buttons, cards.
- **Mono:** Geist Mono (`--font-mono`) — incidental only.
- Scale: fluid `clamp()` for hero; standard Tailwind steps elsewhere. Tight leading on
  display, comfortable (1.6) on body.

## Effects
- Radii: moderate (`--radius: 0.625rem`).
- Shadows: soft, low-spread, warm-tinted.
- **Faceted-polygon motif:** thin low-opacity geometric lines (echoing the logo facets)
  as hero backdrop + section dividers. Subtle, never decorative-noisy.

## Anti-patterns to avoid
- Generic SaaS gradients / glassmorphism.
- Stock corporate blue.
- Over-animation (no parallax, no scroll-jacking).
- Sage green as body text or large fills — it's an accent.
