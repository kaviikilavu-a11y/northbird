import type { NextConfig } from "next";

// Only set for the GitHub Pages preview build (see .github/workflows/deploy-pages.yml).
// Truhost production serves from the domain root, so this stays unset there.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
