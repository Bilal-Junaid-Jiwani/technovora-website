// JSON-LD structured data builders for SEO / AI-search extractability.
// All values come from real site content — never invented proof.

import { SITE_NAME, SITE_URL, SALES_EMAIL, SOCIAL_LINKS } from "./constants";

const OG_IMAGE = `${SITE_URL}/og/default.png`;

function orgId() {
  return `${SITE_URL}/#organization`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(),
    name: SITE_NAME,
    url: SITE_URL,
    logo: OG_IMAGE,
    description:
      "Technovora designs and builds custom software, AI automation, mobile apps, and cloud infrastructure for growing teams.",
    email: SALES_EMAIL,
    sameAs: [SOCIAL_LINKS.github],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Sheridan",
        addressRegion: "WY",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Hong Kong",
        addressCountry: "HK",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: SALES_EMAIL,
      contactType: "sales",
      availableLanguage: "English",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": orgId() },
    inLanguage: "en",
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface ServiceJsonLdInput {
  slug: string;
  name: string;
  description: string;
}

export function serviceJsonLd({ slug, name, description }: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${slug}#service`,
    name,
    description,
    url: `${SITE_URL}/services/${slug}`,
    provider: { "@id": orgId() },
    areaServed: "Worldwide",
    serviceType: name,
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export interface ArticleJsonLdInput {
  slug: string;
  headline: string;
  description: string;
}

export function articleJsonLd({ slug, headline, description }: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/blog/${slug}#article`,
    headline,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    image: OG_IMAGE,
    author: { "@id": orgId() },
    publisher: { "@id": orgId() },
    inLanguage: "en",
  };
}
