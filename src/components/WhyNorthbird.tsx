const REASONS = [
  {
    n: "01",
    title: "Warm, not corporate",
    body: "No inquiry forms or procurement portals. You message a real person on WhatsApp and get a real answer.",
  },
  {
    n: "02",
    title: "Direct pricing",
    body: "Real prices on the site, not “contact us for pricing” games. What you see is what you pay.",
  },
  {
    n: "03",
    title: "Sourced in Kenya",
    body: "Produced and finished locally, so lead times stay short and quality stays checkable.",
  },
  {
    n: "04",
    title: "Same-day quotes",
    body: "Send your logo and quantity, get a price back the same day — from first sample to final delivery.",
  },
];

export default function WhyNorthbird() {
  return (
    <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_2fr] gap-10 lg:gap-16">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
            Why Northbird
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight" style={{ color: "var(--teal-dark)" }}>
            Warm, direct, and confident — never boastful.
          </h2>
        </div>
        <div style={{ borderBottom: "1px solid var(--cream-deep)" }}>
          {REASONS.map((r) => (
            <div
              key={r.n}
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
          ))}
        </div>
      </div>
    </section>
  );
}
