import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/wasm.hosamraouf.github.io',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
