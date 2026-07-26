import type { NextConfig } from "next";

const withAssetPrefix: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/wasm.hosamraouf.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wasm.hosamraouf.github.io/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    if (!isServer && process.env.NODE_ENV === 'production') {
      // Custom webpack rule to replace asset paths in CSS
      config.module.rules.push({
        test: /\.css$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: '/assets/',
            replace: '/wasm.hosamraouf.github.io/assets/',
            flags: 'g',
          },
        },
      });
    }
    return config;
  },
};

export default withAssetPrefix;
