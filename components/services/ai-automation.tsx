"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ServiceDef } from "@/lib/services";
import { ServiceBreadcrumb, CalendlyButton } from "./shared";
import { cn } from "@/lib/utils";

type Props = { service: ServiceDef };

const NAV = [
  { id: "symptoms", labelKey: "svc.ai-automation.nav.symptoms" },
  { id: "roadmap", labelKey: "svc.ai-automation.nav.roadmap" },
  { id: "stack", labelKey: "svc.ai-automation.nav.stack" },
  { id: "scoping", labelKey: "svc.ai-automation.nav.scoping" },
] as const;

/**
 * AI automation: Brainhub-style delivery roadmap.
 * Composition family: roadmap hero strip, symptom checklist, phased
 * Day 1 to Day 21 timeline, inline-tools sentence, scoping pointer,
 * offer-card CTA. One bold move: the week strip under the hero.
 */
export function AiHero({ service }: Props) {
  const { t } = useI18n();
  const weeks = [1, 2, 3].map((i) => ({
    title: t(`svc.ai-automation.hero.week${i}.title`),
    desc: t(`svc.ai-automation.hero.week${i}.desc`),
  }));
  return (
    <section data-anim-section="a-01" className="bg-background">
      <div className="section container-x pb-0!">
        <div data-anim="hero-breadcrumb">
          <ServiceBreadcrumb />
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <div>
            <p data-anim="hero-eyebrow" className="eyebrow">{t(service.heroEyebrowKey)}</p>
            <h1 data-anim="hero-title" className="display mt-6 max-w-3xl text-5xl text-foreground md:text-7xl">
              {t(service.heroTitleKey)}
            </h1>
          </div>
          <div className="lg:pt-16">
            <p data-anim="hero-lede" className="lead">{t(service.heroTaglineKey)}</p>
            <div data-anim="hero-actions" className="mt-8 flex flex-wrap gap-3">
              <CalendlyButton label={t("svc.shared.bookCall")} />
              <Link href="/packages" className="btn-secondary">
                {t("svc.shared.seePackages")}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <span
            data-anim="week-spine"
            className="absolute inset-x-0 top-16 h-px origin-left bg-hairline lg:top-20"
            aria-hidden="true"
          />
          <ol className="relative mt-16 grid gap-10 pt-2 md:grid-cols-3 md:gap-0 lg:mt-20">
            {weeks.map((w, i) => (
              <li key={w.title} data-anim="week-item" className="relative pt-7 md:pr-10">
                <span
                  data-anim="week-node"
                  className={cn(
                    "absolute left-0 top-[-5px] h-[9px] w-[9px] rounded-full",
                    i === 0 ? "bg-accent" : "bg-faint",
                  )}
                  aria-hidden="true"
                />
                <span
                  data-anim="week-tick"
                  className="absolute left-0 top-[-1px] h-[2px] w-16 origin-left bg-foreground"
                  aria-hidden="true"
                />
                <p data-anim="week-title" className="text-xl font-semibold tracking-[-0.02em] text-foreground">
                  {w.title}
                </p>
                <p data-anim="week-desc" className="mt-2 max-w-[26ch] text-[15px] leading-relaxed text-muted">
                  {w.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Sticky side nav + roadmap body. Scroll-spy highlights the section in view. */
export function AiBody() {
  const { t } = useI18n();
  const [active, setActive] = useState<string>(NAV[0].id);

  useEffect(() => {
    const sections = NAV.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-background">
      <div className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-20">
        <aside data-anim-section="a-02" className="hidden lg:block">
          <nav
            aria-label={t("svc.ai-automation.hero.eyebrow")}
            className="sticky top-28 border-l border-hairline"
          >
            {NAV.map(({ id, labelKey }) => (
              <a
                data-anim="rail-link"
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-2.5 pl-5 text-sm transition-colors",
                  active === id
                    ? "border-accent font-semibold text-foreground"
                    : "border-transparent text-muted hover:text-foreground",
                )}
              >
                {t(labelKey)}
              </a>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">
          <AiSymptoms />
          <AiRoadmap />
          <AiStack />
          <AiScoping />
        </div>
      </div>
    </div>
  );
}

/** Symptoms: two-column checklist beside a stacked heading. */
function AiSymptoms() {
  const { t } = useI18n();
  const items = [1, 2, 3, 4, 5, 6].map((i) => t(`svc.ai-automation.symptoms.${i}`));
  return (
    <section id="symptoms" data-anim-section="a-03" className="scroll-mt-28">
      <h2 data-anim="symp-title" className="h2 max-w-2xl text-4xl text-foreground md:text-5xl">
        {t("svc.ai-automation.symptoms.title")}
      </h2>
      <p data-anim="symp-intro" className="mt-5 max-w-[62ch] text-[17px] leading-[1.65] text-muted">
        {t("svc.ai-automation.symptoms.intro")}
      </p>
      <ul className="mt-10 grid gap-x-12 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            data-anim="symp-row"
            className="relative flex items-start gap-4 py-5"
          >
            <span
              data-anim="symp-line"
              className="absolute inset-x-0 top-0 h-px origin-left bg-hairline"
              aria-hidden="true"
            />
            <span data-anim="symp-check" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-hairline bg-surface">
              <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2} aria-hidden="true" />
            </span>
            <span data-anim="symp-text" className="text-[16px] leading-relaxed text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Roadmap: Day 1 to Day 21 phased timeline with deliverables per phase. */
function AiRoadmap() {
  const { t } = useI18n();
  const phases = [1, 2, 3, 4].map((i) => ({
    range: t(`svc.ai-automation.roadmap.phase${i}.range`),
    title: t(`svc.ai-automation.roadmap.phase${i}.title`),
    desc: t(`svc.ai-automation.roadmap.phase${i}.desc`),
    deliverables: [1, 2, 3].map((d) => t(`svc.ai-automation.roadmap.phase${i}.d${d}`)),
  }));
  return (
    <section id="roadmap" data-anim-section="a-04" className="mt-24 scroll-mt-28 md:mt-32">
      <h2 data-anim="roadmap-title" className="h2 max-w-3xl text-4xl text-foreground md:text-5xl">
        {t("svc.ai-automation.roadmap.title")}
      </h2>
      <p data-anim="roadmap-intro" className="mt-5 max-w-[62ch] text-[17px] leading-[1.65] text-muted">
        {t("svc.ai-automation.roadmap.intro")}
      </p>
      <div className="relative mt-12 h-[2px] w-full overflow-hidden rounded-full bg-hairline" aria-hidden="true">
        <span
          data-anim="roadmap-fill"
          className="absolute inset-0 origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <div className="mt-8">
        {phases.map((phase) => (
          <article
            key={phase.title}
            data-anim="phase"
            className="grid gap-6 border-t border-hairline py-10 md:grid-cols-[170px_minmax(0,1fr)] md:gap-12"
          >
              <div>
                <p data-anim="phase-range" className="stat-num text-sm font-semibold text-accent">{phase.range}</p>
                <h3 data-anim="phase-title" className="h3 mt-3 text-3xl text-foreground">{phase.title}</h3>
              </div>
              <div className="min-w-0">
                <p data-anim="phase-desc" className="max-w-[65ch] text-[16px] leading-[1.7] text-muted">
                  {phase.desc}
                </p>
                <ul className="mt-7 grid gap-5 sm:grid-cols-3 sm:gap-6">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="border-t-2 border-foreground pt-4">
                      <span className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Stack: prose sentence naming tools inline, then grouped tool sets. */
function AiStack() {
  const { t } = useI18n();
  const groups: { label: string; tools: string[] }[] = [
    { label: "Orchestration", tools: ["n8n", "Make", "Zapier"] },
    { label: "AI models", tools: ["Claude", "OpenAI"] },
    { label: "Connectors", tools: ["REST APIs", "Webhooks", "Slack", "Notion"] },
    { label: "Data", tools: ["PostgreSQL"] },
  ];
  return (
    <section id="stack" data-anim-section="a-05" className="mt-24 scroll-mt-28 md:mt-32">
      <h2 data-anim="stack-title" className="h2 max-w-2xl text-4xl text-foreground md:text-5xl">
        {t("svc.ai-automation.stack.title")}
      </h2>
      <p data-anim="stack-prose" className="mt-7 max-w-3xl text-xl leading-[1.65] text-foreground md:text-2xl md:leading-[1.55]">
        {t("svc.ai-automation.stack.prose")}
      </p>
      <div className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.label} data-anim="stack-group" className="border-t border-hairline pt-6">
              <p data-anim="stack-label" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {g.label}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.tools.map((tool) => (
                  <span
                    key={tool}
                    data-anim="chip"
                    className="rounded-lg border border-hairline bg-surface px-3.5 py-2 text-sm font-medium text-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Scoping pointer: split card, scope-fit language only, link to /packages. */
function AiScoping() {
  const { t } = useI18n();
  return (
    <section id="scoping" data-anim-section="a-06" className="mt-24 scroll-mt-28 md:mt-32">
      <div data-anim="scope-card" className="card relative grid gap-8 overflow-hidden p-8 md:p-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
          <span
            data-anim="scope-edge"
            className="absolute inset-x-0 top-0 h-[2px] origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
            aria-hidden="true"
          />
          <h2 data-anim="scope-title" className="h2 text-3xl text-foreground">
            {t("svc.ai-automation.pricing.title")}
          </h2>
          <div>
            <p data-anim="scope-desc" className="max-w-[62ch] text-xl leading-[1.6] text-foreground">
              {t("svc.ai-automation.pricing.desc")}
            </p>
            <Link
              data-anim="scope-link"
              href="/packages"
              className="mt-7 inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:underline"
            >
              {t("svc.ai-automation.pricing.cta")}
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
      </div>
    </section>
  );
}

/** CTA: offer card for the free 30-minute automation audit. */
export function AiCta() {
  const { t } = useI18n();
  const checklist = [1, 2, 3].map((i) => t(`svc.ai-automation.cta.a${i}`));
  return (
    <section data-anim-section="a-07" className="bg-background">
      <div className="container-x pb-24 pt-4 md:pb-32">
        <div data-anim="cta-card" className="card overflow-hidden">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="p-8 md:p-12">
                <h2 data-anim="cta-title" className="h2 max-w-2xl text-4xl text-foreground md:text-5xl">
                  {t("svc.ai-automation.cta.headline")}
                </h2>
                <p data-anim="cta-lede" className="lead mt-5">{t("svc.ai-automation.cta.sub")}</p>
                <ul className="mt-9 grid gap-6 sm:grid-cols-3">
                  {checklist.map((item) => (
                    <li key={item} data-anim="cta-check" className="border-t border-hairline pt-4">
                      <span className="flex items-start gap-2.5 text-[15px] leading-relaxed text-foreground">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center border-t border-hairline bg-surface p-8 md:p-10 lg:border-l lg:border-t-0">
                <div data-anim="cta-actions">
                  <CalendlyButton label={t("svc.ai-automation.cta.button")} />
                </div>
                <p data-anim="cta-fine" className="mt-5 text-sm leading-relaxed text-muted">
                  {t("svc.ai-automation.cta.fine")}
                </p>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
