"use client";

import Link from "next/link";
import Image from "next/image";
import { SeoPage, getRelatedPages } from "@/lib/seoPages";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ChevronRight,
  Megaphone,
  Users,
  Brain,
  Bot,
  MessageCircle,
  Globe,
  Building,
  Trophy,
  User
} from "lucide-react";

interface SeoPageTemplateProps {
  page: SeoPage;
}

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

const categoryColors: Record<string, string> = {
  "Bilingual Advertising": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "Hispanic Market": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "AI Marketing": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "Chatbot Development": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Bilingual Chatbots": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  "Spanish Marketing": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "Industry Solutions": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  "Case Studies": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
};

export default function SeoPageTemplate({ page }: SeoPageTemplateProps) {
  const relatedPages = getRelatedPages(page.slug);

  // Use custom CTA from JSON or fallback to defaults
  const ctaText = page.cta?.text || "Ready to Get Started?";
  const ctaButtonText = page.cta?.buttonText || "Contact Us";
  const ctaLink = page.cta?.link || "/contact";

  return (
    <article className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Link 
              href="/resources" 
              className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Resources
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-400 dark:text-neutral-500">{page.category}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="pt-12 pb-8 sm:pt-16 sm:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${categoryColors[page.category]}`}>
              {categoryIcons[page.category]}
              {page.category}
            </span>
            {page.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 dark:from-amber-900/30 dark:to-orange-900/30 dark:text-amber-300">
                <Trophy className="w-4 h-4" />
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white leading-tight mb-6">
            {page.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            {page.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {page.author}
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={page.publishedDate}>
                {new Date(page.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {page.readTime}
            </div>
          </div>

          {/* Excerpt */}
          <p className="mt-6 text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {page.excerpt}
          </p>
        </div>
      </header>

      {/* Featured Image */}
      {page.image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={page.image.url}
              alt={page.image.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-6 sm:p-8 mb-10 border border-neutral-200 dark:border-neutral-700">
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed m-0 text-lg">
              {page.content.intro}
            </p>
          </div>

          {/* Content Sections */}
          {page.content.sections.map((section, index) => (
            <section key={index} className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-lg font-bold">
                  {index + 1}
                </span>
                {section.heading}
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}

          {/* Conclusion */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-2xl p-6 sm:p-8 mt-12 border border-blue-100 dark:border-blue-900">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
              Key Takeaway
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed m-0">
              {page.content.conclusion}
            </p>
          </div>
        </div>

        {/* Keywords/Tags */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
            Related Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {page.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1.5 rounded-full text-sm bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedPages.length > 0 && (
          <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <h4 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
              Continue Reading
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPages.map((relatedPage) => (
                <Link
                  key={relatedPage.slug}
                  href={`/resources/${relatedPage.slug}`}
                  className="group block p-5 rounded-xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-200"
                >
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${categoryColors[relatedPage.category]} mb-3`}>
                    {categoryIcons[relatedPage.category]}
                    {relatedPage.category}
                  </span>
                  <h5 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {relatedPage.title}
                  </h5>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {relatedPage.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section - Uses custom CTA from JSON or defaults */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {ctaText}
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Let us help you implement {page.category.toLowerCase()} strategies that drive results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
            >
              {ctaButtonText}
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"
            >
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}