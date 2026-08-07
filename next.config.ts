import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // Keep titles, descriptions, canonicals, hreflang, and social metadata in
  // the initial document head for HTML-only crawlers and browser agents.
  htmlLimitedBots: /.*/,
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

export default withNextIntl(nextConfig);
