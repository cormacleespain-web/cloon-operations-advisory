# QA — cloon-premium-restyle

**Date:** 2026-07-09
**Reviewer:** inline (Preview MCP) + `impeccable` critique pass.
**Authority:** `high-end-visual-design` (primary) + `impeccable` (polish); motion `emil-design-eng`.

## Method
Inline QA via Preview MCP + production `next build`. Full-page captures via a tall
viewport (the tool's scroll-then-screenshot desync made per-section scroll captures
unreliable; tall-viewport single-shot + DOM inspection was the reliable path).

## Results
| Check | Result |
|---|---|
| Console (light + dark) | ✅ clean |
| Production build (`next build`) | ✅ compiles, TS passes, `/` static |
| Logo/header duplication | ✅ fixed — hero no longer repeats the wordmark lockup |
| Navy bands (Approach, Positioning, Footer) | ✅ `.section-dark` recolors correctly (bg `#131b25`, cream text) |
| Contrast — navy-band muted text | ✅ ~7.6:1 |
| Contrast — sage on navy | ✅ ~6.5:1 |
| Double-bezel cards / premium shadows | ✅ render as intended |
| Facet centerpiece drift | ✅ GPU-safe transform; freezes under reduced-motion (globals) |
| Reveal (blur fade-up, staggered) | ✅ all 20 fired; `motion-safe` only + `<noscript>` fallback |
| Mobile (375px) | ✅ no horizontal overflow; hero + CTAs wrap cleanly |
| Contact form (validation + send path) | ✅ unchanged, still working |

## impeccable critique — applied
- **Removed numbered section eyebrows (01–04).** They were an AI-tell ("numbered
  markers as default scaffolding"). Numbers kept only on the Approach step sequence,
  where the order carries meaning.
- **Added `text-wrap: balance`** to section headings.

## impeccable critique — noted, not applied (primary-authority conflict)
- **Nested/double-bezel cards** and **per-section eyebrows**: impeccable discourages
  both, but they're core to `high-end-visual-design` (the chosen primary authority for
  this pass) and read as refined/intentional in review. Kept per the one-authority rule;
  logged here so the tradeoff is traceable.

## Follow-ups (non-blocking)
- Real Resend keys for live sending; verify cloon.ie domain.
- Replace About bracketed placeholders + real contact details.
- Optional: a visible light/dark toggle; screen-reader pass before public launch.
