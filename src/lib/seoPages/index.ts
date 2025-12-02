export * from "./types";

import { SeoPage, SeoPageJson, categories, CategoryInfo } from "./types";

// Import JSON files
import seoPagesBatch1 from "../../../seo-pages-batch-december-2025.json";
import seoPagesBatch2 from "../../../seo-pages-batch-december-2025-part2.json";
import seoPagesBatch3 from "../../../seo-pages-batch-december-2025-part3.json";

// Helper to calculate read time based on content length
function calculateReadTime(content: SeoPageJson["content"]): string {
  const wordsPerMinute = 200;
  const intro = content.intro || "";
  const sections = content.sections.map((s) => s.content).join(" ");
  const conclusion = content.conclusion || "";
  const totalText = `${intro} ${sections} ${conclusion}`;
  const wordCount = totalText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Helper to generate excerpt from description or intro
function generateExcerpt(page: SeoPageJson): string {
  // Use description, truncated to ~160 chars if needed
  const text = page.description || page.content.intro;
  if (text.length <= 160) return text;
  return text.substring(0, 157).trim() + "...";
}

// Helper to generate metaTitle from title
function generateMetaTitle(page: SeoPageJson): string {
  // If title already contains brand, use as-is, otherwise append
  if (page.title.includes("ABE Media") || page.title.includes("Abe Media")) {
    return page.title;
  }
  return `${page.title} | Abe Media`;
}

// Transform JSON page to normalized SeoPage format
function transformJsonPage(jsonPage: SeoPageJson): SeoPage {
  return {
    slug: jsonPage.slug,
    title: jsonPage.title,
    metaTitle: generateMetaTitle(jsonPage),
    metaDescription: jsonPage.description,
    description: jsonPage.description,
    keywords: jsonPage.keywords,
    category: jsonPage.category,
    author: jsonPage.author,
    excerpt: generateExcerpt(jsonPage),
    content: jsonPage.content,
    relatedSlugs: jsonPage.relatedPages || [],
    publishedDate: jsonPage.publishedDate,
    updatedDate: jsonPage.publishedDate, // Use publishedDate as default
    readTime: calculateReadTime(jsonPage.content),
    featured: false,
    image: jsonPage.image,
    cta: jsonPage.cta,
    schema: jsonPage.schema,
  };
}

// Load and transform all pages from JSON files
function loadAllPages(): SeoPage[] {
  const allJsonPages: SeoPageJson[] = [
    ...(seoPagesBatch1.pages as SeoPageJson[]),
    ...(seoPagesBatch2.pages as SeoPageJson[]),
    ...(seoPagesBatch3.pages as SeoPageJson[]),
  ];
  return allJsonPages.map(transformJsonPage);
}

// All SEO pages combined
export const allSeoPages: SeoPage[] = loadAllPages();

// Export categories
export { categories };

// Helper function to get page by slug
export function getPageBySlug(slug: string): SeoPage | undefined {
  return allSeoPages.find((page) => page.slug === slug);
}

// Helper function to get pages by category
export function getPagesByCategory(categoryName: string): SeoPage[] {
  return allSeoPages.filter((page) => page.category === categoryName);
}

// Helper function to get featured pages
export function getFeaturedPages(): SeoPage[] {
  return allSeoPages.filter((page) => page.featured);
}

// Helper function to get related pages
export function getRelatedPages(slug: string): SeoPage[] {
  const page = getPageBySlug(slug);
  if (!page) return [];
  return page.relatedSlugs
    .map((relatedSlug) => getPageBySlug(relatedSlug))
    .filter((p): p is SeoPage => p !== undefined);
}

// Helper function to get all slugs (for generateStaticParams)
export function getAllSlugs(): string[] {
  return allSeoPages.map((page) => page.slug);
}

// Helper function to get category info
export function getCategoryInfo(categoryName: string): CategoryInfo | undefined {
  return categories.find((cat) => cat.name === categoryName);
}

// Helper function to search pages
export function searchPages(query: string): SeoPage[] {
  const lowercaseQuery = query.toLowerCase();
  return allSeoPages.filter(
    (page) =>
      page.title.toLowerCase().includes(lowercaseQuery) ||
      page.excerpt.toLowerCase().includes(lowercaseQuery) ||
      page.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowercaseQuery)
      )
  );
}

// Export total page count
export const totalPageCount = allSeoPages.length;
