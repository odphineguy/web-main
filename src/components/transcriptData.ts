// Timestamps aligned via Whisper against the sound-clip m4a recordings
export type TranscriptMsg = {
  role: "agent" | "caller" | "note";
  text: string;
  t: number;
  emotion?: { en: string; es: string };
};

export type CallClip = {
  src: string;
  duration: number;
  transcript: TranscriptMsg[];
  caption?: { en: string; es: string };
};

export type CallScenarioId =
  | "law-firms"
  | "plumbing-hvac"
  | "junk-removal"
  | "ai-receptionist";

export type CallScenario = {
  id: CallScenarioId;
  available: boolean;
  label: { en: string; es: string };
  caption: { en: string; es: string };
  clips?: Partial<Record<"en" | "es", CallClip>>;
};

const plumbingClips: Record<"en" | "es", CallClip> = {
  en: {
    src: "/audio/sound-clip.m4a",
    duration: 35.6,
    transcript: [
      { role: "caller", t: 0.0, text: "Yeah, I have a flooding restroom." },
      { role: "agent", t: 4.0, text: "That sounds stressful. Let's get this handled step by step. Do you know where your main water shutoff valve is located?" },
      { role: "caller", t: 12.0, text: "Not sure. I think it's somewhere in the back corner of the house." },
      { role: "agent", t: 18.0, text: "Okay, that's helpful. If you're comfortable, can you take a quick look in that back corner and see if you can locate it?" },
      { role: "agent", t: 25.0, text: "It's usually a valve with a handle you can turn clockwise to stop the water flow. But if you can't find it or aren't sure, just let me know and we'll note this as urgent for the team." },
    ],
  },
  es: {
    src: "/audio/sound-clip-spanish.m4a",
    duration: 38.5,
    transcript: [
      { role: "caller", t: 0.0, text: "Habla en español, necesito ayuda con mi baño." },
      { role: "agent", t: 4.0, text: "Claro, sin problema. Estoy aquí para ayudarte. ¿Qué está pasando en tu baño?" },
      { role: "caller", t: 10.0, text: "Está liqueando de la… de la… de la mano. Tiene mucha agua por abajo." },
      { role: "agent", t: 17.0, text: "Entiendo. Suena como que hay agua debajo del lavamanos. ¿El agua está saliendo mucho en este momento, o ya paró?" },
      { role: "caller", t: 26.0, text: "Un poquito, no más. No mucho." },
      { role: "agent", t: 29.0, text: "Ok, gracias. ¿Sabes dónde está la llave de paso principal del agua en tu casa? Es la que cierra el agua de toda la casa." },
    ],
  },
};

const junkRemovalClips: Partial<Record<"en" | "es", CallClip>> = {
  en: {
    src: "/audio/junk-removal.mp3",
    duration: 43,
    transcript: [
      {
        role: "agent",
        t: 0,
        text: "Thanks for calling Desert Ridge Moving and Junk Removal, this is Maya. Are you calling about a move, or a junk removal pickup?",
      },
      { role: "caller", t: 7, text: "I'm calling about a junk removal." },
      { role: "agent", t: 9, text: "Great! What kind of items are you looking to have removed?" },
      { role: "caller", t: 13, text: "I need to remove a refrigerator." },
      {
        role: "agent",
        t: 16,
        text: "Got it, a refrigerator. Is that the only item, or do you have a few other things you'd like hauled away too?",
      },
      { role: "caller", t: 22, text: "Yeah, just the refrigerator." },
      {
        role: "agent",
        t: 24,
        text: "Perfect. Where is the refrigerator located — is it inside your home, in the garage, or somewhere else like the backyard?",
      },
      { role: "caller", t: 32, text: "Yeah, I got it right here in my garage." },
      { role: "agent", t: 35, text: "Awesome, that helps. When would you like us to come pick it up?" },
      { role: "caller", t: 41, text: "Uh, you guys could come on Monday or Tuesday, that'd be great." },
    ],
  },
};

const lawFirmClips: Partial<Record<"en" | "es", CallClip>> = {
  en: {
    src: "/audio/law-firms-english.mp3",
    duration: 42,
    caption: {
      en: "English personal-injury intake with calm incident clarification.",
      es: "Intake de lesiones personales en inglés con aclaración calmada del accidente.",
    },
    transcript: [
      {
        role: "agent",
        t: 0,
        emotion: { en: "calm", es: "con calma" },
        text: "I'm sorry that happened to you. That must have been startling. Can you tell me a bit more, where were you when this happened, and do you remember what time it was?",
      },
      {
        role: "caller",
        t: 11,
        text: "Yeah, it was yesterday. I was, uh, waiting for the green light to turn here at the, uh, the I-17 and the, uh, Camelback intersection, and I was just waiting for my light to turn, and I was hit, rear-ended. A guy behind me didn't see me or something.",
      },
      {
        role: "agent",
        t: 27,
        emotion: { en: "calm", es: "con calma" },
        text: "Thank you for explaining that. So this happened yesterday at the I-17 and Camelback intersection while you were stopped at a red light. Do you remember roughly what time of day that was?",
      },
      { role: "caller", t: 40, text: "Yeah, it was around 5:00 p.m." },
    ],
  },
  es: {
    src: "/audio/law-firms-spanish.mp3",
    duration: 38,
    caption: {
      en: "Spanish personal-injury intake with an immediate safety check.",
      es: "Intake de lesiones personales en español con revisión inmediata de seguridad.",
    },
    transcript: [
      {
        role: "caller",
        t: 0,
        text: "Ah, yo estuve en un accidente el otro día y necesito un-- buscar un abogado que me pueda ayudar con mi caso. Me destruyeron mi carro.",
      },
      {
        role: "agent",
        t: 9,
        emotion: { en: "concerned", es: "preocupada" },
        text: "Lo siento mucho que haya pasado por eso. Antes de hacerle algunas preguntas, ¿se encuentra en un lugar seguro en este momento, y alguien necesita atención médica de emergencia?",
      },
      {
        role: "caller",
        t: 21,
        text: "Todo bien ahorita, estamos bien. Nomás está dolorido.",
      },
      {
        role: "agent",
        t: 26,
        text: "Entiendo. Voy a hacerle algunas preguntas para que el personal pueda revisar su información. Primero, ¿me puede dar su nombre completo, por favor?",
      },
      { role: "caller", t: 36, text: "Sí, mi amor. Ramiro Favela." },
    ],
  },
};

export const callScenarios: CallScenario[] = [
  {
    id: "law-firms",
    available: true,
    label: { en: "Law Firms", es: "Despachos legales" },
    caption: {
      en: "Bilingual personal-injury intake with calm, structured questioning.",
      es: "Intake bilingüe de lesiones personales con preguntas calmadas y estructuradas.",
    },
    clips: lawFirmClips,
  },
  {
    id: "plumbing-hvac",
    available: true,
    label: { en: "Plumbing & HVAC", es: "Plomería y HVAC" },
    caption: {
      en: "After-hours plumbing call for Desert Valley.",
      es: "Llamada de plomería fuera de horario para Desert Valley.",
    },
    clips: plumbingClips,
  },
  {
    id: "junk-removal",
    available: true,
    label: { en: "Junk Removal", es: "Retiro de escombros" },
    caption: {
      en: "Refrigerator pickup intake for Desert Ridge Moving and Junk Removal.",
      es: "Intake para recoger un refrigerador con Desert Ridge Moving and Junk Removal.",
    },
    clips: junkRemovalClips,
  },
  {
    id: "ai-receptionist",
    available: false,
    label: { en: "AI Receptionist", es: "Recepcionista con IA" },
    caption: {
      en: "General answering, qualification, routing, and scheduling.",
      es: "Atención general, calificación, transferencia y agenda.",
    },
  },
];

export const defaultCallScenarioId: CallScenarioId = "plumbing-hvac";
