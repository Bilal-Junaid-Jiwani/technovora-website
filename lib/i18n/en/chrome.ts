// English strings for shared chrome: nav, footer, theme, language.
// Other builders add their own files in this directory (en.home.ts, en.services.ts, ...)
// and I18nProvider merges them into the `en` locale. Other locales fall back to English.

export const chrome = {
  "nav.services": "Services",
  "nav.work": "Work",
  "nav.pricing": "Pricing",
  "nav.blog": "Blog",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.book": "Book a call",
  "nav.menu": "Menu",
  "nav.close": "Close",

  "footer.tagline": "Custom software and AI automation for SaaS teams.",
  "footer.company": "Company",
  "footer.services": "Services",
  "footer.resources": "Resources",
  "footer.contact": "Contact",
  "footer.rights": "All rights reserved.",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",

  "theme.toggle": "Toggle theme",
  "lang.label": "Language",

  "common.calendly": "https://calendly.com/technovora",
  "common.email.sales": "sales@technovora.com",
  "common.email.info": "moin@technovora.com",
} as const;
