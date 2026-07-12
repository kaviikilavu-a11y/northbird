import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

const WORDS = ["DESIGNED", "TO", "BE", "REMEMBERED"];

export default function TypographyMoment() {
  return (
    <section className="py-20 md:py-32 px-4" style={{ background: "var(--cream-deep)" }}>
      <StaggerGroup className="max-w-4xl mx-auto text-center" stagger={0.1}>
        {WORDS.map((word) => (
          <StaggerItem key={word} variant="up">
            <p
              className="font-display font-medium leading-[1.05] tracking-tight"
              style={{ color: "var(--teal-dark)", fontSize: "clamp(2.5rem, 9vw, 6.5rem)" }}
            >
              {word}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
