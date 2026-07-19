import { Message } from './types';
import {
  SYSTEM_INSTRUCTION_EN,
  SYSTEM_INSTRUCTION_ES,
  INITIAL_MESSAGE_EN,
  INITIAL_MESSAGE_ES,
  getInitialMessage,
  getSystemInstruction,
} from './chatPrompts';

export {
  SYSTEM_INSTRUCTION_EN,
  SYSTEM_INSTRUCTION_ES,
  INITIAL_MESSAGE_EN,
  INITIAL_MESSAGE_ES,
  getInitialMessage,
  getSystemInstruction,
};

// Legacy export for backwards compatibility
export const INITIAL_MESSAGE = INITIAL_MESSAGE_EN;

// Helper to detect language from URL path
export const detectLanguageFromPath = (): 'en' | 'es' => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.startsWith('/es/') || window.location.pathname === '/es' ? 'es' : 'en';
  }
  return 'en';
};

export const sendMessageToGemini = async (
  message: string,
  onNewChunk: (chunk: string) => void,
  existingMessages: Message[],
  lang: 'en' | 'es' = 'en',
): Promise<string> => {
  const historyForServer: Message[] = [
    ...existingMessages.filter((m) => m.role === 'user' || m.role === 'model'),
    { role: 'user', text: message },
  ];

  let response: Response;
  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: historyForServer, lang }),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    throw new Error(`Failed to reach chat server: ${errorMessage}`);
  }

  if (!response.ok) {
    let serverMessage = `HTTP ${response.status}`;
    try {
      const data = await response.json();
      if (data?.error) serverMessage = data.error;
    } catch {
      // ignore parse failure
    }
    throw new Error(`Failed to get response from chat server: ${serverMessage}`);
  }

  if (!response.body) {
    throw new Error('Chat server returned an empty response.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullModelResponse = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value && value.byteLength > 0) {
        const chunk = decoder.decode(value, { stream: true });
        if (chunk) {
          fullModelResponse += chunk;
          onNewChunk(chunk);
        }
      }
    }
    const tail = decoder.decode();
    if (tail) {
      fullModelResponse += tail;
      onNewChunk(tail);
    }
    return fullModelResponse;
  } finally {
    reader.releaseLock();
  }
};
