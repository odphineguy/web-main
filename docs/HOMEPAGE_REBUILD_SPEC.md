# Homepage Rebuild — AI Agents & Business Operations Positioning

## Overview

Rebuild the abemedia.online homepage to reposition from "websites and chatbots"
to **AI agents and operations platforms for service businesses**: after-hours
answering, dispatch platforms, lead-pipeline automation, custom apps/plugins.
Chatbots and websites become an add-on tier, not the headline.

Includes a scroll-driven "after-hours" animated sequence using the installed
`scroll-world` skill (see Section 6).

## Context — read before starting

- Repo: this directory. Next.js 15 App Router, TypeScript, Tailwind 4.
- i18n: next-intl, locales `en` and `es` via `src/messages/en.json` and
  `es.json`. EVERY new string must be added to BOTH files. Spanish copy is
  written natively, not machine-translated word-for-word (brand promise).
- Main homepage component: `src/components/HomePage.tsx`, rendered by
  `src/app/[locale]/page.tsx`.
- Animation libs already installed: `gsap` (ScrollTrigger available),
  `framer-motion`. Do NOT add new animation deps.
- Forms/data: Convex (`convex/formSubmissions.ts`, `conversations.ts`).
- Existing components to reuse: `ScheduleCallButton`, `TopNavbar`,
  `HomeFaq`, `ui/*` primitives, `FloatingChatbot` (keep it — it's a live
  product demo).
- Deployed on Vercel. `npm run build` must pass. Package manager: npm
  (package-lock.json present — NOT pnpm in this repo).
- Reality Principle: if this spec disagrees with the codebase, the codebase
  wins. Verify component/message structure before editing.

## 1. New homepage narrative (section order)

1. **Hero** — headline: "AI agents that answer your phones, book your jobs,
   and run your dispatch. 24/7." Subhead keeps the bilingual differentiator:
   "Bilingual by default — English y español, written natively." Primary CTA:
   **"Call Elena now"** with tel link to (669) 669-4486 and label "Live demo —
   real AI, answers in seconds." Secondary CTA: existing ScheduleCallButton.
   - On desktop (no tel), show the number large + a "How to demo her" hint
     (call from your phone; she handles a PI intake end to end).
2. **Proof bar** — single row, muted: "17 years dispatch management ·
   Waste Management Los Angeles (recycLA, billion-dollar franchise) ·
   Apps live on the App Store & Google Play · Platforms running real
   businesses today."
3. **Scroll-world "after-hours" sequence** — see Section 6. This replaces
   generic feature cards as the emotional centerpiece.
4. **Services grid (5 cards)** — new core offering:
   - AI Voice Agents / After-Hours Answering — law firms (Elena), HVAC,
     plumbing, turf, dental. Intake → qualify → book → CRM.
   - Dispatch & Operations Platforms — Dispatch AI (waste management),
     Saguaro Transport, Rejunk + driver apps. Live fleet, CRM, HR.
   - Lead Pipeline Automation — Thumbtack/Housecall Pro webhooks,
     auto-quoting, realtime status sync.
   - Custom Apps & AI Plugins — App Store / Google Play apps (incl.
     on-device AI models), ChatGPT/Claude plugins (MLC Lab Compliance
     Finder shipped example).
   - Websites & Bilingual Chatbots — positioned explicitly as add-on:
     "Every platform needs a front door."
5. **Industry demos** — keep the existing tabbed demo showcase
   (`ChatDemoShowcase`) but retitle from "AI Chatbots for Every Industry" to
   "Agents for Every Industry" and add an Elena audio recording player if
   an mp3 is present in `public/audio/` (graceful: hide player if file
   missing — Abe will drop recordings in later).
6. **Case studies strip** — Saguaro Transport (keep existing laptop mockup
   section from platforms content), Rejunk/Progressive pipeline
   ("Thumbtack lead → quoted → booked → dispatched, no human in the loop"),
   Waterloo turf demo.
7. **Founder story (short)** — "I ran dispatch before I automated it."
   3–4 sentences: 17 yrs WM LA → recycLA → builds the tools he wished he had.
8. **Missed-call revenue calculator** — repurpose `ROICalculator.tsx` inputs:
   industry, missed calls per week (after hours), close rate (prefill by
   industry), average ticket. Output: monthly revenue lost + "Elena costs
   less than one missed job." Keep the existing calculator route working;
   this is a variant on the homepage (or refactor the component to accept a
   mode prop — implementer's choice, whichever is less invasive).
9. **FAQ (`HomeFaq`)** — update copy for new positioning.
10. **Footer CTA** — existing `footer-cta` with new copy.

## 2. Copy rules

- Voice: operator-to-operator. Short sentences. No "unlock" / "empower" /
  "supercharge." Concrete nouns: calls, jobs, dispatch, trucks, intake.
- Bilingual promise appears once in hero, once in services card #5. Don't
  repeat it everywhere — it's no longer the headline.
- All new keys namespaced under `HomePage.*` in both message files,
  following the existing key conventions in en.json.

## 3. What to remove/demote

- Remove chatbot-first hero and the 4 "What the chatbot does" cards.
- Remove "Websites and chatbots that actually speak Spanish" headline.
- Keep `/chatbot`, `/pricing`, `/calculator`, `/platforms`, `/portfolio`
  routes untouched except where nav labels need updating.
- Do not touch Stripe/checkout, pricing data, or `PricingDecisionTree`.

## 4. Nav changes (`TopNavbar.tsx`)

- Order: Agents · Platforms · Pricing · Calculator · Portfolio · Contact.
- "Agents" anchors to the services grid or a `/services` update — reuse
  existing services route if structure fits; otherwise anchor link.
- Keep Get Started CTA and theme toggle.

## 5. Lead capture on demo calls

- Under the "Call Elena" CTA add microcopy: "She'll take your info and
  we'll follow up the same day." (Manual follow-up — do NOT build SMS
  callback; A2P is not available. No Twilio. This is a hard constraint.)
- Log demo-call CTA clicks to Convex (`formSubmissions` or a new
  `demoCallClicks` table) with timestamp + locale for attribution.

## 6. Scroll-world "After Hours" sequence

Use the installed scroll-world skill (Claude Code plugin) to generate a
scroll-scrubbed fly-through section between the proof bar and services grid.

**Scene narrative (3 scenes, one continuous camera flight):**

1. **Scene 1 — 11:30 PM, law office dark.** Exterior of a small law office
   at night, windows dark, street quiet. Caption: "Your office closes at 5."
2. **Scene 2 — the call comes in.** Camera flies through the window; a
   phone glows, lights flicker on around a single desk where a humanized
   agent (Elena) picks up. Caption: "Elena doesn't. 11:30 PM — she answers,
   qualifies, and books the consultation."
3. **Scene 3 — morning payoff.** Camera flows out to daylight; the
   attorney's desk with a booked appointment on screen / calendar. Caption:
   "You walk in to a signed-up client, not a voicemail."

**Optional 4th beat** if the skill handles it cleanly: a burst pipe / man
with a flashlight at night → plumber's phone answered → job booked. If it
bloats scope, cut it — the law office arc alone is enough.

**Asset generation:** use Higgsfield MCP/CLI (connected in Claude Code) to
generate scene imagery per the scroll-world skill's asset requirements.
Style: match site palette (near-black background, orange #F97316-family
accent, warm interior light for the "lights on" moment). Keep total asset
weight reasonable — lazy-load the section, and provide a static-image
fallback + `prefers-reduced-motion` fallback (single hero image with the
three captions stacked).

**Performance constraints:**
- Section must not block LCP; hero renders before any scroll-world assets
  load. Dynamic import with `next/dynamic`, ssr:false if needed.
- Mobile: if the scroll experience is janky under ~5s of testing, fall back
  to a simpler GSAP ScrollTrigger crossfade of the 3 scene images with the
  same captions. Do not ship a broken flagship animation.
- Captions come from next-intl messages (both locales).

## 7. Constraints

- npm, not pnpm, in this repo.
- No new email/SMS providers. No Twilio/A2P — closed decision.
- Bilingual parity is mandatory: build fails the acceptance check if any
  new key exists in en.json but not es.json.
- Don't break existing routes, Convex functions, Stripe flows, or the
  floating chatbot.
- `npm run build` and `npx tsc --noEmit` must pass before done.
- Preserve SEO basics: keep metadata generation in layout/page, update
  title/description to new positioning (EN + ES), keep sitemap intact.

## 8. Files you'll touch

**Modify:**
- `src/components/HomePage.tsx` — restructure sections
- `src/messages/en.json`, `src/messages/es.json` — all new copy
- `src/components/TopNavbar.tsx` — nav labels/order
- `src/components/demos/ChatDemoShowcase.tsx` — retitle, optional audio player
- `src/components/ROICalculator.tsx` — missed-call variant (mode prop OK)
- `src/components/HomeFaq.tsx` — copy update
- `src/app/[locale]/page.tsx` — metadata update

**New:**
- `src/components/AfterHoursScroll.tsx` (or whatever scroll-world outputs,
  adapted into the component tree)
- `public/images/after-hours/` — generated scene assets
- `public/audio/` — placeholder dir for Elena recordings (empty OK)

**Do not modify:** Stripe/checkout code, `lib/pricingData.ts`,
`PricingDecisionTree.tsx`, Convex schema beyond an additive table,
`/chatbot` app internals.

## 9. Acceptance criteria

- [ ] Hero leads with agents/after-hours positioning + "Call Elena" CTA
      with (669) 669-4486
- [ ] Proof bar with WM/recycLA + App Store credentials renders
- [ ] Scroll-world after-hours sequence works on desktop, has mobile +
      reduced-motion fallbacks, lazy-loads
- [ ] 5-card services grid in the specified order; websites/chatbots framed
      as add-on
- [ ] Demo showcase retitled to agents; audio player degrades gracefully
      when no files exist
- [ ] Missed-call calculator variant live on homepage; /calculator route
      still works
- [ ] Founder story + case study strip present
- [ ] Full EN/ES parity for every new string
- [ ] No Twilio/SMS anything
- [ ] `npm run build` passes, `npx tsc --noEmit` passes
- [ ] Lighthouse: homepage LCP not regressed by scroll section (lazy-loaded)
