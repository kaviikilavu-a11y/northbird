"use client";

import { useState } from "react";
import { formatKES, type ProductVariant } from "@/lib/catalogue-data";
import { getWhatsAppLink, assetPath } from "@/lib/site-config";
import { useBundle } from "@/lib/bundle-context";
import QuantityStepper from "@/components/bundle/QuantityStepper";

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

export default function ProductCard({
  product,
  categorySlug,
  categoryName,
  categoryEmoji,
}: {
  product: ProductVariant;
  categorySlug: string;
  categoryName: string;
  categoryEmoji: string;
}) {
  const [qty, setQty] = useState(1);
  const { addItem } = useBundle();
  const waMessage = `Hi! I'd like to order the ${product.name}.`;
  const waLink = getWhatsAppLink(waMessage);

  const handleAddToBundle = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        categorySlug,
        categoryName,
        imageUrl: product.imageUrl,
        emoji: categoryEmoji,
      },
      qty
    );
    setQty(1);
  };

  return (
    <article
      className="group rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
      style={{ borderColor: "var(--teal-light)", background: "white" }}
    >
      {product.imageUrl ? (
        <div className="aspect-square overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath(product.imageUrl)}
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
            {categoryEmoji}
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

        <div className="flex items-center justify-between mt-2 gap-2">
          <span className="text-[11px] font-medium" style={{ color: "#888" }}>
            Qty
          </span>
          <QuantityStepper value={qty} onChange={setQty} size="sm" />
        </div>

        <button
          type="button"
          onClick={handleAddToBundle}
          className="btn-press flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 hover:shadow-[0_4px_16px_-4px_rgba(79,124,129,0.5)] hover:-translate-y-0.5"
          style={{ background: "var(--teal-dark)", color: "var(--cream)" }}
        >
          Add to Bundle
        </button>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-press flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 hover:shadow-[0_4px_16px_-4px_rgba(37,211,102,0.55)] hover:-translate-y-0.5"
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
}
