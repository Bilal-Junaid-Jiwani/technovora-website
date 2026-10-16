"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ServiceDef } from "@/lib/services";
import { ServiceBreadcrumb, CalendlyButton } from "./shared";

type Props = { service: ServiceDef };

/**
 * Mobile apps: 8th Light Challenge / Partnership / Impact triptych.
 * Composition family: joined triptych hero, narrative with pull list,
 * week-paired rows, labeled result statements, platform rows,
 * meta-rule CTA band. One bold move: the joined triptych panel.
 */
export function MobileHero({ service }: Props) {
  const { t } = useI18n();
  const triptych = [1, 2, 3].map((i) => ({
    title: t(`svc.mobile-apps.hero.triptych.${i}.title`),
    desc: t(`svc.mobile-apps.hero.triptych.${i}.desc`),
  }));
  return (
    <section data-anim-section="m-01" className="bg-background">
      <div className="section container-x pb-0!">
        <div data-anim="breadcrumb">
          <ServiceBreadcrumb />
        </div>
        <div>
          <div className="mt-12 max-w-3xl">
            <p data-anim="eyebrow" className="eyebrow">{t(service.heroEyebrowKey)}</p>
            <h1 data-anim="title" className="display mt-6 text-5xl text-foreground md:text-7xl">
              {t(service.heroTitleKey)}
            </h1>
            <p data-anim="lede" className="lead mt-7 max-w-2xl">{t("svc.mobile-apps.hero.sub")}</p>
            <div data-anim="actions" className="mt-9 flex flex-wrap gap-3">
              <CalendlyButton label={t("svc.shared.bookCall")} />
              <Link href="/packages" className="btn-secondary">
                {t("svc.shared.seePackages")}
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div data-anim="triptych" className="mt-16 grid overflow-hidden rounded-2xl border border-hairline md:grid-cols-3 lg:mt-20">
            {triptych.map((item, i) => (
              <div
                key={item.title}
                data-anim="panel"
                className={
                  (i === 1 ? "bg-surface " : "bg-card ") +
                  "p-7 md:p-8 " +
                  (i > 0
                    ? "border-t border-hairline md:border-l md:border-t-0"
                    : "")
                }
              >
                <span className="block h-[2px] w-9 bg-accent" aria-hidden="true" />
                <p className="mt-6 text-xl font-semibold tracking-[-0.02em] text-foreground">
                  {item.title}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Challenge: editorial narrative with a pull list of native-twice pains. */
export function MobileChallenge() {
  const { t } = useI18n();
  const pains = [1, 2, 3, 4].map((i) => t(`svc.mobile-apps.challenge.list.${i}`));
  return (
    <section data-anim-section="m-02" className="bg-background">
      <div className="section container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <h2 data-anim="title" className="h2 text-4xl text-foreground md:text-5xl">
              {t("svc.mobile-apps.challenge.title")}
            </h2>
            <p data-anim="body1" className="mt-7 text-xl leading-[1.65] text-foreground">
              {t("svc.mobile-apps.challenge.body1")}
            </p>
            <p data-anim="body2" className="mt-5 max-w-[62ch] text-[17px] leading-[1.7] text-muted">
              {t("svc.mobile-apps.challenge.body2")}
            </p>
          </div>
          <div>
            <div data-anim="list" className="rounded-2xl border border-hairline bg-surface p-7 md:p-9">
              <p className="text-base font-semibold text-foreground">
                {t("svc.mobile-apps.challenge.list.title")}
              </p>
              <ul className="mt-6 space-y-1">
                {pains.map((pain) => (
                  <li
                    key={pain}
                    data-anim="item"
                    className="flex items-start gap-3 border-t border-hairline py-4 text-[15px] leading-relaxed text-foreground first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <X
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {pain}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Partnership: week label paired with the activity for that week. */
export function MobilePartnership() {
  const { t } = useI18n();
  const weeks = [1, 2, 3, 4].map((i) => ({
    label: t(`svc.mobile-apps.partnership.week${i}.label`),
    activity: t(`svc.mobile-apps.partnership.week${i}.activity`),
  }));
  return (
    <section data-anim-section="m-03" className="band">
      <div className="section container-x">
        <h2 data-anim="title" className="h2 max-w-2xl text-4xl text-foreground md:text-5xl">
          {t("svc.mobile-apps.partnership.title")}
        </h2>
        <p data-anim="lede" className="lead mt-5 max-w-2xl">
          {t("svc.mobile-apps.partnership.intro")}
        </p>
        <div data-anim="weeks" className="relative mt-14 border-t border-hairline">
          <span
            data-anim="vine"
            aria-hidden="true"
            className="absolute -left-3 top-0 h-full w-0.5 origin-top bg-accent"
          />
          {weeks.map((w) => (
            <div
              key={w.label}
              data-anim="week"
              className="grid gap-3 py-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12"
            >
              <p data-anim="label" className="stat-num text-lg font-semibold text-foreground">{w.label}</p>
              <p data-anim="body" className="max-w-[62ch] text-[17px] leading-[1.65] text-muted">
                {w.activity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Impact: labeled qualitative result statements, no numerals. */
export function MobileImpact() {
  const { t } = useI18n();
  const items = [1, 2, 3, 4].map((i) => ({
    label: t(`svc.mobile-apps.impact.${i}.label`),
    text: t(`svc.mobile-apps.impact.${i}.text`),
  }));
  return (
    <section data-anim-section="m-04" className="bg-background">
      <div className="section container-x">
        <h2 data-anim="title" className="h2 max-w-2xl text-4xl text-foreground md:text-5xl">
          {t("svc.mobile-apps.impact.title")}
        </h2>
        <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.label} data-anim="statement">
              <span data-anim="rule" className="block h-[2px] w-9 bg-accent" aria-hidden="true" />
              <h3 data-anim="label" className="h3 mt-5 text-2xl text-foreground">{item.label}</h3>
              <p data-anim="text" className="mt-3 max-w-[48ch] text-[16px] leading-[1.7] text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Platforms: grouped editorial rows for iOS, Android, and cross-platform. */
export function MobilePlatforms() {
  const { t } = useI18n();
  const platforms = [1, 2, 3].map((i) => ({
    title: t(`svc.mobile-apps.platforms.${i}.title`),
    desc: t(`svc.mobile-apps.platforms.${i}.desc`),
    points: [t(`svc.mobile-apps.platforms.${i}.a`), t(`svc.mobile-apps.platforms.${i}.b`)],
  }));
  return (
    <section data-anim-section="m-05" className="bg-background">
      <div className="section container-x pt-0!">
        <h2 data-anim="title" className="h2 max-w-2xl text-4xl text-foreground md:text-5xl">
          {t("svc.mobile-apps.platforms.title")}
        </h2>
        <div className="mt-12 border-t border-hairline">
          {platforms.map((p) => (
            <article
              key={p.title}
              data-anim="card"
              className="grid gap-6 py-10 lg:grid-cols-[210px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12"
            >
                <h3 className="h3 text-3xl text-foreground">{p.title}</h3>
                <p className="max-w-[52ch] text-[16px] leading-[1.7] text-muted">{p.desc}</p>
                <ul className="space-y-3">
                  {p.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-hairline bg-surface">
                        <Check
                          className="h-3 w-3 text-accent"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** CTA: thin meta rule above a centered closing statement. */
export function MobileCta() {
  const { t } = useI18n();
  return (
    <section data-anim-section="m-06" className="band">
      <div className="section container-x">
        <div data-anim="meta" className="relative pt-7 text-center">
          <span
            data-anim="rule"
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-hairline"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {t("svc.mobile-apps.cta.meta")}
          </p>
        </div>
        <div data-anim="block" className="mx-auto mt-10 max-w-3xl text-center">
          <h2 data-anim="title" className="display text-4xl text-foreground md:text-6xl">
            {t("svc.mobile-apps.cta.headline")}
          </h2>
          <div data-anim="button" className="mt-9 flex justify-center">
            <CalendlyButton label={t("svc.mobile-apps.cta.button")} />
          </div>
          <p data-anim="fine" className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
            {t("svc.mobile-apps.cta.fine")}
          </p>
        </div>
      </div>
    </section>
  );
}
