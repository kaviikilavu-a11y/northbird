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
      { id: "wb-thermal", name: "Thermal Bottles", price: 1260, colors: ["Black"], description: "Double-wall insulation, keeps drinks cold through the workday.", imageUrl: "/products/fl-thermal-bottles.jpg" },
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
      { id: "fl-matte", name: "Matte Flask", price: 1260, colors: ["Blue", "White", "Red"], description: "Clean matte finish, laser-engraved or printed logo.", imageUrl: "/products/fl-matte.jpg" },
      { id: "fl-kids-350", name: "Kids Flask 350ml", price: 1050, colors: ["Blue", "Pink", "Yellow", "Orange", "Black"], description: "Right-sized for school runs, five bright colourways.", imageUrl: "/products/fl-kids-350.jpg" },
      { id: "fl-stainless", name: "Stainless Flask", price: 1400, colors: ["Blue", "White", "Red", "Silver"], description: "Food-grade stainless steel, keeps hot 6+ hours.", imageUrl: "/products/fl-stainless.jpg" },
      { id: "fl-bamboo", name: "Bamboo Flask", price: 1400, colors: ["Black", "White", "Silver"], description: "Bamboo-accented lid for an eco-forward gifting story.", bestValue: true, imageUrl: "/products/fl-bamboo.jpg" },
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
      { id: "mt-led-510", name: "LED Tumbler 510ml", price: 1260, colors: ["Black", "White"], description: "Light-up base, a genuine stand-out at evening events.", imageUrl: "/products/mt-led-510.jpg" },
      { id: "mt-stanley-1200", name: "Stanley Mugs 1.2L", price: 1820, colors: ["Black", "Pink", "Blue", "White", "Orange", "Red"], description: "Large-format insulated mug, six colourways to match any brand palette.", bestValue: true, imageUrl: "/products/mt-stanley-1200.jpg" },
      { id: "mt-thermal", name: "Thermal Tumbler", price: 1120, colors: ["White", "Black"], description: "Double-wall tumbler, condensation-free exterior.", imageUrl: "/products/mt-thermal.jpg" },
      { id: "mt-300", name: "Tumblers 300ml", price: 1162, colors: ["Gold"], description: "Compact gold-finish tumbler, premium gift-set anchor.", imageUrl: "/products/mt-300.jpg" },
      { id: "mt-long-650", name: "Long Tumblers 650ml", price: 1190, colors: ["White", "Black"], description: "Tall-format tumbler, straw-lid compatible.", imageUrl: "/products/mt-long-650.jpg" },
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
      { id: "kh-long", name: "Long Keyholder", price: 154, colors: ["Yellow", "Red/Black", "White/Blue"], description: "Durable long-format number-plate style keyholder, full-colour or single-tone branding.", bestValue: true, imageUrl: "/products/kh-long.jpg" },
      { id: "kh-chain", name: "Chain Key Holder", price: 154, colors: ["Custom"], description: "Glass-block keyholder with a chain-linked charm — brand the medallion with your logo.", imageUrl: "/products/kh-chain.jpg" },
      { id: "kh-custom-wood", name: "Customized Key Holders", price: 700, colors: ["Yellow", "Rose"], description: "Wooden number-plate style keyholder, personalised per order.", imageUrl: "/products/kh-custom-wood.jpg" },
      { id: "kh-opener", name: "Opener Key Holder", price: 154, colors: ["Silver", "Custom"], description: "Glass-block keyholder with a built-in bottle opener charm.", imageUrl: "/products/kh-opener.jpg" },
      { id: "kh-metallic-square", name: "Metallic Square Keyholders", price: 154, colors: ["Custom"], description: "Square metal tag keyholder, laser-etched with your logo.", imageUrl: "/products/kh-metallic-square.jpg" },
      { id: "kh-keychain-dogtag", name: "Keychain Key Holder", price: 154, colors: ["Custom"], description: "Glass-block keyholder with a dog-tag style charm on a chain.", imageUrl: "/products/kh-keychain-dogtag.jpg" },
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
      { id: "sd-teardrop-05", name: "Teardrop Banner 0.5M", price: 2100, colors: ["Custom"], description: "Compact teardrop banner, ideal for entrances and counters.", imageUrl: "/products/sd-teardrop-05.jpg" },
      { id: "sd-rollup", name: "Broadbase Banner (Roll Up)", price: 5880, colors: ["Custom"], description: "Retractable roll-up banner stand, carry case included.", imageUrl: "/products/sd-broadbase-rollup.jpg" },
      { id: "sd-display-stand", name: "Branded Display Stand", price: 35700, colors: ["Custom"], description: "Full custom-branded retail display stand." },
      { id: "sd-kiosk", name: "Branded Kiosk", price: 18900, colors: ["Custom"], description: "Freestanding branded kiosk for activations and pop-ups." },
      { id: "sd-broadbase", name: "Broadbase Banner", price: 9100, colors: ["Custom"], description: "Large-format broadbase banner for high-visibility placement.", imageUrl: "/products/sd-broadbase.jpg" },
      { id: "sd-promo-kiosk", name: "Promotional Kiosk", price: 10500, colors: ["Custom"], description: "Lightweight promotional kiosk, ideal for mall and event activations.", imageUrl: "/products/sd-promo-kiosk.jpg" },
      { id: "sd-lstand", name: "L-Stand Banner", price: 6020, colors: ["Custom"], description: "L-shaped stand banner, stable footprint for indoor and outdoor use.", imageUrl: "/products/sd-lstand.jpg" },
      { id: "sd-s-banner", name: "S-Banner", price: 37800, colors: ["Custom"], description: "Tall S-curve banner for rooftop and outdoor activations — stand and print included.", imageUrl: "/products/sd-s-banner.jpg" },
      { id: "sd-teardrop-flags", name: "Teardrop Feather Flags", customQuote: true, colors: ["Multiple sizes"], description: "Feather-flag signage in multiple sizes — priced to your exact spec.", imageUrl: "/products/sd-teardrop-flags-example.jpg" },
      { id: "sd-popup", name: "Pop Up Banners", customQuote: true, colors: ["Custom sizes"], description: "Curved pop-up banner walls for exhibitions and trade shows.", imageUrl: "/products/sd-popup-banner-example.jpg" },
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
      { id: "sw-table-30", name: "Table Spin Wheel", price: 11900, colors: ["Custom"], description: "30cm diameter tabletop prize wheel with pointer and stand.", imageUrl: "/products/sw-table-30.jpg" },
      { id: "sw-big-table-42", name: "Big Table Spin Wheel", price: 16100, colors: ["Custom"], description: "42cm diameter tabletop prize wheel — bigger footprint for busier activations.", imageUrl: "/products/sw-big-table-42.jpg" },
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
    products: [
      { id: "gs-flask-power-flash-pen", name: "Gift Set with Flask, Power Bank, Flash Drive & Pen", price: 5880, colors: ["Black", "Green"], description: "Flask, wireless mouse, 8GB flash drive, power bank and pen in a branded box.", imageUrl: "/products/gs-flask-power-flash-pen.jpg" },
      { id: "gs-flask-pen-notebook", name: "Gift Set with Flask, Pen & Executive Notebook", customQuote: true, colors: ["Black"], description: "Flask, pen and executive notebook, gift-boxed together.", imageUrl: "/products/gs-flask-pen-notebook.jpg" },
      { id: "gs-notebook-pen-powerbank", name: "Gift Set with Notebook, Pen & Power Bank", customQuote: true, colors: ["Black", "Blue"], description: "Notebook, pen and power bank in a matched colourway, gift-boxed.", imageUrl: "/products/gs-notebook-pen-powerbank.jpg" },
      { id: "gs-exec-a5-organiser", name: "Executive A5 Organiser", price: 5600, colors: ["Custom"], description: "A5 organiser gift set for executive orders." },
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
    ],
  },
  {
    id: "business-cards",
    slug: "business-cards",
    name: "Business Cards",
    emoji: "💼",
    description: "Matte, gloss or textured finishes — first impressions on paper.",
    itemized: false,
    startingPriceLabel: "From KES 1,500 / 100",
    products: [],
  },
  {
    id: "flyers-brochures",
    slug: "flyers-brochures",
    name: "Flyers & Brochures",
    emoji: "📄",
    description: "Print collateral for launches, campaigns and in-store promotions.",
    itemized: false,
    startingPriceLabel: "From KES 25 / pc",
    products: [],
  },
  {
    id: "apparel",
    slug: "apparel",
    name: "Branded Apparel",
    emoji: "👕",
    description: "T-shirts, polos and staff uniforms that actually look good.",
    itemized: false,
    startingPriceLabel: "From KES 950 / pc",
    products: [],
  },
  {
    id: "caps",
    slug: "caps",
    name: "Caps",
    emoji: "🧢",
    description: "Six-panel and trucker caps for outdoor events and trade shows.",
    itemized: false,
    startingPriceLabel: "KES 450 / pc",
    products: [],
  },
  {
    id: "stickers-labels",
    slug: "stickers-labels",
    name: "Stickers & Labels",
    emoji: "🏷️",
    description: "Die-cut stickers and product labels, matte or gloss finish.",
    itemized: false,
    startingPriceLabel: "From KES 50 / pc",
    products: [],
  },
  {
    id: "stationery",
    slug: "stationery",
    name: "Stationery",
    emoji: "✏️",
    description: "Everyday branded office stationery essentials.",
    itemized: false,
    startingPriceLabel: "From KES 45 / pc",
    products: [],
  },
  {
    id: "posters",
    slug: "posters",
    name: "Posters",
    emoji: "🖼️",
    description: "Large-format printed posters for offices, retail and events.",
    itemized: false,
    startingPriceLabel: "From KES 350 / pc",
    products: [],
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
    itemized: false,
    startingPriceLabel: "From KES 95",
    products: [],
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

export function categoryStartingPrice(cat: Category): string | undefined {
  if (!cat.itemized) return cat.startingPriceLabel;
  const priced = cat.products.filter((p) => typeof p.price === "number") as (ProductVariant & { price: number })[];
  if (priced.length === 0) return "Custom quote";
  const min = Math.min(...priced.map((p) => p.price));
  return `From ${formatKES(min)}`;
}
