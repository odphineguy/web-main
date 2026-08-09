// Timestamps aligned via Whisper against the sound-clip m4a recordings
export type TranscriptMsg = { role: "agent" | "caller" | "note"; text: string; t: number };

export type CallClip = {
  src: string;
  duration: number;
  transcript: TranscriptMsg[];
};

export const calls: Record<"en" | "es", CallClip> = {
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
