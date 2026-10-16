import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { services as enCopy } from "@/lib/i18n/en/services";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import {
  WebHero,
  WebBeforeAfter,
  WebChapters,
  WebStackTable,
  WebPriceFactors,
  WebCta,
} from "@/components/services/web-development";
import { WebAnimator } from "@/components/motion/WebAnimator";

const service = getService("web-development");

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

export default function WebDevelopmentPage() {
  return (
    <main>
      <JsonLd data={jsonLd} />
      <WebAnimator>
        <WebHero service={service} />
        <WebBeforeAfter />
        <WebChapters />
        <WebStackTable />
        <WebPriceFactors />
        <WebCta />
      </WebAnimator>
    </main>
  );
}
