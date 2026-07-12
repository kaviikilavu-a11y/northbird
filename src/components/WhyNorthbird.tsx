import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import SectionLabel from "@/components/motion/SectionLabel";

const REASONS = [
  {
    n: "01",
    title: "Real Conversations",
    body: "Speak directly with our team, not a call centre.",
  },
  {
    n: "02",
    title: "Everything In-House",
    body: "Branding, production, and quality control managed by Northbird.",
  },
  {
    n: "03",
    title: "Clear Pricing",
    body: "Transparent pricing with tailored quotes when your project calls for it.",
  },
  {
    n: "04",
    title: "Built Around Deadlines",
    body: "Fast quotations. Reliable production. On-time delivery.",
  },
];

export default function WhyNorthbird() {
  return (
    <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_2fr] gap-10 lg:gap-16">
        <Reveal variant="right">
          <div>
            <SectionLabel n="02" color="var(--orange)" />
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
              Why Northbird
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight" style={{ color: "var(--teal-dark)" }}>
              Thoughtfully made. Easy to work with.
            </h2>
          </div>
        </Reveal>
        <StaggerGroup className="block" >
          <div style={{ borderBottom: "1px solid var(--cream-deep)" }}>
            {REASONS.map((r) => (
              <StaggerItem key={r.n} variant="left" className="block">
                <div
                  className="flex gap-6 md:gap-10 py-6"
                  style={{ borderTop: "1px solid var(--cream-deep)" }}
                >
                  <span className="font-display text-2xl shrink-0 w-10" style={{ color: "var(--teal-light)" }}>
                    {r.n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-base mb-1.5" style={{ color: "var(--teal-dark)" }}>
                      {r.title}
                    </h3>
                    <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#666" }}>
                      {r.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}
