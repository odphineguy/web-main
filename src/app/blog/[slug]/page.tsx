import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPageBySlug, getAllBlogSlugs } from "@/lib/blogPages";
import BlogPageTemplate from "@/components/BlogPageTemplate";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all blog pages
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getBlogPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  // Use image from JSON if available
  const imageUrl = page.image?.url 
    ? (page.image.url.startsWith('http') ? page.image.url : `https://abemedia.online${page.image.url}`)
    : undefined;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    authors: [{ name: page.author || "Abe Media" }],
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "article",
      publishedTime: page.publishedDate,
      modifiedTime: page.updatedDate,
      authors: [page.author || "Abe Media"],
      tags: page.keywords,
      siteName: "Abe Media",
      locale: "en_US",
      url: `https://abemedia.online/blog/${page.slug}`,
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: page.image?.width || 1200,
            height: page.image?.height || 630,
            alt: page.image?.alt || page.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      ...(imageUrl && { images: [imageUrl] }),
    },
    alternates: {
      canonical: `https://abemedia.online/blog/${page.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getBlogPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // Use pre-built schema from JSON if available, otherwise generate
  const articleSchema = page.schema || {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.metaDescription,
    datePublished: page.publishedDate,
    dateModified: page.updatedDate,
    author: {
      "@type": "Organization",
      name: page.author || "Abe Media",
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
      "@id": `https://abemedia.online/blog/${page.slug}`,
    },
    keywords: page.keywords.join(", "),
    articleSection: page.category,
    inLanguage: "en-US",
    ...(page.image && {
      image: page.image.url.startsWith('http') ? page.image.url : `https://abemedia.online${page.image.url}`,
    }),
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
        name: "Blog",
        item: "https://abemedia.online/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: `https://abemedia.online/blog/${page.slug}`,
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
      <BlogPageTemplate page={page} />
    </>
  );
}

