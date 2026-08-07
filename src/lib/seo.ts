import { Metadata } from "next";

export function constructMetadata({
  title,
  description,
  image = "/images/portfolio/og.png",
  icons = "/favicon.ico",
  noIndex = false,
  path = "",
  locale = "en",
  hasSpanishEquivalent = true,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  path?: string;
  locale?: string;
  hasSpanishEquivalent?: boolean;
} = {}): Metadata {
  const baseUrl = "https://abemedia.online";
  const cleanPath = path && path.startsWith("/") ? path : path ? `/${path}` : "";
  const canonicalPath = cleanPath ? `/${locale}${cleanPath}` : `/${locale}`;
  const languages = hasSpanishEquivalent
    ? {
        en: `/en${cleanPath}`,
        es: `/es${cleanPath}`,
        "x-default": `/en${cleanPath}`,
      }
    : undefined;

  return {
    // Page titles are already written as complete titles. Using an absolute
    // value prevents the root layout template from adding a second brand suffix.
    title: title ? { absolute: title } : undefined,
    description,
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: "Abe Media",
      locale: locale === "es" ? "es_US" : "en_US",
      alternateLocale: hasSpanishEquivalent
        ? [locale === "es" ? "en_US" : "es_US"]
        : undefined,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Abe Media — AI agents, dispatch software, and bilingual automation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@abe_vision",
    },
    icons,
    metadataBase: new URL(baseUrl),
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
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
    alternates: {
      canonical: canonicalPath,
      ...(languages && { languages }),
    },
  };
}
