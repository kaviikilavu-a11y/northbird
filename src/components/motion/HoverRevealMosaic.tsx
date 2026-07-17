"use client";

import { useState } from "react";
import { assetPath } from "@/lib/site-config";

/**
 * A tile that shows `image` by default and crossfades to `revealImage` on hover/focus,
 * with a slight scale-in. Only pass `revealImage` when a real second photo exists for
 * this tile — there's no fallback/placeholder behavior here on purpose, so a tile never
 * silently "reveals" a fake or mismatched image.
 */
export default function HoverRevealMosaic({
  image,
  revealImage,
  alt,
  className = "",
}: {
  image: string;
  revealImage?: string;
  alt: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath(image)}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
        style={{
          opacity: active && revealImage ? 0 : 1,
          transform: active && revealImage ? "scale(1.04)" : "scale(1)",
        }}
      />
      {revealImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={assetPath(revealImage)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "scale(1)" : "scale(1.04)",
          }}
        />
      )}
    </div>
  );
}
