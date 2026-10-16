# PLACEHOLDERS.md — Technovora rebuild (`full-rebuild` branch)

Every placeholder on the site is **obviously labeled** — no visitor can mistake it for real
data. This file lists each one and what real data replaces it. Rule: never replace a
placeholder with fake-real content (no real company names without permission, no stock
faces as team, no invented personal names).

## Real assets in place
- **Logo:** `/public/images/logo-wordmark.webp` is the real Technovora wordmark (gradient T +
  dark-purple "TECHNOVORA" on transparent), used in the navbar (desktop + mobile menu) and
  footer via `next/image`. It uses `dark:invert dark:hue-rotate-180` so it stays legible in
  dark mode.

## /packages — estimation quiz, no displayed prices (by design)
- **What:** /packages is an estimation quiz that produces a written-quote estimate; the site
  shows no dollar prices anywhere by design. Price-like numbers (add-on "Sample" pills,
  tier amounts) were removed — do not reintroduce them without the business owner.

## Labeled placeholders currently on the site

### /services — AI automation band terminal
- **What:** Terminal visual labeled "Sample — automation run" with "(demo data)" in outputs.
- **File:** `components/services-index/CapabilityBands.tsx`
- **Replace with:** a real, anonymized client workflow example (once one exists and is approved) — or leave the abstract schematic as-is.

### /portfolio — project visual + names
- **What:** Featured project visual carries a dashed badge "Placeholder visual — replace with
  project screenshot". Project names are generic descriptive titles (e.g. "SaaS onboarding
  flow", "Internal ops dashboard") — no client names.
- **Files:** `components/portfolio/FeaturedProject.tsx`, `components/portfolio/ProjectIndex.tsx`
- **Replace with:** real project screenshots and client names, only where NDA/permission allows.

## Promise-framed claims to confirm (not placeholders, but the business owner must verify)
- "Now booking new projects" (homepage hero availability)
- "Replies within one business day" (contact page promise)
- "Written proposal within 48 hours of the discovery call" (homepage outcome band)
- 30-day post-launch support; staged payments (deposit, midpoint, launch)
- Contact details: moin@technovora.com, sales@technovora.com, https://calendly.com/technovora,
  offices "Sheridan, WY · Hong Kong"

## Real data wanted (nothing on the site is faked while we wait)
- Real client testimonial (only real quotes are shown — none are shown today, by design)
- Real client names + screenshot permissions for portfolio
- Team photos (no team section exists today; add one only with real photos)
- Confirmed contact details and response promises (see claims above)
