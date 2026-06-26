import type { Metadata } from "next";
import "./globals.css";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Northbird & Co — Branded Merchandise",
  description: "Premium branded merchandise for East African businesses. Notebooks, mugs, apparel, gift sets, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ background: "var(--cream)" }}>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
