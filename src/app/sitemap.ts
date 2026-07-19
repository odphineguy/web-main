import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abemedia.online";
  const currentDate = new Date();
  const locales = ["en", "es"] as const;

  const paths = [
    "",
    "/services",
    "/services/bilingual-web-development",
    "/services/ai-chatbots",
    "/services/brand-identity",
    "/platforms",
    "/how-it-works",
    "/portfolio",
    "/portfolio/mylabcompliance",
    "/portfolio/saguarotransport",
    "/pricing",
    "/calculator",
    "/bilingual-seo-phoenix",
    "/contact",
  ];

  const buildLocalized = (locale: string, path: string) =>
    path === "" ? `/${locale}` : `/${locale}${path}`;

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}${buildLocalized(locale, path)}`,
      lastModified: currentDate,
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}${buildLocalized("en", path)}`,
          es: `${baseUrl}${buildLocalized("es", path)}`,
          "x-default": `${baseUrl}${buildLocalized("en", path)}`,
        },
      },
    }))
  );
}
