# Supdeli — Wirral delicatessen

A single-page site for Supdeli, a delicatessen on the Wirral: hero, kitchen
story, menu, order-online call to action, opening hours and contact.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where the content lives

**All copy, menu, address, hours, phone and the Just Eat link live in one
file:** `src/content/site.ts`. Edit that file to update the site — nothing
else needs touching.

### Awaiting real data (do not treat placeholders as fact)

Fields marked `// VERIFY` in `src/content/site.ts` are **placeholders** until
Supdeli's real details are confirmed from their live Just Eat listing:

- `address`, `phone`, `justEatUrl`, `social`
- `hours` (all set to `[ — ]`)
- the whole `menu` block — `menuIsPlaceholder = true` shows a visible
  "Sample layout" note on the page. The category structure is illustrative;
  prices are `—`. Replace with the real menu and set
  `menuIsPlaceholder = false` to remove the banner.

No menu item, price, address or claim has been invented as a real fact.

### Photography

The hero uses a composed warm gradient. Drop real photography in by adding an
`<img>` to `src/components/Hero.tsx` (the backdrop layer is marked in a
comment).

## Design

Warm delicatessen palette (espresso, bone, burnt-amber ember, deep olive) in
`tailwind.config.ts`; editorial type scale in `src/app/globals.css`
(Cormorant Garamond display + Archivo labels). Motion respects
`prefers-reduced-motion`.
