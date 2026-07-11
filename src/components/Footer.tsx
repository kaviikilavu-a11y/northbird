import Link from "next/link";
import { BRAND } from "@/lib/site-config";

const LINKS = [
  { href: "/catalogue/", label: "Catalogue" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export default function Footer() {
  return (
    <footer
      data-mascot-station="footer"
      className="pt-16 pb-8 px-4 border-t"
      style={{ background: "var(--charcoal)", borderColor: "#333", color: "var(--teal-light)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10 pb-12">
          <div>
            <p className="font-display text-2xl font-medium" style={{ color: "var(--cream)" }}>
              {BRAND.name}
            </p>
            <p className="font-display italic text-base mt-2 opacity-70">{BRAND.slogan}</p>
            <p className="text-xs opacity-40 mt-3">{BRAND.parent} · {BRAND.location}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-widest uppercase opacity-50 mb-4">Site</p>
            <ul className="space-y-2.5 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:opacity-100 transition-opacity opacity-80">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-widest uppercase opacity-50 mb-4">Talk to us</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${BRAND.email}`} className="hover:opacity-100 transition-opacity opacity-80">
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity opacity-80"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 text-xs opacity-40"
          style={{ borderTop: "1px solid #333" }}
        >
          <p>© {new Date().getFullYear()} {BRAND.name}</p>
          <p>Designed and built for East African businesses.</p>
        </div>
      </div>
    </footer>
  );
}
