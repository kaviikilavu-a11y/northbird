"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const RING_SPRING = { stiffness: 280, damping: 28, mass: 0.5 };
const DOT_SPRING = { stiffness: 900, damping: 40, mass: 0.2 };

/**
 * A small dot + soft ring that trails the pointer. Grows and shows a short label over
 * elements tagged `data-cursor="Label"` (empty value = grow with no label). Desktop-with
 * -precise-pointer only, and the native cursor is only ever hidden once the custom one has
 * a real position to paint at — never a frame with no cursor visible at all.
 */
export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, RING_SPRING);
  const ringY = useSpring(y, RING_SPRING);
  const dotX = useSpring(x, DOT_SPRING);
  const dotY = useSpring(y, DOT_SPRING);

  useEffect(() => {
    // Reading a platform capability on mount, not deriving from props/state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled || reduceMotion) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      if (target) {
        setActive(true);
        setLabel(target.getAttribute("data-cursor") || null);
      } else {
        setActive(false);
        setLabel(null);
      }
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    window.addEventListener("blur", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
    };
  }, [enabled, reduceMotion, x, y]);

  // Only hide the native cursor once the custom one is actually visible and positioned —
  // otherwise a brief window exists with no cursor painted at all.
  useEffect(() => {
    document.body.classList.toggle("nb-custom-cursor", visible);
    return () => document.body.classList.remove("nb-custom-cursor");
  }, [visible]);

  if (!enabled || reduceMotion) return null;

  const ringSize = active ? (label ? 64 : 40) : 22;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--rust)",
          borderWidth: 1.5,
          opacity: visible ? 0.9 : 0,
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {label && (
          <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--rust)" }}>
            {label}
          </span>
        )}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: "var(--rust)",
          opacity: visible && !label ? 1 : 0,
        }}
      />
    </>
  );
}
