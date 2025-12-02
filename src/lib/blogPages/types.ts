export type BlogCategory =
  | "Web Development"
  | "Mobile Development"
  | "Design"
  | "Performance"
  | "Accessibility";

export interface BlogPageImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface BlogPageCta {
  text: string;
  buttonText: string;
  link: string;
}

export interface BlogPageContent {
  intro: string;
  sections: {
    heading: string;
    content: string;
  }[];
  conclusion: string;
}

// JSON format from the blog pages file
export interface BlogPageJson {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
  publishedDate: string;
  category: BlogCategory;
  image: BlogPageImage;
  content: BlogPageContent;
  schema: Record<string, unknown>;
  relatedPages: string[];
  cta: BlogPageCta;
}

// Normalized format used in the application (with computed fields)
export interface BlogPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  keywords: string[];
  category: BlogCategory;
  author: string;
  excerpt: string;
  content: BlogPageContent;
  relatedSlugs: string[];
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  featured?: boolean;
  image?: BlogPageImage;
  cta?: BlogPageCta;
  schema?: Record<string, unknown>;
}

export interface BlogCategoryInfo {
  name: BlogCategory;
  slug: string;
  description: string;
}

export const blogCategories: BlogCategoryInfo[] = [
  {
    name: "Web Development",
    slug: "web-development",
    description: "Insights and best practices for modern web development.",
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    description: "Building cross-platform and native mobile applications.",
  },
  {
    name: "Design",
    slug: "design",
    description: "UI/UX design principles and visual design trends.",
  },
  {
    name: "Performance",
    slug: "performance",
    description: "Optimizing websites and applications for speed.",
  },
  {
    name: "Accessibility",
    slug: "accessibility",
    description: "Creating inclusive web experiences for all users.",
  },
];

