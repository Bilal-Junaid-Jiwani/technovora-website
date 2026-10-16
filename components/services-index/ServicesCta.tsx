"use client";

import { ArrowUpRight, CalendarDays, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";

/**
 * Split CTA (registry /services #5): the statement stands on its own on the
 * left; a single contact card on the right holds the email route and one
 * primary booking action. No duplicated call-to-action.
 * Animated by ServicesIndexAnimator (S-05 Hinge Unfold): the statement
 * rises inside its bottom mask while the card unfolds from its top edge.
 */
export function ServicesCta() {
  const { t } = useI18n();
  const email = t("servicesidx.cta.card.email.value");
  const calendly = t("common.calendly");

  return (
    <section data-anim-section="s-05" className="bg-background">
      <div className="container-x pt-2 pb-24 md:pb-32">
        <div className="grid items-center gap-12 border-t border-hairline pt-16 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16 md:pt-20">
          <div data-anim="statement-mask" className="overflow-hidden">
            <div data-anim="statement">
              <h2 className="h2 max-w-xl text-4xl text-foreground md:text-5xl">
                {t("servicesidx.cta.title")}
              </h2>
              <p className="lead mt-5 max-w-[52ch]">{t("servicesidx.cta.sub")}</p>
              <p className="mt-6 text-sm text-muted">
                {t("servicesidx.cta.card.note")}
              </p>
            </div>
          </div>

          <div data-anim="card-perspective">
            <div data-anim="card" className="card p-7 md:p-8">
              <h3 className="h3 text-lg text-foreground">
                {t("servicesidx.cta.card.title")}
              </h3>

              <a
                href={`mailto:${email}`}
                className="group mt-6 flex items-center justify-between gap-4 border-t border-hairline pt-5"
              >
                <span>
                  <span className="block text-sm text-muted">
                    {t("servicesidx.cta.card.email.label")}
                  </span>
                  <span className="mt-0.5 block text-base font-medium break-all text-foreground">
                    {email}
                  </span>
                </span>
                <Mail
                  className="h-5 w-5 shrink-0 text-faint transition-colors group-hover:text-accent"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </a>

              <div className="mt-6 border-t border-hairline pt-5">
                <span className="block text-sm text-muted">
                  {t("servicesidx.cta.card.call.label")}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-base font-medium text-foreground">
                  {t("servicesidx.cta.card.call.value")}
                  <ArrowUpRight
                    className="h-4 w-4 text-faint"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <a
                  href={calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-5 w-full"
                >
                  <CalendarDays
                    className="h-5 w-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {t("servicesidx.cta.card.call.label")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
