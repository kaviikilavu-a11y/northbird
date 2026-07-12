"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import SectionLabel from "@/components/motion/SectionLabel";

const REASONS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
      </svg>
    ),
    title: "Fast Turnaround",
    body: "From quotation to delivery, our streamlined process keeps projects moving.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 2 2.9 6.3L21 9.3l-4.5 4.6L17.6 21 12 17.8 6.4 21l1.1-7.1L3 9.3l6.1-1Z" />
      </svg>
    ),
    title: "Premium Quality",
    body: "Professionally selected merchandise produced to corporate standards.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20 20 4M15 4h5v5M9 20H4v-5" />
      </svg>
    ),
    title: "Custom Branding",
    body: "Embroidery, screen printing, UV printing, engraving and more.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    title: "Dedicated Support",
    body: "Personal assistance from concept through delivery.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="7" width="15" height="10" rx="1.5" />
        <path d="M16 10h3.5L22 13.5V17h-6" />
        <circle cx="6" cy="19" r="1.7" />
        <circle cx="17.5" cy="19" r="1.7" />
      </svg>
    ),
    title: "Reliable Delivery",
    body: "Professional logistics with dependable timelines.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21V10l9-6 9 6v11" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
    title: "Built for Business",
    body: "Scalable solutions for organizations of every size.",
  },
];

export default function BrandInspiration() {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal variant="blur">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel n="05" color="var(--gold)" />
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
              Why Brands Choose Northbird
            </p>
            <p className="font-display text-3xl md:text-4xl font-medium" style={{ color: "var(--cream)" }}>
              Built on consistency, not coincidence.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {REASONS.map((r) => (
            <StaggerItem key={r.title} variant="up">
              <motion.div
                className="h-full rounded-2xl p-6 border transition-colors duration-300"
                style={{ borderColor: "rgba(251,247,238,0.12)", background: "rgba(251,247,238,0.03)" }}
                whileHover={{ y: -4, borderColor: "rgba(232,174,63,0.4)" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(232,174,63,0.12)", color: "var(--gold)" }}
                >
                  {r.icon}
                </div>
                <h3 className="font-display text-lg font-medium mb-2" style={{ color: "var(--cream)" }}>
                  {r.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(251,247,238,0.65)" }}>
                  {r.body}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
