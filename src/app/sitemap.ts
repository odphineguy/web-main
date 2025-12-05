import { MetadataRoute } from "next";
import { allBlogPages } from "@/lib/blogPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abemedia.online";
  const currentDate = new Date();

  // Define all the main pages
  const mainRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-started`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // Note: chatbot page is excluded as it's set to noindex
    // Note: /resources now redirects to /blog
  ];

  // Generate blog page routes from all blog pages data with actual dates
  const blogRoutes = allBlogPages.map((page) => ({
    url: `${baseUrl}/blog/${page.slug}`,
    lastModified: new Date(page.updatedDate || page.publishedDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...mainRoutes, ...blogRoutes];
}
