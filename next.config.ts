import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

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
  // PostHog reverse proxy to avoid ad blockers
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
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
      // Redirect /resources to /blog (SEO merge)
      {
        source: "/resources",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/resources/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
