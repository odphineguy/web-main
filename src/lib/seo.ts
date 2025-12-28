import { Metadata } from "next";

export function constructMetadata({
  title,
  description,
  image = "/images/portfolio/og.png",
  icons = "/favicon.ico",
  noIndex = false,
  path = "",
  locale = "en",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  path?: string;
  locale?: string;
} = {}): Metadata {
  const baseUrl = "https://abemedia.online";
  
  // Ensure path starts with slash if provided and not empty
  const cleanPath = path && path.startsWith("/") ? path : path ? `/${path}` : "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
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
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    alternates: {
      canonical: cleanPath ? `/${locale}${cleanPath}` : `/${locale}`,
      languages: {
        en: `/en${cleanPath}`,
        es: `/es${cleanPath}`,
        'x-default': `/en${cleanPath}`,
      },
    },
  };
}
