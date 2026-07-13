import Link from "next/link";
import { CATEGORIES, categoryStartingPrice, categoryCoverImage, publishedProducts } from "@/lib/catalogue-data";
import { assetPath } from "@/lib/site-config";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogue — Northbird & Co",
  description: `Browse all ${CATEGORIES.length} branded merchandise categories — real Kenyan pricing, WhatsApp ordering.`,
};

export default function CataloguePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <Reveal variant="up">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
            The full range
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3" style={{ color: "var(--teal-dark)" }}>
            Catalogue
          </h1>
          <p className="text-sm mb-10 max-w-xl" style={{ color: "#666" }}>
            {CATEGORIES.length} categories — click any to see products, colours and pricing. Every order starts and ends
            on WhatsApp.
          </p>
        </div>
      </Reveal>

      <StaggerGroup
        className="grid gap-4 pb-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]"
        stagger={0.04}
      >
        {CATEGORIES.map((cat) => {
          const cover = categoryCoverImage(cat);
          const publishedCount = publishedProducts(cat).length;
          return (
            <StaggerItem key={cat.id} variant="up">
              <Link
                href={`/catalogue/${cat.slug}/`}
                className="group block rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
                style={{ borderColor: "var(--teal-light)", background: "white" }}
              >
                {cover ? (
                  <div className="h-36 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assetPath(cover)}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    {cat.bestValue && (
                      <span
                        className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "var(--gold)", color: "var(--charcoal)" }}
                      >
                        Best value
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="pt-6 px-6 flex items-start justify-between gap-2">
                    <span className="text-4xl inline-block transition-transform duration-300 group-hover:scale-110">
                      {cat.emoji}
                    </span>
                    {cat.bestValue && (
                      <span
                        className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "var(--gold)", color: "var(--charcoal)" }}
                      >
                        Best value
                      </span>
                    )}
                  </div>
                )}
                <div className="p-6 pt-4 flex-1 flex flex-col gap-3">
                  <div>
                    <h2
                      className="font-semibold text-sm leading-snug transition-colors duration-200 group-hover:[color:var(--rust)]"
                      style={{ color: "var(--teal-dark)" }}
                    >
                      {cat.name}
                    </h2>
                    <p className="text-xs mt-1" style={{ color: "#888" }}>
                      {cat.itemized && publishedCount > 0
                        ? `${publishedCount} product${publishedCount === 1 ? "" : "s"}`
                        : "Ask us on WhatsApp"}
                    </p>
                    <p className="text-xs mt-1.5 font-semibold" style={{ color: "var(--rust)" }}>
                      {categoryStartingPrice(cat)}
                    </p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </div>
  );
}
