"use client";

import { useSyncExternalStore } from "react";

const subscribeNever = () => () => {};

/**
 * True only once the client has mounted. Use to gate any value that can't be known
 * server-side (matchMedia, window, etc.) — reading it directly during render, even via
 * useReducedMotion()/useState(() => ...), resolves synchronously on the client's first pass
 * and can diverge from what the server rendered, causing a hydration mismatch.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}
