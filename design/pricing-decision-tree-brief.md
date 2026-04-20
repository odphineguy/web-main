# Design Brief — Pricing Decision Tree

Shaped via `/shape`. Hand this to `/impeccable` (or `/impeccable craft`) to implement.

## 1. Feature Summary

Replace the current pricing page (3 core tiers + 4 simultaneous add-ons = 7 competing decisions) with a guided flow: **3 short questions → recommended tier → optional add-ons → book-a-call CTA**. The page's job is no longer "pick and pay"; it's "orient and route to consultation."

## 2. Primary User Action

Land on a confident package recommendation within ~30 seconds, then book a consultation call with context already set.

## 3. Design Direction

Editorial calm, not SaaS quiz-stepper. This feature has to fit the same register as the rest of the site (breef.com / addisonwhitney.com, per `.impeccable.md`):

- **No stepper chrome.** No "Step 1 of 3" progress bars, no wizard breadcrumbs shaped like pills. Use typography and position to communicate progress.
- **One viewport at a time.** The current question owns the primary space; prior answers recede to a quiet breadcrumb above.
- **Typography does the work.** Spectral (serif) for questions, Manrope (sans) for options and body. Orange only for the *selected* state and the primary CTA — nothing else.
- **Recommendation is the peak moment.** Large, confident, includes *why* this tier was recommended, in a sentence.
- **Add-ons show only after recommendation.** They're enhancements to the chosen tier, never competitors during selection.

## 4. Layout Strategy

Single-column, `max-w-2xl`, left-aligned. Same editorial rhythm as the hero.

### Phase 1 — Questions

```
┌──────────────────────────────────────┐
│ (prior answer — small, muted)        │
│                                      │
│ Q: [Question, Spectral, large]       │
│                                      │
│ [ Option A ──────────────────── ]    │
│ [ Option B ──────────────────── ]    │
│ [ Option C ──────────────────── ]    │
│                                      │
│                     (no button:      │
│                      auto-advance)   │
└──────────────────────────────────────┘
```

### Phase 2 — Recommendation

```
┌──────────────────────────────────────┐
│ Based on your answers                │
│                                      │
│ Business                             │
│ $1,499 · 2–4 week delivery           │
│                                      │
│ Because you need a bilingual site    │
│ live in four weeks, Business covers  │
│ the scope without Professional's     │
│ overhead.                            │
│                                      │
│ • 5-page bilingual site              │
│ • Chatbot trained on your SOPs       │
│ • CRM integration                    │
│ • 30-day support                     │
│                                      │
│ [ Book a call to confirm this → ]    │
│                                      │
│ See alternate: Starter or Professional│
└──────────────────────────────────────┘
```

### Phase 3 — Add-ons (same page, below)

```
Enhance your package
[ ] Bilingual add-on                +$500
[ ] SEO (monthly)                   $99/mo
[ ] Social media (monthly)          $99/mo
[ ] Care plan (monthly)             $99/mo
```

Toggling an add-on updates the recommendation card above (inclusion list + total range).

## 5. Key States

| State | What the user sees | What they feel |
|---|---|---|
| **Entry** | Q1 in hero position, nothing else. | "This is going to be quick." |
| **Mid-flow** (Q2/Q3) | Current question hero-size; prior answer as quiet breadcrumb at top (clickable to revisit). | "Progress without friction." |
| **Recommendation** | Single tier card with rationale; "See alternate" link. Add-ons visible below, unchecked. | "They listened to me." |
| **Alternate revealed** | Second tier renders inline below primary, slightly smaller, comparable inclusion list. | "I can sanity-check." |
| **Add-ons toggled** | Card inclusion list + price range updates in real-time. | "I'm in control." |
| **CTA clicked** | Route to consultation form with tier + add-ons pre-filled as context. | "They know what I want before the call." |
| **Direct entry** (`?tier=business`) | Skip questions, show recommendation directly. Small "Answer questions to re-recommend" link. | "Shortcut respected." |
| **Back from recommendation** | Previous answers preserved. Last question re-focused. | "No data loss." |

## 6. Interaction Model

- **Choice cards**: entire card clickable (not just a radio dot). Keyboard-accessible with Enter/Space.
- **Progression**: auto-advance on selection after a 200ms settle. No "Continue" button between questions.
- **Breadcrumb revisit**: prior answers pinned at top of question area. Click to edit → flow returns to that question, later answers preserved.
- **Add-ons**: click-to-toggle checkboxes. Selected state = solid orange outline + filled checkbox; unchecked = `border-border` outline.
- **No modals.** Everything on one page, state in URL params (`?q1=website&q2=bilingual&q3=fast`) so back/forward and share links work.
- **No Stripe checkout button** on this page — conversion goal is book-a-call, not self-serve buy. (See Open Questions #1 if this should be revisited.)

## 7. Content Requirements

### Three decision questions

| # | Question | Options |
|---|---|---|
| 1 | What are you building? | Website · Chatbot · Both · Something else |
| 2 | Bilingual? | Yes (EN + ES) · English only · Not sure yet |
| 3 | When do you need this live? | 2–4 weeks · 1–2 months · Flexible |

**Spanish versions** (authored native, per `.impeccable.md`):

| # | Pregunta | Opciones |
|---|---|---|
| 1 | ¿Qué estás construyendo? | Sitio web · Chatbot · Ambos · Otra cosa |
| 2 | ¿Bilingüe? | Sí (EN + ES) · Solo inglés · Aún no sé |
| 3 | ¿Para cuándo lo necesitas en vivo? | 2–4 semanas · 1–2 meses · Flexible |

### Recommendation logic (initial rules)

| Q1 Product | Q3 Timeline | → Recommend |
|---|---|---|
| Website | 2–4 weeks | Starter |
| Website + Bilingual | 2–4 weeks | Business |
| Chatbot | 2–4 weeks | Starter |
| Both | any | Business |
| Anything complex + 1–2 months | — | Professional |
| "Something else" | any | Route to consultation, skip recommendation |

### Recommendation copy template

> **Based on your answers, we recommend [Tier name].**
>
> Because you need [Q1 outcome] [Q2 bilingual context] live in [Q3 timeline], [Tier name] covers the scope without [higher tier]'s overhead.
>
> • [Inclusion 1 — outcome, not feature]
> • [Inclusion 2]
> • [Inclusion 3]
>
> [Book a call to confirm this →]

Inclusions should be **outcomes**, not features ("Chatbot trained on your SOPs" not "AI-powered chatbot").

### Add-on labels

- **Bilingual add-on** — +$500 (one-time). Shown only if Q2 was "English only" or "Not sure yet."
- **SEO (monthly)** — $99/mo
- **Social media (monthly)** — $99/mo
- **Care plan (monthly)** — $99/mo

### CTA

- Primary: **Book a call to confirm this** / **Agenda una llamada para confirmarlo**
- Secondary (inline link): **See alternate tier** / **Ver otra opción**

## 8. Recommended References

For `/impeccable` implementation:

- **`reference/interaction-design.md`** — keyboard flow, progressive disclosure, auto-advance timing
- **`reference/spatial-design.md`** — single-column editorial rhythm, breadcrumb placement
- **`reference/ux-writing.md`** — recommendation rationale voice, "outcomes not features" discipline

## 9. Open Questions

1. **Keep Stripe as secondary path?** Intent is book-a-call, so Stripe is currently out of scope. Confirm: remove Stripe checkout entirely from pricing, or keep a quiet "Pay & start now" option on the recommendation for self-serve customers? *Default if unanswered: remove.*
2. **Tier naming.** Keep **Starter / Business / Professional** or rebrand for more editorial register (e.g., **Foundation / Growth / Scale**)? *Default: keep existing.*
3. **"Something else" routing.** Q1 option "Something else" — should it route to a general consultation form, or to a services overview? *Default: consultation form with "Tell us what you need" prompt.*
4. **Auto-advance vs explicit Continue button.** Auto-advance feels faster (breef register); explicit button gives users more control. *Default: auto-advance with 200ms settle. Revisit if user testing shows confusion.*
5. **Industry vertical integration.** Should Q1 include "For my restaurant / legal firm / dental practice"? *Default: NO — verticals belong in a separate brief. Keep Q1 about product type only.*
6. **Mobile layout.** Default assumption: same single-column flow works on mobile with the breadcrumb at top sticky-hidden during scroll. Worth a specific mobile pass during implementation.

---

*Brief generated via `/shape`. Not yet implemented.*
