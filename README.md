# VELMONT — Private Client Digital Experience

Two landing experiences for the VELMONT house:

- **`/automotive`** — VELMONT AUTOMOTIVE · Private Automotive Office
- **`/horology`** — VELMONT HOROLOGY · Private Watch Office
- **`/`** — the master-brand threshold between the two

VELMONT does not sell inventory. It represents private clients in the
acquisition and disposal of exceptional assets. The site is built around
that model: no stock grids, no dealership UI — mandates, briefs and a
private-client register.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Zod

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Architecture

```
src/
  app/                    Routes: gateway, houses, flows, legal, API
    api/mandates/         Mandate intake (zod validation, spam controls)
  components/
    brand/                Monogram (V mark), Wordmark
    motion/               Reveal, SplitLines (masked lines), Parallax
    sections/             Hero, Difference, Mandates, Process,
                          PrivateClients, Trust, Invitation
    site/                 Nav, Footer, Scene (hero atmosphere), Intro,
                          Gateway, HousePage, LegalPage
    ui/                   Cta, Field, Choice (custom radio/checkbox),
                          Select (searchable combobox), Upload,
                          ProgressTrail
    flow/                 FlowShell (the mandate engine), PrivateAccess
  content/                CMS-shaped content: copy, mandates, nav,
                          manufacturers/models, manufactures/references
  flows/                  Flow configurations (data, not components)
  lib/                    analytics, schemas, draft persistence, utils
```

### Design system

Two themes share one token set. `[data-theme="automotive"|"horology"]`
defines the CSS variables (`--v-ground`, `--v-ink`, `--v-accent`, …);
Tailwind reads them through `tailwind.config.ts`, so every component is
written once and inherits its house. Champagne (`#D4B073`) is an accent
in both worlds — never a flood.

Type: Cormorant Garamond (editorial display) + Archivo (tracked grotesk
labels), via `next/font` with `display: swap`. Fluid scale utilities
(`.type-hero`, `.type-display`, `.type-question`, `.type-label`) live in
`globals.css`.

Motion: one easing curve (`cubic-bezier(0.22,1,0.36,1)`), long
durations, masked line reveals, drawn hairlines. `prefers-reduced-motion`
is respected everywhere (animations collapse to visible state).

### The mandate flows

`src/flows/*.ts` describe each experience as data: steps, conditional
stages (`when`), dynamic options (models by manufacturer, collections by
manufacture), follow-up detail fields, review composition. One engine —
`FlowShell` — renders all four (acquire/sell × automotive/horology):

- one question per screen, advisor language, time-of-day greeting
- drafts persist in `localStorage`; a refresh loses nothing
- elegant progress trail (compact drawn line on phones)
- composed review — the brief set like a specification sheet, not a table
- high-value mandates quietly change register (“Private Client Mandate”,
  optional private consultation) — no “VIP detected”, ever
- calm validation copy (“Please complete this detail before continuing.”)

### Mandate intake (`POST /api/mandates`)

Server-side zod validation (`lib/schemas.ts`), plus spam architecture:
honeypot field, minimum composition time, per-IP rate limiting — all
failing silently. `deliverMandate()` is the single integration point for
CRM/email/webhook delivery; the payload shape is already CRM-ready.
References (`VA-XXXXX` / `VH-XXXXX`) are issued server-side.

Image uploads are previewed client-side; metadata rides with the
submission. Wire binary storage (S3 presigned URLs or similar) into the
Upload component's change handler + a `/api/uploads` route when storage
exists.

### Analytics

`lib/analytics.ts` — vendor-neutral `track()` pushing to `dataLayer`
(GTM-ready). Prepared events: `hero_acquisition_clicked`,
`source_started/_step_viewed/_completed/_abandoned`, `sell_*`,
`private_access_requested`, `consultation_requested`, `whatsapp_clicked`.
Stage abandonment is tracked by stage id only — free-text content never
leaves the device via analytics.

### CMS readiness

Everything a CMS will own is typed in `src/content/types.ts` and
supplied from `src/content/*.ts`: hero media (video/image slots per
house — the composed atmosphere renders until real footage exists),
copy, current mandates, process steps, trust points, manufacturers,
models, manufactures, collections. The `proof` register ships **empty by
design** — it renders only verified items (press, partners,
accreditations) added later. No invented claims anywhere.

## Honesty constraints (kept deliberately)

- No fabricated awards, volumes, reviews, locations or partnerships
- Finance is captured as a *preference* only; Velmont provides no
  regulated finance through this site
- Private-client copy promises a way of working, not access to specific
  assets
- Sell flows promise a private review — never a valuation or acceptance
