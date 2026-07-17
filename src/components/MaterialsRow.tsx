import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

const ROWS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M4 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      </svg>
    ),
    label: "Material",
    body: "Cotton, ceramic, aluminium, PU leather — the right base material for each product, not a one-size-fits-all spec.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 4v16" />
      </svg>
    ),
    label: "Branding method",
    body: "Screen print, embroidery, laser engraving, or UV print — matched to the product, shown on your proof before production.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 0 18" />
      </svg>
    ),
    label: "Finish",
    body: "Matte, gloss, or soft-touch — confirmed with you at the proof stage, before anything goes to print.",
  },
];

/** What actually goes into the merch, in plain terms — no invented specs per product. */
export default function MaterialsRow() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <Reveal variant="up">
        <p className="text-xs font-semibold tracking-widest uppercase mb-8 text-center" style={{ color: "var(--orange)" }}>
          What Goes Into Your Merch
        </p>
      </Reveal>
      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-8" stagger={0.08}>
        {ROWS.map((r) => (
          <StaggerItem key={r.label} variant="up">
            <div className="flex flex-col items-center text-center gap-3">
              <div style={{ color: "var(--rust)" }}>{r.icon}</div>
              <p className="text-sm font-semibold" style={{ color: "var(--teal-dark)" }}>
                {r.label}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
                {r.body}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
