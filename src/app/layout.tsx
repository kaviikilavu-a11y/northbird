import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import PageShell from "@/components/PageShell";
import { SITE_URL } from "@/lib/site-config";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Northbird & Co — Merch People Actually Keep",
  description:
    "Premium branded merchandise and corporate gifting in Kenya. Mugs, flasks, notebooks, signage and more — pick what you need, send your logo on WhatsApp, get a price back the same day. A Visiora Enterprises company.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen" style={{ background: "var(--cream)" }}>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
