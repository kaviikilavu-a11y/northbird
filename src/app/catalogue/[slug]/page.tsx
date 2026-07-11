import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, getCategoryBySlug, formatKES } from "@/lib/catalogue-data";
import { getWhatsAppLink } from "@/lib/site-config";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — Northbird & Co`,
    description: cat.description,
  };
}

const COLOR_SWATCH: Record<string, string> = {
  black: "#1a1a1a", white: "#f5f5f5", red: "#c0392b", blue: "#2c5f8a", silver: "#c9cdd1",
  gold: "#d4af37", pink: "#e39fb3", yellow: "#e8c547", mint: "#a8d5c0", grey: "#9aa0a3",
  gray: "#9aa0a3", green: "#4a7a5c", orange: "#d97b2b", brown: "#6b4a34", beige: "#d9c9a8",
  "light green": "#a8c98a",
};

function swatchColor(name: string): string {
  const key = name.toLowerCase().split("/")[0].trim();
  return COLOR_SWATCH[key] ?? "#b8b8b8";
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs mb-6 flex gap-1" style={{ color: "#888" }}>
        <Link href="/catalogue/" className="hover:underline" style={{ color: "var(--teal-dark)" }}>
          Catalogue
        </Link>
        <span>/</span>
        <span>{cat.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-4 mb-3">
        <span className="text-5xl">{cat.emoji}</span>
        <div>
          <h1 className="font-display text-3xl font-semibold" style={{ color: "var(--teal-dark)" }}>
            {cat.name}
          </h1>
          <p className="text-sm mt-1" style={{ color: "#666" }}>
            {cat.description}
          </p>
        </div>
      </div>

      {cat.itemized ? (
        <>
          <p className="text-xs mb-10" style={{ color: "#aaa" }}>
            All prices in KES. Minimum order quantities and bulk pricing available — ask us on WhatsApp.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {cat.products.map((product) => {
              const waMessage = `Hi! I'd like to order the ${product.name}.`;
              const waLink = getWhatsAppLink(waMessage);

              return (
                <article
                  key={product.id}
                  className="group rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
                  style={{ borderColor: "var(--teal-light)", background: "white" }}
                >
                  {product.imageUrl ? (
                    <div className="aspect-square overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-square flex items-center justify-center text-5xl overflow-hidden"
                      style={{ background: "var(--cream-deep)" }}
                      aria-hidden="true"
                    >
                      <span className="inline-block transition-transform duration-500 ease-out group-hover:scale-110">
                        {cat.emoji}
                      </span>
                    </div>
                  )}

                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <h2
                        className="font-semibold text-sm leading-snug flex-1 transition-colors duration-200 group-hover:[color:var(--rust)]"
                        style={{ color: "var(--teal-dark)" }}
                      >
                        {product.name}
                      </h2>
                      {product.bestValue && (
                        <span
                          className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: "var(--gold)", color: "var(--charcoal)" }}
                        >
                          Best value
                        </span>
                      )}
                    </div>

                    {product.description && (
                      <p className="text-xs leading-relaxed flex-1" style={{ color: "#666" }}>
                        {product.description}
                      </p>
                    )}

                    {product.colors && product.colors.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap mt-1" aria-label={`Colours: ${product.colors.join(", ")}`}>
                        {product.colors.map((c) => (
                          <span
                            key={c}
                            title={c}
                            className="w-3.5 h-3.5 rounded-full border transition-transform duration-200 hover:scale-125"
                            style={{ background: swatchColor(c), borderColor: "rgba(0,0,0,0.12)" }}
                          />
                        ))}
                      </div>
                    )}

                    <p className="font-bold text-base mt-1" style={{ color: "var(--rust)" }}>
                      {product.customQuote || product.price === undefined ? "Request a Quote" : formatKES(product.price)}
                    </p>

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press mt-2 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 hover:shadow-[0_4px_16px_-4px_rgba(37,211,102,0.55)] hover:-translate-y-0.5"
                      style={{ background: "#25D366", color: "white" }}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Order via WhatsApp
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      ) : (
        <div
          className="rounded-3xl border p-10 md:p-14 text-center max-w-2xl mx-auto"
          style={{ borderColor: "var(--teal-light)", background: "white" }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
            Full range available on request
          </p>
          <p className="font-bold text-2xl mb-3" style={{ color: "var(--rust)" }}>
            {cat.startingPriceLabel}
          </p>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "#666" }}>
            We haven&apos;t photographed and itemised every {cat.name.toLowerCase()} option yet — but the range is real
            and priced. Send us your quantity and logo on WhatsApp and we&apos;ll come back with options the same day.
          </p>
          <a
            href={getWhatsAppLink(`Hi! I'd like pricing on ${cat.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm hover:shadow-[0_4px_16px_-4px_rgba(37,211,102,0.55)] hover:-translate-y-0.5 transition-all"
            style={{ background: "#25D366", color: "white" }}
          >
            Ask about {cat.name} on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
