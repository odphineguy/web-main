export * from "./types";

import { SeoPage, categories, CategoryInfo } from "./types";
import { bilingualAdvertisingPages } from "./bilingualAdvertising";
import { hispanicMarketPages } from "./hispanicMarket";
import { aiMarketingPages } from "./aiMarketing";
import { chatbotDevelopmentPages } from "./chatbotDevelopment";
import { bilingualChatbotsPages } from "./bilingualChatbots";
import { spanishMarketingPages } from "./spanishMarketing";
import { industrySolutionsPages } from "./industrySolutions";
import { caseStudiesPages } from "./caseStudies";

// Combine all pages into a single array
export const allSeoPages: SeoPage[] = [
  ...bilingualAdvertisingPages,
  ...hispanicMarketPages,
  ...aiMarketingPages,
  ...chatbotDevelopmentPages,
  ...bilingualChatbotsPages,
  ...spanishMarketingPages,
  ...industrySolutionsPages,
  ...caseStudiesPages,
];

// Export individual category arrays
export {
  bilingualAdvertisingPages,
  hispanicMarketPages,
  aiMarketingPages,
  chatbotDevelopmentPages,
  bilingualChatbotsPages,
  spanishMarketingPages,
  industrySolutionsPages,
  caseStudiesPages,
  categories,
};

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

