import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { blogPosts } from "@/content/blog";
import PageShell from "@/components/ds/PageShell";
import PageHero from "@/components/ds/PageHero";
import Section from "@/components/ds/Section";
import DsCard from "@/components/ds/Card";

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
  new Date(`${iso}T00:00:00.000Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

const rail = [
  { id: "overview", label: "Overview" },
  { id: "field-notes", label: "Field notes" },
];

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
    <PageShell railCap="BLOG" railItems={rail}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />

      <div id="overview">
        <PageHero
          eyebrow="Field notes"
          title={
            <>
              Notes from a <span className="text-[var(--ds-accent)]">live AI operation.</span>
            </>
          }
          lede="AI lead response, voice agents, and dispatch systems—written from production deployments with real client numbers, not vendor hypotheticals."
        />
      </div>

      <Section id="field-notes" eyebrow="Latest" title="From the field">
        <div className="grid gap-px bg-[var(--ds-line-soft)]">
          {blogPosts.map((post, index) => (
            <DsCard
              key={post.slug}
              index={index}
              eyebrow={`${post.category} · ${formatDate(post.datePublished)} · ${post.readMinutes} min read`}
              title={post.title}
              description={post.description}
              href={`/en/blog/${post.slug}`}
              cta="Read the field note"
              className="blog-index-card min-h-64"
            />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
