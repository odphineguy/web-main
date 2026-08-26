import type { Metadata } from "next";
import Link from "next/link";

import MissedCallValueWorksheet from "@/components/MissedCallValueWorksheet";
import { constructMetadata } from "@/lib/seo";

const baseUrl = "https://abemedia.online";

const pageCopy = {
  en: {
    metaTitle: "Missed Call Text Back for Contractors | Abe Media",
    metaDescription: "Missed call text back for contractors. Keep after-hours leads moving in English or Spanish, then book the job or escalate it to your team.",
    rail: "MISSED CALL → TEXT BACK",
    hero: {
      eyebrow: "Missed call text back",
      titleStart: "MISSED CALL",
      titleHighlight: "TEXT BACK",
      titleEnd: "FOR CONTRACTORS.",
      lede: "When your team cannot answer, the customer gets a useful text in English or Spanish. The conversation keeps moving until the job is booked or handed to a person.",
      cta: "Get the free AI Readiness Audit",
      proof: "Built for plumbing, HVAC, moving, junk removal, landscaping, and other service businesses.",
      phoneLabel: "Missed call",
      phoneTime: "11:07 PM",
      customer: "I need a plumber tonight. A pipe is leaking under the sink.",
      reply: "I can help collect the details now. What is the service address? / Puedo ayudarle ahora. ¿Cuál es la dirección?",
      status: "Conversation active",
    },
    problem: {
      eyebrow: "Voicemail stops at the beep",
      title: "A missed call still has intent behind it.",
      body1: "The customer called because something needs to happen. A voicemail asks that person to wait while they keep searching.",
      body2: "Text back opens the next step while the need is still clear. It collects the address, the job details, photos, and the language the customer wants to use.",
      note: "No invented quote. No silent handoff. Anything unusual goes to your team with the conversation attached.",
    },
    steps: {
      eyebrow: "How it works",
      title: "The missed call becomes a live conversation.",
      items: [
        { title: "Call missed", body: "Your existing line rings. Nobody has to change phone numbers." },
        { title: "Text sent", body: "The customer gets a useful reply and can continue in English or Spanish." },
        { title: "Details captured", body: "The workflow collects the address, job details, photos, and approved intake fields." },
        { title: "Booked or escalated", body: "A standard request moves forward. An exception reaches a person with context." },
      ],
    },
    math: {
      eyebrow: "Use your numbers",
      title: "What is sitting behind your voicemail inbox?",
      lede: "Enter your own missed calls and average job value. The worksheet shows the weekly value connected to those calls. It does not assume every call would become a job.",
      worksheet: {
        missedCalls: "Missed calls per week",
        missedCallsHint: "Use your phone report, not an industry average.",
        jobValue: "Average residential job value",
        jobValueHint: "Use the number from your own completed jobs.",
        resultLabel: "Weekly value behind those calls",
        resultBody: "This shows exposure. Your close rate determines what becomes booked work.",
        disclaimer: "Formula: missed calls per week × your average job value. Abe Media does not apply an assumed close rate or an outside industry statistic.",
      },
    },
    difference: {
      eyebrow: "More than an auto-text",
      titleStart: "THE REPLY IS FAST.",
      titleHighlight: "THE RULES STAY YOURS.",
      intro: "A generic auto-text confirms that someone called. This workflow can continue the approved intake path without inventing policy.",
      items: [
        { title: "Your pricebook controls price", body: "AI reads the message. Your approved pricebook supplies the amount." },
        { title: "English y español", body: "The complete path works in both languages. Every Spanish step is written as its own native path." },
        { title: "Exceptions reach a person", body: "Disputes, unclear requests, policy exceptions, and emergency messages stop and escalate with the conversation attached." },
        { title: "The next call can be answered", body: "Text back can work beside an AI voice agent, so the same intake rules cover calls and messages." },
      ],
    },
    plumbing: {
      eyebrow: "After-hours plumbing",
      title: "A burst pipe at 11 PM goes to whoever answers.",
      body: "The first message should collect the address, identify the problem, apply your emergency policy, and route any exception. It should never promise arrival time or price unless your own rules allow it.",
      safeTitle: "What the system will not do",
      safeItems: [
        "Invent a service price",
        "Promise an arrival window outside your schedule",
        "Handle a complex dispute without a person",
        "Hide a failed message or integration",
      ],
    },
    faq: {
      eyebrow: "Straight answers",
      title: "Missed call text back FAQ",
      items: [
        { q: "What does missed call text back cost?", a: "Cost depends on call volume, the intake path, the handoff rules, and the systems that need to connect. Abe Media scopes those requirements in a free AI Readiness Audit before proposing a build." },
        { q: "Does it work with my current phone number?", a: "Usually, yes. The workflow can respond when your existing business line records a missed call. The exact setup depends on your phone provider and how it exposes call events." },
        { q: "What happens when the customer replies in Spanish?", a: "The conversation continues in Spanish. The intake questions, handoff rules, customer messages, and exception paths are written natively for the full Spanish conversation." },
        { q: "Can the text give a quote?", a: "It can present a price only when your approved pricebook and rules supply that price. AI can read the request and collect facts. It does not invent a dollar amount." },
        { q: "What if the customer wants a person?", a: "The workflow hands the conversation to your team with the customer details and message history attached. Your team decides who receives the escalation and when." },
        { q: "What happens if the text service fails?", a: "The failure is made visible to your team. The phone call and normal callback process still exist, so the customer experience degrades to your current workflow instead of breaking completely." },
      ],
    },
    final: {
      eyebrow: "Start with the missed call",
      title: "Find the intake gap before you buy another tool.",
      body: "The free AI Readiness Audit maps what happens after your phone rings, where the handoff fails, and what should stay human.",
      cta: "Get the free AI Readiness Audit",
    },
  },
  es: {
    metaTitle: "Respuesta por texto a llamadas perdidas para contratistas | Abe Media",
    metaDescription: "Respuesta por texto a llamadas perdidas para contratistas. Mantén activos los leads fuera de horario en inglés o español y agenda el trabajo o pásalo a tu equipo.",
    rail: "LLAMADA PERDIDA → TEXTO",
    hero: {
      eyebrow: "Respuesta por texto a llamadas perdidas",
      titleStart: "RESPUESTA POR TEXTO A",
      titleHighlight: "LLAMADAS PERDIDAS",
      titleEnd: "PARA CONTRATISTAS.",
      lede: "Cuando tu equipo no puede contestar, el cliente recibe un texto útil en inglés o español. La conversación sigue hasta agendar el trabajo o pasarla a una persona.",
      cta: "Obtén la auditoría gratuita de preparación para IA",
      proof: "Creado para plomería, HVAC, mudanzas, recolección de basura, jardinería y otros negocios de servicio.",
      phoneLabel: "Llamada perdida",
      phoneTime: "11:07 PM",
      customer: "Necesito un plomero esta noche. Hay una fuga debajo del fregadero.",
      reply: "Puedo ayudarle a reunir los datos ahora. ¿Cuál es la dirección del servicio?",
      status: "Conversación activa",
    },
    problem: {
      eyebrow: "El buzón termina con el tono",
      title: "Una llamada perdida todavía tiene intención.",
      body1: "El cliente llamó porque necesita que algo suceda. El buzón de voz le pide esperar mientras sigue buscando.",
      body2: "La respuesta por texto abre el siguiente paso cuando la necesidad sigue clara. Reúne la dirección, los detalles del trabajo, fotos y el idioma que el cliente quiere usar.",
      note: "Sin cotizaciones inventadas. Sin pases silenciosos. Cualquier situación inusual llega a tu equipo con la conversación adjunta.",
    },
    steps: {
      eyebrow: "Cómo funciona",
      title: "La llamada perdida se convierte en una conversación activa.",
      items: [
        { title: "Llamada perdida", body: "Suena tu línea actual. Nadie tiene que cambiar de número." },
        { title: "Texto enviado", body: "El cliente recibe una respuesta útil y puede continuar en inglés o español." },
        { title: "Datos reunidos", body: "El flujo reúne la dirección, los detalles, las fotos y los campos de ingreso aprobados." },
        { title: "Agendado o escalado", body: "Una solicitud normal avanza. Una excepción llega a una persona con contexto." },
      ],
    },
    math: {
      eyebrow: "Usa tus números",
      title: "¿Qué valor está esperando en tu buzón de voz?",
      lede: "Ingresa tus llamadas perdidas y el valor promedio de un trabajo. La hoja muestra el valor semanal relacionado con esas llamadas. No supone que cada llamada se convertirá en trabajo.",
      worksheet: {
        missedCalls: "Llamadas perdidas por semana",
        missedCallsHint: "Usa el reporte de tu teléfono, no un promedio de la industria.",
        jobValue: "Valor promedio de un trabajo residencial",
        jobValueHint: "Usa el número de tus propios trabajos terminados.",
        resultLabel: "Valor semanal detrás de esas llamadas",
        resultBody: "Esto muestra la exposición. Tu tasa de cierre determina lo que se agenda.",
        disclaimer: "Fórmula: llamadas perdidas por semana × valor promedio de tu trabajo. Abe Media no aplica una tasa de cierre supuesta ni una estadística externa de la industria.",
      },
    },
    difference: {
      eyebrow: "Más que un texto automático",
      titleStart: "LA RESPUESTA ES RÁPIDA.",
      titleHighlight: "LAS REGLAS SIGUEN SIENDO TUYAS.",
      intro: "Un texto automático genérico confirma que alguien llamó. Este flujo puede continuar el proceso de ingreso aprobado sin inventar políticas.",
      items: [
        { title: "Tu lista de precios controla el precio", body: "La IA lee el mensaje. Tu lista de precios aprobada proporciona la cantidad." },
        { title: "English y español", body: "El recorrido completo funciona en ambos idiomas. Cada paso en español está escrito como un recorrido nativo propio." },
        { title: "Las excepciones llegan a una persona", body: "Las disputas, solicitudes poco claras, excepciones de política y mensajes de emergencia se detienen y escalan con la conversación adjunta." },
        { title: "La próxima llamada puede ser contestada", body: "La respuesta por texto puede trabajar junto a un agente de voz con IA, usando las mismas reglas para llamadas y mensajes." },
      ],
    },
    plumbing: {
      eyebrow: "Plomería fuera de horario",
      title: "Una tubería rota a las 11 PM va con quien conteste.",
      body: "El primer mensaje debe reunir la dirección, identificar el problema, aplicar tu política de emergencias y dirigir cualquier excepción. Nunca debe prometer una hora de llegada ni un precio si tus propias reglas no lo permiten.",
      safeTitle: "Lo que el sistema no hará",
      safeItems: [
        "Inventar el precio de un servicio",
        "Prometer una hora fuera de tu horario",
        "Manejar una disputa compleja sin una persona",
        "Ocultar un mensaje o una integración fallida",
      ],
    },
    faq: {
      eyebrow: "Respuestas directas",
      title: "Preguntas sobre la respuesta por texto",
      items: [
        { q: "¿Cuánto cuesta la respuesta por texto a llamadas perdidas?", a: "El costo depende del volumen de llamadas, el proceso de ingreso, las reglas del pase y los sistemas que deben conectarse. Abe Media define esos requisitos en una auditoría gratuita de preparación para IA antes de proponer un proyecto." },
        { q: "¿Funciona con mi número de teléfono actual?", a: "Por lo general, sí. El flujo puede responder cuando tu línea comercial actual registra una llamada perdida. La configuración exacta depende de tu proveedor telefónico y de cómo comparte los eventos de llamadas." },
        { q: "¿Qué sucede cuando el cliente responde en español?", a: "La conversación continúa en español. Las preguntas, reglas para pasar la conversación y mensajes al cliente están escritos para el recorrido completo en español." },
        { q: "¿El texto puede dar una cotización?", a: "Puede presentar un precio solamente cuando tu lista de precios y tus reglas aprobadas proporcionan ese precio. La IA puede leer la solicitud y reunir datos. No inventa una cantidad." },
        { q: "¿Qué pasa si el cliente quiere hablar con una persona?", a: "El flujo pasa la conversación a tu equipo con los datos del cliente y el historial de mensajes adjuntos. Tu equipo decide quién recibe la escalación y cuándo." },
        { q: "¿Qué ocurre si falla el servicio de texto?", a: "La falla se muestra a tu equipo. La llamada y el proceso normal de devolución siguen disponibles, así que la experiencia vuelve a tu flujo actual en lugar de quedar rota." },
      ],
    },
    final: {
      eyebrow: "Empieza con la llamada perdida",
      title: "Encuentra la falla de ingreso antes de comprar otra herramienta.",
      body: "La auditoría gratuita de preparación para IA muestra qué sucede después de que suena el teléfono, dónde falla el pase y qué debe seguir en manos de una persona.",
      cta: "Obtén la auditoría gratuita de preparación para IA",
    },
  },
} as const;

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = locale === "es" ? pageCopy.es : pageCopy.en;
  return constructMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    locale,
    path: "/missed-call-text-back",
  });
}

export default async function MissedCallTextBackPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale === "es" ? "es" : "en";
  const copy = lang === "es" ? pageCopy.es : pageCopy.en;
  const pageUrl = `${baseUrl}/${lang}/missed-call-text-back`;
  const contactUrl = `/${lang}/contact`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: copy.metaTitle.replace(" | Abe Media", ""),
    description: copy.metaDescription,
    url: pageUrl,
    serviceType: lang === "es" ? "Respuesta por texto a llamadas perdidas" : "Missed call text back",
    areaServed: { "@type": "Country", name: "United States" },
    provider: { "@id": `${baseUrl}/#organization` },
    availableLanguage: ["English", "Spanish"],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: `${baseUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: copy.hero.eyebrow, item: pageUrl },
    ],
  };

  return (
    <article className="ds overflow-hidden bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }} />

      <header className="relative bg-[#0b1018] px-5 pt-32 pb-16 text-white sm:px-8 lg:pt-36 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="pointer-events-none absolute top-0 right-0 h-[560px] w-[560px] rounded-full bg-[#E34F0B]/15 blur-[130px]" />
        <div className="relative mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1.05fr_0.75fr]">
          <div>
            <p className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.2em] text-[#E34F0B]">{copy.hero.eyebrow}</p>
            <h1 className="mt-6 max-w-4xl text-[clamp(3.55rem,8.5vw,8rem)] leading-[0.82] text-white">
              {copy.hero.titleStart}<br />
              <span className="text-[#E34F0B]">{copy.hero.titleHighlight}</span><br />
              {copy.hero.titleEnd}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68">{copy.hero.lede}</p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href={contactUrl} className="group inline-flex items-center gap-3 rounded-full bg-[#E34F0B] px-6 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-[#111827]">
                {copy.hero.cta}
              </Link>
            </div>
            <p className="mt-6 max-w-2xl font-[var(--font-ds-mono)] text-xs leading-6 uppercase tracking-[0.14em] text-white/42">{copy.hero.proof}</p>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -inset-8 rounded-full bg-[#E34F0B]/20 blur-3xl" />
            <div className="relative rotate-[2deg] rounded-[2.6rem] border border-white/15 bg-[#121926] p-3 shadow-[0_40px_100px_rgba(0,0,0,.55)]">
              <div className="rounded-[2rem] border border-white/10 bg-[#080c12] px-5 py-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 font-[var(--font-ds-mono)] text-[11px] uppercase tracking-[0.12em] text-white/50">
                  <span>{copy.hero.phoneLabel}</span>
                  <span>{copy.hero.phoneTime}</span>
                </div>
                <div className="space-y-4 py-7 text-sm leading-6">
                  <p className="ml-8 rounded-2xl rounded-br-sm bg-white/9 px-4 py-3 text-white/76">{copy.hero.customer}</p>
                  <p className="mr-5 rounded-2xl rounded-bl-sm bg-[#E34F0B] px-4 py-3 text-white">{copy.hero.reply}</p>
                </div>
                <div className="border-t border-white/10 pt-4 font-[var(--font-ds-mono)] text-[11px] uppercase tracking-[0.12em] text-white/45">
                  {copy.hero.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="ds-eyebrow">{copy.problem.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(3.3rem,6vw,6rem)] leading-[0.9]">{copy.problem.title}</h2>
          </div>
          <div className="space-y-6 pt-1 text-lg leading-8 text-[var(--ds-ink-mute)]">
            <p>{copy.problem.body1}</p>
            <p>{copy.problem.body2}</p>
            <p className="border-t border-[var(--ds-line-soft)] pt-5 font-semibold text-[var(--ds-ink)]">{copy.problem.note}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--ds-line-soft)] bg-[var(--band)] px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1120px]">
          <p className="ds-eyebrow">{copy.steps.eyebrow}</p>
          <h2 className="mt-5 max-w-4xl text-[clamp(3rem,5vw,5rem)] leading-[0.92]">{copy.steps.title}</h2>
          <div className="mt-12 grid gap-px overflow-hidden border border-[var(--ds-line-soft)] bg-[var(--ds-line-soft)] md:grid-cols-2 lg:grid-cols-4">
            {copy.steps.items.map((item, index) => (
              <article key={item.title} className="bg-background p-6 md:p-7">
                <span className="font-[var(--font-ds-mono)] text-xs tracking-[0.18em] text-[#E34F0B]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--ds-ink-mute)]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1018] px-5 py-16 text-white sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.18em] text-[#E34F0B]">{copy.math.eyebrow}</p>
              <h2 className="mt-5 max-w-[13ch] text-[clamp(3rem,5vw,4.75rem)] leading-[0.92] text-white">{copy.math.title}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/60 lg:pb-2">{copy.math.lede}</p>
          </div>
          <div className="mt-10">
            <MissedCallValueWorksheet locale={lang} copy={copy.math.worksheet} />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="ds-eyebrow">{copy.difference.eyebrow}</p>
              <h2 className="mt-5 text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9]">
                {copy.difference.titleStart}<br /><span className="text-[#E34F0B]">{copy.difference.titleHighlight}</span>
              </h2>
            </div>
            <p className="text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.difference.intro}</p>
          </div>
          <div className="mt-12 grid gap-px border border-[var(--ds-line-soft)] bg-[var(--ds-line-soft)] md:grid-cols-2">
            {copy.difference.items.map((item) => (
              <article key={item.title} className="bg-[var(--ds-raise)] p-7 md:p-9">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 max-w-xl leading-7 text-[var(--ds-ink-mute)]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--ds-line-soft)] bg-[var(--band)] px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="ds-eyebrow">{copy.plumbing.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(3.3rem,6vw,6rem)] leading-[0.9]">{copy.plumbing.title}</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.plumbing.body}</p>
          </div>
          <div className="border border-[var(--ds-line-soft)] bg-background p-7 md:p-9">
            <h3 className="text-2xl font-bold">{copy.plumbing.safeTitle}</h3>
            <ul className="mt-7 divide-y divide-[var(--ds-line-soft)] border-y border-[var(--ds-line-soft)]">
              {copy.plumbing.safeItems.map((item) => <li key={item} className="py-4 text-[var(--ds-ink-mute)]">{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.55fr_1.45fr]">
          <div>
            <p className="ds-eyebrow">{copy.faq.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(3rem,5vw,5rem)] leading-[0.92]">{copy.faq.title}</h2>
          </div>
          <div className="divide-y divide-[var(--ds-line-soft)] border-y border-[var(--ds-line-soft)]">
            {copy.faq.items.map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="cursor-pointer list-none text-lg font-bold marker:hidden">{item.q}</summary>
                <p className="mt-4 max-w-3xl pr-8 leading-7 text-[var(--ds-ink-mute)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E34F0B] px-5 py-16 text-white sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.18em] text-white/75">{copy.final.eyebrow}</p>
            <h2 className="mt-5 max-w-4xl text-[clamp(3.3rem,6vw,6.5rem)] leading-[0.88] text-white">{copy.final.title}</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">{copy.final.body}</p>
          </div>
          <Link href={contactUrl} className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-4 font-semibold text-[#111827] transition-colors hover:bg-[#111827] hover:text-white">
            {copy.final.cta}
          </Link>
        </div>
      </section>
    </article>
  );
}
