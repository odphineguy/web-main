import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      // Pin Turbopack root to this app to avoid multi-lockfile inference.
      root: __dirname,
    },
  },
  // Restore default caching behavior (remove temporary no-cache headers)
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
