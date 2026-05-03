import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const handleI18n = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en'
});

// Paths whose pages were intentionally removed and should signal HTTP 410 (Gone)
// to search engines so they drop them from the index quickly.
const GONE_PATTERN = /^\/(?:(?:en|es)\/)?blog(?:\/|$)/;

export default function middleware(request: NextRequest) {
  if (GONE_PATTERN.test(request.nextUrl.pathname)) {
    return new NextResponse(
      '<!DOCTYPE html><html><head><title>Gone</title><meta name="robots" content="noindex"></head><body><h1>410 Gone</h1><p>This page is no longer available.</p></body></html>',
      { status: 410, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
  return handleI18n(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
