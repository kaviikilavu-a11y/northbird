"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NorthbirdMascot from "@/components/mascot/NorthbirdMascot";
import { BRAND } from "@/lib/site-config";

const SESSION_KEY = "nb-intro-seen";
const HOLD_MS = 900;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

/** A brief, skippable logo-assemble intro — homepage only, once per session. */
export default function LoadingIntro() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (pathname !== "/" || reduceMotion) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");
    // The show/hide decision depends on sessionStorage, which only exists client-side —
    // it cannot be derived during render without a server/client markup mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
    const timer = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(timer);
    // Only ever evaluated once on the initial homepage mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4"
          style={{ background: "var(--charcoal)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={() => setVisible(false)}
          role="presentation"
        >
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center gap-4">
            <motion.div variants={item}>
              <NorthbirdMascot size={56} />
            </motion.div>
            <motion.p
              className="font-display text-2xl font-medium"
              style={{ color: "var(--cream)" }}
              variants={item}
            >
              {BRAND.name}
            </motion.p>
            <motion.p
              className="font-display italic text-sm"
              style={{ color: "var(--teal-light)" }}
              variants={item}
            >
              {BRAND.slogan}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
