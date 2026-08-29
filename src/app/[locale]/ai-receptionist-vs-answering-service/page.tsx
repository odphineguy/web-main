import type { Metadata } from "next";
import Link from "next/link";
import AuditCta from "@/components/AuditCta";
import {
  ArrowRight,
  Bot,
  Check,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  PhoneCall,
  ShieldAlert,
  UserRound,
  Voicemail,
} from "lucide-react";

import { constructMetadata } from "@/lib/seo";

const baseUrl = "https://abemedia.online";

const pageCopy = {
  en: {
    metaTitle: "AI Receptionist vs Answering Service for Contractors | Abe Media",
    metaDescription: "Compare an AI receptionist, a human answering service, and voicemail for contractor calls. See fit, limits, call flow, and verified pricing examples.",
    hero: {
      eyebrow: "Contractor call handling guide",
      titleStart: "AI RECEPTIONIST",
      titleHighlight: "VS. ANSWERING SERVICE",
      titleEnd: "FOR CONTRACTORS.",
      lede: "AI wins when calls follow repeatable rules and need an immediate answer, qualification, or booking. A human answering service wins when callers need judgment, reassurance, or a conversation that regularly leaves the script.",
      cta: "Get your free AI audit",
      proof: "A practical comparison for plumbing, HVAC, roofing, moving, junk removal, landscaping, and other field service businesses.",
      answerLabel: "Direct answer",
      aiTitle: "Choose AI when",
      aiBody: "Most calls are predictable, your schedule and service rules are documented, and after-hours coverage matters.",
      humanTitle: "Choose a human service when",
      humanBody: "Calls often involve distress, disputes, unusual jobs, sensitive details, or judgment that cannot be reduced to approved rules.",
      bottomLine: "Many contractors need both: AI for the repeatable path and a person for defined exceptions.",
    },
    decision: {
      eyebrow: "The operating decision",
      title: "Pick the handler that matches the call.",
      intro: "The phone is part of operations. The right choice depends on what the caller needs, what your business has documented, and where a person must take over.",
      items: [
        { title: "Repeatable intake", body: "AI can ask approved questions, capture the address and service need, and move a standard request to the next step." },
        { title: "Human judgment", body: "A trained receptionist can notice hesitation, calm an upset caller, and work through a request that does not match the script." },
        { title: "Defined handoff", body: "The strongest setup states exactly when the call transfers, who receives it, and what context follows the caller." },
        { title: "Visible fallback", body: "If the system or integration fails, your team needs an alert and a working callback path." },
      ],
    },
    comparison: {
      eyebrow: "Side-by-side comparison",
      title: "AI, a human service, or voicemail?",
      caption: "This table compares the operating model. Individual providers vary, so confirm language coverage, integrations, billing rules, and escalation terms before signing.",
      mobileHint: "Swipe the table to compare every column.",
      headers: ["Option", "Best fit", "Coverage", "Can book", "Complex calls", "Common billing unit"],
      rows: [
        ["AI receptionist", "Repeatable intake and routing", "Can answer concurrently, subject to provider and phone capacity", "Yes, when calendar and rules are connected", "Escalates by defined rule", "Call, minute, or usage tier"],
        ["Human answering service", "Calls needing judgment or reassurance", "Based on staffing and provider coverage", "Often, based on plan and script", "A person can adapt within training and policy", "Minute, call, or plan"],
        ["Voicemail", "Low-priority messages and fallback", "Records when the phone system is available", "No", "Leaves the decision for callback", "Usually included with phone service"],
      ],
      note: "Voicemail can still be a fallback. It gives the caller no live intake, qualification, scheduling, or exception handling.",
    },
    flow: {
      eyebrow: "One contractor call flow",
      title: "A no-cool HVAC call at 7:42 PM.",
      intro: "The caller says the upstairs system stopped cooling and asks for service tonight. Here is a realistic path when AI handles the first response and a person owns the exception.",
      steps: [
        { time: "00:00", title: "Answer and identify", body: "The receptionist answers under the contractor's name and asks whether the caller prefers English or Spanish." },
        { time: "00:18", title: "Collect the facts", body: "It gathers the service address, system issue, property type, callback number, and any safety concern approved for intake." },
        { time: "01:06", title: "Check the operating rules", body: "The request is inside the service area, but the caller wants a same-night arrival that the schedule does not confirm." },
        { time: "01:24", title: "Hold the boundary", body: "The AI does not promise an arrival time or invent a diagnostic fee. AI reads the message. The customer's pricebook sets the price." },
        { time: "01:40", title: "Escalate with context", body: "The on-call dispatcher receives the caller's details, the transcript, and the requested timing, then decides what can be offered." },
      ],
    },
    limits: {
      eyebrow: "Honest limits",
      title: "What the system will not do.",
      intro: "A reliable call system needs boundaries that are visible to the caller and the operator.",
      items: [
        "Diagnose equipment, structural, electrical, plumbing, or health risks over the phone",
        "Promise an arrival window that your live schedule cannot support",
        "Create a price, discount, warranty term, or refund outside approved business rules",
        "Resolve a dispute, threat, emergency, or unusual request without the required human handoff",
        "Keep operating silently after a phone, calendar, CRM, or notification failure",
      ],
      humanNote: "A human answering service has limits too. Shared receptionists depend on the instructions, access, and authority you provide. Complex technical or policy decisions still belong with your team.",
    },
    cost: {
      eyebrow: "Verified cost examples",
      title: "Compare the billing unit before the monthly price.",
      intro: "Providers charge by calls, minutes, agents, or unique callers. A long diagnostic intake can cost more under a minute-based plan. Repeat callers can change the math under a unique-caller plan. These public prices were checked on August 20, 2026 and may change.",
      examples: [
        {
          provider: "Smith.ai AI Receptionist",
          price: "$0 for 25 calls per month",
          body: "Its public AI page also lists Pro at $150 per month with a displayed $2 per-call rate for the selected 75-call volume. Features listed include 24/7 answering, qualification, routing, scheduling, recording, transcription, and summaries.",
          source: "Official AI pricing",
          href: "https://smith.ai/pricing/ai-receptionist",
        },
        {
          provider: "Smith.ai human receptionists",
          price: "$300 for 30 calls per month",
          body: "The published Starter plan lists $11.50 per additional call. Smith.ai says its live team is staffed 24/7 and lists lead qualification and new-client intake as included.",
          source: "Official human pricing",
          href: "https://smith.ai/pricing/receptionists",
        },
        {
          provider: "Ruby virtual receptionists",
          price: "$250 for 50 minutes per month",
          body: "Ruby's public page also lists 100 minutes for $395, 200 for $720, and 500 for $1,725. It lists 24/7 bilingual answering, payment collection, scheduling, and outbound call help among available capabilities.",
          source: "Official plans and pricing",
          href: "https://www.ruby.com/plans-and-pricing/",
        },
        {
          provider: "Goodcall AI",
          price: "$79 per month per agent",
          body: "The Starter plan lists unlimited minutes and tokens for 100 unique customers per month, then $0.50 per customer. It also lists one logic flow and limited history, team members, and directory contacts at that tier.",
          source: "Official pricing",
          href: "https://www.goodcall.com/pricing",
        },
      ],
      takeawayTitle: "What this means for a contractor",
      takeaway: "Price the real call mix. Count monthly calls, average call length, repeat callers, Spanish coverage, transfers, booking work, intake depth, overages, and the time your team still spends on exceptions. Abe Media scopes its work after the free AI Readiness Audit and does not publish a one-size-fits-all figure on this comparison page.",
    },
    operator: {
      eyebrow: "Built from operations",
      title: "The call has to survive the handoff.",
      body: "Abe Perez spent 17 years in Waste Management operations, working across an operation with more than 300 vehicles and 27 direct reports. That background shapes the questions Abe Media asks: who owns the exception, what information reaches dispatch, what the customer was promised, and how a failed handoff becomes visible.",
      link: "Read Abe Perez's operating background",
    },
    related: {
      eyebrow: "Keep researching",
      title: "Useful next steps",
      items: [
        { href: "/missed-call-text-back", title: "Missed call text back", body: "See how an unanswered call can continue by text in English or Spanish." },
        { href: "/how-it-works", title: "How the operating pipeline works", body: "Follow a lead from intake through booking, dispatch, and exception handling." },
        { href: "/pricing", title: "Abe Media pricing approach", body: "See how systems are scoped without forcing every operation into one package." },
        { href: "/about/abe-perez", title: "About Abe Perez", body: "Review the operations experience behind the build process." },
      ],
    },
    faq: {
      eyebrow: "Straight answers",
      title: "AI receptionist FAQ",
      items: [
        { q: "Is an AI receptionist better than an answering service?", a: "It is better for fast, repeatable intake when your rules, schedule, service area, and handoffs are documented. A human answering service is better when many calls require judgment, reassurance, negotiation, or an improvised response." },
        { q: "Can an AI receptionist book contractor appointments?", a: "Yes, when it has approved access to a calendar and clear rules for service area, job type, duration, availability, and exceptions. Requests outside those rules should go to a person." },
        { q: "Can an AI receptionist give prices?", a: "It can state a price only when an approved pricebook and business rules provide that amount. AI reads the message. The customer's pricebook sets the price. Unclear scopes and exceptions go to a person." },
        { q: "What happens when a caller asks for a human?", a: "The call should transfer or create an immediate callback task according to your policy. The person's team should receive the caller details and transcript so the customer does not have to start over." },
        { q: "Does an AI receptionist work in Spanish?", a: "It can, but Spanish needs a complete intake and handoff path. Confirm the provider's language quality, voices, scheduling prompts, escalation messages, and human fallback in Spanish before launch." },
        { q: "How much does an AI receptionist cost compared with a human service?", a: "The public examples on this page show that AI and human services use different billing units. Compare calls, minutes, unique callers, overages, add-ons, and the internal time required for exceptions. Provider prices can change, so verify the linked pages before buying." },
        { q: "Should a contractor replace voicemail completely?", a: "Keep a tested fallback for outages and calls the primary system cannot handle. Voicemail may be that fallback, but it should create a visible callback task with clear ownership." },
      ],
    },
    final: {
      eyebrow: "Start with your call rules",
      title: "Find what AI should handle and what should stay human.",
      body: "The free AI Readiness Audit maps your call types, pricebook authority, booking rules, Spanish path, exceptions, and fallback before you choose a system.",
      cta: "Get your free AI audit",
    },
  },
  es: {
    metaTitle: "Recepcionista con IA vs servicio de contestación | Abe Media",
    metaDescription: "Compara una recepcionista con IA, un servicio humano y el buzón de voz para contratistas. Revisa usos, límites, flujo y precios verificados.",
    hero: {
      eyebrow: "Guía de atención para contratistas",
      titleStart: "RECEPCIONISTA CON IA",
      titleHighlight: "VS. SERVICIO HUMANO",
      titleEnd: "PARA CONTRATISTAS.",
      lede: "La IA gana cuando las llamadas siguen reglas repetibles y necesitan respuesta, calificación o agenda inmediata. Un servicio humano gana cuando la persona necesita criterio, tranquilidad o una conversación que suele salirse del guion.",
      cta: "Obtén la auditoría gratuita de preparación para IA",
      proof: "Una comparación práctica para plomería, HVAC, techado, mudanzas, recolección de basura, jardinería y otros servicios de campo.",
      answerLabel: "Respuesta directa",
      aiTitle: "Elige IA cuando",
      aiBody: "La mayoría de las llamadas son predecibles, tu horario y reglas están documentados y necesitas cobertura fuera de horario.",
      humanTitle: "Elige un servicio humano cuando",
      humanBody: "Las llamadas suelen incluir angustia, disputas, trabajos inusuales, datos delicados o decisiones que no caben en reglas aprobadas.",
      bottomLine: "Muchos contratistas necesitan ambos: IA para el camino repetible y una persona para las excepciones definidas.",
    },
    decision: {
      eyebrow: "La decisión operativa",
      title: "Asigna cada llamada a quien pueda resolverla.",
      intro: "El teléfono forma parte de la operación. La mejor opción depende de lo que necesita la persona, de las reglas que tu negocio tiene documentadas y del punto donde debe intervenir alguien de tu equipo.",
      items: [
        { title: "Ingreso repetible", body: "La IA puede hacer preguntas aprobadas, reunir la dirección y la necesidad del servicio, y mover una solicitud normal al siguiente paso." },
        { title: "Criterio humano", body: "Una recepcionista capacitada puede notar dudas, calmar a una persona molesta y resolver una solicitud que no coincide con el guion." },
        { title: "Pase definido", body: "Una buena configuración indica cuándo transferir, quién recibe la llamada y qué contexto acompaña al cliente." },
        { title: "Respaldo visible", body: "Si falla el sistema o una integración, tu equipo necesita una alerta y una ruta funcional para devolver la llamada." },
      ],
    },
    comparison: {
      eyebrow: "Comparación directa",
      title: "¿IA, servicio humano o buzón de voz?",
      caption: "Esta tabla compara el modelo operativo. Cada proveedor es diferente. Confirma idiomas, integraciones, reglas de cobro y términos de escalación antes de contratar.",
      mobileHint: "Desliza la tabla para comparar todas las columnas.",
      headers: ["Opción", "Mejor uso", "Cobertura", "Puede agendar", "Llamadas complejas", "Unidad de cobro común"],
      rows: [
        ["Recepcionista con IA", "Ingreso y dirección repetibles", "Puede contestar a la vez, sujeto a la capacidad del proveedor y la telefonía", "Sí, cuando el calendario y las reglas están conectados", "Escala según reglas definidas", "Llamada, minuto o nivel de uso"],
        ["Servicio humano", "Llamadas que requieren criterio o tranquilidad", "Depende del personal y la cobertura del proveedor", "Con frecuencia, según el plan y el guion", "Una persona puede adaptarse dentro de su capacitación y política", "Minuto, llamada o plan"],
        ["Buzón de voz", "Mensajes de baja prioridad y respaldo", "Graba cuando el sistema telefónico está disponible", "No", "Deja la decisión para la devolución", "Suele incluirse con el servicio telefónico"],
      ],
      note: "El buzón de voz puede seguir como respaldo. No ofrece ingreso en vivo, calificación, agenda ni manejo de excepciones.",
    },
    flow: {
      eyebrow: "Un flujo realista",
      title: "Una llamada de HVAC a las 7:42 PM.",
      intro: "El cliente dice que el segundo piso dejó de enfriar y pide servicio esa misma noche. Este es un camino realista cuando la IA atiende primero y una persona se hace cargo de la excepción.",
      steps: [
        { time: "00:00", title: "Contestar e identificar", body: "La recepcionista contesta con el nombre del contratista y pregunta si el cliente prefiere inglés o español." },
        { time: "00:18", title: "Reunir los datos", body: "Solicita la dirección, el problema del sistema, el tipo de propiedad, el número de contacto y cualquier asunto de seguridad aprobado para el ingreso." },
        { time: "01:06", title: "Revisar las reglas", body: "La dirección está dentro del área de servicio, pero el cliente quiere una llegada esa noche y el horario no la confirma." },
        { time: "01:24", title: "Respetar el límite", body: "La IA no promete una hora ni inventa una tarifa de diagnóstico. La IA interpreta el mensaje. La lista de precios del cliente establece el precio." },
        { time: "01:40", title: "Escalar con contexto", body: "El despachador de guardia recibe los datos, la transcripción y el horario solicitado, y decide qué puede ofrecer." },
      ],
    },
    limits: {
      eyebrow: "Límites claros",
      title: "Lo que el sistema no hará.",
      intro: "Un sistema confiable necesita límites visibles para el cliente y para quien dirige la operación.",
      items: [
        "Diagnosticar riesgos de equipo, estructura, electricidad, plomería o salud por teléfono",
        "Prometer una hora de llegada que tu horario en vivo no puede respaldar",
        "Crear un precio, descuento, garantía o reembolso fuera de las reglas aprobadas",
        "Resolver una disputa, amenaza, emergencia o solicitud inusual sin el pase humano requerido",
        "Seguir operando en silencio después de una falla de telefonía, calendario, CRM o notificación",
      ],
      humanNote: "Un servicio humano también tiene límites. Las recepcionistas compartidas dependen de las instrucciones, el acceso y la autoridad que les des. Las decisiones técnicas o de política compleja siguen en manos de tu equipo.",
    },
    cost: {
      eyebrow: "Ejemplos de costo verificados",
      title: "Compara la unidad de cobro antes del precio mensual.",
      intro: "Los proveedores cobran por llamadas, minutos, agentes o clientes únicos. Un ingreso técnico largo puede costar más en un plan por minuto. Las llamadas repetidas cambian el cálculo en un plan por cliente único. Revisamos estos precios públicos el 20 de agosto de 2026 y pueden cambiar.",
      examples: [
        {
          provider: "Recepcionista con IA de Smith.ai",
          price: "$0 por 25 llamadas al mes",
          body: "Su página pública también muestra Pro por $150 al mes y una tarifa de $2 por llamada para el volumen seleccionado de 75 llamadas. La lista incluye atención 24/7, calificación, dirección, agenda, grabación, transcripción y resúmenes.",
          source: "Precio oficial de IA",
          href: "https://smith.ai/pricing/ai-receptionist",
        },
        {
          provider: "Recepcionistas humanas de Smith.ai",
          price: "$300 por 30 llamadas al mes",
          body: "El plan Starter publicado cobra $11.50 por cada llamada adicional. Smith.ai indica atención humana 24/7 e incluye calificación de leads e ingreso de clientes nuevos.",
          source: "Precio oficial del servicio humano",
          href: "https://smith.ai/pricing/receptionists",
        },
        {
          provider: "Recepcionistas virtuales de Ruby",
          price: "$250 por 50 minutos al mes",
          body: "La página de Ruby también muestra 100 minutos por $395, 200 por $720 y 500 por $1,725. Entre sus funciones disponibles menciona atención bilingüe 24/7, cobros, agenda y ayuda con llamadas salientes.",
          source: "Planes y precios oficiales",
          href: "https://www.ruby.com/plans-and-pricing/",
        },
        {
          provider: "IA de Goodcall",
          price: "$79 al mes por agente",
          body: "El plan Starter muestra minutos y tokens ilimitados para 100 clientes únicos al mes, y luego $0.50 por cliente. También limita los flujos lógicos, el historial, los miembros del equipo y los contactos del directorio en ese nivel.",
          source: "Precio oficial",
          href: "https://www.goodcall.com/pricing",
        },
      ],
      takeawayTitle: "Qué significa para un contratista",
      takeaway: "Calcula con tus llamadas reales. Cuenta llamadas mensuales, duración promedio, clientes que repiten, cobertura en español, transferencias, agenda, profundidad del ingreso, excedentes y el tiempo que tu equipo todavía dedica a las excepciones. Abe Media define el alcance después de la auditoría gratuita de preparación para IA y no publica una cifra única en esta comparación.",
    },
    operator: {
      eyebrow: "Creado desde la operación",
      title: "La llamada tiene que sobrevivir el pase.",
      body: "Abe Perez pasó 17 años en operaciones de Waste Management, trabajando en una operación con más de 300 vehículos y 27 reportes directos. Esa experiencia define las preguntas de Abe Media: quién se hace cargo de la excepción, qué información recibe dispatch, qué se le prometió al cliente y cómo se vuelve visible un pase fallido.",
      link: "Conoce la experiencia operativa de Abe Perez",
    },
    related: {
      eyebrow: "Sigue investigando",
      title: "Siguientes pasos útiles",
      items: [
        { href: "/missed-call-text-back", title: "Respuesta por texto a llamadas perdidas", body: "Mira cómo una llamada sin respuesta puede continuar por texto en inglés o español." },
        { href: "/how-it-works", title: "Cómo funciona el flujo operativo", body: "Sigue un lead desde el ingreso hasta la agenda, dispatch y manejo de excepciones." },
        { href: "/pricing", title: "Cómo cobra Abe Media", body: "Conoce cómo se define cada sistema sin forzar todas las operaciones dentro del mismo paquete." },
        { href: "/about/abe-perez", title: "Acerca de Abe Perez", body: "Revisa la experiencia en operaciones que guía el proceso de creación." },
      ],
    },
    faq: {
      eyebrow: "Respuestas directas",
      title: "Preguntas sobre recepcionistas con IA",
      items: [
        { q: "¿Una recepcionista con IA es mejor que un servicio humano?", a: "Es mejor para un ingreso rápido y repetible cuando tus reglas, horario, área de servicio y pases están documentados. Un servicio humano es mejor cuando muchas llamadas requieren criterio, tranquilidad, negociación o una respuesta improvisada." },
        { q: "¿Una recepcionista con IA puede agendar citas para contratistas?", a: "Sí, cuando tiene acceso aprobado a un calendario y reglas claras de área, tipo de trabajo, duración, disponibilidad y excepciones. Las solicitudes fuera de esas reglas deben llegar a una persona." },
        { q: "¿Una recepcionista con IA puede dar precios?", a: "Puede decir un precio solamente cuando una lista de precios y las reglas aprobadas proporcionan esa cantidad. La IA interpreta el mensaje. La lista de precios del cliente establece el precio. Los alcances poco claros y las excepciones pasan a una persona." },
        { q: "¿Qué pasa cuando el cliente pide hablar con una persona?", a: "La llamada debe transferirse o crear una tarea inmediata de devolución según tu política. El equipo debe recibir los datos y la transcripción para que el cliente no tenga que repetir todo." },
        { q: "¿Una recepcionista con IA funciona en español?", a: "Puede funcionar, pero necesita un recorrido completo de ingreso y pase en español. Confirma la calidad del idioma, las voces, los mensajes de agenda y escalación, y el respaldo humano en español antes del lanzamiento." },
        { q: "¿Cuánto cuesta una recepcionista con IA frente a un servicio humano?", a: "Los ejemplos públicos de esta página muestran unidades de cobro diferentes. Compara llamadas, minutos, clientes únicos, excedentes, funciones adicionales y el tiempo interno que requieren las excepciones. Los precios pueden cambiar. Verifica las páginas enlazadas antes de comprar." },
        { q: "¿Un contratista debe eliminar por completo el buzón de voz?", a: "Conserva un respaldo probado para fallas y llamadas que el sistema principal no puede manejar. El buzón puede cumplir esa función, pero debe crear una tarea visible con una persona responsable de devolver la llamada." },
      ],
    },
    final: {
      eyebrow: "Empieza con tus reglas de llamada",
      title: "Define qué puede manejar la IA y qué debe seguir en manos humanas.",
      body: "La auditoría gratuita de preparación para IA documenta tus llamadas, autoridad de precios, reglas de agenda, recorrido en español, excepciones y respaldo antes de elegir un sistema.",
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
    path: "/ai-receptionist-vs-answering-service",
  });
}

export default async function AiReceptionistComparisonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale === "es" ? "es" : "en";
  const copy = lang === "es" ? pageCopy.es : pageCopy.en;
  const pageUrl = `${baseUrl}/${lang}/ai-receptionist-vs-answering-service`;

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
  const decisionIcons = [Bot, UserRound, PhoneCall, ShieldAlert];
  const optionIcons = [Bot, UserRound, Voicemail];

  return (
    <article className="ds overflow-hidden bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }} />

      <header className="relative bg-[#0b1018] px-5 pt-36 pb-20 text-white sm:px-8 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#E34F0B]/15 blur-[140px]" />
        <div className="relative mx-auto grid max-w-[1120px] items-center gap-14 lg:grid-cols-[1.04fr_0.76fr]">
          <div>
            <p className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.2em] text-[#E34F0B]">{copy.hero.eyebrow}</p>
            <h1 className="mt-6 max-w-5xl text-[clamp(3.4rem,7.7vw,7.3rem)] leading-[0.83] text-white">
              {copy.hero.titleStart}<br />
              <span className="text-[#E34F0B]">{copy.hero.titleHighlight}</span><br />
              {copy.hero.titleEnd}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">{copy.hero.lede}</p>
            <AuditCta locale={lang} label={copy.hero.cta} className="mt-9" />
            <p className="mt-6 max-w-3xl font-[var(--font-ds-mono)] text-xs leading-6 uppercase tracking-[0.14em] text-white/42">{copy.hero.proof}</p>
          </div>

          <aside className="border border-white/15 bg-white/[0.055] p-6 shadow-[0_35px_90px_rgba(0,0,0,.35)] backdrop-blur-sm md:p-8">
            <p className="font-[var(--font-ds-mono)] text-[11px] uppercase tracking-[0.18em] text-[#E34F0B]">{copy.hero.answerLabel}</p>
            <div className="mt-6 border-t border-white/10 pt-6">
              <Bot className="h-6 w-6 text-[#E34F0B]" />
              <h2 className="mt-5 text-2xl font-bold text-white">{copy.hero.aiTitle}</h2>
              <p className="mt-3 leading-7 text-white/64">{copy.hero.aiBody}</p>
            </div>
            <div className="mt-6 border-t border-white/10 pt-6">
              <UserRound className="h-6 w-6 text-[#E34F0B]" />
              <h2 className="mt-5 text-2xl font-bold text-white">{copy.hero.humanTitle}</h2>
              <p className="mt-3 leading-7 text-white/64">{copy.hero.humanBody}</p>
            </div>
            <p className="mt-7 border-l-2 border-[#E34F0B] pl-4 font-semibold leading-7 text-white/88">{copy.hero.bottomLine}</p>
          </aside>
        </div>
      </header>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="ds-eyebrow">{copy.decision.eyebrow}</p>
              <h2 className="mt-5 text-[clamp(3.3rem,6vw,6rem)] leading-[0.9]">{copy.decision.title}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.decision.intro}</p>
          </div>
          <div className="mt-12 grid gap-px border border-[var(--ds-line-soft)] bg-[var(--ds-line-soft)] md:grid-cols-2 lg:grid-cols-4">
            {copy.decision.items.map((item, index) => {
              const Icon = decisionIcons[index];
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

      <section className="border-y border-[var(--ds-line-soft)] bg-[var(--band)] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <p className="ds-eyebrow">{copy.comparison.eyebrow}</p>
          <h2 className="mt-5 max-w-4xl text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9]">{copy.comparison.title}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.comparison.caption}</p>
          <p className="mt-4 font-[var(--font-ds-mono)] text-[11px] uppercase tracking-[0.12em] text-[#E34F0B] md:hidden">{copy.comparison.mobileHint}</p>
          <div className="mt-10 overflow-x-auto border border-[var(--ds-line-soft)] bg-background">
            <table className="w-full min-w-[1040px] border-collapse text-left">
              <thead className="bg-[#111827] text-white">
                <tr>
                  {copy.comparison.headers.map((header) => <th key={header} className="border-r border-white/10 px-5 py-4 font-[var(--font-ds-mono)] text-[11px] uppercase tracking-[0.12em] last:border-r-0">{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {copy.comparison.rows.map((row, rowIndex) => {
                  const Icon = optionIcons[rowIndex];
                  return (
                    <tr key={row[0]} className="border-t border-[var(--ds-line-soft)] first:border-t-0">
                      {row.map((cell, cellIndex) => (
                        <td key={`${row[0]}-${cellIndex}`} className={`border-r border-[var(--ds-line-soft)] px-5 py-5 align-top text-sm leading-6 last:border-r-0 ${cellIndex === 0 ? "w-48 font-bold text-[var(--ds-ink)]" : "text-[var(--ds-ink-mute)]"}`}>
                          {cellIndex === 0 ? <span className="flex items-center gap-3"><Icon className="h-5 w-5 shrink-0 text-[#E34F0B]" />{cell}</span> : cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-5 border-l-2 border-[#E34F0B] pl-5 leading-7 text-[var(--ds-ink-mute)]">{copy.comparison.note}</p>
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
            {copy.flow.steps.map((step, index) => (
              <article key={step.time} className="grid gap-4 border-t border-white/12 py-7 first:border-t-0 md:grid-cols-[90px_60px_0.7fr_1.3fr] md:items-start">
                <span className="font-[var(--font-ds-mono)] text-xs tracking-[0.12em] text-[#E34F0B]">{step.time}</span>
                <span className="font-[var(--font-ds-mono)] text-xs text-white/32">0{index + 1}</span>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="leading-7 text-white/60">{step.body}</p>
              </article>
            ))}
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
            <p className="mt-7 border-l-2 border-[#E34F0B] pl-5 font-semibold leading-7">{copy.limits.humanNote}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--ds-line-soft)] bg-[var(--band)] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="ds-eyebrow">{copy.cost.eyebrow}</p>
              <h2 className="mt-5 text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9]">{copy.cost.title}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.cost.intro}</p>
          </div>
          <div className="mt-12 grid gap-px border border-[var(--ds-line-soft)] bg-[var(--ds-line-soft)] md:grid-cols-2">
            {copy.cost.examples.map((example) => (
              <article key={example.provider} className="bg-background p-7 md:p-9">
                <CircleDollarSign className="h-7 w-7 text-[#E34F0B]" />
                <p className="mt-8 font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.13em] text-[var(--ds-ink-mute)]">{example.provider}</p>
                <h3 className="mt-3 text-3xl font-bold">{example.price}</h3>
                <p className="mt-4 leading-7 text-[var(--ds-ink-mute)]">{example.body}</p>
                <a href={example.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#E34F0B] underline decoration-[#E34F0B]/35 underline-offset-4 hover:decoration-[#E34F0B]">
                  {example.source}<ExternalLink className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-6 border border-[#E34F0B]/30 bg-[#E34F0B]/7 p-7 md:grid-cols-[auto_1fr] md:p-9">
            <Clock3 className="h-8 w-8 text-[#E34F0B]" />
            <div>
              <h3 className="text-2xl font-bold">{copy.cost.takeawayTitle}</h3>
              <p className="mt-3 max-w-4xl leading-7 text-[var(--ds-ink-mute)]">{copy.cost.takeaway}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="ds-eyebrow">{copy.operator.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.9]">{copy.operator.title}</h2>
          </div>
          <div className="border-l-2 border-[#E34F0B] pl-6 md:pl-8">
            <p className="text-lg leading-8 text-[var(--ds-ink-mute)]">{copy.operator.body}</p>
            <Link href={`/${lang}/about/abe-perez`} className="mt-6 inline-flex items-center gap-2 font-semibold text-[#E34F0B] hover:underline">
              {copy.operator.link}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--ds-line-soft)] bg-[var(--band)] px-5 py-20 sm:px-8 md:py-24">
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
          <AuditCta locale={lang} label={copy.final.cta} />
        </div>
      </section>
    </article>
  );
}
