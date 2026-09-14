# Spüdeli — Wirral's smokehouse deli

A cinematic single-page site for **Spüdeli**, Birkenhead: an enter experience,
full-bleed smokehouse hero, the craft story, signature dishes, the full menu,
ordering, and find-us.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion

```bash
npm install
npm run dev
npm run build && npm start
```

## Content

All copy, the full menu (real items and prices), address and ordering links
live in **`src/content/site.ts`**. Menu data was taken from Spüdeli's live
listing on The Wirral Bites and their Instagram (@spudeli_).

Opening times and a public phone number weren't published on those sources, so
the site says "Open 7 days a week" rather than inventing times — add exact
hours/phone to `site.ts` when confirmed.

## Imagery

The photography in `public/img` is **AI-generated concept imagery** (Higgsfield
`gpt_image_2.5`), made to set the smokehouse tone — not photos of Spüdeli's
actual dishes. Swap in real food photography (their Instagram has plenty) by
replacing the files in `public/img` with the same names.

Images are fetched at build time by `scripts/fetch-images.sh` (kept out of git
to keep the repo light). Run it once locally to preview with images:

```bash
bash scripts/fetch-images.sh && npm run dev
```

## Design

Dark smokehouse palette (obsidian, ash, ember, gold, bone) in
`tailwind.config.ts`; editorial type scale in `globals.css` (Cormorant Garamond
+ Archivo). Motion (enter gate, rising headlines, drifting embers, marquee)
respects `prefers-reduced-motion`.
