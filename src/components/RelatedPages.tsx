"use client";

import Link from "next/link";
import { BlogPage, BlogCategory } from "@/lib/blogPages/types";
import { getRelatedBlogPages, getBlogPagesByCategory } from "@/lib/blogPages";
import { 
  ArrowRight,
  Code,
  Smartphone,
  Palette,
  Zap,
  Eye,
  Megaphone,
  Users,
  Brain,
  Bot,
  MessageCircle,
  Globe,
  Building,
  Trophy,
  Tag
} from "lucide-react";

interface RelatedPagesProps {
  currentPage: BlogPage;
}

// Category icons mapping
const categoryIcons: Record<BlogCategory, React.ReactNode> = {
  // Blog categories
  "Web Development": <Code className="w-4 h-4" />,
  "Mobile Development": <Smartphone className="w-4 h-4" />,
  "Design": <Palette className="w-4 h-4" />,
  "Performance": <Zap className="w-4 h-4" />,
  "Accessibility": <Eye className="w-4 h-4" />,
  // SEO/Resources categories
  "Bilingual Advertising": <Megaphone className="w-4 h-4" />,
  "Hispanic Market": <Users className="w-4 h-4" />,
  "AI Marketing": <Brain className="w-4 h-4" />,
  "Chatbot Development": <Bot className="w-4 h-4" />,
  "Bilingual Chatbots": <MessageCircle className="w-4 h-4" />,
  "Spanish Marketing": <Globe className="w-4 h-4" />,
  "Industry Solutions": <Building className="w-4 h-4" />,
  "Case Studies": <Trophy className="w-4 h-4" />,
};

// Fallback icon for unknown categories
const getIcon = (category: string): React.ReactNode => {
  return categoryIcons[category as BlogCategory] || <Tag className="w-4 h-4" />;
};

// Category colors (brand colors: orange and neutral)
const getCategoryColors = (category: string) => {
  const orangeCategories = [
    "Web Development", "Mobile Development", "Design", "Performance", "Accessibility",
    "Bilingual Advertising", "Hispanic Market", "Bilingual Chatbots", "Spanish Marketing", "Case Studies"
  ];
  
  if (orangeCategories.includes(category)) {
    return {
      bg: "bg-orange-50 dark:bg-orange-950/30",
      text: "text-orange-700 dark:text-orange-300",
      border: "border-orange-200 dark:border-orange-800"
    };
  }
  return {
    bg: "bg-neutral-100 dark:bg-neutral-800",
    text: "text-neutral-700 dark:text-neutral-300",
    border: "border-neutral-200 dark:border-neutral-700"
  };
};

export default function RelatedPages({ currentPage }: RelatedPagesProps) {
  // Get related pages based on the current page
  const relatedPages = getRelatedBlogPages(currentPage.slug).slice(0, 3);
  
  // If not enough related pages, supplement with same category
  let displayPages = relatedPages;
  if (displayPages.length < 3) {
    const sameCategoryPages = getBlogPagesByCategory(currentPage.category)
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
        Related Articles
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayPages.map((page) => {
          const colors = getCategoryColors(page.category);
          return (
            <Link
              key={page.slug}
              href={`/blog/${page.slug}`}
              className={`group block p-5 rounded-xl border ${colors.border} bg-white dark:bg-neutral-800/50 hover:shadow-lg transition-all duration-200`}
            >
              <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${colors.bg} ${colors.text} mb-3`}>
                {getIcon(page.category)}
                {page.category}
              </span>
              <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 mb-2">
                {page.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                {page.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 dark:text-orange-400 group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          );
        })}
      </div>
      
      {/* More from this category */}
      <div className="mt-8 text-center">
        <Link
          href={`/blog?category=${encodeURIComponent(currentPage.category)}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors font-medium"
        >
          More {currentPage.category} Articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
