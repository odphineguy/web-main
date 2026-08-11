# Phone Agent Setup Checklist — (213) 845-2704

Abe-side steps to wire the new inbound number to ElevenLabs and the site's new
endpoints. The site-side pieces (booking endpoint, call-log endpoint, legal
pages) are already built — this file covers only what has to happen inside
ElevenLabs and Vercel.

> **STATUS 2026-08-10 (evening):** Steps 1–4 were done via the ElevenLabs API
> in-session. **AbeMedia Reception** exists
> (`agent_3501kzqnhrxeeke9exmmk199mqtj`) with the disclosure first message,
> reception prompt, check_availability + book_consultation webhook tools
> (secret header set), the agent-context calendar webhook, and reception
> data-collection fields. Still manual: assign the agent to the number
> (step 8), voicemail (step 5), and the post-call webhook (step 6 — see the
> HMAC note there).

Number: **+1 (213) 845-2704** (ported from Twilio into ElevenLabs,
`phnum_9501kzqgk8wcesptbvjp0rg4sgxt`).

## 1. Create the reception agent

- Duplicate the Sofia config into a new agent named **AbeMedia Reception**.
  Keep Sofia untouched on the demo number.
- Assign AbeMedia Reception to +1 (213) 845-2704.

## 2. First message — recording disclosure (required)

Two-party-consent callers are likely (213 is a California area code). The
agent's first message must include a brief recording disclosure. Paste-ready
copy:

**English:**
> Thanks for calling Abe Media. Quick heads-up: this call may be recorded and
> answered by an AI assistant. How can I help you today?

**Spanish:**
> Gracias por llamar a Abe Media. Un aviso rápido: esta llamada puede ser
> grabada y atendida por un asistente de inteligencia artificial. ¿En qué
> puedo ayudarle hoy?

## 3. Conversation-initiation webhook (calendar context)

- Point the agent's conversation-initiation webhook at
  `https://abemedia.online/api/agent-context` so it gets the literal date
  calendar (never let the LLM compute dates).
- If `AGENT_CONTEXT_SECRET` is set in Vercel, add the matching
  `x-agent-context-secret` header on the webhook.

## 4. Booking webhook tool

Add a webhook tool to AbeMedia Reception:

- URL: `https://abemedia.online/api/agent-booking`
- Method: POST, JSON body
- Header: `x-agent-booking-secret: <AGENT_BOOKING_SECRET>` (same value as the
  Vercel env var — generate one long random string and set it in both places)
- Two calls the agent can make:
  - Check availability: `{"action": "slots", "startDate": "YYYY-MM-DD", "endDate": "YYYY-MM-DD"}`
    → returns `slots` keyed by date (America/Phoenix times).
  - Book: `{"action": "book", "name": "...", "email": "...", "phone": "...",
    "preferredTime": "<exact slot start ISO>", "notes": "...", "language": "en|es",
    "referralSource": "phone-agent"}`
    → returns the confirmed `booking` (uid, start, end) so the agent can read
    the time back to the caller.

## 5. Voicemail / fallback

- Configure ElevenLabs voicemail or fallback behavior for after-hours or
  agent failure so callers are never dropped silently.

## 6. Post-call webhook (transcripts to Convex + email)

ElevenLabs post-call webhooks do not send custom headers — they sign each
request with an HMAC secret instead, and the call-log route now verifies that
signature.

- ElevenLabs → Settings (Conversational AI) → **Webhooks** → create a
  post-call webhook pointing at `https://abemedia.online/api/agent-call-log`,
  event type: transcription.
- ElevenLabs shows a signing secret (`whsec_...`) when you create it — copy it
  and add it in Vercel as **`ELEVENLABS_WEBHOOK_SECRET`**.
- Then attach the webhook to the AbeMedia Reception agent (agent settings →
  post-call webhook).
- The route stores caller number, transcript, and summary in Convex
  (`agentLeads`, referralSource `phone-agent`) and emails the transcript to
  abe@abemedia.online via Resend.

## 7. Vercel env vars (site project, Production)

| Var | Status |
|---|---|
| `ANTHROPIC_API_KEY` | set for the chatbot (already in .env.local for dev) |
| `CALCOM_API_KEY` | set — from Cal.com settings |
| `CALCOM_EVENT_TYPE_ID` | set — numeric id of the consultation event type |
| `AGENT_BOOKING_SECRET` | generate + set; must match the ElevenLabs headers above |
| `ELEVENLABS_WEBHOOK_SECRET` | the `whsec_...` from the post-call webhook you create in step 6 |
| `RESEND_API_KEY` | verify it is present (contact form already uses it) |
| `NEXT_PUBLIC_CHAT_ENABLED` | leave unset/false in Production; set `true` on a preview to test the chat |

## 8. Before going live

- Test call: confirm the disclosure plays, a booking lands in Cal.com and in
  Convex, and the post-call email arrives.
- The public number is now (213) 845-2704 everywhere on the site; the old
  (626) 735-6216 no longer appears.
