# Deploying to Truhost Kenya

This site builds to a fully static export (`output: "export"` in `next.config.ts`) —
no Node.js server is required at runtime. That makes it deployable on any Truhost
Kenya cPanel shared hosting plan without configuring cPanel's Node.js Selector.

## 1. Build the static site

```bash
npm install
npm run build
```

This produces an `out/` folder containing plain HTML/CSS/JS — every page pre-rendered
(home, catalogue index, all 19 category pages, about, contact).

## 2. Upload to Truhost cPanel

1. Log in to your Truhost cPanel account.
2. Open **File Manager** and navigate to `public_html` (or the subfolder for your
   domain/subdomain, e.g. `public_html/northbirdandco.com` if it's an addon domain).
3. Delete any placeholder `index.html` left by Truhost.
4. Zip the contents of the local `out/` folder (not the folder itself — its *contents*)
   and upload the zip via File Manager, then use **Extract** to unpack it directly
   into `public_html`. (Alternatively, connect via FTP/SFTP with the credentials from
   cPanel → FTP Accounts, and upload the contents of `out/` directly.)
5. Confirm `index.html`, the `catalogue/`, `about/`, `contact/` folders, and the
   `_next/` assets folder all sit at the root of `public_html`.

## 3. Point the domain

If northbirdandco.com is registered elsewhere, update its nameservers or A record to
Truhost's, or add it as an Addon Domain in cPanel pointing at the folder you uploaded
to. Enable **AutoSSL** (Security → SSL/TLS Status in cPanel) so the site serves over
HTTPS.

## 4. Re-deploying after changes

Every time you update the site: `npm run build`, then re-upload the new contents of
`out/` (overwrite existing files). There's no server process to restart.

## Alternative: Node.js hosting

Truhost's shared plans also support Node.js apps via cPanel's Node.js Selector
(Passenger), if this project ever needs server-side rendering, API routes, or other
dynamic features later. In that case, remove `output: "export"` from
`next.config.ts`, run `npm run build`, set the app's startup file to a small script
that calls `next start`, and point the Node.js Selector at the project root. This
isn't necessary today — the site has no server-side logic, so the static export
above is the simpler and recommended path.

## Before going live — open items

- **WhatsApp number**: `src/lib/site-config.ts` still has a placeholder
  (`+254700000000`). Replace `BRAND.whatsapp` with the confirmed Northbird business
  number before launch.
- **Domain**: confirm `northbirdandco.com` registration status.
- **Product photography**: the 6 itemized collections (Water Bottles, Flasks, Mugs &
  Tumblers, Key Holders, Signage & Display, Notebooks & Journals — 39 real, priced
  products from the current product sheet) currently render with a category emoji
  placeholder instead of photos. Add real photography by setting `imageUrl` on the
  matching product in `src/lib/catalogue-data.ts`.
- **13 remaining categories** (Pens, Wristbands, Gift Sets, Business Cards, Flyers &
  Brochures, Branded Apparel, Caps, Stickers & Labels, Stationery, Posters, Lanyards &
  ID Holders, Promotional Giveaways, Umbrellas) show a verified starting price from
  the brand bible but no itemized SKUs yet — they route straight to WhatsApp. Add
  real products for these once supplier data is available.
