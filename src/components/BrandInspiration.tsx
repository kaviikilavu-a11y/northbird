import { BRAND } from "@/lib/site-config";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

const PALETTE = [
  { name: "Teal", hex: "#7FA8AD" },
  { name: "Gold", hex: "#E8AE3F" },
  { name: "Orange", hex: "#D97B2B" },
  { name: "Rust", hex: "#A8472A" },
];

export default function BrandInspiration() {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: "var(--charcoal)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <Reveal variant="blur">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
            Brand Inspiration
          </p>
          <p
            className="font-display italic text-3xl md:text-5xl leading-snug mb-6"
            style={{ color: "var(--cream)" }}
          >
            &ldquo;{BRAND.slogan}&rdquo;
          </p>
          <p className="text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10" style={{ color: "rgba(251,247,238,0.7)" }}>
            Every colour in the Northbird system traces back to the mascot itself — teal head, golden cheeks, an
            orange breast, and a layered rust-and-tan wing. No separate &ldquo;brand blue.&rdquo; The bird and the
            brand stay visually inseparable.
          </p>
        </Reveal>
        <StaggerGroup className="flex items-center justify-center gap-4 flex-wrap" stagger={0.08}>
          {PALETTE.map((c) => (
            <StaggerItem key={c.name} variant="scale" className="flex flex-col items-center gap-2">
              <span
                className="w-10 h-10 rounded-full border-2 transition-transform hover:scale-110"
                style={{ background: c.hex, borderColor: "rgba(251,247,238,0.2)" }}
                aria-hidden="true"
              />
              <span className="text-[11px] tracking-wide uppercase" style={{ color: "rgba(251,247,238,0.5)" }}>
                {c.name}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
