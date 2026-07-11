import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

const INDUSTRIES = [
  { name: "NGOs & Foundations", supply: "Event merchandise, branded giveaways, field-team apparel." },
  { name: "Banks & Sacco's", supply: "Executive gift sets, premium notebooks, branch signage." },
  { name: "Universities", supply: "Orientation kits, campus merchandise, graduation giveaways." },
  { name: "Telecoms", supply: "Large-run promotional giveaways, activation kiosks and banners." },
  { name: "Government Agencies", supply: "Delegate gift sets, conference signage, uniform apparel." },
  { name: "Corporates", supply: "Staff onboarding kits, client gifting, trade-show display." },
];

export default function Industries() {
  return (
    <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <Reveal variant="up">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--orange)" }}>
            Industries
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-12 max-w-xl" style={{ color: "var(--teal-dark)" }}>
            Who we supply.
          </h2>
        </div>
      </Reveal>
      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {INDUSTRIES.map((ind) => (
          <StaggerItem key={ind.name} variant="up">
            <h3 className="font-display text-xl font-medium mb-2" style={{ color: "var(--teal-dark)" }}>
              {ind.name}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
              {ind.supply}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
