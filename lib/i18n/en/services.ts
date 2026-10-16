// English strings for the six service detail pages.
// Wired into the `en` locale by the coordinator. All other locales fall back to English.

export const services: Record<string, string> = {
  // ── Shared ──────────────────────────────────────────────────────────────
  "svc.shared.allServices": "All services",
  "svc.shared.bookCall": "Book a scoping call",
  "svc.shared.seeWork": "See our work",
  "svc.shared.seePackages": "See pricing",
  "svc.shared.whatNext": "What happens next",
  "svc.shared.next1": "A 30-minute call about your current setup.",
  "svc.shared.next2": "A written plan with a clear estimate — no commitment.",

  // ── AI automation ───────────────────────────────────────────────────────
  "svc.ai-automation.meta.title": "AI automation services | Technovora",
  "svc.ai-automation.meta.desc":
    "We design and build AI workflows and agents that take repetitive work off your team's plate — mapped, built, and handed over in three weeks.",
  "svc.ai-automation.hero.eyebrow": "AI automation",
  "svc.ai-automation.hero.title": "Workflows that run themselves",
  "svc.ai-automation.hero.tagline":
    "We connect the tools you already use to AI agents that handle the repetitive work, so your team spends the week on the work that matters.",
  "svc.ai-automation.hero.week1.title": "Week 1 — Map",
  "svc.ai-automation.hero.week1.desc": "Process audit and clear estimate",
  "svc.ai-automation.hero.week2.title": "Week 2 — Build",
  "svc.ai-automation.hero.week2.desc": "Workflow build and tool integrations",
  "svc.ai-automation.hero.week3.title": "Week 3 — Launch",
  "svc.ai-automation.hero.week3.desc": "Testing, monitoring, and handoff",
  "svc.ai-automation.nav.symptoms": "Symptoms",
  "svc.ai-automation.nav.roadmap": "Roadmap",
  "svc.ai-automation.nav.stack": "Stack",
  "svc.ai-automation.nav.scoping": "Scoping",
  "svc.ai-automation.symptoms.title": "Sound familiar?",
  "svc.ai-automation.symptoms.intro":
    "If three or more of these describe your week, an automation audit is worth thirty minutes.",
  "svc.ai-automation.symptoms.1": "Copying data between tools by hand",
  "svc.ai-automation.symptoms.2": "Chasing updates across email and chat",
  "svc.ai-automation.symptoms.3": "Building the same report every Monday",
  "svc.ai-automation.symptoms.4": "Follow-ups slipping through the cracks",
  "svc.ai-automation.symptoms.5": "Scripts nobody remembers how to fix",
  "svc.ai-automation.symptoms.6": "Approvals waiting on one person's inbox",
  "svc.ai-automation.roadmap.title": "From first call to handoff in three weeks",
  "svc.ai-automation.roadmap.intro":
    "One workflow, fully built and documented. Here is exactly how those three weeks go.",
  "svc.ai-automation.roadmap.phase1.range": "Days 1–3",
  "svc.ai-automation.roadmap.phase1.title": "Map",
  "svc.ai-automation.roadmap.phase1.desc":
    "We sit with the people doing the work and document the process end to end — including the parts that should stay manual.",
  "svc.ai-automation.roadmap.phase1.d1": "Written process map",
  "svc.ai-automation.roadmap.phase1.d2": "Automation candidate list",
  "svc.ai-automation.roadmap.phase1.d3": "Clear written estimate",
  "svc.ai-automation.roadmap.phase2.range": "Days 4–7",
  "svc.ai-automation.roadmap.phase2.title": "Design",
  "svc.ai-automation.roadmap.phase2.desc":
    "We design the workflow, choose the triggers, and agree on success criteria before anything is built.",
  "svc.ai-automation.roadmap.phase2.d1": "Workflow design document",
  "svc.ai-automation.roadmap.phase2.d2": "Integration inventory",
  "svc.ai-automation.roadmap.phase2.d3": "Test plan with real examples",
  "svc.ai-automation.roadmap.phase3.range": "Days 8–14",
  "svc.ai-automation.roadmap.phase3.title": "Build",
  "svc.ai-automation.roadmap.phase3.desc":
    "We build the automation, connect your tools, and wire in AI agents where judgment is actually needed.",
  "svc.ai-automation.roadmap.phase3.d1": "Working, tested workflow",
  "svc.ai-automation.roadmap.phase3.d2": "Agent prompts and configurations",
  "svc.ai-automation.roadmap.phase3.d3": "Error handling and retries",
  "svc.ai-automation.roadmap.phase4.range": "Days 15–21",
  "svc.ai-automation.roadmap.phase4.title": "Launch",
  "svc.ai-automation.roadmap.phase4.desc":
    "We run it on real data, watch it in shadow mode, then hand it over with documentation and a walkthrough.",
  "svc.ai-automation.roadmap.phase4.d1": "Monitoring and alerts",
  "svc.ai-automation.roadmap.phase4.d2": "Written documentation",
  "svc.ai-automation.roadmap.phase4.d3": "Team walkthrough session",
  "svc.ai-automation.stack.title": "Built on tools your team already trusts",
  "svc.ai-automation.stack.prose":
    "Most automations run on n8n or Make for orchestration, with Claude or OpenAI where judgment is needed, and plain REST APIs and webhooks connecting the tools you already use — Slack, Notion, your CRM. Run data lands in PostgreSQL, and alerts go to the channels your team already watches.",
  "svc.ai-automation.pricing.title": "How we scope",
  "svc.ai-automation.pricing.desc":
    "Tell us about your project through the questionnaire — we reply with a written plan: what we build, in what order, and what it costs. You approve it before we start: no surprise invoices.",
  "svc.ai-automation.pricing.cta": "See packages",
  "svc.ai-automation.cta.headline": "Free 30-minute automation audit",
  "svc.ai-automation.cta.sub":
    "Bring the one workflow that hurts most. The audit covers:",
  "svc.ai-automation.cta.a1": "Your workflow, mapped live on the call",
  "svc.ai-automation.cta.a2": "An honest verdict — automate, simplify, or leave alone",
  "svc.ai-automation.cta.a3": "A clear written estimate if it is worth building",
  "svc.ai-automation.cta.button": "Book the free audit",
  "svc.ai-automation.cta.fine": "No sales pitch. If automation is not the right fix, we will say so.",

  // ── Web development ─────────────────────────────────────────────────────
  "svc.web-development.meta.title": "Web development services | Technovora",
  "svc.web-development.meta.desc":
    "We rebuild slow websites on a modern Next.js stack — fast, search-ready, and easy for your team to extend.",
  "svc.web-development.hero.numeral": "01",
  "svc.web-development.hero.eyebrow": "Web development",
  "svc.web-development.hero.title": "Your website, rebuilt for speed",
  "svc.web-development.hero.lead":
    "A slow site loses visitors before the headline loads. We move you to a modern stack — fast, readable by search engines, and easy for your team to extend.",
  "svc.web-development.beforeafter.title": "What changes",
  "svc.web-development.beforeafter.intro":
    "Every rebuild follows the same arc: less weight, more structure.",
  "svc.web-development.beforeafter.1.before": "A theme with forty plugins",
  "svc.web-development.beforeafter.1.after": "One codebase, nothing you do not use",
  "svc.web-development.beforeafter.2.before": "Caching layers stacked on a heavy page",
  "svc.web-development.beforeafter.2.after": "Pages that load before the visitor notices",
  "svc.web-development.beforeafter.3.before": "SEO added after launch, as a plugin",
  "svc.web-development.beforeafter.3.after": "Structure and metadata built into every page",
  "svc.web-development.beforeafter.4.before": "Edits that need a developer",
  "svc.web-development.beforeafter.4.after": "A CMS your editors can use without code",
  "svc.web-development.beforeafter.5.before": "Breaks when something updates",
  "svc.web-development.beforeafter.5.after": "Components with a performance budget",
  "svc.web-development.chapters.title": "How the rebuild goes",
  "svc.web-development.chapters.1.title": "Rebuild",
  "svc.web-development.chapters.1.body":
    "We move your site off the legacy stack and onto Next.js. Content migrates with it, redirects carry your search rankings across, and nothing launches slower than it needs to.",
  "svc.web-development.chapters.2.title": "Performance",
  "svc.web-development.chapters.2.body":
    "We agree on a load-time target during discovery, then build to it: images sized for the page, code split by route, and nothing shipped that breaks the budget. We measure before launch, in plain numbers.",
  "svc.web-development.chapters.3.title": "Structure",
  "svc.web-development.chapters.3.body":
    "Search engines read the site the way visitors do. Clean URLs, proper headings, metadata, and sitemaps are built into every template from the first commit — not added afterwards.",
  "svc.web-development.chapters.4.title": "Handoff",
  "svc.web-development.chapters.4.body":
    "Your team gets a component library, editor documentation, and a walkthrough. Edits become content updates, not tickets. We stay for thirty days after launch while everything settles.",
  "svc.web-development.stack.title": "A modern stack, end to end",
  "svc.web-development.stack.1.category": "Frontend",
  "svc.web-development.stack.1.tools": "Next.js · React · TypeScript",
  "svc.web-development.stack.2.category": "Styling",
  "svc.web-development.stack.2.tools": "Tailwind CSS",
  "svc.web-development.stack.3.category": "Content",
  "svc.web-development.stack.3.tools": "Headless CMS · Markdown",
  "svc.web-development.stack.4.category": "Data",
  "svc.web-development.stack.4.tools": "PostgreSQL",
  "svc.web-development.stack.5.category": "Hosting",
  "svc.web-development.stack.5.tools": "Vercel",
  "svc.web-development.pricing.title": "What shapes the scope",
  "svc.web-development.pricing.intro":
    "No two rebuilds are the same. These are the five things that shape the scope:",
  "svc.web-development.pricing.1": "Number of page templates",
  "svc.web-development.pricing.2": "Content migration volume",
  "svc.web-development.pricing.3": "Integrations and third-party tools",
  "svc.web-development.pricing.4": "Custom functionality versus off-the-shelf",
  "svc.web-development.pricing.5": "Design: keep it, refresh it, or start over",
  "svc.web-development.pricing.note":
    "Every rebuild is scoped after you share your requirements — you approve the scope and the estimate before anything starts.",
  "svc.web-development.pricing.cta": "See packages",
  "svc.web-development.cta.statement": "Know exactly why your site is slow.",
  "svc.web-development.cta.button": "Book a scoping call",
  "svc.web-development.cta.fine": "Bring your URL — we will walk you through what we find, in plain language.",

  // ── Mobile apps ─────────────────────────────────────────────────────────
  "svc.mobile-apps.meta.title": "Mobile app development | Technovora",
  "svc.mobile-apps.meta.desc":
    "We ship cross-platform mobile apps with a native feel — one codebase, both app stores, handled end to end.",
  "svc.mobile-apps.hero.eyebrow": "Mobile apps",
  "svc.mobile-apps.hero.title": "One codebase, both app stores",
  "svc.mobile-apps.hero.sub":
    "We build cross-platform apps that feel native — shipped to iOS and Android without paying for every feature twice.",
  "svc.mobile-apps.hero.triptych.1.title": "The challenge",
  "svc.mobile-apps.hero.triptych.1.desc": "Building native twice costs every feature twice.",
  "svc.mobile-apps.hero.triptych.2.title": "The partnership",
  "svc.mobile-apps.hero.triptych.2.desc": "A build rhythm you can follow, week by week.",
  "svc.mobile-apps.hero.triptych.3.title": "The impact",
  "svc.mobile-apps.hero.triptych.3.desc": "An app your team can actually maintain.",
  "svc.mobile-apps.challenge.title": "The challenge",
  "svc.mobile-apps.challenge.body1":
    "Most teams start with a product people want on their phones and a budget that only covers one team. Two native codebases means every feature is designed, built, and fixed twice — and store reviews add surprises of their own.",
  "svc.mobile-apps.challenge.body2":
    "Meanwhile the launch slips and competitors ship. Cross-platform done well breaks that trade-off: one codebase, native feel, both stores.",
  "svc.mobile-apps.challenge.list.title": "Where native-twice hurts",
  "svc.mobile-apps.challenge.list.1": "Features paid for twice",
  "svc.mobile-apps.challenge.list.2": "Every fix implemented and reviewed twice",
  "svc.mobile-apps.challenge.list.3": "Store rejections nobody planned for",
  "svc.mobile-apps.challenge.list.4": "A roadmap that keeps slipping",
  "svc.mobile-apps.partnership.title": "The partnership",
  "svc.mobile-apps.partnership.intro":
    "You see progress every week and know exactly what the next one brings.",
  "svc.mobile-apps.partnership.week1.label": "Week 1",
  "svc.mobile-apps.partnership.week1.activity":
    "Scope and screens — we lock the feature list and map every screen.",
  "svc.mobile-apps.partnership.week2.label": "Weeks 2–3",
  "svc.mobile-apps.partnership.week2.activity":
    "Build the core — navigation, sign-in, and the main user flows.",
  "svc.mobile-apps.partnership.week3.label": "Weeks 4–5",
  "svc.mobile-apps.partnership.week3.activity":
    "Integrations and polish — APIs, push notifications, offline behavior.",
  "svc.mobile-apps.partnership.week4.label": "Week 6",
  "svc.mobile-apps.partnership.week4.activity":
    "Store submission — listings, screenshots, and review handled.",
  "svc.mobile-apps.impact.title": "The impact",
  "svc.mobile-apps.impact.1.label": "Maintainable",
  "svc.mobile-apps.impact.1.text": "One codebase your team can read — not two they cannot.",
  "svc.mobile-apps.impact.2.label": "Shipped",
  "svc.mobile-apps.impact.2.text": "We own the store submission, listings, and review back-and-forth.",
  "svc.mobile-apps.impact.3.label": "Reliable",
  "svc.mobile-apps.impact.3.text": "Offline support and error states built in, not bolted on later.",
  "svc.mobile-apps.impact.4.label": "Extensible",
  "svc.mobile-apps.impact.4.text": "New features ship once and land on both platforms together.",
  "svc.mobile-apps.platforms.title": "Where your app ships",
  "svc.mobile-apps.platforms.1.title": "iOS",
  "svc.mobile-apps.platforms.1.desc":
    "Native where it matters — Swift modules for the features that genuinely need them.",
  "svc.mobile-apps.platforms.1.a": "App Store submission handled",
  "svc.mobile-apps.platforms.1.b": "Native modules for performance-critical features",
  "svc.mobile-apps.platforms.2.title": "Android",
  "svc.mobile-apps.platforms.2.desc":
    "Built for the full range of Android devices, not just the latest flagship.",
  "svc.mobile-apps.platforms.2.a": "Google Play submission handled",
  "svc.mobile-apps.platforms.2.b": "Material patterns — not iOS ports",
  "svc.mobile-apps.platforms.3.title": "Cross-platform",
  "svc.mobile-apps.platforms.3.desc":
    "React Native and Expo: one shared codebase, feature-complete on both stores.",
  "svc.mobile-apps.platforms.3.a": "Same features, both platforms, one effort",
  "svc.mobile-apps.platforms.3.b": "Over-the-air updates for fast fixes",
  "svc.mobile-apps.cta.meta": "Mobile apps · 4–6 week builds",
  "svc.mobile-apps.cta.headline": "Ship to both stores without hiring two teams.",
  "svc.mobile-apps.cta.button": "Book a scoping call",
  "svc.mobile-apps.cta.fine":
    "A 30-minute call — we will tell you plainly what it takes to get your app live.",

  // ── Cloud & DevOps ──────────────────────────────────────────────────────
  "svc.cloud-devops.meta.title": "Cloud and DevOps services | Technovora",
  "svc.cloud-devops.meta.desc":
    "We set up automated cloud infrastructure and deployment pipelines that are safe, observable, and cheap to run.",
  "svc.cloud-devops.hero.eyebrow": "Cloud and DevOps",
  "svc.cloud-devops.hero.title": "Infrastructure you don't have to think about",
  "svc.cloud-devops.hero.tagline":
    "We build automated pipelines and cloud setups that deploy safely and scale without babysitting.",
  "svc.cloud-devops.problem.eyebrow": "The problem",
  "svc.cloud-devops.problem.title": "Deployments should not depend on memory",
  "svc.cloud-devops.problem.desc":
    "One person, one script, and a quiet hope that nothing breaks. There is a better way.",
  "svc.cloud-devops.problem.1.title": "No CI/CD discipline",
  "svc.cloud-devops.problem.1.desc":
    "Every release depends on someone remembering the right steps in the right order.",
  "svc.cloud-devops.problem.2.title": "Servers held together by hand",
  "svc.cloud-devops.problem.2.desc":
    "Manual fixes accumulate until nobody dares to touch production.",
  "svc.cloud-devops.problem.3.title": "Cloud bills nobody watches",
  "svc.cloud-devops.problem.3.desc":
    "Spend goes unreviewed until the invoice is three times what anyone expected.",
  "svc.cloud-devops.included.eyebrow": "What's included",
  "svc.cloud-devops.included.title": "Infrastructure that scales without babysitting",
  "svc.cloud-devops.included.desc": "From migration to monitoring, we handle the whole setup.",
  "svc.cloud-devops.included.1.title": "Audit",
  "svc.cloud-devops.included.1.desc":
    "We review your current setup, pipelines, and spend before changing anything.",
  "svc.cloud-devops.included.2.title": "Infrastructure as code",
  "svc.cloud-devops.included.2.desc":
    "Your whole stack defined in Terraform — reviewable, versioned, reproducible.",
  "svc.cloud-devops.included.3.title": "CI/CD pipelines",
  "svc.cloud-devops.included.3.desc":
    "Every push tested and deployed automatically with GitHub Actions.",
  "svc.cloud-devops.included.4.title": "Monitoring and alerts",
  "svc.cloud-devops.included.4.desc": "You hear about problems before your customers do.",
  "svc.cloud-devops.included.5.title": "Cost review",
  "svc.cloud-devops.included.5.desc":
    "We cut waste from your cloud bill without cutting performance.",
  "svc.cloud-devops.included.6.title": "Runbooks",
  "svc.cloud-devops.included.6.desc":
    "Documented response plans your team owns — written for 3 a.m., not for us.",
  "svc.cloud-devops.stack.eyebrow": "Tools we use",
  "svc.cloud-devops.stack.title": "Proven cloud tooling",
  "svc.cloud-devops.pricing.eyebrow": "Pricing",
  "svc.cloud-devops.pricing.desc":
    "Cloud work is scoped after you share your requirements through the questionnaire. Ongoing care plans are available after launch.",
  "svc.cloud-devops.pricing.cta": "See packages",
  "svc.cloud-devops.faq.1.q": "Do you work with our existing AWS or GCP account?",
  "svc.cloud-devops.faq.1.a":
    "Yes. We start with a review of what you have and build on it — we don't rip everything out for fun.",
  "svc.cloud-devops.faq.2.q": "What about on-call and incidents?",
  "svc.cloud-devops.faq.2.a":
    "Before we call a project done, monitoring and alerting are set up, and your team owns a documented runbook.",
  "svc.cloud-devops.faq.3.q": "Can you actually lower our cloud bill?",
  "svc.cloud-devops.faq.3.a":
    "In most reviews we find real waste — idle resources, oversized instances — that can be cut without touching performance.",
  "svc.cloud-devops.cta.headline": "Stop dreading deploy day",
  "svc.cloud-devops.cta.sub":
    "A 30-minute scoping call. We will map your risks and your wasted spend.",
  "svc.cloud-devops.cta.button": "Book a scoping call",

  // ── Design & UI/UX ──────────────────────────────────────────────────────
  "svc.design.meta.title": "UI/UX design services | Technovora",
  "svc.design.meta.desc":
    "We design product interfaces and brand systems that look considered and behave predictably — tested with real users.",
  "svc.design.hero.eyebrow": "Design and UI/UX",
  "svc.design.hero.title": "Interfaces people understand at a glance",
  "svc.design.hero.tagline":
    "We design product interfaces and brand systems that look considered — and behave predictably under real use.",
  "svc.design.problem.eyebrow": "The problem",
  "svc.design.problem.title": "Generic design converts generically",
  "svc.design.problem.desc":
    "Template-built sites look like everyone else's — and perform like everyone else's.",
  "svc.design.problem.1.title": "No design system",
  "svc.design.problem.1.desc":
    "Every screen invents its own patterns, and your users can feel the seams.",
  "svc.design.problem.2.title": "Designed in meeting rooms",
  "svc.design.problem.2.desc":
    "Decisions made without watching real users ship with untested assumptions.",
  "svc.design.problem.3.title": "Looks done, isn't",
  "svc.design.problem.3.desc":
    "A pretty mockup that ignores states, errors, and edge cases is a handoff of new problems.",
  "svc.design.included.eyebrow": "What's included",
  "svc.design.included.title": "Design that survives contact with users",
  "svc.design.included.desc":
    "From research to developer handoff, we run the whole design process.",
  "svc.design.included.1.title": "Design system",
  "svc.design.included.1.desc":
    "A component library that keeps every screen consistent as you grow.",
  "svc.design.included.2.title": "UX research",
  "svc.design.included.2.desc":
    "We watch real users complete real tasks, then fix what slows them down.",
  "svc.design.included.3.title": "Figma prototypes",
  "svc.design.included.3.desc":
    "Clickable prototypes tested with users before a single line of production code.",
  "svc.design.included.4.title": "Brand identity",
  "svc.design.included.4.desc":
    "A visual identity that holds up across product, website, and pitch decks.",
  "svc.design.included.5.title": "Conversion-focused layouts",
  "svc.design.included.5.desc":
    "Every screen designed around the action you want users to take.",
  "svc.design.included.6.title": "Developer handoff",
  "svc.design.included.6.desc":
    "Specs and design tokens your engineering team can build from without guesswork.",
  "svc.design.stack.eyebrow": "Tools we use",
  "svc.design.stack.title": "A professional design toolkit",
  "svc.design.pricing.eyebrow": "Pricing",
  "svc.design.pricing.desc":
    "Design engagements are estimated after you share your requirements — you approve the scope and the estimate before anything starts.",
  "svc.design.pricing.cta": "See packages",
  "svc.design.faq.1.q": "Do you redesign existing products or only new ones?",
  "svc.design.faq.1.a":
    "Both. For existing products we start with a UX audit so the redesign fixes measured problems, not just the visuals.",
  "svc.design.faq.2.q": "Can our engineers build from your designs?",
  "svc.design.faq.2.a":
    "Yes — that's the point. Handoff includes specs, tokens, and a walkthrough with your team.",
  "svc.design.faq.3.q": "Do you do brand identity as well as product UI?",
  "svc.design.faq.3.a":
    "Yes. Identity work covers logo, type, color, and the rules that keep them consistent everywhere.",
  "svc.design.cta.headline": "See your product clearly before you build it",
  "svc.design.cta.sub":
    "A 30-minute scoping call. Bring your product and we will show you what good design would change.",
  "svc.design.cta.button": "Book a scoping call",

  // ── SMM ─────────────────────────────────────────────────────────────────
  "svc.smm.meta.title": "Social media management services | Technovora",
  "svc.smm.meta.desc":
    "We plan, write, and run your social presence — consistent content, managed campaigns, and reporting you can read.",
  "svc.smm.hero.eyebrow": "Social media management",
  "svc.smm.hero.title": "A content rhythm your audience can rely on",
  "svc.smm.hero.tagline":
    "We plan, write, and run your social presence — consistent posts, managed campaigns, and reporting in plain language.",
  "svc.smm.problem.eyebrow": "The problem",
  "svc.smm.problem.title": "Inconsistency is invisible — until it costs you",
  "svc.smm.problem.desc":
    "Audiences follow rhythms. Break the rhythm and they stop checking.",
  "svc.smm.problem.1.title": "Posting when someone remembers",
  "svc.smm.problem.1.desc": "Irregular publishing trains your audience to stop paying attention.",
  "svc.smm.problem.2.title": "No one owns the calendar",
  "svc.smm.problem.2.desc":
    "Without an owner, content is the first thing dropped when the week gets busy.",
  "svc.smm.problem.3.title": "Boosting posts without a plan",
  "svc.smm.problem.3.desc":
    "Ad spend without targeting and creative testing is a tax on hope.",
  "svc.smm.included.eyebrow": "What's included",
  "svc.smm.included.title": "Your social presence, handled",
  "svc.smm.included.desc": "Planning, publishing, and reporting — the whole loop.",
  "svc.smm.included.1.title": "Content calendar",
  "svc.smm.included.1.desc":
    "A month of posts planned ahead, so publishing never depends on a free afternoon.",
  "svc.smm.included.2.title": "Copywriting",
  "svc.smm.included.2.desc":
    "Posts written in your voice for each platform — not the same text pasted everywhere.",
  "svc.smm.included.3.title": "Creative direction",
  "svc.smm.included.3.desc": "Visuals and formats matched to what each channel actually rewards.",
  "svc.smm.included.4.title": "Campaign management",
  "svc.smm.included.4.desc":
    "Paid campaigns set up, targeted, and tuned — with budgets you approve first.",
  "svc.smm.included.5.title": "Community management",
  "svc.smm.included.5.desc": "Comments and messages answered in your voice, on your schedule.",
  "svc.smm.included.6.title": "Monthly analytics",
  "svc.smm.included.6.desc":
    "A plain-language report: what worked, what didn't, and what changes next.",
  "svc.smm.stack.eyebrow": "Tools we use",
  "svc.smm.stack.title": "How we run your channels",
  "svc.smm.stack.body":
    "We plan in shared content calendars, write and schedule with modern publishing tools, manage campaigns natively inside each ad platform, and report on the numbers that matter — reach, engagement, and what it costs.",
  "svc.smm.pricing.eyebrow": "Pricing",
  "svc.smm.pricing.desc":
    "Social engagements are estimated after you share your requirements, based on channels and volume.",
  "svc.smm.pricing.cta": "See packages",
  "svc.smm.faq.1.q": "Which platforms do you manage?",
  "svc.smm.faq.1.a":
    "Wherever your audience is — typically LinkedIn, Instagram, X, and TikTok — plus the ad platforms behind them.",
  "svc.smm.faq.2.q": "Do we approve content before it goes out?",
  "svc.smm.faq.2.a":
    "Yes. Nothing publishes without your approval until you've told us otherwise.",
  "svc.smm.faq.3.q": "How do we know it's working?",
  "svc.smm.faq.3.a":
    "A monthly report in plain language: what we posted, what it earned, and what we change next.",
  "svc.smm.cta.headline": "Hand us the calendar",
  "svc.smm.cta.sub":
    "A 30-minute call to talk through your channels, your voice, and what consistent publishing could look like.",
  "svc.smm.cta.button": "Book a scoping call",
};
