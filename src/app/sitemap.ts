import { MetadataRoute } from "next";
import { caseStudyPages, industryPages, servicePages } from "@/content/discoverability";
import { industryPagesEs, servicePagesEs } from "@/content/discoverability.es";
import { projectOrder } from "@/content/projects";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abemedia.online";
  const routes = [
    { path: "", lastModified: "2026-07-19", hasSpanishEquivalent: true },
    { path: "/services", lastModified: "2026-07-19", hasSpanishEquivalent: true },
    { path: "/how-it-works", lastModified: "2026-07-19", hasSpanishEquivalent: true },
    { path: "/missed-call-text-back", lastModified: "2026-08-20", hasSpanishEquivalent: true },
    { path: "/ai-receptionist-vs-answering-service", lastModified: "2026-08-20", hasSpanishEquivalent: true },
    { path: "/smith-ai-alternatives-home-services", lastModified: "2026-08-20", hasSpanishEquivalent: true },
    { path: "/portfolio", lastModified: "2026-08-26", hasSpanishEquivalent: true },
    { path: "/portfolio/mylabcompliance", lastModified: "2026-04-20", hasSpanishEquivalent: false },
    ...projectOrder.map((slug) => ({ path: `/portfolio/${slug}`, lastModified: "2026-08-26", hasSpanishEquivalent: true })),
    { path: "/pricing", lastModified: "2026-07-19", hasSpanishEquivalent: true },
    { path: "/calculator", lastModified: "2026-07-19", hasSpanishEquivalent: true },
    { path: "/bilingual-seo-phoenix", lastModified: "2026-04-20", hasSpanishEquivalent: false },
    { path: "/contact", lastModified: "2026-07-19", hasSpanishEquivalent: false },
    { path: "/industries", lastModified: "2026-08-09", hasSpanishEquivalent: true },
    { path: "/about", lastModified: "2026-08-09", hasSpanishEquivalent: true },
    { path: "/about/abe-perez", lastModified: "2026-08-09", hasSpanishEquivalent: true },
    { path: "/faq", lastModified: "2026-08-09", hasSpanishEquivalent: true },
    { path: "/guides/dispatch-software-real-exceptions", lastModified: "2026-08-06", hasSpanishEquivalent: false },
    { path: "/blog", lastModified: "2026-08-27", hasSpanishEquivalent: false },
    ...blogPosts.map((post) => ({ path: `/blog/${post.slug}`, lastModified: post.dateModified, hasSpanishEquivalent: false })),
    ...Object.keys(servicePages).map((slug) => ({ path: `/services/${slug}`, lastModified: "2026-08-06", hasSpanishEquivalent: Boolean(servicePagesEs[slug]) })),
    ...Object.keys(industryPages).map((slug) => ({ path: `/industries/${slug}`, lastModified: slug === "junk-removal" ? "2026-08-20" : "2026-08-06", hasSpanishEquivalent: Boolean(industryPagesEs[slug]) })),
    ...Object.keys(caseStudyPages).map((slug) => ({ path: `/portfolio/${slug}`, lastModified: "2026-08-06", hasSpanishEquivalent: false })),
  ];

  const buildLocalized = (locale: string, path: string) =>
    path === "" ? `/${locale}` : `/${locale}${path}`;

  return routes.flatMap(({ path, lastModified, hasSpanishEquivalent }) => {
    const locales = hasSpanishEquivalent ? (["en", "es"] as const) : (["en"] as const);

    return locales.map((locale) => ({
      url: `${baseUrl}${buildLocalized(locale, path)}`,
      lastModified: new Date(`${lastModified}T00:00:00.000Z`),
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1.0 : 0.8,
      ...(hasSpanishEquivalent && {
        alternates: {
          languages: {
            en: `${baseUrl}${buildLocalized("en", path)}`,
            es: `${baseUrl}${buildLocalized("es", path)}`,
            "x-default": `${baseUrl}${buildLocalized("en", path)}`,
          },
        },
      }),
    }));
  });
}
