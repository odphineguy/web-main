import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { faqsEs } from "@/content/discoverability.es";
import { constructMetadata } from "@/lib/seo";

const faqsEn = [
  { q: "What does an AI voice agent cost?", a: "Cost depends on call volume, integrations, languages, booking logic, and support requirements. Abe Media scopes the actual call flow first, then provides the implementation and ongoing costs before work begins." },
  { q: "Can the agent speak English and Spanish naturally?", a: "Yes. The English and Spanish paths are written and tested as complete customer journeys, including qualification, confirmations, errors, escalation, and CRM output—not translated as an afterthought." },
  { q: "Can it book jobs and update our existing CRM?", a: "Often, yes. Abe Media verifies the calendar and CRM's supported APIs, defines which system owns each field, and designs retry and exception behavior before enabling writes." },
  { q: "What happens when the AI is uncertain or a caller asks for a person?", a: "The agent follows the approved fallback: transfer, take a message, or flag the interaction for human review. It should not invent an answer or continue beyond its permitted scope." },
  { q: "Can Abe Media integrate with our existing software?", a: "Yes, when the vendor provides an authorized integration path. Access, rate limits, data ownership, retries, and failure visibility are validated during scoping." },
  { q: "How long does a pilot take?", a: "The timeline depends on workflow complexity, integration access, content approval, and testing. A focused pilot is scoped around one measurable workflow, and the timeline is agreed before payment or development." },
  { q: "When should a business use custom software instead of another SaaS subscription?", a: "Use SaaS when a standard product represents the workflow well. Consider custom software when a proven, important process cannot be modeled safely, or repeated manual handoffs create a durable operating cost." },
  { q: "Who owns the code and data?", a: "Code ownership, data ownership, hosting accounts, third-party services, and handoff terms are stated in the project agreement before development begins." },
  { q: "What monitoring, logs, retries, and human review are included?", a: "Those controls are designed for the workflow. Production automations should record key events, retry only safe actions, prevent duplicates, alert on failures, and route low-confidence decisions to a person." },
  { q: "What service businesses are a good fit?", a: "The strongest fit has repeatable intake or operations, enough volume for handoffs to matter, clear business rules, and a person who can own exceptions. Abe Media has direct experience in transportation, waste operations, moving, junk removal, turf, and related home services." },
];

const faqMeta = {
  en: { title: "AI Agents & Operations Software FAQ | Abe Media", description: "Direct answers about AI voice agents, integrations, bilingual flows, pilots, monitoring, custom software, code ownership, and human escalation." },
  es: { title: "Preguntas Frecuentes sobre Agentes de IA y Software de Operaciones | Abe Media", description: "Respuestas directas sobre agentes de voz con IA, integraciones, flujos bilingues, pilotos, monitoreo, software a la medida, propiedad del codigo y escalamiento humano." },
};

const faqCopy = {
  en: { eyebrow: "Straight answers", title: "Before you put an agent on the phones." },
  es: { eyebrow: "Respuestas directas", title: "Antes de poner un agente en tus teléfonos." },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = locale === "es" ? faqMeta.es : faqMeta.en;
  return constructMetadata({ title: m.title, description: m.description, path: "/faq", locale, hasSpanishEquivalent: true });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") notFound();

  const faqs = locale === "es" ? faqsEs : faqsEn;
  const copy = locale === "es" ? faqCopy.es : faqCopy.en;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="bold-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <section className="bold-faq bold-faq--page">
        <div className="bold-home__shell">
          <header>
            <p className="bold-home__index">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
          </header>
          <div className="bold-faq__list">
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <b aria-hidden="true">+</b>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
