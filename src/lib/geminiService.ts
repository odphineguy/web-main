import { GoogleGenAI, LiveServerMessage, Modality, FunctionCall, Type } from "@google/genai";
import { Message } from './types';
import { SOP_CONTENT } from './sopContent';

const SYSTEM_INSTRUCTION = `You are Ashlee, a helpful customer support chatbot for Abe Media.

Your role is to answer questions about our business, products, services, and policies using the comprehensive knowledge base provided in the SOP document below.

CRITICAL INSTRUCTIONS:
- Answer ONLY using the knowledge base provided in the SOP document below. Do NOT perform any web searches or use external sources.
- Use the SOP document as your primary source of information for all questions about services, pricing, timelines, policies, and procedures.
- If the answer isn't in the SOP document, politely say "I don't have that specific information in my knowledge base," and direct them to contact support@abemedia.online for more detailed assistance.

SALES-ORIENTED BEHAVIOR:
- Identify potential sales opportunities when a customer expresses interest in a service (e.g., "I need a new logo," "website design," "marketing assistance").
- When a sales opportunity is identified, briefly highlight relevant Abe Media services and their key benefits from the SOP document.
- When suggesting a consultation, mention that users can book directly by clicking the "Book Consultation" button in the chat header (the calendar icon button).
- Always follow up with a brief call to action (CTA) for sales inquiries. Example: "You can book a free consultation by clicking the 'Book Consultation' button at the top of this chat, or contact us at support@abemedia.online."
- Reference pricing ranges from the SOP when appropriate, but emphasize that exact pricing requires consultation.
- Keep sales pitches concise and natural - avoid being overly promotional.

RESPONSE GUIDELINES:
- Be friendly, professional, and concise - keep responses brief and to the point (2-4 sentences when possible).
- Use the Q&A sections from the SOP to answer common questions accurately.
- For complex issues or questions beyond the SOP, suggest contacting support directly at support@abemedia.online.
- Keep responses clear and helpful, but prioritize brevity over extensive detail.
- Do NOT use markdown formatting (no **bold**, no *italic*, no markdown symbols). Write in plain text only.
- If asked your name, introduce yourself as Ashlee.
- Provide key information first, then offer next steps (consultation, contact info) if relevant.

TONE:
- Be warm and approachable
- Show enthusiasm for helping customers
- If you don't know something, be honest and direct them to our team
- Avoid technical jargon unless the customer uses it first
- Use clear, jargon-free language

---

KNOWLEDGE BASE (SOP DOCUMENT):
${SOP_CONTENT}

---

Remember: Use this knowledge base as your primary source of information. When answering questions, reference the relevant sections, pricing information, timelines, and procedures to provide accurate and comprehensive responses.
`;

export const INITIAL_MESSAGE = "Hi there! I'm Ashlee, your Media Specialist. How can I help you today?";
export const MICROPHONE_MIME_TYPE = 'audio/pcm;rate=16000';
export const MODEL_AUDIO_SAMPLE_RATE = 24000;
export const MICROPHONE_SAMPLE_RATE = 16000;
export const AUDIO_CHUNK_SIZE = 4096; // ScriptProcessorNode buffer size
export const API_KEY_CHECK_ERROR_MESSAGE = 'Requested entity was not found.';

// Helper function to create a new GoogleGenAI instance with the latest API key
const createGeminiClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_API_KEY is not defined. Please ensure it's set in your environment.");
  }
  return new GoogleGenAI({ apiKey });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let chatSession: any;

export const getOrCreateChatSession = () => {
  if (!chatSession) {
    const ai = createGeminiClient();
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (
  message: string,
  onNewChunk: (chunk: string) => void,
  _existingMessages: Message[], // existingMessages is no longer explicitly used for context in sendMessageStream
): Promise<string> => { // Return type changed to string
  const chat = getOrCreateChatSession();
  let fullModelResponse = '';

  try {
    const responseStream = await chat.sendMessageStream({ message });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        fullModelResponse += chunk.text;
        onNewChunk(chunk.text); // Send chunk text for real-time display
      }
    }
    return fullModelResponse; // Return only the final response text
  } catch (error: unknown) {
    console.error("Error sending message to Gemini:", error);
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(`Failed to get response from Gemini: ${errorMessage}`);
  }
};