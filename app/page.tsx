import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HomeHero } from "@/components/home/HomeHero";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Animator } from "@/components/motion/Animator";
import { homeSetup } from "@/components/motion/HomeAnimator";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import {
  organizationJsonLd,
  websiteJsonLd,
  faqPageJsonLd,
} from "@/lib/jsonld";
import { home as enHome } from "@/lib/i18n/en/home";

// Below-fold sections: code-split with SSR left on (default ssr: true), so
// content stays in SSR HTML for SEO while the JS ships in separate chunks.
const WhyUs = dynamic(() =>
  import("@/components/home/WhyUs").then((m) => m.WhyUs),
);
const Process = dynamic(() =>
  import("@/components/home/Process").then((m) => m.Process),
);
const OutcomeBand = dynamic(() =>
  import("@/components/home/OutcomeBand").then((m) => m.OutcomeBand),
);
const FaqAccordion = dynamic(() =>
  import("@/components/home/FaqAccordion").then((m) => m.FaqAccordion),
);
const FinalCta = dynamic(() =>
  import("@/components/home/FinalCta").then((m) => m.FinalCta),
);

export const metadata: Metadata = buildMetadata({
  title: "Technovora — Custom software and AI automation",
  description:
    "Technovora designs and builds web apps, mobile apps, AI automation and cloud infrastructure for growing teams. Share your requirements — we reply within one business day with an estimate.",
  path: "/",
});

// Real FAQ content (same strings rendered by FaqAccordion) for FAQPage schema.
const faqItems = [1, 2, 3, 4, 5].map((i) => ({
  question: enHome[`home.faq.${i}.q`],
  answer: enHome[`home.faq.${i}.a`],
}));

const homeJsonLd = [
  organizationJsonLd(),
  websiteJsonLd(),
  faqPageJsonLd(faqItems),
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <Animator setup={homeSetup}>
        <HomeHero />
        <ServicesIndex />
        <FeaturedWork />
        <WhyUs />
        <Process />
        <OutcomeBand />
        <FaqAccordion />
        <FinalCta />
      </Animator>
    </>
  );
}
