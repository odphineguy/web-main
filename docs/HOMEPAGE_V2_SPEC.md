# Homepage V2 Spec — Copy & Layout Cleanup
*July 19, 2026. Load fable-protocol skill. Reality Principle: verify line numbers against current HomePage.tsx before editing.*

## Goal
Tighten the homepage: real proof only, no filler, hero demo upgraded from static phone card to a live transcript player.

## 1. Hero: Replace phone-number card with transcript player
Current: static Elena card with (669) 669-4486 + LIVE NOW badge (HomePage.tsx ~L144–186).
New: **auto-scrolling call transcript with synced audio** from a real Elena call.
- Source assets: Abe exports from ElevenLabs (transcript JSON/text + audio). Place audio in `public/audio/`, transcript data in a local const or JSON.
- Use a 45–75 second highlight clip, NOT the full 8-min call. Trim to: greeting → "I was in an accident" → Elena's qualification questions → booking moment.
- Component: new `src/components/TranscriptPlayer.tsx`. Chat-bubble style (agent left, caller right), messages fade/scroll in synced to audio timestamps. Play/pause button, muted-autoplay-off (user-initiated play only — respects browser policy + performance).
- Lazy-load audio (`preload="none"`). Dynamic import, ssr:false, like AfterHoursScroll.
- Remove the phone number from the hero card. Keep a small "Book a live demo" / Schedule CTA. (Number moves to outreach use only.)
- Keep the `logDemoCallClick` Convex mutation wired to the play button instead (rename event source "hero-transcript-play").

## 2. Removals
- **Logo marquee** (`clientLogos` const ~L39–51, render ~L350–360): delete entirely. All logos are Abe's own projects — not client proof.
- **Higgsfield images**: remove recently added Higgsfield-generated images from homepage sections (identify by src path in `public/images/` — confirm filenames before deleting; do not delete assets used elsewhere).
- **Testimonials carousel** (~L424–545): remove the scrolling carousel. Replace with a static 2-up grid of ONLY the two real testimonials. [DECISION NEEDED: Abe confirms which two IDs are real — likely Sam Akers / MyLabCompliance + one other.] Remove fake entries from messages/ locale files.
- **Founder section** (~L377–408): remove from homepage. Relocate the same block (badge/title/p1-p3 + one portrait) to the Contact page (`src/app/[locale]/contact`). Do NOT duplicate — move.
- **FAQ portrait rotation** (`HomeFaq.tsx` `abeImages`): remove the image column entirely; FAQ goes full-width text/accordion.

## 3. Platforms page: add Rejunk
Route: `src/app/[locale]/platforms`.
- Mirror the Saguaro layout: badge row ("HOME SERVICES" + "AVAILABLE FOR PURCHASE"), title "Rejunk", one-liner, demo video embed, 3 feature cards (Dispatch map w/ live drivers, Driver activation & PIN auth, Job management), plus a "Driver companion app" phone-mockup row like Saguaro's.
- Assets from Abe: Rejunk demo video (60–90s per post-fable list #4), desktop screenshots, mobile screenshots. Spec placeholder paths under `public/images/rejunk/` — Abe drops files in.
- Test video links in incognito before shipping (YouTube lesson).

## 4. Pricing restructure
Route: `src/app/[locale]/pricing`.
- Lead with **Voice agents** and **Automation** as the primary packages.
- Websites and chatbots demoted to **add-ons** (line items, not headline tiers).
- [DECISION NEEDED: actual price points per tier — Abe supplies before copy is final.]
- Update the Get Started scope quiz ("What are you building?") options to match: voice agent / automation / website or chatbot add-on / something else.

## 5. Constraints
- Next.js 15 / TypeScript / Tailwind 4 / next-intl — all copy changes go through `messages/` locale files (EN + ES both).
- Keep LCP clean: no new blocking assets in hero; transcript player dynamic-imported.
- Do not touch Convex schema beyond the event-source rename; `npx convex deploy` already pending for demoCallClicks.
- Run build before done. Deploy note: repo is local-only — push to Vercel is a separate pending task (post-fable #23).

## Acceptance
- [ ] Hero shows transcript player, no phone number, audio plays on click
- [ ] No logo marquee, no fake testimonials, no founder section on homepage
- [ ] Founder block lives on Contact page
- [ ] FAQ has no portrait
- [ ] Platforms page shows Rejunk with video + screenshots
- [ ] Pricing leads with voice + automation; sites/chatbots are add-ons
- [ ] EN and ES locales both updated
- [ ] Build passes
