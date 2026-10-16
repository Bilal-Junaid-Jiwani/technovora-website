import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { services as enCopy } from "@/lib/i18n/en/services";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import {
  MobileHero,
  MobileChallenge,
  MobilePartnership,
  MobileImpact,
  MobilePlatforms,
  MobileCta,
} from "@/components/services/mobile-apps";
import { MobileAnimator } from "@/components/motion/MobileAnimator";

const service = getService("mobile-apps");

export const metadata: Metadata = buildMetadata({
  title: enCopy[service.metaTitleKey],
  description: enCopy[service.metaDescKey],
  path: `/services/${service.slug}`,
});

const serviceName = enCopy[service.metaTitleKey].replace(" | Technovora", "");

const jsonLd = [
  serviceJsonLd({
    slug: service.slug,
    name: serviceName,
    description: enCopy[service.metaDescKey],
  }),
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: serviceName, path: `/services/${service.slug}` },
  ]),
];

export default function MobileAppsPage() {
  return (
    <main>
      <JsonLd data={jsonLd} />
      <MobileAnimator>
        <MobileHero service={service} />
        <MobileChallenge />
        <MobilePartnership />
        <MobileImpact />
        <MobilePlatforms />
        <MobileCta />
      </MobileAnimator>
    </main>
  );
}
