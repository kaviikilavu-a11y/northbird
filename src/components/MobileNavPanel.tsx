"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PRIMARY_CTA, getWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/site-config";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalogue/", label: "Catalogue" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

function Panel({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 sm:hidden z-40"
            style={{ background: "rgba(31,42,46,0.45)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="sm:hidden fixed top-0 right-0 bottom-0 z-50 w-[78%] max-w-xs flex flex-col pt-24 px-6 pb-8"
            style={{ background: "var(--cream)", boxShadow: "-12px 0 32px -8px rgba(0,0,0,0.25)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: reduceMotion ? "tween" : "spring", duration: reduceMotion ? 0 : undefined, stiffness: 340, damping: 34 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <ul className="flex flex-col gap-1">
              {links.map(({ href, label }, i) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));
                return (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.08 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      className="block py-3 text-lg font-display font-medium border-b"
                      style={{ color: active ? "var(--rust)" : "var(--teal-dark)", borderColor: "var(--cream-deep)" }}
                    >
                      {label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <motion.a
              href={getWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press mt-8 text-center px-4 py-3 rounded-full text-sm font-semibold"
              style={{ background: "var(--rust)", color: "var(--cream)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.3, duration: 0.3 }}
            >
              {PRIMARY_CTA}
            </motion.a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Portaled to document.body — the nav bar animates backdrop-filter, which (like transform)
// establishes a new containing block for position:fixed descendants and would otherwise
// trap this panel inside the nav's own short box instead of the full viewport.
export default function MobileNavPanel(props: { open: boolean; onClose: () => void; pathname: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return createPortal(<Panel {...props} />, document.body);
}
