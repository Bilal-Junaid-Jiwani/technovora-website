"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

/**
 * BlogCta — subscribe-by-email band (round 3).
 * A quiet closing strip, not a card: the offer reads left, the one-tap
 * mailto action sits right. Intentionally NOT a subscribe form — one
 * tap composes a pre-filled email to sales@technovora.com. Honest and
 * real, no dead submit.
 * Animation: B-04 Tint Sweep Band (see BlogAnimator).
 */
export function BlogCta() {
  const { t } = useI18n();
  const sales = t("common.email.sales");
  const href = `mailto:${sales}?subject=${encodeURIComponent(
    "Subscribe me to new essays"
  )}&body=${encodeURIComponent(
    "Hi,\n\nPlease add me to the Technovora studio notes list.\n\nThanks!"
  )}`;

  return (
    <section data-anim-section="b-04" className="border-t border-hairline bg-surface">
      <div className="container-x grid gap-8 py-16 md:py-20 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-16">
        <div data-anim="cta-head">
          <h2 className="h2 text-3xl text-foreground md:text-4xl">
            {t("blog3.cta.title")}
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            {t("blog3.cta.desc")}
          </p>
        </div>
        <div data-anim="cta-action" className="lg:text-right">
          <a href={href} className="btn-primary">
            {t("blog3.cta.button")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
