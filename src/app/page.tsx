import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import WhyNorthbird from "@/components/WhyNorthbird";
import CuratedCollections from "@/components/CuratedCollections";
import Industries from "@/components/Industries";
import BrandInspiration from "@/components/BrandInspiration";
import MadeForEveryBrand from "@/components/MadeForEveryBrand";
import OrderingProcess from "@/components/OrderingProcess";
import WhatsAppSection from "@/components/WhatsAppSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <WhyNorthbird />
      <CuratedCollections />
      <Industries />
      <BrandInspiration />
      <MadeForEveryBrand />
      <OrderingProcess />
      <WhatsAppSection />
    </>
  );
}
