import Link from "next/link";
import { BRAND, PRIMARY_CTA, getWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/site-config";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import NorthbirdMascot from "@/components/mascot/NorthbirdMascot";

const LINKS = [
  { href: "/catalogue/", label: "Catalogue" },
  { href: "/about/", label: "About" },
  { href: "/policies/", label: "Policies" },
  { href: "/contact/", label: "Contact" },
];

export default function Footer() {
  return (
    <footer
      data-mascot-station="footer"
      className="relative"
      style={{ background: "var(--charcoal)", color: "var(--teal-light)" }}
    >
      {/* Soft seam so the cream page doesn't cut abruptly into the dark footer */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, var(--cream-deep), transparent)" }}
      />
      <Reveal variant="up">
        <div className="max-w-3xl mx-auto text-center px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="font-display text-4xl md:text-6xl font-medium leading-tight" style={{ color: "var(--cream)" }}>
            Ready to Build Your Brand?
          </p>
          <p className="text-base md:text-lg mt-5 mb-10 opacity-70">
            Let&apos;s create merchandise your customers will remember.
          </p>
          <Magnetic strength={0.25}>
            <a
              href={getWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-press inline-flex items-center gap-2 px-9 py-4 rounded-full font-semibold text-sm hover:shadow-[0_0_0_8px_rgba(168,71,42,0.22)] transition-all"
              style={{ background: "var(--rust)", color: "var(--cream)" }}
            >
              {PRIMARY_CTA}
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </Magnetic>
        </div>
      </Reveal>

      <div className="border-t" style={{ borderColor: "#333" }}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10 pb-10" stagger={0.08}>
            <StaggerItem variant="up">
              <div className="flex items-center gap-2.5">
                <NorthbirdMascot size={28} />
                <p className="font-display text-xl font-medium" style={{ color: "var(--cream)" }}>
                  {BRAND.name}
                </p>
              </div>
              <p className="font-display italic text-sm mt-2 opacity-70">{BRAND.slogan}</p>
              <p className="text-xs opacity-40 mt-3">{BRAND.parent} · {BRAND.location}</p>
            </StaggerItem>
            <StaggerItem variant="up">
              <p className="text-[11px] font-semibold tracking-widest uppercase opacity-50 mb-4">Site</p>
              <ul className="space-y-2.5 text-sm">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:opacity-100 hover:translate-x-0.5 transition-all inline-block opacity-80">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>
            <StaggerItem variant="up">
              <p className="text-[11px] font-semibold tracking-widest uppercase opacity-50 mb-4">Talk to us</p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href={`mailto:${BRAND.email}`} className="hover:opacity-100 hover:translate-x-0.5 transition-all inline-block opacity-80">
                    {BRAND.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100 hover:translate-x-0.5 transition-all inline-block opacity-80"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </StaggerItem>
          </StaggerGroup>
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 text-xs opacity-40"
            style={{ borderTop: "1px solid #333" }}
          >
            <p>© {new Date().getFullYear()} {BRAND.name}</p>
            <p>Designed and built for East African businesses.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
