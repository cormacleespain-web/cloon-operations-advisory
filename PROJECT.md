# PROJECT.md — Living Project Doc

Purpose: fast context for any Claude session. Read this first, skip broad exploration.
Update when architecture/services/conventions change. Compressed on purpose.

## What / Who

Marketing site for **Conor Lee**, supply-chain consultant. Trading name **Cloon
Operations Advisory**, target domain **cloon.ie** (not bought yet). Personal favour
project — NOT Dow Jones/DJP/Andes. Global Andes/Artifactory rules do not apply.
Four-page public site (`/`, `/business-challenges`, `/how-i-work`, `/my-story`),
driven entirely by CMS content, plus a full Admin CMS (auth, section editors, media
library, draft/publish/revisions). Copy is Conor's real, verbatim-locked first batch
(17 Jul 2026) on the three subpages — no more `[bracketed]` placeholders; the old
placeholder About section is retired. Home is a shortened, adapted lead-in into the
three subpages (the one place wording may deviate from the source docs).

## Stack

- Next.js 16 App Router + Turbopack, TypeScript, Tailwind v4 (CSS `@theme`, no config file)
- `cacheComponents: true` — homepage and admin routes prerender a static shell with
  dynamic (session/DB) parts streamed in via Suspense (shows as `◐` in build output)
- shadcn/ui on **Base UI** (`@base-ui/react`) — NOT Radix. Components use `render={<el/>}` prop, not `asChild`
- Drizzle + Neon Postgres — `users` (legacy, unused), `admin_users`, `content_sections`
  (draft/published JSONB per section), `content_revisions`, `media`, `login_attempts`,
  `password_reset_tokens`
- Auth.js v5 — **active**: Credentials provider, JWT sessions, bcryptjs hashing
- TipTap (bold/italic/link only) for rich text; Zod schemas allowlist the JSON shape
  it produces — no raw HTML ever stored or rendered
- Vercel Blob for media (client-direct upload, bypasses serverless body-size limits)
- Resend for contact form + password-reset email
- sonner for admin toasts
- Deploy: Vercel (`cormac-lees-projects/cloon-operations-advisory`), git push to main auto-deploys
- GitHub: `cormacleespain-web/cloon-operations-advisory`

## Layout map

```
src/app/
  page.tsx                         Home: getPublishedContent() -> <SiteRenderer page="home">
  business-challenges/page.tsx     Each ~15 lines: getPublishedContent() -> <SiteRenderer
  how-i-work/page.tsx                page="...">, + generateMetadata() from that page's
  my-story/page.tsx                  own `seo` field (title/description/OG)
  layout.tsx          Fonts, generateMetadata() from CMS settings, dark-mode script, skip link
  globals.css         ALL design tokens + component classes (see Design system)
  actions/contact.ts  Public contact form action
  actions/auth.ts     login/logout/requestPasswordReset/resetPassword (rate-limited)
  actions/content.ts  saveDraft/publish/discardDraft/restoreRevision/listRevisions
  actions/media.ts    listMedia/recordMedia/updateMediaAlt/deleteMedia
  api/auth/[...nextauth]/route.ts   Auth.js handler
  api/media/upload/route.ts         Vercel Blob client-upload token route (handleUpload)
  login/                            Sign-in, forgot, reset password pages (public)
  admin/
    preview/page.tsx                Draft-content site preview; sibling of (dashboard), NOT
                                     wrapped in the admin sidebar layout. `?page=` search param
                                     (async, Next 16) selects which of the 4 pages to preview;
                                     banner has a page-switcher matching each editor's
                                     PublishBar previewHref
    (dashboard)/                    Route group — owns the sidebar/guard layout so
                                     /admin/preview can render the bare public site
      layout.tsx                   AdminSidebar + AdminGuard, each in its own Suspense
      page.tsx                     Overview: publish-status cards grouped by sectionMeta.group
                                    (Homepage / Pages / Site)
      sections/[key]/page.tsx      Dispatches to the right editor; EDITOR_KEYS is the
                                    source of truth for which keys have a /sections/[key] editor
      navigation/page.tsx          Tabs: NavigationEditor + FooterEditor
      settings/page.tsx            Site title/description/OG fields
      media/page.tsx               Full media library
src/components/
  site-renderer.tsx      Shared by all 4 public routes AND admin draft preview — one
                         component, `page: SitePage` param picks the body, two content
                         sources (published vs draft) so preview can't visually drift
  rich-text.tsx          <RichText>/<RichInline> render the TipTap JSON allowlist; also
                         exports `renderTextNodes` (parameterized: leaf renderer + italic
                         class) so ScrollInk reuses the same bold/italic/link mark logic
  site/
    page-hero.tsx         Shared hero band for the 3 subpages (eyebrow/heading/optional intro)
    scroll-ink.tsx         Server component, zero JS. Wraps a rich-text doc's words in
                          `.ink-word` spans for the CSS scroll-linked ink-in effect (see
                          Design system). `aria-hidden` visual layer + `sr-only` plain-text
                          duplicate; renders one block span per paragraph (same className
                          contract as RichText's per-<p> className)
    site-header.tsx        next/link nav, `usePathname()`-driven active state (exact match;
                          hash/external links never active), logo -> Link href="/"
    Everything else unchanged from pre-restructure (logo, wordmark, facet-field, reveal)
  pages/                  One file per subpage body: business-challenges.tsx, how-i-work.tsx,
                          my-story.tsx — composed from PageHero + section-style bands
  sections/*.tsx          Home only now: hero, home-intro, home-teasers, home-experience,
                          contact. (services/approach/about/positioning retired — deleted,
                          not archived; their content_sections rows are simply ignored)
  admin/
    sidebar.tsx, admin-guard.tsx, content-skeleton.tsx, sidebar-skeleton.tsx
    section-editor-layout.tsx, publish-bar.tsx, revision-history.tsx
    rich-field-editor.tsx           TipTap editor + Bold/Italic/Link toolbar
    fields/                        text, rich, cta, icon-picker, image, seo, list-editor
                                   (generic reorder/duplicate/delete wrapper — nests: proven
                                   on Business Challenges' area -> review structure)
    editors/                       One file per section. Page editors (business-challenges,
                                   how-i-work, my-story) add a "Search & sharing" SeoField
                                   fieldset and set PublishBar previewHref to
                                   `/admin/preview?page=<key>`
    media/                         dropzone, media-grid, media-library, media-picker
  ui/                     shadcn baseline (Base UI flavour) — don't hand-edit style system
src/lib/
  auth-guard.ts           requireAdmin() — the REAL auth check (proxy is optimistic only)
  rate-limit.ts           DB-backed login/reset rate limiting
  media-client.ts         Client-side upload helper (dimension capture + Blob upload + DB record)
  content/
    schemas.ts            Zod per section + doc builders (docFromText, docFromParts,
                          inlineDocFromParts, emptyRichText, ...). `pageHeroSchema` and
                          `seoSchema` are shared shapes reused across the 3 subpage schemas
    defaults.ts           Typed fallback content. Subpage defaults are the verbatim client
                          copy — top-commented `VERBATIM, do not "fix" spelling/punctuation`
    icons.tsx             Curated lucide icon allowlist for the icon picker
    meta.ts               Admin nav titles/descriptions/group per section — sidebar and
                          overview both derive their groupings from this, no hardcoded lists
    queries.ts            getPublishedContent (cached, tag "content"), getDraftContent,
                           getAllDraftContent, getContentOverview, getCurrentYear (cached,
                           since Cache Components forbids bare `new Date()` in a Server Component)
src/hooks/use-section-editor.ts   Shared draft/dirty/save/publish/discard state machine
src/db/                  schema.ts, index.ts (neon-http client), seed.ts, seed-admin.ts
src/proxy.ts             Optimistic /admin/:path* redirect (renamed from middleware.ts in Next 16)
oneshot/                 Design pipeline docs: state.md (read first), brief, design-system,
                         routing-log, changelog, qa/*
```

## Design system (source of truth: globals.css + oneshot/design-system.md)

- Brand: Burren grey/green + engineering geometry. Light-primary; `.dark` variant via
  OS `prefers-color-scheme` (head script adds class pre-paint)
- Palette (light): cream bg `#f4f1e7`, ink navy fg `#1f2a38`, sage accent `--sage #5a6e52`
  (accent only, never body text), slate `--chart-2`, warm-white card
- Sidebar tokens (`--sidebar*`) already existed in globals.css pre-CMS — admin sidebar
  reuses them directly, no new design tokens were added for the admin UI
- Type: Fraunces = `font-display` (editorial serif, italics for emphasis), Geist = body/UI
- Key utility classes (globals.css `@layer components`):
  `.section-dark` (navy band re-themes child tokens), `.bezel-shell`/`.bezel-core`
  (double-bezel card), `.shadow-premium(-lg)`, `.eyebrow`, `.motif-facets` (line pattern),
  `.grain-overlay` (fixed noise)
- Motion language: `cubic-bezier(0.32,0.72,0,1)`, 500-900ms, blur-fade reveals,
  button-in-button arrow CTAs (`rounded-full` pill + nested icon circle),
  `active:scale-[0.98]`. All reduced-motion safe (global media query kills animation)
- **ScrollInk** (`.ink-word` in globals.css): CSS-only scroll-linked "ink-in" on select pull
  quotes/intros — `animation-timeline: view()`, gated behind
  `@supports (animation-timeline: view()) { @media (prefers-reduced-motion: no-preference) }`
  so Firefox/reduced-motion/no-JS all fall through to static full-colour text automatically.
  See `src/components/site/scroll-ink.tsx`
- Taste authority (oneshot): `high-end-visual-design` + `impeccable` polish; one authority
  at a time — don't mix other taste skills

## Services / env

Env template `.env.example`; real values `.env.local` (pull: `vercel env pull .env.local --yes`).

| Key | State |
|---|---|
| `DATABASE_URL` etc | Neon via Vercel integration, working |
| `AUTH_SECRET` | Set all envs; used by Auth.js JWT sessions |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob store `cloon-media` (public access), linked via `vercel blob create-store` |
| `ADMIN_EMAIL` / `ADMIN_INITIAL_PASSWORD` | One-shot inputs to `npm run db:seed-admin`; remove `ADMIN_INITIAL_PASSWORD` after first run |
| `RESEND_API_KEY`, `RESEND_EMAIL_DOMAIN` | Resend via Vercel integration; domain metadata cloon.ie (unverified); also used for password-reset emails |
| `CONTACT_TO_EMAIL` | `cormacleespain@gmail.com` TEMPORARY — Resend sandbox only delivers to account owner address. After cloon.ie verified: switch to real inbox, one env change |
| `CONTACT_FROM_EMAIL` | Unset — code falls back to `onboarding@resend.dev` sandbox sender |

Frontend shows `hello@cloon.ie` everywhere (footer + contact section) — now CMS-editable
via Navigation & Footer, no longer hardcoded.

## Gotchas (cost real time — respect these)

1. **Git push**: needs gh account `cormacleespain-web`, NOT default `CormacLeeDJ`.
   Fix: `gh auth switch --user cormacleespain-web && gh auth setup-git`
2. **Base UI buttons**: `Button render={<a/>}` logs console error (`nativeButton`).
   Pattern used instead: plain `<a>`/`<button>` styled with `buttonVariants()`
3. **lucide-react**: brand icons removed (no `Linkedin`). Inline SVG lives in
   `src/lib/content/icons.tsx` (icon allowlist) — reused from the old inline `LinkedinIcon`
4. **Turbopack cache**: never delete `.next` (or run `npm run build`) while `next dev` is
   running — corrupts the persistent cache and panics with SST/task-restore errors.
   Always `preview_stop` (or kill dev) → `rm -rf .next` → restart
5. **npm**: always `--legacy-peer-deps`
6. **Stray lockfile** at `~/package-lock.json` confused Turbopack root — fixed via
   `turbopack.root` in next.config.ts
7. Resend test mode: recipients other than account owner get 403 until domain verified
8. zod v4: `z.email()` top-level, not `z.string().email()`
9. **Next.js 16 breaking changes** (see `node_modules/next/dist/docs/`): `middleware.ts` →
   `proxy.ts` (Node runtime only, no `edge`); proxy is optimistic-only for auth — the real
   check must live in the Server Action / page (`requireAdmin()`); `revalidateTag` now
   requires a profile arg; `updateTag`/`refresh` are Server-Action-only, new in 16;
   `params`/`searchParams` always async, no sync fallback
10. **Cache Components**: a bare `new Date()`/`Math.random()` in a Server Component throws
    at build ("uncached data accessed outside Suspense") — wrap it in a `'use cache'`
    function (see `getCurrentYear()`) or read `connection()`/`cookies()` first
11. **Route groups matter for layout opt-out**: any page under `app/admin/**` inherits
    `admin/layout.tsx`. `/admin/preview` needs to render the bare public site (via
    `SiteRenderer`), not the admin sidebar — solved by moving all sidebar-chrome pages
    into `app/admin/(dashboard)/` and leaving `preview/` as a URL-identical sibling
12. **Base UI `AlertDialogAction` does not auto-close the dialog** (unlike Radix). Every
    confirm dialog (Publish/Discard/Delete/Restore) must control `open` state itself and
    close it in the action's `onClick`, or the dialog is left open after a successful action
13. **`neonctl` needs interactive browser OAuth** — doesn't work in a fully non-interactive
    agent session (60s timeout waiting for a browser that isn't there); works fine once
    Cormac has an authenticated browser tab open (confirmed 2026-07-21). No `NEON_API_KEY`
    is set in `.env.local`. `npx neonctl projects list` / `branches list` prompt
    interactively for org — pass `--org-id org-super-salad-90346770` to skip the prompt
14. **Preview MCP's browser tab reports `document.hidden === true`** (backgrounded at the
    OS/compositor level even though it's the "active" preview tab). This throttles
    `requestAnimationFrame`, so anything relying on `scroll-behavior: smooth` — anchor-scroll,
    `animation-timeline: view()` — never visibly animates under `javascript_tool` exec or
    screenshots, even though it's correctly wired (verify via `CSS.supports`, computed
    `animationName`/`animationTimeline`, or explicit `behavior:'instant'` scrolls instead)
15. **Full-page/tall-viewport screenshots can visually duplicate `position: fixed` elements**
    (the fixed header showing twice, at the wrong offset) — a capture-technique artifact, not
    a real bug. Confirm via `document.querySelectorAll('header').length` before assuming a
    duplicate-render regression

## Commands

`npm run dev` (use Preview MCP `.claude/launch.json` name "dev") · `npm run build` ·
`npm run db:push` / `db:seed` / `db:seed-admin` (drizzle-kit + admin user, reads .env.local) ·
`npm run lint`

## Current state (2026-07-21)

**Shipped.** `feature/client-copy-pages` merged (ff-only) and pushed to `main`; Vercel
auto-deployed. The production DB cutover (`DELETE FROM content_sections; DELETE FROM
content_revisions;`) has been run for real on production Neon — confirmed via direct query
(0 rows before the next publish) and via local dev pointed straight at production (hero
shows the new copy, not the stale pre-restructure text). Verified first on a disposable
Neon branch (`cutover-test`, off `main`) before touching prod; that branch has since been
deleted, `.env.local` is back to the real `DATABASE_URL`. Full history in
`oneshot/qa/client-copy-pages.md` and `oneshot/changelog.md`.

Site is now 4 pages (`/`, `/business-challenges`, `/how-i-work`, `/my-story`), Admin CMS
live, zero DB schema migrations for the whole task, build/lint clean throughout.

## Open items

- Buy cloon.ie; add to Vercel; verify domain in Resend; set `CONTACT_FROM_EMAIL`
  + real `CONTACT_TO_EMAIL`
- Real photo for Home — Experience (`homeExperience.image`) — currently the facet-mark
  placeholder, same as the old About section always was
- Possible next: "visual direction v2" branch (mentioned previously; not created)

## Review findings (2026-07-20, non-blocking)

- `wordmark.tsx` `full` variant dead code — carried over, still unused
- `site-header.tsx` uses a `window` scroll listener for condense state — fine (cheap
  boolean flip), but don't extend it for continuous scroll animation
- `db/seed.ts` (legacy `users` table) ships in prod bundle though unused — harmless,
  revisit at cleanup alongside deciding whether to drop the `users` table entirely
- Business Challenges' second area ("Manufacturing Capacity") has no category label in
  the client doc the way the other two do ("Operational Performance", "Transformation
  Readiness") — `"Manufacturing Capacity"` as the area title is an inferred structural
  label, not verbatim client text; the review title itself ("Manufacturing Capacity
  Review") is verbatim
- Cross-page `/#contact` anchor-scroll and the ScrollInk ink-in animation could not be
  visually verified frame-by-frame in this session's preview browser (see Gotcha #14) —
  verified instead via hrefs/target ids, `CSS.supports`, and computed animation properties
