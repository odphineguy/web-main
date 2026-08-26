// The curated project portfolio shown at /portfolio and /portfolio/[slug].
// Narrative structure (context / problem / approach / role / outcome) follows
// the case-study format these write-ups were authored in; it deliberately does
// not reuse ContentPageData, whose goodFit/process/faq shape fits SEO pages,
// not project stories. Spanish lives in projects.es.ts with identical keys.

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Phone-portrait screenshot rendered in a narrow column. */
  mobile?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  focus: string[];
  metrics: Array<{ value: string; label: string }>;
  context: string[];
  problem: string[];
  approach: string[];
  roleIntro: string;
  roleItems: string[];
  outcome: string[];
  images: ProjectImage[];
  thumbnail: ProjectImage;
  /** Second gallery shown under its own section heading (Saguaro driver app). */
  extraGallery?: { title: string; description: string; images: ProjectImage[] };
  liveUrl?: string;
  liveLabel?: string;
  metaTitle: string;
  metaDescription: string;
};

export const projectOrder = [
  "dispatch-ai",
  "saguarotransport",
  "hermes-legal-intake",
  "safehub",
  "misana",
  "paw-relief",
  "rejunk",
  "meal-saver",
] as const;

export const projects: Record<string, Project> = {
  "dispatch-ai": {
    slug: "dispatch-ai",
    name: "Dispatch AI",
    tagline:
      "AI voice dispatcher that answers routine inbound calls end to end and hands the complex ones to a human — built to keep short-staffed dispatch desks covered.",
    year: "2024–Present",
    role: "Solo Full-Stack Developer",
    focus: ["Voice AI", "Call Automation", "Dispatch"],
    metrics: [
      { value: "~70%", label: "of routine inbound calls handled start to finish, the rest handed to a human" },
      { value: "Real-time", label: "browser voice agent on Gemini 2.5 Live with RAG-backed SOPs" },
    ],
    context: [
      "Dispatch centers across the country run chronically short-staffed, and the load is spiky — Mondays and Fridays swamp the desk. You can't hire fast enough to cover the peaks, so on a thin day calls stack up, drivers wait in the field, and customers feel every minute of it.",
      "Most of those inbound calls are routine and follow a known procedure — a blocked dumpster, a locked gate, an overweight container. Dispatch AI is a voice agent that answers the phone, handles those routine calls end to end, and hands the complex ones to a human. Built on 18 years of real waste-management operations, it's designed to take roughly 70% of the call volume off the desk.",
    ],
    problem: [
      "A dispatcher's day is dominated by repetitive calls that each follow a standard operating procedure — yet every one still ties up a person, and on a short-staffed Monday there simply aren't enough people to take them all.",
      "The goal was an agent that could carry a real call on its own for the routine majority while knowing its limits: anything that needs human judgment or a safety-critical decision — fire, hazmat — is escalated to a dispatcher with full context, never improvised by a model.",
    ],
    approach: [
      "Built a browser-based voice agent on Google Gemini 2.5 Live over WebSocket — real mic capture, PCM downsampling, and streaming audio for natural, low-latency back-and-forth on a live call.",
      "Backed it with a retrieval engine that matches the caller's scenario to the right SOP from a Supabase knowledge base, falls back to Google FileSearch, and keeps hardcoded emergency procedures so fire and hazmat guidance is never guessed.",
      "Wired in a human handoff path: when a call falls outside what the agent should handle alone, it escalates to a dispatcher with the transcript and context already captured — plus multi-destination call logging to Postgres and a local archive for audit and training.",
    ],
    roleIntro: "Sole engineer — end-to-end voice pipeline, retrieval, handoff, and data layer:",
    roleItems: [
      "Real-time voice pipeline: mic capture, 16 kHz PCM downsampling, and Gemini Live session management in the browser",
      "Scenario-aware SOP retrieval with Supabase + Google FileSearch fallbacks and hardcoded emergency procedures",
      "Escalation logic that hands complex or safety-critical calls to a human dispatcher with full context",
      "Multi-destination call logging (Postgres conversations and messages, plus local JSON archive)",
      "Admin dashboard for SOP upload, FileSearch store creation, and scenario tagging",
    ],
    outcome: [
      "A working v4 prototype that proves the core loop: the agent answers a live call, handles the routine scenario by voice, and escalates the ones that need a person — with every call logged.",
      "The target is a dispatch desk that stays covered when it's short-staffed — the agent absorbs the routine ~70% so a Monday or Friday surge no longer means stacked-up calls. Telephony, concurrent calls, and a driver mobile app are the next build, with retrieval, handoff, and logging designed to carry forward.",
    ],
    images: [
      { src: "/images/portfolio/dispatch-ai/dispai-dash.webp", alt: "Dispatch AI fleet dispatch dashboard with real-time map, live transcript, and active SOP", width: 1920, height: 1440 },
      { src: "/images/portfolio/dispatch-ai/sop-admin.webp", alt: "Dispatch AI SOP management and RAG admin — upload SOP files and manage knowledge-base stores", width: 1920, height: 1440 },
    ],
    thumbnail: { src: "/images/portfolio/dispatch-ai/dispai-dash.webp", alt: "Dispatch AI fleet dispatch dashboard", width: 1920, height: 1440 },
    metaTitle: "Dispatch AI — Voice AI Dispatcher Case Study | Abe Media",
    metaDescription: "How Abe Media built an AI voice dispatcher on Gemini 2.5 Live that answers routine dispatch calls end to end, with RAG-backed SOPs and human escalation.",
  },

  saguarotransport: {
    slug: "saguarotransport",
    name: "Saguaro Transport ERP",
    tagline:
      "Custom-built ERP with integrated CRM, client portal, rate engine, route optimization, and driver management.",
    year: "2025–Present",
    role: "Solo Full-Stack Developer",
    focus: ["Multi-tenant SaaS", "Fleet Ops", "Next.js"],
    metrics: [
      { value: "8", label: "portals from one codebase — driver, client, ops, CRM, HR, accounting, admin, marketing" },
      { value: "Multi-tenant", label: "per-customer Postgres with row-level security" },
    ],
    context: [
      "Small and mid-size transportation operators — hotshot, medical courier, oilfield logistics — run on a patchwork of email, spreadsheets, and dated carrier software. Dispatch lags, there is no live view of vehicles or tasks, and invoicing is manual.",
      "Saguaro is an all-in-one operations platform built for that SMB sweet spot: companies doing roughly 10–100 shipments a day that have outgrown spreadsheets but can't justify enterprise logistics suites.",
    ],
    problem: [
      "These operators needed dispatch, client billing, driver onboarding, compliance, and accounting in one system — with strict data isolation between companies and role-appropriate access for owners, dispatchers, drivers, and clients.",
      "It also had to serve very different audiences from one product: a public marketing site, a driver app, a client portal, and an internal command center, each with its own access rules.",
    ],
    approach: [
      "Built a multi-tenant SaaS on Next.js 16 (App Router) + React 19 where each customer gets a dedicated Supabase Postgres project, resolved by subdomain in middleware that injects the right tenant context on every request.",
      "Enforced access with row-level security across 8 role types, and shared one pricing engine — ZIP-distance, zone, and fuel-surcharge logic — between the public estimator and internal client rates.",
      "Layered in operational automation: client-onboarding email sequences with one-click unsubscribe, plate-expiration alerts, and weekly ops reports, with Stripe, Resend, Mapbox, and Sentry integrated.",
    ],
    roleIntro: "Sole engineer and designer across architecture, data, and product:",
    roleItems: [
      "Multi-tenant subdomain routing and middleware-driven tenant-context injection",
      "Database schema and row-level-security policies across 27 migrations",
      "Shared pricing engine for the marketing estimator and client portal",
      "8-portal information architecture with per-portal auth gating",
      "Outbound email automation (onboarding sequences, RFC 8058 one-click unsubscribe) and the brand and design system",
    ],
    outcome: [
      "Live and in active use by a real transportation company, running core dispatch, billing, and driver workflows day to day — deployed on Vercel with a separate super-admin app for provisioning new tenants.",
      "The architecture scales to new customers by spinning up an isolated database and subdomain — no code changes — with advanced analytics and route optimization on the roadmap.",
    ],
    images: [
      { src: "/images/assets-platforms/fleet.png", alt: "Saguaro Transport fleet management — real-time GPS, maintenance schedules, and fuel tracking", width: 1910, height: 928 },
      { src: "/images/assets-platforms/crm.png", alt: "Saguaro Transport CRM — shipper relationships, load tracking, and customer communication", width: 1910, height: 928 },
      { src: "/images/assets-platforms/accounting.png", alt: "Saguaro Transport accounting — invoicing, expense tracking, and reporting built for trucking", width: 1910, height: 928 },
    ],
    thumbnail: { src: "/images/portfolio/saguarotransport/saguaro.webp", alt: "Saguaro Transport dispatch command center", width: 1600, height: 1200 },
    extraGallery: {
      title: "Driver companion app",
      description: "A mobile app for drivers to manage tasks, track earnings, and stay connected on the road.",
      images: [
        { src: "/images/assets-platforms/sag-app-login.png", alt: "Saguaro driver app — login", width: 1419, height: 2796, mobile: true },
        { src: "/images/assets-platforms/sag-app-home.png", alt: "Saguaro driver app — task management", width: 1419, height: 2796, mobile: true },
        { src: "/images/assets-platforms/sag-app-pay.png", alt: "Saguaro driver app — earnings dashboard", width: 1419, height: 2796, mobile: true },
      ],
    },
    liveUrl: "https://www.saguarotransport.com/",
    liveLabel: "saguarotransport.com",
    metaTitle: "Saguaro Transport ERP — Multi-Tenant Fleet Ops Case Study | Abe Media",
    metaDescription: "A full trucking operation in one platform: dispatch, CRM, accounting, HR, client portal, and driver app — multi-tenant Next.js with per-customer Postgres.",
  },

  "hermes-legal-intake": {
    slug: "hermes-legal-intake",
    name: "Hermes — After-Hours Legal Intake",
    tagline:
      "Live after-hours voice AI agent for law firms — answers a real phone line, captures clean facts, triages urgency, and delivers staff-ready summaries with legal guardrails built in.",
    year: "2026",
    role: "Solo Developer",
    focus: ["Voice AI", "AI Agents", "Legal Compliance"],
    metrics: [
      { value: "Live", label: "voice AI agent answering a real phone line — validated on real 5–10 minute calls" },
      { value: "Guardrailed", label: "never gives legal advice, quotes fees, or promises a case — and discloses it's AI when asked" },
    ],
    context: [
      "Personal-injury law firms lose real money when after-hours calls hit voicemail. The facts that matter most — injury status, police reports, insurance details — degrade overnight, and a caller who feels unheard simply calls the next firm.",
      "Hermes is a live after-hours voice agent that answers the phone, runs an empathetic intake, triages urgency, and hands staff a ready-to-act summary by morning.",
    ],
    problem: [
      "Firms needed consistent, complete intake at 2am with no human on the line — captured the same way every time, with conflict flags and urgency signals a tired note-taker would miss.",
      "In a legal context the agent also had to be safe by construction: never give legal advice, estimate case value, quote fees, or imply an attorney-client relationship — and always require human review.",
    ],
    approach: [
      "Built and deployed a live voice agent on a real phone number with ElevenLabs Conversational AI, driven by a carefully engineered intake prompt — warm, one question at a time, with a safety-first opening that routes medical emergencies to 911 before any intake.",
      "The legal guardrails are the product: the prompt enforces no legal advice, no fee or case-value claims, mandatory AI self-disclosure, and a human-review-required stance — hardened with an automated red-team harness that runs adversarial scenarios (AI-identity probing, fee pressure, coverage questions) against the live agent.",
      "After each call, structured extraction pulls 22 review fields into an attorney review dashboard (deployed on Vercel) where a lawyer checks every captured fact against the transcript, scores trust and usefulness, and notes firm-specific changes — behind password-gated, server-side call retrieval that never exposes provider credentials.",
      "Output is a triaged, staff-ready summary (urgent / time-sensitive / standard / out-of-scope) with a missing-fact checklist, conflict flags, a recommended next action, and a dry-run CRM hand-off preview.",
    ],
    roleIntro: "Sole builder — product, prompt engineering, guardrails, and the review platform:",
    roleItems: [
      "Voice-agent prompt engineering and the legal-guardrail framework — the core IP that lets a low-cost model run safely",
      "Attorney review dashboard (deployed on Vercel): structured 22-field call extraction, fact-by-fact verification, trust scoring, and firm customization",
      "Password-gated, server-side retrieval of completed calls — no provider credentials or internal naming exposed to the browser",
      "Automated red-team test harness running adversarial guardrail scenarios against the live agent",
      "Portable intake-summary contract plus a deterministic reference engine: triage classification, contact extraction, and caller-care notes",
    ],
    outcome: [
      "A live working agent on a real phone line: multiple unscripted 5–10 minute test calls completed successfully and never once gave legal advice, quoted a fee, or promised a case.",
      "Key engineering call — ran the agent on Claude Haiku 4.5, a low-cost model, and it held up because reliability lives in the prompt and guardrails rather than model size, keeping per-call cost low.",
      "Now being demoed to firms through the deployed review dashboard; CRM delivery, post-call webhooks, and secured persistence are the next phase.",
    ],
    images: [
      { src: "/images/portfolio/hermes-legal-intake/law1.webp", alt: "Hermes attorney review dashboard with structured call intake fields", width: 1920, height: 1440 },
      { src: "/images/portfolio/hermes-legal-intake/law2.webp", alt: "Hermes triaged call summary with urgency and conflict flags", width: 1920, height: 1440 },
    ],
    thumbnail: { src: "/images/portfolio/hermes-legal-intake/law1.webp", alt: "Hermes attorney review dashboard", width: 1920, height: 1440 },
    metaTitle: "Hermes — After-Hours Legal Intake Voice AI Case Study | Abe Media",
    metaDescription: "A live after-hours voice AI agent for law firms: empathetic intake, urgency triage, staff-ready summaries, and legal guardrails hardened by red-team testing.",
  },

  safehub: {
    slug: "safehub",
    name: "SafeHub",
    tagline: "PPE compliance detection system using computer vision to monitor workplace safety in real time.",
    year: "2025",
    role: "Solo Full-Stack Developer",
    focus: ["Computer Vision", "OSHA Compliance", "Construction AI"],
    metrics: [
      { value: "0–100", label: "AI safety score per site photo, with per-worker PPE compliance" },
      { value: "24", label: "MasterFormat divisions in the AI cost estimator" },
    ],
    context: [
      "Construction safety managers oversee multiple job sites where PPE compliance and hazards are still tracked by manual walk-throughs, paper incident reports, and disconnected spreadsheets — problems that usually surface only after something goes wrong.",
      "SafeHub brings real-time hazard detection, structured OSHA incident analysis, and cost intelligence into one HSE platform for construction operations.",
    ],
    problem: [
      "Sites had no fast, consistent way to read PPE compliance or environmental hazards from a photo, and incident reports lacked repeatable root-cause analysis and OSHA recordability determination.",
      "On the estimating side, bids on prevailing-wage (Davis-Bacon) projects needed automated cost breakdowns and overrun-risk scoring that teams had no tooling for.",
    ],
    approach: [
      "Built a React 19 + TypeScript platform that runs construction site photos through Gemini 2.5 with a structured JSON schema — returning worker count, per-item PPE compliance, 8 hazard categories, and a 0–100 safety score in a single call.",
      "Implemented an OSHA engine for recordability per 29 CFR 1904, 5-Whys root-cause analysis, and prioritized corrective actions, plus a 100-point safety-grading system with time-windowed deductions and bonuses.",
      "Added an AI estimator that extracts line items from PDFs with Gemini Vision, applies Davis-Bacon wage premiums across 15 Arizona counties and 24 MasterFormat divisions, and predicts variance against historical benchmarks. Firebase + Supabase back auth, data, and storage; the app ships as a 5-language PWA.",
    ],
    roleIntro: "Sole engineer across the vision, compliance, and estimating systems:",
    roleItems: [
      "Gemini image-analysis pipeline: PPE/hazard JSON schema, retry/backoff, per-worker compliance scoring",
      "OSHA compliance engine (29 CFR 1904 recordability, 5-Whys, prioritized corrective actions)",
      "AI construction estimator: PDF extraction, Davis-Bacon wage premiums, variance prediction",
      "100-point safety-grading system with time-windowed scoring and letter grades",
      "Multilingual PWA (5 languages) on a Firebase + Supabase backend",
    ],
    outcome: [
      "Live in production at abesafehub.netlify.app, turning a single site photo into a scored, actionable safety read and turning bid PDFs into compliant, benchmarked estimates.",
      "It replaces manual inspection notes and ad-hoc spreadsheets with one consistent, AI-assisted HSE workflow across sites.",
    ],
    images: [
      { src: "/images/portfolio/safehub/safehub1.webp", alt: "SafeHub site photo analysis with per-worker PPE compliance and safety score", width: 1600, height: 1200 },
      { src: "/images/portfolio/safehub/safehub2.webp", alt: "SafeHub OSHA incident analysis and cost intelligence", width: 1600, height: 1200 },
    ],
    thumbnail: { src: "/images/portfolio/safehub/safehub.webp", alt: "SafeHub dashboard overview with safety grade and compliance rate", width: 1600, height: 1200 },
    liveUrl: "https://abesafehub.netlify.app",
    liveLabel: "abesafehub.netlify.app",
    metaTitle: "SafeHub — Computer Vision Construction Safety Case Study | Abe Media",
    metaDescription: "PPE compliance from a photo: Gemini-powered hazard detection, OSHA recordability analysis, and an AI construction estimator in one HSE platform.",
  },

  misana: {
    slug: "misana",
    name: "MiSana",
    tagline:
      "Bilingual symptom journal for iPhone — log how you feel, spot patterns, and walk into appointments prepared. Live on the App Store.",
    year: "2025",
    role: "Solo iOS Developer",
    focus: ["SwiftUI", "On-Device AI", "Bilingual Health"],
    metrics: [
      { value: "100%", label: "on-device — no accounts, no servers, no analytics" },
      { value: "~1,000", label: "bilingual health topics bundled for offline use" },
    ],
    context: [
      "Millions of Hispanic families navigate US healthcare across a language barrier, and many distrust health apps that send personal data to the cloud. Most options are English-first or cloud-dependent — exactly the wrong fit.",
      "MiSana is a bilingual (Mexican Spanish / English), privacy-first health companion for iPhone that helps families manage medications, prepare for doctor visits, and get trustworthy health answers — entirely on-device.",
    ],
    problem: [
      "Families needed one place to track medications, log symptoms, and walk into appointments prepared — in their own language, with culturally aware content rather than a literal translation.",
      "Health AI also had to be safe and private: no diagnosing, no cloud data egress, and hard guardrails for emergencies — a chatbot that says \"call 911\" on chest pain, not one that guesses.",
    ],
    approach: [
      "Built natively in SwiftUI + SwiftData with a dual on-device AI engine: Apple Foundation Models on iOS 26, falling back to an on-device Qwen 3 model on older versions — so AI runs with zero cloud calls and zero telemetry.",
      "Added a medication pipeline (barcode scan + label OCR via Vision, RxNorm/OpenFDA lookups, interaction checks), an appointment-prep flow with symptom-pattern detection and PDF export, and read-only HealthKit trends feeding the dashboard.",
      "Enforced safety with system prompts capped at three sentences, source-grounded answers, an always-on disclaimer, and emergency detection — all fully localized in Mexican Spanish and English.",
    ],
    roleIntro: "Sole developer — architecture, AI, and bilingual product:",
    roleItems: [
      "Dual on-device AI coordinator (Apple Foundation Models with Qwen 3 fallback) and shared safety guardrails",
      "Medication scanning pipeline: barcode + OCR, RxNorm/OpenFDA lookups, interaction warnings",
      "Appointment-prep system with symptom-pattern detection and PDF export for doctors",
      "Read-only HealthKit integration with 7-day trend dashboards",
      "Full bilingual design system and localization (Mexican Spanish + English)",
    ],
    outcome: [
      "Live on the App Store — a privacy-first, bilingual health companion that runs entirely on-device, with no accounts and no servers, so health data never leaves the phone.",
      "It shows that culturally-aware, safety-guardrailed health AI can run fully on-device, with no cloud required.",
    ],
    images: [
      { src: "/images/portfolio/misana/misana.webp", alt: "MiSana symptom journal on iPhone", width: 1600, height: 1200 },
      { src: "/images/portfolio/misana/misana1.webp", alt: "MiSana symptom tracking and patterns", width: 1920, height: 1440 },
    ],
    thumbnail: { src: "/images/portfolio/misana/misana.webp", alt: "MiSana bilingual symptom journal", width: 1600, height: 1200 },
    liveUrl: "https://misana.app/",
    liveLabel: "misana.app",
    metaTitle: "MiSana — Bilingual On-Device Health App Case Study | Abe Media",
    metaDescription: "A privacy-first bilingual symptom journal for iPhone: on-device AI, medication scanning, and appointment prep with zero cloud dependency. Live on the App Store.",
  },

  "paw-relief": {
    slug: "paw-relief",
    name: "Paw Relief",
    tagline:
      "Pet allergy tracker with real-time allergen alerts, vet-ready health reports, and AI-powered insights. Live on App Store & Google Play.",
    year: "2024–Present",
    role: "Solo iOS Developer",
    focus: ["SwiftUI", "Supabase", "On-Device AI"],
    metrics: [
      { value: "On-device AI", label: "symptom analysis via Apple Foundation Models" },
      { value: "12 × 7", label: "symptom types × trigger categories for pattern detection" },
    ],
    context: [
      "Pets get recurring allergic reactions with no obvious trigger, and owners track symptoms sporadically — so by the vet visit, the pattern is lost. Vets see a snapshot, not the history.",
      "Paw Relief is a pet allergy and health tracker for iOS and Android that turns scattered observations into vet-ready insight, with AI analysis that runs on-device.",
    ],
    problem: [
      "Owners needed to log symptoms, triggers, weight, and photos over time and have the app surface correlations — across diet, products, weather, and pollen — instead of leaving it to memory.",
      "Pet health is sensitive family data, so the AI analysis had to be private and instant for subscribers, not a metered cloud call.",
    ],
    approach: [
      "Built the iOS app natively in SwiftUI + SwiftData on a Supabase backend (Postgres + Auth + Storage) with row-level security, Sign in with Apple, and a StoreKit 2 subscription tier (2 pets free; 8 pets + AI for premium).",
      "Migrated symptom analysis from cloud Gemini to Apple Foundation Models — on-device, zero-cost, and with no health data leaving the phone — producing structured results with patterns, correlations, and severity trends.",
      "Added multimodal logging (symptoms, triggers, weight, photos), OpenWeather pollen and air-quality context, local reminders, and a vet-report generator that outputs a clinical summary to bring to appointments.",
    ],
    roleIntro: "Sole iOS developer across app, data, and AI:",
    roleItems: [
      "Full SwiftUI + SwiftData app architecture and Supabase integration with RLS",
      "On-device AI migration from cloud Gemini to Apple Foundation Models",
      "Sign in with Apple and StoreKit 2 subscription tiering (free vs premium)",
      "Multimodal logging (symptoms, triggers, weight, photos) with weather and pollen context",
      "Vet-report generator producing structured clinical summaries",
    ],
    outcome: [
      "Live on the App Store and Google Play, giving owners longitudinal allergy tracking and on-device AI insight — the vet report turns months of logs into a one-page clinical summary.",
      "Moving analysis on-device removed per-analysis cloud cost entirely while keeping sensitive pet-health data on the phone.",
    ],
    images: [
      { src: "/images/portfolio/paw-relief/paw.webp", alt: "Paw Relief landing page — track, manage, and understand pet allergies", width: 1600, height: 1200 },
      { src: "/images/portfolio/paw-relief/paw-mobile.webp", alt: "Paw Relief on mobile", width: 1600, height: 1200 },
    ],
    thumbnail: { src: "/images/portfolio/paw-relief/paw.webp", alt: "Paw Relief pet allergy tracker", width: 1600, height: 1200 },
    liveUrl: "https://paw-relief-landing.vercel.app/",
    liveLabel: "Paw Relief",
    metaTitle: "Paw Relief — Pet Allergy Tracker Case Study | Abe Media",
    metaDescription: "A pet allergy tracker for iOS and Android with on-device AI symptom analysis, allergen alerts, and vet-ready clinical reports. Live on both app stores.",
  },

  rejunk: {
    slug: "rejunk",
    name: "Rejunk",
    tagline:
      "Field ops platform for a junk-removal business — dual pricing engines feed an estimate builder, plus dispatch, scheduling, facility maps, invoicing, and a mobile driver app.",
    year: "2025–Present",
    role: "Solo Full-Stack Developer",
    focus: ["Pricing Engine", "Supabase", "Field Ops"],
    metrics: [
      { value: "2", label: "pricing engines, one estimate builder" },
      { value: "13", label: "operations modules in one platform" },
    ],
    // Client details deliberately anonymized and pricing internals kept
    // high-level, matching the sanitization stance of the public Rejunk
    // materials (see /how-it-works).
    context: [
      "A Phoenix junk-removal startup was getting off the ground with no prior experience in the trade — and no reliable way to price a job, which meant quotes that put real margin at risk. The owner came to me because I bring 17 years of waste-management experience to the table.",
      "I used that domain knowledge to turn how the work is actually priced and run into software. What started as a simple facility map and quote calculator grew into a full field-operations platform — pricing, dispatch, scheduling, clients, invoicing, payments, and a mobile driver app, all in one place.",
    ],
    problem: [
      "Two completely different kinds of work had to be priced correctly from a single tool: volume-based junk hauls and flat-rate service jobs like assembly, handyman, and moving — each with protections so nothing ever shipped below cost.",
      "Operations were scattered. There was no single source of truth for jobs, no live link between the office and drivers in the field, and no fast path from an estimate to a scheduled, dispatched, and invoiced job.",
    ],
    approach: [
      "Built two pricing engines behind one Estimate Builder — a volume/weight model for junk and a Pricebook-driven model for service work — with guardrails that keep every quote grounded in real cost and margin rules so the business never underprices.",
      "Backed the platform with Supabase (Postgres + Auth + row-level security) using a cache-first pattern: the UI reads instantly from an in-memory and localStorage cache while writes sync to the database in the background, so a slow network never blocks the office.",
      "Layered on real-time dispatch messaging with an offline outbox, a separate mobile driver app, server-side staff auth with owner/office roles, and a customizable email-template system for estimates, invoices, and receipts.",
    ],
    roleIntro: "Sole engineer — design, architecture, and full-stack build:",
    roleItems: [
      "Dual pricing-engine design and the estimate math for volume, weight, and service work",
      "Supabase schema, row-level-security policies, and the cache-first background-sync layer",
      "Field-ops modules: Jobs, Dispatch Center, Schedule, Map Facility, Invoices, Payments, and Pricebook",
      "Mobile driver app and real-time office-to-driver messaging with offline retry",
      "Server-side staff authentication with role-based access (owner vs. office staff)",
    ],
    outcome: [
      "One platform now runs the business end to end — from an accurate, protected quote to a dispatched, scheduled, invoiced, and paid job.",
      "Pricing went from guesswork to consistent numbers grounded in real waste-management economics. Office staff see only what their role allows, and drivers stay in sync with dispatch in real time. In active production use by a live Phoenix junk-removal operation.",
    ],
    images: [
      { src: "/images/portfolio/rejunk/rejunk1.webp", alt: "Rejunk job detail view with financial summary and scheduling", width: 1920, height: 1440 },
      { src: "/images/portfolio/rejunk/rejunk2.webp", alt: "Rejunk settings — customizable email templates with merge variables", width: 1920, height: 1440 },
    ],
    thumbnail: { src: "/images/portfolio/rejunk/rejunk.webp", alt: "Rejunk field ops platform with facility map", width: 1920, height: 1440 },
    metaTitle: "Rejunk — Junk-Removal Field Ops Platform Case Study | Abe Media",
    metaDescription: "A field-operations platform for a Phoenix junk-removal business: dual pricing engines, dispatch, scheduling, invoicing, and a mobile driver app on Supabase.",
  },

  "meal-saver": {
    slug: "meal-saver",
    name: "Meal Saver",
    tagline:
      "Food pantry tracker that cuts waste with expiration alerts, AI recipe suggestions from expiring ingredients, and barcode/receipt scanning. Live web app.",
    year: "2025–Present",
    role: "Solo Full-Stack Developer",
    focus: ["React", "Supabase", "Gemini AI"],
    metrics: [
      { value: "Live", label: "food-waste tracker at app.mealsaver.app" },
      { value: "3", label: "AI systems — barcode scan, receipt scan, recipe generation" },
    ],
    context: [
      "Most households have no real picture of what's in the pantry or when it expires, so groceries get forgotten and thrown out. Tracking it by hand in a spreadsheet is tedious enough that almost nobody keeps it up.",
      "Meal Saver makes pantry tracking effortless — scan items in, get warned before they expire, and turn what's about to go bad into dinner.",
    ],
    problem: [
      "Manual inventory is too much friction to sustain, so the app had to make adding and updating items nearly automatic — and then actively surface what's expiring instead of waiting to be checked.",
      "It also had to work for shared households (one inventory, multiple members) and support a real subscription business with tiered, gated features.",
    ],
    approach: [
      "Built a React 18 + Vite app on a Supabase Postgres backend with row-level security, where three AI systems remove the manual work: Gemini Vision reads barcodes (with an OpenFoodFacts lookup), Gemini Vision parses receipt photos into line items, and Gemini 2.0 Flash generates recipes from whatever is about to expire.",
      "Added multi-user households with shared inventory and role-based access, plus expiration alerts delivered as daily digests and critical-item emails via Resend on a scheduled cron.",
      "Monetized with Stripe across three tiers (Free, Premium, Household Premium) — checkout, webhook-synced subscriptions, and feature gating.",
    ],
    roleIntro: "Sole engineer — full stack from design system to payments:",
    roleItems: [
      "React + Supabase app architecture: design system, routing, auth, and row-level security",
      "AI scanner pipeline: Gemini Vision barcode + receipt extraction with OpenFoodFacts lookup",
      "AI recipe engine generating meals from expiring ingredients (Gemini 2.0 Flash)",
      "Multi-user households with shared inventory and role-based access",
      "Stripe subscription tiers with checkout, webhooks, and feature gating",
      "Analytics dashboard and email notifications (daily digest, expiry alerts) via Resend + cron",
    ],
    outcome: [
      "Live at app.mealsaver.app, turning pantry tracking from a chore into a scan-and-go flow that steers food toward a meal instead of the trash.",
      "The three AI entry points (barcode, receipt, recipe) remove almost all manual data entry, while the household and subscription layers make it a real multi-user product.",
    ],
    images: [
      { src: "/images/portfolio/meal-saver/meal-saver.webp", alt: "Meal Saver analytics dashboard with consumption and waste trends", width: 1600, height: 1200 },
    ],
    thumbnail: { src: "/images/portfolio/meal-saver/meal-saver.webp", alt: "Meal Saver pantry analytics dashboard", width: 1600, height: 1200 },
    liveUrl: "https://app.mealsaver.app",
    liveLabel: "app.mealsaver.app",
    metaTitle: "Meal Saver — AI Food Pantry Tracker Case Study | Abe Media",
    metaDescription: "A food-waste tracker with three AI systems — barcode scan, receipt scan, and recipe generation — plus shared households and Stripe subscriptions.",
  },
};
