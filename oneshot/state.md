# State

**Current stage:** idle (task complete — 6 increments, local branch, not shipped)
**Active task:** none
**Task size:** Project
**Primary taste authority:** `high-end-visual-design` + `impeccable` polish (restyle); `ui-ux-pro-max` tokens retained
**Status:** client-copy-pages shipped to `feature/client-copy-pages` (6 commits, local only —
never pushed, never merged; Cormac reviews and ships himself). Multi-page restructure around
Conor's first real copy batch: `/business-challenges`, `/how-i-work`, `/my-story` with
verbatim-locked client wording; home restructured as a shortened lead-in; ScrollInk
scroll-linked ink-in on pull quotes + key intros; nav/footer converted to next/link with
route-aware active state. Copy verified against source via automated diff (one dropped
subheading caught and fixed). Full QA: `oneshot/qa/client-copy-pages.md`. **One blocking
step before this is fully live: the DB cutover DELETE on production Neon** — deferred by
explicit instruction (no Neon branch access this session), documented in PROJECT.md
"Current state" and the QA doc's "Known-deferred" section.

## Pointers
- Brief: see `brief.md`
- Design system: see `design-system.md`
- Full history: see `changelog.md`
- Routing decisions: see `routing-log.md`
- Latest QA: `qa/cloon-premium-restyle.md`

## Next likely tasks
- Real Resend keys in Vercel + verify cloon.ie for live email sending.
- Replace About placeholders + real contact details.
- Optional: visible light/dark toggle; more sections (case studies / testimonials).
