import { BRAND } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer
      data-mascot-station="footer"
      className="py-10 px-4 border-t"
      style={{ background: "var(--charcoal)", borderColor: "#333", color: "var(--teal-light)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div>
          <span className="font-display font-semibold" style={{ color: "var(--cream)" }}>
            {BRAND.name}
          </span>
          <span className="font-display italic ml-2 opacity-70">— {BRAND.slogan}</span>
          <p className="text-xs opacity-40 mt-1">{BRAND.parent} · {BRAND.location}</p>
        </div>
        <div className="flex gap-6 opacity-70">
          <a href={`mailto:${BRAND.email}`} className="hover:opacity-100 transition-opacity">
            {BRAND.email}
          </a>
          <a
            href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
          >
            WhatsApp
          </a>
        </div>
        <p className="opacity-40">© {new Date().getFullYear()} {BRAND.name}</p>
      </div>
    </footer>
  );
}
