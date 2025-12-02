import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, getAllSlugs } from "@/lib/seoPages";
import SeoPageTemplate from "@/components/SeoPageTemplate";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all 200 pages
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    authors: [{ name: "Abe Media" }],
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "article",
      publishedTime: page.publishedDate,
      modifiedTime: page.updatedDate,
      authors: ["Abe Media"],
      tags: page.keywords,
      siteName: "Abe Media",
      locale: "en_US",
      url: `https://abemedia.online/resources/${page.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
    alternates: {
      canonical: `https://abemedia.online/resources/${page.slug}`,
    },
  };
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // Article structured data for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.metaDescription,
    datePublished: page.publishedDate,
    dateModified: page.updatedDate,
    author: {
      "@type": "Organization",
      name: "Abe Media",
      url: "https://abemedia.online",
    },
    publisher: {
      "@type": "Organization",
      name: "Abe Media",
      url: "https://abemedia.online",
      logo: {
        "@type": "ImageObject",
        url: "https://abemedia.online/images/portfolio/abemedia.black.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://abemedia.online/resources/${page.slug}`,
    },
    keywords: page.keywords.join(", "),
    articleSection: page.category,
    inLanguage: "en-US",
  };

  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://abemedia.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: "https://abemedia.online/resources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.category,
        item: `https://abemedia.online/resources?category=${encodeURIComponent(page.category)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: page.title,
        item: `https://abemedia.online/resources/${page.slug}`,
      },
    ],
  };

  // FAQ structured data from content sections
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.content.sections.map((section) => ({
      "@type": "Question",
      name: section.heading,
      acceptedAnswer: {
        "@type": "Answer",
        text: section.content,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SeoPageTemplate page={page} />
    </>
  );
}

