import Link from "next/link";
import { CATEGORIES, categoryStartingPrice } from "@/lib/catalogue-data";

// The real, itemized collections — the heart of the catalogue.
const FEATURED_SLUGS = ["notebooks", "flasks", "mugs-tumblers", "water-bottles", "signage-display", "keyholders"];
const FEATURED = FEATURED_SLUGS.map((slug) => CATEGORIES.find((c) => c.slug === slug)!).filter(Boolean);

export default function CuratedCollections() {
  return (
    <section className="py-16 md:py-20" style={{ background: "var(--cream-deep)" }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
              Curated Collections
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold" style={{ color: "var(--teal-dark)" }}>
              Real products, real Kenyan pricing.
            </h2>
          </div>
          <Link
            href="/catalogue/"
            className="hidden sm:inline-block text-sm font-semibold whitespace-nowrap"
            style={{ color: "var(--rust)" }}
          >
            View full catalogue →
          </Link>
        </div>
      </div>

      {/* Horizontal, user-scrollable product carousel — deliberately separate from the auto-scrolling
          trust marquee above. Trailing spacer + scroll-padding ensures the last card is fully reachable. */}
      <div
        className="flex gap-5 overflow-x-auto scrollbar-hide px-4 md:px-[max(1rem,calc((100vw-72rem)/2+1rem))]"
        style={{ scrollSnapType: "x mandatory", scrollPaddingLeft: "1rem" }}
      >
        {FEATURED.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalogue/${cat.slug}/`}
            className="group shrink-0 w-[260px] rounded-2xl border p-6 flex flex-col gap-3 transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{ borderColor: "var(--teal-light)", background: "white", scrollSnapAlign: "start" }}
          >
            <span className="text-4xl">{cat.emoji}</span>
            <div>
              <h3 className="font-semibold text-sm leading-snug" style={{ color: "var(--teal-dark)" }}>
                {cat.name}
              </h3>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: "#888" }}>
                {cat.description}
              </p>
            </div>
            <div className="mt-auto pt-2 flex items-center justify-between">
              <span className="text-xs" style={{ color: "#999" }}>{cat.products.length} products</span>
              <span className="text-sm font-bold" style={{ color: "var(--rust)" }}>{categoryStartingPrice(cat)}</span>
            </div>
          </Link>
        ))}
        {/* Trailing spacer so the last card can be scrolled fully into view on every viewport width */}
        <div className="shrink-0 w-1" aria-hidden="true" />
      </div>

      <div className="text-center mt-8 sm:hidden">
        <Link
          href="/catalogue/"
          className="inline-block px-6 py-3 rounded-full font-semibold text-sm"
          style={{ background: "var(--teal-dark)", color: "var(--cream)" }}
        >
          View full catalogue →
        </Link>
      </div>
    </section>
  );
}
