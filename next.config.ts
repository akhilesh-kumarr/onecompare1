import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: "node_modules/.cache/onecompare-runtime-v3",
  allowedDevOrigins: ["localhost", "127.0.0.1"]
};

export default nextConfig;
