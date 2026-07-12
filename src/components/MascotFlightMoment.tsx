"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import NorthbirdMascot, { type NorthbirdMascotHandle } from "@/components/mascot/NorthbirdMascot";

const MASCOT_SIZE = 110;

function Parcel() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="9" width="18" height="12" rx="1.5" fill="var(--gold)" />
      <path d="M3 9 12 4l9 5" fill="none" stroke="var(--rust)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 9v12M3 9v12M21 9v12" stroke="var(--rust)" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export default function MascotFlightMoment() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<NorthbirdMascotHandle>(null);
  const phaseRef = useRef<"ground" | "flying" | "landed">("ground");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // "left"/"top" (not framer's x/y transform shorthand) so this never collides with the
  // rotate/scale transforms also animated on this element — mixing transform-shorthand
  // motion values with other transform sources on the same element is undefined behaviour.
  const left = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.7, 0.88, 1], ["-10vw", "14vw", "38vw", "58vw", "70vw", "70vw"]);
  const top = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.7, 0.88, 1], ["42vh", "24vh", "46vh", "22vh", "36vh", "36vh"]);
  const rotate = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.7, 0.88, 1], [-6, 8, -8, 6, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.88, 1], [0.7, 0.85, 1.05, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.06, 1], [0, 1, 1]);

  const parcelOpacity = useTransform(scrollYProgress, [0, 0.06, 0.86, 0.94], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.8, 0.94], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.8, 0.94], [16, 0]);
  const perchOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduceMotion) return;
    if (v > 0.04 && v < 0.86 && phaseRef.current !== "flying") {
      phaseRef.current = "flying";
      mascotRef.current?.fly();
    } else if (v >= 0.86 && phaseRef.current !== "landed") {
      phaseRef.current = "landed";
      mascotRef.current?.land();
    } else if (v <= 0.04 && phaseRef.current !== "ground") {
      phaseRef.current = "ground";
      mascotRef.current?.idle();
    }
  });

  useEffect(() => {
    mascotRef.current?.turn("right");
  }, []);

  if (reduceMotion) {
    return (
      <section className="py-20 md:py-28 px-4 text-center" style={{ background: "var(--cream-deep)" }}>
        <NorthbirdMascot size={72} />
        <p className="font-display text-3xl md:text-5xl font-medium mt-4" style={{ color: "var(--teal-dark)" }}>
          Your brand, on its way.
        </p>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[280vh]" style={{ background: "var(--cream-deep)" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute flex items-end gap-1"
          style={{ left, top, rotate, scale, opacity }}
        >
          <NorthbirdMascot ref={mascotRef} size={MASCOT_SIZE} />
          <motion.div style={{ opacity: parcelOpacity }} className="mb-2">
            <Parcel />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute h-px w-28"
          style={{
            background: "var(--rust)",
            opacity: perchOpacity,
            left: "calc(70vw - 10px)",
            top: `calc(36vh + ${MASCOT_SIZE + 8}px)`,
          }}
          aria-hidden="true"
        />

        <motion.p
          className="absolute inset-x-0 text-center px-6"
          style={{
            color: "var(--teal-dark)",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            top: "72vh",
            opacity: textOpacity,
            y: textY,
          }}
        >
          <span className="font-display font-medium">Your brand, on its way.</span>
        </motion.p>
      </div>
    </section>
  );
}
