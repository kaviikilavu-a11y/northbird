"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { PRIMARY_CTA, getWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/site-config";
import NorthbirdMascot from "@/components/mascot/NorthbirdMascot";
import CatalogueMegaMenu from "@/components/CatalogueMegaMenu";
import MobileNavPanel from "@/components/MobileNavPanel";

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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <motion.path
        d="M4 6h16"
        animate={open ? { d: "M6 6l12 12" } : { d: "M4 6h16" }}
        transition={{ duration: 0.25 }}
      />
      <motion.path d="M4 12h16" animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.15 }} />
      <motion.path
        d="M4 18h16"
        animate={open ? { d: "M6 18L18 6" } : { d: "M4 18h16" }}
        transition={{ duration: 0.25 }}
      />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const mounted = useMounted();
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Click-to-toggle is the reliable mechanism (hover alone doesn't work on touch and can
  // close the menu the instant a finger lifts). Close on an outside click instead of on
  // mouseleave, so the menu doesn't vanish the moment the cursor crosses into it.
  useEffect(() => {
    if (!megaOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [megaOpen]);

  // Transparent-on-dark-hero only applies on the homepage before scrolling.
  const onHomeHero = mounted && pathname === "/" && !scrolled;
  const textColor = onHomeHero && !menuOpen ? "var(--cream)" : "var(--teal-dark)";
  const activeColor = onHomeHero && !menuOpen ? "var(--gold)" : "var(--rust)";

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40"
      animate={{
        backgroundColor: onHomeHero && !menuOpen ? "rgba(31,42,46,0)" : "rgba(251,247,238,0.92)",
        borderBottomColor: onHomeHero && !menuOpen ? "rgba(251,247,238,0)" : "var(--teal-light)",
        boxShadow: !(onHomeHero && !menuOpen) && scrolled ? "0 1px 0 0 rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.12)" : "0 0 0 0 rgba(0,0,0,0)",
        backdropFilter: onHomeHero && !menuOpen ? "blur(0px)" : "blur(10px)",
      }}
      style={{ WebkitBackdropFilter: onHomeHero && !menuOpen ? "blur(0px)" : "blur(10px)", borderBottomWidth: 1, borderBottomStyle: "solid" }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4"
        animate={{ paddingTop: scrolled ? 10 : 20, paddingBottom: scrolled ? 10 : 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
      >
        <motion.div animate={{ scale: scrolled ? 0.92 : 1 }} transition={{ duration: 0.35, ease: "easeOut" }}>
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Northbird & Co home" onClick={() => setMenuOpen(false)}>
            <NorthbirdMascot size={30} />
            <span className="font-display font-semibold text-lg tracking-tight" style={{ color: textColor }}>
              Northbird & Co
            </span>
          </Link>
        </motion.div>

        <ul className="hidden sm:flex gap-6 text-sm font-medium">
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));
            const isCatalogue = href === "/catalogue/";
            return (
              <li key={href} className="relative">
                {isCatalogue ? (
                  <button
                    type="button"
                    className="transition-colors pb-1 block"
                    style={{ color: active || megaOpen ? activeColor : textColor }}
                    onClick={() => setMegaOpen((v) => !v)}
                    aria-expanded={megaOpen}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    href={href}
                    className="transition-colors pb-1 block"
                    style={{ color: active ? activeColor : textColor }}
                  >
                    {label}
                  </Link>
                )}
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

        <button
          type="button"
          className="sm:hidden shrink-0 w-9 h-9 flex items-center justify-center"
          style={{ color: textColor }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </motion.div>

      <CatalogueMegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />

      <MobileNavPanel open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </motion.nav>
  );
}
