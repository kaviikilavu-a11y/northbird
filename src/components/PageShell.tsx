import Nav from "./Nav";
import Footer from "./Footer";
import NorthbirdFlightController from "./mascot/NorthbirdFlightController";
import LoadingIntro from "./motion/LoadingIntro";
import BackToTop from "./motion/BackToTop";
import PageTransition from "./motion/PageTransition";
import SmoothScroll from "./motion/SmoothScroll";
import CustomCursor from "./motion/CustomCursor";
import RequestProductSection from "./RequestProductSection";
import BundlePanel from "./bundle/BundlePanel";
import BundleToast from "./bundle/BundleToast";
import { BundleProvider } from "@/lib/bundle-context";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <BundleProvider>
      <SmoothScroll>
        <CustomCursor />
        <LoadingIntro />
        <Nav />
        {/* Single persistent mascot instance — fixed, anchored near nav */}
        <NorthbirdFlightController />
        <main className="pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <RequestProductSection />
        <Footer />
        <BackToTop />
        <BundlePanel />
        <BundleToast />
      </SmoothScroll>
    </BundleProvider>
  );
}
