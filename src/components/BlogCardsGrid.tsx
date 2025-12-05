"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
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
import SlidingHighlightGrid from "@/components/SlidingHighlightGrid";
import { BlogPage, BlogCategory } from "@/lib/blogPages";

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

interface BlogCardsGridProps {
  posts: BlogPage[];
}

export default function BlogCardsGrid({ posts }: BlogCardsGridProps) {
  return (
    <SlidingHighlightGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full bg-black border-neutral-800">
            {post.image && (
              <div className="relative h-48">
                <Image 
                  src={post.image.url} 
                  alt={post.image.alt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
            <CardContent className="p-6">
              <Badge 
                variant="outline" 
                className="mb-3 inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800"
              >
                {getIcon(post.category)}
                {post.category}
              </Badge>
              <CardTitle className="text-lg mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription className="mb-4 line-clamp-3">
                {post.excerpt}
              </CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
              <Button variant="ghost" className="p-0 h-auto group">
                Read More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </SlidingHighlightGrid>
  );
}
