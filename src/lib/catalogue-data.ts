export interface ProductVariant {
  id: string;
  name: string;
  price: number; // KES
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
  products: ProductVariant[];
}

export const CATEGORIES: Category[] = [
  {
    id: "notebooks",
    slug: "notebooks",
    name: "Notebooks & Journals",
    emoji: "📓",
    description: "Premium branded notebooks for every professional setting.",
    products: [
      { id: "nb-a5-exec", name: "A5 Executive Curved Notebook", price: 850, description: "Soft-touch cover, 100 ruled pages, ribbon bookmark. The desk staple that never gets thrown away.", bestValue: true },
      { id: "nb-a4-hard", name: "A4 Hardcover Notebook", price: 1100, description: "Sturdy hardback, 200 pages, lay-flat binding." },
      { id: "nb-a6-pocket", name: "A6 Pocket Notebook", price: 550, description: "Slim, fits in a shirt pocket. Great conference giveaway." },
      { id: "nb-spiral-a5", name: "A5 Spiral Notebook", price: 700, description: "Twin-ring spiral, perforated pages, coloured cover options." },
    ],
  },
  {
    id: "pens",
    slug: "pens",
    name: "Pens & Writing",
    emoji: "🖊️",
    description: "Ballpoint, rollerball, and stylus pens that write on first click.",
    products: [
      { id: "pen-metal-twist", name: "Metal Twist Ballpoint", price: 350, description: "Aluminium barrel, smooth blue ink, laser-engraved logo.", bestValue: true },
      { id: "pen-plastic-click", name: "Classic Click Ballpoint", price: 120, description: "Reliable everyday pen; minimum order 100 units." },
      { id: "pen-rollerball", name: "Executive Rollerball", price: 650, description: "Liquid ink, gift-box ready, premium finish." },
      { id: "pen-stylus", name: "2-in-1 Stylus Pen", price: 280, description: "Soft stylus tip on the cap, ballpoint on the other end." },
    ],
  },
  {
    id: "mugs",
    slug: "mugs",
    name: "Mugs & Drinkware",
    emoji: "☕",
    description: "The daily ritual: your logo in every morning coffee.",
    products: [
      { id: "mug-ceramic-330", name: "330ml Ceramic Mug", price: 900, description: "Dishwasher-safe, wrap-print or one-side logo, white or colour options.", bestValue: true },
      { id: "mug-enamel-350", name: "350ml Enamel Camp Mug", price: 1200, description: "Speckled enamel, retro feel, outdoor brand favourite." },
      { id: "mug-travel-350", name: "350ml Travel Mug", price: 1800, description: "Stainless steel, screw-top lid, keeps hot 4 hrs." },
      { id: "mug-glass-360", name: "360ml Borosilicate Glass Mug", price: 1500, description: "Heat-resistant glass, bamboo lid." },
    ],
  },
  {
    id: "water-bottles",
    slug: "water-bottles",
    name: "Water Bottles",
    emoji: "🍶",
    description: "Stainless steel and BPA-free bottles that go everywhere.",
    products: [
      { id: "wb-ss-500", name: "500ml Stainless Steel Bottle", price: 2200, description: "Double-wall vacuum, keeps cold 24 hrs, powder-coated finish.", bestValue: true },
      { id: "wb-tritan-700", name: "700ml Tritan Sport Bottle", price: 1400, description: "BPA-free Tritan plastic, flip lid, loop handle." },
      { id: "wb-ss-750", name: "750ml Wide-Mouth Bottle", price: 2800, description: "Wide-mouth for ice, 18/8 stainless steel." },
      { id: "wb-glass-500", name: "500ml Glass Water Bottle", price: 1900, description: "Borosilicate glass with silicone sleeve and bamboo cap." },
    ],
  },
  {
    id: "tote-bags",
    slug: "tote-bags",
    name: "Tote Bags",
    emoji: "🛍️",
    description: "Canvas and non-woven totes that replace plastic on every errand.",
    products: [
      { id: "tote-canvas-natural", name: "Natural Canvas Tote (280gsm)", price: 1100, description: "Heavy-duty canvas, long handles, screen-print or embroidery.", bestValue: true },
      { id: "tote-jute-medium", name: "Medium Jute Tote", price: 850, description: "Eco jute, cotton webbing handles, printed logo panel." },
      { id: "tote-nonwoven-lam", name: "Laminated Non-Woven Tote", price: 450, description: "Wipeable laminate exterior, sewn-in gusset." },
      { id: "tote-canvas-zip", name: "Canvas Tote with Zip", price: 1400, description: "Zip closure, inner pocket, 350gsm canvas." },
    ],
  },
  {
    id: "apparel",
    slug: "apparel",
    name: "T-Shirts & Polo Shirts",
    emoji: "👕",
    description: "Staff uniforms and event tees that actually look good.",
    products: [
      { id: "app-polo-pique", name: "Piqué Polo Shirt", price: 1800, description: "65% polyester 35% cotton, ribbed collar, embroidered chest logo.", bestValue: true },
      { id: "app-tee-crew", name: "180gsm Crew-Neck Tee", price: 1200, description: "Ring-spun cotton, screen-printed or DTF, sizes XS–3XL." },
      { id: "app-tee-dri", name: "Dri-Fit Performance Tee", price: 1500, description: "Moisture-wicking polyester, sublimation-ready." },
      { id: "app-polo-ladies", name: "Ladies' Cut Polo", price: 1900, description: "Fitted silhouette, stretch piqué, 8 colour options." },
    ],
  },
  {
    id: "outerwear",
    slug: "outerwear",
    name: "Hoodies & Jackets",
    emoji: "🧥",
    description: "Layering pieces that keep your brand visible year-round.",
    products: [
      { id: "out-hoodie-300", name: "300gsm Pullover Hoodie", price: 3500, description: "Fleece-lined, kangaroo pocket, embroidered or screen-print logo.", bestValue: true },
      { id: "out-gilet-softshell", name: "Softshell Gilet", price: 5500, description: "Wind- and water-resistant, bonded fleece lining, zip pockets." },
      { id: "out-jacket-bomber", name: "Satin Bomber Jacket", price: 7500, description: "Satin outer, ribbed cuffs and hem, embroidered back." },
      { id: "out-windbreaker", name: "Lightweight Windbreaker", price: 4200, description: "Packable, full-zip, mesh lining." },
    ],
  },
  {
    id: "caps",
    slug: "caps",
    name: "Caps & Headwear",
    emoji: "🧢",
    description: "Six-panel caps and beanies for outdoor events and trade shows.",
    products: [
      { id: "cap-6panel-cotton", name: "6-Panel Cotton Twill Cap", price: 950, description: "Adjustable strap, embroidered front panel, curved brim.", bestValue: true },
      { id: "cap-trucker", name: "Foam-Front Trucker Cap", price: 850, description: "Mesh back, snapback, sublimation or embroidery front." },
      { id: "cap-beanie", name: "Acrylic Fold Beanie", price: 700, description: "One-size, embroidered patch, 10 colour options." },
      { id: "cap-bucket", name: "Cotton Bucket Hat", price: 1100, description: "All-over print option, reversible available." },
    ],
  },
  {
    id: "tech",
    slug: "tech",
    name: "USB Drives & Tech",
    emoji: "💾",
    description: "Branded tech accessories people actually use at their desks.",
    products: [
      { id: "tech-usb-card", name: "8GB Credit-Card USB Drive", price: 1200, description: "Slim card format, USB-A, pre-load files available.", bestValue: true },
      { id: "tech-usb-metal", name: "16GB Metal Twist USB", price: 1800, description: "Aluminium housing, USB 3.0, laser-engraved logo." },
      { id: "tech-hub-usb", name: "3-Port USB Hub", price: 2500, description: "Compact hub, USB-A x3, braided cable." },
      { id: "tech-mouse-pad", name: "XXL Desk Mouse Pad", price: 1400, description: "900×400mm, stitched edges, full-colour print." },
    ],
  },
  {
    id: "power-banks",
    slug: "power-banks",
    name: "Power Banks",
    emoji: "🔋",
    description: "Keep your team charged — and your brand top of mind.",
    products: [
      { id: "pb-5000", name: "5,000mAh Slim Power Bank", price: 3200, description: "Single USB-A output, LED indicator, engraved or printed logo.", bestValue: true },
      { id: "pb-10000", name: "10,000mAh Power Bank", price: 4800, description: "Dual USB-A + USB-C, fast charge, rubber finish." },
      { id: "pb-wireless", name: "10,000mAh Wireless Pad Bank", price: 6500, description: "Qi wireless + wired, 10W max, flat-lay friendly for gifting." },
      { id: "pb-solar", name: "5,000mAh Solar Power Bank", price: 5200, description: "Solar panel backup, carabiner clip, great for outdoor events." },
    ],
  },
  {
    id: "umbrellas",
    slug: "umbrellas",
    name: "Umbrellas",
    emoji: "☂️",
    description: "Golf and compact umbrellas — visible from across the car park.",
    products: [
      { id: "umb-golf-62", name: '62" Golf Umbrella', price: 3500, description: "8-panel, fibreglass frame, double canopy, auto-open.", bestValue: true },
      { id: "umb-compact-23", name: '23" Folding Compact Umbrella', price: 1800, description: "3-fold, auto-open/close, carry pouch." },
      { id: "umb-inverted", name: "Inverted Reverse Umbrella", price: 2800, description: "Inside-out design stays dry in the car, C-hook handle." },
      { id: "umb-kids", name: "Kids' 18\" Dome Umbrella", price: 1400, description: "Clear dome panel, safety runner, EVA handle." },
    ],
  },
  {
    id: "lanyards",
    slug: "lanyards",
    name: "Lanyards & ID Holders",
    emoji: "🪪",
    description: "Event essentials: lanyards, badge holders, and retractable reels.",
    products: [
      { id: "lan-polyester-15", name: "15mm Polyester Lanyard", price: 180, description: "Full-colour sublimation, safety breakaway, bulldog clip.", bestValue: true },
      { id: "lan-nylon-20", name: "20mm Nylon Lanyard", price: 250, description: "Woven jacquard logo, metal swivel clip." },
      { id: "lan-badge-holder", name: "Rigid ID Card Holder", price: 120, description: "PVC window, slot + chain loop." },
      { id: "lan-reel", name: "Badge Reel with Clip", price: 350, description: "Spring-loaded, 65cm pull, printed disc branding." },
    ],
  },
  {
    id: "gift-sets",
    slug: "gift-sets",
    name: "Gift Sets",
    emoji: "🎁",
    description: "Curated sets that arrive gift-ready — zero assembly required.",
    products: [
      { id: "gs-exec-trio", name: "Executive Trio (Notebook + Pen + Mug)", price: 3200, description: "Matching colour-ways across all three items, ribbon-tied gift box.", bestValue: true },
      { id: "gs-desk-quad", name: "Desk Quad (Notebook + Pen + Mug + Mouse Pad)", price: 4800, description: "Full co-branded set, mailer box with tissue." },
      { id: "gs-wellness", name: "Wellness Set (Bottle + Tote + Cap)", price: 5500, description: "Active lifestyle gift, ideal for health-sector clients." },
      { id: "gs-starter-duo", name: "Starter Duo (Notebook + Pen)", price: 1200, description: "Entry-level co-branded gift, works for large delegate counts." },
    ],
  },
  {
    id: "planners",
    slug: "planners",
    name: "Calendars & Planners",
    emoji: "📅",
    description: "Year-round desk presence: wall calendars, desk pads, and diary planners.",
    products: [
      { id: "plan-wall-a3", name: "A3 Wall Calendar (12-month)", price: 1500, description: "13 leaves (cover + 12 months), spiral-bound, full-colour imagery.", bestValue: true },
      { id: "plan-desk-a4", name: "A4 Desk Pad Calendar", price: 900, description: "50-sheet tear-off pad, month-at-a-glance layout." },
      { id: "plan-diary-a5", name: "A5 Hardcover Diary", price: 1800, description: "Week-to-view, ribbon, pen loop, branded end-papers." },
      { id: "plan-planner-a4", name: "A4 Project Planner Notebook", price: 1400, description: "Undated, project pages, habit tracker, 160 pages." },
    ],
  },
  {
    id: "bags",
    slug: "bags",
    name: "Bags & Backpacks",
    emoji: "🎒",
    description: "From laptop backpacks to drawstring pouches — carry your brand everywhere.",
    products: [
      { id: "bag-laptop-bp", name: "15.6\" Laptop Backpack", price: 6500, description: "Padded laptop sleeve, USB charging port passthrough, water-resistant.", bestValue: true },
      { id: "bag-drawstring", name: "Polyester Drawstring Bag", price: 550, description: "Lightweight, fun-run favourite, 10 colour options." },
      { id: "bag-conference", name: "Conference Satchel", price: 3200, description: "PU-trim polyester, A4 document section, front zip pocket." },
      { id: "bag-cooler", name: "6-Can Cooler Bag", price: 2200, description: "PEVA-lined, zip top, logo on front panel." },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
