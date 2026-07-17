"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useBundle, buildBundleWhatsAppMessage, type FlyEvent } from "@/lib/bundle-context";
import { getWhatsAppLink, assetPath } from "@/lib/site-config";
import QuantityStepper from "./QuantityStepper";

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

// A short "ghost" arc from a product card's image to the floating Bundle button — a
// confirmation cue on top of the (already verified working) bundle state, not a fix.
function FlyGhost({ flyEvent, targetRef, onArrive }: {
  flyEvent: FlyEvent;
  targetRef: React.RefObject<HTMLButtonElement | null>;
  onArrive: () => void;
}) {
  const [target, setTarget] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const rect = targetRef.current?.getBoundingClientRect();
    if (rect) setTarget({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
  }, [targetRef]);

  if (!target) return null;
  const size = 44;
  const startX = flyEvent.fromRect.left + flyEvent.fromRect.width / 2 - size / 2;
  const startY = flyEvent.fromRect.top + flyEvent.fromRect.height / 2 - size / 2;
  const endX = target.left + target.width / 2 - size / 2;
  const endY = target.top + target.height / 2 - size / 2;

  return (
    <motion.div
      className="fixed z-[60] rounded-full overflow-hidden pointer-events-none"
      style={{ width: size, height: size, background: "var(--cream-deep)", boxShadow: "0 8px 20px -6px rgba(0,0,0,0.4)" }}
      initial={{ x: startX, y: startY, opacity: 1, scale: 1 }}
      animate={{ x: endX, y: endY, opacity: [1, 1, 0], scale: [1, 0.85, 0.35] }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={onArrive}
    >
      {flyEvent.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={assetPath(flyEvent.imageUrl)} alt="" className="w-full h-full object-cover" />
      )}
    </motion.div>
  );
}

export default function BundlePanel() {
  const {
    items,
    totalProducts,
    totalQuantity,
    panelOpen,
    openPanel,
    closePanel,
    updateQuantity,
    removeItem,
    clearBundle,
    flyEvent,
    clearFly,
  } = useBundle();
  const reduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const controls = useAnimationControls();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Portal rendering requires a real DOM node, only available after client mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.3 } });
  }, [controls, reduceMotion]);

  const receiveGhost = () => {
    if (!reduceMotion) {
      controls.start({ scale: [1, 1.16, 0.97, 1], transition: { duration: 0.45, ease: "easeOut" } });
    }
    clearFly();
  };

  const waLink = getWhatsAppLink(items.length > 0 ? buildBundleWhatsAppMessage(items) : undefined);

  return (
    <>
      {mounted &&
        flyEvent &&
        !reduceMotion &&
        createPortal(<FlyGhost key={flyEvent.token} flyEvent={flyEvent} targetRef={triggerRef} onArrive={receiveGhost} />, document.body)}

      {/* Floating trigger */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={openPanel}
        aria-label={`Open your bundle, ${totalQuantity} items`}
        className="btn-press fixed bottom-6 right-6 z-40 flex items-center gap-2 pl-4 pr-5 h-12 rounded-full"
        style={{ background: "var(--rust)", color: "var(--cream)", boxShadow: "0 8px 24px -8px rgba(0,0,0,0.45)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        whileHover={{ y: -3 }}
      >
        <BagIcon />
        <span className="text-sm font-semibold">Bundle</span>
        <AnimatePresence mode="wait" initial={false}>
          {totalQuantity > 0 && (
            <motion.span
              key={totalQuantity}
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.5 }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-[11px] font-bold"
              style={{ background: "var(--gold)", color: "var(--charcoal)" }}
            >
              {totalQuantity}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50"
              style={{ background: "rgba(31,42,46,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closePanel}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-label="Your product bundle"
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm flex flex-col"
              style={{ background: "var(--cream)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: reduceMotion ? "tween" : "spring", duration: reduceMotion ? 0 : undefined, stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--cream-deep)" }}>
                <div>
                  <h2 className="font-display text-xl font-medium" style={{ color: "var(--teal-dark)" }}>
                    Your Bundle
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: "#888" }}>
                    {totalProducts} product{totalProducts === 1 ? "" : "s"} · {totalQuantity} item{totalQuantity === 1 ? "" : "s"} total
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  aria-label="Close bundle"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--cream-deep)]"
                  style={{ color: "var(--teal-dark)" }}
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                {items.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-4xl mb-4" aria-hidden="true">🛍️</p>
                    <p className="text-sm mb-6" style={{ color: "#666" }}>
                      Your bundle is empty. Browse the catalogue and add products to build one quotation request.
                    </p>
                    <Link
                      href="/catalogue/"
                      onClick={closePanel}
                      className="inline-block px-6 py-3 rounded-full font-semibold text-sm"
                      style={{ background: "var(--teal-dark)", color: "var(--cream)" }}
                    >
                      Browse Catalogue
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-3 pb-4 border-b" style={{ borderColor: "var(--cream-deep)" }}>
                        {item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={assetPath(item.imageUrl)} alt={item.name} className="w-14 h-14 rounded-lg object-cover shrink-0" style={{ background: "var(--cream-deep)" }} />
                        ) : (
                          <div className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl shrink-0" style={{ background: "var(--cream-deep)" }} aria-hidden="true">
                            {item.emoji}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold leading-snug truncate" style={{ color: "var(--teal-dark)" }}>
                            {item.name}
                          </p>
                          <p className="text-[11px] mb-2" style={{ color: "#999" }}>
                            {item.categoryName}
                            {item.color ? ` · ${item.color}` : ""}
                          </p>
                          <div className="flex items-center justify-between">
                            <QuantityStepper value={item.quantity} onChange={(q) => updateQuantity(item.id, q)} size="sm" />
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-xs font-medium underline transition-opacity hover:opacity-70"
                              style={{ color: "var(--rust)" }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="px-5 py-4 border-t space-y-3" style={{ borderColor: "var(--cream-deep)" }}>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm hover:shadow-[0_4px_16px_-4px_rgba(37,211,102,0.55)]"
                    style={{ background: "#25D366", color: "white" }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Request Quote via WhatsApp
                  </a>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={clearBundle}
                      className="text-xs font-medium underline transition-opacity hover:opacity-70"
                      style={{ color: "#999" }}
                    >
                      Clear bundle
                    </button>
                    <button
                      type="button"
                      onClick={closePanel}
                      className="text-xs font-semibold underline transition-opacity hover:opacity-70"
                      style={{ color: "var(--teal-dark)" }}
                    >
                      Continue browsing
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
