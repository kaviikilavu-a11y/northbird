import { Reveal } from "@/components/motion/Reveal";

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
      </section>
    </Reveal>
  );
}
