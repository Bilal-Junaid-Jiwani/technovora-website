// Shared service data for the six service detail pages.
// Copy lives in lib/i18n/en/services.ts (English strings keyed by the `*Key`
// fields below); this file holds structure, slugs, and factual tool names only.

export interface KeyedCopy {
  titleKey: string;
  descKey: string;
}

export interface ServiceFaq {
  qKey: string;
  aKey: string;
}

export interface ServiceDef {
  slug: string;
  nameKey: string;
  taglineKey: string;
  metaTitleKey: string;
  metaDescKey: string;
  heroEyebrowKey: string;
  heroTitleKey: string;
  heroTaglineKey: string;
  problemEyebrowKey: string;
  problemTitleKey: string;
  problemDescKey: string;
  problem: KeyedCopy[];
  includedEyebrowKey: string;
  includedTitleKey: string;
  includedDescKey: string;
  included: KeyedCopy[];
  stackEyebrowKey: string;
  stackTitleKey: string;
  stack: string[];
  faqs: ServiceFaq[];
  pricingEyebrowKey: string;
  pricingDescKey: string;
  pricingCtaKey: string;
  ctaHeadlineKey: string;
  ctaSubKey: string;
  ctaButtonKey: string;
}

const K = (slug: string, path: string) => `svc.${slug}.${path}`;

function define(slug: string, stack: string[]): ServiceDef {
  return {
    slug,
    nameKey: K(slug, "hero.eyebrow"),
    taglineKey: K(slug, "hero.tagline"),
    metaTitleKey: K(slug, "meta.title"),
    metaDescKey: K(slug, "meta.desc"),
    heroEyebrowKey: K(slug, "hero.eyebrow"),
    heroTitleKey: K(slug, "hero.title"),
    heroTaglineKey: K(slug, "hero.tagline"),
    problemEyebrowKey: K(slug, "problem.eyebrow"),
    problemTitleKey: K(slug, "problem.title"),
    problemDescKey: K(slug, "problem.desc"),
    problem: [1, 2, 3].map((i) => ({
      titleKey: K(slug, `problem.${i}.title`),
      descKey: K(slug, `problem.${i}.desc`),
    })),
    includedEyebrowKey: K(slug, "included.eyebrow"),
    includedTitleKey: K(slug, "included.title"),
    includedDescKey: K(slug, "included.desc"),
    included: [1, 2, 3, 4, 5, 6].map((i) => ({
      titleKey: K(slug, `included.${i}.title`),
      descKey: K(slug, `included.${i}.desc`),
    })),
    stackEyebrowKey: K(slug, "stack.eyebrow"),
    stackTitleKey: K(slug, "stack.title"),
    stack,
    faqs: [1, 2, 3].map((i) => ({
      qKey: K(slug, `faq.${i}.q`),
      aKey: K(slug, `faq.${i}.a`),
    })),
    pricingEyebrowKey: K(slug, "pricing.eyebrow"),
    pricingDescKey: K(slug, "pricing.desc"),
    pricingCtaKey: K(slug, "pricing.cta"),
    ctaHeadlineKey: K(slug, "cta.headline"),
    ctaSubKey: K(slug, "cta.sub"),
    ctaButtonKey: K(slug, "cta.button"),
  };
}

export const services: ServiceDef[] = [
  define("ai-automation", [
    "n8n",
    "Claude",
    "OpenAI",
    "Zapier",
    "Make",
    "REST APIs",
    "Webhooks",
    "PostgreSQL",
    "Slack",
    "Notion",
  ]),
  define("web-development", [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "Vercel",
    "Headless CMS",
  ]),
  define("mobile-apps", [
    "React Native",
    "Expo",
    "Swift",
    "Kotlin",
    "Push notifications",
    "App Store",
    "Google Play",
  ]),
  define("cloud-devops", [
    "AWS",
    "GCP",
    "Terraform",
    "Docker",
    "Kubernetes",
    "GitHub Actions",
    "Monitoring",
  ]),
  define("design", [
    "Figma",
    "Design systems",
    "Prototyping",
    "Brand identity",
    "UX research",
  ]),
  define("smm", [
    "Content calendars",
    "Copywriting",
    "Campaign management",
    "Community management",
    "Analytics",
  ]),
];

export function getService(slug: string): ServiceDef {
  const found = services.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown service slug: ${slug}`);
  return found;
}
