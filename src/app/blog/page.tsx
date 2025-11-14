import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Web Development & Design Insights | Abe Media",
  description: "Latest insights on web development, design trends, AI chatbots, bilingual websites, and digital innovation for small businesses. Expert tips and tutorials.",
  keywords: ["web development blog", "design trends", "AI chatbots", "bilingual websites", "small business tips", "digital innovation", "website optimization"],
  alternates: {
    canonical: "https://abemedia.online/blog",
  },
  openGraph: {
    title: "Blog — Web Development & Design Insights | Abe Media",
    description: "Latest insights on web development, design trends, AI chatbots, bilingual websites, and digital innovation for small businesses.",
    url: "https://abemedia.online/blog",
  },
  twitter: {
    title: "Blog — Web Development & Design Insights | Abe Media",
    description: "Latest insights on web development, design trends, AI chatbots, bilingual websites, and digital innovation for small businesses.",
  },
};

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt: "Explore the latest trends shaping the web development landscape, from AI integration to performance optimization.",
    category: "Web Development",
    date: "2025-01-15",
    readTime: "5 min read",
    image: "/images/portfolio/smart-website.png",
    featured: true
  },
  {
    id: 2,
    title: "Building Responsive Mobile Apps with React Native",
    excerpt: "Learn best practices for creating cross-platform mobile applications that work seamlessly on both iOS and Android.",
    category: "Mobile Development",
    date: "2025-01-10",
    readTime: "7 min read",
    image: "/images/portfolio/agua-app-carousel.png",
    featured: false
  },
  {
    id: 3,
    title: "UI/UX Design Principles for Modern Web Applications",
    excerpt: "Discover essential design principles that create engaging and user-friendly web experiences.",
    category: "Design",
    date: "2025-01-05",
    readTime: "6 min read",
    image: "/images/portfolio/green-website.png",
    featured: false
  },
  {
    id: 4,
    title: "Optimizing Website Performance: A Complete Guide",
    excerpt: "Learn how to improve your website's loading speed and overall performance for better user experience.",
    category: "Performance",
    date: "2024-12-28",
    readTime: "8 min read",
    image: "/images/portfolio/solar-website.png",
    featured: false
  },
  {
    id: 5,
    title: "The Importance of Accessibility in Web Design",
    excerpt: "Understanding web accessibility standards and how to implement them in your projects.",
    category: "Accessibility",
    date: "2024-12-20",
    readTime: "4 min read",
    image: "/images/portfolio/barbershop-website.png",
    featured: false
  },
  {
    id: 6,
    title: "Getting Started with Next.js 14: New Features and Improvements",
    excerpt: "Explore the latest features in Next.js 14 and how they can improve your development workflow.",
    category: "Web Development",
    date: "2024-12-15",
    readTime: "6 min read",
    image: "/images/portfolio/yummy-website.png",
    featured: false
  }
];

const categories = ["All", "Web Development", "Mobile Development", "Design", "Performance", "Accessibility"];

export default function Blog() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="pt-8 md:pt-12 pb-4 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Our <span className="text-orange-500">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto font-light">
            Insights, tutorials, and thoughts on web development, design, and digital innovation.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={category === "All" ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  category === "All" 
                    ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500" 
                    : "hover:bg-orange-500 hover:text-white hover:border-orange-500"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Featured Post</h2>
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-4">
                    {featuredPost.category}
                  </Badge>
                  <CardTitle className="text-2xl mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription className="text-base mb-6">
                    {featuredPost.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
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
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
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
                  <CardTitle className="text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
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
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest insights and updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border border-input bg-background text-sm"
            />
            <Button className="px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
