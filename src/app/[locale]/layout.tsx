import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";

import {
  Spectral,
  Manrope,
  Inter,
  JetBrains_Mono,
  Big_Shoulders,
  Familjen_Grotesk,
  Spline_Sans_Mono,
} from "next/font/google";
import Script from "next/script";
import nextDynamic from "next/dynamic";
import "../globals.css";
import TopNavbar from "@/components/TopNavbar";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Analytics } from "@vercel/analytics/react";
import { AttributionCapture } from "@/components/AttributionCapture";
import { CHAT_ENABLED } from "@/lib/flags";
import ReactiveFooter from "@/components/ReactiveFooter";

// Lazy load the chatbot to reduce initial bundle size (code-splitting)
const ChatWidget = nextDynamic(() => import("@/components/chatbot/EmberChat"), {
  loading: () => null,
});

// Site chat kill switch - see src/lib/flags.ts. While it is false the dynamic
// import above never runs, so the chunk is not fetched and no mount code executes.

// Force fresh HTML on production so updates appear immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Body / UI sans — humanist, distinctive, variable weight
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
});

/* ── Design system faces ──────────────────────────────────────────────────
   Promoted from the How It Works page, which was the only page using them.
   These are the sitewide voices now: condensed display, grotesk body, mono
   for labels and metadata. Loaded at root so every page can reach them. */
const dsDisplay = Big_Shoulders({
  variable: "--font-ds-display",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  // Next cannot derive metric overrides for this face, so it warns and skips
  // the auto fallback. Naming condensed fallbacks explicitly keeps the swap
  // from reflowing headings.
  fallback: ["Arial Narrow", "Helvetica Neue Condensed", "Impact", "sans-serif"],
  adjustFontFallback: false,
});

const dsBody = Familjen_Grotesk({
  variable: "--font-ds-body",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const dsMono = Spline_Sans_Mono({
  variable: "--font-ds-mono",
  subsets: ["latin"],
  display: "swap",
});

// Display — retained for pages not yet migrated to the design system.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
});

// Labels / technical metadata (design system: JetBrains Mono 12px 600)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Editorial serif — no longer used for headings. Retained only for the italic
// accent on the chat/transcript widget label and the decorative quote glyphs,
// so the weight set is trimmed to just what those need.
const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abemedia.online"),
  title: {
    default: "Abe Media — AI Agents, Dispatch Software & Bilingual Automation",
    template: "%s | Abe Media",
  },
  description: "Abe Media builds AI agents, dispatch software, and bilingual automation for service businesses, grounded in real dispatch and operations experience.",
  keywords: [
    "AI voice agents",
    "dispatch software",
    "lead pipeline automation",
    "bilingual AI automation",
    "custom business software",
    "service business automation",
  ],
  authors: [{ name: "Abe Media" }],
  creator: "Abe Media",
  publisher: "Abe Media",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://abemedia.online",
    siteName: "Abe Media",
    title: "Abe Media — AI Agents, Dispatch Software & Bilingual Automation",
    description: "AI agents, dispatch software, and bilingual automation for service businesses.",
    locale: "en_US",
    alternateLocale: ["es_US", "es_MX"],
    images: [
      {
        url: "/images/portfolio/og.png",
        width: 1200,
        height: 630,
        alt: "Abe Media — AI agents, dispatch software, and bilingual automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abe Media — AI Agents, Dispatch Software & Bilingual Automation",
    description: "AI agents, dispatch software, and bilingual automation for service businesses.",
    images: ["/images/portfolio/og.png"],
    creator: "@abe_vision",
  },
  alternates: {
    canonical: "./",
  },
  verification: {
    // Add your verification codes here if you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming locale is valid
  if (!['en', 'es'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});

  // Structured data for SEO

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://abemedia.online/#organization",
    name: "Abe Media",
    url: "https://abemedia.online",
    logo: "https://abemedia.online/images/portfolio/abemedia.black.svg",
    description: "Abe Media builds AI agents, dispatch software, and bilingual automation for service businesses. Its work includes AI voice agents, custom dispatch and operations systems, lead-pipeline integrations, AI estimating tools, and custom applications grounded in real dispatch and operations experience.",
    parentOrganization: {
      "@type": "Organization",
      name: "Abevision LLC",
    },
    founder: {
      "@type": "Person",
      name: "Abe Perez",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2026 W Colter St",
      addressLocality: "Phoenix",
      addressRegion: "AZ",
      postalCode: "85015",
      addressCountry: "US",
    },
    sameAs: [
      "https://x.com/abe_vision",
      "https://www.instagram.com/abevision_",
      "https://www.facebook.com/profile.php?id=100091085333551",
      "https://www.tiktok.com/@abevision_",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+1-213-845-2704",
      email: "abe@abemedia.online",
      availableLanguage: ["English", "Spanish"],
      areaServed: "US",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    knowsAbout: [
      "AI voice agents",
      "Dispatch and operations software",
      "Lead-pipeline automation",
      "AI estimating tools",
      "Bilingual English-Spanish automation",
      "Custom business software",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://abemedia.online/#website",
    name: "Abe Media",
    url: "https://abemedia.online",
    description: "AI agents, dispatch software, and bilingual automation for service businesses.",
    publisher: {
      "@id": "https://abemedia.online/#organization",
    },
    inLanguage: ["en-US", "es-US"],
  };

  // Normal static/dynamic behavior restored
  return (
    /* Font variables live on <body>; globals.css references --font-inter /
       --font-spectral directly in the heading rules so they resolve by
       inheritance from here. */
    <html lang={locale}>
      <head>
        {/* The two home-hero preloads that used to live here were removed: the
            hero has been text-only since the single-offer repositioning and the
            image files are gone, so they were firing a 404 on every page load
            of every route. Nothing renders them any more. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EJCZTY1MCG"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EJCZTY1MCG');
          `}
        </Script>
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable} ${spectral.variable} ${dsDisplay.variable} ${dsBody.variable} ${dsMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }}
        />
        <AttributionCapture />
        <NextIntlClientProvider messages={messages}>
          <ConvexClientProvider>
          <TopNavbar />
          <main className="min-h-screen">{children}</main>
          <ReactiveFooter locale={locale} />
          {CHAT_ENABLED && <ChatWidget />}
          <Analytics />
          </ConvexClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
