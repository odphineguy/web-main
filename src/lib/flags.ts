/**
 * Site-wide feature flags.
 */

/**
 * Site chat switch, now env-driven. Set NEXT_PUBLIC_CHAT_ENABLED=true (Vercel
 * env or .env.local) to turn the chat on. It defaults to OFF in every
 * environment so production stays chat-free until Abe verifies the rebuilt
 * widget on a preview deployment.
 *
 * History: the original widget was killed 2026-08-09 because its Groq-backed
 * /api/chat answered visitors with HTTP 502. The chat stack was rebuilt
 * 2026-08-10 on the Anthropic API (claude-haiku-4-5) with booking + lead
 * capture; the old Gemini/Groq components were deleted.
 *
 * While it is false:
 *  - src/app/[locale]/layout.tsx does not render the floating ChatWidget
 *  - src/app/[locale]/chatbot/page.tsx calls notFound(), so /en/chatbot and
 *    /es/chatbot return 404
 */
export const CHAT_ENABLED = process.env.NEXT_PUBLIC_CHAT_ENABLED === "true";
