import { assetPath } from "@/lib/site-config";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Studio-lit portrait + a large pull-quote — the payoff to the hero line "Merch people
 * actually keep," not a repeat of it. Stylized brand-voice copy, not attributed to a
 * named person and not presented as a customer testimonial.
 */
export default function PullQuoteSection() {
  return (
    <section className="py-20 md:py-28 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <Reveal variant="left" className="w-full md:w-2/5 shrink-0">
          <div className="rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto md:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath("/lifestyle/lifestyle-07-notebook-close.jpg")}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal variant="right" delay={0.1} className="w-full md:w-3/5">
          <p
            className="font-display italic leading-tight"
            style={{ color: "var(--teal-dark)", fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            &ldquo;Yeah, it&apos;s got my name on it.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
