#!/usr/bin/env node
// Applies an edited northbird-catalogue.csv back onto src/lib/catalogue-data.ts.
//
// Usage: node scripts/sync-catalogue-csv.mjs path/to/edited-catalogue.csv
//
// Each product in catalogue-data.ts lives on its own line as a single object
// literal (`{ id: "...", name: "...", ... },`). This script rewrites that
// line from the matching CSV row's columns, keyed by product_id. It does not
// add or remove products, or touch category-level fields (name, slug, emoji,
// branding methods) — only the per-product columns the spreadsheet exposes:
// product_name, price_kes, request_quote, colors, description,
// image_filename, best_value.

import { readFileSync, writeFileSync } from "node:fs";

const csvPath = process.argv[2];
if (!csvPath) {
  console.error("Usage: node scripts/sync-catalogue-csv.mjs path/to/edited-catalogue.csv");
  process.exit(1);
}

const DATA_PATH = new URL("../src/lib/catalogue-data.ts", import.meta.url);

function parseCsv(text) {
  const rows = [];
  let i = 0;
  const n = text.length;
  let field = "";
  let row = [];
  let inQuotes = false;
  while (i < n) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      continue;
    }
    if (c === "\n") {
      row.push(field);
      rows.push(row);
      field = "";
      row = [];
      i++;
      continue;
    }
    field += c;
    i++;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildLine(existingIndent, row) {
  const {
    product_id,
    product_name,
    price_kes,
    request_quote,
    colors,
    description,
    image_filename,
    best_value,
  } = row;

  const parts = [`id: "${esc(product_id)}"`, `name: "${esc(product_name)}"`];

  const wantsQuote = String(request_quote).trim().toLowerCase() === "yes";
  const price = String(price_kes).trim();
  if (wantsQuote || price === "") {
    parts.push("customQuote: true");
  } else {
    const n = Number(price);
    if (!Number.isFinite(n)) throw new Error(`Bad price_kes for ${product_id}: "${price_kes}"`);
    parts.push(`price: ${Math.round(n)}`);
  }

  const colorList = String(colors ?? "")
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean);
  if (colorList.length > 0) {
    parts.push(`colors: [${colorList.map((c) => `"${esc(c)}"`).join(", ")}]`);
  }

  if (description && String(description).trim() !== "") {
    parts.push(`description: "${esc(description)}"`);
  }

  if (String(best_value).trim().toLowerCase() === "yes") {
    parts.push("bestValue: true");
  }

  const img = String(image_filename ?? "").trim();
  if (img !== "") {
    parts.push(`imageUrl: "/products/${esc(img)}"`);
  }

  return `${existingIndent}{ ${parts.join(", ")} },`;
}

const csvText = readFileSync(csvPath, "utf-8");
const rows = parseCsv(csvText).filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
const header = rows.shift();
const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));

const required = ["product_id", "product_name", "price_kes", "request_quote", "colors", "description", "image_filename", "best_value"];
for (const col of required) {
  if (!(col in idx)) throw new Error(`CSV is missing required column: ${col}`);
}

let source = readFileSync(DATA_PATH, "utf-8");
let updated = 0;
let missing = [];

for (const r of rows) {
  const rowObj = Object.fromEntries(Object.entries(idx).map(([k, i]) => [k, r[i] ?? ""]));
  const productId = rowObj.product_id.trim();
  if (!productId) continue;

  const lineRe = new RegExp(`^([ \\t]*)\\{ id: "${productId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",.*\\},[ \\t]*$`, "m");
  const match = source.match(lineRe);
  if (!match) {
    missing.push(productId);
    continue;
  }
  const newLine = buildLine(match[1], rowObj);
  source = source.slice(0, match.index) + newLine + source.slice(match.index + match[0].length);
  updated++;
}

writeFileSync(DATA_PATH, source);

console.log(`Updated ${updated} product(s) in src/lib/catalogue-data.ts`);
if (missing.length > 0) {
  console.log(`\nWARNING — ${missing.length} product_id(s) from the CSV were not found (typo, or a new product — new products must be added by hand, this script only updates existing ones):`);
  for (const id of missing) console.log(`  - ${id}`);
}
