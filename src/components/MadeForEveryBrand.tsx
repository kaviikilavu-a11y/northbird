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
  /** Explicit real-photo list for the hover preview cycle — overrides the one-per-category default. */
  images?: string[];
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
    images: [
      "/products/lanyard-id-holder.jpg",
      "/products/wristbands-stack.jpg",
      "/products/sd-s-banner.jpg",
      "/products/sd-broadbase.jpg",
      "/products/giveaways-set.jpg",
    ],
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
      collection.images ??
      collection.slugs
        .map(bySlug)
        .filter((c): c is NonNullable<typeof c> => !!c)
        .map(categoryCoverImage)
        .filter((src): src is string => !!src),
    [collection.images, collection.slugs]
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
      className="group relative block rounded-2xl overflow-hidden min-h-[280px] md:min-h-0 h-full transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <div className="collections-accordion-image absolute inset-0" style={{ background: "var(--cream-deep)" }}>
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
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(31,42,46,0.85) 0%, rgba(31,42,46,0.15) 55%, transparent 100%)" }}
        />
      </div>
      <div className="collections-accordion-title relative h-full flex flex-col justify-end p-5 md:p-6">
        <h3 className="font-display text-lg md:text-xl font-medium mb-1" style={{ color: "var(--cream)" }}>
          {collection.title}
        </h3>
        <p className="text-xs tracking-wide" style={{ color: "rgba(251,247,238,0.75)" }}>
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

      <StaggerGroup
        className="collections-accordion flex flex-col gap-3 md:gap-2 md:h-[60vh] md:max-h-[460px]"
        stagger={0.1}
      >
        {COLLECTIONS.map((c) => (
          <StaggerItem key={c.title} variant="up" className="collections-accordion-item md:h-full">
            <CollectionCard collection={c} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
