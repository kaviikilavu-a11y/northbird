const STEPS = [
  {
    n: "01",
    title: "Browse the catalogue",
    body: "Pick the products you need — real pricing, no login required.",
  },
  {
    n: "02",
    title: "Send your logo",
    body: "Upload your logo, PDF, or brand guidelines straight into the WhatsApp chat.",
  },
  {
    n: "03",
    title: "Get your quote, same day",
    body: "We come back with pricing and, where possible, a sample — the same day.",
  },
];

export default function OrderingProcess() {
  return (
    <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
        WhatsApp Ordering Journey
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-medium mb-2" style={{ color: "var(--teal-dark)" }}>
        No cart. No account. Just WhatsApp.
      </h2>
      <p className="text-sm max-w-xl mb-12" style={{ color: "#666" }}>
        A deliberate choice, not a placeholder waiting for checkout — the way Kenyan businesses already buy.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {STEPS.map((s) => (
          <div key={s.n} className="relative">
            <span
              className="font-display text-4xl font-medium block mb-3"
              style={{ color: "var(--teal-light)" }}
              aria-hidden="true"
            >
              {s.n}
            </span>
            <h3 className="font-semibold text-base mb-2" style={{ color: "var(--teal-dark)" }}>
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
