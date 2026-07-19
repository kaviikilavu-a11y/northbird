"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { PAGE_TRANSITION } from "./tokens";
import { useMounted } from "@/lib/use-mounted";

/** Crossfades route content on navigation — a lift-and-blur, not a full page reload feel. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // useReducedMotion() resolves synchronously from matchMedia on the client's first render
  // (before hydration completes), so trusting it directly — even just for prop values, not
  // element type — can still diverge from the server's render and produce a hydration
  // mismatch. Only trust it once mount is confirmed on both sides.
  const reduceMotionPreference = useReducedMotion();
  const mounted = useMounted();
  const reduceMotion = mounted && !!reduceMotionPreference;
  const transition = reduceMotion ? { duration: 0 } : PAGE_TRANSITION;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -6, filter: "blur(6px)" }}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
