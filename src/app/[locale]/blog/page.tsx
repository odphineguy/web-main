import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { constructMetadata } from "@/lib/seo";
import { blogPosts } from "@/content/blog";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Blog | AbeMedia — AI Agents and Operations for Service Businesses",
    description:
      "Field notes on AI lead response, voice agents, and dispatch operations — written from a live production deployment, with real client numbers.",
    path: "/blog",
    locale,
    hasSpanishEquivalent: false,
    noIndex: locale !== "en",
  });
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00.000Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://abemedia.online/en/blog#blog",
    name: "AbeMedia Blog",
    description: "Field notes on AI lead response, voice agents, and dispatch operations for service businesses.",
    publisher: { "@id": "https://abemedia.online/#organization" },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `https://abemedia.online/en/blog/${post.slug}#article`,
      headline: post.title,
      url: `https://abemedia.online/en/blog/${post.slug}`,
      datePublished: post.datePublished,
    })),
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Blog</p>
          <h1 className="mt-5 text-4xl font-medium tracking-[-0.035em] md:text-6xl">Notes from a live AI operation</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            AI lead response, voice agents, and dispatch systems — written from production deployments with real client
            numbers, not vendor hypotheticals.
          </p>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/en/blog/${post.slug}`}
              className="group rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{post.category}</p>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.02em] md:text-3xl">{post.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{post.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>{formatDate(post.datePublished)}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readMinutes}-minute read</span>
                <span className="ml-auto inline-flex items-center gap-2 font-semibold text-primary">
                  Read the post <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-12 text-sm leading-6 text-muted-foreground">
          More posts are on the way. For the systems behind them, see{" "}
          <Link href="/en/services" className="font-semibold text-primary">services</Link> or{" "}
          <Link href="/en/how-it-works" className="font-semibold text-primary">how it works</Link>.
        </p>
      </section>
    </main>
  );
}
