"use client";

import { motion, useReducedMotion, type TargetAndTransition, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useMounted } from "@/lib/use-mounted";

// useReducedMotion() itself resolves synchronously from matchMedia on the client's first
// render (before hydration completes), so trusting it directly can still diverge from the
// server's render whenever prefers-reduced-motion is on. Only trust it once mount is
// confirmed on both sides.
function useSafeReducedMotion(): boolean {
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  return mounted && !!reduceMotion;
}

export type RevealVariant = "up" | "left" | "right" | "scale" | "blur";

const EASE = [0.16, 1, 0.3, 1] as const;

const HIDDEN: Record<RevealVariant, TargetAndTransition> = {
  up: { opacity: 0, y: 28 },
  left: { opacity: 0, x: -28 },
  right: { opacity: 0, x: 28 },
  scale: { opacity: 0, scale: 0.94 },
  blur: { opacity: 0, filter: "blur(10px)" },
};

const SHOWN: TargetAndTransition = {
  opacity: 1,
  y: 0,
  x: 0,
  scale: 1,
  filter: "blur(0px)",
  transition: { duration: 0.7, ease: EASE },
};

/** Reveals a single block on scroll-into-view. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useSafeReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? SHOWN : HIDDEN[variant]}
      whileInView={SHOWN}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function staggerContainer(stagger: number): Variants {
  return { hidden: {}, visible: { transition: { staggerChildren: stagger } } };
}

function itemVariants(variant: RevealVariant, reduceMotion: boolean): Variants {
  return {
    hidden: reduceMotion ? SHOWN : HIDDEN[variant],
    visible: reduceMotion ? { ...SHOWN, transition: { duration: 0 } } : SHOWN,
  };
}

/** Stagger container — pairs with StaggerItem to reveal a list progressively, not all at once. */
export function StaggerGroup({
  children,
  className,
  style,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
}) {
  const reduceMotion = useSafeReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer(reduceMotion ? 0 : stagger)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  const reduceMotion = useSafeReducedMotion();

  return (
    <motion.div className={className} variants={itemVariants(variant, !!reduceMotion)}>
      {children}
    </motion.div>
  );
}
