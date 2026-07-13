// Single source of truth for motion timing across the site. New animations should pull
// from here rather than inventing their own curve/duration so everything reads as one
// coherent motion language (this is the same expo-out curve Reveal.tsx already uses).
export const EASE = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.2,
  medium: 0.4,
  slow: 0.7,
} as const;

export const SPRING = {
  /** Small UI elements — badges, underlines, toggle indicators. */
  snappy: { type: "spring", stiffness: 380, damping: 30 } as const,
  /** Panels and drawers. */
  drawer: { type: "spring", stiffness: 320, damping: 34 } as const,
  /** Magnetic hover follow. */
  magnetic: { type: "spring", stiffness: 200, damping: 15, mass: 0.5 } as const,
};

export const PAGE_TRANSITION = { duration: 0.38, ease: EASE };
