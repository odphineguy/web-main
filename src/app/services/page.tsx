import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Code, Palette, Smartphone, Globe, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Professional design and development services for web and mobile applications.",
};

const services = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Web Development",
    description: "Custom websites built with modern technologies like Next.js, React, and TypeScript.",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Fast Loading Times",
      "Cross-Browser Compatibility"
    ]
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: [
      "React Native Development",
      "iOS & Android Apps",
      "App Store Optimization",
      "Push Notifications"
    ]
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UI/UX Design",
    description: "Beautiful, intuitive user interfaces that enhance user experience.",
    features: [
      "User Research",
      "Wireframing & Prototyping",
      "Visual Design",
      "Usability Testing"
    ]
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "Custom Solutions",
    description: "Tailored software solutions to meet your specific business needs.",
    features: [
      "API Development",
      "Database Design",
      "Third-party Integrations",
      "Maintenance & Support"
    ]
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Performance Optimization",
    description: "Speed up your applications and improve user experience.",
    features: [
      "Code Optimization",
      "Image Optimization",
      "Caching Strategies",
      "Performance Monitoring"
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="pt-8 md:pt-12 pb-12 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Our <span className="text-orange-500">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto font-light">
            We provide comprehensive design and development services to bring your digital vision to life.
          </p>
          <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="text-primary mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Maker Section */}
      <section className="py-16 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Create Your Logo with Our <span className="text-primary">AI Logo Maker</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Design professional logos in minutes with our advanced logo maker. Choose from thousands of unique fonts, icons, and color combinations to create a brand that stands out.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                  <span>Unlimited logo variations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                  <span>Custom fonts and icons</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                  <span>Instant brand kit generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                  <span>High-resolution downloads</span>
                </div>
              </div>
              <Link href="/logo-maker">
                <Button size="lg" className="text-lg px-8 flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Try Logo Maker Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6 border">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Logo Maker Preview</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Your Brand</div>
                  <div className="text-sm text-muted-foreground">Professional logo design in seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          {/* Empty placeholder section */}
        </div>
      </section>
    </div>
  );
}
