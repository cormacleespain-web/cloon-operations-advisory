# QA — cloon-landing

**Date:** 2026-07-09
**Reviewer:** inline (Preview MCP), not the isolated subagent — see note below.
**Authority checked against:** brand + ui-ux-pro-max; motion by emil-design-eng.

## Method
Inline QA via the browser Preview MCP against the running dev server, plus a
production `next build`. The isolated QA subagent (oneshot Stage 7 default for
Project size) was **skipped** — subagents are off-by-default in this environment
and the plan flagged confirming before spawning one. Cormac can request the full
subagent pass if he wants deeper coverage (e.g. full axe sweep, screen-reader run).

## Results

| Check | Result |
|---|---|
| Console (all sections, light + dark) | ✅ clean — no errors/warnings after fixing Base UI button-render nesting |
| Production build (`next build`) | ✅ compiles, TypeScript passes, `/` prerenders static |
| Contrast — muted body text on cream | ✅ ~5.6:1 (AA) |
| Contrast — sage eyebrow on cream | ✅ ~5.0:1 (AA) |
| Contact form — empty submit | ✅ server-action field errors render, wired via `aria-describedby` |
| Contact form — valid submit (no key) | ✅ graceful "not configured" fallback (expected locally) |
| Mobile (375px) hero + CTAs | ✅ full-width, readable |
| Mobile menu (Sheet) | ✅ opens, nav + CTA, close works |
| Dark mode (prefers-color-scheme) | ✅ navy/cream variant, mark recolors, no-flash script |
| Reduced-motion | ✅ reveal uses `motion-safe:` only; `<noscript>` fallback forces visibility |

## Follow-ups (non-blocking)
- Add real `RESEND_API_KEY` + `CONTACT_TO_EMAIL` to Vercel to enable live sending;
  verify `cloon.ie` in Resend for a branded `from` address.
- Optional: full axe-core scan + screen-reader pass (VoiceOver) before public launch.
- Replace bracketed placeholders in About + real LinkedIn/phone before go-live.
