import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import SectionLabel from "@/components/motion/SectionLabel";

const WORK = [
  {
    n: "01",
    client: "Mastercard Foundation",
    detail: "Co-branded gilets and notebooks for a large-run corporate delivery.",
    tag: "Outerwear · Notebooks",
  },
  {
    n: "02",
    client: "eSp",
    detail: "Branded water bottles supplied at volume, sourced and finished in Kenya.",
    tag: "Water Bottles",
  },
];

export default function SelectedWork() {
  return (
    <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <Reveal variant="up">
        <div>
          <SectionLabel n="06" color="var(--orange)" />
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
            Selected Work
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-12 max-w-xl" style={{ color: "var(--teal-dark)" }}>
            Large-run deliveries, handled with care.
          </h2>
        </div>
      </Reveal>
      <StaggerGroup className="block" style={{ borderTop: "1px solid var(--cream-deep)" }}>
        {WORK.map((w, i) => (
          <StaggerItem key={w.n} variant={i % 2 === 0 ? "left" : "right"} className="block">
            <div
              className="grid grid-cols-1 sm:grid-cols-[3rem_1fr_auto] gap-2 sm:gap-8 items-baseline py-8"
              style={{ borderBottom: "1px solid var(--cream-deep)" }}
            >
              <span className="font-display text-xl" style={{ color: "var(--teal-light)" }}>{w.n}</span>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-medium mb-1.5" style={{ color: "var(--teal-dark)" }}>
                  {w.client}
                </h3>
                <p className="text-sm leading-relaxed max-w-md" style={{ color: "#666" }}>
                  {w.detail}
                </p>
              </div>
              <span
                className="text-[11px] font-semibold tracking-widest uppercase justify-self-start sm:justify-self-end"
                style={{ color: "var(--rust)" }}
              >
                {w.tag}
              </span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
