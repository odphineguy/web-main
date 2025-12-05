// Combined categories from Blog and SEO/Resources pages
export type BlogCategory =
  // Original Blog categories
  | "Web Development"
  | "Mobile Development"
  | "Design"
  | "Performance"
  | "Accessibility"
  // SEO/Resources categories (merged)
  | "Bilingual Advertising"
  | "Hispanic Market"
  | "AI Marketing"
  | "Chatbot Development"
  | "Bilingual Chatbots"
  | "Spanish Marketing"
  | "Industry Solutions"
  | "Case Studies";

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

// JSON format from the blog/seo pages files
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
  icon?: string;
  color?: string;
}

// All categories combined with icons and colors
export const blogCategories: BlogCategoryInfo[] = [
  // Original Blog categories
  {
    name: "Web Development",
    slug: "web-development",
    description: "Insights and best practices for modern web development.",
    icon: "code",
    color: "orange",
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    description: "Building cross-platform and native mobile applications.",
    icon: "smartphone",
    color: "orange",
  },
  {
    name: "Design",
    slug: "design",
    description: "UI/UX design principles and visual design trends.",
    icon: "palette",
    color: "orange",
  },
  {
    name: "Performance",
    slug: "performance",
    description: "Optimizing websites and applications for speed.",
    icon: "zap",
    color: "orange",
  },
  {
    name: "Accessibility",
    slug: "accessibility",
    description: "Creating inclusive web experiences for all users.",
    icon: "eye",
    color: "orange",
  },
  // SEO/Resources categories
  {
    name: "Bilingual Advertising",
    slug: "bilingual-advertising",
    description: "Master the art of reaching English and Spanish-speaking audiences with effective bilingual advertising strategies.",
    icon: "megaphone",
    color: "orange",
  },
  {
    name: "Hispanic Market",
    slug: "hispanic-market",
    description: "Deep insights into Hispanic and Latino consumer behavior, demographics, and market opportunities.",
    icon: "users",
    color: "orange",
  },
  {
    name: "AI Marketing",
    slug: "ai-marketing",
    description: "Leverage artificial intelligence to automate, optimize, and scale your marketing efforts.",
    icon: "brain",
    color: "neutral",
  },
  {
    name: "Chatbot Development",
    slug: "chatbot-development",
    description: "Build powerful chatbots that engage customers, capture leads, and automate support.",
    icon: "bot",
    color: "neutral",
  },
  {
    name: "Bilingual Chatbots",
    slug: "bilingual-chatbots",
    description: "Create chatbots that seamlessly communicate in both English and Spanish.",
    icon: "message-circle",
    color: "orange",
  },
  {
    name: "Spanish Marketing",
    slug: "spanish-marketing",
    description: "Strategies and tactics for marketing effectively to Spanish-speaking audiences.",
    icon: "globe",
    color: "orange",
  },
  {
    name: "Industry Solutions",
    slug: "industry-solutions",
    description: "Industry-specific bilingual marketing and AI solutions for your sector.",
    icon: "building",
    color: "neutral",
  },
  {
    name: "Case Studies",
    slug: "case-studies",
    description: "Real success stories from businesses that transformed with bilingual marketing and AI.",
    icon: "trophy",
    color: "orange",
  },
];
