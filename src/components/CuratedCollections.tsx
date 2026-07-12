"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES, categoryStartingPrice, categoryCoverImage, type Category } from "@/lib/catalogue-data";
import { assetPath } from "@/lib/site-config";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import SectionLabel from "@/components/motion/SectionLabel";

// Brand-bible "Collection-flow" homepage concept: one large featured collection,
// three tinted highlighted collections, then everything else in a scannable grid.
const FEATURED_SLUG = "notebooks";
const HIGHLIGHTED_SLUGS = ["flasks", "keyholders", "mugs-tumblers"];

const byslug = (slug: string) => CATEGORIES.find((c) => c.slug === slug)!;
const FEATURED = byslug(FEATURED_SLUG);
const HIGHLIGHTED = HIGHLIGHTED_SLUGS.map(byslug);
const REMAINING = CATEGORIES.filter(
  (c) => c.slug !== FEATURED_SLUG && !HIGHLIGHTED_SLUGS.includes(c.slug)
);

const TINTS: Record<string, string> = {
  flasks: "var(--teal-dark)",
  keyholders: "var(--rust)",
  "mugs-tumblers": "var(--orange)",
};

function HighlightedCard({ cat }: { cat: Category }) {
  const cover = categoryCoverImage(cat);
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: "easeOut" }}>
      <Link
        href={`/catalogue/${cat.slug}/`}
        className="group relative block rounded-2xl overflow-hidden p-8 flex flex-col justify-between min-h-[220px]"
        style={{ background: TINTS[cat.slug] ?? "var(--teal-dark)" }}
      >
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={assetPath(cover)}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-30 transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="relative">
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(251,247,238,0.7)" }}>
            {cat.bestValue ? "Best value" : "Highlighted"}
          </p>
          <h3 className="font-display text-2xl font-medium" style={{ color: "var(--cream)" }}>
            {cat.name}
          </h3>
        </div>
        <div className="relative flex items-end justify-between mt-6">
          <span className="text-sm" style={{ color: "rgba(251,247,238,0.7)" }}>
            {cat.itemized ? `${cat.products.length} products` : "On request"}
          </span>
          <span className="text-sm font-semibold" style={{ color: "var(--cream)" }}>
            {categoryStartingPrice(cat)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CuratedCollections() {
  const marqueeNames = [...CATEGORIES.map((c) => c.name), ...CATEGORIES.map((c) => c.name)];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal variant="up">
          <div>
            <SectionLabel n="03" color="var(--orange)" />
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
              Curated Collections
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-12 max-w-xl" style={{ color: "var(--teal-dark)" }}>
              Premium merchandise selected for brands that expect more.
            </h2>
          </div>
        </Reveal>

        {/* 1. Large featured collection — dark, dramatic, the product as hero */}
        <Reveal variant="scale">
          <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <Link
              href={`/catalogue/${FEATURED.slug}/`}
              className="group block rounded-3xl p-10 md:p-16 mb-6 relative overflow-hidden"
              style={{ background: "var(--charcoal)" }}
            >
              {(() => {
                const featuredCover = categoryCoverImage(FEATURED);
                return (
                  featuredCover && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={assetPath(featuredCover)}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(31,42,46,0.95) 0%, rgba(31,42,46,0.8) 45%, rgba(31,42,46,0.35) 100%)",
                        }}
                      />
                    </>
                  )
                );
              })()}
              <p className="relative text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
                Featured Collection
              </p>
              <h3
                className="relative font-display font-medium mb-4 max-w-lg"
                style={{ color: "var(--cream)", fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                {FEATURED.name}
              </h3>
              <p className="relative text-sm md:text-base max-w-md mb-8" style={{ color: "rgba(251,247,238,0.7)" }}>
                {FEATURED.description}
              </p>
              <div className="relative flex items-center gap-6">
                <span
                  className="inline-block px-6 py-3 rounded-full text-sm font-semibold transition-opacity group-hover:opacity-90"
                  style={{ background: "var(--gold)", color: "var(--charcoal)" }}
                >
                  Explore {FEATURED.products.length} products
                </span>
                <span className="text-sm font-semibold" style={{ color: "var(--cream)" }}>
                  {categoryStartingPrice(FEATURED)}
                </span>
              </div>
            </Link>
          </motion.div>
        </Reveal>

        {/* 2. Three highlighted collections, each in its own tinted card */}
        <StaggerGroup className="flex flex-wrap gap-4 mb-6" stagger={0.1}>
          {HIGHLIGHTED.map((cat) => (
            <StaggerItem key={cat.id} variant="up" className="flex-1 min-w-[220px]">
              <HighlightedCard cat={cat} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* 3. Remaining categories — simple scannable grid */}
        <StaggerGroup
          className="grid gap-3 mb-12 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
          stagger={0.035}
        >
          {REMAINING.map((cat) => (
            <StaggerItem key={cat.id} variant="up">
              <Link
                href={`/catalogue/${cat.slug}/`}
                className="block rounded-xl border px-4 py-3.5 transition-colors hover:border-current"
                style={{ borderColor: "var(--teal-light)" }}
              >
                <p className="text-sm font-semibold" style={{ color: "var(--teal-dark)" }}>{cat.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#999" }}>{categoryStartingPrice(cat)}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="text-center">
          <Link
            href="/catalogue/"
            className="inline-block text-sm font-semibold border-b pb-0.5"
            style={{ borderColor: "var(--rust)", color: "var(--rust)" }}
          >
            View the full catalogue — {CATEGORIES.length} collections →
          </Link>
        </div>
      </div>

      {/* 4. Infinite marquee — category names, low-opacity, purely textural */}
      <div className="overflow-hidden scrollbar-hide mt-16 py-6 border-y" style={{ borderColor: "var(--cream-deep)" }} aria-hidden="true">
        <div className="flex gap-10 w-max animate-marquee">
          {marqueeNames.map((name, i) => (
            <span key={`${name}-${i}`} className="font-display text-3xl md:text-4xl whitespace-nowrap" style={{ color: "var(--cream-deep)" }}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
