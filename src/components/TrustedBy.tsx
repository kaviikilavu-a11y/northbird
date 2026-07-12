import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import SectionLabel from "@/components/motion/SectionLabel";
import CountUp from "@/components/motion/CountUp";
import { CATEGORIES } from "@/lib/catalogue-data";

// Derived from the live catalogue data, not hardcoded — stays accurate as products/categories change.
const PRODUCT_COUNT = CATEGORIES.reduce((sum, c) => sum + c.products.length, 0);
const CATEGORY_COUNT = CATEGORIES.length;
const STATS = [
  { value: PRODUCT_COUNT, suffix: "+", label: "Itemized products" },
  { value: CATEGORY_COUNT, suffix: "", label: "Product categories" },
  { value: 6, suffix: "", label: "Industries served" },
];

const TRUST_MARKS = [
  "Mastercard Foundation",
  "eSp",
  "NGOs",
  "Banks & Sacco's",
  "Universities",
  "Telecoms",
  "Government Agencies",
  "Corporates",
];

export default function TrustedBy() {
  const marks = [...TRUST_MARKS, ...TRUST_MARKS];
  return (
    <Reveal variant="up">
      <section className="py-10 border-y" style={{ borderColor: "var(--teal-light)", background: "var(--cream-deep)" }}>
        <div className="text-center">
          <SectionLabel n="01" color="var(--rust)" />
        </div>
        <p
          className="text-center text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: "var(--rust)" }}
        >
          Trusted by leading organisations
        </p>
        <div className="overflow-hidden scrollbar-hide" aria-hidden="true">
          <div className="flex gap-12 w-max animate-marquee">
            {marks.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-lg md:text-xl whitespace-nowrap opacity-45 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                style={{ color: "var(--teal-dark)" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        <p className="sr-only">
          Organisations we&apos;ve delivered branded merchandise for, including {TRUST_MARKS.join(", ")}.
        </p>

        <StaggerGroup className="flex items-center justify-center gap-10 md:gap-16 mt-10 flex-wrap" stagger={0.1}>
          {STATS.map((s) => (
            <StaggerItem key={s.label} variant="up" className="text-center">
              <p className="font-display text-3xl md:text-4xl font-medium" style={{ color: "var(--teal-dark)" }}>
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[11px] tracking-wide uppercase mt-1" style={{ color: "var(--rust)", opacity: 0.7 }}>
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </Reveal>
  );
}
