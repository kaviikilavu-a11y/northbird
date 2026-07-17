import type { Metadata } from "next";
import { getWhatsAppLink } from "@/lib/site-config";
import CountUp from "@/components/motion/CountUp";
import PolicySideNav from "@/components/PolicySideNav";

export const metadata: Metadata = {
  title: "Policies — Northbird & Co",
  description: "Delivery, payment, and order change policies for Northbird & Co.",
};

const POLICY_WHATSAPP_MESSAGE = "Hi! I have a question about an order.";

const NAV_ITEMS = [
  { id: "delivery", label: "Delivery" },
  { id: "payment", label: "Payment" },
  { id: "changes", label: "Changes & Cancellations" },
  { id: "how-it-works", label: "How Ordering Works" },
];

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PolicySection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-12 scroll-mt-28">
      <h2 className="font-display text-2xl font-medium mb-4" style={{ color: "var(--teal-dark)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function StatCallout({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="text-center px-2">
      <p className="font-display text-2xl md:text-3xl font-semibold" style={{ color: "var(--rust)" }}>
        {children}
      </p>
      <p className="text-[11px] mt-1 tracking-wide uppercase" style={{ color: "#999" }}>
        {label}
      </p>
    </div>
  );
}

export default function PoliciesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
        Policies
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-8" style={{ color: "var(--teal-dark)" }}>
        Ordering, Delivery & Payment
      </h1>

      {/* Key numbers up front — only the county count animates; the rest stay static, bold
          typography, since animating every number on a trust/legal page undermines the
          credibility it's meant to build. */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl border p-6 md:p-8 mb-14"
        style={{ borderColor: "var(--cream-deep)", background: "white" }}
      >
        <StatCallout label="Counties delivered">
          <CountUp to={47} />
        </StatCallout>
        <StatCallout label="Payment upfront">100%</StatCallout>
        <StatCallout label="VAT included">16%</StatCallout>
        <StatCallout label="Working days">2–10</StatCallout>
      </div>

      <div className="flex gap-12">
        <PolicySideNav items={NAV_ITEMS} />

        <div className="flex-1 min-w-0">
          <PolicySection id="delivery" title="Delivery">
            <ul className="space-y-3 leading-relaxed list-disc pl-5" style={{ color: "#444" }}>
              <li>We deliver across all <strong>47 counties</strong> in Kenya.</li>
              <li>Orders above <strong>KES 10,000</strong> qualify for <strong>free delivery</strong>, anywhere in the 47 counties.</li>
              <li>Orders below KES 10,000 — delivery within Nairobi is free; delivery outside Nairobi is charged at courier cost, confirmed with you before dispatch.</li>
              <li>Standard production and delivery timeline is <strong>2–10 working days</strong> from order confirmation and payment, depending on the scope of the order. Large-format items (banners, gazebos, apparel runs) may take longer — we&apos;ll confirm an exact date when you order.</li>
              <li>Rush orders may be possible for an additional fee — ask on WhatsApp before ordering.</li>
            </ul>
          </PolicySection>

          <PolicySection id="payment" title="Payment">
            <ul className="space-y-3 leading-relaxed list-disc pl-5" style={{ color: "#444" }}>
              <li><strong>Full payment (100%)</strong> is required to confirm and begin production on any order.</li>
              <li>Once payment is confirmed, production begins immediately — no second payment to track.</li>
              <li>Prices shown include <strong>16% VAT</strong>.</li>
              <li>Payment is accepted via bank transfer or M-Pesa — details shared directly on WhatsApp once your order is confirmed.</li>
              <li>All prices are in Kenyan Shillings (KES) and subject to confirmation at time of order — bulk and custom orders may be quoted individually.</li>
            </ul>
          </PolicySection>

          <PolicySection id="changes" title="Changes & Cancellations">
            <ul className="space-y-3 leading-relaxed list-disc pl-5" style={{ color: "#444" }}>
              <li>Orders can be changed or cancelled free of charge <strong>before production begins</strong> (i.e. before payment is confirmed and work starts).</li>
              <li><strong>Once production has started, orders cannot be cancelled or refunded</strong> — branded/personalised items can&apos;t be resold to another customer.</li>
              <li>If we make an error on our side (wrong logo, wrong colour, defective item), we will reprint or replace it at no extra cost.</li>
              <li>Please review your logo files, text, and colours carefully before confirming — we&apos;ll always send a proof for approval before printing.</li>
            </ul>
          </PolicySection>

          <PolicySection id="how-it-works" title="How Ordering Works">
            <ol className="space-y-3 leading-relaxed list-decimal pl-5" style={{ color: "#444" }}>
              <li>Browse the catalogue and message us on WhatsApp for the product(s) you want.</li>
              <li>Send your logo, brand colours, or design file.</li>
              <li>We confirm pricing, quantity, and timeline — usually the same day.</li>
              <li>You approve a design proof and pay in full to begin production.</li>
              <li>We deliver (or you collect) once the balance is settled.</li>
            </ol>
          </PolicySection>

          <div className="rounded-2xl p-8" style={{ background: "var(--charcoal)" }} data-mascot-station="policies-whatsapp">
            <p className="font-display text-xl mb-2" style={{ color: "var(--cream)" }}>
              Questions about an order?
            </p>
            <p className="text-sm mb-5" style={{ color: "rgba(251,247,238,0.6)" }}>
              We&apos;re quickest to reach on WhatsApp — most questions get answered within minutes.
            </p>
            <a
              href={getWhatsAppLink(POLICY_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors"
              style={{ background: "#25D366", color: "#fff" }}
            >
              <WhatsAppIcon />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
