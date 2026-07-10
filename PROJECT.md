# PROJECT.md — Living Project Doc

Purpose: fast context for any Claude session. Read this first, skip broad exploration.
Update when architecture/services/conventions change. Compressed on purpose.

## What / Who

Marketing site for **Conor Lee**, supply-chain consultant. Trading name **Cloon
Operations Advisory**, target domain **cloon.ie** (not bought yet). Personal favour
project — NOT Dow Jones/DJP/Andes. Global Andes/Artifactory rules do not apply.
Single-page public scroll site, now driven entirely by CMS content, plus a full
Admin CMS (auth, section editors, media library, draft/publish/revisions) built on
`feature/admin-cms` — not yet merged to `main`. Copy is still example placeholder;
About section has `[bracketed]` facts awaiting Conor's real details.

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
  page.tsx            Home: fetches getPublishedContent(), renders <SiteRenderer>
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
    preview/page.tsx                Draft-content site preview; sibling of (dashboard),
                                     NOT wrapped in the admin sidebar layout
    (dashboard)/                    Route group — owns the sidebar/guard layout so
                                     /admin/preview can render the bare public site
      layout.tsx                   AdminSidebar + AdminGuard, each in its own Suspense
      page.tsx                     Overview: per-section publish status cards
      sections/[key]/page.tsx      Dispatches to the right editor for the 6 homepage keys
      navigation/page.tsx          Tabs: NavigationEditor + FooterEditor
      settings/page.tsx            Site title/description/OG fields
      media/page.tsx               Full media library
src/components/
  site-renderer.tsx      Shared by the homepage AND admin draft preview — one component,
                         two content sources (published vs draft), so they can't drift
  rich-text.tsx          <RichText>/<RichInline> — renders the TipTap JSON allowlist
  brand/, site/          Unchanged from pre-CMS (logo, wordmark, facet-field, reveal)
  sections/*.tsx         Now all props-driven (content: HeroContent etc.), zero hardcoded copy
  admin/
    sidebar.tsx, admin-guard.tsx, content-skeleton.tsx, sidebar-skeleton.tsx
    section-editor-layout.tsx, publish-bar.tsx, revision-history.tsx
    rich-field-editor.tsx           TipTap editor + Bold/Italic/Link toolbar
    fields/                        text, rich, cta, icon-picker, image, list-editor (generic
                                   reorder/duplicate/delete wrapper)
    editors/                       One file per section (hero/services/approach/about/
                                   positioning/contact/navigation/footer/settings)
    media/                         dropzone, media-grid, media-library, media-picker
  ui/                     shadcn baseline (Base UI flavour) — don't hand-edit style system
src/lib/
  auth-guard.ts           requireAdmin() — the REAL auth check (proxy is optimistic only)
  rate-limit.ts           DB-backed login/reset rate limiting
  media-client.ts         Client-side upload helper (dimension capture + Blob upload + DB record)
  content/
    schemas.ts            Zod per section + doc builders (docFromText, emptyRichText, ...)
    defaults.ts           Typed fallback content = today's hardcoded copy, converted
    icons.tsx             Curated lucide icon allowlist for the icon picker
    meta.ts                Admin nav titles/descriptions per section
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

## Commands

`npm run dev` (use Preview MCP `.claude/launch.json` name "dev") · `npm run build` ·
`npm run db:push` / `db:seed` / `db:seed-admin` (drizzle-kit + admin user, reads .env.local) ·
`npm run lint`

## Current state (2026-07-10)

`main` unchanged since the premium restyle. Admin CMS fully built on `feature/admin-cms`
(11 commits) — auth, section editors for all 9 content areas, draft/publish/revision
history, media library, draft preview — build/lint/typecheck clean, verified end-to-end
in browser (login, edit→publish→live-update, revision restore, media upload/delete).
**Not merged to main. Awaiting review.**

## Open items

- Buy cloon.ie; add to Vercel; verify domain in Resend; set `CONTACT_FROM_EMAIL`
  + real `CONTACT_TO_EMAIL`
- Replace About `[placeholders]` + real LinkedIn/phone (now editable via Admin → About/Contact)
- Review + merge `feature/admin-cms`, then remove `ADMIN_INITIAL_PASSWORD` from `.env.local`
  if still set
- Alt-text-on-blur in the media library could not be interactively verified in the sandboxed
  preview browser (no real OS focus) — code-reviewed, matches other verified save paths
- Possible next: "visual direction v2" branch (user mentioned; not created yet)

## Review findings (2026-07-10, non-blocking)

- `wordmark.tsx` `full` variant dead code — keep (footer/future) or strip
- `site-header.tsx` uses `window scroll` listener for condense state — fine (cheap
  boolean flip), but don't extend it for continuous scroll animation
- `db/seed.ts` (legacy `users` table) ships in prod bundle though unused — harmless,
  revisit at cleanup alongside deciding whether to drop the `users` table entirely
  now that `admin_users` exists
- Honeypot uses `aria-hidden` div + `tabIndex={-1}` — correct, leave as is
- `ImageField`'s media picker replaced the old manual URL-paste flow entirely — no
  fallback path if Blob is ever unreachable, but that's the correct tradeoff for a
  non-technical admin
