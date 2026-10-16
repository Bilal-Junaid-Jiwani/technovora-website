"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ServiceDef } from "@/lib/services";
import { ServiceBreadcrumb, CalendlyButton } from "./shared";

type Props = { service: ServiceDef };

/**
 * Web development: frog-style chapter structure.
 * Composition family: centered chapter cover, before and after pairs,
 * numbered prose chapters, definition table, scope-factors document,
 * left-aligned statement CTA. One bold move: the chapter cover.
 */
export function WebHero({ service }: Props) {
  const { t } = useI18n();
  return (
    <section data-anim-section="w-01" className="bg-background">
      <div className="section container-x pb-0!">
        <div data-anim="hero-breadcrumb">
          <ServiceBreadcrumb />
        </div>
        <div className="mx-auto mt-14 max-w-3xl text-center md:mt-20">
          <div className="flex items-center justify-center gap-5" aria-hidden="true">
            <span data-anim="hero-rule" className="h-px w-12 origin-right bg-hairline" />
            <span data-anim="hero-numeral" className="stat-num text-lg font-semibold text-accent">
              {t("svc.web-development.hero.numeral")}
            </span>
            <span data-anim="hero-rule" className="h-px w-12 origin-left bg-hairline" />
          </div>
          <p data-anim="hero-eyebrow" className="eyebrow mt-7 justify-center">{t(service.heroEyebrowKey)}</p>
          <h1 className="display relative mt-6 text-5xl text-foreground md:text-7xl">
            <span
              data-anim="hero-outline"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                color: "transparent",
                WebkitTextStrokeWidth: "1.5px",
                WebkitTextStrokeColor: "var(--text)",
              }}
            >
              {t(service.heroTitleKey)}
            </span>
            <span data-anim="hero-fill" className="relative">
              {t(service.heroTitleKey)}
            </span>
          </h1>
          <p data-anim="hero-lede" className="lead mx-auto mt-7 max-w-2xl">
            {t("svc.web-development.hero.lead")}
          </p>
          <div data-anim="hero-actions" className="mt-9 flex flex-wrap justify-center gap-3">
            <CalendlyButton label={t("svc.shared.bookCall")} />
            <Link href="/packages" className="btn-secondary">
              {t("svc.shared.seePackages")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Before and after: paired transformation rows. */
export function WebBeforeAfter() {
  const { t } = useI18n();
  const rows = [1, 2, 3, 4, 5].map((i) => ({
    before: t(`svc.web-development.beforeafter.${i}.before`),
    after: t(`svc.web-development.beforeafter.${i}.after`),
  }));
  return (
    <section data-anim-section="w-02" className="bg-background">
      <div className="section container-x">
        <div>
          <h2 data-anim="ba-title" className="h2 max-w-2xl text-4xl text-foreground md:text-5xl">
            {t("svc.web-development.beforeafter.title")}
          </h2>
          <p data-anim="ba-intro" className="lead mt-5 max-w-2xl">
            {t("svc.web-development.beforeafter.intro")}
          </p>
        </div>
        <ol className="mt-14 border-t border-hairline">
          {rows.map((row, i) => (
            <li
              key={row.after}
              data-anim="ba-row"
              className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 gap-y-3 py-8 md:grid-cols-[64px_minmax(0,1fr)_40px_minmax(0,1fr)] md:items-center md:gap-x-6"
            >
              <span data-anim="ba-num" className="stat-num pt-1 text-sm text-faint md:pt-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span data-anim="ba-before" className="text-[16px] leading-relaxed text-muted line-through decoration-faint/60">
                {row.before}
              </span>
              <ArrowRight
                className="hidden h-5 w-5 justify-self-center text-accent md:block"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span data-anim="ba-after" className="col-start-2 text-[17px] font-medium leading-relaxed text-foreground md:col-start-auto">
                {row.after}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Chapters: four full-width prose chapters with oversized numerals. */
export function WebChapters() {
  const { t } = useI18n();
  const chapters = [1, 2, 3, 4].map((i) => ({
    title: t(`svc.web-development.chapters.${i}.title`),
    body: t(`svc.web-development.chapters.${i}.body`),
  }));
  return (
    <section data-anim-section="w-03" className="band">
      <div className="section container-x">
        <h2 data-anim="ch-head" className="h2 max-w-2xl text-4xl text-foreground md:text-5xl">
          {t("svc.web-development.chapters.title")}
        </h2>
        <ol className="mt-14">
          {chapters.map((c, i) => (
            <li
              key={c.title}
              data-anim="ch-row"
              className="relative grid gap-5 py-10 md:grid-cols-[120px_210px_minmax(0,1fr)] md:gap-10 md:py-12"
            >
                <span
                  data-anim="ch-rule"
                  className="absolute inset-x-0 top-0 h-px origin-left bg-hairline"
                  aria-hidden="true"
                />
                <span data-anim="ch-num" className="stat-num text-6xl leading-none text-faint md:text-7xl" aria-hidden="true">
                  {`0${i + 1}`}
                </span>
                <h3 data-anim="ch-title" className="h3 pt-1 text-2xl text-foreground md:pt-3">{c.title}</h3>
                <p data-anim="ch-body" className="max-w-[62ch] pt-1 text-[16px] leading-[1.7] text-muted md:pt-3">
                  {c.body}
                </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Stack: definition table, category to tools, in a two-column grid. */
export function WebStackTable() {
  const { t } = useI18n();
  const rows = [1, 2, 3, 4, 5].map((i) => ({
    category: t(`svc.web-development.stack.${i}.category`),
    tools: t(`svc.web-development.stack.${i}.tools`),
  }));
  return (
    <section data-anim-section="w-04" className="bg-background">
      <div className="section container-x">
        <h2 data-anim="st-head" className="h2 max-w-2xl text-4xl text-foreground md:text-5xl">
          {t("svc.web-development.stack.title")}
        </h2>
        <dl className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
          {rows.map((row, i) => (
            <div
              key={row.category}
              data-anim="st-row"
              className={
                "relative pt-6 " +
                (i === rows.length - 1 ? "md:col-span-2" : "")
              }
            >
              <span
                data-anim="st-rule"
                className="absolute inset-x-0 top-0 h-[2px] origin-left bg-foreground"
                aria-hidden="true"
              />
              <dt data-anim="st-term" className="text-sm font-semibold text-muted">{row.category}</dt>
              <dd data-anim="st-desc" className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {row.tools}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Scope factors: document-style split with a note and a packages pointer. */
export function WebPriceFactors() {
  const { t } = useI18n();
  const factors = [1, 2, 3, 4, 5].map((i) => t(`svc.web-development.pricing.${i}`));
  return (
    <section data-anim-section="w-05" className="bg-background">
      <div className="section container-x pt-0!">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div data-anim="pf-intro">
            <h2 data-anim="pf-title" className="h2 text-4xl text-foreground md:text-5xl">
              {t("svc.web-development.pricing.title")}
            </h2>
            <p data-anim="pf-lead" className="lead mt-5">{t("svc.web-development.pricing.intro")}</p>
            <div data-anim="pf-note" className="mt-9 border-l-2 border-accent bg-surface px-6 py-5">
              <p className="text-[15px] leading-relaxed text-foreground">
                {t("svc.web-development.pricing.note")}
              </p>
            </div>
            <Link data-anim="pf-link" href="/packages" className="btn-secondary mt-8">
              {t("svc.web-development.pricing.cta")}
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
          <ol className="border-t border-hairline">
            {factors.map((f, i) => (
              <li key={f} data-anim="pf-item" className="flex items-baseline gap-6 py-5">
                <span data-anim="pf-num" className="stat-num text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span data-anim="pf-text" className="text-[17px] leading-relaxed text-foreground">{f}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** CTA: left-aligned statement with a single booking action. */
export function WebCta() {
  const { t } = useI18n();
  return (
    <section data-anim-section="w-06" className="band">
      <div className="section container-x">
        <div className="max-w-3xl">
          <h2 data-anim="cta-statement" className="display text-4xl text-foreground md:text-6xl">
            {t("svc.web-development.cta.statement")}
          </h2>
          <p data-anim="cta-fine" className="lead mt-6 max-w-xl">{t("svc.web-development.cta.fine")}</p>
          <div data-anim="cta-actions" className="mt-9">
            <CalendlyButton label={t("svc.web-development.cta.button")} />
          </div>
        </div>
      </div>
    </section>
  );
}
