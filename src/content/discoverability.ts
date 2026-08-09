export type ContentLink = {
  href: string;
  label: string;
  description: string;
};

export type ContentSection = {
  title: string;
  body: string;
  items: string[];
};

export type ContentPageData = {
  slug: string;
  kind: "service" | "industry" | "case-study";
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  goodFit: string[];
  sections: ContentSection[];
  processTitle: string;
  process: Array<{ title: string; body: string }>;
  proofTitle: string;
  proof: string;
  faqs: Array<{ question: string; answer: string }>;
  related: ContentLink[];
};

const contact: ContentLink = {
  href: "/en/contact",
  label: "Discuss your operation",
  description: "Bring the workflow, the exceptions, and the tools you already use.",
};

export const servicePages: Record<string, ContentPageData> = {
  "ai-voice-agents": {
    slug: "ai-voice-agents",
    kind: "service",
    eyebrow: "AI voice agents",
    title: "Answer every call with an agent built around your real intake process",
    metaTitle: "AI Voice Agents for Service Businesses | Abe Media",
    description: "Bilingual AI voice agents for answering, qualification, booking, escalation, and CRM logging—designed around your approved business rules.",
    intro: "Abe Media builds English-and-Spanish voice agents that answer routine calls, collect the facts your team needs, book eligible appointments, and hand uncertain or sensitive calls to a person.",
    goodFit: [
      "Calls arrive after hours or while the team is on a job",
      "Staff repeat the same intake questions all day",
      "Lead details must reach a CRM or scheduling system",
      "English and Spanish callers need a complete experience",
    ],
    sections: [
      { title: "A call flow, not a talking FAQ", body: "The agent follows the same operating rules a trained coordinator would use.", items: ["Business-specific greeting and disclosure", "Structured qualification questions", "Booking, routing, or message capture", "CRM notes with the facts collected on the call"] },
      { title: "Escalation is part of the design", body: "A useful agent knows when not to improvise.", items: ["Human transfer for urgent or requested escalation", "Approved answers and prohibited claims", "Fallback when a tool or calendar is unavailable", "Call logs for review and improvement"] },
      { title: "Bilingual by workflow", body: "Language switching includes the questions, business rules, confirmations, and follow-up—not just a translated greeting.", items: ["Natural English and Spanish paths", "Caller-led language switching", "Consistent fields across both languages", "Native review of customer-facing copy"] },
    ],
    processTitle: "How an agent goes live",
    process: [
      { title: "Map the calls", body: "Identify call types, required facts, disqualifiers, and escalation conditions." },
      { title: "Connect the tools", body: "Wire the approved calendar, CRM, phone, and notification steps." },
      { title: "Test edge cases", body: "Run ordinary, unclear, urgent, bilingual, and tool-failure scenarios." },
      { title: "Launch and review", body: "Monitor real conversations and update the rules when the operation changes." },
    ],
    proofTitle: "Hear the interaction, not a slide deck",
    proof: "Abe Media runs a live phone-agent demonstration you can call right now. It shows structured qualification, safety escalation, appointment handling, and guardrails against unapproved promises.",
    faqs: [
      { question: "Can the agent speak English and Spanish?", answer: "Yes. Abe Media designs complete English and Spanish call paths, including questions, confirmations, escalation language, and CRM output." },
      { question: "Can it book jobs and update our CRM?", answer: "If the scheduling and CRM tools expose safe integrations, the agent can check approved availability, create a booking, and log structured notes. The exact access is agreed during scoping." },
      { question: "What happens when the agent is uncertain?", answer: "The flow can transfer the caller, take a message, or flag the call for human review. It should not invent an answer or promise an outcome outside the approved rules." },
    ],
    related: [
      { href: "/en/portfolio/elena-ai-voice-agent", label: "Voice agent case study", description: "See the decisions behind a bilingual intake agent." },
      { href: "/en/services/bilingual-ai-automation", label: "Bilingual automation", description: "Design one operation that works in both languages." },
      contact,
    ],
  },
  "dispatch-operations-platforms": {
    slug: "dispatch-operations-platforms",
    kind: "service",
    eyebrow: "Dispatch and operations software",
    title: "Dispatch software designed for the exceptions that break generic tools",
    metaTitle: "Dispatch & Operations Software for Service Businesses | Abe Media",
    description: "Custom dispatch boards, driver workflows, status tracking, customer communication, and operational reporting grounded in real dispatch experience.",
    intro: "Abe Media builds dispatch and operations platforms for teams coordinating drivers, crews, jobs, customers, and exceptions. The work is grounded in Abe Perez's 17 years at Waste Management—not a generic dashboard template.",
    goodFit: ["Dispatch lives across texts, calls, spreadsheets, and whiteboards", "Crews need a simpler mobile workflow", "Exceptions disappear until a customer calls", "Reporting takes manual cleanup at the end of the day"],
    sections: [
      { title: "One operating picture", body: "Give dispatchers the state they need without forcing them to open five systems.", items: ["Live job and route status", "Driver or crew assignment", "Customer and location context", "Exception queues and ownership"] },
      { title: "Built for field conditions", body: "A field workflow has to survive poor connectivity, rushed users, and incomplete information.", items: ["Mobile-first task views", "Clear status changes and confirmations", "Photos, notes, and location evidence", "Role-based access to sensitive actions"] },
      { title: "Operations become measurable", body: "Structured events replace the guesswork hidden in chat threads.", items: ["Operational reports", "Audit history", "Delay and exception categories", "Exports or integrations for downstream systems"] },
    ],
    processTitle: "From dispatch floor to production",
    process: [
      { title: "Shadow the workflow", body: "Document what actually happens, including workarounds and failure cases." },
      { title: "Define the operating model", body: "Agree on statuses, permissions, exception ownership, and the source of truth." },
      { title: "Ship a focused pilot", body: "Start with the daily workflow that creates the most friction." },
      { title: "Expand from evidence", body: "Add reporting and automation after the core process is stable." },
    ],
    proofTitle: "Built by someone who ran dispatch",
    proof: "Before building operations software, Abe Perez managed dispatch in Southern California, including recycLA operations at Waste Management. That background informs how the software handles handoffs, route exceptions, driver communication, and accountability.",
    faqs: [
      { question: "Do we have to replace every system at once?", answer: "No. A focused platform can sit beside existing tools, replace one brittle workflow, and expand only when the pilot proves useful." },
      { question: "Can drivers use it from a phone?", answer: "Yes. Field workflows can run in a responsive browser or a dedicated mobile app, depending on device needs, offline requirements, and distribution constraints." },
      { question: "Can it integrate with our current CRM?", answer: "Often, yes. Abe Media first verifies the CRM's API and ownership model, then defines retries, error visibility, and the source of truth before building the connection." },
    ],
    related: [
      { href: "/en/industries/logistics-transportation", label: "Logistics and transportation", description: "Operational patterns for fleets, loads, and driver workflows." },
      { href: "/en/industries/waste-management-commercial-hauling", label: "Waste and commercial hauling", description: "Dispatch lessons from container and route operations." },
      { href: "/en/portfolio/saguarotransport", label: "Saguaro Transport", description: "A production transportation platform case study." },
    ],
  },
  "lead-pipeline-automation": {
    slug: "lead-pipeline-automation",
    kind: "service",
    eyebrow: "Lead-pipeline automation",
    title: "Move a lead from first message to a booked job without losing the handoffs",
    metaTitle: "Lead Pipeline Automation for Service Businesses | Abe Media",
    description: "Lead intake, qualification, quoting, follow-up, booking, CRM synchronization, retries, monitoring, and human exception handling.",
    intro: "Abe Media connects lead sources, business rules, calendars, and CRMs into one observable workflow. Fast response matters, but reliable retries and visible exceptions matter just as much.",
    goodFit: ["Marketplace leads arrive faster than staff can answer", "The same details are copied between systems", "Follow-up depends on someone remembering", "Failed webhooks or bookings are invisible"],
    sections: [
      { title: "Capture and normalize", body: "Every source describes a lead differently. The pipeline turns those messages into consistent business fields.", items: ["Webhook and form intake", "Source attribution", "Duplicate detection", "Validation before downstream actions"] },
      { title: "Apply business rules", body: "Automation should follow the company's approved pricing, availability, and service-area rules.", items: ["Qualification and routing", "Pricebook-backed quoting where appropriate", "Calendar checks", "Human review for unusual requests"] },
      { title: "Make failures visible", body: "A workflow is only automated when someone can see what did not complete.", items: ["Retries with safe limits", "Idempotent updates", "Failure alerts and exception queues", "Event history for troubleshooting"] },
    ],
    processTitle: "A resilient automation path",
    process: [
      { title: "Receive", body: "Capture the lead and preserve the original source payload." },
      { title: "Decide", body: "Validate the facts and apply approved qualification or pricing rules." },
      { title: "Act", body: "Send the response, create the record, and book only when each condition is satisfied." },
      { title: "Reconcile", body: "Confirm every system agrees and surface anything that needs a person." },
    ],
    proofTitle: "A real workflow, sanitized for public review",
    proof: "Abe Media's How It Works page shows the structure of a live Phoenix moving and junk-removal workflow without exposing private vendor details, rates, customer data, or operational timing.",
    faqs: [
      { question: "Can you automate leads from marketplaces?", answer: "Yes, when the platform provides an authorized integration or webhook. The design should preserve attribution and avoid unsupported scraping or fragile browser tricks." },
      { question: "What if the CRM is down?", answer: "The pipeline records the failure, retries only where safe, and alerts a person instead of silently dropping the lead or creating duplicates." },
      { question: "Does AI set the price?", answer: "Not by itself. When quoting is appropriate, AI can extract facts from a message while the company's approved pricebook and hard rules determine the price. Unusual jobs go to a person." },
    ],
    related: [
      { href: "/en/how-it-works", label: "See the workflow", description: "Follow a sanitized lead-to-finished-job pipeline." },
      { href: "/en/portfolio/rejunk", label: "Rejunk case study", description: "Dispatch, driver activation, and lead handling in one system." },
      contact,
    ],
  },
  "ai-estimating-tools": {
    slug: "ai-estimating-tools",
    kind: "service",
    eyebrow: "AI estimating tools",
    title: "Turn customer photos and project details into a reviewable estimate workflow",
    metaTitle: "AI Estimating Tools for Service Businesses | Abe Media",
    description: "Photo intake, AI-assisted visualization, pricebook logic, estimate documents, CRM lead creation, and human approval for service businesses.",
    intro: "Abe Media builds estimating tools that collect the right project details, use AI for interpretation or visualization, apply approved pricing logic, and keep a person in control when the input is uncertain.",
    goodFit: ["Customers need an answer before an on-site visit", "Photo intake is inconsistent", "Estimators re-enter the same details", "The business needs a branded estimate and CRM record"],
    sections: [
      { title: "Structured intake first", body: "The estimate is only as reliable as the facts it receives.", items: ["Guided photos and measurements", "Service-area and project-type checks", "Required contact and site details", "Clear consent and data handling"] },
      { title: "AI with boundaries", body: "AI can interpret a photo or create a visualization, but approved rules control decisions that affect price or scope.", items: ["Image analysis for defined attributes", "Before-and-after visualization", "Pricebook and minimum rules", "Confidence gates and manual review"] },
      { title: "A complete handoff", body: "The customer and the sales team should receive the same structured result.", items: ["Branded estimate or PDF", "CRM lead creation", "Source images and assumptions", "Follow-up task or booking path"] },
    ],
    processTitle: "From photo to human-approved estimate",
    process: [
      { title: "Collect", body: "Ask for the photos, dimensions, and project facts needed for the service." },
      { title: "Interpret", body: "Use defined AI tasks to identify relevant features or create a visualization." },
      { title: "Calculate", body: "Apply the company's pricebook, minimums, and non-negotiable rules." },
      { title: "Review and deliver", body: "Route uncertain cases to a person; otherwise create the estimate and CRM handoff." },
    ],
    proofTitle: "AI Design Studio for an Artificial Turf Franchise",
    proof: "Abe Media built a turf estimating experience that combines customer photo intake, AI-assisted visualization, estimate output, and lead creation. The case study explains the architecture without publishing private pricing logic.",
    faqs: [
      { question: "Does the AI decide the final price?", answer: "The safer pattern is for AI to interpret defined inputs while the business's approved pricebook and rules calculate the estimate. Human approval remains available for low-confidence or unusual projects." },
      { question: "Can the tool create a visual preview?", answer: "Yes, for suitable services. The preview should be labeled as a visualization, not a guarantee of the installed result." },
      { question: "Can it send the estimate to our CRM?", answer: "Yes, when the CRM offers an authorized integration. The record can include contact details, source images, assumptions, and estimate status." },
    ],
    related: [
      { href: "/en/portfolio/artificial-turf-ai-design-studio", label: "Artificial turf AI design studio", description: "See the photo-to-estimate workflow." },
      { href: "/en/industries/artificial-turf-landscaping", label: "Turf and landscaping", description: "Use cases and guardrails for visual estimating." },
      contact,
    ],
  },
  "bilingual-ai-automation": {
    slug: "bilingual-ai-automation",
    kind: "service",
    eyebrow: "Bilingual AI automation",
    title: "Build one customer journey that works completely in English and Spanish",
    metaTitle: "Bilingual AI Automation in English & Spanish | Abe Media",
    description: "Native English-Spanish call flows, forms, content, automations, and handoffs for service businesses serving bilingual customers.",
    intro: "Bilingual automation is not a translated welcome message. Abe Media adapts the questions, choices, confirmations, error states, and staff handoffs so customers can complete the same task in either language.",
    goodFit: ["Spanish callers receive a reduced experience", "Staff translate details manually", "Forms and follow-up switch back to English", "The website publishes thin or mismatched language pages"],
    sections: [
      { title: "Native customer language", body: "Copy is written for how customers ask for the service, not translated word by word.", items: ["Call and chat flows", "Forms and validation", "Confirmations and reminders", "Human escalation language"] },
      { title: "One operating record", body: "The language can change without breaking the structured data your team needs.", items: ["Shared CRM fields", "Original-language transcript or summary", "Language preference", "Consistent qualification rules"] },
      { title: "Honest language parity", body: "A Spanish experience is published only when it is complete and useful.", items: ["Native content review", "Equivalent user actions", "Correct canonicals and hreflang", "No thin placeholder pages"] },
    ],
    processTitle: "How bilingual automation is designed",
    process: [
      { title: "Map intent", body: "Identify how customers describe the job and where language switching happens." },
      { title: "Write both paths", body: "Create native English and Spanish prompts, labels, errors, and confirmations." },
      { title: "Test real variations", body: "Test code-switching, names, addresses, dates, and ambiguous requests." },
      { title: "Review with operations", body: "Make sure the staff handoff contains the same usable facts in either language." },
    ],
    proofTitle: "Bilingual is a product requirement",
    proof: "Abe Media's public site, voice-agent work, and customer-facing automations are designed around native English and Spanish paths. The goal is equal task completion, not cosmetic translation.",
    faqs: [
      { question: "Can a caller switch languages during the same call?", answer: "The flow can be designed to follow the caller's language and preserve the intake state. The exact behavior is tested with the vocabulary and edge cases of the business." },
      { question: "Do we need Spanish-speaking staff?", answer: "The automation can handle routine intake in Spanish, but the business still needs an approved escalation plan for cases that require a person." },
      { question: "Will every English page launch in Spanish immediately?", answer: "No. Abe Media publishes a Spanish counterpart only when the content and user journey are complete. English may have more pages during a staged rollout." },
    ],
    related: [
      { href: "/en/services/ai-voice-agents", label: "AI voice agents", description: "English-and-Spanish intake, booking, and escalation." },
      { href: "/en/bilingual-seo-phoenix", label: "Bilingual SEO", description: "Technical and editorial structure for complete language equivalents." },
      contact,
    ],
  },
  "custom-business-software": {
    slug: "custom-business-software",
    kind: "service",
    eyebrow: "Custom business software",
    title: "Replace the fragile workflow—not every tool your business already trusts",
    metaTitle: "Custom Business Software for Service Operations | Abe Media",
    description: "Internal tools, dashboards, portals, integrations, and field apps built around the workflows that generic SaaS cannot handle.",
    intro: "Abe Media builds focused operational software for service businesses that have outgrown spreadsheets, disconnected subscriptions, or tools that cannot represent how the work actually moves.",
    goodFit: ["Staff maintain the same data in several systems", "A critical workflow depends on one person's memory", "Generic SaaS cannot model the exceptions", "A customer or crew portal would remove repeated coordination"],
    sections: [
      { title: "Start with the operating constraint", body: "Custom code is justified by a specific workflow, not by a feature wish list.", items: ["Internal dashboards", "Customer or partner portals", "Field and driver apps", "System-to-system integrations"] },
      { title: "Own the important state", body: "The system makes responsibilities and changes visible.", items: ["Role-based permissions", "Status history and audit events", "Data validation", "Clear source-of-truth rules"] },
      { title: "Plan for production", body: "Monitoring and support are part of the build, not an afterthought.", items: ["Error reporting and logs", "Backups and recovery expectations", "Deployment and change process", "Documentation for operators"] },
    ],
    processTitle: "A phased production build",
    process: [
      { title: "Scope the constraint", body: "Choose the smallest workflow that can prove operational value." },
      { title: "Prototype with operators", body: "Test the states, language, and edge cases before expanding the build." },
      { title: "Launch a controlled pilot", body: "Use a defined group, real data boundaries, and visible support." },
      { title: "Harden and expand", body: "Add integrations, reporting, and adjacent workflows from observed use." },
    ],
    proofTitle: "Software already running real operations",
    proof: "Abe Media's published work includes transportation, compliance, dispatch, lead automation, and AI-assisted estimating systems. Each case study describes the role and evidence that can be shared publicly.",
    faqs: [
      { question: "When should we build instead of buy SaaS?", answer: "Build when a proven, important workflow cannot be represented safely in available tools, or when repeated manual handoffs create a durable operating cost. Buy when a standard tool already solves the problem well." },
      { question: "Can you integrate with our current software?", answer: "Yes, when the vendor provides an authorized API or supported integration path. Abe Media verifies access, limits, ownership, retries, and failure handling before committing to the connection." },
      { question: "Who owns the code and data?", answer: "Ownership, hosting, third-party accounts, and handoff terms are defined in the project agreement before development begins." },
    ],
    related: [
      { href: "/en/platforms", label: "Production platforms", description: "See software built for transportation and home-service operations." },
      { href: "/en/portfolio", label: "Case studies", description: "Review the problem, role, delivery, and evidence for published work." },
      contact,
    ],
  },
};

export const industryPages: Record<string, ContentPageData> = {
  "logistics-transportation": {
    slug: "logistics-transportation", kind: "industry", eyebrow: "Logistics and transportation", title: "Keep dispatch, drivers, loads, and exceptions in one operating view", metaTitle: "Logistics & Transportation Software | Abe Media", description: "Dispatch platforms and automation for transportation teams managing drivers, jobs, status changes, documents, and operational exceptions.", intro: "Transportation operations rarely fail because a dashboard lacks another chart. They fail at the handoff: a driver is unavailable, a stop changes, a document is missing, or the customer does not know the new status.",
    goodFit: ["Dispatchers coordinate through calls and texts", "Drivers lack a clear daily workflow", "Customer updates are manual", "Exceptions are discovered after the schedule slips"],
    sections: [
      { title: "Dispatch control", body: "Give coordinators one view of the work and its ownership.", items: ["Job and load status", "Driver assignment and availability", "Location and schedule context", "Exception queues"] },
      { title: "Driver workflow", body: "Keep the field experience focused on the next required action.", items: ["Today's work", "Status confirmation", "Photos and documents", "Notes and escalation"] },
      { title: "Operational evidence", body: "Turn daily activity into a usable record.", items: ["Timestamped events", "Customer communication history", "Completion evidence", "Operational reporting"] },
    ], processTitle: "A practical starting point", process: [
      { title: "Map a day", body: "Follow one job from intake through dispatch, execution, and closeout." }, { title: "Find exception costs", body: "Identify where delays, rework, and missing information enter the process." }, { title: "Pilot the core board", body: "Give dispatch and a small driver group one shared source of truth." }, { title: "Connect the edges", body: "Add customer updates, reporting, and integrations after the state model works." },
    ], proofTitle: "Relevant production work", proof: "Saguaro Transport and Rejunk demonstrate two different transportation and field-operation patterns: a full transportation platform and a browser-based dispatch/driver workflow.", faqs: [
      { question: "Can this work with our current TMS or CRM?", answer: "Potentially. The first step is verifying supported APIs and deciding which system owns each status, customer, and job record." }, { question: "Do drivers need an app-store download?", answer: "Not always. A responsive browser workflow may be the better fit for fast onboarding; a native app is useful when device features or offline behavior require it." }, { question: "Can customers receive status updates?", answer: "Yes. Updates can be triggered from approved status events, with safeguards against duplicate or premature messages." },
    ], related: [{ href: "/en/services/dispatch-operations-platforms", label: "Dispatch platforms", description: "See the service and delivery model." }, { href: "/en/portfolio/saguarotransport", label: "Saguaro Transport", description: "Review a transportation platform case study." }, contact],
  },
  "junk-removal": {
    slug: "junk-removal", kind: "industry", eyebrow: "Junk removal", title: "Respond, quote, schedule, and dispatch without rebuilding the job by hand", metaTitle: "Junk Removal Automation & Dispatch Software | Abe Media", description: "Lead automation, pricebook-backed quoting, scheduling, dispatch, driver workflows, and customer updates for junk-removal operators.", intro: "Junk-removal teams compete on response time while dealing with incomplete descriptions, photo-based scope, price floors, crew capacity, and jobs that should never be auto-quoted.",
    goodFit: ["Marketplace leads need a fast response", "Quotes are recreated from text messages", "Dispatch and lead status live in different tools", "Crews need a simple browser workflow"],
    sections: [
      { title: "Lead-to-quote", body: "Extract the job facts, then let approved business rules—not a language model—set the price.", items: ["Lead and photo intake", "Pricebook matching", "Hard minimums", "Human review for unusual volume"] },
      { title: "Quote-to-schedule", body: "Confirm service area and availability before committing the calendar.", items: ["Qualification", "Calendar checks", "Customer confirmation", "CRM synchronization"] },
      { title: "Schedule-to-completion", body: "Give dispatch and crews the same job record.", items: ["Assignment", "Live status", "Job notes and photos", "Completion history"] },
    ], processTitle: "Where to begin", process: [{ title: "Audit lead sources", body: "List the fields, timing, and authorization available from each source." }, { title: "Document quoting rules", body: "Separate facts AI may extract from rules only the business controls." }, { title: "Connect booking", body: "Define availability, conflicts, and the cases that require a person." }, { title: "Close the dispatch loop", body: "Carry the same job record through assignment and completion." }], proofTitle: "Rejunk", proof: "Rejunk combines lead handling, dispatch, driver activation, job management, and live location in a browser-based operating platform for moving and junk-removal work.", faqs: [{ question: "Can AI quote every job?", answer: "No. The workflow should send unusually large, unclear, hazardous, or otherwise exceptional jobs to a person." }, { question: "Can it use our existing pricebook?", answer: "Yes. The pricebook remains the pricing authority while AI is limited to extracting defined facts from the customer's message or photos." }, { question: "Can drivers use their own phones?", answer: "A browser-based driver experience can support fast activation without an app-store download, subject to the security and device requirements of the business." }], related: [{ href: "/en/portfolio/rejunk", label: "Rejunk case study", description: "See the public-safe system architecture." }, { href: "/en/how-it-works", label: "How the pipeline works", description: "Follow the lead from intake to completion." }, contact],
  },
  "artificial-turf-landscaping": {
    slug: "artificial-turf-landscaping", kind: "industry", eyebrow: "Artificial turf and landscaping", title: "Give homeowners a faster visual estimate without pretending AI replaces site judgment", metaTitle: "AI Estimating for Turf & Landscaping | Abe Media", description: "Photo intake, AI visualization, estimate workflows, CRM handoff, and human review for artificial-turf and landscaping businesses.", intro: "A visual estimator can help a homeowner understand a possible result and help a sales team collect better project information before a site visit. It should make assumptions visible and route uncertainty to a person.",
    goodFit: ["Leads want a visual answer before booking", "Photo quality varies", "Sales staff re-enter project details", "Estimates need a consistent CRM handoff"],
    sections: [{ title: "Guided project intake", body: "Ask for the images and details needed to evaluate the opportunity.", items: ["Photo guidance", "Area and access questions", "Project goals", "Contact and consent"] }, { title: "Visualize with context", body: "Generate a clearly labeled concept while retaining the source photo and assumptions.", items: ["Defined transformation", "Original image retention", "Visualization disclosure", "Low-confidence review"] }, { title: "Move sales forward", body: "Create a reviewable estimate path instead of a dead-end image generator.", items: ["Pricebook logic", "Estimate document", "CRM lead", "Appointment or follow-up"] }], processTitle: "A safe estimating flow", process: [{ title: "Collect", body: "Guide the homeowner through useful photos and project facts." }, { title: "Visualize", body: "Create the defined concept and label it accurately." }, { title: "Estimate", body: "Apply approved rules and document assumptions." }, { title: "Review", body: "Send uncertain or complex work to an estimator before commitment." }], proofTitle: "AI Design Studio for an Artificial Turf Franchise", proof: "This anonymized case study shows how Abe Media connected customer photo intake, AI-assisted visualization, estimate output, and lead creation into one buyer journey.", faqs: [{ question: "Is the AI image a promise of the finished installation?", answer: "No. It is a visualization of a possible result and should be labeled that way. Site conditions and final scope still require appropriate validation." }, { question: "Can the estimator use our pricing rules?", answer: "Yes. The business's approved pricebook, minimums, and review rules—not the image model—should control pricing." }, { question: "Will difficult projects go to a person?", answer: "Yes. Confidence and scope gates can hold an estimate for manual review instead of presenting false precision." }], related: [{ href: "/en/services/ai-estimating-tools", label: "AI estimating tools", description: "See the service architecture and safeguards." }, { href: "/en/portfolio/artificial-turf-ai-design-studio", label: "Artificial turf AI design studio", description: "Review the anonymized case study." }, contact],
  },
  "home-service-businesses": {
    slug: "home-service-businesses", kind: "industry", eyebrow: "Home-service businesses", title: "Answer the call, capture the job, and give the field team a clean handoff", metaTitle: "AI Agents & Automation for Home Services | Abe Media", description: "Voice agents, lead automation, scheduling, customer updates, estimating, and dispatch workflows for home-service businesses.", intro: "Home-service growth often leaks between the phone call, the estimate, the calendar, and the crew. Abe Media designs the handoffs so customers get a clear response and operators can see what happens next.",
    goodFit: ["After-hours calls become voicemail", "Office staff repeat qualification questions", "Lead sources do not stay in sync", "Crews receive incomplete job details"],
    sections: [{ title: "Before the booking", body: "Collect the information needed to decide the next action.", items: ["Bilingual phone or form intake", "Service-area checks", "Job-type qualification", "Human escalation"] }, { title: "At the booking", body: "Use approved availability and communicate the commitment clearly.", items: ["Calendar integration", "Confirmation", "CRM record", "Exception handling"] }, { title: "After the booking", body: "Carry a complete job record into dispatch and follow-up.", items: ["Crew handoff", "Status updates", "Photos and notes", "Completion and review request triggers"] }], processTitle: "Choose the first leak", process: [{ title: "Measure the missed handoff", body: "Start with unanswered calls, slow lead response, quoting, or dispatch—not all four." }, { title: "Map the rule", body: "Document what staff need to know and when a person must decide." }, { title: "Pilot with one service", body: "Use a narrow job type to test real customer and crew behavior." }, { title: "Connect the next step", body: "Expand only after the first handoff is observable and reliable." }], proofTitle: "Patterns already in use", proof: "Abe Media's public work spans AI phone intake, lead-to-booking automation, turf estimating, and browser-based dispatch for moving and junk-removal operations.", faqs: [{ question: "Which home-service businesses are a good fit?", answer: "The strongest fit is a business with repeatable intake, clear service boundaries, enough call or lead volume to expose handoff costs, and a person available for exceptions." }, { question: "Do we need a new CRM?", answer: "Not necessarily. The workflow can integrate with an existing supported CRM or begin with a focused operating layer beside it." }, { question: "Can we start with after-hours calls only?", answer: "Yes. A limited after-hours scope is often a practical way to test qualification, escalation, and booking before expanding coverage." }], related: [{ href: "/en/services/ai-voice-agents", label: "AI voice agents", description: "Cover intake, booking, and escalation." }, { href: "/en/services/lead-pipeline-automation", label: "Lead automation", description: "Connect sources, rules, calendars, and CRM." }, contact],
  },
  "waste-management-commercial-hauling": {
    slug: "waste-management-commercial-hauling", kind: "industry", eyebrow: "Waste management and commercial hauling", title: "Build dispatch software around the stop exceptions operators actually face", metaTitle: "Waste Management & Commercial Hauling Software | Abe Media", description: "Dispatch, container logistics, exception workflows, driver operations, and compliance reporting informed by 17 years at Waste Management.", intro: "Abe Perez spent 17 years at Waste Management, including work as a Dispatch Operations Manager in Southern California during the recycLA era. He managed dispatch supporting 300+ vehicles and 27 direct reports. Abe Media applies that operating context without implying a current Waste Management affiliation.",
    goodFit: ["Blocked or inaccessible stops derail the route", "Container status is unclear across teams", "Drivers and dispatch describe exceptions differently", "Franchise or customer reporting requires manual reconstruction"],
    sections: [{ title: "Route exceptions", body: "A dispatch platform needs specific outcomes for the events that prevent service.", items: ["Locked gates and access issues", "Contamination", "Overweight containers", "Wrong location or missing container"] }, { title: "Container and driver operations", body: "The system should preserve what happened, who owns the next action, and what the customer needs to know.", items: ["Asset and location context", "Driver notes and evidence", "Escalation ownership", "Reservice or follow-up state"] }, { title: "Compliance-ready history", body: "Structured events make reporting defensible without rebuilding the day from calls and texts.", items: ["Standard exception codes", "Timestamped status history", "Completion evidence", "Operational and franchise reports"] }], processTitle: "Translate operating knowledge into software", process: [{ title: "Observe the route", body: "Map normal service and the exceptions that change the plan." }, { title: "Define ownership", body: "Assign the next action for dispatch, driver, customer service, or management." }, { title: "Test with real scenarios", body: "Use blocked stops, contamination, weight, access, and emergency examples." }, { title: "Measure the handoff", body: "Track whether exceptions reach resolution with usable evidence." }], proofTitle: "Operations experience behind the design", proof: "This perspective comes from Abe's prior Waste Management career, including Southern California dispatch leadership during recycLA—not from a generic industry template. Waste Management and recycLA are referenced as past experience only.", faqs: [{ question: "Is Abe Media affiliated with Waste Management or recycLA today?", answer: "No current affiliation is stated. These references describe Abe Perez's prior operations experience and the context behind his dispatch-software practice." }, { question: "Can the platform replace our route system?", answer: "That decision requires a workflow and integration audit. A focused exception or reporting layer may be safer than replacing a core route system." }, { question: "Can it support franchise reporting?", answer: "A system can capture the structured events and evidence needed for approved reports. The exact requirements, definitions, and data sources must be validated with the operator." }], related: [{ href: "/en/about/abe-perez", label: "About Abe Perez", description: "Read the founder's operations background." }, { href: "/en/services/dispatch-operations-platforms", label: "Dispatch platforms", description: "See the delivery approach." }, contact],
  },
  "moving-companies": {
    slug: "moving-companies", kind: "industry", eyebrow: "Moving companies", title: "Connect lead response, pricebook rules, crew scheduling, and job completion", metaTitle: "Moving Company Automation & Dispatch Software | Abe Media", description: "Lead intake, flat-rate pricebook workflows, scheduling, dispatch, crew communication, and exception handling for moving companies.", intro: "Abe Media's moving-industry work is grounded in a Phoenix moving and labor operation and its flat-rate estimating workflow. Public examples are sanitized to protect private vendors, rates, customer data, and operating rules.",
    goodFit: ["Lead descriptions arrive as unstructured text", "Quotes depend on a pricebook and hard minimums", "Availability changes while a customer is responding", "Crew assignment and lead status are disconnected"],
    sections: [{ title: "Lead and inventory intake", body: "Turn the customer's description into reviewable job facts.", items: ["Item and access details", "Origin and destination context", "Date and time preferences", "Human review for unusual scope"] }, { title: "Pricebook-backed estimating", body: "AI may identify items, but the company's rules set the price.", items: ["Approved line items", "Hard price floors", "Consistent estimate output", "No autonomous pricing outside the rules"] }, { title: "Scheduling and dispatch", body: "Confirm availability at the moment of commitment and preserve the result downstream.", items: ["Conflict-safe calendar checks", "Job creation", "Crew assignment", "Status and customer updates"] }], processTitle: "A reliable lead-to-job flow", process: [{ title: "Parse the request", body: "Preserve the source message and extract only defined facts." }, { title: "Apply the pricebook", body: "Use approved rows, floors, and review thresholds." }, { title: "Confirm the schedule", body: "Recheck availability before committing the customer." }, { title: "Create the operating record", body: "Send the accepted job into CRM, dispatch, and crew workflows." }], proofTitle: "Public-safe workflow evidence", proof: "The How It Works page demonstrates the architecture of a live Phoenix moving and junk-removal automation while intentionally withholding vendor names, rates, timing rules, and customer data.", faqs: [{ question: "Can the system quote from a text description?", answer: "It can extract defined inventory facts and match approved pricebook rows. Ambiguous or unusually large moves should be held for a person." }, { question: "What happens if a time slot is taken?", answer: "Availability is checked again before booking. The workflow can offer approved alternatives or route the lead to staff rather than double-booking." }, { question: "Will you publish our rates or workflow details?", answer: "No. Public case studies are limited to approved, nonconfidential architecture and outcomes. Private rates, customer data, and operational controls stay private." }], related: [{ href: "/en/how-it-works", label: "How it works", description: "Explore the sanitized automation pipeline." }, { href: "/en/services/lead-pipeline-automation", label: "Lead automation", description: "See the resilience and monitoring model." }, contact],
  },
};

export const caseStudyPages: Record<string, ContentPageData> = {
  rejunk: {
    slug: "rejunk", kind: "case-study", eyebrow: "Case study · Rejunk", title: "One browser-based system for lead handling, dispatch, and driver activation", metaTitle: "Rejunk Dispatch & Lead Automation Case Study | Abe Media", description: "How Abe Media connected lead handling, job management, browser-based driver activation, dispatch, and live location for moving and junk-removal operations.", intro: "Rejunk brings the office and field workflow into one browser-based platform. The public case study describes Abe Media's implementation without exposing private rates, customer records, vendors, or operating controls.",
    goodFit: ["Leads and dispatch were separate workflows", "Drivers needed simple activation", "Jobs needed a shared live status", "The operator needed browser access without app-store distribution"],
    sections: [{ title: "The operating problem", body: "Moving a lead into a completed field job required too many manual handoffs.", items: ["Lead details had to become a usable job", "Dispatch needed driver availability and status", "Crews needed a low-friction mobile experience", "The office needed one record of progress"] }, { title: "Abe Media's role", body: "Abe Media designed and built the public-facing workflow demonstrated in Rejunk.", items: ["Lead and job data model", "Dispatch board", "Email-key and PIN driver activation", "Browser-based driver workflow and live location"] }, { title: "Delivery boundaries", body: "The public version intentionally excludes confidential implementation details.", items: ["No customer data", "No private vendor credentials", "No rate or price-floor disclosure", "No private automation timing"] }], processTitle: "The delivered flow", process: [{ title: "Lead received", body: "The source request becomes a structured, attributable record." }, { title: "Job prepared", body: "Approved qualification, quoting, and scheduling rules determine the next action." }, { title: "Driver activated", body: "The field user receives a simple browser sign-in and assigned work." }, { title: "Dispatch follows completion", body: "Status, location, notes, and completion stay attached to the job." }], proofTitle: "Evidence available", proof: "Abe Media publishes the sanitized lead-to-finished-job walkthrough and Rejunk product views. Additional screenshots, client attribution, or results should be published only with explicit permission.", faqs: [{ question: "Is the public workflow the complete production configuration?", answer: "No. It is deliberately sanitized. Vendor names, rates, timing, credentials, customer data, and sensitive operating rules are not published." }, { question: "Does the driver need an app-store download?", answer: "The demonstrated driver workflow runs in the browser and uses an activation key plus PIN." }, { question: "Can a similar system use a different CRM or lead source?", answer: "Potentially. Each provider's authorized API, data model, rate limits, and error behavior must be evaluated separately." }], related: [{ href: "/en/how-it-works", label: "View the workflow", description: "Follow the sanitized system from lead to completion." }, { href: "/en/industries/junk-removal", label: "Junk-removal automation", description: "See the industry use cases and safeguards." }, { href: "/en/services/lead-pipeline-automation", label: "Lead-pipeline automation", description: "Review the implementation model." }],
  },
  "artificial-turf-ai-design-studio": {
    slug: "artificial-turf-ai-design-studio", kind: "case-study", eyebrow: "Case study · Artificial turf franchise", title: "AI Design Studio for an Artificial Turf Franchise", metaTitle: "Artificial Turf AI Design Studio Case Study | Abe Media", description: "How Abe Media combined photo intake, AI-assisted turf visualization, estimate output, and CRM lead creation in one customer flow.", intro: "This anonymized AI design studio turns a homeowner's project photo and details into a visual concept and a structured estimating handoff. It is designed to move the sales conversation forward without presenting AI output as a guaranteed installation result.",
    goodFit: ["Customers wanted a visual preview", "Sales needed better intake before follow-up", "Estimate data needed a consistent format", "The business needed the lead in its CRM"],
    sections: [{ title: "The customer problem", body: "A homeowner may struggle to picture the finished space or provide enough context for the first sales conversation.", items: ["Inconsistent photos", "Missing project details", "Unclear expectations", "Disconnected contact and estimate data"] }, { title: "Abe Media's role", body: "Abe Media designed and built the connected estimating experience.", items: ["Guided photo and project intake", "AI-assisted visualization flow", "Estimate document generation", "CRM lead handoff"] }, { title: "Safety and expectation controls", body: "The workflow separates a visual concept from the final scope and price.", items: ["Visualization labeling", "Assumptions retained", "Approved business rules", "Human review for uncertainty"] }], processTitle: "The customer journey", process: [{ title: "Upload", body: "The customer submits a project photo and required site details." }, { title: "Visualize", body: "The system creates the defined turf concept while retaining the source context." }, { title: "Estimate", body: "Approved pricebook and scope rules create the reviewable output." }, { title: "Handoff", body: "The customer receives the next step and the sales team receives a structured CRM lead." }], proofTitle: "What the project demonstrates", proof: "The build demonstrates how image generation becomes useful when it is connected to intake, business rules, documents, and follow-up rather than shipped as a standalone novelty.", faqs: [{ question: "Is the visualization the final design?", answer: "No. It is a concept image intended to support the sales conversation. Final design, measurements, site conditions, and installation scope require appropriate review." }, { question: "Does AI calculate the price?", answer: "The architecture keeps pricing under approved business rules. AI is used only for defined interpretation or visualization tasks." }, { question: "What data reaches the CRM?", answer: "The handoff can include contact details, project answers, source images, estimate status, and the assumptions needed for follow-up." }], related: [{ href: "/en/services/ai-estimating-tools", label: "AI estimating tools", description: "See the reusable architecture." }, { href: "/en/industries/artificial-turf-landscaping", label: "Turf and landscaping", description: "Review industry-specific use cases." }, contact],
  },
  "elena-ai-voice-agent": {
    slug: "elena-ai-voice-agent", kind: "case-study", eyebrow: "Product demonstration · AI voice agent", title: "A bilingual AI intake agent with safety checks, qualification, and human boundaries", metaTitle: "Bilingual AI Voice Agent Case Study | Abe Media", description: "The design behind Abe Media's live AI phone-agent demonstration for bilingual intake, appointment handling, and escalation.", intro: "This demonstration shows how an AI voice agent can guide an intake call without making promises the business has not approved. The flow collects facts, checks for emergencies, handles interruptions, and keeps escalation available.",
    goodFit: ["Calls arrive outside office hours", "Intake follows repeatable questions", "Safety or urgency must be checked early", "The caller may prefer English or Spanish"],
    sections: [{ title: "The demonstration goal", body: "Show a complete intake interaction rather than a scripted question-and-answer bot.", items: ["Natural opening and disclosure", "Emergency screening", "Structured incident questions", "Appointment and contact handling"] }, { title: "Conversation design", body: "Real callers pause, correct themselves, interrupt, and omit details.", items: ["Turn-taking recovery", "Clarifying questions", "State preserved across the call", "Language-aware prompts"] }, { title: "Guardrails", body: "The agent should collect information without acting like an attorney or making unapproved commitments.", items: ["No legal advice", "No fee promises", "Human escalation", "Reviewable transcript and call record"] }], processTitle: "What happens on the call", process: [{ title: "Orient", body: "The agent identifies the purpose of the call and begins the approved intake." }, { title: "Check safety", body: "Immediate medical or emergency needs take priority over ordinary questions." }, { title: "Collect facts", body: "The flow captures the incident, parties, treatment, and contact details defined by the intake." }, { title: "Set the next step", body: "The agent books, transfers, or records a follow-up according to the approved rules." }], proofTitle: "Live, inspectable evidence", proof: "Abe Media publishes recorded demo calls with synced transcripts on the homepage, so the important behavior is audible and accessible as text.", faqs: [{ question: "Is the agent a lawyer?", answer: "No. It is an AI intake demonstration. It does not give legal advice, determine case value, or promise representation." }, { question: "Can the same pattern work in other industries?", answer: "Yes. The intake, qualification, booking, CRM, and escalation pattern can be adapted to service businesses, but the questions and rules must be rebuilt for each operation." }, { question: "Can the agent handle Spanish?", answer: "The product direction supports English and Spanish call paths. Each deployed flow still needs native review and testing against the business's actual intake requirements." }], related: [{ href: "/en/services/ai-voice-agents", label: "AI voice agents", description: "See how a production agent is scoped and launched." }, { href: "/en/services/bilingual-ai-automation", label: "Bilingual automation", description: "Design complete English and Spanish paths." }, contact],
  },
};
