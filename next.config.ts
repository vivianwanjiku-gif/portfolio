import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server is opened at 127.0.0.1 while Next treats localhost as the host.
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
