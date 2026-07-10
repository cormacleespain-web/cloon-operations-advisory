import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  cacheComponents: true,
  images: {
    remotePatterns: [
      new URL("https://*.public.blob.vercel-storage.com/**"),
    ],
  },
};

export default nextConfig;
