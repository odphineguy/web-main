import OpenAI from 'openai';
import { NextRequest } from 'next/server';
import { getSystemInstruction } from '@/lib/chatPrompts';
import type { Message } from '@/lib/types';

export const runtime = 'nodejs';

const GROQ_MODEL = 'llama-3.3-70b-versatile';

interface ChatRequestBody {
  messages: Message[];
  lang?: 'en' | 'es';
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'GROQ_API_KEY is not configured on the server.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  let body: ChatRequestBody;
  try {
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (Number.isFinite(contentLength) && contentLength > 50_000) {
      return new Response(JSON.stringify({ error: 'Request body is too large.' }), { status: 413, headers: { 'Content-Type': 'application/json' } });
    }
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages = [], lang = 'en' } = body;
  if (!Array.isArray(messages) || !['en', 'es'].includes(lang)) {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  const safeMessages = messages.slice(-20).filter((message) =>
    message &&
    (message.role === 'user' || message.role === 'model') &&
    typeof message.text === 'string' &&
    message.text.length > 0 &&
    message.text.length <= 4000
  );
  if (safeMessages.length !== Math.min(messages.length, 20) || safeMessages.reduce((total, message) => total + message.text.length, 0) > 20_000) {
    return new Response(JSON.stringify({ error: 'Invalid message history.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const client = new OpenAI({
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1',
  });

  const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: getSystemInstruction(lang) },
    ...safeMessages
      .map((m) => ({
        role: m.role === 'model' ? ('assistant' as const) : ('user' as const),
        content: m.text,
      })),
  ];

  try {
    const completion = await client.chat.completions.create({
      model: GROQ_MODEL,
      messages: chatMessages,
      stream: true,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const part of completion) {
            const delta = part.choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error: unknown) {
    console.error('Groq chat error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(JSON.stringify({ error: 'The assistant is temporarily unavailable.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
