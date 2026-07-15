# Editing the catalogue via spreadsheet

`northbird-catalogue.csv` is a full export of every product in
`src/lib/catalogue-data.ts` (name, price, colours, description, image
filename, request-quote flag, best-value flag). Open it in Excel, Numbers,
or Google Sheets, edit the columns you need, and send the file back.

**Columns:**

| Column | Meaning |
| --- | --- |
| `category_slug` / `category_name` | Reference only — don't change; a product can't be moved to a different category this way. |
| `product_id` | Reference only — this is the key used to match rows back to the site. Don't change or the row won't apply. |
| `product_name` | Product title shown on the site. |
| `price_kes` | Final website price in KES, already inclusive of branding. Leave blank if `request_quote` is `yes`. |
| `request_quote` | `yes` to show "Request a Quote" instead of a fixed price, otherwise `no`. |
| `colors` | Semicolon-separated, e.g. `Black; Blue; Red`. |
| `description` | One-line product description. |
| `image_filename` | Filename only (no path), must already exist in `public/products/`. To use a brand-new photo, send the image file separately — a spreadsheet can't carry images. |
| `best_value` | `yes` to show the "Best value" badge, otherwise `no`. |

**Rules:**
- This only updates *existing* products (matched by `product_id`). It can't add or remove products, or add new categories — those still need to be done directly.
- Don't invent prices, colours, or descriptions that aren't real — this drives a live customer-facing site.

**Applying an edited CSV:**

```
node scripts/sync-catalogue-csv.mjs path/to/edited-catalogue.csv
```

This rewrites the matching lines in `catalogue-data.ts` in place. Always run
`npx tsc --noEmit`, `npm run lint`, and `npm run build` afterward before
committing.
