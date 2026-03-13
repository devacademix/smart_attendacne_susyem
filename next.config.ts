import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow large image optimization for the canvas frames
  images: {
    unoptimized: true, // We're using canvas directly, not next/image for frames
  },
  // Ensure we can handle the 240 frame assets
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
