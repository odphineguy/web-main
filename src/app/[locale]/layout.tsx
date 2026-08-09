import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";

import { Spectral, Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import nextDynamic from "next/dynamic";
import "../globals.css";
import TopNavbar from "@/components/TopNavbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Analytics } from "@vercel/analytics/react";
import { AttributionCapture } from "@/components/AttributionCapture";
import { CHAT_ENABLED } from "@/lib/flags";
import { Instagram, Facebook, Music2, Twitter } from "lucide-react";

// Lazy load the chatbot to reduce initial bundle size (code-splitting)
const FloatingChatbot = nextDynamic(() => import("@/components/FloatingChatbot"), {
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

// Display / editorial serif — used for hero and section headings
const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
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

function Footer({ locale }: { locale: string }) {
  const t = useTranslations('Footer');
  return (
    <footer className="border-t border-border py-6">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
        <div className="flex justify-center sm:justify-start">
          <Link href={`/${locale}`} aria-label="Abe Media">
            <Image src="/images/portfolio/abemedia.logo.nobg.png" alt="Abe Media" width={120} height={24} className="h-6 w-auto" />
          </Link>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">{t('copyright')}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t('entity')}</p>
        </div>
        <div className="flex justify-center sm:justify-end text-muted-foreground gap-5">
          <a href="https://x.com/abe_vision" target="_blank" rel="noreferrer" aria-label="Twitter" className="transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="https://www.instagram.com/abevision_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100091085333551&sk=about" target="_blank" rel="noreferrer" aria-label="Facebook" className="transition-colors">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="https://www.tiktok.com/@abevision_?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" aria-label="TikTok" className="transition-colors">
            <Music2 className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

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
      telephone: "+1-626-735-6216",
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preload LCP hero images for faster initial paint */}
        <link
          rel="preload"
          href="/images/home/home-hero-light.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/images/home/home-hero.png"
          as="image"
          type="image/png"
        />
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
      <body className={`${manrope.variable} ${spectral.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider>
          <AttributionCapture />
          <NextIntlClientProvider messages={messages}>
            <ConvexClientProvider>
            <TopNavbar />
            <main className="min-h-screen">{children}</main>
            <Footer locale={locale} />
            {CHAT_ENABLED && <FloatingChatbot />}
            <Analytics />
            </ConvexClientProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
