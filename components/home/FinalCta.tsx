"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

// Closing CTA (the registry's one-line-question composition): a single large
// centered question on the plain background, a quiet sub-line, and the dual
// call to action. No band, no card; type alone carries the close.
export function FinalCta() {
  const { t } = useI18n();
  const calendly = t("common.calendly");

  return (
    <section data-anim-section="h-08" className="rule bg-background">
      <div className="container-x section">
        <div className="mx-auto max-w-4xl text-center">
          <div>
            <h2
              data-anim="cta-headline"
              className="display text-[2.6rem] text-foreground md:text-7xl"
            >
              {t("home.final.question")}
            </h2>
          </div>
          <div>
            <p
              data-anim="cta-sub"
              className="lead mx-auto mt-7 max-w-xl"
            >
              {t("home.final.sub")}
            </p>
          </div>
          <div>
            <div
              data-anim="cta-actions"
              className="mt-11 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                data-anim="cta-primary"
                href={calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t("home.final.cta.primary")}
              </a>
              <Link href="/packages" className="btn-secondary">
                {t("home.final.cta.secondary")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
