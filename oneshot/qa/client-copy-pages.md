# QA — client-copy-pages (multi-page restructure, Copy Batch 1)

**Date:** 2026-07-20
**Reviewer:** inline (Preview MCP) + direct DB reads for content-fidelity checks.
**Authority:** `high-end-visual-design` (primary) + `impeccable` (polish), carried over from
the premium restyle — one authority at a time, per `oneshot/state.md`.
**Branch:** `feature/client-copy-pages`, local only — not pushed, not merged. 6 commits,
one per increment, all individually build+lint clean.

## Method
Inline QA via Preview MCP + production `next build`. Copy fidelity verified with a script
(scratchpad) that flattens the built TypeScript defaults back to plain text and checks every
non-label line from the four `textutil`-extracted `.txt` source docs appears verbatim in the
output. Admin flows verified by driving the actual save/discard/publish/preview UI, then
confirming via direct `db:` reads that no stray content was left in the shared dev/prod Neon
DB. Same known tool limitation as the premium-restyle QA: this harness's browser tab reports
`document.hidden === true` (backgrounded at the OS/compositor level), which throttles
`requestAnimationFrame` — CSS `scroll-behavior:smooth` animations (anchor-scroll,
ScrollInk's `animation-timeline: view()`) don't advance under synthetic exec, while explicit
`behavior:'instant'` calls and computed-style reads work fine. Treated as an environment
artifact, not a product bug, and verified by other means below.

## Results
| Check | Result |
|---|---|
| Production build (`next build`) | ✅ compiles, TS passes, all 4 routes prerender static |
| `npm run lint` | ✅ clean, every increment |
| `db:push` drift | ✅ none — zero schema migrations for this whole task |
| Copy fidelity (script vs. 4 source `.txt` extractions) | ✅ zero diffs after one fix (see below) |
| Curly quotes / missing periods / "...ready?" ellipsis / mixed apostrophe on "We're not confident" | ✅ preserved exactly (verified byte-level against source before writing defaults) |
| Business Challenges: hero, pull quote, 3 areas × reviews, closing | ✅ verbatim, renders correctly light + dark |
| How I Work: hero, experience, 5 principles, expectations, outcome | ✅ verbatim, renders correctly |
| My Story: hero, 8+7 paragraphs around pull quote | ✅ verbatim, renders correctly |
| Nested Business Challenges editor (area → review, both depths) | ✅ add/reorder/delete exercised live in-browser, no cross-item state leakage |
| Editor save → discard round-trip (My Story) | ✅ save persists to draft, discard reverts to default, confirmed via direct DB read (no stray content left) |
| Admin sidebar / overview grouping (Homepage / Pages / Site) | ✅ derives from `sectionMeta`, no hardcoded lists left |
| Draft preview `?page=` switcher | ✅ found broken during this pass (never wired up, see Fixes below), fixed and verified across all 4 pages |
| Header active state (`aria-current`, sage dot) | ✅ exact-match only, correct per route, desktop + mobile Sheet |
| Mobile Sheet nav (375px) | ✅ all 4 links + CTA, active dot correct |
| Cross-page `/#contact` anchors (nav, footer, hero, CTAs) | ✅ hrefs and target `#contact` id all correct; smooth-scroll animation itself unverifiable in this harness (see Method) |
| ScrollInk (`animation-timeline: view()`) | ✅ `CSS.supports` true, `animationName`/`animationTimeline` correct on `.ink-word`, `aria-hidden` layer + `sr-only` plain-text duplicate both present and correctly paired |
| Dark mode (all 3 new pages + restructured home) | ✅ `.section-dark` bands recolor correctly |
| Light mode | ✅ alternating cream/navy area bands confirmed distinct (dark-mode screenshot initially made this ambiguous — re-verified in light) |

## Fixes made during verification (not separate increments)
1. **"Working Together" dropped from How I Work.** The copy-diff script caught it: doc 3's
   structure is title / subheading / intro paragraph, and the subheading was skipped when
   building the hero default (an invented eyebrow was used instead). Fixed to use the
   verbatim client phrase as the eyebrow.
2. **Admin draft preview `?page=` param was never implemented.** Increment 2's plan item
   for this was deferred to pair with Increment 3's `SiteRenderer` page param, then missed.
   Found during this pass, fixed: `searchParams` now maps to a `SitePage`, with a
   page-switcher in the draft banner matching each editor's `PublishBar previewHref`.

## Known-deferred (per plan, per Cormac's explicit instruction)
- **DB cutover** (`DELETE FROM content_sections; DELETE FROM content_revisions;`) has **not**
  run anywhere, including a Neon branch. `neonctl` needs interactive browser OAuth this
  session couldn't provide (60s timeout, no `NEON_API_KEY` in `.env.local`); Cormac chose to
  skip the local-branch verification step rather than unblock it. Consequence, confirmed by
  a direct DB read: only the `hero` row is stale (old pre-restructure copy, published during
  the Increment 0 roundtrip test) — `contact`/`navigation`/`footer`/`homeIntro`/
  `homeExperience`/`homeTeasers` never had rows and already serve the new copy. `approach`/
  `about` are harmless orphaned rows from the CMS branch's own verification, ignored by the
  generic query layer. **Go-live checklist:** run the cutover DELETE on the production Neon
  branch with Cormac's explicit confirmation before or immediately after this branch ships.
- Revision-restore was not exercised live on a *new* page key (would have left a real
  published row in the shared dev/prod DB without a safe way to clean it back up). The
  underlying `RevisionHistory`/`restoreRevision` code is unchanged and generic over
  `SectionKey` — already proven working pre-existing on `hero`/`contact` before this task.

## Follow-ups (non-blocking)
- Buy `cloon.ie`, verify domain in Resend, set `CONTACT_FROM_EMAIL` + real `CONTACT_TO_EMAIL`.
- Run the DB cutover at go-live (see above).
- Firefox real-device check for the `animation-timeline: view()` fallback (logic is a
  standard `@supports` gate; not independently verified on real Firefox this session).
