import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin Turbopack root to this project directory to avoid multi-lockfile inference
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "abemedia.online",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.abemedia.online",
          },
        ],
        destination: "https://abemedia.online/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
