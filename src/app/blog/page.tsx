"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  X, 
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
  Tag,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import BlogCardsGrid from "@/components/BlogCardsGrid";
import { 
  allBlogPages, 
  blogCategories, 
  getBlogPagesByCategory,
  searchBlogPages,
  totalBlogPageCount,
  BlogCategory
} from "@/lib/blogPages";

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

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Get featured post (first post with featured flag, or just the first post)
  const featuredPost = useMemo(() => {
    const featured = allBlogPages.find(post => post.featured);
    return featured || allBlogPages[0];
  }, []);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    let posts = selectedCategory 
      ? getBlogPagesByCategory(selectedCategory)
      : allBlogPages;
    
    if (searchQuery.trim()) {
      posts = searchBlogPages(searchQuery).filter(page => 
        selectedCategory ? page.category === selectedCategory : true
      );
    }

    // Exclude featured post from the regular grid when no filters
    if (!selectedCategory && !searchQuery && featuredPost) {
      posts = posts.filter(post => post.slug !== featuredPost.slug);
    }

    return posts;
  }, [selectedCategory, searchQuery, featuredPost]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 md:pt-12 pb-12 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto font-light">
              Insights, tutorials, and resources on web development, design, AI marketing, bilingual advertising, and digital innovation for your business.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search articles and resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-700 bg-neutral-800/50 backdrop-blur-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-700 transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="relative z-10 py-6 border-b border-neutral-800 sticky top-16 bg-neutral-900/80 backdrop-blur-lg z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Left scroll button */}
          <button
            onClick={() => scrollCategories('left')}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 shadow-md border border-neutral-700 hover:bg-neutral-700 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          
          {/* Right scroll button */}
          <button
            onClick={() => scrollCategories('right')}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 shadow-md border border-neutral-700 hover:bg-neutral-700 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          {/* Left fade gradient */}
          <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-8 bg-gradient-to-r from-neutral-900/90 to-transparent pointer-events-none z-10" />
          
          {/* Right fade gradient */}
          <div className="absolute right-8 sm:right-10 top-0 bottom-0 w-8 bg-gradient-to-l from-neutral-900/90 to-transparent pointer-events-none z-10" />
          
          <div 
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mx-10 sm:mx-12"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-white text-neutral-900"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              All ({totalBlogPageCount})
            </button>
            {blogCategories.map((category) => {
              const count = getBlogPagesByCategory(category.name).length;
              if (count === 0) return null; // Hide empty categories
              return (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.name
                      ? "bg-white text-neutral-900"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  }`}
                >
                  {getIcon(category.name)}
                  {category.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Active Filters */}
        {(selectedCategory || searchQuery) && (
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm text-neutral-400">
              Showing {filteredPosts.length} results
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-orange-400 hover:text-orange-300 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Featured Post - Only show when no filters */}
        {!selectedCategory && !searchQuery && featuredPost && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-orange-500" />
              Featured Article
            </h2>
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {featuredPost.image && (
                    <div className="relative h-64 lg:h-auto min-h-[300px]">
                      <Image 
                        src={featuredPost.image.url} 
                        alt={featuredPost.image.alt || featuredPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge 
                      className="w-fit mb-4 inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800"
                    >
                      {getIcon(featuredPost.category)}
                      {featuredPost.category}
                    </Badge>
                    <CardTitle className="text-2xl mb-4 group-hover:text-orange-500 transition-colors">
                      {featuredPost.title}
                    </CardTitle>
                    <CardDescription className="text-base mb-6">
                      {featuredPost.excerpt}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.publishedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Button className="w-fit group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section>
          {!selectedCategory && !searchQuery && (
            <h2 className="text-2xl font-bold text-white mb-8">
              Latest Articles
            </h2>
          )}
          
          {filteredPosts.length > 0 ? (
            <BlogCardsGrid posts={filteredPosts} />
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-neutral-400">
                No articles found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-orange-400 hover:text-orange-300 font-medium"
              >
                Clear filters and show all
              </button>
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="mt-20 pb-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-2xl p-px bg-gradient-to-r from-white/10 via-white/5 to-white/10">
              <div className="rounded-2xl p-8 lg:p-10 backdrop-blur-xl bg-neutral-900/50">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Stay Updated
                </h2>
                <p className="text-neutral-400 mb-6">
                  Subscribe to our newsletter for the latest insights, tutorials, and resources on web development and digital marketing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3.5 rounded-full border border-neutral-700 bg-neutral-800/50 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <Button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
