"use client";

import { useReducedMotion } from "framer-motion";

/**
 * A slow light-sweep that travels once around a card's border — a restrained accent for
 * flagging a single standout item (e.g. "Best value"), not for general decoration.
 * Pure CSS `offset-path` animation, so it costs nothing on the JS thread.
 */
export default function BorderBeam({
  size = 140,
  duration = 7,
  colorFrom = "var(--gold)",
  colorTo = "var(--rust)",
  className,
}: {
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden ${className ?? ""}`}
      style={{
        WebkitMaskImage: "linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor" as unknown as string,
        maskComposite: "exclude",
        padding: 1.5,
      }}
    >
      <div
        className="northbird-border-beam absolute aspect-square rounded-full"
        style={{
          width: size,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          animationDuration: `${duration}s`,
        }}
      />
    </div>
  );
}
