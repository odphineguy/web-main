"use client";

import Link from "next/link";
import { SeoPage } from "@/lib/seoPages/types";
import { getRelatedPages, getPagesByCategory } from "@/lib/seoPages";
import { ArrowRight } from "lucide-react";

interface RelatedPagesProps {
  currentPage: SeoPage;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Bilingual Advertising": { 
    bg: "bg-orange-50 dark:bg-orange-950/30", 
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800"
  },
  "Hispanic Market": { 
    bg: "bg-blue-50 dark:bg-blue-950/30", 
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800"
  },
  "AI Marketing": { 
    bg: "bg-purple-50 dark:bg-purple-950/30", 
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800"
  },
  "Chatbot Development": { 
    bg: "bg-green-50 dark:bg-green-950/30", 
    text: "text-green-700 dark:text-green-300",
    border: "border-green-200 dark:border-green-800"
  },
  "Bilingual Chatbots": { 
    bg: "bg-teal-50 dark:bg-teal-950/30", 
    text: "text-teal-700 dark:text-teal-300",
    border: "border-teal-200 dark:border-teal-800"
  },
  "Spanish Marketing": { 
    bg: "bg-red-50 dark:bg-red-950/30", 
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-800"
  },
  "Industry Solutions": { 
    bg: "bg-indigo-50 dark:bg-indigo-950/30", 
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-800"
  },
  "Case Studies": { 
    bg: "bg-yellow-50 dark:bg-yellow-950/30", 
    text: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-200 dark:border-yellow-800"
  },
};

export default function RelatedPages({ currentPage }: RelatedPagesProps) {
  // Get related pages based on the current page
  const relatedPages = getRelatedPages(currentPage.slug).slice(0, 3);
  
  // If not enough related pages, supplement with same category
  let displayPages = relatedPages;
  if (displayPages.length < 3) {
    const sameCategoryPages = getPagesByCategory(currentPage.category)
      .filter(p => p.slug !== currentPage.slug && !displayPages.find(rp => rp.slug === p.slug))
      .slice(0, 3 - displayPages.length);
    displayPages = [...displayPages, ...sameCategoryPages];
  }

  if (displayPages.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
        Related Resources
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayPages.map((page) => {
          const colors = categoryColors[page.category] || categoryColors["Bilingual Advertising"];
          return (
            <Link
              key={page.slug}
              href={`/resources/${page.slug}`}
              className={`group block p-5 rounded-xl border ${colors.border} bg-white dark:bg-neutral-800/50 hover:shadow-lg transition-all duration-200`}
            >
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${colors.bg} ${colors.text} mb-3`}>
                {page.category}
              </span>
              <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                {page.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                {page.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          );
        })}
      </div>
      
      {/* More from this category */}
      <div className="mt-8 text-center">
        <Link
          href={`/resources?category=${encodeURIComponent(currentPage.category)}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors font-medium"
        >
          More {currentPage.category} Resources
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

