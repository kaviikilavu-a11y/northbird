import Nav from "./Nav";
import Footer from "./Footer";
import NorthbirdFlightController from "./mascot/NorthbirdFlightController";
import LoadingIntro from "./motion/LoadingIntro";
import BackToTop from "./motion/BackToTop";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingIntro />
      <Nav />
      {/* Single persistent mascot instance — fixed, anchored near nav */}
      <NorthbirdFlightController />
      <main className="pt-20">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
