export const BRAND = {
  name: "Northbird & Co",
  tagline: "Merch people actually keep.",
  subhead: "Premium branded merchandise for East African businesses — from first sample to final delivery.",
  colors: {
    cream: "#FBF7EE",
    tealLight: "#7FA8AD",
    tealDark: "#4F7C81",
    gold: "#E8AE3F",
    orange: "#D97B2B",
    rust: "#A8472A",
  },
  whatsapp: "+254700000000", // replace with real number
  email: "hello@northbirdco.com",
};

export function getWhatsAppLink(message: string = "Hi! I'd like to inquire about your products."): string {
  const encoded = encodeURIComponent(message);
  const number = BRAND.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encoded}`;
}

export const DEFAULT_WHATSAPP_MESSAGE = "Hi Northbird & Co! I'd like to learn more about your branded merchandise.";
