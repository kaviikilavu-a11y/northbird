import Nav from "./Nav";
import Footer from "./Footer";
import LoadingIntro from "./motion/LoadingIntro";
import BackToTop from "./motion/BackToTop";
import RequestProductSection from "./RequestProductSection";
import BundlePanel from "./bundle/BundlePanel";
import BundleToast from "./bundle/BundleToast";
import { BundleProvider } from "@/lib/bundle-context";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <BundleProvider>
      <LoadingIntro />
      <Nav />
      <main className="pt-20">{children}</main>
      <RequestProductSection />
      <Footer />
      <BackToTop />
      <BundlePanel />
      <BundleToast />
    </BundleProvider>
  );
}
