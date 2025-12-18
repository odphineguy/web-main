import { MetadataRoute } from "next";
import { allBlogPages } from "@/lib/blogPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abemedia.online";
  const currentDate = new Date();
  const locales = ['en', 'es'];

  // Base paths for all main pages (without locale)
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

  // Generate routes for all locales
  const mainRoutes = locales.flatMap((locale) => {
    return paths.map((path) => {
      // Handle the root path specially
      const fullPath = path === "" ? `/${locale}` : `/${locale}${path}`;
      
      return {
        url: `${baseUrl}${fullPath}`,
        lastModified: currentDate,
        changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
        priority: path === "" ? 1.0 : 0.8,
      };
    });
  });

  // Generate blog page routes for all locales
  const blogRoutes = locales.flatMap((locale) => {
    return allBlogPages.map((page) => ({
      url: `${baseUrl}/${locale}/blog/${page.slug}`,
      lastModified: new Date(page.updatedDate || page.publishedDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  });

  return [...mainRoutes, ...blogRoutes];
}
