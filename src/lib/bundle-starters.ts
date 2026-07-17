/**
 * Occasion-based bundle starters — a faster on-ramp into the existing Bundle system, not a
 * new pricing path. Selecting one just calls the same addItem() used everywhere else, once
 * per product, at qty 1 — same per-unit price as adding them manually, no bulk discount.
 */
export interface StarterItem {
  id: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  imageUrl?: string;
  emoji: string;
}

export interface BundleStarter {
  occasion: string;
  description: string;
  items: StarterItem[];
}

export const BUNDLE_STARTERS: BundleStarter[] = [
  {
    occasion: "Client Meetings",
    description: "Notebook + pen — the pair that ends up on the table.",
    items: [
      { id: "nb-m01", name: "A5 Notebook — Model 01", categorySlug: "notebooks", categoryName: "Notebooks & Journals", imageUrl: "/products/nb-m01.jpg", emoji: "📓" },
      { id: "pn-mp08", name: "Metal Pens MP08", categorySlug: "pens", categoryName: "Pens", imageUrl: "/products/pn-mp08.jpg", emoji: "🖊️" },
    ],
  },
  {
    occasion: "Team Onboarding",
    description: "T-shirt, water bottle, and cap — a simple welcome kit.",
    items: [
      { id: "ap-tee", name: "Branded T-Shirt", categorySlug: "apparel", categoryName: "Branded Apparel", imageUrl: "/products/apparel-tee.jpg", emoji: "👕" },
      { id: "wb-aluminum-750", name: "750ml Aluminum Water Bottle", categorySlug: "water-bottles", categoryName: "Water Bottles", imageUrl: "/products/wb-aluminum-750.jpg", emoji: "🍶" },
      { id: "cp-embroidered", name: "Embroidered Cap", categorySlug: "caps", categoryName: "Caps", imageUrl: "/products/caps-esp.jpg", emoji: "🧢" },
    ],
  },
  {
    occasion: "Trade Shows",
    description: "Lanyards, wristbands, and a roll-up banner for the stand.",
    items: [
      { id: "ln-lanyard-id-set", name: "Lanyard & ID Card Holder Set", categorySlug: "lanyards", categoryName: "Lanyards & ID Holders", imageUrl: "/products/lanyard-id-holder.jpg", emoji: "🪪" },
      { id: "wr-silicone", name: "Silicone Wristband", categorySlug: "wristbands", categoryName: "Wristbands", imageUrl: "/products/wristbands-stack.jpg", emoji: "🎗️" },
      { id: "sd-rollup", name: "Broadbase Banner (Roll Up)", categorySlug: "signage-display", categoryName: "Signage & Display", imageUrl: "/products/sd-broadbase-rollup.jpg", emoji: "🪧" },
    ],
  },
  {
    occasion: "Executive Gifting",
    description: "A gift set plus a flask — desk-worthy, gift-boxed.",
    items: [
      { id: "gs-013", name: "Executive Gift Set 013", categorySlug: "gift-sets", categoryName: "Gift Sets", imageUrl: "/products/gs-013.jpg", emoji: "🎁" },
      { id: "fl-bamboo", name: "Bamboo Flask", categorySlug: "flasks", categoryName: "Flasks", imageUrl: "/products/fl-bamboo.jpg", emoji: "🧴" },
    ],
  },
];
