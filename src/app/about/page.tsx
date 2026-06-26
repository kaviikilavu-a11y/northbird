import type { Metadata } from "next";
import { BRAND } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About — Northbird & Co",
  description: "Who we are and what we stand for.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold mb-6" style={{ color: "var(--teal-dark)" }}>
        About {BRAND.name}
      </h1>
      <div className="prose prose-sm max-w-none" style={{ color: "#444" }}>
        <p className="text-lg leading-relaxed mb-6" style={{ color: "#1a1a1a" }}>
          We&apos;re a branded merchandise studio built for East Africa. From Nairobi to Kampala, we help
          businesses put their name on things people actually want to keep — not just swag that ends up in a drawer.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "var(--teal-dark)" }}>What we do</h2>
        <p className="leading-relaxed mb-4">
          We source, brand, and deliver premium merchandise: notebooks, mugs, apparel, tech accessories, gift sets, and
          more. Every item in our catalogue can carry your logo, your colours, and your story.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "var(--teal-dark)" }}>Why Northbird</h2>
        <p className="leading-relaxed mb-4">
          Most merchandise either looks cheap or costs a fortune. We occupy the space between — carefully chosen
          materials, print that lasts, and pricing that works for African budgets. Whether you need 50 mugs for a
          team or 5,000 gilets for a national campaign, we handle it the same way: with care.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "var(--teal-dark)" }}>Our process</h2>
        <ol className="list-decimal list-inside space-y-2 leading-relaxed">
          <li>You tell us what you need — product type, quantity, deadline, budget.</li>
          <li>We send a quote and, where possible, a physical or digital sample.</li>
          <li>You approve the artwork and we go to production.</li>
          <li>We deliver, anywhere in East Africa.</li>
        </ol>
      </div>
    </div>
  );
}
