import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, getCategoryBySlug, publishedProducts, categoryStartingPrice, isBrandingIncluded } from "@/lib/catalogue-data";
import { getWhatsAppLink } from "@/lib/site-config";
import ProductCard from "./ProductCard";
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

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const products = publishedProducts(cat);

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

      {cat.itemized && products.length > 0 ? (
        <>
          <p className="text-xs mb-10" style={{ color: "#aaa" }}>
            All prices in KES{isBrandingIncluded(cat.slug) ? " and inclusive of branding" : ""}. Minimum order
            quantities and bulk pricing available — ask us on WhatsApp.
            {!isBrandingIncluded(cat.slug) && " Branding is quoted per order."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categorySlug={cat.slug}
                categoryName={cat.name}
                categoryEmoji={cat.emoji}
                siblingProducts={products}
              />
            ))}
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
          <p className="font-bold text-2xl mb-1" style={{ color: "var(--rust)" }}>
            {categoryStartingPrice(cat)}
          </p>
          <p className="text-xs mb-6" style={{ color: "#aaa" }}>
            {isBrandingIncluded(cat.slug) ? "Inclusive of branding" : "Branding quoted per order"}
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
