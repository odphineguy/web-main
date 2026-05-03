import { MetadataRoute } from "next";
import { allBlogPages } from "@/lib/blogPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abemedia.online";
  const currentDate = new Date();
  const locales = ["en", "es"] as const;

  const paths = [
    "",
    "/services",
    "/services/bilingual-web-development",
    "/services/ai-chatbots",
    "/portfolio",
    "/blog",
    "/contact",
    "/get-started",
  ];

  const buildLocalized = (locale: string, path: string) =>
    path === "" ? `/${locale}` : `/${locale}${path}`;

  const mainRoutes = locales.flatMap((locale) =>
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

  const blogRoutes = locales.flatMap((locale) =>
    allBlogPages.map((page) => ({
      url: `${baseUrl}/${locale}/blog/${page.slug}`,
      lastModified: new Date(page.updatedDate || page.publishedDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${page.slug}`,
          es: `${baseUrl}/es/blog/${page.slug}`,
          "x-default": `${baseUrl}/en/blog/${page.slug}`,
        },
      },
    }))
  );

  return [...mainRoutes, ...blogRoutes];
}
