import type { Metadata } from "next";
import { BRAND, getWhatsAppLink } from "@/lib/site-config";
import WhatsAppSection from "@/components/WhatsAppSection";

export const metadata: Metadata = {
  title: "Contact — Northbird & Co",
  description: "Get in touch to start your order.",
};

export default function ContactPage() {
  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-extrabold mb-4" style={{ color: "var(--teal-dark)" }}>
          Get in touch
        </h1>
        <p className="text-sm mb-10" style={{ color: "#666" }}>
          The fastest way to reach us is WhatsApp — we typically respond within a few hours during business hours.
        </p>

        <div className="space-y-4">
          <div
            className="rounded-2xl border p-6 flex items-center gap-4"
            style={{ borderColor: "var(--teal-light)", background: "white" }}
          >
            <span className="text-2xl">💬</span>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: "var(--teal-dark)" }}>WhatsApp (preferred)</p>
              <p className="text-xs mt-0.5" style={{ color: "#888" }}>{BRAND.whatsapp}</p>
            </div>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background: "#25D366", color: "white" }}
            >
              Chat now
            </a>
          </div>

          <div
            className="rounded-2xl border p-6 flex items-center gap-4"
            style={{ borderColor: "var(--teal-light)", background: "white" }}
          >
            <span className="text-2xl">✉️</span>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: "var(--teal-dark)" }}>Email</p>
              <p className="text-xs mt-0.5" style={{ color: "#888" }}>{BRAND.email}</p>
            </div>
            <a
              href={`mailto:${BRAND.email}`}
              className="px-4 py-2 rounded-full text-xs font-semibold border"
              style={{ borderColor: "var(--teal-dark)", color: "var(--teal-dark)" }}
            >
              Email us
            </a>
          </div>
        </div>
      </div>

      <WhatsAppSection
        heading="Start your order today"
        sub="Tell us what you need — product type, quantity, and deadline. We&apos;ll take it from there."
      />
    </>
  );
}
