import EstablishedContentPage from "@/components/EstablishedContentPage";
import type { ContentPageData } from "@/content/discoverability";

const data: ContentPageData = {
  slug: "bilingual-seo-phoenix",
  kind: "service",
  eyebrow: "Bilingual SEO Phoenix",
  title: "Bilingual SEO for Phoenix local businesses",
  metaTitle: "Bilingual SEO Phoenix | English & Spanish SEO | Abe Media",
  description: "English and Spanish local SEO for Phoenix service businesses, including language-specific search strategy, technical structure, and local visibility.",
  intro: "Reach Phoenix customers searching in English or Spanish with separate keyword strategy, useful local content, and a technical structure search engines can understand.",
  goodFit: [
    "Customers search for your services in English and Spanish",
    "Spanish pages exist but do not attract qualified traffic",
    "Translation is being mistaken for search strategy",
    "Language URLs, canonicals, or hreflang need cleanup",
  ],
  sections: [
    {
      title: "Language-specific search strategy",
      body: "English and Spanish customers often use different terms and phrasing for the same service.",
      items: [
        "Separate keyword research by language",
        "Phoenix and service-area intent",
        "Human-written page copy",
        "Useful internal linking",
      ],
    },
    {
      title: "Technical language structure",
      body: "Each language needs a clear, crawlable home with consistent signals.",
      items: [
        "Clean /en/ and /es/ URLs",
        "Correct hreflang relationships",
        "Self-referencing canonicals",
        "Indexable language navigation",
      ],
    },
    {
      title: "Local visibility",
      body: "Local pages should help a customer choose the business, not repeat a city name for search engines.",
      items: [
        "Phoenix-focused service content",
        "Google Business Profile alignment",
        "Consistent business information",
        "No thin or duplicated city pages",
      ],
    },
  ],
  processTitle: "Build each language as a complete search path",
  process: [
    { title: "Audit", body: "Review search demand, current rankings, page quality, and technical language signals." },
    { title: "Map", body: "Assign English and Spanish intent to the right service and location pages." },
    { title: "Build", body: "Write useful pages and implement the language structure search engines need." },
    { title: "Measure", body: "Track qualified visibility and inquiries by language instead of counting translated pages." },
  ],
  proofTitle: "Translation alone is not bilingual SEO",
  proof: "A translated page can still miss the words customers use, point its canonical to the wrong URL, or remain hidden behind a language switcher. The work has to connect language-specific intent, useful content, local context, and clean technical signals.",
  faqs: [
    { question: "Do we need a separate page for every service in Spanish?", answer: "Only when the page serves real search and customer intent. Start with the services and locations that matter most, then expand based on evidence rather than duplicating the entire site at once." },
    { question: "Can we use automatic translation?", answer: "Automatic translation can support a draft, but customer-facing pages need human review for meaning, local phrasing, service terminology, and the actual questions Spanish-speaking customers ask." },
    { question: "Will English and Spanish pages compete with each other?", answer: "They should not when URLs, canonicals, hreflang, navigation, and page intent are implemented correctly. Each page should clearly identify its language and purpose." },
  ],
  related: [
    { href: "/en/services/bilingual-ai-automation", label: "Bilingual automation", description: "Carry English and Spanish beyond search into intake, booking, and customer handoffs." },
    { href: "/en/services/ai-voice-agents", label: "AI voice agents", description: "Use English and Spanish call paths for intake, booking, and human escalation." },
    { href: "/en/contact", label: "Let’s talk", description: "Review the current site, language structure, and highest-value search gaps." },
  ],
};

export default function BilingualSEOPhoenixPage() {
  return <EstablishedContentPage data={data} path="/en/bilingual-seo-phoenix" locale="en" />;
}
