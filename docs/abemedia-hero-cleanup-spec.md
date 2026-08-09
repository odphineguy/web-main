# abemedia.online — Hero Rebuild + Cleanup Pass

**Goal:** Lock the site around one offer — the bilingual AI voice agent — and remove all legacy positioning (law firm, chatbots, named personas, Stripe). Platforms/estimating tools stay as proof, not products.

**Rule for the whole pass:** Review the actual component/file before editing. Grep first, don't assume file locations.

---

## 1. Hero section rebuild (homepage)

Replace the current hero content. Structure:

**Badge:** `AI voice agents for service businesses`

**H1:** `AI agents that answer your phones, book your jobs, and never miss a call. 24/7.`

**Sub:** `Bilingual by default — English y español. Built for junk removal, HVAC, moving, and home service companies.`

**Primary CTA (visually dominant):** `Call the demo agent — (669) 669-4486`
- On mobile: `tel:` link. On desktop: show number large + "Call from your phone" microcopy.

**Secondary CTA:** `Schedule a call` → /en/contact

**Hero widget:** Relabel the existing recorded-call widget. Remove "Hermes PI Intake — Elena". New label: `Recorded intake call — real AI, unedited` with subtitle `Junk removal after-hours call — English y español`. Keep the existing law-firm audio file in place ONLY until the new recording is swapped in (separate task); the label must not reference law firms.

**Trust bar (keep, verify copy):** `17 years running dispatch · Waste Management Los Angeles — recycLA, a billion-dollar franchise · Apps live on the App Store & Google Play · Platforms running real businesses today`

### 1b. Three-column jab section (new, directly under hero)

Header: `One of these is costing you jobs right now.`

1. **Missed calls are booked jobs — for your competitor.** After-hours callers don't leave voicemails. They dial the next number on the list.
2. **Half your market speaks Spanish.** An English-only line hangs up on them. Our agents switch languages mid-call.
3. **An answering service takes messages.** Our agent qualifies the job, quotes it, and books it into your calendar.

Style: match site design system (orange/black/white), three equal columns, numbered `01/02/03` accents.

---

## 2. De-name the demo agent — sitewide

Grep for `Elena` and `Maya` across the entire repo (components, content files, metadata, FAQ data, alt text).

Replace with "our AI agent" / "the demo agent" / "the agent" as grammar requires. Specific known locations:

- **Sitewide meta description:** currently ends with "Call Elena, our live demo agent: (669) 669-4486" → `...Bilingual by default — English y español. Call our live demo agent: (669) 669-4486.` (Also check og:description, twitter:description.)
- **Homepage service card "AI voice agents & after-hours answering":** currently opens "Elena for law firms. The same pattern for HVAC, plumbing, turf, and dental." → Rewrite: `After-hours answering for junk removal, HVAC, moving, and home services. Intake, qualify, book — logged straight to your CRM.` Remove law firms and dental entirely.
- **"Talk to Maya" live demo section:** retitle `Talk to our AI agent — right now`. Delete the sentence "Elena handles law firm intake. Maya handles home services. Same platform, tailored to your business" entirely. Replace with: `The same agent, tailored to your business — English y español.`
- **FAQ:** "What exactly is Elena?" → `What exactly is the AI agent?` Check answer bodies for she/Elena references; make them agent-generic.
- **Final CTA:** "Call Elena for the live demo" → `Call the demo agent for a live conversation`.
- **Do NOT touch Ashlee** (customer support chat widget) — she is site support, not the product.

---

## 3. Pricing quiz rebuild (/en/pricing)

The quiz currently asks "What are you building?" with options: A website / A chatbot / Both / Something else. This is dead positioning. Rebuild:

**Q1: What do you need handled?**
- My phones — calls answered, jobs booked (AI voice agent)
- My leads — auto-quoted and followed up (lead pipeline automation)
- My operations — dispatch, crews, tracking (custom platform)
- Not sure — help me scope it

**Q2/Q3:** Update follow-up questions to fit these paths (volume/company size/timeline as appropriate — use judgment, review the existing quiz component's structure first).

**End states:** Every path terminates in a recommended scope + `Schedule a call` CTA. NO payment step, NO checkout. If the current quiz has package/price displays, keep price *ranges* but the action is always a call.

**Remove "website" and "chatbot" as offerings anywhere in the quiz.** Websites are an add-on mentioned in services, not a quiz path.

---

## 4. Remove Stripe entirely

- Grep for `stripe` (case-insensitive) across the repo: SDK imports, checkout routes, API routes, webhook handlers, components, package.json.
- Remove all Stripe code and uninstall the package(s).
- Delete `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` from `.env.local`.
- Confirm clean local build after removal.
- **Flag for Abe (manual steps, do not attempt):** delete `STRIPE_SECRET_KEY` from Vercel env vars, then roll/revoke the key in the Stripe dashboard.

---

## 5. Missed-call calculator fixes

- Default industry: `Junk removal` (currently `Law firm`).
- Remove `Law firm` from the industry dropdown entirely.
- Verify remaining industries match site verticals: junk removal, HVAC, plumbing, moving, landscaping/turf, waste. Adjust prefilled close rates/tickets sensibly per industry (review existing prefill values first).

---

## 6. Live demo section layout fix

The "Talk to [agent]" section is currently a text block with the ElevenLabs widget floating disconnected in the corner. Rebuild as two-column:
- Left: retitled copy (see §2) + bullet list of what to try on the call (e.g., "Ask for a quote on a garage cleanout", "Switch to Spanish mid-sentence", "Try to stump it with a weird job").
- Right: a designed call card — agent avatar/icon, "Start a call" button wired to the same ElevenLabs trigger, availability badge. The floating corner widget can remain but the section must not depend on it.

---

## 7. Testimonial section

Keep Sam Akers' quote but pair it with a results stat card so "chatbot" isn't the only social proof:

**Stat card:** `Junk removal client — lead pipeline automation` / `$1,644 → $582 weekly lead spend` / `CPL $32 → $17` / link → /en/portfolio/rejunk

Two-up layout: quote left, stat card right.

---

## 8. Case studies section reframe (homepage)

Saguaro block currently reads as a product ("Operations platform for logistics and transportation companies"). One-line reframe so it reads as client work:

`Built for a logistics operator: live fleet tracking, dispatch, CRM, accounting, and HR — one dashboard, not six tabs.`

Keep screenshot, keep "Explore platforms" link. Rejunk and Turf cards are fine as-is.

---

## 9. Verification checklist (run after all changes)

- [ ] `grep -ri "elena\|maya" src/` returns zero product references (Ashlee allowed)
- [ ] `grep -ri "law firm\|attorney\|legal" src/` returns zero offering references (portfolio/history mentions OK if any remain intentionally — flag them for review)
- [ ] `grep -ri "stripe" src/ package.json` returns nothing
- [ ] `grep -ri "chatbot" src/` — only allowed in the Websites add-on service description and Ashlee's own component
- [ ] Local build passes
- [ ] All 37 URLs still return 200 after deploy
- [ ] Meta description on / , /en , /en/pricing updated (view page source)

**Out of scope for this pass:** new ElevenLabs demo recording, Spanish page adaptations, GSC/Bing submission, Clutch appeal.
