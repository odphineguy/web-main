export type PageCategory =
  | "Bilingual Advertising"
  | "Hispanic Market"
  | "AI Marketing"
  | "Chatbot Development"
  | "Bilingual Chatbots"
  | "Spanish Marketing"
  | "Industry Solutions"
  | "Case Studies";

export interface SeoPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: PageCategory;
  excerpt: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      content: string;
    }[];
    conclusion: string;
  };
  relatedSlugs: string[];
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  featured?: boolean;
}

export interface CategoryInfo {
  name: PageCategory;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: CategoryInfo[] = [
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
    color: "blue",
  },
  {
    name: "AI Marketing",
    slug: "ai-marketing",
    description: "Leverage artificial intelligence to automate, optimize, and scale your marketing efforts.",
    icon: "brain",
    color: "purple",
  },
  {
    name: "Chatbot Development",
    slug: "chatbot-development",
    description: "Build powerful chatbots that engage customers, capture leads, and automate support.",
    icon: "bot",
    color: "green",
  },
  {
    name: "Bilingual Chatbots",
    slug: "bilingual-chatbots",
    description: "Create chatbots that seamlessly communicate in both English and Spanish.",
    icon: "message-circle",
    color: "teal",
  },
  {
    name: "Spanish Marketing",
    slug: "spanish-marketing",
    description: "Strategies and tactics for marketing effectively to Spanish-speaking audiences.",
    icon: "globe",
    color: "red",
  },
  {
    name: "Industry Solutions",
    slug: "industry-solutions",
    description: "Industry-specific bilingual marketing and AI solutions for your sector.",
    icon: "building",
    color: "indigo",
  },
  {
    name: "Case Studies",
    slug: "case-studies",
    description: "Real success stories from businesses that transformed with bilingual marketing and AI.",
    icon: "trophy",
    color: "yellow",
  },
];

