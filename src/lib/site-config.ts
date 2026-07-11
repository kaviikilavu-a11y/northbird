export const BRAND = {
  name: "Northbird & Co",
  parent: "A Visiora Enterprises Company",
  slogan: "Your brand, on its way.",
  tagline: "Merch people actually keep.",
  eyebrow: "Branded Merchandise · Corporate Gifting · Kenya",
  subhead:
    "Pick what you need, send your logo on WhatsApp, get a price back the same day. No cart, no account — a real conversation with a real person.",
  colors: {
    cream: "#FBF7EE",
    creamDeep: "#F2EBD9",
    tealLight: "#7FA8AD",
    tealDark: "#4F7C81",
    gold: "#E8AE3F",
    orange: "#D97B2B",
    rust: "#A8472A",
    charcoal: "#1F2A2E",
  },
  whatsapp: "+254700000000", // placeholder — replace with the confirmed Northbird business WhatsApp number
  email: "hello@northbirdandco.com",
  location: "Nairobi, Kenya",
};

export const PRIMARY_CTA = "Talk to Northbird";

// Only non-empty for the GitHub Pages preview build, which serves from a /northbird
// subpath. next/link and next/navigation handle this automatically via next.config.ts's
// basePath, but raw <img src> tags for product photos (sourced from catalogue-data.ts)
// need it applied manually.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}

export function getWhatsAppLink(message: string = "Hi! I'd like to inquire about your products."): string {
  const encoded = encodeURIComponent(message);
  const number = BRAND.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encoded}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Northbird & Co! I'd like to learn more about your branded merchandise.";
