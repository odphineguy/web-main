/**
 * Privacy Policy and Terms of Service content, EN + ES, rendered by
 * src/app/[locale]/privacy and /terms.
 *
 * The Spanish versions are written natively-toned but are FLAGGED FOR ABE'S
 * NATIVE-SPEAKER REVIEW before being indexed - both /es pages ship with
 * robots noindex until he signs off (see the page components).
 *
 * The SMS consent section mirrors A2P 10DLC campaign registration language -
 * keep it in sync with the campaign description filed with the carrier.
 */

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const LAST_UPDATED_EN = "Last updated: August 10, 2026";
const LAST_UPDATED_ES = "Última actualización: 10 de agosto de 2026";

export const PRIVACY: Record<"en" | "es", LegalDoc> = {
  en: {
    title: "Privacy Policy",
    updated: LAST_UPDATED_EN,
    intro:
      "Abe Media is owned and operated by Abevision LLC (\"we\", \"us\"). This policy explains what information we collect when you call us, chat with us, or submit a form on abemedia.online, and how we use it.",
    sections: [
      {
        heading: "AI phone answering and call recording",
        paragraphs: [
          "Calls to (213) 845-2704 may be answered by an artificial-intelligence voice agent rather than a person. Calls may be recorded and transcribed so we can respond to your request, improve our service, and keep a record of what was discussed. If you prefer not to be recorded, you can hang up and reach us instead by email at abe@abemedia.online.",
        ],
      },
      {
        heading: "Information we collect",
        paragraphs: [
          "Through phone calls, the website chat assistant, and our contact and consultation forms, we may collect: your name, phone number, email address, company name, details about the services you are interested in, and transcripts of your calls and chat conversations.",
          "We also collect basic technical information common to most websites, such as the page you arrived on and general analytics data.",
        ],
      },
      {
        heading: "Where your information is stored and who processes it",
        paragraphs: [
          "Lead details, messages, and transcripts are stored in Convex, our backend database provider.",
          "We use a small number of service providers to operate the business, and your information may be processed by them for the purposes described above: ElevenLabs (voice agent and call handling), Anthropic (chat assistant), Vercel (website hosting), Resend (email delivery), and Cal.com (appointment scheduling). Each processes data on our behalf under their own security and privacy commitments.",
        ],
      },
      {
        heading: "SMS and text messaging consent",
        paragraphs: [
          "By providing your phone number to us - on a call, in chat, or in a form - you consent to receive transactional and follow-up text messages from Abe Media about your inquiry, quotes, and appointments. Message frequency varies. Message and data rates may apply.",
          "Reply STOP at any time to opt out of texts, and HELP for help. Consent to receive text messages is not a condition of purchasing any service.",
        ],
      },
      {
        heading: "Data retention and your choices",
        paragraphs: [
          "We keep lead records, transcripts, and call recordings for as long as they are useful for serving you and for our business records, and delete or anonymize them when they are no longer needed.",
          "To ask what information we hold about you, or to request correction or deletion, email abe@abemedia.online. We will respond to reasonable requests promptly.",
        ],
      },
    ],
  },
  es: {
    title: "Política de Privacidad",
    updated: LAST_UPDATED_ES,
    intro:
      "Abe Media es propiedad de Abevision LLC (\"nosotros\") y es operada por la misma. Esta política explica qué información recopilamos cuando nos llama, chatea con nosotros o envía un formulario en abemedia.online, y cómo la usamos.",
    sections: [
      {
        heading: "Atención telefónica con IA y grabación de llamadas",
        paragraphs: [
          "Las llamadas al (213) 845-2704 pueden ser atendidas por un agente de voz de inteligencia artificial en lugar de una persona. Las llamadas pueden grabarse y transcribirse para responder a su solicitud, mejorar nuestro servicio y mantener un registro de lo conversado. Si prefiere no ser grabado, puede colgar y escribirnos a abe@abemedia.online.",
        ],
      },
      {
        heading: "Información que recopilamos",
        paragraphs: [
          "A través de llamadas telefónicas, el asistente de chat del sitio web y nuestros formularios de contacto y consulta, podemos recopilar: su nombre, número de teléfono, correo electrónico, nombre de su empresa, detalles sobre los servicios que le interesan, y transcripciones de sus llamadas y conversaciones de chat.",
          "También recopilamos información técnica básica común a la mayoría de los sitios web, como la página por la que llegó y datos generales de analítica.",
        ],
      },
      {
        heading: "Dónde se guarda su información y quién la procesa",
        paragraphs: [
          "Los datos de contacto, mensajes y transcripciones se guardan en Convex, nuestro proveedor de base de datos.",
          "Usamos un número reducido de proveedores de servicios para operar el negocio, y su información puede ser procesada por ellos para los fines descritos: ElevenLabs (agente de voz y llamadas), Anthropic (asistente de chat), Vercel (alojamiento del sitio), Resend (envío de correos) y Cal.com (agendado de citas). Cada uno procesa los datos en nuestro nombre bajo sus propios compromisos de seguridad y privacidad.",
        ],
      },
      {
        heading: "Consentimiento para mensajes de texto (SMS)",
        paragraphs: [
          "Al proporcionarnos su número de teléfono - en una llamada, en el chat o en un formulario - usted acepta recibir mensajes de texto transaccionales y de seguimiento de Abe Media sobre su consulta, cotizaciones y citas. La frecuencia de los mensajes varía. Pueden aplicar tarifas de mensajes y datos.",
          "Responda STOP en cualquier momento para dejar de recibir mensajes, y HELP para recibir ayuda. Aceptar mensajes de texto no es condición para contratar ningún servicio.",
        ],
      },
      {
        heading: "Retención de datos y sus opciones",
        paragraphs: [
          "Conservamos los registros de contacto, transcripciones y grabaciones mientras sean útiles para atenderle y para nuestros registros comerciales, y los eliminamos o anonimizamos cuando ya no son necesarios.",
          "Para saber qué información tenemos sobre usted, o para solicitar su corrección o eliminación, escriba a abe@abemedia.online. Responderemos a las solicitudes razonables con prontitud.",
        ],
      },
    ],
  },
};

export const TERMS: Record<"en" | "es", LegalDoc> = {
  en: {
    title: "Terms of Service",
    updated: LAST_UPDATED_EN,
    intro:
      "These terms apply to your use of abemedia.online and to your interactions with Abe Media, a brand owned and operated by Abevision LLC.",
    sections: [
      {
        heading: "AI assistants",
        paragraphs: [
          "Our phone line at (213) 845-2704 and the chat assistant on this website are powered by artificial intelligence. Their responses are provided for general information only and do not constitute binding quotes, contracts, or professional advice. Project pricing is always confirmed by a person after a consultation.",
        ],
      },
      {
        heading: "Bookings",
        paragraphs: [
          "Consultation calls and appointments scheduled through our AI assistants or the website are subject to confirmation. We may reschedule or cancel a booking and will make reasonable efforts to notify you when that happens.",
        ],
      },
      {
        heading: "Use of the website",
        paragraphs: [
          "You agree not to misuse the website or its assistants, including attempting to disrupt the service, extract other people's information, or use the assistants for purposes unrelated to Abe Media's services.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of the State of Arizona, without regard to its conflict-of-law rules. Any dispute arising from these terms will be resolved in the state or federal courts located in Arizona.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about these terms: abe@abemedia.online, or Abevision LLC, 2026 W Colter St, Phoenix, AZ 85015.",
        ],
      },
    ],
  },
  es: {
    title: "Términos de Servicio",
    updated: LAST_UPDATED_ES,
    intro:
      "Estos términos aplican al uso de abemedia.online y a sus interacciones con Abe Media, una marca propiedad de Abevision LLC y operada por la misma.",
    sections: [
      {
        heading: "Asistentes de IA",
        paragraphs: [
          "Nuestra línea telefónica (213) 845-2704 y el asistente de chat de este sitio funcionan con inteligencia artificial. Sus respuestas se ofrecen solo como información general y no constituyen cotizaciones vinculantes, contratos ni asesoría profesional. El precio de cada proyecto siempre lo confirma una persona después de una consulta.",
        ],
      },
      {
        heading: "Citas",
        paragraphs: [
          "Las llamadas de consulta y citas agendadas a través de nuestros asistentes de IA o del sitio web están sujetas a confirmación. Podemos reprogramar o cancelar una cita y haremos esfuerzos razonables por avisarle cuando eso ocurra.",
        ],
      },
      {
        heading: "Uso del sitio web",
        paragraphs: [
          "Usted se compromete a no hacer mal uso del sitio ni de sus asistentes, incluyendo intentar interrumpir el servicio, extraer información de otras personas o usar los asistentes para fines ajenos a los servicios de Abe Media.",
        ],
      },
      {
        heading: "Ley aplicable",
        paragraphs: [
          "Estos términos se rigen por las leyes del Estado de Arizona, sin considerar sus normas sobre conflicto de leyes. Cualquier disputa derivada de estos términos se resolverá en los tribunales estatales o federales ubicados en Arizona.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [
          "Preguntas sobre estos términos: abe@abemedia.online, o Abevision LLC, 2026 W Colter St, Phoenix, AZ 85015.",
        ],
      },
    ],
  },
};
