"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CATEGORIES } from "@/lib/catalogue-data";
import { assetPath } from "@/lib/site-config";

const GROUPS: { label: string; slugs: string[] }[] = [
  { label: "Drinkware", slugs: ["water-bottles", "flasks", "mugs-tumblers"] },
  { label: "Office & Print", slugs: ["notebooks", "pens", "business-cards", "flyers-brochures"] },
  { label: "Apparel & Accessories", slugs: ["apparel", "caps", "wristbands", "lanyards"] },
  { label: "Display & Events", slugs: ["signage-display", "spin-wheels", "umbrellas"] },
  { label: "Gifting", slugs: ["gift-sets", "keyholders", "promotional-giveaways", "stickers-labels"] },
];

const byslug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

export default function CatalogueMegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="hidden sm:block absolute left-0 right-0 top-full z-30"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
        >
          <div
            className="border-t shadow-xl"
            style={{ background: "var(--cream)", borderColor: "var(--teal-light)" }}
          >
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-5 gap-6">
              {GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
                    {group.label}
                  </p>
                  <ul className="space-y-3">
                    {group.slugs.map((slug) => {
                      const cat = byslug(slug);
                      if (!cat) return null;
                      const thumb = cat.products.find((p) => p.imageUrl)?.imageUrl;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/catalogue/${slug}/`}
                            onClick={onClose}
                            className="group flex items-center gap-2.5"
                          >
                            <span
                              className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center text-base shrink-0"
                              style={{ background: "var(--cream-deep)" }}
                              aria-hidden="true"
                            >
                              {thumb ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={assetPath(thumb)} alt="" className="w-full h-full object-cover" />
                              ) : (
                                cat.emoji
                              )}
                            </span>
                            <span
                              className="text-sm transition-colors"
                              style={{ color: "var(--teal-dark)" }}
                            >
                              {cat.name}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t px-4 py-3 text-center" style={{ borderColor: "var(--cream-deep)" }}>
              <Link
                href="/catalogue/"
                onClick={onClose}
                className="text-xs font-semibold hover:underline"
                style={{ color: "var(--rust)" }}
              >
                View full catalogue →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
