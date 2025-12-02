"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import SlidingHighlightGrid from "@/components/SlidingHighlightGrid";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

interface BlogCardsGridProps {
  posts: BlogPost[];
}

export default function BlogCardsGrid({ posts }: BlogCardsGridProps) {
  return (
    <SlidingHighlightGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full">
            <div className="relative h-48">
              <Image 
                src={post.image} 
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-6">
              <Badge variant="outline" className="mb-3">
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
                  {new Date(post.date).toLocaleDateString()}
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

