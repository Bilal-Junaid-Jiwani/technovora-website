"use client";

import { ArrowUpRight, CalendarClock, Mail, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";

/**
 * ContactMain - the Stripe-clean split.
 * Left: the real contact form in a card. Right: the info column - email
 * channels, offices, and the direct booking link, set as quiet hairline
 * rows with muted icons. Every action is real.
 * Animation: CT-02 Field Underline Cascade (see ContactAnimator).
 */
export function ContactMain() {
  const { t } = useI18n();
  const sales = t("common.email.sales");
  const info = t("common.email.info");
  const calendly = t("common.calendly");

  const labelClass =
    "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted";

  return (
    <section data-anim-section="ct-02" className="container-x pb-24 pt-12 md:pb-32 md:pt-16">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div data-anim="form-col">
          <div className="card p-6 sm:p-10">
            <ContactForm />
          </div>
        </div>

        <div data-anim="info-col">
          <div className="flex h-full flex-col">
            <div data-anim="info-item" className="pb-8">
              <p className={labelClass}>
                <Mail className="h-4 w-4 text-muted" strokeWidth={1.75} aria-hidden />
                {t("contact3.row.email.label")}
              </p>
              <a
                href={`mailto:${sales}`}
                className="mt-3 block text-lg font-medium text-foreground transition-colors hover:text-accent"
              >
                {sales}
              </a>
              <p className="mt-1 text-sm text-muted">{t("contact3.row.email.1.note")}</p>
              <a
                href={`mailto:${info}`}
                className="mt-5 block text-lg font-medium text-foreground transition-colors hover:text-accent"
              >
                {info}
              </a>
              <p className="mt-1 text-sm text-muted">{t("contact3.row.email.2.note")}</p>
            </div>

            <div data-anim="info-item" className="rule py-8">
              <p className={labelClass}>
                <MapPin className="h-4 w-4 text-muted" strokeWidth={1.75} aria-hidden />
                {t("contact3.row.offices.label")}
              </p>
              <p className="mt-3 text-lg font-medium text-foreground">
                {t("contact3.row.offices.1")}
              </p>
              <p className="mt-1 text-lg font-medium text-foreground">
                {t("contact3.row.offices.2")}
              </p>
            </div>

            <div data-anim="info-item" className="rule pt-8">
              <p className={labelClass}>
                <CalendarClock className="h-4 w-4 text-muted" strokeWidth={1.75} aria-hidden />
                {t("contact3.row.book.label")}
              </p>
              <a
                href={calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-lg font-medium text-foreground transition-colors hover:text-accent"
              >
                {t("contact3.row.book.value")}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <p className="mt-1 text-sm text-muted">{t("contact3.row.book.note")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
