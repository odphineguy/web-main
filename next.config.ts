import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

// Search Console 404s, each pointed at the closest surviving page. The blog was
// removed wholesale, so these map by topic: chatbot/AI posts to the voice agent
// service, bilingual/SEO posts to their service or landing page, and the rest to
// the services index or the locale home.
const DEAD_URL_REDIRECTS: ReadonlyArray<readonly [string, string]> = [
  ["/mes", "/es"],
  ["/mo", "/en"],
  ["/&", "/en"],
  ["/en/blog", "/en"],
  ["/blog/web-development-trends-2026", "/en/services/bilingual-web-development"],
  ["/en/blog/hreflang-explained-local-business", "/en/services/bilingual-web-development"],
  ["/blog/bilingual-seo-best-practices-2026", "/en/bilingual-seo-phoenix"],
  ["/en/blog/bilingual-seo-phoenix-local-businesses", "/en/bilingual-seo-phoenix"],
  ["/es/blog/bilingual-email-marketing-automation", "/es"],
  ["/blog/us-hispanic-small-business-owner-marketing", "/en/services"],
  ["/en/blog/hispanic-family-decision-making-marketing", "/en/services"],
  ["/blog/ai-chatbot-vs-live-chat-which-is-better", "/en/services/ai-voice-agents"],
  ["/blog/latin-music-marketing-brand-partnerships", "/en"],
  ["/blog/measuring-roi-custom-bilingual-chatbot", "/en/services/ai-voice-agents"],
  ["/blog/conversational-ai-trends-2026", "/en/services/ai-voice-agents"],
  ["/blog/top-5-use-cases-ai-chatbots-small-business", "/en/services/ai-voice-agents"],
];

// Matched against the request Host header; Next.js treats these as regexes.
const NON_PRODUCTION_HOSTS = [
  "preview\\.abemedia\\.online",
  ".*\\.vercel\\.app",
];

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
      // Dead URLs reported by Search Console. These run before src/middleware.ts,
      // so they take precedence over its blanket 410 for /blog and /resources;
      // any blog URL not listed here still returns 410 Gone.
      // statusCode 301 rather than `permanent: true`, which emits 308. Both are
      // permanent and Google treats them alike, but 301 is what Search Console
      // and third-party audit tools report, matching RENAMED_ROUTES in middleware.
      ...DEAD_URL_REDIRECTS.map(([source, destination]) => ({
        source,
        destination,
        statusCode: 301,
      })),
    ];
  },
  async headers() {
    return [
      // Keep non-production hosts out of the index. The preview subdomain and
      // Vercel's generated deployment URLs serve the same content as production,
      // so without this they compete with abemedia.online for the same queries.
      ...NON_PRODUCTION_HOSTS.map((value) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value }],
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      })),
    ];
  },
};

export default withNextIntl(nextConfig);
