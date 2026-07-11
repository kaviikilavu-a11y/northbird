const REASONS = [
  {
    icon: "💬",
    title: "Warm, not corporate",
    body: "No inquiry forms or procurement portals. You message a real person on WhatsApp and get a real answer.",
  },
  {
    icon: "🏷️",
    title: "Direct pricing",
    body: "Real prices on the site, not \"contact us for pricing\" games. What you see is what you pay.",
  },
  {
    icon: "🇰🇪",
    title: "Sourced in Kenya",
    body: "Produced and finished locally, so lead times stay short and quality stays checkable.",
  },
  {
    icon: "✅",
    title: "Same-day quotes",
    body: "Send your logo and quantity, get a price back the same day — from first sample to final delivery.",
  },
];

export default function WhyNorthbird() {
  return (
    <section className="py-16 md:py-20 px-4 max-w-6xl mx-auto">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
        Why Northbird
      </p>
      <h2 className="font-display text-2xl md:text-3xl font-semibold mb-10 max-w-xl" style={{ color: "var(--teal-dark)" }}>
        Warm, direct, and confident — never boastful.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {REASONS.map((r) => (
          <div
            key={r.title}
            className="rounded-2xl border p-6"
            style={{ borderColor: "var(--teal-light)", background: "white" }}
          >
            <span className="text-3xl" aria-hidden="true">{r.icon}</span>
            <h3 className="font-semibold text-sm mt-4 mb-2" style={{ color: "var(--teal-dark)" }}>
              {r.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
              {r.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
