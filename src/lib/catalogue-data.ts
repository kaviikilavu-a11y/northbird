export interface ProductVariant {
  id: string;
  name: string;
  price?: number; // KES, final website price (already includes margin) — omit for custom-quote items
  customQuote?: boolean;
  colors?: string[];
  description?: string;
  imageUrl?: string;
  bestValue?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  description: string;
  bestValue?: boolean;
  /** Itemized categories list real, priced SKUs. Non-itemized categories show a starting price and route straight to WhatsApp. */
  itemized: boolean;
  startingPriceLabel?: string;
  products: ProductVariant[];
  /** Overrides the auto-picked (first product's) cover image shown on category cards. */
  coverImage?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "water-bottles",
    slug: "water-bottles",
    name: "Water Bottles",
    emoji: "🍶",
    description: "Everyday hydration that carries your brand from the office to the gym.",
    itemized: true,
    products: [
      { id: "wb-aluminum-750", name: "750ml Aluminum Water Bottle", price: 700, colors: ["Blue", "Red", "Black"], description: "Lightweight aluminium body, full-wrap print or single-colour logo.", imageUrl: "/products/wb-aluminum-750.jpg" },
      { id: "wb-kids-620", name: "Kids Bottle 620ml", price: 560, colors: ["Pink", "Blue", "Yellow", "Mint"], description: "Playful colourways sized for school and family giveaways.", bestValue: true, imageUrl: "/products/wb-kids-620.jpg" },
      { id: "wb-silver-sub-750", name: "750ml Silver Sublimation Bottle", price: 560, colors: ["Silver"], description: "Sublimation-ready surface for full-colour, edge-to-edge branding.", imageUrl: "/products/wb-silver-sub-750.jpg" },
      { id: "wb-ring-750", name: "Small Ring Bottles 750ml", price: 658, colors: ["Black", "Blue", "Red"], description: "Ring-top carry handle, matte finish.", imageUrl: "/products/wb-ring-750.jpg" },
      { id: "wb-thermal", name: "Thermal Bottles", price: 1260, colors: ["Black"], description: "Double-wall insulation, keeps drinks cold through the workday." },
      { id: "wb-plastic-1000", name: "Plastic Water Bottle 1000ml", price: 980, colors: ["Red", "Orange", "Grey", "White", "Royal Blue"], description: "Large-capacity flip-lid sports bottle, five colourways.", imageUrl: "/products/wb-plastic-1000.jpg" },
      { id: "wb-plastic-750", name: "Sports Water Bottle 750ml", price: 840, colors: ["Blue", "Red", "Grey", "Green", "White"], description: "Flip-straw sports bottle with carry strap.", imageUrl: "/products/wb-plastic-750.jpg" },
      { id: "wb-plastic-800", name: "Plastic Water Bottle 800ml", price: 840, colors: ["Red", "Grey", "Black", "Blue"], description: "Tinted flip-lid sports bottle with carry strap.", imageUrl: "/products/wb-plastic-800.jpg" },
    ],
  },
  {
    id: "flasks",
    slug: "flasks",
    name: "Flasks",
    emoji: "🧴",
    description: "Insulated flasks for tea, coffee and everything in between.",
    itemized: true,
    products: [
      { id: "fl-jug-500", name: "Jug Flask 500ml", price: 1330, colors: ["Gold", "Red", "White", "Black"], description: "Wide-mouth jug-style flask, easy to fill and clean.", imageUrl: "/products/fl-jug-500.jpg" },
      { id: "fl-straw-500", name: "Straw Flask 500ml", price: 1120, colors: ["White"], description: "Built-in straw lid, one-hand drinking on the move.", imageUrl: "/products/fl-straw-500.jpg" },
      { id: "fl-thermal", name: "Thermal Flask", price: 1190, colors: ["Black", "Blue", "White", "Red"], description: "Vacuum insulation, screw-top lid doubles as a cup.", imageUrl: "/products/fl-thermal.jpg" },
      { id: "fl-skin-feel-750", name: "750ml Skin Feel Flasks", price: 1540, colors: ["Black", "Blue", "White", "Red"], description: "Soft-touch matte coating, premium desk presence.", imageUrl: "/products/fl-skin-feel-750.jpg" },
      { id: "fl-matte", name: "Matte Flask", price: 1260, colors: ["Blue", "White", "Red"], description: "Clean matte finish, laser-engraved or printed logo." },
      { id: "fl-kids-350", name: "Kids Flask 350ml", price: 1050, colors: ["Blue", "Pink", "Yellow", "Orange", "Black"], description: "Right-sized for school runs, five bright colourways.", imageUrl: "/products/fl-kids-350.jpg" },
      { id: "fl-stainless", name: "Stainless Flask", price: 1400, colors: ["Blue", "White", "Red", "Silver"], description: "Food-grade stainless steel, keeps hot 6+ hours.", imageUrl: "/products/fl-stainless.jpg" },
      { id: "fl-bamboo", name: "Bamboo Flask", price: 1400, colors: ["Black", "White", "Silver"], description: "Bamboo-accented lid for an eco-forward gifting story.", bestValue: true, imageUrl: "/products/fl-bamboo.jpg" },
      { id: "fl-metallic-800", name: "Metallic Water Bottle 800ml", price: 672, colors: ["Black", "Blue", "Grey", "White", "Red"], description: "Steel flip-cap bottle with carry strap.", imageUrl: "/products/fl-metallic-800.jpg" },
      { id: "fl-wooden-thermal", name: "Thermal Flask (Wooden Finish)", price: 1470, colors: ["Wooden Brown"], description: "Wood-grain steel flask, warm desk presence.", imageUrl: "/products/fl-wooden-thermal.jpg" },
      { id: "fl-tf014-550", name: "Thermal Flask TF014 550ml", price: 1260, colors: ["Black", "Blue", "Green", "Grey", "White", "Red"], description: "Bamboo-base steel flask, six colourways.", imageUrl: "/products/fl-tf014-550.jpg" },
      { id: "fl-magnetic-750", name: "Magnetic Flask 750ml", price: 1680, colors: ["Blue", "Red", "White", "Black"], description: "Steel flask with magnetic ring-pull lid.", imageUrl: "/products/fl-magnetic-750.jpg" },
    ],
  },
  {
    id: "mugs-tumblers",
    slug: "mugs-tumblers",
    name: "Mugs & Tumblers",
    emoji: "☕",
    description: "The daily ritual — your logo in every morning coffee.",
    itemized: true,
    products: [
      { id: "mt-led-510", name: "LED Tumbler 510ml", price: 1190, colors: ["White", "Cream"], description: "Light-up base, a genuine stand-out at evening events.", imageUrl: "/products/mt-led-510.jpg" },
      { id: "mt-stanley-1200", name: "Stanley Mugs 1.2L", price: 1820, colors: ["Black", "Pink", "Blue", "White", "Orange", "Red"], description: "Large-format insulated mug, six colourways to match any brand palette.", bestValue: true, imageUrl: "/products/mt-stanley-1200.jpg" },
      { id: "mt-thermal", name: "Thermal Tumbler", price: 910, colors: ["Black", "Blue", "Gold", "White", "Yellow", "Dark Green", "Dark Pink"], description: "Double-wall tumbler, condensation-free exterior.", imageUrl: "/products/mt-thermal.jpg" },
      { id: "mt-300", name: "Tumblers 300ml", price: 1162, colors: ["Gold"], description: "Compact gold-finish tumbler, premium gift-set anchor.", imageUrl: "/products/mt-300.jpg" },
      { id: "mt-long-650", name: "Long Tumblers 650ml", price: 1190, colors: ["White", "Black"], description: "Tall-format tumbler, straw-lid compatible." },
      { id: "mt-concave-magic", name: "Concave Magic Mug", price: 336, colors: ["Blue", "Red", "Black"], description: "Colour-change ceramic mug, concave grip." , imageUrl: "/products/mt-concave-magic.jpg" },
      { id: "mt-enamel-500", name: "Enamel Mug 500ml", price: 560, colors: ["Black", "Red", "Cyan", "Yellow", "White"], description: "Camp-style enamel mug with coloured rim." , imageUrl: "/products/mt-enamel-500.jpg" },
      { id: "mt-magic-mug", name: "Magic Mug (Colour-Change)", price: 280, colors: ["Black"], description: "Heat-reveal colour-change ceramic mug." , imageUrl: "/products/mt-magic-mug.jpg" },
      { id: "mt-insulated-travel", name: "Insulated Travel Mug", price: 1260, colors: ["Black", "Pink", "Blue", "Cream"], description: "Tapered steel travel mug with flip-straw lid." , imageUrl: "/products/mt-insulated-travel.jpg" },
    ],
  },
  {
    id: "keyholders",
    slug: "keyholders",
    name: "Key Holders",
    emoji: "🔑",
    description: "Small, cheap, and carried every single day — reach for the pocket, see the logo.",
    bestValue: true,
    itemized: true,
    products: [
      { id: "kh-long", name: "Long Keyholder", price: 154, colors: ["Yellow", "Red/Black", "White/Blue"], description: "Durable long-format number-plate style keyholder, full-colour or single-tone branding.", bestValue: true },
      { id: "kh-chain", name: "Chain Key Holder", price: 154, colors: ["Custom"], description: "Glass-block keyholder with a chain-linked charm — brand the medallion with your logo." },
      { id: "kh-custom-wood", name: "Customized Key Holders", price: 700, colors: ["Yellow", "Rose"], description: "Wooden number-plate style keyholder, personalised per order.", imageUrl: "/products/kh-custom-wood.jpg" },
      { id: "kh-opener", name: "Opener Key Holder", price: 154, colors: ["Silver", "Custom"], description: "Glass-block keyholder with a built-in bottle opener charm." },
      { id: "kh-metallic-square", name: "Metallic Square Keyholders", price: 154, colors: ["Custom"], description: "Square metal tag keyholder, laser-etched with your logo." },
      { id: "kh-keychain-dogtag", name: "Keychain Key Holder", price: 154, colors: ["Custom"], description: "Glass-block keyholder with a dog-tag style charm on a chain." },
    ],
  },
  {
    id: "signage-display",
    slug: "signage-display",
    name: "Signage & Display",
    emoji: "🪧",
    description: "Banners, kiosks and display stands for exhibitions, launches and storefronts.",
    itemized: true,
    products: [
      { id: "sd-teardrop-05", name: "Teardrop Banner 0.5M", price: 2100, colors: ["Custom"], description: "Compact teardrop banner, ideal for entrances and counters." },
      { id: "sd-rollup", name: "Broadbase Banner (Roll Up)", price: 5880, colors: ["Custom"], description: "Retractable roll-up banner stand, carry case included.", imageUrl: "/products/sd-broadbase-rollup.jpg" },
      { id: "sd-display-stand", name: "Branded Display Stand", price: 35700, colors: ["Custom"], description: "Full custom-branded retail display stand." },
      { id: "sd-kiosk", name: "Branded Kiosk", price: 18900, colors: ["Custom"], description: "Freestanding branded kiosk for activations and pop-ups." },
      { id: "sd-broadbase", name: "Broadbase Banner", price: 9100, colors: ["Custom"], description: "Large-format broadbase banner for high-visibility placement." },
      { id: "sd-promo-kiosk", name: "Promotional Kiosk", price: 10500, colors: ["Custom"], description: "Lightweight promotional kiosk, ideal for mall and event activations." },
      { id: "sd-lstand", name: "L-Stand Banner", price: 6020, colors: ["Custom"], description: "L-shaped stand banner, stable footprint for indoor and outdoor use." },
      { id: "sd-s-banner", name: "S-Banner", price: 37800, colors: ["Custom"], description: "Tall S-curve banner for rooftop and outdoor activations — stand and print included.", imageUrl: "/products/sd-s-banner.jpg" },
      { id: "sd-teardrop-flags", name: "Teardrop Feather Flags", customQuote: true, colors: ["Multiple sizes"], description: "Feather-flag signage in multiple sizes — priced to your exact spec." },
      { id: "sd-popup", name: "Pop Up Banners", customQuote: true, colors: ["Custom sizes"], description: "Curved pop-up banner walls for exhibitions and trade shows." },
      { id: "sd-gazebo-white-2x2", name: "White Gazebo Tent (2m x 2m)", price: 25900, colors: ["White"], description: "Foldable event gazebo — branding priced separately.", imageUrl: "/products/sd-gazebo-white-2x2.jpg" },
      { id: "sd-gazebo-black-3x3", name: "Gazebo Tent (3m x 3m, Black Frame)", price: 28000, colors: ["White canopy / Black frame"], description: "Foldable event gazebo, steel frame — branding priced separately.", imageUrl: "/products/sd-gazebo-black-3x3.jpg" },
      { id: "sd-gazebo-white-3x3", name: "White Gazebo Tent (3m x 3m)", price: 31500, colors: ["White"], description: "Foldable event gazebo — branding priced separately.", imageUrl: "/products/sd-gazebo-white-3x3.jpg" },
      { id: "sd-gazebo-aluminium", name: "Aluminium Gazebo Tent (3m x 3m)", price: 42000, colors: ["White"], description: "Premium aluminium-frame event gazebo — branding priced separately.", imageUrl: "/products/sd-gazebo-aluminium.jpg" },
    ],
  },
  {
    id: "spin-wheels",
    slug: "spin-wheels",
    name: "Spin Wheels",
    emoji: "🎡",
    description: "Tabletop prize wheels for activations, launches and trade-show booths.",
    itemized: true,
    products: [
      { id: "sw-table-30", name: "Table Spin Wheel", customQuote: true, description: "30cm diameter tabletop prize wheel with pointer and stand.", imageUrl: "/products/sw-table-30.jpg" },
      { id: "sw-big-table-42", name: "Big Table Spin Wheel", customQuote: true, description: "42cm diameter tabletop prize wheel — bigger footprint for busier activations.", imageUrl: "/products/sw-big-table-42.jpg" },
    ],
  },
  {
    id: "notebooks",
    slug: "notebooks",
    name: "Notebooks & Journals",
    emoji: "📓",
    description: "The desk staple that never gets thrown away — nine models, every colourway.",
    bestValue: true,
    itemized: true,
    products: [
      { id: "nb-m02", name: "A5 Notebook — Model 02", price: 489, colors: ["Orange", "Blue"], description: "Soft-touch A5 notebook, ruled pages.", imageUrl: "/products/nb-m02.jpg" },
      { id: "nb-m09", name: "A5 Notebook — Model 09", price: 630, colors: ["Green", "White", "Red", "Grey", "Blue", "Black", "Brown"], description: "Seven colourways, classic hardcover finish.", imageUrl: "/products/nb-m09.jpg" },
      { id: "nb-m08", name: "A5 Notebook — Model 08", price: 630, colors: ["White", "Yellow", "Green", "Blue", "Red", "Grey", "Orange", "Black"], description: "Widest colour range in the range, great for multi-department orders.", imageUrl: "/products/nb-m08.jpg" },
      { id: "nb-m05", name: "A5 Notebook — Model 05", price: 770, colors: ["Beige", "Blue", "Black", "Green"], description: "Premium textured cover, ribbon bookmark.", imageUrl: "/products/nb-m05.jpg" },
      { id: "nb-m04", name: "A5 Notebook — Model 04", price: 630, colors: ["Grey", "Black", "Blue", "Green"], description: "Understated cover finish, boardroom-ready.", imageUrl: "/products/nb-m04.jpg" },
      { id: "nb-m06", name: "A5 Notebook — Model 06", price: 630, colors: ["Grey", "Red", "Green", "Brown", "Black", "White", "Blue", "Yellow", "Orange"], description: "Nine colourways for large mixed-department orders.", imageUrl: "/products/nb-m06.jpg" },
      { id: "nb-m01", name: "A5 Notebook — Model 01", price: 700, colors: ["Grey", "Blue", "Red", "Brown", "Black"], description: "Our original best-seller — the one clients reorder most.", imageUrl: "/products/nb-m01.jpg" },
      { id: "nb-m07", name: "A5 Notebook — Model 07", price: 630, colors: ["Blue", "Grey", "Green"], description: "Minimal three-colour range, understated corporate finish.", imageUrl: "/products/nb-m07.jpg" },
      { id: "nb-m03", name: "A5 Notebook — Model 03", price: 489, colors: ["Green", "Red", "Black", "Blue", "Yellow", "White", "Grey", "Orange"], description: "Entry price point, eight colourways.", bestValue: true, imageUrl: "/products/nb-m03.jpg" },
      { id: "nb-double-flip", name: "A5 Double Flip Semi Executive", price: 770, colors: ["Light Green", "Yellow", "Red"], description: "Dual-flip layout for planners who split work and personal notes.", imageUrl: "/products/nb-double-flip.jpg" },
      { id: "nb-exec-curved", name: "A5 Executive Curved", price: 700, colors: ["Red", "Black", "Blue", "Grey", "Green", "Brown"], description: "Curved-edge executive cover, six colourways.", imageUrl: "/products/nb-exec-curved.jpg" },
    ],
  },
  {
    id: "gift-sets",
    slug: "gift-sets",
    name: "Gift Sets",
    emoji: "🎁",
    description: "Curated sets that arrive gift-ready — matched colourways, zero assembly.",
    itemized: true,
    coverImage: "/products/gift-set-box.jpg",
    products: [
      { id: "gs-flask-power-flash-pen", name: "Gift Set with Flask, Power Bank, Flash Drive & Pen", price: 5880, colors: ["Black", "Green"], description: "Flask, wireless mouse, 8GB flash drive, power bank and pen in a branded box." },
      { id: "gs-flask-pen-notebook", name: "Gift Set with Flask, Pen & Executive Notebook", customQuote: true, colors: ["Black"], description: "Flask, pen and executive notebook, gift-boxed together." },
      { id: "gs-notebook-pen-powerbank", name: "Gift Set with Notebook, Pen & Power Bank", customQuote: true, colors: ["Black", "Blue"], description: "Notebook, pen and power bank in a matched colourway, gift-boxed.", imageUrl: "/products/gs-notebook-pen-powerbank.jpg" },
      { id: "gs-exec-a5-organiser", name: "Executive A5 Organiser", price: 5600, colors: ["Custom"], description: "A5 organiser gift set for executive orders." },
      { id: "gs-013", name: "Executive Gift Set 013", price: 2520, colors: ["Green"], description: "Notebook, business cardholder, keyholder & pen, gift-boxed.", imageUrl: "/products/gs-013.jpg" },
      { id: "gs-gf028", name: "Executive Gift Set GF028", price: 3500, colors: ["Black / Bamboo"], description: "Thermal mug, notebook, pen & keyholder, gift-boxed.", imageUrl: "/products/gs-gf028.jpg" },
      { id: "gs-021", name: "Executive Gift Set 021", price: 3640, colors: ["Black / Bamboo"], description: "Thermal tumbler, notebook, pen & keyholder, gift-boxed.", imageUrl: "/products/gs-021.jpg" },
      { id: "gs-011", name: "Executive Gift Set 011", price: 4900, colors: ["Blue"], description: "Thermal flask, notebook, business cardholder, pen & keyholder, gift-boxed.", imageUrl: "/products/gs-011.jpg" },
    ],
  },
  {
    id: "pens",
    slug: "pens",
    name: "Pens",
    emoji: "🖊️",
    description: "Ballpoint and rollerball pens that write on first click.",
    bestValue: true,
    itemized: true,
    products: [
      { id: "pn-ballpoint-gold", name: "Branded Ballpoint Pen", price: 36, colors: ["Black/Gold"], description: "Matte-black barrel with a gold clip and trim, logo engraved or printed along the body.", imageUrl: "/products/pen-black-gold.jpg" },
      { id: "pn-mp08", name: "Metal Pens MP08", price: 140, colors: ["Black", "Gold", "Silver", "White", "Red"], description: "Fountain-style metal pen, five colourways.", imageUrl: "/products/pn-mp08.jpg" },
      { id: "pn-mp15", name: "Metal Pens MP15", price: 280, colors: ["White", "Blue", "Black"], description: "Gold-trim metal ballpoint pen.", imageUrl: "/products/pn-mp15.jpg" },
      { id: "pn-mp17", name: "Metal Pens MP17", price: 350, colors: ["Black", "Navy", "Teal", "Grey", "White"], description: "Slim clip-top metal pen, five colourways.", imageUrl: "/products/pn-mp17.jpg" },
      { id: "pn-mp01", name: "Metal Pens MP01", price: 378, colors: ["White", "Red", "Blue", "Silver", "Gold"], description: "Fountain-style metal pen, seven colourways.", imageUrl: "/products/pn-mp01.jpg" },
      { id: "pn-mp07", name: "Metal Pens MP07", price: 560, colors: ["Black/Gold"], description: "Premium fountain-style metal pen, gold trim.", imageUrl: "/products/pn-mp07.jpg" },
    ],
  },
  {
    id: "wristbands",
    slug: "wristbands",
    name: "Wristbands",
    emoji: "🎗️",
    description: "Silicone and fabric wristbands for events, fun-runs and campaigns.",
    itemized: true,
    products: [
      { id: "wr-silicone", name: "Silicone Wristband", price: 52, colors: ["Teal", "Rust", "Cream", "Black"], description: "Debossed or printed silicone wristband, sized for events and campaign giveaways.", imageUrl: "/products/wristbands-stack.jpg" },
      { id: "wr-event-tyvek", name: "Event Wristband (Tyvek)", price: 14, colors: ["Gold", "Silver", "Green", "Teal", "Pink", "Purple", "Blue"], description: "Paper-style tear-resistant event wristband, seven colourways.", imageUrl: "/products/wr-event-tyvek.jpg" },
      { id: "wr-plastic-snap", name: "Plastic Event Wristband (Snap)", price: 21, colors: ["Purple", "Pink", "Cyan", "Orange", "Red"], description: "Adjustable vinyl snap-closure event wristband.", imageUrl: "/products/wr-plastic-snap.jpg" },
    ],
  },
  {
    id: "business-cards",
    slug: "business-cards",
    name: "Business Cards",
    emoji: "💼",
    description: "Matte, gloss or textured finishes — first impressions on paper.",
    itemized: true,
    products: [
      { id: "bc-standard", name: "Business Cards (100pc)", price: 1500, colors: ["Custom"], description: "Full-colour double-sided business cards, matte or gloss finish.", imageUrl: "/products/business-card.jpg" },
    ],
  },
  {
    id: "flyers-brochures",
    slug: "flyers-brochures",
    name: "Flyers & Brochures",
    emoji: "📄",
    description: "Print collateral for launches, campaigns and in-store promotions.",
    itemized: true,
    products: [
      { id: "fb-trifold", name: "Tri-Fold Brochure", price: 25, colors: ["Custom"], description: "Full-colour tri-fold brochure printing, priced per piece.", imageUrl: "/products/brochure-tryfold.jpg" },
    ],
  },
  {
    id: "apparel",
    slug: "apparel",
    name: "Branded Apparel",
    emoji: "👕",
    description: "T-shirts, polos and staff uniforms that actually look good.",
    itemized: true,
    products: [
      { id: "ap-tee", name: "Branded T-Shirt", customQuote: true, description: "Embroidered or screen-printed crew-neck tee — chest and sleeve placement shown.", imageUrl: "/products/apparel-tee.jpg" },
    ],
  },
  {
    id: "caps",
    slug: "caps",
    name: "Caps",
    emoji: "🧢",
    description: "Six-panel and trucker caps for outdoor events and trade shows.",
    itemized: true,
    products: [
      { id: "cp-embroidered", name: "Embroidered Cap", customQuote: true, description: "Structured six-panel cap with embroidered logo on the front panel.", imageUrl: "/products/caps-esp.jpg" },
    ],
  },
  {
    id: "stickers-labels",
    slug: "stickers-labels",
    name: "Stickers & Labels",
    emoji: "🏷️",
    description: "Die-cut stickers and product labels, matte or gloss finish.",
    itemized: true,
    products: [
      { id: "sl-roll", name: "Branded Stickers (Roll)", price: 50, colors: ["Custom"], description: "Round or square logo stickers, supplied on a roll or as individual sheets.", imageUrl: "/products/stickers-roll.jpg" },
    ],
  },
  {
    id: "lanyards",
    slug: "lanyards",
    name: "Lanyards & ID Holders",
    emoji: "🪪",
    description: "Event essentials: lanyards, badge holders, and retractable reels.",
    itemized: true,
    products: [
      { id: "ln-lanyard-id-set", name: "Lanyard & ID Card Holder Set", price: 140, colors: ["Cream/Teal"], description: "Woven lanyard with a leather-look ID card holder — logo printed along the strap.", imageUrl: "/products/lanyard-id-holder.jpg" },
    ],
  },
  {
    id: "promotional-giveaways",
    slug: "promotional-giveaways",
    name: "Promotional Giveaways",
    emoji: "🎉",
    description: "Small-format branded giveaways for high-volume distribution.",
    itemized: true,
    products: [
      { id: "pg-giveaway-set", name: "Giveaway Set (Tote, Pen, Stress Ball, Flash Drive)", price: 95, colors: ["Custom"], description: "Mix-and-match small giveaways — canvas tote, pen, stress ball and flash drive, priced from the entry item.", imageUrl: "/products/giveaways-set.jpg" },
    ],
  },
  {
    id: "umbrellas",
    slug: "umbrellas",
    name: "Umbrellas",
    emoji: "☂️",
    description: "Golf and compact umbrellas — visible from across the car park.",
    itemized: true,
    products: [
      { id: "um-golf-compact", name: "Branded Golf Umbrella", price: 440, colors: ["Navy/Cream/Teal", "Black (Compact)"], description: "Large golf umbrella with a panelled canopy, plus a black compact folding option — both logo-branded.", imageUrl: "/products/umbrella-branded.jpg" },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function formatKES(n: number): string {
  return `KES ${n.toLocaleString("en-KE")}`;
}

// Northbird catalogue policy: a product with no genuine photo is not shown anywhere on the
// public site (listings, cover images, counts, starting prices) — no placeholder/emoji stand-ins.
export function publishedProducts(cat: Category): ProductVariant[] {
  return cat.products.filter((p) => !!p.imageUrl);
}

export function categoryStartingPrice(cat: Category): string | undefined {
  if (!cat.itemized) return cat.startingPriceLabel;
  const priced = publishedProducts(cat).filter((p) => typeof p.price === "number") as (ProductVariant & { price: number })[];
  if (priced.length === 0) return "Custom quote";
  const min = Math.min(...priced.map((p) => p.price));
  return `From ${formatKES(min)}`;
}

/** The category's chosen cover image, if any — an explicit override or the first product's photo. */
export function categoryCoverImage(cat: Category): string | undefined {
  return cat.coverImage ?? cat.products.find((p) => p.imageUrl)?.imageUrl;
}

// Branding methods that are actually possible on each category's material — embroidery only
// works on fabric, laser engraving needs a rigid heat-resistant surface (not cloth), UV/pad
// print suits rigid plastics/metal/glass, and paper goods are just full-colour print. Source:
// https://www.qualitylogoproducts.com/blog/imprint-processes-best-for-promo-items/
const BRANDING_METHODS_BY_CATEGORY: Record<string, string[]> = {
  "water-bottles": ["Laser engraving", "Screen print", "UV print"],
  flasks: ["Laser engraving", "Screen print", "UV print"],
  "mugs-tumblers": ["Laser engraving", "Screen print", "UV print"],
  keyholders: ["Laser engraving", "UV print"],
  notebooks: ["Debossing", "Foil stamp", "Screen print"],
  "gift-sets": ["Mixed methods depending on item — ask us"],
  pens: ["Laser engraving", "Screen print"],
  wristbands: ["Debossed & colour-filled", "Screen print"],
  "business-cards": ["Full-colour print"],
  "flyers-brochures": ["Full-colour print"],
  "stickers-labels": ["Full-colour print"],
  "signage-display": ["Full-colour print"],
  apparel: ["Embroidery", "Screen print"],
  caps: ["Embroidery", "Screen print"],
  lanyards: ["Dye-sublimation", "Screen print"],
  "spin-wheels": ["Full-colour print", "UV print"],
  "promotional-giveaways": ["Mixed methods depending on item — ask us"],
  umbrellas: ["Screen print"],
};

/** Real, material-appropriate branding methods for a category — not a one-size-fits-all list. */
export function brandingMethodsForCategory(slug: string): string[] {
  return BRANDING_METHODS_BY_CATEGORY[slug] ?? ["Screen print", "UV print"];
}
