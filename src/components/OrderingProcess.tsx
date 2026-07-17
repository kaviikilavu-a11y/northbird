"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import SectionLabel from "@/components/motion/SectionLabel";

const STEPS = [
  {
    n: "01",
    title: "Choose Products",
    body: "Browse the catalogue and pick what you need — real pricing, no login required.",
  },
  {
    n: "02",
    title: "Branding Mockup",
    body: "Send your logo, PDF, or brand guidelines and we'll show you how it looks on the product.",
  },
  {
    n: "03",
    title: "Quotation",
    body: "Receive your quotation the very same day, complete with pricing, branding recommendations, and estimated production timelines.",
  },
  {
    n: "04",
    title: "Production",
    body: "Confirm payment (100% upfront) and approve your artwork — production then runs under strict quality control.",
  },
  {
    n: "05",
    title: "Delivery",
    body: "Safely packaged and delivered on schedule, wherever your business is based.",
  },
];

export default function OrderingProcess() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <Reveal variant="up">
        <div>
          <SectionLabel n="07" color="var(--orange)" />
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
            How Ordering Works
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-2" style={{ color: "var(--teal-dark)" }}>
            No cart. No account. Just WhatsApp.
          </h2>
          <p className="text-sm max-w-xl mb-14" style={{ color: "#666" }}>
            A deliberate choice, not a placeholder waiting for checkout — the way Kenyan businesses already buy.
          </p>
        </div>
      </Reveal>

      <div ref={trackRef} className="relative">
        <div
          className="hidden sm:block absolute top-5 left-[10%] right-[10%] h-px"
          style={{ background: "var(--cream-deep)" }}
          aria-hidden="true"
        >
          <motion.div
            className="h-full origin-left"
            style={{ background: "var(--rust)", scaleX: reduceMotion ? 1 : lineScale }}
          />
        </div>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-5 gap-8 sm:gap-4 relative">
          {STEPS.map((s) => (
            <StaggerItem key={s.n} variant="up" className="relative">
              <span
                className="font-display text-3xl font-medium flex items-center justify-center w-10 h-10 rounded-full mb-4 relative z-10"
                style={{ color: "var(--cream)", background: "var(--rust)", fontSize: "1rem" }}
                aria-hidden="true"
              >
                {s.n}
              </span>
              <h3 className="font-semibold text-base mb-2" style={{ color: "var(--teal-dark)" }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                {s.body}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
