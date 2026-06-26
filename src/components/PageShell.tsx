import Nav from "./Nav";
import Footer from "./Footer";
import NorthbirdFlightController from "./mascot/NorthbirdFlightController";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {/* Single persistent mascot instance — fixed, anchored near nav */}
      <NorthbirdFlightController />
      <main>{children}</main>
      <Footer />
    </>
  );
}
