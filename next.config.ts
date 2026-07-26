import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/wasm.hosamraouf.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wasm.hosamraouf.github.io/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
