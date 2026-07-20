# Northbird & Co — Project Handoff

This document exists because a lot of the *why* behind this codebase lives in
chat history, not in the code. Read this before making changes — several
things here look arbitrary in the code but are deliberate.

## What this is

Northbird & Co is a branded-merchandise / corporate-gifting catalogue site for
a Kenyan business (parent company: Visiora Enterprises). It's a Next.js 16
App Router site, statically exported (`output: "export"`), because it needs
to run on **Truhost Kenya's shared cPanel hosting** — plain HTML/CSS/JS
uploaded to `public_html`, no Node server at runtime. There's also a Vercel
preview deployment and a GitHub Pages workflow for review purposes, but
Truhost is the real production target.

There is deliberately **no cart, no checkout, no payment integration, no
database**. Every "buy" action opens a pre-filled WhatsApp message
(`getWhatsAppLink()` in `site-config.ts`). This was a conscious design
decision, not a missing feature — see "Ordering model" below.

## Repo / branch

- Repo: `https://github.com/kaviikilavu-a11y/northbird`
- Working branch: `claude/truhost-kenya-deploy-goiaor`
- PR: `#2` (do not merge to `main` without explicit owner approval — this has
  been the standing instruction throughout the project)

## Stack

- Next.js 16.2.9, App Router, static export, Tailwind CSS v4
- Framer Motion for animation, Lenis for smooth scroll
- No CMS, no database — `src/lib/catalogue-data.ts` is the single source of
  truth for all product data (deliberate — see "Editing the catalogue" below)
- Fonts: Fraunces (display) + Inter (body)

## Directory map (what matters)

```
src/
  app/                    Route pages (App Router)
  components/             UI components
    motion/                Reveal, SmoothScroll, LoadingIntro, BorderBeam, motion-tokens
    mascot/                NorthbirdMascot (animated SVG), NorthbirdFlightController
    bundle/                "Bundle builder" (multi-product WhatsApp quote request)
  lib/
    catalogue-data.ts     ALL product/category data + pricing logic
    site-config.ts        Brand constants, colors, WhatsApp helpers, assetPath()
data/
  northbird-catalogue.csv CSV export of catalogue-data.ts for non-technical editing
  README.md               How the CSV editing workflow works
scripts/
  sync-catalogue-csv.mjs  Applies an edited CSV back into catalogue-data.ts
public/
  brand/                  Logo lockups, mascot SVG/PNG (see "Brand assets")
  products/               69 product photos, referenced by catalogue-data.ts
  hero/                   6 homepage hero slide images
```

## Brand assets (`public/brand/`)

These are **the real, approved assets** — sent directly by the business
owner with the instruction "use this exactly, no alteration." Do not
regenerate, re-color, or redraw the logo without explicit sign-off.

- `northbird-logo-lockup.png` — full lockup (mascot + "Northbird & Co" +
  "A VISIORA ENTERPRISES COMPANY" tagline), **dark charcoal ink**, transparent
  background. Use on light/cream backgrounds.
- `northbird-logo-lockup-cream-ink.png` — same lockup, **cream ink**,
  transparent background. Use on dark backgrounds (charcoal `#1F2A2E`).
  This exists because the dark-ink version is illegible on dark backgrounds —
  transparency alone doesn't fix that, the wordmark's ink color is baked into
  the artwork. Composited-preview proof of this is not kept in the repo, but
  the fix is live in `Nav.tsx`, `Footer.tsx`, `LoadingIntro.tsx`.
- `northbird-logo-lockup-on-cream.png` — legacy, pre-composited onto solid
  cream. Superseded by the transparent version; kept but not referenced
  anywhere anymore.
- `northbird-mascot.svg` — the source SVG for the animated mascot component
  (`src/components/mascot/NorthbirdMascot.tsx`), which adds `data-part`
  attributes for wing/body animation. If the mascot art ever needs to
  change, it needs to go through that component, not just drop in a new SVG.
- `northbird-wordmark.png`, `northbird-mascot.png` — supporting assets, not
  currently wired into any component.

**Where the logo appears and why each variant is used:**
| Location | State | Asset used |
|---|---|---|
| `Nav.tsx` | Transparent, over dark hero photo (homepage top) | cream-ink |
| `Nav.tsx` | Scrolled / interior pages (solid cream nav bg) | dark-ink |
| `Footer.tsx` | Always (charcoal bg) | cream-ink |
| `LoadingIntro.tsx` | Always (charcoal bg) | cream-ink |

## Pricing model

`ProductVariant.price` in `catalogue-data.ts` is the **final KES price shown
on the site** — it is not computed at runtime, it's a static number that was
calculated by hand during development and needs to be recalculated by hand
if costs change. The formula used:

```
final_price = (supplier_cost + branding_cost) × 1.4
```

- The `× 1.4` is a 40% margin, applied on top of supplier cost **and**
  branding cost combined — not on supplier cost alone. This was corrected
  partway through the project after an audit found some prices (notably
  gazebo tents) only marked up the base item and silently omitted branding
  cost, even though the site claims "inclusive of branding."
- When multiple branding-cost tiers exist for a product (e.g. gazebo tents
  had 3–4 branding tiers from screen-print to full-coverage), the **cheapest
  tier** is baked into the displayed price, and the product description notes
  that fuller coverage is available on request.
- `isBrandingIncluded(categorySlug)` in `catalogue-data.ts` controls whether
  the UI shows "inclusive of branding" for a category. Currently only
  `gift-sets` is excluded (gift sets are custom orders — branding is quoted
  separately, not baked into a fixed price). This is a `Set`-based allowlist
  pattern specifically so new exceptions are a one-line addition, not a
  scattered special case in every component.
- Water bottles have a flat +100 KES added to every price specifically for
  branding cost (a rougher approximation than the tiered gazebo approach,
  by explicit owner instruction).

**If you're asked to change a price:** find the product by name/ID in
`catalogue-data.ts` (or the CSV), and just edit the number. There is no
live formula to "recalculate" — someone (owner or AI) decided the final
number by hand using the formula above, and that's what's stored.

## Ordering model — no cart, by design

Every product card has "Add to Bundle" (a client-side, localStorage-backed
list — see `src/lib/bundle-context.tsx` and `src/components/bundle/`) and
"Order via WhatsApp" (direct `wa.me` link with a pre-filled message). The
"Bundle" is just a convenience for building one combined WhatsApp message
across multiple products — it is **not** a cart, has no checkout, and never
touches a server. This mirrors how the business actually operates: a human
replies on WhatsApp with a same-day quote. Don't "improve" this into a real
checkout flow without being asked — it's been an explicit, repeated decision.

WhatsApp number: `BRAND.whatsapp` in `site-config.ts` (currently
`+254764092265` — this has changed at least once during the project; if the
owner gives a new number, that's the only place it needs to change).

## Editing the catalogue without touching code

`data/northbird-catalogue.csv` + `scripts/sync-catalogue-csv.mjs` exist so
the non-technical owner (or a future AI without code context) can edit
prices/descriptions/colors via spreadsheet:

1. Regenerate the CSV from current data if it's stale (there's no automated
   export script currently — it was generated by hand; recreate it by
   reading `catalogue-data.ts` if needed).
2. Edit the CSV (columns documented in `data/README.md`).
3. `node scripts/sync-catalogue-csv.mjs path/to/edited.csv` rewrites the
   matching lines in `catalogue-data.ts` by `product_id`.
4. Always run `npx tsc --noEmit && npm run lint && npm run build` after.

This can only edit *existing* products — it can't add/remove products or
categories, and can't add new images (images have to be supplied as files
and copied into `public/products/` directly).

## Image/data provenance — read before trusting any "reference" data

Several times in this project, the owner supplied competitor screenshots or
data (pricing, product photos) as a reference. **Do not assume this is safe
to use without asking.** Specific history:

- A competitor named "Krayon Enterprises" was flagged and purged early in
  the project — photos with visible watermarks from this competitor were
  removed from the site. When "Krayon Enterprises" pricing data resurfaced
  later as a supposed reference, it was NOT used until the owner explicitly
  confirmed "it's my own supplier/reference — safe to use." If a source name
  matches something previously flagged as contaminated, ask again — don't
  assume a prior purge means all future mentions are safe, and don't assume
  a past clearance makes an old flag void either.
- Two "website reconstruction prompts" for real competing businesses (an
  agency called "OUTBOX" and an outdoor-gear brand called "Wander") were
  pasted in as design inspiration, including their real brand names, copy,
  and hosted assets. In both cases, only *techniques* (layout patterns,
  interaction ideas like an inverted-corner "cutout" CTA box) were borrowed
  — never their brand identity, copy, or media. If more "reconstruction
  prompts" for real businesses show up, apply the same filter.
- Product photos are a mix of real supplier/marketplace photos and
  AI-generated studio renders (e.g. gazebo tents, spin wheels) supplied
  directly by the owner as image files. None were sourced by scraping or
  reverse image search — only what the owner explicitly provided.

## Known open items (not yet resolved as of this handoff)

- **GitHub Actions `build` check fails** on every push — not a real failure.
  The Next.js build itself succeeds; the failure is in the `actions/configure-pages@v5`
  step because GitHub Pages isn't enabled in this repo's settings
  ("Resource not accessible by integration"). Someone with repo admin access
  needs to enable Pages in Settings, or the workflow step should be removed
  if GitHub Pages preview isn't actually needed.
- **Vercel Deployment Protection** is on, so preview URLs aren't publicly
  viewable without Vercel auth. Fix is in the Vercel dashboard
  (Project → Settings → Deployment Protection → off, or "Only Production
  Deployments") — nobody with an AI session has credentials to do this;
  it needs the project owner.
- No automated CSV *export* script exists yet, only the import
  (`sync-catalogue-csv.mjs`). The CSV in `data/` can go stale.

## Conventions worth preserving

- `assetPath()` from `site-config.ts` must wrap every raw `<img src>` (not
  needed for `next/image` or `next/link`, which handle `basePath`
  automatically) — this is what makes the GitHub Pages `/northbird` subpath
  build work without breaking the Truhost root-path build.
- Static export means **no server components that fetch at request time, no
  API routes, no middleware** — everything must be resolvable at build time.
- The project has been through several rounds of "revert to previous design"
  — the owner is decisive but changes their mind on visual direction
  sometimes. Don't be surprised by non-linear design history in git log.
- Full design/creative-direction context (a long "immersive digital
  experience" brief, mosey.com/VengeanceUI inspiration research) was
  discussed in chat but never saved as a doc in-repo. If it becomes
  relevant again, it isn't retrievable from the codebase — only from the
  owner.
