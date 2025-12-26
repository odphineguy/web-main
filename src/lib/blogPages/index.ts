export * from "./types";

import { BlogPage, BlogPageJson, blogCategories, BlogCategoryInfo, BlogCategory } from "./types";

// Import JSON files - Blog pages
import blogPagesData from "../../../blog-pages.json";

// Import JSON files - SEO pages (formerly Resources)
import seoPagesBatch1 from "../../../seo-pages-batch-december-2025.json";
import seoPagesBatch2 from "../../../seo-pages-batch-december-2025-part2.json";
import seoPagesBatch3 from "../../../seo-pages-batch-december-2025-part3.json";
import seoPagesBatch4 from "../../../seo-pages-batch-december-2025-part4.json";
import seoPagesBatch5 from "../../../seo-pages-batch-december-2025-part5.json";
import seoStrategyBatch from "../../../seo-pages-batch-seo-strategy.json";
import bilingualSeoArticles from "../../../seo-pages-batch-bilingual-seo-articles.json";

// Helper to calculate read time based on content length
function calculateReadTime(content: BlogPageJson["content"]): string {
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
function generateExcerpt(page: BlogPageJson): string {
  // Use description, truncated to ~160 chars if needed
  const text = page.description || page.content.intro;
  if (text.length <= 160) return text;
  return text.substring(0, 157).trim() + "...";
}

// Helper to generate metaTitle from title
function generateMetaTitle(page: BlogPageJson): string {
  // If title already contains brand, use as-is, otherwise append
  if (page.title.includes("ABE Media") || page.title.includes("Abe Media")) {
    return page.title;
  }
  return `${page.title} | Abe Media`;
}

// Transform JSON page to normalized BlogPage format
function transformJsonPage(jsonPage: BlogPageJson): BlogPage {
  return {
    slug: jsonPage.slug,
    title: jsonPage.title,
    metaTitle: generateMetaTitle(jsonPage),
    metaDescription: jsonPage.description,
    description: jsonPage.description,
    keywords: jsonPage.keywords,
    category: jsonPage.category as BlogCategory,
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

// Load and transform all pages from all JSON files
function loadAllPages(): BlogPage[] {
  // Load blog pages
  const blogJsonPages: BlogPageJson[] = blogPagesData.pages as BlogPageJson[];
  
  // Load SEO pages (formerly Resources)
  const seoJsonPages: BlogPageJson[] = [
    ...(seoPagesBatch1.pages as BlogPageJson[]),
    ...(seoPagesBatch2.pages as BlogPageJson[]),
    ...(seoPagesBatch3.pages as BlogPageJson[]),
    ...(seoPagesBatch4.pages as BlogPageJson[]),
    ...(seoPagesBatch5.pages as BlogPageJson[]),
    ...(seoStrategyBatch.pages as BlogPageJson[]),
    ...(bilingualSeoArticles.pages as BlogPageJson[]),
  ];
  
  // Combine all pages
  const allJsonPages = [...blogJsonPages, ...seoJsonPages];
  
  return allJsonPages.map(transformJsonPage);
}

// All blog pages combined (blog + former SEO/resources pages)
export const allBlogPages: BlogPage[] = loadAllPages();

// Export categories
export { blogCategories };

// Helper function to get page by slug
export function getBlogPageBySlug(slug: string): BlogPage | undefined {
  return allBlogPages.find((page) => page.slug === slug);
}

// Helper function to get pages by category
export function getBlogPagesByCategory(categoryName: string): BlogPage[] {
  return allBlogPages.filter((page) => page.category === categoryName);
}

// Helper function to get featured pages
export function getFeaturedBlogPages(): BlogPage[] {
  return allBlogPages.filter((page) => page.featured);
}

// Helper function to get related pages
export function getRelatedBlogPages(slug: string): BlogPage[] {
  const page = getBlogPageBySlug(slug);
  if (!page) return [];
  return page.relatedSlugs
    .map((relatedSlug) => getBlogPageBySlug(relatedSlug))
    .filter((p): p is BlogPage => p !== undefined);
}

// Helper function to get all slugs (for generateStaticParams)
export function getAllBlogSlugs(): string[] {
  return allBlogPages.map((page) => page.slug);
}

// Helper function to get category info
export function getBlogCategoryInfo(categoryName: string): BlogCategoryInfo | undefined {
  return blogCategories.find((cat) => cat.name === categoryName);
}

// Helper function to search pages
export function searchBlogPages(query: string): BlogPage[] {
  const lowercaseQuery = query.toLowerCase();
  return allBlogPages.filter(
    (page) =>
      page.title.toLowerCase().includes(lowercaseQuery) ||
      page.excerpt.toLowerCase().includes(lowercaseQuery) ||
      page.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowercaseQuery)
      )
  );
}

// Export total page count
export const totalBlogPageCount = allBlogPages.length;
