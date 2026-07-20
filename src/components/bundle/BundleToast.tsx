"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useBundle } from "@/lib/bundle-context";

export default function BundleToast() {
  const { lastAdded, openPanel } = useBundle();
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!lastAdded) return;
    // Reacting to a new "item added" event from context — each addition gets a fresh
    // token, so this re-triggers the toast even for repeat additions of the same item.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, [lastAdded]);

  return (
    <AnimatePresence>
      {visible && lastAdded && (
        <motion.div
          className="fixed bottom-24 right-6 z-40 max-w-xs rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ background: "var(--charcoal)", color: "var(--cream)", boxShadow: "0 8px 24px -8px rgba(0,0,0,0.5)" }}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.95 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
          role="status"
          aria-live="polite"
        >
          <span className="text-lg shrink-0" aria-hidden="true">✓</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Added to bundle</p>
            <p className="text-[11px] opacity-70 truncate">
              {lastAdded.name} · Qty {lastAdded.quantity}
            </p>
          </div>
          <button
            type="button"
            onClick={() => { setVisible(false); openPanel(); }}
            className="text-[11px] font-semibold underline shrink-0"
            style={{ color: "var(--gold)" }}
          >
            View
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
