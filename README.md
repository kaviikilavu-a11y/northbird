# Northbird & Co

Premium branded merchandise and corporate gifting, WhatsApp-first — no cart, no
account. A Visiora Enterprises company. Built with Next.js (App Router).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

- `src/lib/catalogue-data.ts` — the product/collection database.
- `src/lib/site-config.ts` — brand copy, colours, and the WhatsApp number.
- `src/app/` — pages (home, catalogue, catalogue/[slug], about, contact).

## Building for production

This project is configured for a static export (`output: "export"` in
`next.config.ts`), so `npm run build` produces a plain HTML/CSS/JS site in `out/`
deployable to any static host.

## Deploying to Truhost Kenya

See [DEPLOY.md](./DEPLOY.md) for step-by-step cPanel upload instructions and the
pre-launch checklist (WhatsApp number, domain, product photography).
