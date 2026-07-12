"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CATEGORIES, categoryCoverImage } from "@/lib/catalogue-data";
import { assetPath } from "@/lib/site-config";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import SectionLabel from "@/components/motion/SectionLabel";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Collection {
  title: string;
  tag: string;
  primarySlug: string;
  slugs: string[];
}

// Each collection maps to real catalogue categories (mirrors the mega menu's
// groupings) rather than invented sub-product lines we don't actually stock.
const COLLECTIONS: Collection[] = [
  {
    title: "Corporate Essentials",
    tag: "Notebooks · Pens · Water Bottles · Mugs & Tumblers",
    primarySlug: "notebooks",
    slugs: ["notebooks", "pens", "water-bottles", "mugs-tumblers"],
  },
  {
    title: "Team Apparel",
    tag: "Branded Apparel · Caps",
    primarySlug: "apparel",
    slugs: ["apparel", "caps"],
  },
  {
    title: "Events & Promotions",
    tag: "Lanyards · Wristbands · Signage & Display",
    primarySlug: "lanyards",
    slugs: ["lanyards", "wristbands", "signage-display", "promotional-giveaways"],
  },
  {
    title: "Executive Gifts",
    tag: "Gift Sets · Flasks · Key Holders",
    primarySlug: "gift-sets",
    slugs: ["gift-sets", "flasks", "keyholders"],
  },
];

const bySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

function CollectionCard({ collection }: { collection: Collection }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const images = useMemo(
    () =>
      collection.slugs
        .map(bySlug)
        .filter((c): c is NonNullable<typeof c> => !!c)
        .map(categoryCoverImage)
        .filter((src): src is string => !!src),
    [collection.slugs]
  );

  const startCycle = useCallback(() => {
    setHovered(true);
    if (reduceMotion || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setFrame((f) => (f + 1) % images.length);
    }, 1100);
  }, [images.length, reduceMotion]);

  const stopCycle = useCallback(() => {
    setHovered(false);
    setFrame(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const activeImage = images[frame];

  return (
    <Link
      href={`/catalogue/${collection.primarySlug}/`}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
      className="group block rounded-2xl overflow-hidden border transition-[border-color,box-shadow] duration-300"
      style={{
        borderColor: hovered ? "var(--rust)" : "var(--cream-deep)",
        boxShadow: hovered
          ? "0 20px 44px -20px rgba(31,42,46,0.22)"
          : "0 1px 0 0 rgba(0,0,0,0.02)",
        transform: hovered && !reduceMotion ? "translateY(-7px)" : "translateY(0)",
        transitionProperty: "border-color, box-shadow, transform",
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "var(--cream-deep)" }}>
        <AnimatePresence mode="wait">
          {activeImage && (
            <motion.img
              key={activeImage}
              src={assetPath(activeImage)}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: hovered ? 1.03 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </AnimatePresence>
      </div>
      <div className="p-6 md:p-7">
        <h3
          className="font-display text-xl md:text-2xl font-medium mb-1.5 transition-colors duration-300"
          style={{ color: hovered ? "var(--rust)" : "var(--teal-dark)" }}
        >
          {collection.title}
        </h3>
        <p className="text-xs tracking-wide" style={{ color: "#8a8a8a" }}>
          {collection.tag}
        </p>
      </div>
    </Link>
  );
}

export default function MadeForEveryBrand() {
  return (
    <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <Reveal variant="up">
        <div>
          <SectionLabel n="06" color="var(--orange)" />
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
            Our Collections
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-4 max-w-xl" style={{ color: "var(--teal-dark)" }}>
            Made for Every Brand
          </h2>
          <p className="text-base leading-relaxed max-w-xl mb-12" style={{ color: "#666" }}>
            Whether you&apos;re outfitting a growing team, preparing for an event, or launching a nationwide
            campaign, we create premium branded merchandise designed to represent your brand with confidence.
          </p>
        </div>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8" stagger={0.13}>
        {COLLECTIONS.map((c) => (
          <StaggerItem key={c.title} variant="up">
            <CollectionCard collection={c} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
