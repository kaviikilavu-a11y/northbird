import Hero from "@/components/Hero";
import WhatsAppSection from "@/components/WhatsAppSection";
import Link from "next/link";
import { CATEGORIES } from "@/lib/catalogue-data";

// Show a handful of featured categories on the home page
const FEATURED = CATEGORIES.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Featured categories teaser */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--teal-dark)" }}>
          What we make
        </h2>
        <p className="text-sm mb-10" style={{ color: "#666" }}>
          15 categories, fully customised with your branding.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {FEATURED.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogue/${cat.slug}`}
              className="group rounded-2xl border p-5 flex flex-col gap-2 transition-shadow hover:shadow-md"
              style={{ borderColor: "var(--teal-light)", background: "white" }}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="font-semibold text-sm" style={{ color: "var(--teal-dark)" }}>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/catalogue"
            className="inline-block px-6 py-3 rounded-full font-semibold text-sm transition-colors"
            style={{ background: "var(--teal-dark)", color: "var(--cream)" }}
          >
            View all 15 categories →
          </Link>
        </div>
      </section>

      {/* Social proof / Our Work section */}
      <section className="py-14 px-4" style={{ background: "#F0E8D5" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--rust)" }}
          >
            Work we&apos;ve produced
          </p>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--teal-dark)" }}>
            Trusted by leading East African organisations
          </h2>
          <p className="text-sm leading-relaxed max-w-xl mx-auto" style={{ color: "#555" }}>
            From Mastercard Foundation co-branded gilets and notebooks to eSp water bottles — we&apos;ve
            handled large-run deliveries for clients who care about quality.
          </p>
        </div>
      </section>

      <WhatsAppSection />
    </>
  );
}
