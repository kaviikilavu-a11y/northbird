"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { StaggerGroup, StaggerItem } from "./Reveal";
import { useMounted } from "@/lib/use-mounted";

// The static-list vs. scroll-pinned branch below renders genuinely different DOM (not just
// different animation values), so it can't use the "always render the same element" trick
// Reveal.tsx uses. Instead, gate it on mount: both server and the client's first pass render
// the same thing, and only after hydration is guaranteed complete do we read the real
// reduceMotion value — avoiding the hydration mismatch (React error #418) that a
// synchronously-resolved useReducedMotion() would otherwise cause.

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
}

function StepCard({ step, accentColor }: { step: ProcessStep; accentColor: string }) {
  return (
    <div>
      <span
        className="font-display font-medium flex items-center justify-center w-11 h-11 rounded-full mb-4"
        style={{ color: "var(--cream)", background: accentColor, fontSize: "0.95rem" }}
        aria-hidden="true"
      >
        {step.n}
      </span>
      <h3 className="font-semibold text-base mb-2" style={{ color: "var(--teal-dark)" }}>
        {step.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
        {step.body}
      </p>
    </div>
  );
}

function StaticStepList({ steps, accentColor }: { steps: ProcessStep[]; accentColor: string }) {
  return (
    <StaggerGroup className="space-y-8" stagger={0.1}>
      {steps.map((s) => (
        <StaggerItem key={s.n} variant="up">
          <StepCard step={s} accentColor={accentColor} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

/**
 * A scroll-pinned strip that scrubs a row of steps sideways as the page scrolls down,
 * instead of everything fading in at once. Desktop/tablet only — below `md`, and under
 * prefers-reduced-motion, this renders as a plain stacked list instead: scroll-jacking
 * horizontal motion is a poor fit for touch scrolling and for motion-sensitive users.
 */
export default function PinnedProcessStrip({
  steps,
  accentColor = "var(--rust)",
}: {
  steps: ProcessStep[];
  accentColor?: string;
}) {
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const useStaticList = !mounted || reduceMotion;
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = track?.parentElement;
      if (!track || !viewport) return;
      setMaxTranslate(Math.max(track.scrollWidth - viewport.clientWidth, 0));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [steps.length]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  return (
    <>
      <div className="md:hidden">
        <StaticStepList steps={steps} accentColor={accentColor} />
      </div>

      {/* Both variants stay mounted (toggled via CSS, not conditional rendering) so the
          useScroll target ref is always attached from the first paint onward — a ref that's
          sometimes absent from the tree makes useScroll warn that its target "is defined but
          not hydrated." */}
      <div className={useStaticList ? "hidden md:block" : "hidden"}>
        <StaticStepList steps={steps} accentColor={accentColor} />
      </div>
      <div
        className={useStaticList ? "hidden" : "hidden md:block relative"}
        ref={outerRef}
        style={{ height: `${Math.max(steps.length * 55, 200)}vh` }}
      >
        <div className="sticky top-28 h-[60vh] flex flex-col justify-center overflow-hidden">
          <motion.div ref={trackRef} className="flex gap-14 lg:gap-20 w-max" style={{ x }}>
            {steps.map((s) => (
              <div key={s.n} className="shrink-0 w-[280px] lg:w-[320px]">
                <StepCard step={s} accentColor={accentColor} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
