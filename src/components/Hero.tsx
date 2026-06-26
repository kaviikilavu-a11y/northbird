"use client";

import { useEffect, useRef, useState, useReducer } from "react";
import Link from "next/link";
import { getWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/site-config";

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
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
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
      className="relative overflow-hidden min-h-[88vh] flex items-center"
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
              "linear-gradient(to right, rgba(26,26,26,0.72) 0%, rgba(26,26,26,0.45) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="max-w-xl">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "var(--gold)" }}
          >
            East Africa&apos;s Branded Merchandise Studio
          </p>
          <h1
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
            style={{ color: "var(--cream)" }}
          >
            Merch people<br />actually keep.
          </h1>
          <p
            className="text-lg mb-8 leading-relaxed"
            style={{ color: "rgba(251,247,238,0.8)" }}
          >
            Premium branded merchandise for East African businesses — from first sample to final delivery.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/catalogue"
              className="px-7 py-3.5 rounded-full font-semibold text-sm transition-transform hover:scale-105"
              style={{ background: "var(--gold)", color: "#1a1a1a" }}
            >
              Browse Catalogue
            </Link>
            <a
              href={getWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full font-semibold text-sm border transition-transform hover:scale-105"
              style={{ borderColor: "var(--cream)", color: "var(--cream)" }}
            >
              Get a Quote
            </a>
          </div>
        </div>

        {/* Slide dots */}
        {!reducedMotion && (
          <div className="absolute bottom-8 left-6 flex gap-2" aria-hidden="true">
            {SLIDES.map((slide, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); setPaused(true); }}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: i === activeIndex ? "var(--gold)" : "rgba(251,247,238,0.4)",
                  width: i === activeIndex ? "24px" : "8px",
                }}
                aria-label={slide.label}
              />
            ))}
          </div>
        )}

        {/* Active slide label */}
        <p
          className="absolute bottom-8 right-6 text-xs font-medium tracking-wide"
          style={{ color: "rgba(251,247,238,0.5)" }}
          aria-live="polite"
        >
          {reducedMotion ? SLIDES[0].label : SLIDES[activeIndex].label}
        </p>
      </div>
    </section>
  );
}
