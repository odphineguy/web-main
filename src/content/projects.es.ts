import type { Project } from "./projects";

// Spanish edition of projects.ts. Keys must stay identical to the English
// record; the [slug] page falls back to English if a key is ever missing.
// Product names, tech names, and metric values stay untranslated.

export const projectsEs: Record<string, Project> = {
  "dispatch-ai": {
    slug: "dispatch-ai",
    name: "Dispatch AI",
    tagline:
      "Despachador de voz con IA que atiende llamadas entrantes de rutina de principio a fin y pasa las complejas a una persona — creado para mantener cubiertas las mesas de despacho con poco personal.",
    year: "2024–Presente",
    role: "Desarrollador Full-Stack (solo)",
    focus: ["IA de voz", "Automatización de llamadas", "Despacho"],
    metrics: [
      { value: "~70%", label: "de las llamadas de rutina atendidas de principio a fin; el resto pasa a una persona" },
      { value: "Tiempo real", label: "agente de voz en el navegador sobre Gemini 2.5 Live con SOPs respaldados por RAG" },
    ],
    context: [
      "Los centros de despacho en todo el país operan con falta crónica de personal, y la carga llega en picos — los lunes y viernes saturan la mesa. No se puede contratar al ritmo de los picos, así que en un día corto las llamadas se acumulan, los conductores esperan en campo y los clientes sienten cada minuto.",
      "La mayoría de esas llamadas son de rutina y siguen un procedimiento conocido — un contenedor bloqueado, una reja cerrada, un contenedor con sobrepeso. Dispatch AI es un agente de voz que contesta el teléfono, resuelve esas llamadas de rutina de principio a fin y pasa las complejas a una persona. Construido sobre 18 años de operaciones reales de manejo de residuos, está diseñado para quitarle a la mesa cerca del 70% del volumen de llamadas.",
    ],
    problem: [
      "El día de un despachador está dominado por llamadas repetitivas que siguen un procedimiento estándar — y aun así cada una ocupa a una persona, y un lunes con poco personal simplemente no alcanzan las manos para tomarlas todas.",
      "La meta era un agente capaz de llevar una llamada real por sí solo en la mayoría rutinaria, sabiendo sus límites: todo lo que requiere juicio humano o una decisión crítica de seguridad — fuego, materiales peligrosos — se escala a un despachador con todo el contexto, nunca se improvisa con un modelo.",
    ],
    approach: [
      "Construí un agente de voz en el navegador sobre Google Gemini 2.5 Live vía WebSocket — captura real de micrófono, submuestreo PCM y audio en streaming para una conversación natural y de baja latencia en una llamada en vivo.",
      "Lo respaldé con un motor de recuperación que empata el escenario del cliente con el SOP correcto desde una base de conocimiento en Supabase, con respaldo en Google FileSearch y procedimientos de emergencia codificados de forma fija para que las indicaciones de fuego y materiales peligrosos nunca se adivinen.",
      "Conecté una ruta de traspaso a humano: cuando una llamada sale de lo que el agente debe manejar solo, se escala a un despachador con la transcripción y el contexto ya capturados — más registro de llamadas multi-destino en Postgres y un archivo local para auditoría y entrenamiento.",
    ],
    roleIntro: "Ingeniero único — pipeline de voz de extremo a extremo, recuperación, traspaso y capa de datos:",
    roleItems: [
      "Pipeline de voz en tiempo real: captura de micrófono, submuestreo PCM a 16 kHz y gestión de sesiones de Gemini Live en el navegador",
      "Recuperación de SOPs según el escenario, con respaldos en Supabase + Google FileSearch y procedimientos de emergencia fijos",
      "Lógica de escalamiento que entrega las llamadas complejas o críticas de seguridad a un despachador humano con todo el contexto",
      "Registro de llamadas multi-destino (conversaciones y mensajes en Postgres, más archivo local en JSON)",
      "Panel de administración para subir SOPs, crear stores de FileSearch y etiquetar escenarios",
    ],
    outcome: [
      "Un prototipo v4 funcional que prueba el ciclo central: el agente contesta una llamada en vivo, resuelve el escenario de rutina por voz y escala las que necesitan a una persona — con cada llamada registrada.",
      "El objetivo es una mesa de despacho que se mantiene cubierta cuando falta personal — el agente absorbe el ~70% rutinario para que un pico de lunes o viernes ya no signifique llamadas acumuladas. La telefonía, las llamadas concurrentes y una app móvil para conductores son la siguiente etapa, con recuperación, traspaso y registro diseñados para reutilizarse.",
    ],
    images: [
      { src: "/images/portfolio/dispatch-ai/dispai-dash.webp", alt: "Panel de despacho de flota de Dispatch AI con mapa en tiempo real, transcripción en vivo y SOP activo", width: 1920, height: 1440 },
      { src: "/images/portfolio/dispatch-ai/sop-admin.webp", alt: "Administración de SOPs y RAG de Dispatch AI — subir archivos SOP y gestionar la base de conocimiento", width: 1920, height: 1440 },
    ],
    thumbnail: { src: "/images/portfolio/dispatch-ai/dispai-dash.webp", alt: "Panel de despacho de flota de Dispatch AI", width: 1920, height: 1440 },
    metaTitle: "Dispatch AI — Caso de estudio de despachador de voz con IA | Abe Media",
    metaDescription: "Cómo Abe Media construyó un despachador de voz con IA sobre Gemini 2.5 Live que atiende llamadas de rutina de principio a fin, con SOPs respaldados por RAG y escalamiento a humanos.",
  },

  saguarotransport: {
    slug: "saguarotransport",
    name: "Saguaro Transport ERP",
    tagline:
      "ERP a la medida con CRM integrado, portal de clientes, motor de tarifas, optimización de rutas y gestión de conductores.",
    year: "2025–Presente",
    role: "Desarrollador Full-Stack (solo)",
    focus: ["SaaS multi-tenant", "Operación de flotas", "Next.js"],
    metrics: [
      { value: "8", label: "portales desde un solo código — conductor, cliente, operaciones, CRM, RH, contabilidad, admin, marketing" },
      { value: "Multi-tenant", label: "Postgres por cliente con seguridad a nivel de fila" },
    ],
    context: [
      "Los transportistas pequeños y medianos — hotshot, mensajería médica, logística petrolera — operan con un mosaico de correos, hojas de cálculo y software de transporte anticuado. El despacho se atrasa, no hay vista en vivo de vehículos ni tareas, y la facturación es manual.",
      "Saguaro es una plataforma de operaciones todo en uno construida para ese punto medio: empresas que mueven entre 10 y 100 envíos al día, que ya superaron las hojas de cálculo pero no justifican una suite logística empresarial.",
    ],
    problem: [
      "Estos operadores necesitaban despacho, facturación a clientes, alta de conductores, cumplimiento y contabilidad en un solo sistema — con aislamiento estricto de datos entre empresas y acceso según el rol para dueños, despachadores, conductores y clientes.",
      "También tenía que atender audiencias muy distintas desde un solo producto: un sitio público de marketing, una app de conductores, un portal de clientes y un centro de mando interno, cada uno con sus propias reglas de acceso.",
    ],
    approach: [
      "Construí un SaaS multi-tenant en Next.js 16 (App Router) + React 19 donde cada cliente recibe un proyecto Postgres de Supabase dedicado, resuelto por subdominio en un middleware que inyecta el contexto del tenant correcto en cada petición.",
      "Apliqué el acceso con seguridad a nivel de fila para 8 tipos de rol, y compartí un solo motor de precios — distancia por código postal, zonas y recargo de combustible — entre el cotizador público y las tarifas internas de clientes.",
      "Sumé automatización operativa: secuencias de correo de bienvenida con baja en un clic, alertas de vencimiento de placas y reportes semanales de operación, con Stripe, Resend, Mapbox y Sentry integrados.",
    ],
    roleIntro: "Ingeniero y diseñador único en arquitectura, datos y producto:",
    roleItems: [
      "Ruteo multi-tenant por subdominio e inyección de contexto de tenant desde el middleware",
      "Esquema de base de datos y políticas de seguridad a nivel de fila en 27 migraciones",
      "Motor de precios compartido entre el cotizador público y el portal de clientes",
      "Arquitectura de información de 8 portales con control de acceso por portal",
      "Automatización de correo saliente (secuencias de bienvenida, baja en un clic RFC 8058) y la marca con su sistema de diseño",
    ],
    outcome: [
      "En vivo y en uso activo por una empresa de transporte real, operando día a día el despacho, la facturación y los flujos de conductores — desplegado en Vercel con una app súper-admin aparte para aprovisionar nuevos tenants.",
      "La arquitectura escala a nuevos clientes levantando una base de datos y un subdominio aislados — sin cambios de código — con analítica avanzada y optimización de rutas en el plan.",
    ],
    images: [
      { src: "/images/assets-platforms/fleet.png", alt: "Gestión de flota de Saguaro Transport — GPS en tiempo real, mantenimientos y combustible", width: 1910, height: 928 },
      { src: "/images/assets-platforms/crm.png", alt: "CRM de Saguaro Transport — relaciones con clientes, seguimiento de cargas y comunicación", width: 1910, height: 928 },
      { src: "/images/assets-platforms/accounting.png", alt: "Contabilidad de Saguaro Transport — facturación, gastos y reportes para transporte", width: 1910, height: 928 },
    ],
    thumbnail: { src: "/images/portfolio/saguarotransport/saguaro.webp", alt: "Centro de mando de despacho de Saguaro Transport", width: 1600, height: 1200 },
    extraGallery: {
      title: "App del conductor",
      description: "Una app móvil para que los conductores gestionen tareas, sigan sus ingresos y se mantengan conectados en el camino.",
      images: [
        { src: "/images/assets-platforms/sag-app-login.png", alt: "App del conductor de Saguaro — inicio de sesión", width: 1419, height: 2796, mobile: true },
        { src: "/images/assets-platforms/sag-app-home.png", alt: "App del conductor de Saguaro — gestión de tareas", width: 1419, height: 2796, mobile: true },
        { src: "/images/assets-platforms/sag-app-pay.png", alt: "App del conductor de Saguaro — panel de ingresos", width: 1419, height: 2796, mobile: true },
      ],
    },
    liveUrl: "https://www.saguarotransport.com/",
    liveLabel: "saguarotransport.com",
    metaTitle: "Saguaro Transport ERP — Caso de estudio de operaciones de flota multi-tenant | Abe Media",
    metaDescription: "Una operación de transporte completa en una plataforma: despacho, CRM, contabilidad, RH, portal de clientes y app de conductores — Next.js multi-tenant con Postgres por cliente.",
  },

  "hermes-legal-intake": {
    slug: "hermes-legal-intake",
    name: "Hermes — Intake legal fuera de horario",
    tagline:
      "Agente de voz con IA en vivo para despachos legales — contesta una línea telefónica real fuera de horario, captura hechos limpios, clasifica la urgencia y entrega resúmenes listos para el personal, con salvaguardas legales integradas.",
    year: "2026",
    role: "Desarrollador (solo)",
    focus: ["IA de voz", "Agentes de IA", "Cumplimiento legal"],
    metrics: [
      { value: "En vivo", label: "agente de voz con IA contestando una línea real — validado en llamadas reales de 5 a 10 minutos" },
      { value: "Con salvaguardas", label: "nunca da asesoría legal, cotiza honorarios ni promete un caso — y revela que es IA cuando se le pregunta" },
    ],
    context: [
      "Los despachos de lesiones personales pierden dinero real cuando las llamadas fuera de horario caen al buzón. Los hechos que más importan — estado de las lesiones, reportes policiales, datos del seguro — se degradan de la noche a la mañana, y quien no se siente escuchado simplemente llama al siguiente despacho.",
      "Hermes es un agente de voz en vivo fuera de horario que contesta el teléfono, realiza un intake empático, clasifica la urgencia y entrega al personal un resumen listo para actuar por la mañana.",
    ],
    problem: [
      "Los despachos necesitaban un intake consistente y completo a las 2am sin nadie en la línea — capturado igual cada vez, con banderas de conflicto y señales de urgencia que a un tomador de notas cansado se le escaparían.",
      "En un contexto legal el agente también tenía que ser seguro por construcción: nunca dar asesoría legal, estimar el valor de un caso, cotizar honorarios ni sugerir una relación abogado-cliente — y siempre exigir revisión humana.",
    ],
    approach: [
      "Construí y desplegué un agente de voz en vivo en un número telefónico real con ElevenLabs Conversational AI, dirigido por un prompt de intake cuidadosamente diseñado — cálido, una pregunta a la vez, con una apertura de seguridad que canaliza las emergencias médicas al 911 antes de cualquier intake.",
      "Las salvaguardas legales son el producto: el prompt impone cero asesoría legal, cero promesas de honorarios o valor del caso, autorrevelación obligatoria de ser IA y una postura de revisión humana requerida — endurecido con un arnés automatizado de red-team que corre escenarios adversariales (sondeo de identidad de IA, presión por honorarios, preguntas de cobertura) contra el agente en vivo.",
      "Después de cada llamada, una extracción estructurada lleva 22 campos de revisión a un panel para abogados (desplegado en Vercel) donde un abogado verifica cada hecho capturado contra la transcripción, califica confianza y utilidad, y anota ajustes del despacho — detrás de una recuperación de llamadas del lado del servidor protegida con contraseña que nunca expone credenciales del proveedor.",
      "El resultado es un resumen clasificado y listo para el personal (urgente / sensible al tiempo / estándar / fuera de alcance) con lista de datos faltantes, banderas de conflicto, próxima acción recomendada y una vista previa de traspaso al CRM en modo de prueba.",
    ],
    roleIntro: "Constructor único — producto, ingeniería de prompts, salvaguardas y la plataforma de revisión:",
    roleItems: [
      "Ingeniería de prompts del agente de voz y el marco de salvaguardas legales — la propiedad intelectual central que permite operar con seguridad un modelo de bajo costo",
      "Panel de revisión para abogados (desplegado en Vercel): extracción estructurada de 22 campos, verificación hecho por hecho, calificación de confianza y personalización por despacho",
      "Recuperación de llamadas completadas del lado del servidor y protegida con contraseña — sin exponer credenciales ni nombres internos al navegador",
      "Arnés automatizado de pruebas red-team con escenarios adversariales contra el agente en vivo",
      "Contrato portátil de resumen de intake más un motor de referencia determinista: clasificación de triage, extracción de contacto y notas de atención al llamante",
    ],
    outcome: [
      "Un agente funcionando en vivo en una línea real: múltiples llamadas de prueba sin guion de 5 a 10 minutos completadas con éxito, sin dar ni una vez asesoría legal, cotizar un honorario o prometer un caso.",
      "Decisión clave de ingeniería — el agente corre sobre Claude Haiku 4.5, un modelo de bajo costo, y aguantó porque la confiabilidad vive en el prompt y las salvaguardas, no en el tamaño del modelo, manteniendo bajo el costo por llamada.",
      "Hoy se demuestra a despachos a través del panel de revisión desplegado; la entrega a CRM, los webhooks post-llamada y la persistencia asegurada son la siguiente fase.",
    ],
    images: [
      { src: "/images/portfolio/hermes-legal-intake/law1.webp", alt: "Panel de revisión para abogados de Hermes con campos estructurados de intake", width: 1920, height: 1440 },
      { src: "/images/portfolio/hermes-legal-intake/law2.webp", alt: "Resumen de llamada clasificado de Hermes con banderas de urgencia y conflicto", width: 1920, height: 1440 },
    ],
    thumbnail: { src: "/images/portfolio/hermes-legal-intake/law1.webp", alt: "Panel de revisión para abogados de Hermes", width: 1920, height: 1440 },
    metaTitle: "Hermes — Caso de estudio de intake legal por voz con IA | Abe Media",
    metaDescription: "Un agente de voz con IA fuera de horario para despachos legales: intake empático, triage de urgencia, resúmenes listos para el personal y salvaguardas legales endurecidas con red-team.",
  },

  safehub: {
    slug: "safehub",
    name: "SafeHub",
    tagline: "Sistema de detección de cumplimiento de EPP que usa visión computacional para monitorear la seguridad laboral en tiempo real.",
    year: "2025",
    role: "Desarrollador Full-Stack (solo)",
    focus: ["Visión computacional", "Cumplimiento OSHA", "IA para construcción"],
    metrics: [
      { value: "0–100", label: "calificación de seguridad por foto de obra, con cumplimiento de EPP por trabajador" },
      { value: "24", label: "divisiones MasterFormat en el estimador de costos con IA" },
    ],
    context: [
      "Los gerentes de seguridad en construcción supervisan varias obras donde el cumplimiento de EPP y los riesgos aún se registran con recorridos manuales, reportes de incidentes en papel y hojas de cálculo desconectadas — problemas que suelen aparecer solo después de que algo sale mal.",
      "SafeHub reúne detección de riesgos en tiempo real, análisis estructurado de incidentes OSHA e inteligencia de costos en una sola plataforma HSE para operaciones de construcción.",
    ],
    problem: [
      "Las obras no tenían una forma rápida y consistente de leer el cumplimiento de EPP o los riesgos del entorno a partir de una foto, y los reportes de incidentes carecían de análisis de causa raíz repetible y de la determinación de registrabilidad OSHA.",
      "En el lado de estimación, las licitaciones de proyectos con salario prevaleciente (Davis-Bacon) necesitaban desgloses de costos automatizados y calificación de riesgo de sobrecosto sin herramienta alguna.",
    ],
    approach: [
      "Construí una plataforma en React 19 + TypeScript que procesa fotos de obra con Gemini 2.5 y un esquema JSON estructurado — devolviendo conteo de trabajadores, cumplimiento de EPP por artículo, 8 categorías de riesgo y una calificación de seguridad de 0 a 100 en una sola llamada.",
      "Implementé un motor OSHA para registrabilidad según 29 CFR 1904, análisis de causa raíz con 5 porqués y acciones correctivas priorizadas, más un sistema de calificación de 100 puntos con deducciones y bonos por ventana de tiempo.",
      "Agregué un estimador con IA que extrae partidas de PDFs con Gemini Vision, aplica los premios salariales Davis-Bacon en 15 condados de Arizona y 24 divisiones MasterFormat, y predice varianza contra referencias históricas. Firebase + Supabase respaldan auth, datos y almacenamiento; la app se distribuye como PWA en 5 idiomas.",
    ],
    roleIntro: "Ingeniero único en los sistemas de visión, cumplimiento y estimación:",
    roleItems: [
      "Pipeline de análisis de imágenes con Gemini: esquema JSON de EPP/riesgos, reintentos con backoff y calificación por trabajador",
      "Motor de cumplimiento OSHA (registrabilidad 29 CFR 1904, 5 porqués, acciones correctivas priorizadas)",
      "Estimador de construcción con IA: extracción de PDFs, premios salariales Davis-Bacon y predicción de varianza",
      "Sistema de calificación de seguridad de 100 puntos con ventanas de tiempo y calificaciones por letra",
      "PWA multilingüe (5 idiomas) sobre un backend de Firebase + Supabase",
    ],
    outcome: [
      "En producción en abesafehub.netlify.app, convirtiendo una sola foto de obra en una lectura de seguridad calificada y accionable, y los PDFs de licitación en estimados conformes y comparados contra referencias.",
      "Reemplaza las notas de inspección manuales y las hojas de cálculo sueltas con un solo flujo HSE consistente y asistido por IA en todas las obras.",
    ],
    images: [
      { src: "/images/portfolio/safehub/safehub1.webp", alt: "Análisis de foto de obra en SafeHub con cumplimiento de EPP por trabajador y calificación de seguridad", width: 1600, height: 1200 },
      { src: "/images/portfolio/safehub/safehub2.webp", alt: "Análisis de incidentes OSHA e inteligencia de costos en SafeHub", width: 1600, height: 1200 },
    ],
    thumbnail: { src: "/images/portfolio/safehub/safehub.webp", alt: "Panel de SafeHub con calificación de seguridad y tasa de cumplimiento", width: 1600, height: 1200 },
    liveUrl: "https://abesafehub.netlify.app",
    liveLabel: "abesafehub.netlify.app",
    metaTitle: "SafeHub — Caso de estudio de seguridad en construcción con visión computacional | Abe Media",
    metaDescription: "Cumplimiento de EPP a partir de una foto: detección de riesgos con Gemini, análisis de registrabilidad OSHA y un estimador de construcción con IA en una plataforma HSE.",
  },

  misana: {
    slug: "misana",
    name: "MiSana",
    tagline:
      "Diario de síntomas bilingüe para iPhone — registra cómo te sientes, detecta patrones y llega preparado a tus citas. Disponible en el App Store.",
    year: "2025",
    role: "Desarrollador iOS (solo)",
    focus: ["SwiftUI", "IA en el dispositivo", "Salud bilingüe"],
    metrics: [
      { value: "100%", label: "en el dispositivo — sin cuentas, sin servidores, sin analítica" },
      { value: "~1,000", label: "temas de salud bilingües incluidos para uso sin conexión" },
    ],
    context: [
      "Millones de familias hispanas navegan el sistema de salud de EE. UU. a través de una barrera de idioma, y muchas desconfían de las apps de salud que envían datos personales a la nube. La mayoría de las opciones son primero en inglés o dependientes de la nube — exactamente lo contrario de lo que necesitan.",
      "MiSana es un acompañante de salud bilingüe (español mexicano / inglés) y centrado en la privacidad para iPhone, que ayuda a las familias a manejar medicamentos, prepararse para las consultas y obtener respuestas de salud confiables — todo en el dispositivo.",
    ],
    problem: [
      "Las familias necesitaban un solo lugar para llevar medicamentos, registrar síntomas y llegar preparadas a las citas — en su propio idioma, con contenido culturalmente consciente y no una traducción literal.",
      "La IA de salud también tenía que ser segura y privada: sin diagnósticos, sin salida de datos a la nube y con salvaguardas firmes para emergencias — un chatbot que dice \"llama al 911\" ante un dolor de pecho, no uno que adivina.",
    ],
    approach: [
      "Construida de forma nativa en SwiftUI + SwiftData con un motor de IA dual en el dispositivo: Apple Foundation Models en iOS 26, con respaldo en un modelo Qwen 3 local en versiones anteriores — la IA corre con cero llamadas a la nube y cero telemetría.",
      "Agregué un pipeline de medicamentos (escaneo de código de barras + OCR de etiquetas con Vision, consultas a RxNorm/OpenFDA, revisión de interacciones), un flujo de preparación de citas con detección de patrones de síntomas y exportación a PDF, y tendencias de HealthKit en solo lectura alimentando el panel.",
      "Apliqué la seguridad con prompts de sistema limitados a tres oraciones, respuestas ancladas a fuentes, un aviso siempre visible y detección de emergencias — todo localizado por completo en español mexicano e inglés.",
    ],
    roleIntro: "Desarrollador único — arquitectura, IA y producto bilingüe:",
    roleItems: [
      "Coordinador de IA dual en el dispositivo (Apple Foundation Models con respaldo Qwen 3) y salvaguardas de seguridad compartidas",
      "Pipeline de escaneo de medicamentos: código de barras + OCR, consultas RxNorm/OpenFDA, advertencias de interacción",
      "Sistema de preparación de citas con detección de patrones de síntomas y exportación a PDF para médicos",
      "Integración de HealthKit en solo lectura con paneles de tendencias de 7 días",
      "Sistema de diseño bilingüe completo y localización (español mexicano + inglés)",
    ],
    outcome: [
      "Disponible en el App Store — un acompañante de salud bilingüe y centrado en la privacidad que corre por completo en el dispositivo, sin cuentas ni servidores, para que los datos de salud nunca salgan del teléfono.",
      "Demuestra que una IA de salud culturalmente consciente y con salvaguardas puede correr totalmente en el dispositivo, sin necesidad de nube.",
    ],
    images: [
      { src: "/images/portfolio/misana/misana.webp", alt: "Diario de síntomas MiSana en iPhone", width: 1600, height: 1200 },
      { src: "/images/portfolio/misana/misana1.webp", alt: "Registro de síntomas y patrones en MiSana", width: 1920, height: 1440 },
    ],
    thumbnail: { src: "/images/portfolio/misana/misana.webp", alt: "Diario de síntomas bilingüe MiSana", width: 1600, height: 1200 },
    liveUrl: "https://misana.app/",
    liveLabel: "misana.app",
    metaTitle: "MiSana — Caso de estudio de app de salud bilingüe en el dispositivo | Abe Media",
    metaDescription: "Un diario de síntomas bilingüe y centrado en la privacidad para iPhone: IA en el dispositivo, escaneo de medicamentos y preparación de citas sin nube. Disponible en el App Store.",
  },

  "paw-relief": {
    slug: "paw-relief",
    name: "Paw Relief",
    tagline:
      "Rastreador de alergias para mascotas con alertas de alérgenos en tiempo real, reportes de salud listos para el veterinario e insights con IA. Disponible en App Store y Google Play.",
    year: "2024–Presente",
    role: "Desarrollador iOS (solo)",
    focus: ["SwiftUI", "Supabase", "IA en el dispositivo"],
    metrics: [
      { value: "IA local", label: "análisis de síntomas en el dispositivo con Apple Foundation Models" },
      { value: "12 × 7", label: "tipos de síntoma × categorías de detonante para detectar patrones" },
    ],
    context: [
      "Las mascotas tienen reacciones alérgicas recurrentes sin un detonante obvio, y los dueños registran los síntomas de manera esporádica — así que para la consulta veterinaria el patrón ya se perdió. El veterinario ve una instantánea, no la historia.",
      "Paw Relief es un rastreador de alergias y salud para mascotas en iOS y Android que convierte observaciones dispersas en información lista para el veterinario, con análisis de IA que corre en el dispositivo.",
    ],
    problem: [
      "Los dueños necesitaban registrar síntomas, detonantes, peso y fotos a lo largo del tiempo, y que la app encontrara correlaciones — entre dieta, productos, clima y polen — en lugar de dejarlo a la memoria.",
      "La salud de una mascota es información sensible de la familia, así que el análisis de IA tenía que ser privado e instantáneo para los suscriptores, no una llamada medida a la nube.",
    ],
    approach: [
      "Construí la app de iOS de forma nativa en SwiftUI + SwiftData sobre un backend de Supabase (Postgres + Auth + Storage) con seguridad a nivel de fila, Sign in with Apple y suscripciones con StoreKit 2 (2 mascotas gratis; 8 mascotas + IA en premium).",
      "Migré el análisis de síntomas de Gemini en la nube a Apple Foundation Models — en el dispositivo, sin costo y sin que los datos de salud salgan del teléfono — produciendo resultados estructurados con patrones, correlaciones y tendencias de severidad.",
      "Agregué registro multimodal (síntomas, detonantes, peso, fotos), contexto de polen y calidad del aire con OpenWeather, recordatorios locales y un generador de reportes veterinarios que produce un resumen clínico para llevar a la consulta.",
    ],
    roleIntro: "Desarrollador iOS único en app, datos e IA:",
    roleItems: [
      "Arquitectura completa en SwiftUI + SwiftData e integración con Supabase con RLS",
      "Migración de la IA a Apple Foundation Models en el dispositivo desde Gemini en la nube",
      "Sign in with Apple y niveles de suscripción con StoreKit 2 (gratis vs premium)",
      "Registro multimodal (síntomas, detonantes, peso, fotos) con contexto de clima y polen",
      "Generador de reportes veterinarios con resúmenes clínicos estructurados",
    ],
    outcome: [
      "Disponible en el App Store y Google Play, dando a los dueños seguimiento longitudinal de alergias e insights con IA local — el reporte veterinario convierte meses de registros en un resumen clínico de una página.",
      "Mover el análisis al dispositivo eliminó por completo el costo de nube por análisis y mantuvo los datos sensibles de salud en el teléfono.",
    ],
    images: [
      { src: "/images/portfolio/paw-relief/paw.webp", alt: "Página de Paw Relief — registra, gestiona y entiende las alergias de tu mascota", width: 1600, height: 1200 },
      { src: "/images/portfolio/paw-relief/paw-mobile.webp", alt: "Paw Relief en el teléfono", width: 1600, height: 1200 },
    ],
    thumbnail: { src: "/images/portfolio/paw-relief/paw.webp", alt: "Rastreador de alergias para mascotas Paw Relief", width: 1600, height: 1200 },
    liveUrl: "https://paw-relief-landing.vercel.app/",
    liveLabel: "Paw Relief",
    metaTitle: "Paw Relief — Caso de estudio de rastreador de alergias para mascotas | Abe Media",
    metaDescription: "Un rastreador de alergias para mascotas en iOS y Android con análisis de síntomas por IA en el dispositivo, alertas de alérgenos y reportes clínicos para el veterinario.",
  },

  rejunk: {
    slug: "rejunk",
    name: "Rejunk",
    tagline:
      "Plataforma de operaciones de campo para un negocio de retiro de escombro — dos motores de precios alimentan un cotizador, más despacho, agenda, mapas de instalaciones, facturación y una app móvil para conductores.",
    year: "2025–Presente",
    role: "Desarrollador Full-Stack (solo)",
    focus: ["Motor de precios", "Supabase", "Operaciones de campo"],
    metrics: [
      { value: "2", label: "motores de precios, un solo cotizador" },
      { value: "13", label: "módulos de operación en una plataforma" },
    ],
    context: [
      "Una empresa nueva de retiro de escombro en Phoenix estaba arrancando sin experiencia previa en el ramo — y sin una forma confiable de cotizar un trabajo, lo que ponía en riesgo el margen real. El dueño me buscó porque aporto 17 años de experiencia en manejo de residuos.",
      "Usé ese conocimiento del dominio para convertir en software la forma en que el trabajo realmente se cotiza y se opera. Lo que empezó como un mapa de instalaciones y una calculadora de cotizaciones creció hasta ser una plataforma completa de operaciones de campo — precios, despacho, agenda, clientes, facturación, pagos y una app móvil para conductores, todo en un solo lugar.",
    ],
    problem: [
      "Dos tipos de trabajo completamente distintos tenían que cotizarse bien desde una sola herramienta: retiros de escombro por volumen y servicios de tarifa fija como armado, mantenimiento y mudanzas — cada uno con protecciones para que nada saliera por debajo del costo.",
      "Las operaciones estaban dispersas. No había una fuente única de verdad para los trabajos, ni un enlace en vivo entre la oficina y los conductores en campo, ni un camino rápido de una cotización a un trabajo agendado, despachado y facturado.",
    ],
    approach: [
      "Construí dos motores de precios detrás de un solo cotizador — un modelo de volumen/peso para escombro y un modelo basado en Pricebook para servicios — con salvaguardas que mantienen cada cotización anclada a reglas reales de costo y margen para que el negocio nunca cotice de menos.",
      "Respaldé la plataforma con Supabase (Postgres + Auth + seguridad a nivel de fila) con un patrón cache-first: la interfaz lee al instante de una caché en memoria y localStorage mientras las escrituras se sincronizan a la base de datos en segundo plano, para que una red lenta nunca frene a la oficina.",
      "Sumé mensajería de despacho en tiempo real con una bandeja de salida sin conexión, una app móvil aparte para conductores, autenticación de personal del lado del servidor con roles de dueño/oficina, y un sistema de plantillas de correo personalizables para cotizaciones, facturas y recibos.",
    ],
    roleIntro: "Ingeniero único — diseño, arquitectura y construcción full-stack:",
    roleItems: [
      "Diseño de los dos motores de precios y la matemática de cotización para volumen, peso y servicios",
      "Esquema de Supabase, políticas de seguridad a nivel de fila y la capa cache-first con sincronización en segundo plano",
      "Módulos de operación: Trabajos, Centro de Despacho, Agenda, Mapa de Instalaciones, Facturas, Pagos y Pricebook",
      "App móvil de conductores y mensajería oficina-conductor en tiempo real con reintento sin conexión",
      "Autenticación de personal del lado del servidor con acceso por rol (dueño vs. personal de oficina)",
    ],
    outcome: [
      "Una sola plataforma opera hoy el negocio de punta a punta — desde una cotización precisa y protegida hasta un trabajo despachado, agendado, facturado y cobrado.",
      "Los precios pasaron de la intuición a números consistentes anclados en la economía real del manejo de residuos. El personal de oficina ve solo lo que su rol permite, y los conductores se mantienen sincronizados con despacho en tiempo real. En uso activo de producción por una operación real de retiro de escombro en Phoenix.",
    ],
    images: [
      { src: "/images/portfolio/rejunk/rejunk1.webp", alt: "Detalle de trabajo en Rejunk con resumen financiero y agenda", width: 1920, height: 1440 },
      { src: "/images/portfolio/rejunk/rejunk2.webp", alt: "Configuración de Rejunk — plantillas de correo personalizables con variables", width: 1920, height: 1440 },
    ],
    thumbnail: { src: "/images/portfolio/rejunk/rejunk.webp", alt: "Plataforma de operaciones de campo Rejunk con mapa de instalaciones", width: 1920, height: 1440 },
    metaTitle: "Rejunk — Caso de estudio de plataforma de operaciones de campo | Abe Media",
    metaDescription: "Una plataforma de operaciones de campo para un negocio de retiro de escombro en Phoenix: dos motores de precios, despacho, agenda, facturación y app de conductores sobre Supabase.",
  },

  "meal-saver": {
    slug: "meal-saver",
    name: "Meal Saver",
    tagline:
      "Rastreador de despensa que reduce el desperdicio con alertas de caducidad, recetas sugeridas por IA a partir de ingredientes por vencer y escaneo de códigos y recibos. Web app en vivo.",
    year: "2025–Presente",
    role: "Desarrollador Full-Stack (solo)",
    focus: ["React", "Supabase", "Gemini AI"],
    metrics: [
      { value: "En vivo", label: "rastreador de desperdicio de comida en app.mealsaver.app" },
      { value: "3", label: "sistemas de IA — escaneo de códigos, escaneo de recibos, generación de recetas" },
    ],
    context: [
      "La mayoría de los hogares no tiene una imagen real de qué hay en la despensa ni cuándo caduca, así que los alimentos se olvidan y terminan en la basura. Llevarlo a mano en una hoja de cálculo es tan tedioso que casi nadie lo sostiene.",
      "Meal Saver hace el registro de la despensa sin esfuerzo — escanea los artículos, recibe avisos antes de que caduquen y convierte lo que está por echarse a perder en la cena.",
    ],
    problem: [
      "El inventario manual es demasiada fricción para sostenerse, así que la app tenía que hacer casi automático agregar y actualizar artículos — y luego mostrar activamente lo que está por caducar en lugar de esperar a que alguien revise.",
      "También tenía que funcionar para hogares compartidos (un inventario, varios miembros) y sostener un negocio real de suscripciones con funciones por nivel.",
    ],
    approach: [
      "Construí una app en React 18 + Vite sobre un backend de Supabase Postgres con seguridad a nivel de fila, donde tres sistemas de IA eliminan el trabajo manual: Gemini Vision lee códigos de barras (con consulta a OpenFoodFacts), Gemini Vision convierte fotos de recibos en partidas, y Gemini 2.0 Flash genera recetas con lo que está por caducar.",
      "Agregué hogares multiusuario con inventario compartido y acceso por rol, más alertas de caducidad como resúmenes diarios y correos de artículos críticos vía Resend en un cron programado.",
      "Moneticé con Stripe en tres niveles (Free, Premium, Household Premium) — checkout, suscripciones sincronizadas por webhook y funciones con acceso por nivel.",
    ],
    roleIntro: "Ingeniero único — full stack, del sistema de diseño a los pagos:",
    roleItems: [
      "Arquitectura React + Supabase: sistema de diseño, ruteo, auth y seguridad a nivel de fila",
      "Pipeline de escaneo con IA: extracción de códigos y recibos con Gemini Vision y consulta a OpenFoodFacts",
      "Motor de recetas con IA que genera comidas a partir de ingredientes por caducar (Gemini 2.0 Flash)",
      "Hogares multiusuario con inventario compartido y acceso por rol",
      "Niveles de suscripción con Stripe: checkout, webhooks y acceso por nivel",
      "Panel de analítica y notificaciones por correo (resumen diario, alertas de caducidad) con Resend + cron",
    ],
    outcome: [
      "En vivo en app.mealsaver.app, convirtiendo el registro de la despensa de una tarea pesada a un flujo de escanear y listo que lleva la comida a un platillo en lugar de la basura.",
      "Las tres entradas de IA (código de barras, recibo, receta) eliminan casi toda la captura manual, mientras las capas de hogares y suscripciones lo convierten en un producto multiusuario real.",
    ],
    images: [
      { src: "/images/portfolio/meal-saver/meal-saver.webp", alt: "Panel de analítica de Meal Saver con tendencias de consumo y desperdicio", width: 1600, height: 1200 },
    ],
    thumbnail: { src: "/images/portfolio/meal-saver/meal-saver.webp", alt: "Panel de analítica de despensa de Meal Saver", width: 1600, height: 1200 },
    liveUrl: "https://app.mealsaver.app",
    liveLabel: "app.mealsaver.app",
    metaTitle: "Meal Saver — Caso de estudio de rastreador de despensa con IA | Abe Media",
    metaDescription: "Un rastreador de desperdicio de comida con tres sistemas de IA — escaneo de códigos, escaneo de recibos y generación de recetas — más hogares compartidos y suscripciones con Stripe.",
  },
};
