# PROJECT.md — Living Project Doc

Purpose: fast context for any Claude session. Read this first, skip broad exploration.
Update when architecture/services/conventions change. Compressed on purpose.

## What / Who

Marketing site for **Conor Lee**, supply-chain consultant. Trading name **Cloon
Operations Advisory**, target domain **cloon.ie** (not bought yet). Personal favour
project — NOT Dow Jones/DJP/Andes. Global Andes/Artifactory rules do not apply.
Single-page scroll site. Nothing sold through it. Copy = example placeholder;
About section has `[bracketed]` facts awaiting Conor's real details.

## Stack

- Next.js 16 App Router + Turbopack, TypeScript, Tailwind v4 (CSS `@theme`, no config file)
- shadcn/ui on **Base UI** (`@base-ui/react`) — NOT Radix. Components use `render={<el/>}` prop, not `asChild`
- Drizzle + Neon Postgres (provisioned, mostly unused — one seeded `users` table)
- Auth.js v5 (plumbing only, `providers: []`, dormant)
- Resend for contact form email
- Deploy: Vercel (`cormac-lees-projects/cloon-operations-advisory`), git push to main auto-deploys
- GitHub: `cormacleespain-web/cloon-operations-advisory`

## Layout map

```
src/app/
  page.tsx            Home: SiteHeader > Hero,Services,Approach,About,Positioning,Contact > SiteFooter
  layout.tsx          Fonts (Geist, Geist Mono, Fraunces), metadata, dark-mode head script,
                      noscript reveal fallback, skip link
  globals.css         ALL design tokens + component classes (see Design system)
  actions/contact.ts  "use server" contact action: zod validate, honeypot, Resend send
  api/auth/[...nextauth]/route.ts  Auth.js handler (dormant)
src/components/
  brand/logo-mark.tsx    Faceted octagonal "C" SVG, theme-aware via CSS vars
  brand/wordmark.tsx     Mark + "Cloon Operations Advisory" lockup; variants compact|full
                         (full currently unused — header owns logo, hero has none by design)
  brand/facet-field.tsx  Large decorative facet SVG (hero + About panel); 3 layers drift
                         via CSS keyframes facet-drift-a/b/c in globals.css
  site/site-header.tsx   "use client". Floating pill nav, fixed, blur, condenses on scroll.
                         Mobile Sheet menu
  site/site-footer.tsx   Dark band footer
  site/reveal.tsx        "use client". IntersectionObserver blur-fade-up reveal; delay prop
                         stagger; motion-safe only + noscript fallback
  sections/*.tsx         hero, services, approach (dark), about, positioning (dark), contact
  contact-form.tsx       "use client". useActionState + server action; honeypot; aria wiring
  ui/*                   shadcn baseline (Base UI flavour) — don't hand-edit style system
src/db/                  schema.ts (users), index.ts (neon-http client), seed.ts
oneshot/                 Design pipeline docs: state.md (read first), brief, design-system,
                         routing-log, changelog, qa/*
```

## Design system (source of truth: globals.css + oneshot/design-system.md)

- Brand: Burren grey/green + engineering geometry. Light-primary; `.dark` variant via
  OS `prefers-color-scheme` (head script adds class pre-paint)
- Palette (light): cream bg `#f4f1e7`, ink navy fg `#1f2a38`, sage accent `--sage #5a6e52`
  (accent only, never body text), slate `--chart-2`, warm-white card
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
| `AUTH_SECRET` | Set all envs; unused until providers added |
| `RESEND_API_KEY`, `RESEND_EMAIL_DOMAIN` | Resend via Vercel integration; domain metadata cloon.ie (unverified) |
| `CONTACT_TO_EMAIL` | `cormacleespain@gmail.com` TEMPORARY — Resend sandbox only delivers to account owner address. After cloon.ie verified: switch to real inbox, one env change |
| `CONTACT_FROM_EMAIL` | Unset — code falls back to `onboarding@resend.dev` sandbox sender |

Frontend shows `hello@cloon.ie` everywhere (footer + contact section) — display only,
independent of delivery address.

## Gotchas (cost real time — respect these)

1. **Git push**: needs gh account `cormacleespain-web`, NOT default `CormacLeeDJ`.
   Fix: `gh auth switch --user cormacleespain-web && gh auth setup-git`
2. **Base UI buttons**: `Button render={<a/>}` logs console error (`nativeButton`).
   Pattern used instead: plain `<a>`/`<button>` styled with `buttonVariants()`
3. **lucide-react**: brand icons removed (no `Linkedin`). Inline SVG `LinkedinIcon`
   lives in sections/contact.tsx
4. **Turbopack cache**: never delete `.next` while dev server runs — corrupts SST cache,
   panics. Stop server, `rm -rf .next`, restart
5. **npm**: always `--legacy-peer-deps`
6. **Stray lockfile** at `~/package-lock.json` confused Turbopack root — fixed via
   `turbopack.root` in next.config.ts
7. Resend test mode: recipients other than account owner get 403 until domain verified
8. zod v4: `z.email()` top-level, not `z.string().email()`

## Commands

`npm run dev` (use Preview MCP `.claude/launch.json` name "dev") · `npm run build` ·
`npm run db:push` / `db:seed` (drizzle-kit, reads .env.local) · `npm run lint`

## Current state (2026-07-10)

Shipped through commit `c5099e8`. Premium restyle done (editorial hero, navy bands,
facet centerpiece, pill nav). Contact form sends live via Resend. Build clean, QA clean
(oneshot/qa/*). Working tree clean on `main`.

## Open items

- Buy cloon.ie; add to Vercel; verify domain in Resend; set `CONTACT_FROM_EMAIL`
  + real `CONTACT_TO_EMAIL`
- Replace About `[placeholders]` + real LinkedIn/phone
- Decide keep/strip dormant Auth.js + Neon
- Possible next: "visual direction v2" branch (user mentioned; not created yet)

## Review findings (2026-07-10, non-blocking)

- `wordmark.tsx` `full` variant dead code — keep (footer/future) or strip
- `site-header.tsx` uses `window scroll` listener for condense state — fine (cheap
  boolean flip), but don't extend it for continuous scroll animation
- Auth.js route + db seed ship in prod bundle though unused — harmless, revisit at cleanup
- `sections/contact.tsx` LinkedIn href is placeholder `https://www.linkedin.com/`
- Honeypot uses `aria-hidden` div + `tabIndex={-1}` — correct, leave as is
