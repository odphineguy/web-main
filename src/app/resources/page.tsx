"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  allSeoPages, 
  categories, 
  getPagesByCategory, 
  getFeaturedPages,
  searchPages,
  totalPageCount
} from "@/lib/seoPages";
import { 
  Search, 
  Megaphone,
  Users,
  Brain,
  Bot,
  MessageCircle,
  Globe,
  Building,
  Trophy,
  ArrowRight,
  Sparkles,
  X
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Bilingual Advertising": <Megaphone className="w-5 h-5" />,
  "Hispanic Market": <Users className="w-5 h-5" />,
  "AI Marketing": <Brain className="w-5 h-5" />,
  "Chatbot Development": <Bot className="w-5 h-5" />,
  "Bilingual Chatbots": <MessageCircle className="w-5 h-5" />,
  "Spanish Marketing": <Globe className="w-5 h-5" />,
  "Industry Solutions": <Building className="w-5 h-5" />,
  "Case Studies": <Trophy className="w-5 h-5" />,
};

const categoryColors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  "Bilingual Advertising": { 
    bg: "bg-orange-50 dark:bg-orange-950/30", 
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800",
    hover: "hover:border-orange-400 dark:hover:border-orange-600"
  },
  "Hispanic Market": { 
    bg: "bg-blue-50 dark:bg-blue-950/30", 
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
    hover: "hover:border-blue-400 dark:hover:border-blue-600"
  },
  "AI Marketing": { 
    bg: "bg-purple-50 dark:bg-purple-950/30", 
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
    hover: "hover:border-purple-400 dark:hover:border-purple-600"
  },
  "Chatbot Development": { 
    bg: "bg-green-50 dark:bg-green-950/30", 
    text: "text-green-700 dark:text-green-300",
    border: "border-green-200 dark:border-green-800",
    hover: "hover:border-green-400 dark:hover:border-green-600"
  },
  "Bilingual Chatbots": { 
    bg: "bg-teal-50 dark:bg-teal-950/30", 
    text: "text-teal-700 dark:text-teal-300",
    border: "border-teal-200 dark:border-teal-800",
    hover: "hover:border-teal-400 dark:hover:border-teal-600"
  },
  "Spanish Marketing": { 
    bg: "bg-red-50 dark:bg-red-950/30", 
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-800",
    hover: "hover:border-red-400 dark:hover:border-red-600"
  },
  "Industry Solutions": { 
    bg: "bg-indigo-50 dark:bg-indigo-950/30", 
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-800",
    hover: "hover:border-indigo-400 dark:hover:border-indigo-600"
  },
  "Case Studies": { 
    bg: "bg-yellow-50 dark:bg-yellow-950/30", 
    text: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-200 dark:border-yellow-800",
    hover: "hover:border-yellow-400 dark:hover:border-yellow-600"
  },
};

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const featuredPages = getFeaturedPages();

  const filteredPages = useMemo(() => {
    let pages = selectedCategory 
      ? getPagesByCategory(selectedCategory)
      : allSeoPages;
    
    if (searchQuery.trim()) {
      pages = searchPages(searchQuery).filter(page => 
        selectedCategory ? page.category === selectedCategory : true
      );
    }

    return pages;
  }, [selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 sm:pt-28 sm:pb-16 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              {totalPageCount} Expert Resources
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
              Bilingual Marketing &
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> AI Resources</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Expert guides on bilingual advertising, Hispanic market insights, AI marketing automation, and chatbot development. Your comprehensive resource for reaching Spanish-speaking audiences.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-6 border-b border-neutral-200 dark:border-neutral-800 sticky top-16 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              }`}
            >
              All ({totalPageCount})
            </button>
            {categories.map((category) => {
              const count = getPagesByCategory(category.name).length;
              return (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.name
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : `${categoryColors[category.name].bg} ${categoryColors[category.name].text}`
                  }`}
                >
                  {categoryIcons[category.name]}
                  {category.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Active Filters */}
        {(selectedCategory || searchQuery) && (
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Showing {filteredPages.length} results
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Featured Section - Only show when no filters */}
        {!selectedCategory && !searchQuery && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Featured Resources
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPages.map((page) => {
                const colors = categoryColors[page.category];
                return (
                  <Link
                    key={page.slug}
                    href={`/resources/${page.slug}`}
                    className={`group relative block p-6 rounded-2xl border-2 ${colors.border} ${colors.hover} ${colors.bg} transition-all duration-200 hover:shadow-xl`}
                  >
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                    <div className={`inline-flex items-center gap-2 ${colors.text} mb-4`}>
                      {categoryIcons[page.category]}
                      <span className="text-sm font-medium">{page.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {page.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-4">
                      {page.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <span>{page.readTime}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Category Sections or Filtered Results */}
        {selectedCategory || searchQuery ? (
          // Filtered Results Grid
          <section>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPages.map((page) => {
                const colors = categoryColors[page.category];
                return (
                  <Link
                    key={page.slug}
                    href={`/resources/${page.slug}`}
                    className={`group block p-5 rounded-xl border ${colors.border} ${colors.hover} bg-white dark:bg-neutral-800/50 transition-all duration-200 hover:shadow-lg`}
                  >
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${colors.bg} ${colors.text} mb-3`}>
                      {categoryIcons[page.category]}
                      {page.category}
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                      {page.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {page.excerpt}
                    </p>
                  </Link>
                );
              })}
            </div>

            {filteredPages.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-neutral-600 dark:text-neutral-400">
                  No resources found matching your criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                >
                  Clear filters and show all
                </button>
              </div>
            )}
          </section>
        ) : (
          // Category Sections
          categories.map((category) => {
            const categoryPages = getPagesByCategory(category.name).slice(0, 4);
            const totalInCategory = getPagesByCategory(category.name).length;
            const colors = categoryColors[category.name];

            return (
              <section key={category.slug} className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${colors.bg} ${colors.text}`}>
                      {categoryIcons[category.name]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {category.name}
                      </h2>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {totalInCategory} resources
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(category.name)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {categoryPages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/resources/${page.slug}`}
                      className={`group block p-5 rounded-xl border ${colors.border} ${colors.hover} bg-white dark:bg-neutral-800/50 transition-all duration-200 hover:shadow-lg`}
                    >
                      <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                        {page.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                        {page.excerpt}
                      </p>
                      <div className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                        {page.readTime}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })
        )}

        {/* CTA Section */}
        <section className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Reach Hispanic Markets?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Let our team help you implement bilingual advertising strategies and AI-powered marketing solutions that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"
            >
              Get a Free Consultation
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

