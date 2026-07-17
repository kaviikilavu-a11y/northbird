/**
 * Occasion grouping per category — a second, complementary tag alongside the product-type
 * name (e.g. "Client Gifting · Notebooks"). Also reused as the grouping for the homepage's
 * occasion-based bundle starters, so the two stay in sync rather than inventing two
 * separate taxonomies.
 */
export const OCCASION_TAGS: Record<string, string> = {
  notebooks: "Client Gifting",
  pens: "Office Essentials",
  "water-bottles": "Team Onboarding",
  "mugs-tumblers": "Office Essentials",
  flasks: "Executive Gifting",
  keyholders: "Executive Gifting",
  "gift-sets": "Executive Gifting",
  apparel: "Team Onboarding",
  caps: "Team Onboarding",
  lanyards: "Trade Shows",
  wristbands: "Trade Shows",
  "signage-display": "Trade Shows",
  "spin-wheels": "Trade Shows",
  "business-cards": "Office Essentials",
  "flyers-brochures": "Marketing Collateral",
  "stickers-labels": "Marketing Collateral",
  "promotional-giveaways": "Client Gifting",
  umbrellas: "Client Gifting",
};

export function occasionTag(categorySlug: string): string | undefined {
  return OCCASION_TAGS[categorySlug];
}
