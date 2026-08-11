/**
 * Site-wide feature flags.
 */

/**
 * Site chat kill switch. Chat is ON by default (Abe's call, 2026-08-10, after
 * the phone agent verified the same booking pipeline end-to-end in
 * production). Set NEXT_PUBLIC_CHAT_ENABLED=false in Vercel to turn it off
 * without a code change.
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
export const CHAT_ENABLED = process.env.NEXT_PUBLIC_CHAT_ENABLED !== "false";
