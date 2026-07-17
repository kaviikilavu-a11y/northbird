import type { Metadata } from "next";
import { BRAND, assetPath } from "@/lib/site-config";
import { Reveal } from "@/components/motion/Reveal";
import PinnedProcessStrip, { type ProcessStep } from "@/components/motion/PinnedProcessStrip";
import MaterialsRow from "@/components/MaterialsRow";

export const metadata: Metadata = {
  title: "About — Northbird & Co",
  description: "Who we are and what we stand for.",
};

const PROCESS_STEPS: ProcessStep[] = [
  { n: "01", title: "Browse", body: "Browse the catalogue and pick the products you need." },
  { n: "02", title: "Send your logo", body: "Send your logo, PDF, or brand guidelines on WhatsApp." },
  {
    n: "03",
    title: "Same-day quote",
    body: "Receive your quotation the very same day, complete with pricing, branding recommendations, and estimated production timelines.",
  },
  { n: "04", title: "Approve & pay", body: "Review and approve your branded artwork, and confirm payment (100% upfront) to begin production." },
  { n: "05", title: "Delivery", body: "Production under strict quality control, then safe, on-schedule delivery." },
];

// "One Bird, Every Day" — the product moving through an ordinary week. Real photography,
// not client casework: no client names, no implied partnerships or deliveries.
const WEEK: { image: string; caption: string; align: "left" | "right" }[] = [
  { image: "/lifestyle/lifestyle-01-monday-steps.jpg", caption: "Monday. Coffee, then the day starts.", align: "left" },
  { image: "/lifestyle/lifestyle-02-client-meeting.jpg", caption: "Tuesday. Client meeting — still the same bag.", align: "right" },
  { image: "/lifestyle/lifestyle-04-weekend-market.jpg", caption: "Saturday. The market run.", align: "left" },
  { image: "/lifestyle/lifestyle-05-after-hours.jpg", caption: "Saturday night. Off duty, still yours.", align: "right" },
];

/** A phrase begins, a photo interlude plays, the phrase completes — one scroll beat. */
function SplitHeadlineReveal({ before, image, after }: { before: string; image: string; after: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-center px-4">
      <Reveal variant="up">
        <span className="font-display font-medium" style={{ color: "var(--teal-dark)", fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)" }}>
          {before}
        </span>
      </Reveal>
      <Reveal variant="scale" delay={0.15}>
        <span className="inline-block w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden align-middle" style={{ boxShadow: "0 10px 30px -12px rgba(31,42,46,0.3)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assetPath(image)} alt="" className="w-full h-full object-cover" loading="lazy" />
        </span>
      </Reveal>
      <Reveal variant="up" delay={0.3}>
        <span className="font-display font-medium" style={{ color: "var(--teal-dark)", fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)" }}>
          {after}
        </span>
      </Reveal>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-8">
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
          <p className="leading-relaxed">
            This is a deliberate differentiator, not a placeholder waiting to be replaced with e-commerce later. No
            account to create, no cart to abandon — a real conversation with a real person, the way Kenyan businesses
            already buy.
          </p>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <SplitHeadlineReveal before="From your logo" image="/lifestyle/lifestyle-06-seated-alt.jpg" after="to their desk." />
      </section>

      {/* "One Bird, Every Day" — real product-in-life photography, not client casework */}
      <section className="py-16 md:py-24 px-4" style={{ background: "var(--cream-deep)" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal variant="up">
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
                One Bird, Every Day
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-medium" style={{ color: "var(--teal-dark)" }}>
                The same tote, the same cap — through an ordinary week.
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-col gap-16 md:gap-20">
            {WEEK.map((beat, i) => (
              <Reveal key={beat.image} variant={beat.align === "left" ? "left" : "right"} delay={i === 0 ? 0 : 0.05}>
                <div
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                    beat.align === "right" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full md:w-3/5 rounded-2xl overflow-hidden aspect-[4/5] md:aspect-[3/4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assetPath(beat.image)}
                      alt={beat.caption}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full md:w-2/5">
                    <p className="font-display text-xl md:text-2xl font-medium leading-snug" style={{ color: "var(--teal-dark)" }}>
                      {beat.caption}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <MaterialsRow />
      </section>

      <section className="py-16 md:py-24 px-4 max-w-5xl mx-auto" data-mascot-station="about-process">
        <Reveal variant="up">
          <div className="max-w-xl mb-4">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
              How We Work
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-medium" style={{ color: "var(--teal-dark)" }}>
              Our process
            </h2>
          </div>
        </Reveal>
        <PinnedProcessStrip steps={PROCESS_STEPS} />
      </section>
    </div>
  );
}
