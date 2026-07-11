"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { PRIMARY_CTA, getWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/site-config";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalogue/", label: "Catalogue" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

// True only once the client has hydrated — avoids a server/client markup mismatch
// for the pathname-dependent transparent-nav styling below.
const subscribeNever = () => () => {};
function useMounted() {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const mounted = useMounted();
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Transparent-on-dark-hero only applies on the homepage before scrolling.
  const onHomeHero = mounted && pathname === "/" && !scrolled;
  const textColor = onHomeHero ? "var(--cream)" : "var(--teal-dark)";
  const activeColor = onHomeHero ? "var(--gold)" : "var(--rust)";

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40"
      animate={{
        backgroundColor: onHomeHero ? "rgba(31,42,46,0)" : "rgba(251,247,238,0.92)",
        borderBottomColor: onHomeHero ? "rgba(251,247,238,0)" : "var(--teal-light)",
        boxShadow: !onHomeHero && scrolled ? "0 1px 0 0 rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.12)" : "0 0 0 0 rgba(0,0,0,0)",
        backdropFilter: onHomeHero ? "blur(0px)" : "blur(10px)",
      }}
      style={{ WebkitBackdropFilter: onHomeHero ? "blur(0px)" : "blur(10px)", borderBottomWidth: 1, borderBottomStyle: "solid" }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4"
        animate={{ paddingTop: scrolled ? 10 : 20, paddingBottom: scrolled ? 10 : 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
      >
        <motion.div animate={{ scale: scrolled ? 0.92 : 1 }} transition={{ duration: 0.35, ease: "easeOut" }}>
          <Link
            href="/"
            className="font-display font-semibold text-lg tracking-tight shrink-0"
            style={{ color: textColor }}
          >
            Northbird & Co
          </Link>
        </motion.div>
        <ul className="flex gap-6 text-sm font-medium">
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  className="transition-colors pb-1 block"
                  style={{ color: active ? activeColor : textColor }}
                >
                  {label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full"
                    style={{ background: activeColor }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
        <a
          href={getWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-block shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all hover:shadow-[0_0_0_4px_rgba(168,71,42,0.18)] active:scale-95"
          style={{ background: "var(--rust)", color: "var(--cream)" }}
        >
          {PRIMARY_CTA}
        </a>
      </motion.div>
    </motion.nav>
  );
}
