"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BRAND, PRIMARY_CTA, getWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/site-config";

// Placeholder product visuals — replace src with real Canva/Adobe Express mockup URLs
// Each uses Northbird brand colors as gradient backgrounds until real images exist
const SLIDES: { gradient: string; label: string; imageUrl?: string }[] = [
  {
    label: "Branded Mug",
    gradient: "linear-gradient(135deg, #4F7C81 0%, #7FA8AD 50%, #FBF7EE 100%)",
  },
  {
    label: "Hardcover Notebook",
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #4F7C81 60%, #E8AE3F 100%)",
  },
  {
    label: "Canvas Tote Bag",
    gradient: "linear-gradient(135deg, #D97B2B 0%, #E8AE3F 50%, #FBF7EE 100%)",
  },
  {
    label: "Water Bottle",
    gradient: "linear-gradient(135deg, #4F7C81 0%, #A8472A 60%, #FBF7EE 100%)",
  },
  {
    label: "Gift Set Flat-lay",
    gradient: "linear-gradient(135deg, #A8472A 0%, #D97B2B 40%, #E8AE3F 100%)",
  },
];

const SLIDE_DURATION = 5000; // ms per slide
const TRANSITION_DURATION = 900; // ms crossfade

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, reducedMotion]);

  return (
    <section
      className="relative overflow-hidden min-h-[92vh] flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero"
    >
      {/* Background slide stack */}
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.map((slide, i) => {
          const isActive = reducedMotion ? i === 0 : i === activeIndex;
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                background: slide.imageUrl
                  ? `url(${slide.imageUrl}) center/cover no-repeat`
                  : slide.gradient,
                opacity: isActive ? 1 : 0,
                transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
              }}
            />
          );
        })}
        {/* Scrim for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(31,42,46,0.82) 0%, rgba(31,42,46,0.55) 55%, rgba(31,42,46,0.15) 100%)",
          }}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ background: "var(--gold)" }} aria-hidden="true" />
            <p
              className="text-xs font-semibold tracking-[0.15em] uppercase"
              style={{ color: "var(--gold)" }}
            >
              {BRAND.eyebrow}
            </p>
          </div>
          <h1
            className="font-display font-medium leading-[1.05] mb-7"
            style={{ color: "var(--cream)", fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)" }}
          >
            Merch people<br />actually keep.
          </h1>
          <p
            className="text-lg mb-10 leading-relaxed max-w-lg"
            style={{ color: "rgba(251,247,238,0.75)" }}
          >
            {BRAND.subhead}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={getWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: "var(--rust)", color: "var(--cream)" }}
            >
              {PRIMARY_CTA}
            </a>
            <Link
              href="/catalogue/"
              className="text-sm font-semibold tracking-wide border-b pb-0.5 transition-opacity hover:opacity-70"
              style={{ borderColor: "rgba(251,247,238,0.4)", color: "var(--cream)" }}
            >
              Browse Collections →
            </Link>
          </div>
        </div>

        {/* Slide index + dots */}
        <div className="absolute bottom-10 left-6 flex items-center gap-4">
          <span
            className="text-xs tabular-nums tracking-wide"
            style={{ color: "rgba(251,247,238,0.5)" }}
            aria-live="polite"
          >
            {String((reducedMotion ? 0 : activeIndex) + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          {!reducedMotion && (
            <div className="flex gap-2" aria-hidden="true">
              {SLIDES.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIndex(i); setPaused(true); }}
                  className="h-px transition-all"
                  style={{
                    background: i === activeIndex ? "var(--gold)" : "rgba(251,247,238,0.35)",
                    width: i === activeIndex ? "28px" : "14px",
                  }}
                  aria-label={slide.label}
                />
              ))}
            </div>
          )}
        </div>

        <p
          className="absolute bottom-10 right-6 text-xs font-medium tracking-wide uppercase"
          style={{ color: "rgba(251,247,238,0.45)" }}
        >
          {reducedMotion ? SLIDES[0].label : SLIDES[activeIndex].label}
        </p>
      </div>
    </section>
  );
}
