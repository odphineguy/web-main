import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  CircleDollarSign,
  ExternalLink,
  Languages,
  PhoneCall,
  ShieldAlert,
} from "lucide-react";

import { constructMetadata } from "@/lib/seo";

const baseUrl = "https://abemedia.online";

const pageCopy = {
  en: {
    metaTitle: "Smith.ai Alternatives for Home Service Businesses | Abe Media",
    metaDescription: "Compare Smith.ai with Rosie, Goodcall, My AI Front Desk, Ruby, and a custom call system for home service intake, booking, billing, and handoffs.",
    hero: {
      eyebrow: "Home service phone guide",
      titleStart: "SMITH.AI",
      titleHighlight: "ALTERNATIVES",
      titleEnd: "FOR HOME SERVICES.",
      lede: "Rosie is a practical lower-entry AI option. Goodcall fits teams that prefer unique-caller billing. My AI Front Desk covers phone, text, web chat, and CRM. Ruby puts a person on the call. Smith.ai remains a fit when its AI and live-agent network match your handoff rules.",
      cta: "Get the free AI Readiness Audit",
      note: "The right choice depends on your call mix, booking rules, Spanish path, integrations, and the exceptions your team must own.",
      answerLabel: "Direct answer",
      answerTitle: "Choose around the hard part of your call.",
      answerBody: "Start with the moment that can lose the job: a transfer, an after-hours request, an unclear price, a Spanish call, or a schedule exception. Then choose the provider whose public plan supports that path.",
    },
    criteria: {
      eyebrow: "Before you compare plans",
      title: "Write down what the phone must do.",
      intro: "A low monthly price can become expensive when the plan leaves your office to re-enter details, return weak messages, or fix bad bookings.",
      items: [
        { title: "Billing unit", body: "Compare calls, minutes, agents, unique callers, included usage, overages, and paid add-ons against a normal month." },
        { title: "Booking authority", body: "Confirm whether the system can read live availability, follow job-duration rules, and stop when a request falls outside policy." },
        { title: "Spanish path", body: "Test the full call, booking, transfer, text, and fallback in Spanish. A translated greeting is only the first step." },
        { title: "Handoff evidence", body: "Your team should receive the caller, reason for calling, transcript or notes, requested timing, and the rule that caused the handoff." },
      ],
    },
    comparison: {
      eyebrow: "Side-by-side comparison",
      title: "Five providers. Five different tradeoffs.",
      intro: "These public prices and capabilities were checked on August 20, 2026. Providers can change plans, usage limits, and features. Verify the linked source before buying.",
      mobileHint: "Swipe the table to compare every column.",
      headers: ["Provider", "Published entry point", "Billing model", "Human path", "Useful fit"],
      rows: [
        ["Smith.ai AI Receptionist", "$0 for 25 calls per month", "Per call", "On-demand escalation to Smith.ai's live-agent network", "Teams that want one vendor for AI-first intake and a defined live-agent path"],
        ["Rosie", "$49 per month for 250 minutes", "Included minutes by plan", "Transfers are listed on higher plans", "Bilingual AI intake with a lower public entry price"],
        ["Goodcall", "$79 per month per agent", "Unique customers, with unlimited minutes listed", "Routes through configured logic and directory contacts", "Teams with repeat callers that want to model cost by unique customer"],
        ["My AI Front Desk", "$99 monthly or $79 monthly when billed annually", "Included voice usage plus channel usage", "Configured workflows and integrations", "Phone, SMS, web chat, web voice, and CRM in one product"],
        ["Ruby", "$250 for 50 receptionist minutes per month", "Receptionist minutes", "Human receptionists answer the calls", "Businesses that want a person handling intake and caller reassurance"],
      ],
      note: "Entry price does not show the full operating cost. Add required booking features, transfers, overages, setup work, and the time your staff still spends correcting or completing the intake.",
    },
    providers: {
      eyebrow: "Verified provider details",
      title: "What each public plan actually says.",
      items: [
        {
          name: "Smith.ai",
          price: "$0 for 25 AI calls",
          body: "The AI pricing page lists Pro at $150 per month for the displayed 75-call selection, with a $2 extra-call rate. Smith.ai lists 24/7 answering, qualification, routing, scheduling, recordings, transcripts, summaries, and live-agent escalation.",
          source: "Official AI pricing",
          href: "https://smith.ai/pricing/ai-receptionist",
        },
        {
          name: "Rosie",
          price: "$49 for 250 minutes",
          body: "Rosie's Professional plan lists English and Spanish, concurrent calls, custom message taking, appointment links, transcripts, and recordings. Direct calendar booking and warm or live transfers appear on the $149 Scale plan with 1,000 minutes.",
          source: "Official pricing",
          href: "https://heyrosie.com/pricing",
        },
        {
          name: "Goodcall",
          price: "$79 per agent",
          body: "The Starter plan lists unlimited minutes and tokens for 100 unique customers each month, then $0.50 per additional customer. That tier includes one logic flow, three team members, three directory contacts, and seven days of call details.",
          source: "Official pricing",
          href: "https://www.goodcall.com/pricing",
        },
        {
          name: "My AI Front Desk",
          price: "$99 monthly",
          body: "The public page lists $79 per month when billed annually for its Business-in-a-Box plan, with 200 voice minutes, phone answering, web chat, SMS, web voice, an AI-native CRM, and 20 or more languages.",
          source: "Official pricing",
          href: "https://www.myaifrontdesk.com/pricing",
        },
        {
          name: "Ruby",
          price: "$250 for 50 minutes",
          body: "Ruby's receptionist page also lists 100 minutes for $395, 200 for $720, and 500 for $1,725. It lists 24/7 bilingual answering, scheduling, payment collection, and outbound call assistance among its capabilities.",
          source: "Official plans and pricing",
          href: "https://www.ruby.com/plans-and-pricing/",
        },
      ],
    },
    custom: {
      eyebrow: "When a standard plan stops fitting",
      title: "A custom call system is a different kind of alternative.",
      body: "Abe Media builds around the operation: approved intake, pricebook authority, calendar rules, dispatch handoff, Spanish coverage, failure alerts, and human ownership. Scope and cost come after the free audit, so a flat public price would be inaccurate here.",
      ruleTitle: "The pricing boundary",
      ruleBody: "AI reads the message. The customer's pricebook sets the price. If the request falls outside approved scope, a person decides what happens next.",
      flow: [
        { title: "Answer", body: "Use the business name, identify the request, and collect only approved information." },
        { title: "Apply rules", body: "Check service area, job type, availability, language, and pricebook authority." },
        { title: "Book or hand off", body: "Complete the approved path or send a person the context needed to own the exception." },
        { title: "Expose failure", body: "Create an alert and callback task when a phone, calendar, CRM, or notification step fails." },
      ],
    },
    limits: {
      eyebrow: "Honest limits",
      title: "What these systems will not solve by themselves.",
      intro: "Every provider depends on the rules, access, testing, and human ownership your business supplies.",
      items: [
        "Diagnose a technical, structural, electrical, plumbing, medical, or safety problem",
        "Invent a price, discount, warranty term, arrival window, or refund",
        "Know an undocumented service area, scheduling exception, crew constraint, or company policy",
        "Guarantee that every calendar, CRM, phone, payment, or messaging integration will stay available",
        "Take responsibility for an emergency, threat, dispute, unusual job, or failed handoff",
      ],
      note: "A live receptionist also works inside the instructions and access you provide. Complex trade decisions and policy exceptions still belong with your team.",
    },
    operator: {
      eyebrow: "An operator's test",
      title: "The call has to reach the field intact.",
      body: "Abe Perez spent 17 years in Waste Management operations, working across an operation with more than 300 vehicles and 27 direct reports. That experience keeps the comparison focused on ownership: what the caller requested, what was promised, who receives the exception, and how a failed handoff becomes visible.",
      link: "Read Abe Perez's operating background",
    },
    related: {
      eyebrow: "Keep researching",
      title: "Check the surrounding call system.",
      items: [
        { href: "/ai-receptionist-vs-answering-service", title: "AI vs. human answering", body: "Decide which calls need repeatable automation and which need human judgment." },
        { href: "/missed-call-text-back", title: "Missed call text back", body: "Plan what happens when the first call goes unanswered." },
        { href: "/how-it-works", title: "How the pipeline works", body: "Follow a lead through intake, booking, dispatch, and exceptions." },
        { href: "/industries/junk-removal", title: "Junk removal call system", body: "See the operating model applied to one home service trade." },
      ],
    },
    faq: {
      eyebrow: "Straight answers",
      title: "Smith.ai alternatives FAQ",
      items: [
        { q: "What is the best Smith.ai alternative for a home service business?", a: "Rosie is a practical option for lower-entry bilingual AI. Goodcall may fit teams that prefer unique-caller billing. My AI Front Desk may fit teams that want phone, text, web chat, and CRM together. Ruby fits businesses that want a human answering calls. The best fit depends on your actual call mix and handoff rules." },
        { q: "Which Smith.ai alternative has human receptionists?", a: "Ruby is the human-first option in this comparison. Smith.ai also sells a separate human receptionist service and lists on-demand live-agent escalation for its AI receptionist. Confirm the exact coverage and charges on the provider's current plan." },
        { q: "Which alternative supports Spanish calls?", a: "Rosie publicly lists English and Spanish, Ruby lists bilingual receptionists, and My AI Front Desk lists more than 20 languages. Language support still needs a live test across intake, booking, transfers, texts, and fallback messages." },
        { q: "Can these services book home service appointments?", a: "Several providers list scheduling or calendar booking, but the capability varies by plan. Confirm live availability, job duration, service-area rules, rescheduling, cancellation, and the exact point where a person must take over." },
        { q: "Can an AI receptionist quote a job?", a: "It can state an approved amount when the customer's pricebook and rules supply that amount. AI reads the message. The customer's pricebook sets the price. Unclear scope, special access, hazardous material, and other exceptions should go to a person." },
        { q: "Is per-call, per-minute, or unique-caller billing cheaper?", a: "There is no single cheapest billing model. Use your monthly call count, average duration, repeat-caller rate, transfers, Spanish calls, and overages. A short high-volume call mix behaves differently from long technical intake with repeat callers." },
        { q: "When should a home service business consider a custom system?", a: "Consider a custom build when the receptionist must connect to your pricebook, scheduling rules, CRM, dispatch process, bilingual path, failure alerts, and defined human ownership. The operating requirements should be documented before software is chosen." },
      ],
    },
    final: {
      eyebrow: "Choose from your call evidence",
      title: "Map the call before you buy the plan.",
      body: "The free AI Readiness Audit reviews your call types, pricebook authority, booking rules, Spanish path, exceptions, integrations, and fallback so you can compare providers against the work they must perform.",
      cta: "Get the free AI Readiness Audit",
    },
  },
  es: {
    metaTitle: "Alternativas a Smith.ai para servicios del hogar | Abe Media",
    metaDescription: "Compara Smith.ai con Rosie, Goodcall, My AI Front Desk, Ruby y un sistema personalizado para ingreso, agenda, cobro y pases operativos.",
    hero: {
      eyebrow: "Guía telefónica para servicios del hogar",
      titleStart: "ALTERNATIVAS A",
      titleHighlight: "SMITH.AI",
      titleEnd: "PARA SERVICIOS.",
      lede: "Rosie ofrece una entrada accesible a la atención con IA. Goodcall sirve a equipos que prefieren cobro por cliente único. My AI Front Desk cubre teléfono, texto, chat web y CRM. Ruby pone a una persona en la llamada. Smith.ai sigue siendo una opción cuando su IA y red de agentes coinciden con tus reglas de pase.",
      cta: "Obtén la auditoría gratuita de preparación para IA",
      note: "La decisión depende de tus llamadas, reglas de agenda, recorrido en español, integraciones y excepciones que debe resolver tu equipo.",
      answerLabel: "Respuesta directa",
      answerTitle: "Elige según la parte difícil de la llamada.",
      answerBody: "Empieza con el momento que puede perder el trabajo: una transferencia, una solicitud fuera de horario, un precio poco claro, una llamada en español o una excepción de agenda. Luego elige al proveedor cuyo plan público respalde ese recorrido.",
    },
    criteria: {
      eyebrow: "Antes de comparar planes",
      title: "Define lo que debe hacer el teléfono.",
      intro: "Un precio mensual bajo puede salir caro cuando tu oficina tiene que volver a capturar datos, devolver mensajes incompletos o corregir citas mal agendadas.",
      items: [
        { title: "Unidad de cobro", body: "Compara llamadas, minutos, agentes, clientes únicos, uso incluido, excedentes y funciones pagadas contra un mes normal." },
        { title: "Autoridad para agendar", body: "Confirma si el sistema lee disponibilidad en vivo, respeta la duración de cada trabajo y se detiene fuera de la política." },
        { title: "Recorrido en español", body: "Prueba la llamada, agenda, transferencia, texto y respaldo completos en español. El saludo traducido es solamente el primer paso." },
        { title: "Evidencia del pase", body: "Tu equipo debe recibir al cliente, motivo, transcripción o notas, horario solicitado y la regla que causó el pase." },
      ],
    },
    comparison: {
      eyebrow: "Comparación directa",
      title: "Cinco proveedores. Distintas condiciones.",
      intro: "Revisamos estos precios y funciones públicas el 20 de agosto de 2026. Los proveedores pueden cambiar planes, límites y funciones. Verifica la fuente enlazada antes de contratar.",
      mobileHint: "Desliza la tabla para comparar todas las columnas.",
      headers: ["Proveedor", "Precio público inicial", "Modelo de cobro", "Ruta humana", "Uso apropiado"],
      rows: [
        ["Recepcionista con IA de Smith.ai", "$0 por 25 llamadas al mes", "Por llamada", "Escalación a la red de agentes en vivo de Smith.ai", "Equipos que quieren un proveedor para ingreso con IA y una ruta definida a un agente"],
        ["Rosie", "$49 al mes por 250 minutos", "Minutos incluidos según el plan", "Los planes superiores incluyen transferencias", "Ingreso bilingüe con IA y un precio público inicial menor"],
        ["Goodcall", "$79 al mes por agente", "Clientes únicos, con minutos ilimitados publicados", "Dirige por lógica y contactos configurados", "Equipos con clientes que repiten y prefieren calcular por cliente único"],
        ["My AI Front Desk", "$99 al mes o $79 al mes con pago anual", "Uso de voz incluido más uso por canal", "Flujos e integraciones configurados", "Teléfono, SMS, chat web, voz web y CRM en un producto"],
        ["Ruby", "$250 por 50 minutos de recepcionista al mes", "Minutos de recepcionista", "Recepcionistas humanas contestan", "Negocios que quieren atención humana y tranquilidad para quien llama"],
      ],
      note: "El precio inicial no muestra el costo operativo completo. Suma las funciones de agenda, transferencias, excedentes, configuración y el tiempo que tu personal dedica a corregir o completar el ingreso.",
    },
    providers: {
      eyebrow: "Datos verificados",
      title: "Lo que dice cada plan público.",
      items: [
        {
          name: "Smith.ai",
          price: "$0 por 25 llamadas con IA",
          body: "La página de IA muestra Pro por $150 al mes en la selección de 75 llamadas y $2 por llamada adicional. Smith.ai publica atención 24/7, calificación, dirección, agenda, grabaciones, transcripciones, resúmenes y escalación a agentes en vivo.",
          source: "Precio oficial de IA",
          href: "https://smith.ai/pricing/ai-receptionist",
        },
        {
          name: "Rosie",
          price: "$49 por 250 minutos",
          body: "El plan Professional publica inglés y español, llamadas simultáneas, mensajes personalizados, enlaces de citas, transcripciones y grabaciones. La agenda directa y las transferencias aparecen en Scale por $149 con 1,000 minutos.",
          source: "Precio oficial",
          href: "https://heyrosie.com/pricing",
        },
        {
          name: "Goodcall",
          price: "$79 por agente",
          body: "Starter publica minutos y tokens ilimitados para 100 clientes únicos al mes y después $0.50 por cliente. Ese nivel incluye un flujo lógico, tres miembros del equipo, tres contactos del directorio y siete días de detalles.",
          source: "Precio oficial",
          href: "https://www.goodcall.com/pricing",
        },
        {
          name: "My AI Front Desk",
          price: "$99 al mes",
          body: "La página pública muestra $79 al mes con pago anual para Business-in-a-Box, con 200 minutos de voz, atención telefónica, chat web, SMS, voz web, CRM nativo con IA y más de 20 idiomas.",
          source: "Precio oficial",
          href: "https://www.myaifrontdesk.com/pricing",
        },
        {
          name: "Ruby",
          price: "$250 por 50 minutos",
          body: "La página de Ruby también muestra 100 minutos por $395, 200 por $720 y 500 por $1,725. Entre sus funciones publica atención bilingüe 24/7, agenda, cobros y ayuda con llamadas salientes.",
          source: "Planes y precios oficiales",
          href: "https://www.ruby.com/plans-and-pricing/",
        },
      ],
    },
    custom: {
      eyebrow: "Cuando un plan estándar ya no encaja",
      title: "Un sistema personalizado es otro tipo de alternativa.",
      body: "Abe Media crea el sistema alrededor de la operación: ingreso aprobado, autoridad de la lista de precios, reglas de agenda, pase a dispatch, atención en español, alertas de falla y responsabilidad humana. El alcance y costo se definen después de la auditoría gratuita, así que un precio público fijo sería impreciso.",
      ruleTitle: "El límite de precios",
      ruleBody: "La IA interpreta el mensaje. La lista de precios del cliente establece el precio. Si la solicitud queda fuera del alcance aprobado, una persona decide el siguiente paso.",
      flow: [
        { title: "Contestar", body: "Usar el nombre del negocio, identificar la solicitud y reunir solamente los datos aprobados." },
        { title: "Aplicar reglas", body: "Revisar área de servicio, tipo de trabajo, disponibilidad, idioma y autoridad de precios." },
        { title: "Agendar o pasar", body: "Completar el recorrido aprobado o enviar a una persona el contexto necesario para resolver la excepción." },
        { title: "Exponer la falla", body: "Crear una alerta y tarea de devolución cuando falle telefonía, calendario, CRM o una notificación." },
      ],
    },
    limits: {
      eyebrow: "Límites claros",
      title: "Lo que estos sistemas no resuelven por sí solos.",
      intro: "Cada proveedor depende de las reglas, acceso, pruebas y responsabilidad humana que aporte tu negocio.",
      items: [
        "Diagnosticar un problema técnico, estructural, eléctrico, de plomería, médico o de seguridad",
        "Inventar un precio, descuento, garantía, hora de llegada o reembolso",
        "Conocer un área de servicio, excepción de agenda, límite de cuadrilla o política sin documentar",
        "Garantizar que toda integración de calendario, CRM, teléfono, pago o mensajería siempre estará disponible",
        "Hacerse responsable de una emergencia, amenaza, disputa, trabajo inusual o pase fallido",
      ],
      note: "Una recepcionista humana también trabaja dentro de las instrucciones y el acceso que proporcionas. Las decisiones técnicas y excepciones de política siguen en manos de tu equipo.",
    },
    operator: {
      eyebrow: "La prueba del operador",
      title: "La llamada debe llegar completa al campo.",
      body: "Abe Perez pasó 17 años en operaciones de Waste Management, trabajando en una operación con más de 300 vehículos y 27 reportes directos. Esa experiencia mantiene la comparación enfocada en la responsabilidad: qué pidió el cliente, qué se prometió, quién recibe la excepción y cómo se vuelve visible un pase fallido.",
      link: "Conoce la experiencia operativa de Abe Perez",
    },
    related: {
      eyebrow: "Sigue investigando",
      title: "Revisa el sistema alrededor de la llamada.",
      items: [
        { href: "/ai-receptionist-vs-answering-service", title: "IA frente a atención humana", body: "Decide qué llamadas pueden seguir reglas y cuáles necesitan criterio humano." },
        { href: "/missed-call-text-back", title: "Texto para llamadas perdidas", body: "Planea lo que pasa cuando nadie contesta la primera llamada." },
        { href: "/how-it-works", title: "Cómo funciona el flujo", body: "Sigue un lead por ingreso, agenda, dispatch y excepciones." },
        { href: "/industries/junk-removal", title: "Sistema para junk removal", body: "Mira el modelo operativo aplicado a un servicio del hogar." },
      ],
    },
    faq: {
      eyebrow: "Respuestas directas",
      title: "Preguntas sobre alternativas a Smith.ai",
      items: [
        { q: "¿Cuál es la mejor alternativa a Smith.ai para servicios del hogar?", a: "Rosie ofrece una entrada accesible a IA bilingüe. Goodcall puede servir a equipos que prefieren cobro por cliente único. My AI Front Desk reúne teléfono, texto, chat web y CRM. Ruby sirve a negocios que quieren atención humana. La opción apropiada depende de tus llamadas y reglas de pase." },
        { q: "¿Qué alternativa a Smith.ai tiene recepcionistas humanas?", a: "Ruby es la opción centrada en personas dentro de esta comparación. Smith.ai también vende un servicio humano separado y publica escalación a agentes en vivo para su recepcionista con IA. Confirma la cobertura y cargos del plan actual." },
        { q: "¿Qué alternativa atiende llamadas en español?", a: "Rosie publica inglés y español, Ruby publica recepcionistas bilingües y My AI Front Desk publica más de 20 idiomas. Aun así, debes probar ingreso, agenda, transferencias, textos y mensajes de respaldo en español." },
        { q: "¿Estos servicios pueden agendar citas?", a: "Varios proveedores publican agenda o conexión con calendarios, pero la función cambia según el plan. Confirma disponibilidad en vivo, duración, área de servicio, cambios, cancelaciones y el momento exacto donde debe intervenir una persona." },
        { q: "¿Una recepcionista con IA puede cotizar un trabajo?", a: "Puede decir una cantidad aprobada cuando la lista de precios y las reglas del cliente la proporcionan. La IA interpreta el mensaje. La lista de precios del cliente establece el precio. El alcance poco claro y las excepciones deben pasar a una persona." },
        { q: "¿Es más barato cobrar por llamada, minuto o cliente único?", a: "No existe un modelo más barato para todos. Usa tu cantidad mensual de llamadas, duración promedio, clientes que repiten, transferencias, llamadas en español y excedentes. Un alto volumen de llamadas cortas se comporta distinto a ingresos técnicos largos." },
        { q: "¿Cuándo conviene un sistema personalizado?", a: "Considéralo cuando la recepcionista debe conectarse con tu lista de precios, agenda, CRM, dispatch, recorrido bilingüe, alertas de falla y responsabilidad humana definida. Primero se documentan los requisitos operativos y después se elige el software." },
      ],
    },
    final: {
      eyebrow: "Decide con evidencia de tus llamadas",
      title: "Traza la llamada antes de comprar el plan.",
      body: "La auditoría gratuita de preparación para IA revisa tipos de llamada, autoridad de precios, reglas de agenda, recorrido en español, excepciones, integraciones y respaldo para comparar proveedores contra el trabajo real.",
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
    path: "/smith-ai-alternatives-home-services",
  });
}

export default async function SmithAiAlternativesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale === "es" ? "es" : "en";
  const copy = lang === "es" ? pageCopy.es : pageCopy.en;
  const pageUrl = `${baseUrl}/${lang}/smith-ai-alternatives-home-services`;
  const contactUrl = `/${lang}/contact`;
  const criteriaIcons = [CircleDollarSign, PhoneCall, Languages, ShieldAlert];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: copy.metaTitle.replace(" | Abe Media", ""),
    description: copy.metaDescription,
    url: pageUrl,
    datePublished: "2026-08-20",
    dateModified: "2026-08-20",
    inLanguage: lang === "es" ? "es-US" : "en-US",
    author: { "@type": "Person", name: "Abe Perez", url: `${baseUrl}/${lang}/about/abe-perez` },
    publisher: { "@id": `${baseUrl}/#organization` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }} />

      <header className="relative bg-[#0b1018] px-5 pt-36 pb-20 text-white sm:px-8 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#E34F0B]/15 blur-[140px]" />
        <div className="relative mx-auto grid max-w-[1120px] items-center gap-14 lg:grid-cols-[1.05fr_0.75fr]">
          <div>
            <p className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.2em] text-[#E34F0B]">{copy.hero.eyebrow}</p>
            <h1 className="mt-6 text-[clamp(3.4rem,7.5vw,7.1rem)] leading-[0.83] text-white">
              {copy.hero.titleStart}<br />
              <span className="text-[#E34F0B]">{copy.hero.titleHighlight}</span><br />
              {copy.hero.titleEnd}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">{copy.hero.lede}</p>
            <Link href={contactUrl} className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#E34F0B] px-6 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-[#111827]">
              {copy.hero.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-6 max-w-3xl font-[var(--font-ds-mono)] text-xs leading-6 uppercase tracking-[0.14em] text-white/42">{copy.hero.note}</p>
          </div>
          <aside className="border border-white/15 bg-white/[0.055] p-7 shadow-[0_35px_90px_rgba(0,0,0,.35)] backdrop-blur-sm md:p-9">
            <Bot className="h-7 w-7 text-[#E34F0B]" />
            <p className="mt-8 font-[var(--font-ds-mono)] text-[11px] uppercase tracking-[0.18em] text-[#E34F0B]">{copy.hero.answerLabel}</p>
            <h2 className="mt-4 text-3xl font-bold text-white">{copy.hero.answerTitle}</h2>
            <p className="mt-5 border-l-2 border-[#E34F0B] pl-5 leading-7 text-white/67">{copy.hero.answerBody}</p>
          </aside>
        </div>
      </header>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div><p className="ds-eyebrow">{copy.criteria.eyebrow}</p><h2 className="mt-5 text-[clamp(3.3rem,6vw,6rem)] leading-[0.9]">{copy.criteria.title}</h2></div>
            <p className="max-w-2xl text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.criteria.intro}</p>
          </div>
          <div className="mt-12 grid gap-px border border-[var(--ds-line-soft)] bg-[var(--ds-line-soft)] md:grid-cols-2 lg:grid-cols-4">
            {copy.criteria.items.map((item, index) => {
              const Icon = criteriaIcons[index];
              return <article key={item.title} className="min-h-64 bg-background p-7"><Icon className="h-7 w-7 text-[#E34F0B]" /><h3 className="mt-10 text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--ds-ink-mute)]">{item.body}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--ds-line-soft)] bg-[var(--band)] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <p className="ds-eyebrow">{copy.comparison.eyebrow}</p>
          <h2 className="mt-5 max-w-4xl text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9]">{copy.comparison.title}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.comparison.intro}</p>
          <p className="mt-4 font-[var(--font-ds-mono)] text-[11px] uppercase tracking-[0.12em] text-[#E34F0B] md:hidden">{copy.comparison.mobileHint}</p>
          <div className="mt-10 overflow-x-auto border border-[var(--ds-line-soft)] bg-background">
            <table className="w-full min-w-[1040px] border-collapse text-left">
              <thead className="bg-[#111827] text-white"><tr>{copy.comparison.headers.map((header) => <th key={header} className="border-r border-white/10 px-5 py-4 font-[var(--font-ds-mono)] text-[11px] uppercase tracking-[0.12em] last:border-r-0">{header}</th>)}</tr></thead>
              <tbody>{copy.comparison.rows.map((row) => <tr key={row[0]} className="border-t border-[var(--ds-line-soft)] first:border-t-0">{row.map((cell, cellIndex) => <td key={`${row[0]}-${cellIndex}`} className={`border-r border-[var(--ds-line-soft)] px-5 py-5 align-top text-sm leading-6 last:border-r-0 ${cellIndex === 0 ? "w-48 font-bold text-[var(--ds-ink)]" : "text-[var(--ds-ink-mute)]"}`}>{cellIndex === 0 ? <span className="flex items-center gap-3"><PhoneCall className="h-5 w-5 shrink-0 text-[#E34F0B]" />{cell}</span> : cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="mt-5 border-l-2 border-[#E34F0B] pl-5 leading-7 text-[var(--ds-ink-mute)]">{copy.comparison.note}</p>
        </div>
      </section>

      <section className="bg-[#0b1018] px-5 py-20 text-white sm:px-8 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <p className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.18em] text-[#E34F0B]">{copy.providers.eyebrow}</p>
          <h2 className="mt-5 max-w-4xl text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9] text-white">{copy.providers.title}</h2>
          <div className="mt-12 grid gap-px border border-white/12 bg-white/12 md:grid-cols-2">
            {copy.providers.items.map((item, index) => <article key={item.name} className={`bg-[#0b1018] p-7 md:p-9 ${index === copy.providers.items.length - 1 ? "md:col-span-2" : ""}`}>
              <CircleDollarSign className="h-7 w-7 text-[#E34F0B]" />
              <p className="mt-8 font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.13em] text-white/48">{item.name}</p>
              <h3 className="mt-3 text-3xl font-bold text-white">{item.price}</h3>
              <p className="mt-4 max-w-3xl leading-7 text-white/60">{item.body}</p>
              <a href={item.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#E34F0B] underline decoration-[#E34F0B]/35 underline-offset-4 hover:decoration-[#E34F0B]">{item.source}<ExternalLink className="h-4 w-4" /></a>
            </article>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div><p className="ds-eyebrow">{copy.custom.eyebrow}</p><h2 className="mt-5 text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9]">{copy.custom.title}</h2><p className="mt-7 text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.custom.body}</p></div>
            <div className="border border-[var(--ds-line-soft)] bg-[var(--ds-raise)] p-7 md:p-9">
              <h3 className="text-2xl font-bold">{copy.custom.ruleTitle}</h3><p className="mt-4 border-l-2 border-[#E34F0B] pl-5 leading-7 text-[var(--ds-ink-mute)]">{copy.custom.ruleBody}</p>
              <div className="mt-8 divide-y divide-[var(--ds-line-soft)] border-y border-[var(--ds-line-soft)]">{copy.custom.flow.map((step, index) => <article key={step.title} className="grid gap-3 py-5 md:grid-cols-[48px_0.65fr_1.35fr]"><span className="font-[var(--font-ds-mono)] text-xs text-[#E34F0B]">0{index + 1}</span><h4 className="font-bold">{step.title}</h4><p className="text-sm leading-6 text-[var(--ds-ink-mute)]">{step.body}</p></article>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--ds-line-soft)] bg-[var(--band)] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div><p className="ds-eyebrow">{copy.limits.eyebrow}</p><h2 className="mt-5 text-[clamp(3.3rem,6vw,6rem)] leading-[0.9]">{copy.limits.title}</h2><p className="mt-7 max-w-xl text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.limits.intro}</p></div>
          <div className="border border-[var(--ds-line-soft)] bg-background p-7 md:p-9"><ShieldAlert className="h-8 w-8 text-[#E34F0B]" /><ul className="mt-7 divide-y divide-[var(--ds-line-soft)] border-y border-[var(--ds-line-soft)]">{copy.limits.items.map((item) => <li key={item} className="flex gap-3 py-4 leading-7 text-[var(--ds-ink-mute)]"><span className="text-[#E34F0B]">×</span>{item}</li>)}</ul><p className="mt-7 border-l-2 border-[#E34F0B] pl-5 font-semibold leading-7">{copy.limits.note}</p></div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div><p className="ds-eyebrow">{copy.operator.eyebrow}</p><h2 className="mt-5 text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9]">{copy.operator.title}</h2></div>
          <div className="border-l-2 border-[#E34F0B] pl-6 md:pl-8"><p className="text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.operator.body}</p><Link href={`/${lang}/about/abe-perez`} className="mt-6 inline-flex items-center gap-2 font-semibold text-[#E34F0B] hover:underline">{copy.operator.link}<ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <section className="border-y border-[var(--ds-line-soft)] bg-[var(--band)] px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-[1120px]"><p className="ds-eyebrow">{copy.related.eyebrow}</p><h2 className="mt-5 text-[clamp(3rem,5vw,5rem)] leading-[0.92]">{copy.related.title}</h2><div className="mt-10 grid gap-px border border-[var(--ds-line-soft)] bg-[var(--ds-line-soft)] md:grid-cols-2 lg:grid-cols-4">{copy.related.items.map((item) => <Link key={item.href} href={`/${lang}${item.href}`} className="group bg-background p-7 transition-colors hover:bg-[#111827] hover:text-white"><Check className="h-5 w-5 text-[#E34F0B]" /><h3 className="mt-8 text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--ds-ink-mute)] transition-colors group-hover:text-white/60">{item.body}</p><ArrowRight className="mt-7 h-4 w-4 text-[#E34F0B] transition-transform group-hover:translate-x-1" /></Link>)}</div></div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.55fr_1.45fr]">
          <div><p className="ds-eyebrow">{copy.faq.eyebrow}</p><h2 className="mt-5 text-[clamp(3rem,5vw,5rem)] leading-[0.92]">{copy.faq.title}</h2></div>
          <div className="divide-y divide-[var(--ds-line-soft)] border-y border-[var(--ds-line-soft)]">{copy.faq.items.map((item) => <details key={item.q} className="group py-6"><summary className="cursor-pointer list-none pr-8 text-lg font-bold marker:hidden">{item.q}<span aria-hidden="true" className="float-right text-2xl font-normal text-[#E34F0B] transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl pr-8 leading-7 text-[var(--ds-ink-mute)]">{item.a}</p></details>)}</div>
        </div>
      </section>

      <section className="bg-[#E34F0B] px-5 py-20 text-white sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.18em] text-white/75">{copy.final.eyebrow}</p><h2 className="mt-5 max-w-4xl text-[clamp(3.3rem,6vw,6.5rem)] leading-[0.88] text-white">{copy.final.title}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-white/80">{copy.final.body}</p></div><Link href={contactUrl} className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-4 font-semibold text-[#111827] transition-colors hover:bg-[#111827] hover:text-white">{copy.final.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
      </section>
    </article>
  );
}
