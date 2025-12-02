export * from "./types";

import { BlogPage, BlogPageJson, blogCategories, BlogCategoryInfo } from "./types";

// Import JSON file
import blogPagesData from "../../../blog-pages.json";

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

// Load and transform all pages from JSON file
function loadAllPages(): BlogPage[] {
  const allJsonPages: BlogPageJson[] = blogPagesData.pages as BlogPageJson[];
  return allJsonPages.map(transformJsonPage);
}

// All blog pages
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

// Export total page count
export const totalBlogPageCount = allBlogPages.length;

