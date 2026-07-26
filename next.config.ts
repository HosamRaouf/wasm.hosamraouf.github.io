import type { NextConfig } from "next";

console.log('Next.js Config: output=export, basePath=' + (process.env.NODE_ENV === 'production' ? '/wasm.hosamraouf.github.io' : ''));

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/wasm.hosamraouf.github.io' : '',
  images: {
    unoptimized: true,
  },
  // Ensure we don't try to use server features
  trailingSlash: true,
};

export default nextConfig;
