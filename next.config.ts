import type { NextConfig } from "next";

// was modifide
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // permite toate domeniile HTTPS
      },
    ],
  },
};

export default nextConfig;
