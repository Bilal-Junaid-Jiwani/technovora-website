"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

// Engagement log (the registry's dated-rows composition, fed by the week
// labels): a document-style table of week, phase, and what happens, divided
// by hairlines. Full-width rows; no timeline rail, no sticky header. Relative
// week labels only, never fake calendar dates.
const STEPS = [1, 2, 3, 4, 5, 6];

export function Process() {
  const { t } = useI18n();

  return (
    <Section className="rule" animSection="h-05">
      <div className="max-w-2xl">
        <p data-anim="process-eyebrow" className="eyebrow">
          {t("home.log.meta.label")}
        </p>
        <h2
          data-anim="process-title"
          className="h2 mt-4 text-4xl text-foreground md:text-5xl"
        >
          {t("home.log.meta.value")}
        </h2>
        <p data-anim="process-lede" className="lead mt-5">
          {t("home.log.note")}
        </p>
      </div>

      {/* Real photography above the log: a working session, the way the
          weeks below actually start. Stock (Unsplash), atmospheric only;
          the alt text describes the photo, never claims it is our office. */}
      <div className="mt-12 md:mt-14">
        <div
          data-anim="photo-frame"
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hairline sm:aspect-[16/8] lg:aspect-[21/8]"
        >
          <Image
            src="/images/studio-session.jpg"
            alt={t("home.process.photo.alt")}
            fill
            sizes="(min-width: 1200px) 1160px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div role="list" className="mt-12 border-b border-hairline md:mt-14">
        {STEPS.map((n) => (
          <div key={n}>
            <div
              data-anim="process-row"
              role="listitem"
              className="grid gap-1.5 border-t border-hairline py-7 md:grid-cols-[10rem_15rem_1fr] md:items-baseline md:gap-8 md:py-8"
            >
              <p
                data-anim="stamp"
                className="stat-num text-sm font-medium text-faint"
              >
                {t(`home.log.${n}.week`)}
              </p>
              <h3 data-anim="row-text" className="h3 text-xl text-foreground">
                {t(`home.log.${n}.title`)}
              </h3>
              <p
                data-anim="row-text"
                className="max-w-xl text-[15px] leading-relaxed text-muted"
              >
                {t(`home.log.${n}.desc`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
