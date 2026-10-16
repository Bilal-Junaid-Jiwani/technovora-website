# Software Agency Website — Homepage Build

## Context
I'm building a homepage for a premium software development agency. 
The business offers AI, cloud, full-stack, mobile, and DevOps services 
to global clients. The two primary conversion goals are:
  1. "Book an Audit Call" — the main CTA (free 30-min strategy call)
  2. "Get a Quote" — a lead form triggered from the navbar

Target conversion rate: 15%+. Think like both a designer and a buyer.

## Brand Colors (from logo — use these as the palette foundation)
#C01F65 · #7F2179 · #2A163B · #F22929 · #F28729 · #BF216B · #73206D · #301244
Supplement with white, black, and greys as needed. The feel should be 
dark-dominant with strategic light sections for contrast and rhythm.

## Design Direction
- Clean, minimal, aesthetic — not generic SaaS purple-gradient noise
- White/black contrast sections where appropriate, with brand colors 
  as accents and gradient headings on dark backgrounds
- Gradient headings on dark bg, black/dark text on light bg
- Hover states: use border outlines or solid fills — NO gradient on hover
- Strong typographic hierarchy with deliberate font weights
- Eye-catching visuals that feel premium and brand-specific

## Homepage Sections to Include
Build all of these, in a sensible narrative order:

1. **Navbar** — floating/glassmorphism style, "Get a Quote" (opens modal 
   lead form) + "Book an Audit Call" (primary CTA) always visible
2. **Hero** — clear value prop in under 5 seconds, dual CTAs, trust signal
3. **Metrics bar** — animated counters: projects delivered, availability 
   SLA, countries served, years in business (no logos here)
4. **Services — Bento Grid** — AI & Cloud get the most visual space; 
   also include Full-Stack, Mobile, DevOps, Design. In 2026, AI and 
   cloud are the most demanded — make that clear
5. **Technology Wall** — brick-style grid with actual tech logos + names 
   (not a plain logo bar). Filterable by category
6. **Global Presence** — interactive animated globe showing client 
   locations worldwide with glowing markers and arcs
7. **Industry Solutions** — sectors we serve (FinTech, HealthTech, 
   SaaS, E-Commerce, EdTech, Logistics, etc.)
8. **AI Spotlight** — dedicated section on AI capabilities; keep it 
   broad (LLMs, agents, RAG, automation, MLOps, voice AI — not 
   just one tool like n8n)
9. **How We Work** — numbered process steps from discovery to launch
10. **Case Studies / Work** — featured result card + supporting cards
11. **Testimonials** — social proof with ratings, placed before CTAs
12. **Book an Audit Call** — dedicated high-weight CTA section with 
    what's included, trust copy, and booking embed
13. **Get a Quote Modal** — multi-step lead form (max 3 fields per step), 
    triggered from navbar and inline CTAs
14. **FAQ** — accordion, 8-10 questions
15. **Footer** — links, social, contact, and a final CTA

## Placeholder Images
I will generate and supply images separately. For now use placeholder 
divs with a note of what image goes where. Give me prompts (one per 
image needed) that I can use to generate them with an AI image tool.

## What to Figure Out Yourself
- Best section order for conversion flow
- Typography pairing and scale
- Exact layout of each section (grid, split, full-width, etc.)
- Animation and interaction approach
- Mobile responsiveness strategy
- Component architecture and file structure
- How to make this feel unlike every other agency site out there

## Constraints
- No gradient hover states anywhere
- No generic stock photo vibes
- No plain logo bar — tech wall with bricks only
- AI section must cover the full modern AI stack, not narrow tooling
- Every CTA section must include a trust signal nearby
- "Book an Audit Call" should appear at least 5 times across the page

You are a senior product designer and frontend engineer building a 
premium software development agency website with a target conversion 
rate of 15%+. This is not a template job — every decision must be 
intentional, brand-specific, and conversion-optimized.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRAND IDENTITY & DESIGN PHILOSOPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Agency: [YOUR AGENCY NAME]
Positioning: Premium software development & AI/cloud transformation 
partner for global enterprises and growth-stage startups.

Design Aesthetic: 
- Dark-dominant with strategic light sections for rhythm and contrast
- Minimal but impactful — every element earns its space
- Editorial-grade typography with bold gradient headings
- Refined luxury meets technical precision
- NOT another purple-gradient generic SaaS site

Brand Personality: Confident. Expert. Global. Forward-thinking.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COLOR PALETTE (STRICTLY USE THESE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Primary Brand Colors (from logo):
  --magenta-primary:   #C01F65   ← dominant accent
  --magenta-deep:      #BF216B   ← hover states, borders
  --purple-primary:    #7F2179   ← secondary accent
  --purple-deep:       #73206D   ← gradient partner
  --purple-darkest:    #2A163B   ← section backgrounds
  --purple-midnight:   #301244   ← dark card backgrounds
  --red-accent:        #F22929   ← alerts, urgency CTAs
  --orange-accent:     #F28729   ← warmth, highlights

Neutrals:
  --white:             #FFFFFF
  --off-white:         #F5F5F7   ← Apple-inspired light sections
  --grey-light:        #D1D1D6
  --grey-mid:          #8E8E93
  --grey-dark:         #3A3A3C
  --black-rich:        #0A0A0F   ← main dark background
  --black-card:        #12121A   ← card surfaces

Usage Rules:
- Dark sections (#0A0A0F base): Use WHITE body text, 
  GRADIENT headings (magenta → purple or orange → magenta)
- Light sections (#F5F5F7 base): Use #0A0A0F or #3A3A3C text
- NEVER use gradient on hover — use border outline or 
  solid color fills instead
- Primary CTA button: solid #C01F65 with white text, 
  border: 2px solid #C01F65 on hover (no fill)
- Secondary CTA: transparent + 2px border #C01F65, 
  fill on hover
- Gradient text formula: linear-gradient(135deg, #C01F65, #7F2179)
  or linear-gradient(135deg, #F28729, #C01F65)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TYPOGRAPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Display / Headings: "Clash Display" or "Syne" (Google Fonts)
  — bold, geometric, strong personality
Body: "DM Sans" or "Instrument Sans" 
  — clean, readable, modern
Monospace (for tech labels/code snippets): "JetBrains Mono"

Font Weight Scale:
  - Hero headlines: 700–800, letter-spacing: -0.03em
  - Section titles: 600–700
  - Subheadings: 500
  - Body: 400
  - Labels/tags: 500, uppercase, letter-spacing: 0.08em
  - Never use default system fonts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK FOR IMPLEMENTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Framework: Next.js 14+ (App Router) with TypeScript
- Styling: Tailwind CSS + CSS custom properties for brand tokens
- Animation: Framer Motion for scroll triggers, entrances, hover
- 3D Globe: react-globe.gl or Three.js for interactive globe
- Icons: Lucide React + custom SVGs for tech logos
- Fonts: Google Fonts (Syne + DM Sans + JetBrains Mono)
- Forms: React Hook Form + Zod validation
- Email: Resend or EmailJS for lead form submissions
- Deployment-ready: Vercel

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NAVIGATION (NAVBAR)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Design: Floating glassmorphism navbar on dark bg
  — backdrop-filter: blur(20px)
  — border-bottom: 1px solid rgba(192, 31, 101, 0.15)
  — Subtle magenta glow on scroll

Left: Logo (SVG, full color)
Center: Navigation links
  → Services (mega-dropdown with categories)
  → Solutions (by industry)
  → Technologies
  → Work / Case Studies
  → About
  → Blog

Right (2 CTAs — both always visible):
  → "Get a Quote" — outlined button (#C01F65 border), 
    opens a modal lead form (multi-step, 3 fields max per step)
  → "Book an Audit Call" — solid #C01F65 button (PRIMARY CTA)
    links to Calendly or booking page

Behavior:
  - Transparent on hero, solid dark on scroll
  - Mobile: hamburger with full-screen overlay menu
  - Active link: magenta underline indicator
  - Mega-dropdown for Services: grid layout with icons

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOMEPAGE SECTIONS (IN ORDER)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

── 1. HERO SECTION ──────────────────────
Background: Deep dark (#0A0A0F) with animated 
  noise texture + subtle magenta particle field or mesh gradient
  in bottom-right corner

Layout: Split — 60% text left, 40% visual right

Left content:
  - Small tag: "AI · Cloud · Software Development" 
    (monospace, #C01F65, border pill)
  - Headline (H1, gradient text, 64–80px):
    "We Build Software That Scales Your World"
  - Subheading (white, 18–20px, weight 400, max 60 chars/line):
    "From intelligent AI systems to enterprise cloud 
    infrastructure — we engineer digital products that 
    drive measurable growth for ambitious companies."
  - CTA Row:
    → Primary: "Book an Audit Call" (#C01F65 solid)
    → Secondary: "See Our Work" (outlined, white)
  - Trust signal below CTAs: 
    "Trusted by 120+ companies across 18 countries"
    + 5 small anonymous client logo silhouettes

Right visual: 
  → AI-generated hero image (prompt below in IMAGE PROMPTS)
  → OR an animated isometric 3D scene showing connected nodes, 
    code, cloud infrastructure (Three.js or Lottie)
  → Floating card overlays showing: 
    "99.9% Uptime SLA" | "48hr Sprint Start" | "ISO 27001"

Animation: Staggered fade-up entrance, 
  hero visual floats gently (CSS transform loop)

── 2. TRUST METRICS BAR ─────────────────
Full-width dark band (#12121A), 1px border top/bottom 
(rgba magenta 0.2)

4 animated counter metrics (count up on scroll):
  → 120+ Projects Delivered
  → 99.9% Availability SLA
  → 18 Countries Served
  → 8+ Years of Excellence

Style: Large number (Syne, 48px, white) + 
label (DM Sans, 14px, grey-mid, uppercase)
Dividers: 1px vertical #2A163B between metrics
No logos here — pure authority through numbers

── 3. SERVICES — BENTO GRID ─────────────
Section title (gradient): "What We Build"
Subtitle: "End-to-end software engineering across 
every layer of the modern tech stack"

Bento grid layout (CSS Grid, asymmetric):
  LARGE CARD (col-span-2, row-span-2): 
  → AI & Automation
    - Subtext: "LLM integration, AI agents, intelligent 
      workflow automation, RAG pipelines, computer vision, 
      and custom ML model deployment"
    - Technologies: OpenAI, Claude, Gemini, LangChain, 
      n8n, CrewAI, Hugging Face, Pinecone, Weaviate
    - Visual: Animated neural network or flowing data stream
    - Background: Deep purple (#2A163B) with magenta glow

  LARGE CARD (col-span-2):
  → Cloud & Infrastructure
    - Subtext: "AWS, GCP, Azure architecture, Kubernetes, 
      Terraform, CI/CD pipelines, serverless, edge computing, 
      FinOps optimization"
    - Visual: Isometric cloud diagram animation
    - Background: Dark with subtle grid pattern

  MEDIUM CARD:
  → Full-Stack Development
    - React, Next.js, Node.js, Python, Go, databases
    
  MEDIUM CARD:
  → Mobile Development
    - React Native, Flutter, iOS, Android
    
  SMALL CARD:
  → DevOps & MLOps
  
  SMALL CARD:
  → UI/UX & Product Design

Card design rules:
  - Background: #12121A or #1A1A2E
  - Border: 1px solid rgba(192,31,101,0.15)
  - On hover: border becomes rgba(192,31,101,0.6), 
    subtle inner glow, NO gradient fill
  - Each card: icon (custom SVG), title, 2-line description, 
    tech tags (pill badges)

── 4. TECHNOLOGY WALL ───────────────────
Section: "Technologies We Master"
Background: #0A0A0F (dark, alternating from previous)

Layout: Brick/masonry grid of technology tiles
Each brick: Logo (actual SVG) + Technology Name
  — NOT just a logo bar — actual styled bricks

Categories shown as filter tabs:
  → All | AI/ML | Cloud | Frontend | Backend | Mobile | DevOps

Tech bricks (examples):
  AI/ML: OpenAI, Claude, Gemini, LangChain, n8n, 
    Hugging Face, TensorFlow, PyTorch, Pinecone
  Cloud: AWS, GCP, Azure, Terraform, Kubernetes, Docker
  Frontend: React, Next.js, Vue, TypeScript, Tailwind
  Backend: Node.js, Python, Go, Rust, PostgreSQL, Redis
  Mobile: React Native, Flutter
  DevOps: GitHub Actions, Jenkins, Datadog, Grafana

Brick style: 
  - Background: #12121A
  - Border: 1px solid #2A163B
  - Padding: 16px 20px
  - Logo: 28px, colored SVG
  - Name: 13px, DM Sans, #D1D1D6
  - Hover: border #C01F65, logo brightens, name turns white

── 5. GLOBAL PRESENCE — INTERACTIVE GLOBE ──
Section title: "Built Here. Deployed Everywhere."
Background: Full dark section, split layout

Left (40%): 
  - Large headline + description of global reach
  - Key regions listed: North America, Europe, 
    Middle East, Southeast Asia, Australia
  - Stat: "Serving clients across 18 countries"

Right (60%):
  - Interactive 3D globe (react-globe.gl or Three.js)
  - Dark oceanic globe (#0A0A0F ocean, #1A1A2E land)
  - Glowing magenta/purple dots on client locations
  - Animated arcs connecting dots (pulsing)
  - Auto-rotate slowly, pause on hover
  - On dot hover: tooltip showing region + project count

Globe config:
  - atmosphereColor: #C01F65 with low opacity
  - arcColor: #BF216B
  - pointColor: #F22929
  - labelColor: #FFFFFF

── 6. INDUSTRY SOLUTIONS ────────────────
Section title (gradient): "Industries We Transform"
Subtitle: "Deep domain expertise across sectors 
that demand performance"

Background: Off-white (#F5F5F7) — deliberate 
light contrast section for visual rhythm

Layout: Horizontal scrolling cards OR 3x3 grid

Industries (with icon + 2-line descriptor):
  → FinTech & Banking
  → HealthTech & MedTech  
  → E-Commerce & Retail
  → EdTech & Learning Platforms
  → SaaS & B2B Products
  → Logistics & Supply Chain
  → Real Estate & PropTech
  → Media & Entertainment
  → Government & Public Sector

Card style (light section):
  - Background: white
  - Border: 1px solid #E5E5EA
  - Icon: gradient colored (#C01F65→#7F2179)
  - Title: #0A0A0F, Syne 600
  - Description: #3A3A3C, DM Sans 400
  - Hover: border #C01F65, subtle box-shadow

── 7. AI SPOTLIGHT — DEDICATED FEATURE ──
Full-width dark section (alternating back to dark)
Background: #0A0A0F with animated mesh/noise

Headline (large, gradient): 
"The Future Runs on AI. We Build It."

Two-column layout:
  Left: 
  - Feature list with animated check reveals:
    → Custom LLM Applications & Chatbots
    → AI Agents & Multi-Agent Systems  
    → RAG & Knowledge Base Systems
    → Workflow Automation (n8n, Make, Zapier)
    → Computer Vision & Document Intelligence
    → AI-Powered Analytics & Predictions
    → Voice AI & Conversational Interfaces
    → MLOps & Model Deployment at Scale
  - CTA: "Explore AI Services →"

  Right:
  - AI-generated visual (see IMAGE PROMPTS)
  - OR: Terminal-style animated code block showing 
    an AI agent in action (typewriter effect)
  - Floating metric cards: 
    "10x faster development" | "3x cost reduction"

── 8. HOW WE WORK — PROCESS ─────────────
Section: "Our Proven Process"
Background: #12121A (slightly lighter dark)

Timeline/numbered steps (horizontal on desktop, 
vertical on mobile):

  01 → Discovery & Audit (Free)
       "30-min call to understand your goals, 
       tech stack, and challenges"
  
  02 → Strategy & Architecture
       "We design the system blueprint, 
       tech stack selection, timeline, and cost"
  
  03 → Sprint-Based Development
       "Agile 2-week sprints with daily updates, 
       demos, and full transparency"
  
  04 → QA, Testing & Hardening
       "Automated testing, security audits, 
       performance optimization"
  
  05 → Launch & Handover
       "Deployment, documentation, team training, 
       and optional ongoing support"

Each step: Number (large, gradient), title, 
description, icon. Connecting line between steps 
with magenta accent.

Bottom CTA: "Start With a Free Audit Call" 
(#C01F65 solid button, centered)

── 9. CASE STUDIES / WORK ───────────────
Section: "Results We've Delivered"
Background: Dark

Layout: Featured case study (full-width hero card) + 
3 smaller cards below

Featured card:
  - Industry tag (pill)
  - Client description (anonymous if needed)
  - Problem → Solution → Result format
  - Key metric (large, gradient): "340% increase in processing speed"
  - Tech stack tags
  - "Read Case Study →" link

Small cards: Same structure, condensed

If no case studies ready: Use placeholder structure 
with "Coming Soon" + request form for early access

── 10. TESTIMONIALS / SOCIAL PROOF ──────
Background: Off-white (#F5F5F7) — second light section

Layout: 3-column card grid OR horizontal scroll

Each testimonial card:
  - Quote (DM Sans italic, #3A3A3C)
  - Name, title, company (with logo if permitted)
  - Star rating (5 stars, #F28729 color)
  - Industry tag

Bottom: Ratings badges row:
  "4.9/5 on Clutch" | "Top Agency on GoodFirms" | 
  "Google 5-star" (real or aspirational placeholders)

── 11. LEAD FORM — GET A QUOTE MODAL ────
Triggered by: Navbar "Get a Quote" button + 
  inline CTAs throughout page

Multi-step modal (3 steps, progress bar):
  
  Step 1 — About You:
  → Full Name
  → Company Name  
  → Work Email
  → Country (dropdown)

  Step 2 — Your Project:
  → Service needed (multi-select: AI, Cloud, 
    Mobile, Web, DevOps, Other)
  → Project timeline (dropdown: ASAP, 1-3 months, 
    3-6 months, Exploring)
  → Budget range (dropdown: <$10K, $10-50K, 
    $50-200K, $200K+, Not sure)

  Step 3 — Details:
  → Brief project description (textarea, max 500 chars)
  → How did you hear about us? (dropdown)
  → Submit button: "Request My Quote →"

Design: Dark modal (#12121A), magenta progress bar, 
white inputs with magenta focus border. 
Confirmation: Thank you screen with calendar embed 
or booking link.

── 12. BOOK AN AUDIT CALL — CTA SECTION ─
Full-width section, alternating background
(dark or off-white — whichever creates contrast)

This is the PRIMARY conversion section.
Design it with the most visual weight on the page.

Content:
  - Pre-headline: "FREE 30-MINUTE AUDIT" 
    (pill badge, #C01F65)
  - Headline (large, gradient or white on dark):
    "Discover What's Holding Your Software Back"
  - Subtext: "Our senior engineers will review your 
    current architecture, identify bottlenecks, and 
    give you a concrete roadmap — at no cost."
  - What you get (icon list):
    ✓ Architecture review & recommendations
    ✓ Technology stack assessment  
    ✓ AI/Cloud opportunity identification
    ✓ Custom project roadmap
    ✓ Honest pricing estimate
  - CTA: "Book Your Free Audit Call" 
    (large, #C01F65, centered or split-layout)
  - Trust text: "No sales pitch. No obligation. 
    100% confidential."
  - Calendly widget embed OR redirect to booking page

── 13. FAQ SECTION ──────────────────────
Background: Dark (#0A0A0F)

Accordion-style FAQ, 8-10 questions:
  → What industries do you specialize in?
  → How long does a typical project take?
  → Do you work with startups or only enterprises?
  → What is your pricing model?
  → How do you handle IP and confidentiality?
  → Can you take over an existing codebase?
  → Do you provide post-launch support?
  → What makes you different from other agencies?
  → Do you offer AI/automation consulting separately?

Style: Clean accordion, magenta chevron, 
smooth expand animation

── 14. FOOTER ───────────────────────────
Background: #0A0A0F, top border: 1px solid #2A163B

4-column layout:
  Col 1: Logo + tagline + social icons 
    (LinkedIn, GitHub, Twitter/X)
  Col 2: Services links
  Col 3: Company links (About, Blog, Careers, Contact)
  Col 4: Contact info + "Book a Call" CTA (small)

Bottom bar: 
  "© 2026 [Agency Name]. All rights reserved." 
  | Privacy Policy | Terms of Service

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANIMATIONS & INTERACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Scroll-triggered fade-up for all sections 
  (Framer Motion, threshold 0.15)
- Staggered children animations in grids 
  (delay: index * 0.08s)
- Counter animations in metrics bar 
  (count up from 0 when in view)
- Bento grid cards: hover lift (translateY: -4px) 
  + border glow — no gradient fills
- Technology bricks: hover scale(1.03) + border color
- Globe: auto-rotate + arc pulse animation
- Navbar: smooth background transition on scroll
- Modal: backdrop blur entrance, slide-up card
- CTA buttons: NO gradient hover — use border 
  outline toggle or solid → ghost swap
- Cursor: custom dot cursor (magenta) on desktop
- Page scroll: smooth CSS scroll-behavior

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMAGE PROMPTS (Generate with Nano/Midjourney/Flux)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[HERO IMAGE]
"Ultra-realistic digital abstract scene, isometric 
software development studio floating in dark space, 
glowing magenta and deep purple light sources, 
connected node networks, holographic code streams, 
cloud data cubes, AI neural patterns, cinematic 
lighting, 8K, dark background #0A0A0F, no people, 
futuristic but clean"

[AI SECTION IMAGE]
"Abstract AI brain made of glowing interconnected 
nodes and data pathways, magenta (#C01F65) and 
purple (#7F2179) color palette on pure black 
background, flowing energy streams, neural network 
visualization, ultra-detailed, cinematic, 
photorealistic rendering style"

[CLOUD SECTION IMAGE]
"Isometric cloud infrastructure visualization, 
floating server nodes connected by glowing magenta 
data streams, dark space background, deep purple 
and crimson accent colors, 3D render, ultra-clean, 
no text, professional tech aesthetic"

[CASE STUDY / WORK IMAGE]
"Abstract digital dashboard visualization, 
dark mode UI with glowing charts, graphs and 
analytics, magenta and purple gradient highlights, 
ultra-realistic screen mockups, premium software 
product aesthetic, dark background"

[TEAM / ABOUT IMAGE — optional]
"Diverse group of software engineers collaborating 
in a modern dark-themed office, ambient magenta and 
purple LED lighting, code on multiple screens, 
cinematic photography style, shallow depth of field, 
professional and premium"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONVERSION OPTIMIZATION RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. "Book an Audit Call" CTA appears in: Navbar, 
   Hero, After Process section, Dedicated CTA 
   section, Footer — minimum 5 touchpoints
2. "Get a Quote" modal accessible from Navbar 
   and inline text CTAs
3. Hero answers in 5 seconds: WHO you help, WHAT 
   you do, WHY trust you, WHAT to do next
4. Social proof (metrics, testimonials, badges) 
   placed BEFORE any CTA section
5. Mobile-first: all CTAs thumb-reachable, 
   forms 3 fields max per step
6. Page load: optimize all images (WebP), 
   lazy load below fold, target <2s LCP
7. Exit intent: popup offering "Download our 
   AI/Cloud Services Guide" (email capture)
8. Sticky mobile CTA bar at bottom: 
   "Book Free Call" button always visible
9. Trust signals near every form: 
   "100% confidential · No spam · Reply in 24hrs"
10. Clear value-before-ask: show expertise 
    (services, tech, industries) before any 
    form appears

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT NOT TO DO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✗ No gradient on hover states — use border/outline
✗ No generic stock photos of people at laptops
✗ No plain logo bar — use tech brick wall instead  
✗ No purple-on-white generic SaaS look
✗ No Inter or Roboto fonts
✗ No more than 2 fonts total
✗ No cluttered layouts — generous whitespace
✗ No AI focus on n8n alone — cover full AI stack
✗ No long forms — max 3 visible fields at a time
✗ No passive footer CTAs — make them compelling

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPLEMENTATION NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Build each section as its own component
- Use CSS custom properties for ALL brand tokens
- All sections responsive: mobile (375px), 
  tablet (768px), desktop (1280px+)
- Add section IDs for anchor navigation
- Include meta tags for SEO (title, description, OG)
- Implement schema markup for LocalBusiness
- Add Google Analytics 4 event tracking on 
  all CTAs and form steps
- Sitemap.xml and robots.txt included
- All images have descriptive alt text
- ARIA labels on all interactive elements
- Test Core Web Vitals: LCP <2.5s, CLS <0.1, 
  FID <100ms