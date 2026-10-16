import type { Metadata } from "next";
import { ServicesHero } from "@/components/services-index/ServicesHero";
import { ServiceDirectory } from "@/components/services-index/ServiceDirectory";
import { FitGuide } from "@/components/services-index/FitGuide";
import { PrinciplesStrip } from "@/components/services-index/PrinciplesStrip";
import { ServicesCta } from "@/components/services-index/ServicesCta";
import { ServicesIndexAnimator } from "@/components/motion/ServicesIndexAnimator";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Services | Technovora",
  description:
    "AI automation, web development, mobile apps, cloud & DevOps, design, and social media: six service lines from one senior team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground">
      <ServicesIndexAnimator>
        <ServicesHero />
        <ServiceDirectory />
        <FitGuide />
        <PrinciplesStrip />
        <ServicesCta />
      </ServicesIndexAnimator>
    </main>
  );
}
