import { assetPath } from "@/lib/site-config";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A large image + a large pull-quote beside it — never overlaid on the photo. Reusable:
 * pass a real product/lifestyle image and stylized brand-voice copy. Quotes here are never
 * attributed to a named person and never presented as a customer testimonial.
 */
export default function PullQuoteSection({
  image,
  quote,
  imageAlign = "left",
}: {
  image: string;
  quote: string;
  imageAlign?: "left" | "right";
}) {
  return (
    <section className="py-20 md:py-28 px-4 max-w-5xl mx-auto">
      <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${imageAlign === "right" ? "md:flex-row-reverse" : ""}`}>
        <Reveal variant={imageAlign === "right" ? "right" : "left"} className="w-full md:w-2/5 shrink-0">
          <div className="rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto md:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath(image)}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal variant={imageAlign === "right" ? "left" : "right"} delay={0.1} className="w-full md:w-3/5">
          <p
            className="font-display italic leading-tight"
            style={{ color: "var(--teal-dark)", fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
