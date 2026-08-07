import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { industryPages } from "@/content/discoverability";
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({ title: "Service-Business Industries | Abe Media", description: "Operational software and automation for logistics, junk removal, turf and landscaping, home services, waste hauling, and moving companies.", path: "/industries", locale, hasSpanishEquivalent: false, noIndex: locale !== "en" });
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Industries</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-medium tracking-[-0.035em] md:text-6xl">Software shaped by the operation, not an industry label</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">These pages focus on workflows Abe Media has direct experience building or operating. Each one covers the exceptions, handoffs, and proof relevant to that work.</p>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {Object.values(industryPages).map((page) => (
            <Link key={page.slug} href={`/en/industries/${page.slug}`} className="group rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/50">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{page.eyebrow}</p>
              <h2 className="mt-4 text-2xl font-medium tracking-[-0.02em]">{page.title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{page.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold">Explore the workflow <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
