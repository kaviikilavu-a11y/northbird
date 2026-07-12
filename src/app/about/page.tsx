import type { Metadata } from "next";
import { BRAND } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About — Northbird & Co",
  description: "Who we are and what we stand for.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
        {BRAND.parent}
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6" style={{ color: "var(--teal-dark)" }}>
        About {BRAND.name}
      </h1>
      <div className="prose prose-sm max-w-none" style={{ color: "#444" }}>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--charcoal)" }}>
          Northbird & Co is the customer-facing brand for branded merchandise and corporate gifting in Kenya,
          operating under parent company Visiora Enterprises. We make the things companies actually hand out and
          people actually keep — mugs, flasks, notebooks, signage, and the everyday branded world — sourced and
          produced in Kenya.
        </p>
        <h2 className="font-display text-xl font-semibold mt-8 mb-3" style={{ color: "var(--teal-dark)" }}>Why we exist</h2>
        <p className="leading-relaxed mb-4">
          Branded merchandise shouldn&apos;t feel like filling out a tax form. Most ordering experiences in this
          category are slow, opaque on pricing, and impersonal. Northbird is built to be the opposite: pick what you
          need, send your logo on WhatsApp, get a price back the same day.
        </p>
        <h2 className="font-display text-xl font-semibold mt-8 mb-3" style={{ color: "var(--teal-dark)" }}>WhatsApp-first, not cart-and-checkout</h2>
        <p className="leading-relaxed mb-4">
          This is a deliberate differentiator, not a placeholder waiting to be replaced with e-commerce later. No
          account to create, no cart to abandon — a real conversation with a real person, the way Kenyan businesses
          already buy.
        </p>
        <h2 className="font-display text-xl font-semibold mt-8 mb-3" style={{ color: "var(--teal-dark)" }}>Our process</h2>
        <ol className="list-decimal list-inside space-y-2 leading-relaxed">
          <li>Browse the catalogue and pick the products you need.</li>
          <li>Send your logo, PDF, or brand guidelines on WhatsApp.</li>
          <li>Receive your quotation the very same day, complete with pricing, branding recommendations, and estimated production timelines.</li>
          <li>Review and approve your branded artwork before production begins.</li>
          <li>Production under strict quality control, then safe, on-schedule delivery.</li>
        </ol>
      </div>
    </div>
  );
}
