"use client";

import { useEffect, useRef, useCallback } from "react";
import NorthbirdMascot, { NorthbirdMascotHandle } from "./NorthbirdMascot";

// Anchor position: near the top-right, visually reads as "living near the nav"
const HOME_TOP = 72; // px from top
const HOME_RIGHT = 20; // px from right

interface Station {
  id: string;
  top: number; // computed from IntersectionObserver entry
}

export default function NorthbirdFlightController() {
  const mascotRef = useRef<NorthbirdMascotHandle>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentStation = useRef<string | null>(null);
  const whatsappObserver = useRef<IntersectionObserver | null>(null);
  const footerObserver = useRef<IntersectionObserver | null>(null);

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

  const flyToStation = useCallback((stationId: string, top: number, isBottom = false) => {
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
      el.style.top = `${Math.max(top - 40, HOME_TOP)}px`;
    }

    setTimeout(() => mascotRef.current?.land(), 600);
  }, []);

  useEffect(() => {
    let whatsappInView = false;
    let footerInView = false;

    const resolve = () => {
      if (footerInView) {
        flyToStation("footer", 0, true);
      } else if (whatsappInView) {
        const el = document.querySelector("[data-mascot-station='whatsapp']");
        if (el) {
          const rect = el.getBoundingClientRect();
          flyToStation("whatsapp", window.scrollY + rect.top);
        } else {
          flyToStation("whatsapp", window.scrollY + window.innerHeight * 0.6);
        }
      } else {
        flyHome();
      }
    };

    whatsappObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { whatsappInView = e.isIntersecting; });
        resolve();
      },
      { threshold: 0.3 }
    );

    footerObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { footerInView = e.isIntersecting; });
        resolve();
      },
      { threshold: 0.2 }
    );

    const attachObservers = () => {
      document.querySelectorAll("[data-mascot-station='whatsapp']").forEach((el) => {
        whatsappObserver.current?.observe(el);
      });
      document.querySelectorAll("[data-mascot-station='footer']").forEach((el) => {
        footerObserver.current?.observe(el);
      });
    };

    attachObservers();

    // Re-attach after route changes (Next.js navigation)
    const mutObserver = new MutationObserver(() => {
      whatsappObserver.current?.disconnect();
      footerObserver.current?.disconnect();
      attachObservers();
    });
    mutObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      whatsappObserver.current?.disconnect();
      footerObserver.current?.disconnect();
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
