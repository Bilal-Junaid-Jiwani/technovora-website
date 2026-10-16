"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

/**
 * BookingBand - "book directly" Calendly band.
 * Restrained split band: statement on the left, the booking action and
 * its small print on the right. One tinted band, one action.
 * Animation: CT-05 Horizon Parting (see ContactAnimator).
 */
export function BookingBand() {
  const { t } = useI18n();
  const calendly = t("common.calendly");

  return (
    <Section band animSection="ct-05">
        <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div data-anim="book-head">
            <p className="eyebrow">{t("contact3.book.eyebrow")}</p>
            <h2 className="display mt-4 text-4xl text-foreground md:text-5xl">
              {t("contact3.book.title")}
            </h2>
            <p className="lead mt-4 max-w-[52ch]">{t("contact3.book.desc")}</p>
          </div>
          <div data-anim="book-action" className="flex flex-col items-start gap-4 lg:items-end">
            <a
              href={calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t("contact3.book.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <p className="text-sm text-muted">{t("contact3.book.note")}</p>
          </div>
        </div>
    </Section>
  );
}
