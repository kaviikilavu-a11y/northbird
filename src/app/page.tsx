import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import WhyNorthbird from "@/components/WhyNorthbird";
import CuratedCollections from "@/components/CuratedCollections";
import Industries from "@/components/Industries";
import BrandInspiration from "@/components/BrandInspiration";
import MadeForEveryBrand from "@/components/MadeForEveryBrand";
import PullQuoteSection from "@/components/PullQuoteSection";
import OrderingProcess from "@/components/OrderingProcess";
import WhatsAppSection from "@/components/WhatsAppSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <WhyNorthbird />
      <CuratedCollections />
      <PullQuoteSection
        image="/lifestyle/lifestyle-08-corner-store.jpg"
        quote="Snack run. Full fit anyway."
        imageAlign="right"
      />
      <Industries />
      <BrandInspiration />
      <MadeForEveryBrand />
      <PullQuoteSection
        image="/lifestyle/lifestyle-07-notebook-close.jpg"
        quote="Yeah, it's got my name on it."
      />
      <OrderingProcess />
      <WhatsAppSection />
    </>
  );
}
