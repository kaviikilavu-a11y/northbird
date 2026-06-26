import Link from "next/link";
import { CATEGORIES } from "@/lib/catalogue-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogue — Northbird & Co",
  description: "Browse all 15 branded merchandise categories.",
};

export default function CataloguePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-2" style={{ color: "var(--teal-dark)" }}>
        Catalogue
      </h1>
      <p className="text-sm mb-10" style={{ color: "#666" }}>
        {CATEGORIES.length} categories — click any to see products and pricing.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalogue/${cat.slug}`}
            className="group rounded-2xl border p-6 flex flex-col gap-3 transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{ borderColor: "var(--teal-light)", background: "white" }}
          >
            <span className="text-4xl">{cat.emoji}</span>
            <div>
              <h2 className="font-semibold text-sm leading-snug" style={{ color: "var(--teal-dark)" }}>
                {cat.name}
              </h2>
              <p className="text-xs mt-1" style={{ color: "#888" }}>
                {cat.products.length} products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
