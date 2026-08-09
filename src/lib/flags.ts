/**
 * Site-wide feature flags.
 */

/**
 * Site chat kill switch. Turned off 2026-08-09: the chat backend was answering
 * visitors with "Failed to get response from chat server: HTTP 502", so both the
 * floating widget and the standalone /chatbot page were advertising a broken
 * service.
 *
 * Nothing is deleted - FloatingChatbot, the chatbot components and the /chatbot
 * route all still exist. Flipping this to true is the only change needed to
 * bring both back.
 *
 * While it is false:
 *  - src/app/[locale]/layout.tsx does not render FloatingChatbot, so its dynamic
 *    import never runs and the chunk is never fetched
 *  - src/app/[locale]/chatbot/page.tsx calls notFound(), so /en/chatbot and
 *    /es/chatbot return 404
 */
export const CHAT_ENABLED = false;
