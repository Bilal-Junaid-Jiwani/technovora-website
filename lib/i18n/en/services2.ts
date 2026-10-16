// English strings for the three service detail pages rebuilt on branch
// `full-rebuild`: cloud-devops (10Clouds), design (Fueled), smm (Phenomenon).
// Exported as { cloud, design, smm } so each page owns a flat record of
// fully-qualified keys; wired into the `en` locale by the coordinator by
// spreading each page record, exactly like the `services` partial.

export const services2: {
  cloud: Record<string, string>;
  design: Record<string, string>;
  smm: Record<string, string>;
} = {
  cloud: {
    // ── Hero ──────────────────────────────────────────────────────────
    "svc2.cloud.hero.eyebrow": "Cloud & DevOps",
    "svc2.cloud.hero.title": "Infrastructure you can stop thinking about",
    "svc2.cloud.hero.sub":
      "We build the pipelines, environments, and monitoring that let your team ship every day — without the 3 a.m. wake-up calls.",
    "svc2.cloud.hero.cta1": "Book a scoping call",
    "svc2.cloud.hero.cta2": "See packages",
    "svc2.cloud.hero.diagramCaption": "Every push, tested and deployed the same way.",
    "svc2.cloud.hero.edgeCaption": "Global edge",

    // ── Risks ─────────────────────────────────────────────────────────
    "svc2.cloud.risks.eyebrow": "Risk register",
    "svc2.cloud.risks.title": "The risks we look for first",
    "svc2.cloud.risks.desc":
      "Most infrastructure failures are predictable. Here is what we check in every engagement, and what we do about each one.",
    "svc2.cloud.risks.col.risk": "Risk",
    "svc2.cloud.risks.col.mitigation": "How we remove it",
    "svc2.cloud.risks.1.risk": "Deploys happen from one person's laptop",
    "svc2.cloud.risks.1.mitigation":
      "A GitHub Actions pipeline — every change builds, tests, and deploys the same way, with a full history.",
    "svc2.cloud.risks.2.risk": "Nobody notices an outage before customers do",
    "svc2.cloud.risks.2.mitigation":
      "Health checks, uptime monitors, and alerting wired to a channel your team actually reads.",
    "svc2.cloud.risks.3.risk": "Infrastructure only exists in the cloud console",
    "svc2.cloud.risks.3.mitigation":
      "Terraform definitions for every resource, reviewed in pull requests like application code.",
    "svc2.cloud.risks.4.risk": "The cloud bill grows without explanation",
    "svc2.cloud.risks.4.mitigation":
      "Tagged resources, budget alerts, and a regular review that cuts waste without cutting performance.",

    // ── Phases ────────────────────────────────────────────────────────
    "svc2.cloud.phases.eyebrow": "How we work",
    "svc2.cloud.phases.title": "Four phases, in the same order every time",
    "svc2.cloud.phases.desc":
      "A fixed sequence we run for every engagement. Each phase ends with something you can see running.",
    "svc2.cloud.phases.1.title": "Audit",
    "svc2.cloud.phases.1.desc":
      "We map your repos, pipelines, cloud accounts, and bills, then write down what is actually risky and what is fine.",
    "svc2.cloud.phases.1.diagram": "Map and measure",
    "svc2.cloud.phases.2.title": "Automate",
    "svc2.cloud.phases.2.desc":
      "Terraform modules and CI/CD pipelines, built inside your cloud account and reviewed with you before anything goes live.",
    "svc2.cloud.phases.2.diagram": "Define as code",
    "svc2.cloud.phases.3.title": "Observe",
    "svc2.cloud.phases.3.desc":
      "Monitoring, alerting, backups, and runbooks — the parts that matter at 3 a.m., tested rather than just configured.",
    "svc2.cloud.phases.3.diagram": "Watch everything",
    "svc2.cloud.phases.4.title": "Hand over",
    "svc2.cloud.phases.4.desc":
      "A walkthrough with your team, documented runbooks, and a clear line: what you own from here, and what we can keep running.",
    "svc2.cloud.phases.4.diagram": "Yours to run",

    // ── Layers ────────────────────────────────────────────────────────
    "svc2.cloud.layers.eyebrow": "Reference architecture",
    "svc2.cloud.layers.title": "How the pieces fit together",
    "svc2.cloud.layers.desc":
      "A typical setup. Yours will differ in the details — every layer gets the same treatment: defined as code, observed, and documented.",
    "svc2.cloud.layers.1.name": "DNS",
    "svc2.cloud.layers.1.tool": "Cloud DNS / Route 53",
    "svc2.cloud.layers.1.desc": "Traffic routing with health-based failover.",
    "svc2.cloud.layers.2.name": "CDN",
    "svc2.cloud.layers.2.tool": "Cloud CDN / CloudFront",
    "svc2.cloud.layers.2.desc": "Static assets cached at the edge, close to users.",
    "svc2.cloud.layers.3.name": "App",
    "svc2.cloud.layers.3.tool": "Managed Kubernetes",
    "svc2.cloud.layers.3.desc": "Containers with zero-downtime rolling deploys.",
    "svc2.cloud.layers.4.name": "Data",
    "svc2.cloud.layers.4.tool": "Managed Postgres",
    "svc2.cloud.layers.4.desc": "Encrypted backups with point-in-time recovery.",
    "svc2.cloud.layers.note": "Requests travel top to bottom. A failure is contained in the layer where it starts.",

    // ── Pricing ───────────────────────────────────────────────────────
    "svc2.cloud.pricing.eyebrow": "Working together",
    "svc2.cloud.pricing.title": "Two ways to engage",
    "svc2.cloud.pricing.project.title": "Project",
    "svc2.cloud.pricing.project.desc":
      "A fixed-scope build — a migration, a pipeline setup, or a full infrastructure overhaul. Tell us what you need through the questionnaire and we will reply with an estimate.",
    "svc2.cloud.pricing.project.1": "Terraform and CI/CD from scratch",
    "svc2.cloud.pricing.project.2": "Migration with a tested rollback plan",
    "svc2.cloud.pricing.project.3": "Handover docs and a team walkthrough",
    "svc2.cloud.pricing.retainer.title": "Retainer",
    "svc2.cloud.pricing.retainer.desc":
      "Ongoing DevOps capacity. We watch the monitors, ship improvements, and carry the pager so your team doesn't have to.",
    "svc2.cloud.pricing.retainer.1": "A monthly improvement backlog",
    "svc2.cloud.pricing.retainer.2": "Alert triage and incident response",
    "svc2.cloud.pricing.retainer.3": "Cloud cost reviews every quarter",
    "svc2.cloud.pricing.cardCta": "Book a scoping call",
    "svc2.cloud.pricing.note": "Detailed pricing and terms live on the packages page.",
    "svc2.cloud.pricing.cta": "See packages",

    // ── CTA ───────────────────────────────────────────────────────────
    "svc2.cloud.cta.eyebrow": "Free infrastructure audit",
    "svc2.cloud.cta.title": "Find out where you stand, for free",
    "svc2.cloud.cta.desc":
      "A senior engineer reviews your setup and sends you a written report. You keep the report either way — no pitch deck attached.",
    "svc2.cloud.cta.listTitle": "The audit covers",
    "svc2.cloud.cta.1": "A map of your infrastructure, as we found it",
    "svc2.cloud.cta.2": "The three highest-risk points, ranked by likelihood",
    "svc2.cloud.cta.3": "Your cloud spend, with the obvious waste flagged",
    "svc2.cloud.cta.4": "A fix list ordered by effort and impact",
    "svc2.cloud.cta.5": "A clear written estimate, if you want us to do the work",
    "svc2.cloud.cta.button": "Book the free audit",
    "svc2.cloud.cta.note": "30 minutes · no commitment · the report is yours",
  },

  design: {
    // ── Hero ──────────────────────────────────────────────────────────
    "svc2.design.hero.statement": "We design interfaces that make complex products feel simple.",
    "svc2.design.hero.sub":
      "Research-led UI and UX for web and mobile — delivered as a design system your team can keep building on.",
    "svc2.design.hero.cta1": "Book a scoping call",
    "svc2.design.hero.cta2": "Email us",
    "svc2.design.hero.specimenTitle": "Type and color specimen",
    "svc2.design.hero.specimenNote": "Illustrative — every project gets its own system, not a reused template.",

    // ── Design debt ───────────────────────────────────────────────────
    "svc2.design.debt.eyebrow": "Design debt",
    "svc2.design.debt.title": "Signs your product is carrying design debt",
    "svc2.design.debt.desc":
      "Design debt behaves like technical debt: invisible until it slows everything down.",
    "svc2.design.debt.1.symptom": "Every new screen invents its own buttons.",
    "svc2.design.debt.1.note": "No component library — the same decisions get remade every week.",
    "svc2.design.debt.2.symptom": "Users ask support for things the UI should explain.",
    "svc2.design.debt.2.note": "The information hierarchy was never tested with real users.",
    "svc2.design.debt.3.symptom": "Your marketing site and your product look like different companies.",
    "svc2.design.debt.3.note": "No shared visual language between the teams building each one.",
    "svc2.design.debt.4.symptom": "Engineers guess at spacing, colors, and copy.",
    "svc2.design.debt.4.note": "Design intent lives in screenshots, not in a system anyone can follow.",

    // ── Verbs ─────────────────────────────────────────────────────────
    "svc2.design.verbs.eyebrow": "How we work",
    "svc2.design.verbs.title": "We do the work, so you get the outcome",
    "svc2.design.verbs.1.verb": "We research",
    "svc2.design.verbs.1.outcome": "so you stop guessing what users need.",
    "svc2.design.verbs.2.verb": "We prototype",
    "svc2.design.verbs.2.outcome": "so you see the product before a line of code is written.",
    "svc2.design.verbs.3.verb": "We systematize",
    "svc2.design.verbs.3.outcome": "so every screen stays consistent as you grow.",
    "svc2.design.verbs.4.verb": "We test",
    "svc2.design.verbs.4.outcome": "so launch day holds no surprises.",
    "svc2.design.verbs.5.verb": "We hand over",
    "svc2.design.verbs.5.outcome": "so your team ships without waiting on us.",

    // ── Crit loop ─────────────────────────────────────────────────────
    "svc2.design.crit.eyebrow": "Process",
    "svc2.design.crit.title": "Diverge, then converge",
    "svc2.design.crit.desc":
      "Good design comes from exploring widely before narrowing down. Every project runs through the same loop — and you are invited to the critiques.",
    "svc2.design.crit.1.title": "Diverge",
    "svc2.design.crit.1.desc": "Explore many directions: sketches, variants, references.",
    "svc2.design.crit.2.title": "Critique",
    "svc2.design.crit.2.desc": "Stress-test the work against real user goals.",
    "svc2.design.crit.3.title": "Converge",
    "svc2.design.crit.3.desc": "Narrow to one direction and refine it hard.",
    "svc2.design.crit.4.title": "Ship",
    "svc2.design.crit.4.desc": "Hand off specs your engineers can build from.",
    "svc2.design.crit.note": "Then we loop again — the first good answer is rarely the best one.",

    // ── Toolbox ───────────────────────────────────────────────────────
    "svc2.design.toolbox.title": "The toolbox",
    "svc2.design.toolbox.line": "Figma, FigJam, Framer, Maze, Notion — and whatever your team already uses.",
    "svc2.design.toolbox.note": "Tools change. The process doesn't.",

    // ── CTA ───────────────────────────────────────────────────────────
    "svc2.design.cta.title": "Tell us what you're building",
    "svc2.design.cta.sub":
      "One email is enough to start. A designer reads every message and replies within one business day.",
    "svc2.design.cta.note": "No forms. No sales funnel.",
  },

  smm: {
    // ── Hero ──────────────────────────────────────────────────────────
    "svc2.smm.hero.eyebrow": "Social media management",
    "svc2.smm.hero.title": "Content that gets your product seen",
    "svc2.smm.hero.sub":
      "We run your social presence like a newsroom — planned, consistent, and measured. So the product you built actually reaches people.",
    "svc2.smm.hero.cta1": "Book a scoping call",
    "svc2.smm.hero.cta2": "See packages",
    "svc2.smm.hero.spine.task.label": "The task",
    "svc2.smm.hero.spine.task.text": "You built something good, and nobody knows about it.",
    "svc2.smm.hero.spine.solution.label": "The solution",
    "svc2.smm.hero.spine.solution.text": "A weekly content system your team never has to think about.",
    "svc2.smm.hero.spine.result.label": "The result",
    "svc2.smm.hero.spine.result.text": "A steady, growing audience that understands what you do.",

    // ── Task ──────────────────────────────────────────────────────────
    "svc2.smm.task.eyebrow": "The brief",
    "svc2.smm.task.title": "The task, as we usually receive it",
    "svc2.smm.task.1": "Posting happens when someone remembers — weeks of silence, then three posts in a day.",
    "svc2.smm.task.2": "Each platform tells a different story. There is no single message.",
    "svc2.smm.task.3": "The content talks about the product, not the customer's problem — so engagement stays flat.",
    "svc2.smm.task.4": "Nobody knows what worked, because nobody measured it.",
    "svc2.smm.task.5": "The founder's personal account is the entire marketing department.",
    "svc2.smm.task.note": "If this sounds familiar, we already know where to start.",

    // ── Solution ──────────────────────────────────────────────────────
    "svc2.smm.solution.eyebrow": "The solution",
    "svc2.smm.solution.title": "What we deliver, on a schedule",
    "svc2.smm.solution.desc": "Every deliverable has a cadence. You always know what is coming and when.",
    "svc2.smm.solution.1.title": "Content calendar",
    "svc2.smm.solution.1.cadence": "Weekly",
    "svc2.smm.solution.1.desc": "A full week of posts planned, written, and scheduled ahead.",
    "svc2.smm.solution.2.title": "Short-form video",
    "svc2.smm.solution.2.cadence": "Weekly",
    "svc2.smm.solution.2.desc": "Reels, TikToks, and Shorts cut from your product and your expertise.",
    "svc2.smm.solution.3.title": "Ad creative and campaigns",
    "svc2.smm.solution.3.cadence": "Weekly",
    "svc2.smm.solution.3.desc": "Meta, TikTok, and LinkedIn campaigns run against one clear offer.",
    "svc2.smm.solution.4.title": "Community management",
    "svc2.smm.solution.4.cadence": "Weekly",
    "svc2.smm.solution.4.desc": "Comments and DMs answered in your voice, every day.",
    "svc2.smm.solution.5.title": "Performance report",
    "svc2.smm.solution.5.cadence": "Monthly",
    "svc2.smm.solution.5.desc": "What worked, what didn't, and what changes next month — in plain language.",
    "svc2.smm.solution.6.title": "Strategy session",
    "svc2.smm.solution.6.cadence": "Monthly",
    "svc2.smm.solution.6.desc": "A working session aligning next month's themes with your launches.",

    // ── Cycle ─────────────────────────────────────────────────────────
    "svc2.smm.cycle.eyebrow": "How we improve",
    "svc2.smm.cycle.title": "Measure, learn, adjust — every month",
    "svc2.smm.cycle.desc":
      "Growth compounds when you close the loop. Our retainers run on a monthly cycle, not a set-and-forget plan.",
    "svc2.smm.cycle.1.title": "Measure",
    "svc2.smm.cycle.1.desc": "Track reach, engagement, and conversions for every post.",
    "svc2.smm.cycle.2.title": "Learn",
    "svc2.smm.cycle.2.desc": "Find the formats and topics that actually perform.",
    "svc2.smm.cycle.3.title": "Adjust",
    "svc2.smm.cycle.3.desc": "Double down on winners, cut the rest, plan the next month.",
    "svc2.smm.cycle.note": "No vanity metrics in our reports. If a number doesn't connect to your goals, we don't report it.",

    // ── Tiers ─────────────────────────────────────────────────────────
    "svc2.smm.tiers.eyebrow": "Retainers",
    "svc2.smm.tiers.title": "Three retainer levels",
    "svc2.smm.tiers.desc": "Month-to-month, always. No long-term lock-in.",
    "svc2.smm.tiers.col.tier": "Tier",
    "svc2.smm.tiers.col.includes": "Includes",
    "svc2.smm.tiers.col.fit": "Best for",
    "svc2.smm.tiers.1.tier": "Starter",
    "svc2.smm.tiers.1.includes": "Content calendar and posting on two channels",
    "svc2.smm.tiers.1.fit": "Founders who need consistency first",
    "svc2.smm.tiers.2.tier": "Growth",
    "svc2.smm.tiers.2.includes": "Adds short-form video and community management",
    "svc2.smm.tiers.2.fit": "Teams ready to scale their reach",
    "svc2.smm.tiers.3.tier": "Scale",
    "svc2.smm.tiers.3.includes": "Adds paid campaigns and a monthly strategy session",
    "svc2.smm.tiers.3.fit": "Companies investing in growth",
    "svc2.smm.tiers.note": "See the packages page for plan details.",
    "svc2.smm.tiers.cta": "See packages",

    // ── CTA ───────────────────────────────────────────────────────────
    "svc2.smm.cta.title": "See what a month looks like",
    "svc2.smm.cta.desc":
      "We will send you a sample content calendar — one week, fully planned, for a business like yours. Free, and no call required.",
    "svc2.smm.cta.button": "Request a sample calendar",
    "svc2.smm.cta.note": "Sent within one business day.",
  },
};
