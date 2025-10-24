import { GoogleGenAI, Chat } from "@google/genai";
import { Message } from './types';

const SYSTEM_INSTRUCTION = `You are Ashlee, a helpful customer support chatbot for Abe Media.

Your role is to answer questions about our business, products, services, and policies.
CRITICAL: Answer ONLY using your internal knowledge base and the context provided in these instructions. Do NOT perform any web searches or use external sources. If the answer isn't in your knowledge base or this context, politely say "I don't have that information."

INSTRUCTIONS:
- Be friendly, professional, and concise.
- For complex issues, suggest contacting support directly.
- Keep responses under 3-4 sentences when possible.
- Never cite any external sources.
- If asked your name, introduce yourself as Ashlee.

BUSINESS CONTEXT:
Abe Media was founded by Mr. Abe Perez, who is the current CEO.
Abe Media can help with complete website or app builds, Marketing packages, logo design and much more.
We're open Monday-Friday, 9am-5pm PST. You can reach us anytime via email at support@abemedia.online
Our website is https://abemedia.online/

SERVICES WE OFFER:
- Custom website development (WordPress, React, Next.js)
- Mobile app development (iOS and Android)
- E-commerce solutions
- SEO and digital marketing
- Logo and brand design
- Website hosting and maintenance
- Product packaging design

NOTABLE CLIENTS:
- Tapatio Hot Sauce - Website design
- Trojan Brands - Magnum line packaging design
- Tinder - iOS app design

PRICING:
- Project quotes are customized based on requirements
- Free initial consultation available
- Ask customers to contact us directly for detailed pricing

COMMON QUESTIONS:
- Turnaround time: Typically 2-6 weeks depending on project scope
- Payment: We accept all major payment methods
- Revisions: Included in all project packages
- Support: Ongoing support packages available

TONE:
- Be warm and approachable
- Show enthusiasm for helping customers
- If you don't know something, be honest and direct them to our team
- Avoid technical jargon unless the customer uses it first`;

let chatSession: Chat | undefined;

export const getOrCreateChatSession = (): Chat => {
  if (!chatSession) {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      throw new Error("NEXT_PUBLIC_API_KEY is not defined. Please ensure it's set in your environment.");
    }
    const ai = new GoogleGenAI({ apiKey });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // tools: [{googleSearch: {restrictUri: 'https://abemedia.online/'}}], // Grounding disabled
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
      // Removed groundingUrls collection logic
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