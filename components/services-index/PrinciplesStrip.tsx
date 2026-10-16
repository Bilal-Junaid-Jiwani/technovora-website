"use client";

import { useI18n } from "@/lib/i18n";

/**
 * Principles (registry /services #4): three large-text statements, stacked
 * at display-adjacent scale with the supporting note set underneath each.
 * No cards, no numbers; the statements themselves carry the section.
 * Animated by ServicesIndexAnimator (S-04 Statement Settle, scrubbed).
 */
export function PrinciplesStrip() {
  const { t } = useI18n();
  const items = [1, 2, 3].map((i) => ({
    text: t(`servicesidx.principles.${i}`),
    note: t(`servicesidx.principles.${i}.note`),
  }));

  return (
    <section data-anim-section="s-04" className="bg-background">
      <div className="container-x pt-24 pb-16 md:pt-32 md:pb-20">
        <div>
          <h2
            data-anim="heading"
            className="text-sm font-semibold tracking-[0.02em] text-muted"
          >
            {t("servicesidx.principles.title")}
          </h2>
        </div>

        <div className="mt-10">
          {items.map((item) => (
            <div
              data-anim="statement"
              key={item.text}
              className="border-t border-hairline py-10 first:border-t-0 first:pt-2 md:py-12"
            >
              <p className="display max-w-3xl text-3xl text-foreground md:text-[40px] md:leading-[1.15]">
                {item.text}
              </p>
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
