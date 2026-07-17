import { Reveal } from "@/components/motion/Reveal";
import SectionLabel from "@/components/motion/SectionLabel";
import PinnedProcessStrip, { type ProcessStep } from "@/components/motion/PinnedProcessStrip";

const STEPS: ProcessStep[] = [
  {
    n: "01",
    title: "Choose Products",
    body: "Browse the catalogue and pick what you need — real pricing, no login required.",
  },
  {
    n: "02",
    title: "Branding Mockup",
    body: "Send your logo, PDF, or brand guidelines and we'll show you how it looks on the product.",
  },
  {
    n: "03",
    title: "Quotation",
    body: "Receive your quotation the very same day, complete with pricing, branding recommendations, and estimated production timelines.",
  },
  {
    n: "04",
    title: "Production",
    body: "Confirm payment (100% upfront) and approve your artwork — production then runs under strict quality control.",
  },
  {
    n: "05",
    title: "Delivery",
    body: "Safely packaged and delivered on schedule, wherever your business is based.",
  },
];

export default function OrderingProcess() {
  return (
    <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <Reveal variant="up">
        <div>
          <SectionLabel n="07" color="var(--orange)" />
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
            How Ordering Works
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-2" style={{ color: "var(--teal-dark)" }}>
            No cart. No account. Just WhatsApp.
          </h2>
          <p className="text-sm max-w-xl mb-14" style={{ color: "#666" }}>
            A deliberate choice, not a placeholder waiting for checkout — the way Kenyan businesses already buy.
          </p>
        </div>
      </Reveal>

      <PinnedProcessStrip steps={STEPS} />
    </section>
  );
}
