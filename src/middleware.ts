import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const handleI18n = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en'
});

// Paths whose pages were intentionally removed and should signal HTTP 410 (Gone)
// to search engines so they drop them from the index quickly.
const GONE_PATTERN = /^\/(?:(?:en|es)\/)?(?:blog|resources)(?:\/|$)/;

// next-intl uses temporary redirects while negotiating a locale. These public,
// stable routes have a deliberate English default, so consolidate them with a
// permanent redirect instead. Query parameters are preserved.
const PERMANENT_ENGLISH_REDIRECTS = new Set([
  "/",
  "/services",
  "/services/ai-voice-agents",
  "/services/dispatch-operations-software",
  "/services/lead-pipeline-automation",
  "/services/ai-estimating-tools",
  "/services/bilingual-ai-automation",
  "/services/custom-business-software",
  "/how-it-works",
  "/portfolio",
  "/portfolio/mylabcompliance",
  "/portfolio/saguarotransport",
  "/portfolio/dispatch-ai",
  "/portfolio/hermes-legal-intake",
  "/portfolio/safehub",
  "/portfolio/misana",
  "/portfolio/paw-relief",
  "/portfolio/meal-saver",
  "/pricing",
  "/calculator",
  "/bilingual-seo-phoenix",
  "/contact",
  "/chatbot",
  "/industries",
  "/industries/logistics-transportation",
  "/industries/junk-removal",
  "/industries/artificial-turf-landscaping",
  "/industries/home-service-businesses",
  "/industries/waste-management-commercial-hauling",
  "/industries/moving-companies",
  "/about/abe-perez",
  "/faq",
  "/guides/dispatch-software-real-exceptions",
  "/portfolio/rejunk",
  "/portfolio/artificial-turf-ai-design-studio",
  "/portfolio/elena-ai-voice-agent",
]);

const LEGACY_REPLACEMENTS = new Map([
  ["/services/ai-chatbots", "/en/services/ai-voice-agents"],
  ["/en/services/ai-chatbots", "/en/services/ai-voice-agents"],
  ["/es/services/ai-chatbots", "/en/services/ai-voice-agents"],
]);

// Routes renamed away from "platform" language. These emit 301 (not the 308 used
// above) because that is the status search consoles and audit tools report as a
// permanent rename; both are permanent, but 301 is what reviewers look for.
const RENAMED_ROUTES = new Map([
  ["/platforms", "/en/portfolio/saguarotransport"],
  ["/en/platforms", "/en/portfolio/saguarotransport"],
  ["/es/platforms", "/es/portfolio/saguarotransport"],
  ["/services/dispatch-operations-platforms", "/en/services/dispatch-operations-software"],
  ["/en/services/dispatch-operations-platforms", "/en/services/dispatch-operations-software"],
  ["/es/services/dispatch-operations-platforms", "/en/services/dispatch-operations-software"],
  // The Saguaro deep-dive moved into the portfolio; project pages are bilingual.
  ["/systems-we-build", "/en/portfolio/saguarotransport"],
  ["/en/systems-we-build", "/en/portfolio/saguarotransport"],
  ["/es/systems-we-build", "/es/portfolio/saguarotransport"],
  // Retired service pages consolidate onto the services index.
  ["/services/bilingual-web-development", "/en/services"],
  ["/en/services/bilingual-web-development", "/en/services"],
  ["/es/services/bilingual-web-development", "/es/services"],
  ["/services/brand-identity", "/en/services"],
  ["/en/services/brand-identity", "/en/services"],
  ["/es/services/brand-identity", "/es/services"],
]);

export default function middleware(request: NextRequest) {
  if (GONE_PATTERN.test(request.nextUrl.pathname)) {
    return new NextResponse(
      '<!DOCTYPE html><html><head><title>Gone</title><meta name="robots" content="noindex"></head><body><h1>410 Gone</h1><p>This page is no longer available.</p></body></html>',
      { status: 410, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const renamed = RENAMED_ROUTES.get(request.nextUrl.pathname);
  if (renamed) {
    const destination = request.nextUrl.clone();
    destination.pathname = renamed;
    return NextResponse.redirect(destination, 301);
  }

  const replacement = LEGACY_REPLACEMENTS.get(request.nextUrl.pathname);
  if (replacement) {
    const destination = request.nextUrl.clone();
    destination.pathname = replacement;
    return NextResponse.redirect(destination, 308);
  }

  if (PERMANENT_ENGLISH_REDIRECTS.has(request.nextUrl.pathname)) {
    const destination = request.nextUrl.clone();
    destination.pathname = request.nextUrl.pathname === "/"
      ? "/en"
      : `/en${request.nextUrl.pathname}`;
    const response = NextResponse.redirect(destination, 308);
    response.cookies.set("NEXT_LOCALE", "en", {
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  return handleI18n(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
