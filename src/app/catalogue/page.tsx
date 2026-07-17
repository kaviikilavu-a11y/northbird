import Link from "next/link";
import { CATEGORIES, categoryStartingPrice, categoryCoverImage, publishedProducts } from "@/lib/catalogue-data";
import { assetPath } from "@/lib/site-config";
import { occasionTag } from "@/lib/occasion-tags";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import OccasionBundleStarters from "@/components/OccasionBundleStarters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogue — Northbird & Co",
  description: `Browse all ${CATEGORIES.length} branded merchandise categories — real Kenyan pricing, WhatsApp ordering.`,
};

export default function CataloguePage() {
  return (
    <>
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
            {CATEGORIES.length} categories — click any to see products, colours and pricing. All prices are inclusive
            of branding. Every order starts and ends on WhatsApp.
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
          const occasion = occasionTag(cat.slug);
          return (
            <StaggerItem key={cat.id} variant="up">
              <Link href={`/catalogue/${cat.slug}/`} className="group block">
                {cover ? (
                  <div
                    className="h-36 overflow-hidden rounded-2xl transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-14px_rgba(31,42,46,0.32)]"
                    style={{ boxShadow: "0 10px 30px -12px rgba(31,42,46,0.22)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assetPath(cover)}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="h-36 rounded-2xl flex items-center px-6" style={{ background: "var(--cream-deep)" }}>
                    <span className="text-4xl inline-block transition-transform duration-300 group-hover:scale-110">
                      {cat.emoji}
                    </span>
                  </div>
                )}
                <div className="pt-3 flex flex-col gap-1">
                  {occasion && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--teal-light)" }}>
                      {occasion}
                    </span>
                  )}
                  <h2
                    className="font-semibold text-sm leading-snug transition-colors duration-200 group-hover:[color:var(--rust)]"
                    style={{ color: "var(--teal-dark)" }}
                  >
                    {cat.name}
                    {cat.bestValue && (
                      <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wide align-middle" style={{ color: "var(--rust)" }}>
                        Best value
                      </span>
                    )}
                  </h2>
                  <p className="text-xs" style={{ color: "#888" }}>
                    {cat.itemized && publishedCount > 0
                      ? `${publishedCount} product${publishedCount === 1 ? "" : "s"}`
                      : "Ask us on WhatsApp"}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: "var(--rust)" }}>
                    {categoryStartingPrice(cat)}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </div>

    <OccasionBundleStarters />
    </>
  );
}
