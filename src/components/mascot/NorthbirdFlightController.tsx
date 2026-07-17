"use client";

import { useEffect, useRef, useCallback } from "react";
import NorthbirdMascot, { NorthbirdMascotHandle } from "./NorthbirdMascot";

// Anchor position: near the top-right, visually reads as "living near the nav"
const HOME_TOP = 72; // px from top
const HOME_RIGHT = 20; // px from right

/**
 * Any element with a `data-mascot-station="<id>"` attribute becomes a stop the mascot
 * flies to while it's in view. When several stations are in view at once, the mascot
 * perches at whichever is closest to the top of the viewport. The station id "footer"
 * gets special bottom-pinned placement (matches the footer's own layout); every other
 * id perches near the element's top edge.
 */
export default function NorthbirdFlightController() {
  const mascotRef = useRef<NorthbirdMascotHandle>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentStation = useRef<string | null>(null);
  const inViewStations = useRef<Set<string>>(new Set());

  const flyHome = useCallback(() => {
    if (currentStation.current === "home") return;
    currentStation.current = "home";
    const el = wrapperRef.current;
    if (!el) return;

    mascotRef.current?.fly();
    mascotRef.current?.turn("right");

    el.style.transition = "top 0.6s cubic-bezier(0.4,0,0.2,1), right 0.6s cubic-bezier(0.4,0,0.2,1), bottom 0.6s cubic-bezier(0.4,0,0.2,1)";
    el.style.top = `${HOME_TOP}px`;
    el.style.right = `${HOME_RIGHT}px`;
    el.style.bottom = "auto";

    setTimeout(() => mascotRef.current?.idle(), 700);
  }, []);

  const flyToStation = useCallback((stationId: string, viewportTop: number, isBottom = false) => {
    if (currentStation.current === stationId) return;
    currentStation.current = stationId;
    const el = wrapperRef.current;
    if (!el) return;

    mascotRef.current?.fly();
    mascotRef.current?.turn("left");

    el.style.transition = "top 0.7s cubic-bezier(0.4,0,0.2,1), right 0.7s cubic-bezier(0.4,0,0.2,1), bottom 0.7s cubic-bezier(0.4,0,0.2,1)";

    if (isBottom) {
      el.style.top = "auto";
      el.style.bottom = "20px";
    } else {
      el.style.bottom = "auto";
      // The wrapper is position:fixed, so this needs a viewport-relative offset, not a
      // page-absolute scroll position — clamped to stay on-screen top and bottom.
      const clamped = Math.min(Math.max(viewportTop - 40, HOME_TOP), window.innerHeight - 100);
      el.style.top = `${clamped}px`;
    }

    setTimeout(() => mascotRef.current?.land(), 600);
  }, []);

  useEffect(() => {
    const resolve = () => {
      if (inViewStations.current.size === 0) {
        flyHome();
        return;
      }
      const candidates = Array.from(inViewStations.current)
        .map((id) => {
          const el = document.querySelector(`[data-mascot-station="${id}"]`);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id, isBottom: id === "footer", viewportTop: rect.top };
        })
        .filter((c): c is NonNullable<typeof c> => c !== null)
        .sort((a, b) => a.viewportTop - b.viewportTop);

      const best = candidates[0];
      if (best) flyToStation(best.id, best.viewportTop, best.isBottom);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = (e.target as HTMLElement).dataset.mascotStation;
          if (!id) return;
          if (e.isIntersecting) inViewStations.current.add(id);
          else inViewStations.current.delete(id);
        });
        resolve();
      },
      { threshold: 0.3 }
    );

    const attachObservers = () => {
      document.querySelectorAll("[data-mascot-station]").forEach((el) => observer.observe(el));
    };

    attachObservers();

    // Re-attach after route changes (Next.js navigation)
    const mutObserver = new MutationObserver(() => {
      observer.disconnect();
      inViewStations.current.clear();
      attachObservers();
    });
    mutObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObserver.disconnect();
    };
  }, [flyHome, flyToStation]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        top: HOME_TOP,
        right: HOME_RIGHT,
        zIndex: 50,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <div style={{ pointerEvents: "auto" }}>
        <NorthbirdMascot ref={mascotRef} size={64} />
      </div>
    </div>
  );
}
