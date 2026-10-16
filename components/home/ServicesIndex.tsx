"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/ui/Section";

// Round 3 services index: numbered table-of-contents rows (the registry
// composition). Full-width hairline rows: number, name, one-liner, arrow.
// Deliberately not cards; the row itself is the link, hover lifts the arrow
// and warms the number to the accent.
const SERVICES = [
  { href: "/services/ai-automation", num: "01", index: 1 },
  { href: "/services/web-development", num: "02", index: 2 },
  { href: "/services/mobile-apps", num: "03", index: 3 },
  { href: "/services/cloud-devops", num: "04", index: 4 },
  { href: "/services/design", num: "05", index: 5 },
  { href: "/services/smm", num: "06", index: 6 },
];

export function ServicesIndex() {
  const { t } = useI18n();

  return (
    <Section className="rule" animSection="h-02">
      <SectionHeader
        align="left"
        eyebrow={t("home.services.meta.label")}
        title={t("home.services.meta.value")}
      />

      <div className="mt-12 border-b border-hairline md:mt-14">
        {SERVICES.map((service) => (
          <div key={service.href}>
            <Link
              data-anim="row"
              href={service.href}
              aria-label={t(`home.services.${service.index}.name`)}
              className="group relative grid grid-cols-[2.75rem_1fr_auto] items-start gap-4 border-t border-hairline py-6 transition-colors duration-200 hover:bg-surface sm:px-4 md:grid-cols-[4.5rem_1fr_auto] md:items-center md:py-7"
            >
              <span
                aria-hidden="true"
                data-anim="row-line"
                className="pointer-events-none absolute -top-px left-0 z-10 h-px w-full origin-left bg-hairline"
              />
              <span
                data-anim="row-num"
                className="stat-num pt-1.5 text-sm text-faint transition-colors duration-200 group-hover:text-accent md:pt-0"
              >
                {service.num}
              </span>
              <span data-anim="row-content" className="min-w-0">
                <span className="h3 block text-[1.35rem] text-foreground md:text-[1.7rem]">
                  {t(`home.services.${service.index}.name`)}
                </span>
                <span className="mt-1.5 block max-w-xl text-[15px] leading-relaxed text-muted">
                  {t(`home.services.${service.index}.desc`)}
                </span>
              </span>
              <span className="pt-1.5 md:pt-0" aria-hidden="true">
                <ArrowUpRight className="h-5 w-5 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:h-6 md:w-6" />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
