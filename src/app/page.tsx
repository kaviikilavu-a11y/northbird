import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import WhyNorthbird from "@/components/WhyNorthbird";
import CuratedCollections from "@/components/CuratedCollections";
import BrandInspiration from "@/components/BrandInspiration";
import OrderingProcess from "@/components/OrderingProcess";
import WhatsAppSection from "@/components/WhatsAppSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <WhyNorthbird />
      <CuratedCollections />
      <OrderingProcess />
      <BrandInspiration />
      <WhatsAppSection />
    </>
  );
}
