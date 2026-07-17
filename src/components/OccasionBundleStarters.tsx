"use client";

import { useState } from "react";
import { assetPath } from "@/lib/site-config";
import { useBundle } from "@/lib/bundle-context";
import { BUNDLE_STARTERS } from "@/lib/bundle-starters";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export default function OccasionBundleStarters() {
  const { addItem, openPanel } = useBundle();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const handleStart = (occasion: string, items: typeof BUNDLE_STARTERS[number]["items"]) => {
    // Same addItem() as every product card, once per item, qty 1 — the pre-assembled mix
    // carries the same per-unit pricing as building it manually, no bulk discount implied.
    items.forEach((item) => {
      addItem(
        {
          id: item.id,
          name: item.name,
          categorySlug: item.categorySlug,
          categoryName: item.categoryName,
          imageUrl: item.imageUrl,
          emoji: item.emoji,
        },
        1
      );
    });
    setJustAdded(occasion);
    setTimeout(() => {
      setJustAdded(null);
      openPanel();
    }, 500);
  };

  return (
    <section className="py-16 md:py-20 px-4 max-w-6xl mx-auto">
      <Reveal variant="up">
        <div className="max-w-xl mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
            Quick Start
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-medium mb-2" style={{ color: "var(--teal-dark)" }}>
            Bundles for common occasions
          </h2>
          <p className="text-sm" style={{ color: "#666" }}>
            A starting mix for what you&apos;re buying for — add it all at once, then adjust quantities and colours
            in your Bundle. Same per-item pricing as adding them one by one.
          </p>
        </div>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.06}>
        {BUNDLE_STARTERS.map((starter) => (
          <StaggerItem key={starter.occasion} variant="up">
            <div className="flex flex-col h-full">
              <div className="flex -space-x-3 mb-4">
                {starter.items.map((item) => (
                  <div
                    key={item.id}
                    className="w-14 h-14 rounded-full overflow-hidden border-2 shrink-0"
                    style={{ borderColor: "var(--cream)" }}
                  >
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={assetPath(item.imageUrl)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl" style={{ background: "var(--cream-deep)" }}>
                        {item.emoji}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--teal-dark)" }}>
                {starter.occasion}
              </h3>
              <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: "#666" }}>
                {starter.description}
              </p>
              <button
                type="button"
                onClick={() => handleStart(starter.occasion, starter.items)}
                data-cursor="Add"
                className="btn-press text-xs font-semibold py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--teal-dark)", color: "var(--cream)" }}
              >
                {justAdded === starter.occasion ? "Added ✓" : "Add this mix"}
              </button>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
