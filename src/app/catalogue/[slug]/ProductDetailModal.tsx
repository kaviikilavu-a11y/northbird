"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatKES, brandingMethodsForCategory, type ProductVariant } from "@/lib/catalogue-data";
import { getWhatsAppLink, assetPath } from "@/lib/site-config";

function ProductDetailModal({
  product,
  categoryName,
  categorySlug,
  categoryEmoji,
  related,
  onClose,
  onSelectRelated,
}: {
  product: ProductVariant;
  categoryName: string;
  categorySlug: string;
  categoryEmoji: string;
  related: ProductVariant[];
  onClose: () => void;
  onSelectRelated: (p: ProductVariant) => void;
}) {
  const reduceMotion = useReducedMotion();
  const waLink = getWhatsAppLink(`Hi! I'd like to order the ${product.name}.`);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25 }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(31,42,46,0.6)" }}
          onClick={onClose}
          aria-hidden="true"
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
          style={{ background: "var(--cream)" }}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 10 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.85)", color: "var(--teal-dark)" }}
          >
            ✕
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="aspect-square md:aspect-auto md:h-full overflow-hidden" style={{ background: "var(--cream-deep)" }}>
              {product.imageUrl ? (
                <motion.img
                  key={product.id}
                  src={assetPath(product.imageUrl)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-7xl" aria-hidden="true">
                  {categoryEmoji}
                </div>
              )}
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-4">
              <div>
                <p className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "var(--teal-light)" }}>
                  {categoryName}
                </p>
                <h2 className="font-display text-2xl font-semibold mt-1" style={{ color: "var(--teal-dark)" }}>
                  {product.name}
                </h2>
              </div>

              <p className="font-bold text-xl" style={{ color: "var(--rust)" }}>
                {product.customQuote || product.price === undefined ? "Request a Quote" : formatKES(product.price)}
              </p>

              {product.description && (
                <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                  {product.description}
                </p>
              )}

              {product.colors && product.colors.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold tracking-widest uppercase mb-2" style={{ color: "#999" }}>
                    Available colours
                  </p>
                  <p className="text-sm" style={{ color: "var(--teal-dark)" }}>
                    {product.colors.join(" · ")}
                  </p>
                </div>
              )}

              <div>
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-2" style={{ color: "#999" }}>
                  Branding methods
                </p>
                <p className="text-sm" style={{ color: "var(--teal-dark)" }}>
                  {brandingMethodsForCategory(categorySlug).join(" · ")}
                </p>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press mt-2 flex items-center justify-center gap-1.5 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-[0_4px_16px_-4px_rgba(37,211,102,0.55)]"
                style={{ background: "#25D366", color: "white" }}
              >
                Request Quote via WhatsApp
              </a>

              {related.length > 0 && (
                <div className="mt-2 pt-4 border-t" style={{ borderColor: "var(--cream-deep)" }}>
                  <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "#999" }}>
                    Related products
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {related.slice(0, 3).map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => onSelectRelated(r)}
                        className="text-left group"
                      >
                        <div className="aspect-square rounded-lg overflow-hidden mb-1.5" style={{ background: "var(--cream-deep)" }}>
                          {r.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={assetPath(r.imageUrl)}
                              alt={r.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl" aria-hidden="true">
                              {categoryEmoji}
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] leading-snug line-clamp-2" style={{ color: "var(--teal-dark)" }}>
                          {r.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Rendered via a portal to document.body — a transformed ancestor (e.g. the product
// card's hover/active translate/scale utilities) would otherwise become the containing
// block for this modal's `position: fixed`, trapping it inside the card's own box.
export default function ProductDetailModalPortal(props: Parameters<typeof ProductDetailModal>[0]) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Portals require a real DOM node, only available after client mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return createPortal(<ProductDetailModal {...props} />, document.body);
}
