"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

/**
 * PortfolioCta — invitation CTA (round 3).
 * Split closing: the invitation reads left at near-display scale, the
 * single booking action and the email note sit right. One CTA intent
 * (book a call), no competing buttons.
 */
export function PortfolioCta() {
  const { t } = useI18n();
  return (
    <section data-anim-section="pf-06" className="border-t border-hairline bg-surface">
      <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
        <div>
          <h2 data-anim="cta-title" className="display text-4xl text-foreground md:text-5xl">
            {t("portfolio.cta.title")}
          </h2>
          <p className="lead mt-5 max-w-xl">{t("portfolio.cta.desc")}</p>
        </div>
        <div className="lg:text-right">
          <a
            data-anim="cta-button"
            href={t("common.calendly")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {t("portfolio.cta.primary")}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <p data-anim="cta-note" className="mt-5 text-sm text-faint">{t("portfolio.cta.note")}</p>
        </div>
      </div>
    </section>
  );
}
