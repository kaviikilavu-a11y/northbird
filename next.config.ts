import type { NextConfig } from "next";

// Only set for the GitHub Pages preview build (see .github/workflows/deploy-pages.yml).
// Truhost production serves from the domain root, so this stays unset there.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

// Vercel sets this automatically in every build — no manual config needed. Vercel runs
// Next.js natively and doesn't need (or reliably serve) a static `output: "export"`
// build, which is what Truhost's shared cPanel hosting and the GitHub Pages workflow
// need instead. Skip the static export only there.
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  ...(isVercel ? {} : { output: "export" as const }),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
