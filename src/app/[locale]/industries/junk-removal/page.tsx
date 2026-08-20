import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CircleDollarSign,
  ClipboardList,
  ExternalLink,
  Images,
  MapPinned,
  MessageSquareText,
  PhoneCall,
  Route,
  ShieldAlert,
  Truck,
  UserRoundCheck,
} from "lucide-react";

import { constructMetadata } from "@/lib/seo";

const baseUrl = "https://abemedia.online";

const pageCopy = {
  en: {
    metaTitle: "Junk Removal Automation & AI Answering | Abe Media",
    metaDescription: "AI answering, lead intake, pricebook-backed quoting, scheduling, dispatch, and driver workflows for junk-removal companies in English and Spanish.",
    hero: {
      eyebrow: "AI systems for junk removal",
      titleStart: "TURN THE LEAD INTO A",
      titleHighlight: "DISPATCH-READY JOB.",
      lede: "A junk-removal system should answer the call, collect the items, photos, access details, and address, apply your approved pricebook rules, check the calendar, and hand dispatch one usable job record. Unclear, oversized, and hazardous work goes to a person.",
      cta: "Get the free AI Readiness Audit",
      proof: "Built for marketplace leads, direct calls, English and Spanish intake, quoting rules, crew scheduling, and field handoffs.",
      cardLabel: "New lead",
      cardSource: "Marketplace message · 6:18 PM",
      customer: "Garage cleanout. Couch, two mattresses, boxes, and paint cans. Second-floor access for some items.",
      factsLabel: "Job facts captured",
      facts: ["Mixed load", "Stairs", "Photos needed", "Paint requires review"],
      statusLabel: "Next action",
      status: "Human price review",
    },
    proof: {
      eyebrow: "One live junk-removal pipeline",
      title: "First-party operating results.",
      intro: "These figures come from Thumbtack and Housecall Pro exports from one live junk-removal pipeline. They describe that operation and are not a forecast for another business.",
      items: [
        { value: "$1,644 → $582", label: "Weekly lead spend" },
        { value: "$32 → $17", label: "Cost per lead" },
        { value: "11% → 34%", label: "Free leads" },
        { value: "30 → 52", label: "Leads per week" },
        { value: "$1,236", label: "Refunds recovered" },
      ],
    },
    problem: {
      eyebrow: "Where the job breaks",
      title: "Fast response is only the first handoff.",
      intro: "The office still loses time when every message must be reread, every quote is rebuilt, or the crew receives a screenshot instead of a job record.",
      items: [
        { title: "The lead is incomplete", body: "The customer names a few items but leaves out stairs, distance, heavy materials, access, or disposal restrictions." },
        { title: "The quote lives in a text thread", body: "The final amount, assumptions, and customer approval never become structured fields for the next step." },
        { title: "Availability changes", body: "A slot can disappear between the first reply and the customer's decision. Booking needs a live calendar check." },
        { title: "Dispatch starts over", body: "The crew asks for the address, photos, item list, access notes, and price because the lead handoff carried none of it cleanly." },
      ],
    },
    flow: {
      eyebrow: "Lead-to-job flow",
      title: "One record from first reply to finished job.",
      intro: "Each step adds approved information to the same job. A person owns the cases that fall outside the rules.",
      steps: [
        { number: "01", title: "Lead received", body: "Capture the source, original message, contact details, consent, and attribution before any follow-up." },
        { number: "02", title: "Job facts collected", body: "Ask for items, quantity, photos, address, stairs, elevators, access, parking, and special materials." },
        { number: "03", title: "Pricebook rules applied", body: "Match defined facts to approved line items, minimums, fees, and review thresholds." },
        { number: "04", title: "Availability confirmed", body: "Check the current calendar before presenting or reserving an approved time." },
        { number: "05", title: "Dispatch receives the job", body: "Send the item list, photos, price status, customer commitment, notes, and location into the field workflow." },
      ],
    },
    pricebook: {
      eyebrow: "Pricing authority",
      titleStart: "AI READS THE MESSAGE.",
      titleHighlight: "YOUR PRICEBOOK SETS THE PRICE.",
      intro: "The model can identify defined facts in a customer's text or photo. It has no authority to create a price, lower a minimum, waive a fee, or decide that an unusual load is safe to quote.",
      items: [
        { title: "Approved line items", body: "Only the items and service rules your business has documented can feed the estimate." },
        { title: "Hard minimums", body: "Minimum job amounts and non-negotiable charges remain business rules." },
        { title: "Assumptions attached", body: "Photos, access notes, quantity, and any missing details stay visible with the quote status." },
        { title: "Human review gates", body: "Paint, chemicals, concrete, unusually heavy pieces, unclear volume, and policy exceptions can stop the quote path." },
      ],
    },
    system: {
      eyebrow: "The operating layer",
      title: "The office and field team work from the same job.",
      intro: "Abe Media can build the focused layer between your lead sources, phone, calendar, CRM, dispatch board, and driver workflow. The audit decides what should connect and which system owns each field.",
      items: [
        { title: "Calls and messages", body: "English and Spanish intake with source attribution, transcripts, photos, and approved follow-up." },
        { title: "Calendar and CRM", body: "Availability checks, customer records, quote status, booking confirmation, and failure alerts." },
        { title: "Dispatch board", body: "A live view of jobs, crew assignment, location context, notes, and exceptions." },
        { title: "Driver workflow", body: "Browser-based activation, assigned work, status, photos, notes, and completion evidence." },
      ],
    },
    limits: {
      eyebrow: "Clear boundaries",
      title: "What the system will not do.",
      intro: "The workflow should stop before uncertainty becomes a bad promise for the customer or the crew.",
      items: [
        "Invent a price, discount, disposal fee, or minimum",
        "Treat every photo as a complete or accurate view of the load",
        "Approve hazardous, prohibited, or policy-sensitive material without your rules",
        "Promise a time slot that the live calendar cannot confirm",
        "Hide a failed message, CRM write, booking, or dispatch handoff",
      ],
    },
    caseStudy: {
      eyebrow: "Relevant system work",
      title: "Rejunk connects lead handling, dispatch, and driver activation.",
      body1: "Rejunk is a browser-based operating system built for moving and junk-removal work. Its public case study covers lead and job records, a dispatch board, driver activation by email key and PIN, live location, field status, and completion.",
      body2: "The public version keeps customer records, private vendors, credentials, rates, timing, and operating controls confidential.",
      link: "View the Rejunk case study",
      operatorTitle: "Operations experience behind the build",
      operatorBody: "Abe Perez spent 17 years in Waste Management operations, including responsibility across more than 300 vehicles and 27 direct reports. The software is designed around handoffs, exceptions, field reality, and visible ownership.",
    },
    related: {
      eyebrow: "Useful internal resources",
      title: "See the connected workflows",
      items: [
        { href: "/how-it-works", title: "How the pipeline works", body: "Follow a sanitized lead from intake through quoting, booking, and completion." },
        { href: "/missed-call-text-back", title: "Missed call text back", body: "Keep an unanswered junk-removal call moving in English or Spanish." },
        { href: "/services/lead-pipeline-automation", title: "Lead pipeline automation", body: "Review the intake, retry, monitoring, and ownership model." },
        { href: "/ai-receptionist-vs-answering-service", title: "AI vs. human answering", body: "Decide which calls follow rules and which need a person." },
      ],
    },
    faq: {
      eyebrow: "Straight answers",
      title: "Junk-removal automation FAQ",
      items: [
        { q: "Can AI quote every junk-removal job?", a: "No. It can match defined job facts to an approved pricebook. Unclear volume, incomplete photos, hazardous material, oversized loads, access problems, and policy exceptions should go to a person." },
        { q: "Can the system use our current pricebook?", a: "Yes, after the pricebook, minimums, fees, service area, and review thresholds are documented and tested. AI reads the message. Your pricebook sets the price." },
        { q: "Can it respond to marketplace leads and direct calls?", a: "Potentially. Each lead source and phone provider must offer authorized access to the required events and fields. The audit verifies APIs, permissions, rate limits, and failure behavior before a connection is promised." },
        { q: "Can customers send photos?", a: "Yes. Photos can stay attached to the lead and job record for quote review and crew context. The workflow should keep the customer's written details and any missing information visible beside them." },
        { q: "Can it book jobs directly?", a: "It can book job types that have approved duration, service area, calendar, capacity, and price rules. Conflicts and exceptions should be held for staff." },
        { q: "Do drivers need an app-store download?", a: "The Rejunk pattern uses a responsive browser workflow with driver activation. A native app may still be appropriate when offline behavior, device permissions, or other field requirements demand it." },
        { q: "Does the full workflow work in Spanish?", a: "It can. The Spanish path needs native intake questions, customer messages, quoting explanations, booking language, exception notices, and staff handoffs. Translation of the opening prompt alone is insufficient." },
      ],
    },
    final: {
      eyebrow: "Start with the handoff",
      title: "Find where your leads stop becoming clean jobs.",
      body: "The free AI Readiness Audit maps your lead sources, phone intake, pricebook authority, calendar, CRM, dispatch path, driver workflow, exceptions, and failure alerts.",
      cta: "Get the free AI Readiness Audit",
    },
  },
  es: {
    metaTitle: "Automatización e IA para Retiro de Escombros | Abe Media",
    metaDescription: "Atención con IA, captura de leads, cotización con lista de precios, agenda, despacho y flujo para choferes de retiro de basura y escombros.",
    hero: {
      eyebrow: "Sistemas de IA para retiro de escombros",
      titleStart: "CONVIERTE EL LEAD EN UN TRABAJO",
      titleHighlight: "LISTO PARA DESPACHAR.",
      lede: "Un sistema para retiro de basura y escombros debe contestar, reunir artículos, fotos, acceso y dirección, aplicar las reglas aprobadas de tu lista de precios, revisar el calendario y entregarle a despacho un solo registro útil. Los trabajos poco claros, demasiado grandes o con materiales peligrosos pasan a una persona.",
      cta: "Obtén la auditoría gratuita de preparación para IA",
      proof: "Creado para leads de plataformas, llamadas directas, ingreso en inglés y español, reglas de cotización, agenda de cuadrillas y pases al campo.",
      cardLabel: "Lead nuevo",
      cardSource: "Mensaje de plataforma · 6:18 PM",
      customer: "Limpieza de garaje. Sofá, dos colchones, cajas y latas de pintura. Algunos artículos están en el segundo piso.",
      factsLabel: "Datos capturados",
      facts: ["Carga mixta", "Escaleras", "Faltan fotos", "Pintura requiere revisión"],
      statusLabel: "Siguiente acción",
      status: "Revisión humana del precio",
    },
    proof: {
      eyebrow: "Un pipeline activo de retiro de escombros",
      title: "Resultados operativos de fuente propia.",
      intro: "Estas cifras vienen de exportaciones de Thumbtack y Housecall Pro de un pipeline activo de retiro de escombros. Describen esa operación y no son un pronóstico para otro negocio.",
      items: [
        { value: "$1,644 → $582", label: "Gasto semanal en leads" },
        { value: "$32 → $17", label: "Costo por lead" },
        { value: "11% → 34%", label: "Leads gratuitos" },
        { value: "30 → 52", label: "Leads por semana" },
        { value: "$1,236", label: "Reembolsos recuperados" },
      ],
    },
    problem: {
      eyebrow: "Dónde se rompe el trabajo",
      title: "Responder rápido es apenas el primer pase.",
      intro: "La oficina todavía pierde tiempo cuando tiene que releer cada mensaje, rehacer cada cotización o mandarle a la cuadrilla una captura de pantalla en vez de un registro completo.",
      items: [
        { title: "El lead viene incompleto", body: "El cliente menciona algunos artículos, pero deja fuera escaleras, distancia, materiales pesados, acceso o restricciones de desecho." },
        { title: "La cotización vive en mensajes", body: "La cantidad final, los supuestos y la aprobación del cliente nunca se convierten en campos que sirvan para el siguiente paso." },
        { title: "La disponibilidad cambia", body: "Un horario puede desaparecer entre la primera respuesta y la decisión del cliente. La reserva necesita revisar el calendario en vivo." },
        { title: "Despacho empieza de nuevo", body: "La cuadrilla vuelve a pedir dirección, fotos, lista de artículos, notas de acceso y precio porque el pase del lead no llegó limpio." },
      ],
    },
    flow: {
      eyebrow: "Del lead al trabajo",
      title: "Un registro desde la primera respuesta hasta el cierre.",
      intro: "Cada paso agrega información aprobada al mismo trabajo. Una persona se hace cargo de los casos que quedan fuera de las reglas.",
      steps: [
        { number: "01", title: "El lead llega", body: "Guarda la fuente, el mensaje original, los datos de contacto, el consentimiento y la atribución antes de responder." },
        { number: "02", title: "Se reúnen los datos", body: "Pregunta por artículos, cantidad, fotos, dirección, escaleras, elevadores, acceso, estacionamiento y materiales especiales." },
        { number: "03", title: "Se aplican las reglas de precio", body: "Cruza los datos definidos con artículos aprobados, mínimos, cargos y límites de revisión." },
        { number: "04", title: "Se confirma disponibilidad", body: "Revisa el calendario actual antes de presentar o reservar un horario aprobado." },
        { number: "05", title: "Despacho recibe el trabajo", body: "Envía la lista, fotos, estado del precio, compromiso del cliente, notas y ubicación al flujo de campo." },
      ],
    },
    pricebook: {
      eyebrow: "Autoridad sobre el precio",
      titleStart: "LA IA INTERPRETA EL MENSAJE.",
      titleHighlight: "TU LISTA DE PRECIOS PONE EL PRECIO.",
      intro: "El modelo puede identificar datos definidos en el texto o la foto del cliente. No tiene autoridad para crear un precio, bajar un mínimo, quitar un cargo ni decidir que una carga inusual es segura para cotizar.",
      items: [
        { title: "Artículos aprobados", body: "Solamente los artículos y reglas que tu negocio documentó pueden alimentar el estimado." },
        { title: "Mínimos firmes", body: "Los mínimos de trabajo y cargos obligatorios siguen siendo reglas del negocio." },
        { title: "Supuestos visibles", body: "Las fotos, el acceso, la cantidad y los datos faltantes permanecen junto al estado de la cotización." },
        { title: "Límites de revisión humana", body: "Pintura, químicos, concreto, piezas muy pesadas, volumen poco claro y excepciones de política pueden detener la cotización." },
      ],
    },
    system: {
      eyebrow: "La capa operativa",
      title: "La oficina y el equipo de campo trabajan con el mismo registro.",
      intro: "Abe Media puede construir la capa enfocada entre tus fuentes de leads, teléfono, calendario, CRM, tablero de despacho y flujo para choferes. La auditoría define qué debe conectarse y qué sistema es responsable de cada dato.",
      items: [
        { title: "Llamadas y mensajes", body: "Ingreso en inglés y español con atribución, transcripciones, fotos y seguimiento aprobado." },
        { title: "Calendario y CRM", body: "Revisión de horarios, clientes, estado de cotización, confirmación de reserva y alertas de falla." },
        { title: "Tablero de despacho", body: "Vista en vivo de trabajos, cuadrillas, ubicación, notas y excepciones." },
        { title: "Flujo para choferes", body: "Activación en el navegador, trabajos asignados, estado, fotos, notas y evidencia de cierre." },
      ],
    },
    limits: {
      eyebrow: "Límites claros",
      title: "Lo que el sistema no hará.",
      intro: "El flujo debe detenerse antes de que la incertidumbre se convierta en una mala promesa para el cliente o la cuadrilla.",
      items: [
        "Inventar un precio, descuento, cargo de desecho o mínimo",
        "Tratar cada foto como una vista completa o exacta de la carga",
        "Aprobar material peligroso, prohibido o delicado sin tus reglas",
        "Prometer un horario que el calendario en vivo no puede confirmar",
        "Ocultar una falla de mensaje, CRM, reserva o pase a despacho",
      ],
    },
    caseStudy: {
      eyebrow: "Trabajo de sistema relevante",
      title: "Rejunk conecta leads, despacho y activación de choferes.",
      body1: "Rejunk es un sistema operativo que corre en el navegador para mudanzas y retiro de escombros. Su caso público muestra registros de leads y trabajos, tablero de despacho, activación por clave de correo y PIN, ubicación en vivo, estados de campo y cierre.",
      body2: "La versión pública mantiene confidenciales los clientes, proveedores privados, credenciales, tarifas, tiempos y controles operativos.",
      link: "Ver el caso de estudio de Rejunk en inglés",
      operatorTitle: "Experiencia operativa detrás del sistema",
      operatorBody: "Abe Perez pasó 17 años en operaciones de Waste Management, incluyendo responsabilidad sobre más de 300 vehículos y 27 reportes directos. El software se diseña alrededor de pases, excepciones, realidad de campo y responsabilidad visible.",
    },
    related: {
      eyebrow: "Recursos internos útiles",
      title: "Revisa los flujos conectados",
      items: [
        { href: "/how-it-works", title: "Cómo funciona el pipeline", body: "Sigue un lead sanitizado desde el ingreso hasta la cotización, reserva y cierre." },
        { href: "/missed-call-text-back", title: "Texto después de una llamada perdida", body: "Mantén activa una llamada de retiro de escombros en inglés o español." },
        { href: "/services", title: "Servicios de automatización", body: "Revisa las opciones de ingreso, agentes de voz, sistemas operativos y software a medida." },
        { href: "/ai-receptionist-vs-answering-service", title: "IA frente a servicio humano", body: "Decide qué llamadas siguen reglas y cuáles necesitan una persona." },
      ],
    },
    faq: {
      eyebrow: "Respuestas directas",
      title: "Preguntas sobre automatización para retiro de escombros",
      items: [
        { q: "¿La IA puede cotizar todos los trabajos de retiro de escombros?", a: "No. Puede cruzar datos definidos con una lista de precios aprobada. El volumen poco claro, fotos incompletas, materiales peligrosos, cargas muy grandes, problemas de acceso y excepciones deben pasar a una persona." },
        { q: "¿El sistema puede usar nuestra lista de precios actual?", a: "Sí, después de documentar y probar la lista, los mínimos, cargos, zona de servicio y límites de revisión. La IA interpreta el mensaje. Tu lista de precios pone el precio." },
        { q: "¿Puede responder leads de plataformas y llamadas directas?", a: "Es posible. Cada fuente y proveedor telefónico debe permitir acceso autorizado a los eventos y campos necesarios. La auditoría verifica APIs, permisos, límites y fallas antes de prometer una conexión." },
        { q: "¿Los clientes pueden enviar fotos?", a: "Sí. Las fotos pueden quedarse adjuntas al lead y al trabajo para revisar la cotización y dar contexto a la cuadrilla. El texto del cliente y los datos faltantes deben permanecer visibles junto a ellas." },
        { q: "¿Puede reservar trabajos directamente?", a: "Puede reservar tipos de trabajo con reglas aprobadas de duración, zona, calendario, capacidad y precio. Los conflictos y las excepciones deben esperar a una persona." },
        { q: "¿Los choferes necesitan descargar una app?", a: "El modelo de Rejunk usa un flujo adaptable en el navegador con activación del chofer. Una app nativa puede ser necesaria si la operación requiere trabajo sin conexión, permisos del dispositivo u otras funciones de campo." },
        { q: "¿Todo el flujo funciona en español?", a: "Puede funcionar. El recorrido en español necesita preguntas nativas, mensajes al cliente, explicación de la cotización, lenguaje de reserva, avisos de excepción y pases al personal. Traducir solamente el saludo no alcanza." },
      ],
    },
    final: {
      eyebrow: "Empieza con el pase",
      title: "Encuentra dónde tus leads dejan de convertirse en trabajos limpios.",
      body: "La auditoría gratuita de preparación para IA documenta tus fuentes, teléfono, autoridad de precios, calendario, CRM, despacho, flujo para choferes, excepciones y alertas de falla.",
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
    path: "/industries/junk-removal",
  });
}

export default async function JunkRemovalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale === "es" ? "es" : "en";
  const copy = lang === "es" ? pageCopy.es : pageCopy.en;
  const pageUrl = `${baseUrl}/${lang}/industries/junk-removal`;
  const contactUrl = `/${lang}/contact`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: copy.metaTitle.replace(" | Abe Media", ""),
    description: copy.metaDescription,
    url: pageUrl,
    serviceType: lang === "es" ? "Automatización para retiro de basura y escombros" : "Junk removal automation",
    provider: { "@id": `${baseUrl}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
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
      { "@type": "ListItem", position: 2, name: lang === "es" ? "Industrias" : "Industries", item: `${baseUrl}/${lang}/industries` },
      { "@type": "ListItem", position: 3, name: copy.hero.eyebrow, item: pageUrl },
    ],
  };
  const problemIcons = [ClipboardList, MessageSquareText, CalendarCheck, Truck];
  const systemIcons = [PhoneCall, CalendarCheck, Route, MapPinned];

  return (
    <article className="ds overflow-hidden bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }} />

      <header className="relative bg-[#0b1018] px-5 pt-36 pb-20 text-white sm:px-8 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#E34F0B]/15 blur-[140px]" />
        <div className="relative mx-auto grid max-w-[1120px] items-center gap-14 lg:grid-cols-[1.04fr_0.76fr]">
          <div>
            <p className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.2em] text-[#E34F0B]">{copy.hero.eyebrow}</p>
            <h1 className="mt-6 max-w-5xl text-[clamp(3.45rem,7.8vw,7.6rem)] leading-[0.82] text-white">
              {copy.hero.titleStart}<br />
              <span className="text-[#E34F0B]">{copy.hero.titleHighlight}</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">{copy.hero.lede}</p>
            <Link href={contactUrl} className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#E34F0B] px-6 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-[#111827]">
              {copy.hero.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-6 max-w-3xl font-[var(--font-ds-mono)] text-xs leading-6 uppercase tracking-[0.14em] text-white/42">{copy.hero.proof}</p>
          </div>

          <aside className="border border-white/15 bg-white/[0.055] p-5 shadow-[0_35px_90px_rgba(0,0,0,.35)] backdrop-blur-sm md:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-[var(--font-ds-mono)] text-[11px] uppercase tracking-[0.15em] text-[#E34F0B]">{copy.hero.cardLabel}</span>
              <span className="font-[var(--font-ds-mono)] text-[10px] text-white/35">{copy.hero.cardSource}</span>
            </div>
            <p className="mt-6 rounded-2xl rounded-bl-sm bg-white/9 px-4 py-4 text-sm leading-6 text-white/72">{copy.hero.customer}</p>
            <div className="mt-7">
              <p className="font-[var(--font-ds-mono)] text-[10px] uppercase tracking-[0.15em] text-white/38">{copy.hero.factsLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {copy.hero.facts.map((fact) => <span key={fact} className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/64">{fact}</span>)}
              </div>
            </div>
            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="font-[var(--font-ds-mono)] text-[10px] uppercase tracking-[0.15em] text-white/38">{copy.hero.statusLabel}</p>
              <p className="mt-3 flex items-center gap-3 font-bold text-white"><UserRoundCheck className="h-5 w-5 text-[#E34F0B]" />{copy.hero.status}</p>
            </div>
          </aside>
        </div>
      </header>

      <section className="border-b border-[var(--ds-line-soft)] bg-[var(--band)] px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="ds-eyebrow">{copy.proof.eyebrow}</p>
              <h2 className="mt-5 text-[clamp(3rem,5vw,5rem)] leading-[0.9]">{copy.proof.title}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.proof.intro}</p>
          </div>
          <div className="mt-10 grid gap-px border border-[var(--ds-line-soft)] bg-[var(--ds-line-soft)] sm:grid-cols-2 lg:grid-cols-5">
            {copy.proof.items.map((item) => (
              <article key={item.label} className="bg-background p-6">
                <p className="text-3xl font-bold tracking-[-0.03em] text-[#E34F0B]">{item.value}</p>
                <p className="mt-3 font-[var(--font-ds-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--ds-ink-mute)]">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="ds-eyebrow">{copy.problem.eyebrow}</p>
              <h2 className="mt-5 text-[clamp(3.3rem,6vw,6rem)] leading-[0.9]">{copy.problem.title}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.problem.intro}</p>
          </div>
          <div className="mt-12 grid gap-px border border-[var(--ds-line-soft)] bg-[var(--ds-line-soft)] md:grid-cols-2 lg:grid-cols-4">
            {copy.problem.items.map((item, index) => {
              const Icon = problemIcons[index];
              return (
                <article key={item.title} className="min-h-64 bg-background p-7">
                  <Icon className="h-7 w-7 text-[#E34F0B]" />
                  <h3 className="mt-10 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--ds-ink-mute)]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1018] px-5 py-20 text-white sm:px-8 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.18em] text-[#E34F0B]">{copy.flow.eyebrow}</p>
              <h2 className="mt-5 text-[clamp(3.3rem,6vw,6rem)] leading-[0.88] text-white">{copy.flow.title}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/60">{copy.flow.intro}</p>
          </div>
          <div className="mt-14 border-y border-white/12">
            {copy.flow.steps.map((step) => (
              <article key={step.number} className="grid gap-4 border-t border-white/12 py-7 first:border-t-0 md:grid-cols-[72px_0.7fr_1.3fr] md:items-start">
                <span className="font-[var(--font-ds-mono)] text-xs tracking-[0.12em] text-[#E34F0B]">{step.number}</span>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="leading-7 text-white/60">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="ds-eyebrow">{copy.pricebook.eyebrow}</p>
              <h2 className="mt-5 text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9]">
                {copy.pricebook.titleStart}<br /><span className="text-[#E34F0B]">{copy.pricebook.titleHighlight}</span>
              </h2>
            </div>
            <p className="text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.pricebook.intro}</p>
          </div>
          <div className="mt-12 grid gap-px border border-[var(--ds-line-soft)] bg-[var(--ds-line-soft)] md:grid-cols-2">
            {copy.pricebook.items.map((item, index) => {
              const Icon = index === 0 ? ClipboardList : index === 1 ? CircleDollarSign : index === 2 ? Images : ShieldAlert;
              return (
                <article key={item.title} className="bg-[var(--ds-raise)] p-7 md:p-9">
                  <Icon className="h-6 w-6 text-[#E34F0B]" />
                  <h3 className="mt-7 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-3 max-w-xl leading-7 text-[var(--ds-ink-mute)]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--ds-line-soft)] bg-[var(--band)] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="ds-eyebrow">{copy.system.eyebrow}</p>
              <h2 className="mt-5 text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9]">{copy.system.title}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.system.intro}</p>
          </div>
          <div className="mt-12 grid gap-px border border-[var(--ds-line-soft)] bg-[var(--ds-line-soft)] md:grid-cols-2 lg:grid-cols-4">
            {copy.system.items.map((item, index) => {
              const Icon = systemIcons[index];
              return (
                <article key={item.title} className="min-h-64 bg-background p-7">
                  <Icon className="h-7 w-7 text-[#E34F0B]" />
                  <h3 className="mt-10 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--ds-ink-mute)]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="ds-eyebrow">{copy.limits.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(3.3rem,6vw,6rem)] leading-[0.9]">{copy.limits.title}</h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.limits.intro}</p>
          </div>
          <div className="border border-[var(--ds-line-soft)] bg-[var(--ds-raise)] p-7 md:p-9">
            <ShieldAlert className="h-8 w-8 text-[#E34F0B]" />
            <ul className="mt-7 divide-y divide-[var(--ds-line-soft)] border-y border-[var(--ds-line-soft)]">
              {copy.limits.items.map((item) => <li key={item} className="flex gap-3 py-4 leading-7 text-[var(--ds-ink-mute)]"><span className="text-[#E34F0B]">×</span>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#0b1018] px-5 py-20 text-white sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.18em] text-[#E34F0B]">{copy.caseStudy.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(3.3rem,6vw,6rem)] leading-[0.88] text-white">{copy.caseStudy.title}</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/64">{copy.caseStudy.body1}</p>
            <p className="mt-5 max-w-2xl leading-7 text-white/48">{copy.caseStudy.body2}</p>
            <Link href="/en/portfolio/rejunk" hrefLang="en" className="mt-7 inline-flex items-center gap-2 font-semibold text-[#E34F0B] hover:underline">
              {copy.caseStudy.link}<ExternalLink className="h-4 w-4" />
            </Link>
          </div>
          <aside className="border border-white/12 bg-white/5 p-7 md:p-9">
            <Truck className="h-8 w-8 text-[#E34F0B]" />
            <h3 className="mt-8 text-2xl font-bold text-white">{copy.caseStudy.operatorTitle}</h3>
            <p className="mt-4 leading-7 text-white/60">{copy.caseStudy.operatorBody}</p>
            <Link href={`/${lang}/about/abe-perez`} className="mt-7 inline-flex items-center gap-2 font-semibold text-[#E34F0B] hover:underline">
              {lang === "es" ? "Conoce la experiencia de Abe Perez" : "Read Abe Perez's background"}<ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-b border-[var(--ds-line-soft)] bg-[var(--band)] px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-[1120px]">
          <p className="ds-eyebrow">{copy.related.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(3rem,5vw,5rem)] leading-[0.92]">{copy.related.title}</h2>
          <div className="mt-10 grid gap-px border border-[var(--ds-line-soft)] bg-[var(--ds-line-soft)] md:grid-cols-2 lg:grid-cols-4">
            {copy.related.items.map((item) => (
              <Link key={item.href} href={`/${lang}${item.href}`} className="group bg-background p-7 transition-colors hover:bg-[#111827] hover:text-white">
                <Check className="h-5 w-5 text-[#E34F0B]" />
                <h3 className="mt-8 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--ds-ink-mute)] transition-colors group-hover:text-white/60">{item.body}</p>
                <ArrowRight className="mt-7 h-4 w-4 text-[#E34F0B] transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.55fr_1.45fr]">
          <div>
            <p className="ds-eyebrow">{copy.faq.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(3rem,5vw,5rem)] leading-[0.92]">{copy.faq.title}</h2>
          </div>
          <div className="divide-y divide-[var(--ds-line-soft)] border-y border-[var(--ds-line-soft)]">
            {copy.faq.items.map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="cursor-pointer list-none pr-8 text-lg font-bold marker:hidden">
                  {item.q}<span aria-hidden="true" className="float-right text-2xl font-normal text-[#E34F0B] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl pr-8 leading-7 text-[var(--ds-ink-mute)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E34F0B] px-5 py-20 text-white sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.18em] text-white/75">{copy.final.eyebrow}</p>
            <h2 className="mt-5 max-w-4xl text-[clamp(3.3rem,6vw,6.5rem)] leading-[0.88] text-white">{copy.final.title}</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">{copy.final.body}</p>
          </div>
          <Link href={contactUrl} className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-4 font-semibold text-[#111827] transition-colors hover:bg-[#111827] hover:text-white">
            {copy.final.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </article>
  );
}
