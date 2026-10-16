# Technovora Website — Project Intelligence

> Stack: Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui v4
> Last updated: 2026-04-23
> Owner: Moin (Evernice) | GitHub: github.com/Technovora/technovora-website

Read this before touching anything. Every decision here was deliberate.

## Agent Rules (Claude — Read Every Session)

- **Read this file first** before any architectural or implementation decision.
- **Current date is April 2026.** Knowledge cutoff is August 2025. For anything version-specific, library-specific, or security-related — run a web search. Don't guess from training data.
- **Branch naming:** `feat/*`, `fix/*`, `chore/*` — never `feature/*`.
- **Flow:** `feat/x` → PR → `dev` → PR → `main`. Never commit directly to `dev` or `main`.
- **When stuck:** web search first, then decide. Don't assume docs are current.

---

## 1. What This Project Is

B2B tech agency website for Technovora. Target audience: SaaS founders and CTOs at 10–50 person companies. Primary goal: book discovery calls. Secondary goal: rank for B2B tech agency keywords.

This site is also our portfolio proof — it must be built the way we build client work.

**Live domain:** technovora.com
**Offices:** Sheridan, WY (US) + Hong Kong

---

## 2. Tech Stack — Pinned Versions

| Package | Version | Notes |
|---|---|---|
| next | 16.2.x LTS | App Router only. No Pages Router. |
| react | 19.x | Required by Next 16 |
| typescript | 5.x strict | No `any`. No exceptions. |
| tailwindcss | 4.1.x | CSS-first config. No `tailwind.config.js`. |
| shadcn | 4.x CLI | Components copied into `components/ui/`. Do not modify originals. |
| framer-motion | latest stable | Animations. Dynamic import for heavy scenes. |
| @react-three/fiber | latest stable | 3D. Always dynamic import with `ssr: false`. |
| @react-three/drei | latest stable | 3D helpers. Same dynamic import rule. |
| cobe | latest stable | Globe component. Dynamic import. |
| next/font | built-in | Bricolage Grotesque + DM Sans + JetBrains Mono. |
| zod | 3.x | All form and API input validation. |
| react-hook-form | 7.x | Forms. Always pair with zod resolver. |
| keystatic | latest stable | CMS for blog and portfolio. |

### Dependency Rules

- Run `npm audit` before every PR merge. Fail PR on high/critical severity.
- Commit `package-lock.json`. Never delete it.
- Use `npm ci` in CI, not `npm install`.
- Prefer packages with provenance signatures (`npm info <pkg> dist.integrity`).
- Zero tolerance for packages with <1000 weekly downloads unless first-party.
- Before adding any new package: check last publish date, maintainer count, open CVEs on socket.dev.
- Pin exact versions for security-sensitive packages (`"next": "16.2.4"` not `"^16.2.4"`).

---

## 3. Git Workflow

### Branch Structure

```
main        ← production only. Protected. Never commit directly.
dev         ← staging. All work lands here first via PR.
feat/*      ← new features. Branch from dev.
fix/*       ← bug fixes. Branch from dev.
chore/*     ← deps, config, non-code changes. Branch from dev.
```

### Flow

```
feat/my-feature → PR → dev → PR → main
```

### Commit Convention (Conventional Commits)

```
feat: add hero section animation
fix: correct mobile nav z-index
chore: bump framer-motion to 11.3.1
docs: update CLAUDE.md with CMS instructions
refactor: extract gradient text into shared component
perf: lazy-load Three.js globe section
```

- Subject line: 72 chars max. Imperative mood. No period.
- Body: explain WHY, not what. The diff shows what.
- Breaking changes: add `BREAKING CHANGE:` footer.

### PR Rules

- Every PR needs a description: what changed, why, how to test.
- Feature PRs must include: screenshot or video for UI changes.
- No self-merging to `main`. Review required.
- PRs to `dev`: can self-merge after passing CI.
- CI checks: TypeScript, ESLint, `npm audit`, Lighthouse CI (score ≥ 90).

---

## 4. Project Structure

```
technovora-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — fonts, metadata, providers
│   ├── page.tsx                  # Homepage
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx              # Services overview
│   │   ├── ai-automation/
│   │   │   ├── page.tsx
│   │   │   ├── n8n-workflows/page.tsx
│   │   │   ├── ai-agents/page.tsx
│   │   │   └── api-integrations/page.tsx
│   │   ├── web-development/
│   │   │   ├── page.tsx
│   │   │   ├── nextjs-platforms/page.tsx
│   │   │   └── saas-development/page.tsx
│   │   ├── mobile-apps/page.tsx
│   │   ├── cloud-devops/page.tsx
│   │   ├── design/page.tsx
│   │   └── smm/page.tsx
│   ├── portfolio/page.tsx
│   ├── packages/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts                # Auto-generated XML sitemap
│   ├── robots.ts                 # robots.txt
│   └── opengraph-image.tsx       # Default OG image
│
├── components/
│   ├── ui/                       # shadcn components — do not edit directly
│   ├── layout/                   # Nav, Footer, PageWrapper
│   ├── sections/                 # Homepage sections (one file per section)
│   │   ├── HeroSection.tsx
│   │   ├── LogoBar.tsx
│   │   ├── ServiceCards.tsx
│   │   ├── FeaturedPackage.tsx
│   │   ├── ProcessSnake.tsx
│   │   ├── Testimonials.tsx
│   │   ├── TechWall.tsx
│   │   ├── FeaturedBlog.tsx
│   │   ├── GlobeSection.tsx
│   │   └── CtaBanner.tsx
│   ├── shared/                   # Reused across pages
│   │   ├── GradientText.tsx
│   │   ├── GradientButton.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ServiceCard.tsx
│   │   └── LeadFormButton.tsx
│   ├── three/                    # All Three.js — always dynamic imported
│   │   ├── GlobeCobe.tsx
│   │   └── HeroSphere.tsx
│   └── animations/               # Framer Motion wrappers
│       ├── FadeIn.tsx
│       ├── StaggerChildren.tsx
│       └── CountUp.tsx
│
├── lib/
│   ├── constants.ts              # Site name, URLs, contact info, nav links
│   ├── metadata.ts               # Shared metadata helpers
│   ├── validations.ts            # Zod schemas for all forms
│   └── utils.ts                  # cn() and other utils
│
├── content/
│   ├── blog/                     # MDX blog posts
│   └── portfolio/                # Portfolio case study MDX
│
├── types/
│   └── index.ts                  # All TypeScript interfaces
│
├── public/
│   ├── fonts/                    # Self-hosted fallback fonts only
│   ├── images/                   # Static images (WebP only)
│   └── icons/                    # SVG icons
│
├── styles/
│   └── globals.css               # Tailwind imports + CSS variables
│
├── keystatic.config.ts           # CMS config
├── next.config.ts                # Next.js config with security headers
├── tsconfig.json                 # Strict mode
└── CLAUDE.md                     # This file
```

---

## 5. Design System

### Colors (CSS variables in `styles/globals.css`)

```css
:root {
  --bg-base:       #08050F;
  --bg-surface:    #0E0A1A;
  --bg-elevated:   #160F26;
  --bg-border:     #241C3A;

  --orange:        #F97316;
  --magenta:       #E91E8C;
  --purple:        #7C3AED;
  --gradient:      linear-gradient(135deg, #F97316 0%, #E91E8C 50%, #7C3AED 100%);
  --gradient-glow: #E91E8C1A;

  --cta:           #F97316;
  --link:          #E91E8C;

  --text:          #F5F0FF;
  --text-muted:    #A594C4;
  --text-faint:    #4D3D6B;
}
```

### Gradient Usage Rule

Brand gradient appears on: H1 accent words, CTA buttons, card hover borders, loading screen, 1px section dividers.

**Maximum one gradient heading element per viewport height.** More = visual noise, not premium.

### Typography

```
Display (H1–H2):  Bricolage Grotesque — variable, 700–800 weight for impact
Body (H3–body):   DM Sans — 400/500/600
Mono:             JetBrains Mono — code callouts, terminal effects, stats
```

### Type Scale

```
text-xs:   12px   tags, captions
text-sm:   14px   meta, timestamps
text-base: 16px   body
text-lg:   18px   lead paragraphs
text-xl:   24px   card titles
text-2xl:  32px   H3
text-3xl:  40px   H2
text-4xl:  56px   H1 sub
text-5xl:  72px   H1 hero
text-6xl:  96px   mega hero (large screens only)
```

### Spacing

Use Tailwind spacing scale. No magic pixel values in className. If a value isn't in the scale, add it as a CSS variable.

---

## 6. Coding Standards

These are non-negotiable. Every PR reviewed against these.

### TypeScript

```ts
// BAD — never do this
const data: any = fetchSomething()
function handler(req: any, res: any) {}

// GOOD
interface ContactFormData {
  name: string
  email: string
  message: string
}
async function handleContact(data: ContactFormData): Promise<{ success: boolean }>
```

- `strict: true` in tsconfig. Stays that way.
- No `as unknown as X` casts without a comment explaining why.
- Props interfaces defined above the component, not inline.
- Export types from `types/index.ts`, not scattered across files.

### Components

```tsx
// BAD — client component at page level for a simple interaction
'use client'
export default function ServicesPage() { ... }

// GOOD — push 'use client' down to the leaf that needs it
export default function ServicesPage() {
  return (
    <main>
      <ServiceHero />        {/* Server Component */}
      <ServiceCards />       {/* Server Component */}
      <InteractiveFilter />  {/* Client Component — only this one needs it */}
    </main>
  )
}
```

- Server Components by default.
- `use client` only on components that need browser APIs, state, or event handlers.
- Never `use client` on a page-level component unless the entire page is interactive.
- No inline styles. Tailwind classes only. Custom values go in `globals.css`.
- No hardcoded strings in JSX. Content from `lib/constants.ts` or CMS.

### Three.js / Heavy Components

```tsx
// Always dynamic import — Three.js is 500KB+
const HeroSphere = dynamic(() => import('@/components/three/HeroSphere'), {
  ssr: false,
  loading: () => <div className="aspect-square animate-pulse bg-bg-elevated rounded-full" />,
})
```

### Forms

```tsx
// Always: react-hook-form + zod. Never raw form state.
const schema = z.object({
  email: z.string().email('Invalid email'),
  message: z.string().min(20, 'Message too short'),
})

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
})
```

### Server Actions (preferred over API routes for forms)

```ts
'use server'
import { z } from 'zod'

const contactSchema = z.object({ ... })

export async function submitContact(formData: FormData) {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.flatten() }
  // process...
}
```

Use API route handlers (`app/api/`) only for: external webhooks, third-party callbacks, endpoints consumed by non-Next.js clients.

### Error Handling

- Every async Server Component wrapped in error boundary.
- Every `fetch()` call handles network errors explicitly — no silent failures.
- Form errors shown inline, not in alerts or toasts for field-level errors.
- 404 page: `app/not-found.tsx`. 500 page: `app/error.tsx`.

---

## 7. Security

### HTTP Headers (`next.config.ts`)

```ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]
```

### Contact Form / API Routes

- Rate limit all API routes. Use `next-rate-limit` or Upstash Redis.
- Validate all input with Zod before processing. No exceptions.
- Never log user-submitted data to console in production.
- Honeypot field on contact form to catch bots.

### Environment Variables

- Never commit `.env` or `.env.local`.
- Prefix client-side vars with `NEXT_PUBLIC_` only when truly needed on client.
- All secrets stay server-side only.
- Document every required env var in `.env.example` with placeholder values.

### Dependencies

- Run `npx socket scan` before merging any new dependency.
- Check `npm audit` — zero high or critical severity allowed in PRs.
- Lock file (`package-lock.json`) committed and reviewed in every dep-change PR.

---

## 8. SEO

### Required on Every Page

```tsx
// app/services/ai-automation/page.tsx
export const metadata: Metadata = {
  title: 'AI Automation for SaaS Teams | Technovora',
  description: '...under 160 chars, specific, no buzzwords...',
  openGraph: {
    title: '...',
    description: '...',
    images: [{ url: '/og/ai-automation.png', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://technovora.com/services/ai-automation' },
}
```

### Sitemap

`app/sitemap.ts` — auto-generated. Add every new static route. Dynamic routes (blog posts) read from Keystatic at build time.

### Structured Data

Homepage: `Organization` schema.
Service pages: `Service` schema.
Blog posts: `Article` schema.
Contact page: `ContactPage` schema.

Add as `<script type="application/ld+json">` in each page's `<head>`.

### Images

- All images via `next/image`. No `<img>` tags.
- Always set `width`, `height`, and `alt`.
- Hero images: `priority` prop.
- Below-fold images: default lazy loading.
- Format: WebP. Source files go in `public/images/`.

### URL Structure

- Lowercase, hyphen-separated slugs only.
- No trailing slashes (configured in `next.config.ts`).
- Every page has unique title and description — no duplicates.

---

## 9. Performance

### Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| LCP | < 1.2s |
| CLS | < 0.05 |
| INP | < 100ms |
| Bundle size (initial JS) | < 150KB gzipped |

### Rules

- `next/image` for every image. No exceptions.
- `next/font` for every font. No exceptions.
- Three.js, Framer Motion heavy scenes: dynamic import only.
- `@next/bundle-analyzer` run on every PR that adds a dependency.
- No `useEffect` data fetching — use Server Components or React Query.
- Minimize `use client` surface area — each client component adds to initial JS.

---

## 10. Content Writing Rules

These apply to ALL copy on the site — headings, body text, CTAs, meta descriptions.

### Words Never Used

```
leverage, elevate, cutting-edge, game-changer, innovative, transformative,
revolutionize, seamlessly, robust, scalable (as filler), empower, streamline,
next-level, world-class, state-of-the-art, holistic, synergy, ecosystem (as fluff)
```

### Punctuation Rules

- No em dashes (—) in body copy or headings.
- No double underscores (__text__).
- No decorative dashes or dividers in copy.
- Hyphens (-) only in compound adjectives where grammatically required.

### Tone

- Direct. Confident. Specific.
- Claims backed by numbers where possible: "cut deploy time from 4 hours to 11 minutes" not "dramatically faster deployments."
- Write to the CTO or Founder, not to "businesses."
- Short sentences. No sentence should require re-reading.
- British/American neutral — no region-specific slang.

### Formula to Avoid

Do not write: "We help [companies] [verb] their [noun] to [outcome]."
That pattern is used on 10,000 agency sites. Find the specific, honest version.

### SEO Copy

- Primary keyword in H1, first 100 words, meta title, meta description.
- Supporting keywords in H2s and body naturally — not stuffed.
- Every page targets one primary keyword. Document it in a comment above `metadata`.

---

## 11. CMS — Keystatic

Blog posts and portfolio entries managed via Keystatic.
Admin panel at `/keystatic` (localhost only in dev, password-protected in prod).

Content stored as MDX files in `content/` — committed to Git.
No database required for content.

### Blog Post Frontmatter

```yaml
---
title: string
description: string (under 160 chars)
publishedAt: YYYY-MM-DD
category: string
tags: string[]
author: string
coverImage: string (path to /public/images/)
seoKeyword: string (primary target keyword)
---
```

### Portfolio Entry Frontmatter

```yaml
---
client: string
service: string
headline: string (result achieved — specific number)
description: string
tags: string[]
coverImage: string
publishedAt: YYYY-MM-DD
featured: boolean
---
```

---

## 12. Animation Philosophy

Animations serve the user, not the designer.

- **Entrance animations:** max 400ms. Stagger max 80ms between items.
- **Hover animations:** max 200ms. Subtle — don't fight the click.
- **Page transitions:** max 300ms. Nobody waits 600ms for a page to appear.
- **Three.js scenes:** must have a non-JS fallback (CSS gradient or static image).
- **Respect `prefers-reduced-motion`:** wrap all Framer Motion variants in this check.

```tsx
const shouldReduceMotion = useReducedMotion()

const variants = {
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
  visible: { opacity: 1, y: 0 },
}
```

---

## 13. Environment Variables

Document all required vars. Store actual values in `.env.local` (gitignored).

```bash
# .env.example — commit this file, not .env.local

# Contact form
CONTACT_FORM_EMAIL=           # Email to receive form submissions
RESEND_API_KEY=               # Resend.com API key for transactional email

# Rate limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Keystatic (production auth)
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
```

---

## 14. Decisions Made — Don't Revisit Without Reason

1. **App Router only.** Pages Router is deprecated path. No mixing.
2. **Keystatic over Sanity.** Zero cost, content in Git, no external dependency.
3. **Server Actions over API routes** for all internal form handling.
4. **DM Sans over Inter.** More personality, equally readable, less generic.
5. **Bricolage Grotesque for display.** Distinctive. Not used by most AI-generated sites.
6. **No Prisma or database.** Marketing site. No auth, no user data, no DB needed.
7. **Hostinger Web Apps hosting** (primary) or Vercel (fallback). DNS managed separately.
8. **Contact form sends via Resend**, not direct SMTP. Better deliverability.
9. **No Google Analytics.** Use PostHog (self-hostable, privacy-friendly) or none.
10. **cobe for globe**, not custom Three.js. Performant, well-maintained, proven.
