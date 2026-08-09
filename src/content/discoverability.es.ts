import type { ContentLink, ContentPageData } from "./discoverability";

/**
 * Spanish content for the pages Abe Media publishes in both languages.
 *
 * This is written as Spanish, not translated from the English file — the site
 * claims the Spanish paths are written natively, so the copy has to read that
 * way. Only the slugs listed here exist in Spanish; every other slug still
 * 404s under /es, which keeps hreflang honest.
 */

const contacto: ContentLink = {
  href: "/es/contact",
  label: "Cuéntanos cómo opera tu negocio",
  description: "Traes el flujo de trabajo, las excepciones y las herramientas que ya usas.",
};

export const servicePagesEs: Record<string, ContentPageData> = {
  "ai-voice-agents": {
    slug: "ai-voice-agents",
    kind: "service",
    eyebrow: "Agentes de voz con IA",
    title: "Contesta todas las llamadas con un agente que sigue tu proceso real",
    metaTitle: "Agentes de Voz con IA en Español e Inglés | Abe Media",
    description:
      "Agentes de voz que contestan, califican, agendan y pasan la información a tu CRM. En inglés y español, con reglas de escalamiento definidas por tu negocio.",
    intro:
      "La llamada que no contestas se la queda el siguiente número de la lista. Un agente de voz bien construido no es un menú grabado ni un chatbot con micrófono: sigue las mismas reglas que seguiría un coordinador con experiencia, hace una pregunta a la vez y sabe cuándo pasarle la llamada a una persona.",
    goodFit: [
      "Las llamadas después de horas caen en buzón y nadie deja mensaje",
      "La mitad de tus clientes prefieren hablar en español",
      "La información del cliente se pierde entre la llamada y el calendario",
      "El equipo contesta el teléfono mientras está trabajando en campo",
    ],
    sections: [
      {
        title: "Un flujo de llamada, no un FAQ hablado",
        body: "El agente recorre la conversación con la estructura que ya usa tu operación.",
        items: [
          "Saludo y aviso de que es un asistente con IA",
          "Preguntas de calificación en orden",
          "Agendado, ruteo o toma de recado",
          "Notas al CRM con los datos reales de la llamada",
        ],
      },
      {
        title: "El escalamiento es parte del diseño",
        body: "Un agente útil reconoce cuándo no le toca improvisar.",
        items: [
          "Transferencia a una persona cuando el cliente la pide o el caso es urgente",
          "Respuestas aprobadas y temas que no puede tocar",
          "Comportamiento definido cuando el calendario o una herramienta falla",
          "Grabaciones y registros para revisar y ajustar",
        ],
      },
      {
        title: "Bilingüe de verdad",
        body: "Cambiar de idioma incluye las preguntas, las reglas del negocio, las confirmaciones y el seguimiento, no nada más el saludo.",
        items: [
          "Rutas naturales en inglés y en español",
          "El cliente cambia de idioma cuando quiere y el agente lo sigue",
          "Los mismos campos se capturan en los dos idiomas",
          "Revisión nativa de todo lo que escucha el cliente",
        ],
      },
    ],
    processTitle: "Cómo se construye",
    process: [
      { title: "Mapear las llamadas", body: "Identificamos los tipos de llamada, los datos obligatorios, lo que descalifica un trabajo y cuándo hay que escalar." },
      { title: "Conectar las herramientas", body: "Se integra el calendario, el CRM, la telefonía y las notificaciones que ya tienes aprobadas." },
      { title: "Probar los casos difíciles", body: "Se prueban llamadas normales, confusas, urgentes, en español y con herramientas caídas." },
      { title: "Lanzar y revisar", body: "Se escuchan conversaciones reales y se ajustan las reglas cuando cambia la operación." },
    ],
    proofTitle: "Trabajo en producción",
    proof:
      "Abe Media construye agentes de admisión bilingües para negocios de servicio en Phoenix, con la misma lógica de excepciones que se usa en despacho real.",
    faqs: [
      {
        question: "¿Cuánto cuesta un agente de voz con IA?",
        answer:
          "Depende del volumen de llamadas, las integraciones, los idiomas y la lógica de agendado. Abe Media primero define el flujo real de la llamada y después entrega el costo de implementación y de operación, antes de empezar.",
      },
      {
        question: "¿De verdad habla español natural o suena traducido?",
        answer:
          "Las rutas en inglés y en español se escriben y se prueban como recorridos completos, incluyendo calificación, confirmaciones, errores y escalamiento. No es una traducción encima del guion en inglés.",
      },
      {
        question: "¿Puede agendar y actualizar el CRM que ya usamos?",
        answer:
          "Con frecuencia sí. Primero se verifica qué APIs soporta tu calendario y tu CRM, se define qué sistema manda en cada campo, y se diseña qué pasa cuando algo falla, antes de permitir escrituras.",
      },
      {
        question: "¿Qué pasa si el cliente pide hablar con una persona?",
        answer:
          "El agente sigue la regla aprobada: transfiere, toma el recado o marca la llamada para revisión. No inventa respuestas ni sigue más allá de lo que tiene permitido.",
      },
      {
        question: "¿El cliente sabe que está hablando con IA?",
        answer:
          "Sí. El agente lo dice directamente cuando se lo preguntan, y el aviso se puede incluir desde el saludo según lo que decida tu negocio.",
      },
    ],
    related: [
      { href: "/es/how-it-works", label: "Cómo funciona el proceso", description: "Sigue el trabajo desde la llamada hasta el cierre." },
      { href: "/es/pricing", label: "Alcance y precios", description: "Revisa cómo se define el alcance de un proyecto." },
      contacto,
    ],
  },
};

export const industryPagesEs: Record<string, ContentPageData> = {
  "junk-removal": {
    slug: "junk-removal",
    kind: "industry",
    eyebrow: "Retiro de escombros y limpieza",
    title: "Responde, cotiza, agenda y despacha sin rehacer el trabajo a mano",
    metaTitle: "Automatización y Despacho para Retiro de Escombros | Abe Media",
    description:
      "Automatización de leads, cotización con lista de precios, agendado, despacho, flujo para choferes y avisos al cliente para empresas de retiro de escombros.",
    intro:
      "En retiro de escombros gana el que contesta primero, y eso se pelea con descripciones incompletas, fotos que no explican todo, precios mínimos, capacidad de cuadrilla y trabajos que nunca se deberían cotizar solos.",
    goodFit: [
      "Los leads de plataformas necesitan respuesta inmediata",
      "Las cotizaciones se rearman leyendo mensajes de texto",
      "El estatus del lead y el despacho viven en herramientas distintas",
      "Las cuadrillas necesitan algo simple que abra en el navegador",
    ],
    sections: [
      {
        title: "Del lead a la cotización",
        body: "La IA extrae los datos del trabajo; las reglas aprobadas de tu negocio ponen el precio.",
        items: ["Captura del lead y de las fotos", "Cruce contra tu lista de precios", "Mínimos que no se rompen", "Revisión humana cuando el volumen es raro"],
      },
      {
        title: "De la cotización al calendario",
        body: "Se confirma zona de servicio y disponibilidad antes de comprometer una fecha.",
        items: ["Calificación del trabajo", "Revisión del calendario", "Confirmación al cliente", "Sincronización con el CRM"],
      },
      {
        title: "Del calendario al trabajo terminado",
        body: "Despacho y cuadrilla ven el mismo registro del trabajo.",
        items: ["Asignación", "Estatus en vivo", "Notas y fotos del trabajo", "Historial de lo que se completó"],
      },
    ],
    processTitle: "Por dónde empezar",
    process: [
      { title: "Revisar de dónde vienen los leads", body: "Se listan los campos, los tiempos y los permisos que da cada fuente." },
      { title: "Documentar las reglas de precio", body: "Se separa lo que la IA puede leer de lo que solo el negocio decide." },
      { title: "Conectar el agendado", body: "Se define disponibilidad, conflictos y qué casos siempre pasan por una persona." },
      { title: "Cerrar el ciclo de despacho", body: "El mismo registro del trabajo llega hasta la asignación y el cierre." },
    ],
    proofTitle: "Rejunk",
    proof:
      "Rejunk junta manejo de leads, despacho, activación de choferes, administración del trabajo y ubicación en vivo en una plataforma que corre en el navegador, para mudanzas y retiro de escombros.",
    faqs: [
      {
        question: "¿La IA puede cotizar todos los trabajos?",
        answer: "No, y no debería. Los trabajos muy grandes, poco claros, con material peligroso o fuera de lo normal se le pasan a una persona.",
      },
      {
        question: "¿Puede usar nuestra lista de precios actual?",
        answer: "Sí. La lista de precios sigue siendo la autoridad; la IA se limita a extraer datos definidos del mensaje o de las fotos del cliente.",
      },
      {
        question: "¿Los choferes pueden usar su propio teléfono?",
        answer: "Un flujo que abre en el navegador permite activarlos rápido sin descargar nada, siempre que cumpla con los requisitos de seguridad del negocio.",
      },
    ],
    related: [
      { href: "/es/portfolio", label: "Trabajo publicado", description: "Revisa sistemas que ya están en producción." },
      { href: "/es/how-it-works", label: "Cómo funciona el proceso", description: "Sigue el lead desde que entra hasta que se cierra." },
      contacto,
    ],
  },
  "home-service-businesses": {
    slug: "home-service-businesses",
    kind: "industry",
    eyebrow: "Servicios para el hogar",
    title: "Contesta la llamada, captura el trabajo y entrégale algo limpio al equipo de campo",
    metaTitle: "IA y Automatización para Servicios del Hogar y HVAC | Abe Media",
    description:
      "Agentes de voz, automatización de leads, agendado, avisos al cliente, estimados y despacho para plomería, HVAC y otros servicios del hogar.",
    intro:
      "En servicios del hogar el crecimiento se fuga entre la llamada, el estimado, el calendario y la cuadrilla. Abe Media diseña esas entregas para que el cliente reciba una respuesta clara y el equipo sepa exactamente qué sigue.",
    goodFit: [
      "Plomería, HVAC, electricidad y trabajos de emergencia después de horas",
      "El calor de Phoenix convierte una falla de aire en una urgencia real",
      "Buena parte de los clientes y del personal de campo hablan español",
      "El técnico llega sin el contexto que dio el cliente por teléfono",
    ],
    sections: [
      {
        title: "La llamada, atendida",
        body: "Nadie que llame con una fuga o sin aire debería escuchar un buzón.",
        items: [
          "Atención 24/7 en inglés y español",
          "Triage de emergencias antes de tomar datos",
          "Dirección de servicio, contacto y descripción del problema",
          "Clasificación de urgencia para despacho",
        ],
      },
      {
        title: "Reglas de seguridad primero",
        body: "Hay llamadas donde lo correcto es dar una instrucción y no seguir tomando datos.",
        items: [
          "Olor a gas: salir del inmueble y llamar al 911",
          "Inundación activa: ubicar la llave de paso principal",
          "Aguas negras dentro de la casa: evitar contacto",
          "Sin enfriamiento con personas vulnerables: se marca como urgente",
        ],
      },
      {
        title: "Una entrega limpia al campo",
        body: "El técnico llega sabiendo lo mismo que sabe la oficina.",
        items: ["Historial del cliente y de la dirección", "Notas de acceso, portones y perros", "Fotos y detalles que dio el cliente", "Confirmación y cierre del trabajo"],
      },
    ],
    processTitle: "Cómo se implementa",
    process: [
      { title: "Escuchar llamadas reales", body: "Se revisan las llamadas que llegan hoy y qué se pierde en cada una." },
      { title: "Definir urgencias", body: "Se acuerda qué es emergencia, qué es mismo día y qué se agenda." },
      { title: "Conectar calendario y CRM", body: "Se define qué sistema manda en cada dato antes de permitir escrituras." },
      { title: "Probar y ajustar", body: "Se revisan conversaciones reales y se corrigen las reglas que no aguantaron." },
    ],
    proofTitle: "Operación real, no teoría",
    proof:
      "El fundador de Abe Media trabajó 17 años en operaciones de Waste Management, incluyendo despacho de más de 300 vehículos. Los sistemas se diseñan alrededor de las excepciones porque ahí es donde se cae la operación.",
    faqs: [
      {
        question: "¿Puede contestar llamadas después de horas y en fin de semana?",
        answer: "Sí. Ese suele ser el mayor retorno: las llamadas de la noche y del fin de semana son las que hoy se van con la competencia.",
      },
      {
        question: "¿Puede atender en español sin que el cliente lo pida?",
        answer: "Sí. El agente detecta el idioma del cliente y continúa toda la conversación en ese idioma, incluyendo las confirmaciones.",
      },
      {
        question: "¿Va a prometer una hora de llegada?",
        answer: "No, salvo que tu negocio lo autorice. Por defecto el agente toma los datos y avisa que despacho confirma el horario.",
      },
    ],
    related: [
      { href: "/es/services/ai-voice-agents", label: "Agentes de voz con IA", description: "Revisa cómo se arma el flujo de llamada." },
      { href: "/es/calculator", label: "Calcula lo que cuestan las llamadas perdidas", description: "Estima el costo real de no contestar." },
      contacto,
    ],
  },
};

/** FAQ page, Spanish. */
export const faqsEs: Array<{ q: string; a: string }> = [
  { q: "¿Cuánto cuesta un agente de voz con IA?", a: "Depende del volumen de llamadas, las integraciones, los idiomas, la lógica de agendado y el soporte. Abe Media define primero el flujo real de la llamada y después entrega el costo de implementación y de operación, antes de comenzar el trabajo." },
  { q: "¿El agente habla inglés y español de forma natural?", a: "Sí. Las rutas en inglés y en español se escriben y se prueban como recorridos completos del cliente: calificación, confirmaciones, errores, escalamiento y salida al CRM. No es una traducción agregada al final." },
  { q: "¿Puede agendar trabajos y actualizar nuestro CRM actual?", a: "Con frecuencia sí. Se verifica qué APIs soportan el calendario y el CRM, se define qué sistema es dueño de cada campo, y se diseña el comportamiento de reintentos y excepciones antes de habilitar escrituras." },
  { q: "¿Qué pasa cuando la IA no está segura o el cliente pide una persona?", a: "El agente sigue la regla aprobada: transferir, tomar el recado o marcar la conversación para revisión humana. No debe inventar una respuesta ni continuar fuera del alcance que tiene permitido." },
  { q: "¿Se puede integrar con el software que ya usamos?", a: "Sí, cuando el proveedor ofrece una vía de integración autorizada. Durante el alcance se validan accesos, límites de uso, propiedad de los datos, reintentos y visibilidad de las fallas." },
  { q: "¿Cuánto tarda un piloto?", a: "Depende de qué tan complejo sea el flujo, del acceso a las integraciones, de la aprobación del contenido y de las pruebas. Un piloto enfocado se define alrededor de un solo flujo medible, y el tiempo se acuerda antes de pagar o desarrollar." },
  { q: "¿Cuándo conviene software a la medida en vez de otra suscripción?", a: "Conviene un producto estándar cuando representa bien tu flujo de trabajo. Conviene software a la medida cuando un proceso importante y ya probado no se puede modelar con seguridad, o cuando los pases manuales repetidos ya son un costo permanente de operación." },
  { q: "¿De quién es el código y los datos?", a: "La propiedad del código, de los datos, de las cuentas de hosting y de los servicios de terceros, junto con los términos de entrega, se establecen en el acuerdo del proyecto antes de empezar a desarrollar." },
  { q: "¿Qué monitoreo, registros y revisión humana se incluyen?", a: "Se diseñan según el flujo de trabajo. Una automatización en producción debe registrar los eventos clave, reintentar solo lo que es seguro reintentar, evitar duplicados, alertar cuando algo falla y mandar a una persona las decisiones de baja confianza." },
  { q: "¿Qué tipo de negocios encajan mejor?", a: "Los que tienen una admisión u operación repetible, volumen suficiente para que los pases importen, reglas de negocio claras y una persona que pueda hacerse cargo de las excepciones. Abe Media tiene experiencia directa en transporte, manejo de residuos, mudanzas, retiro de escombros, césped artificial y servicios del hogar." },
];

/** Industries index page, Spanish. */
export const industriesIndexEs = {
  eyebrow: "Industrias",
  title: "Software formado por la operación, no por la etiqueta de la industria",
  intro:
    "Estas páginas se enfocan en flujos de trabajo que Abe Media ha construido u operado directamente. Cada una habla de las excepciones, los pases entre personas y la evidencia que corresponde a ese trabajo.",
  cta: "Ver el flujo de trabajo",
  note: "Por ahora estas industrias están publicadas en español. Las demás siguen disponibles en inglés.",
};

/** /about/abe-perez (founder) page, both languages. */
export const abePerezPage = {
  en: {
    eyebrow: "Founder · Phoenix, Arizona",
    title: "I ran dispatch before I automated it.",
    lede: "I'm Abe Perez, founder of Abe Media. I build AI agents and operations software for service businesses using the lessons from 17 years at Waste Management.",
    backgroundEyebrow: "Operating background",
    backgroundTitle: "The software starts with the exception",
    background: [
      "Before Abe Media, I worked in Waste Management operations in Southern California, including as a Dispatch Operations Manager during the recycLA era. My dispatch organization supported 300+ vehicles, and I managed 27 direct reports.",
      "That work was not a clean sequence of dots on a map. It meant blocked stops, locked gates, contamination, overweight containers, wrong locations, customer escalations, driver constraints, and reporting requirements. Every exception needed an owner and a next action.",
      "I now build the tools I wanted operators to have: one view of the work, a clear handoff, and a record that explains what happened. References to Waste Management and recycLA describe prior experience; they do not imply a current affiliation.",
    ],
    bringTitle: "What I bring to a build",
    bring: [
      "17 years at Waste Management",
      "English-and-Spanish customer and staff workflows",
      "Production software for transportation, compliance, lead automation, and estimating",
      "An operator's focus on failure states, escalation, and accountability",
      "Founder-led scoping with direct access to the person designing the system",
      "A phased approach that proves the core workflow before expansion",
    ],
    workEyebrow: "Selected work",
    workTitle: "Systems you can inspect",
    ctaTitle: "Bring me the messy workflow.",
    ctaBody: "We'll map the exceptions, decide what should stay human, and scope the smallest useful system.",
    ctaLabel: "Talk with Abe",
  },
  es: {
    eyebrow: "Fundador · Phoenix, Arizona",
    title: "Estuve en despacho antes de automatizarlo.",
    lede: "Soy Abe Perez, fundador de Abe Media. Construyo agentes de IA y software de operaciones para negocios de servicio, con lo que aprendí en 17 años en Waste Management.",
    backgroundEyebrow: "De dónde viene esto",
    backgroundTitle: "El software empieza por la excepción",
    background: [
      "Antes de Abe Media trabajé en operaciones de Waste Management en el sur de California, incluyendo como gerente de operaciones de despacho durante la etapa de recycLA. Mi área daba soporte a más de 300 vehículos y tuve 27 personas a cargo.",
      "Ese trabajo no era una fila ordenada de puntos en un mapa. Era paradas bloqueadas, portones cerrados, contaminación de material, contenedores sobrepeso, direcciones equivocadas, quejas de clientes, límites de horas de los choferes y reportes que había que entregar. Cada excepción necesitaba un responsable y un siguiente paso.",
      "Hoy construyo las herramientas que me hubiera gustado tener: una sola vista del trabajo, una entrega clara entre personas y un registro que explique qué pasó. Las menciones a Waste Management y recycLA describen experiencia previa; no implican una relación actual.",
    ],
    bringTitle: "Lo que traigo a un proyecto",
    bring: [
      "17 años en Waste Management",
      "Flujos de trabajo en inglés y español, para clientes y para personal",
      "Software en producción para transporte, cumplimiento, automatización de leads y estimados",
      "Enfoque de operador en fallas, escalamiento y responsabilidad",
      "Alcance definido por el fundador, con trato directo con quien diseña el sistema",
      "Un enfoque por etapas que prueba el flujo central antes de expandirlo",
    ],
    workEyebrow: "Trabajo seleccionado",
    workTitle: "Sistemas que puedes revisar",
    ctaTitle: "Tráeme el flujo de trabajo complicado.",
    ctaBody: "Mapeamos las excepciones, decidimos qué debe quedarse en manos de una persona y definimos el sistema más pequeño que sirva.",
    ctaLabel: "Habla con Abe",
  },
};

/** /about (company) page, both languages. */
export const aboutPage = {
  en: {
    eyebrow: "About Abe Media",
    title: "An operator who builds the software, not an agency that subcontracts it",
    lede: "Abe Media builds AI voice agents, dispatch platforms, and lead automation for service businesses in Phoenix and across the United States. The work is done by the person who scopes it.",
    body: [
      "Abe Media is the operating brand of Abevision LLC, based in Phoenix, Arizona. Every engagement is scoped and built by Abe Perez, who spent 17 years in Waste Management operations before building software for the same kind of work.",
      "The focus is narrow on purpose: intake and operations for service businesses. Voice agents that answer the phone the way a trained coordinator would, dispatch software that survives field conditions, and lead pipelines that make their own failures visible.",
      "Everything customer-facing is delivered in English and Spanish, written natively in both, because that is how the customers and crews of Phoenix service businesses actually talk.",
    ],
    factsTitle: "The short version",
    facts: [
      "Founded and operated in Phoenix, Arizona",
      "AI voice agents, dispatch platforms, lead automation, custom apps",
      "English and Spanish, written natively in both",
      "17 years of dispatch and waste operations behind the software",
      "Direct access to the person designing and building the system",
    ],
    linksTitle: "Where to go next",
    ctaTitle: "Bring the messy workflow.",
    ctaBody: "We map the exceptions, decide what should stay human, and scope the smallest useful system.",
    ctaLabel: "Talk with Abe",
  },
  es: {
    eyebrow: "Acerca de Abe Media",
    title: "Un operador que construye el software, no una agencia que lo subcontrata",
    lede: "Abe Media construye agentes de voz con IA, plataformas de despacho y automatización de leads para negocios de servicio en Phoenix y en todo Estados Unidos. Lo construye la misma persona que define el alcance.",
    body: [
      "Abe Media es la marca con la que opera Abevision LLC, con base en Phoenix, Arizona. Cada proyecto lo define y lo construye Abe Perez, que trabajó 17 años en operaciones de Waste Management antes de construir software para ese mismo tipo de trabajo.",
      "El enfoque es angosto a propósito: admisión y operaciones para negocios de servicio. Agentes de voz que contestan el teléfono como lo haría un coordinador con experiencia, software de despacho que aguanta las condiciones del campo, y flujos de leads que muestran sus propias fallas.",
      "Todo lo que ve y escucha el cliente se entrega en inglés y en español, escrito de forma nativa en los dos idiomas, porque así es como realmente hablan los clientes y las cuadrillas de los negocios de servicio en Phoenix.",
    ],
    factsTitle: "En corto",
    facts: [
      "Fundada y operada en Phoenix, Arizona",
      "Agentes de voz con IA, plataformas de despacho, automatización de leads y apps a la medida",
      "Inglés y español, escritos de forma nativa en los dos idiomas",
      "17 años de despacho y operaciones de residuos detrás del software",
      "Trato directo con la persona que diseña y construye el sistema",
    ],
    linksTitle: "A dónde seguir",
    ctaTitle: "Trae el flujo de trabajo complicado.",
    ctaBody: "Mapeamos las excepciones, decidimos qué debe seguir en manos de una persona y definimos el sistema más pequeño que sirva.",
    ctaLabel: "Habla con Abe",
  },
};
