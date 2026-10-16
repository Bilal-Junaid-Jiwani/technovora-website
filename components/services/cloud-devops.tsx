"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ServiceBreadcrumb, CalendlyButton, FaqAccordion } from "./shared";

/* ── Sections ────────────────────────────────────────────────────────── */

/**
 * Hero: copy left, schematic vertical pipeline right.
 * The diagram is illustrative only; hairline, monochrome, one accent node.
 */
export function CloudHero() {
  const { t } = useI18n();
  const steps = ["code", "build", "test", "deploy", "observe"];
  return (
    <section data-anim-section="c-01" className="bg-background">
      <div className="section container-x pb-0!">
        <div data-anim="breadcrumb">
          <ServiceBreadcrumb />
        </div>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p data-anim="eyebrow" className="eyebrow">{t("svc2.cloud.hero.eyebrow")}</p>
            <h1 data-anim="title" className="display mt-5 max-w-3xl text-5xl text-foreground md:text-7xl">
              {t("svc2.cloud.hero.title")}
            </h1>
            <p data-anim="lede" className="lead mt-6 max-w-2xl">{t("svc2.cloud.hero.sub")}</p>
            <div data-anim="actions" className="mt-9 flex flex-wrap gap-3">
              <CalendlyButton label={t("svc2.cloud.hero.cta1")} />
              <Link href="/packages" className="btn-secondary">
                {t("svc2.cloud.hero.cta2")}
              </Link>
            </div>
          </div>
          <div>
            <figure data-anim="pipeline" className="card overflow-hidden">
              <div className="px-6 py-7 sm:px-8">
                <svg
                  data-anim="pipeline-svg"
                  viewBox="0 0 320 348"
                  className="mx-auto w-full max-w-[340px]"
                  role="img"
                  aria-label={t("svc2.cloud.hero.diagramCaption")}
                >
                  <defs>
                    <marker
                      id="cloud-pipe-arrow"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M0,0 L10,5 L0,10 z" className="fill-faint" />
                    </marker>
                  </defs>
                  {steps.map((step, i) => {
                    const y = 12 + i * 68;
                    const isAccent = step === "deploy";
                    return (
                      <g key={step} data-anim="node">
                        {i > 0 ? (
                          <line
                            x1="160"
                            y1={y - 24}
                            x2="160"
                            y2={y - 4}
                            className="stroke-faint"
                            strokeWidth="1.5"
                            markerEnd="url(#cloud-pipe-arrow)"
                          />
                        ) : null}
                        <rect
                          x="70"
                          y={y}
                          width="180"
                          height="44"
                          rx="10"
                          className={
                            isAccent
                              ? "fill-card stroke-accent"
                              : "fill-card stroke-hairline"
                          }
                          strokeWidth={isAccent ? "1.75" : "1"}
                        />
                        {isAccent ? (
                          <circle cx="92" cy={y + 22} r="4" className="fill-accent" />
                        ) : null}
                        <text
                          x="160"
                          y={y + 27}
                          textAnchor="middle"
                          className="fill-foreground text-[13px] font-semibold"
                        >
                          {step}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <figcaption data-anim="caption" className="border-t border-hairline bg-surface px-6 py-4 text-sm text-muted sm:px-8">
                {t("svc2.cloud.hero.diagramCaption")}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Risk register: numbered risk rows with mitigations. */
export function CloudRisks() {
  const { t } = useI18n();
  const rows = [1, 2, 3, 4].map((i) => ({
    risk: t(`svc2.cloud.risks.${i}.risk`),
    mitigation: t(`svc2.cloud.risks.${i}.mitigation`),
  }));
  return (
    <section data-anim-section="c-02" className="bg-background">
      <div className="section container-x">
        <div>
          <div className="max-w-2xl">
            <h2 data-anim="title" className="h2 text-4xl text-foreground md:text-5xl">
              {t("svc2.cloud.risks.title")}
            </h2>
            <p data-anim="lede" className="lead mt-5">{t("svc2.cloud.risks.desc")}</p>
          </div>
        </div>
        <div className="mt-12 overflow-hidden rounded-2xl border border-hairline">
          <div className="hidden grid-cols-[56px_1fr_1.35fr] gap-8 bg-surface px-8 py-4 md:grid">
            <span aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {t("svc2.cloud.risks.col.risk")}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {t("svc2.cloud.risks.col.mitigation")}
            </p>
          </div>
          {rows.map((row, i) => (
            <div key={row.risk} data-anim="row">
              <div className="grid gap-3 border-t border-hairline bg-card px-6 py-6 sm:px-8 md:grid-cols-[56px_1fr_1.35fr] md:gap-8">
                <span className="stat-num text-sm text-faint">{`0${i + 1}`}</span>
                <p className="text-[15px] font-medium leading-relaxed text-foreground">
                  {row.risk}
                </p>
                <p data-anim="mitigation" className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {row.mitigation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Small schematic per phase: hairline diagrams, one accent each. */
function PhaseDiagram({ index }: { index: number }) {
  if (index === 0) {
    // Audit: mapped points on a dashed survey line.
    return (
      <svg viewBox="0 0 200 64" className="h-16 w-full" aria-hidden="true">
        <line
          x1="14"
          y1="40"
          x2="186"
          y2="40"
          className="stroke-faint"
          strokeWidth="1.25"
          strokeDasharray="4 5"
        />
        {[34, 100, 166].map((cx) => (
          <rect
            key={cx}
            x={cx - 13}
            y="27"
            width="26"
            height="26"
            rx="6"
            className="fill-card stroke-muted"
            strokeWidth="1.25"
          />
        ))}
        <circle cx="100" cy="27" r="4" className="fill-accent" />
      </svg>
    );
  }
  if (index === 1) {
    // Automate: definition document flowing into a running block.
    return (
      <svg viewBox="0 0 200 64" className="h-16 w-full" aria-hidden="true">
        <rect
          x="16"
          y="12"
          width="38"
          height="40"
          rx="6"
          className="fill-card stroke-muted"
          strokeWidth="1.25"
        />
        <line x1="25" y1="24" x2="45" y2="24" className="stroke-faint" strokeWidth="1.5" />
        <line x1="25" y1="32" x2="45" y2="32" className="stroke-faint" strokeWidth="1.5" />
        <line x1="25" y1="40" x2="38" y2="40" className="stroke-faint" strokeWidth="1.5" />
        <line
          x1="66"
          y1="32"
          x2="112"
          y2="32"
          className="stroke-accent"
          strokeWidth="1.5"
        />
        <path d="M106,26 L114,32 L106,38 z" className="fill-accent" />
        <rect
          x="126"
          y="14"
          width="58"
          height="36"
          rx="8"
          className="fill-card stroke-muted"
          strokeWidth="1.25"
        />
        <circle cx="142" cy="32" r="4" className="fill-accent" />
        <line x1="152" y1="32" x2="172" y2="32" className="stroke-faint" strokeWidth="1.5" />
      </svg>
    );
  }
  if (index === 2) {
    // Observe: a monitored signal line with one flagged peak.
    return (
      <svg viewBox="0 0 200 64" className="h-16 w-full" aria-hidden="true">
        <line
          x1="12"
          y1="44"
          x2="188"
          y2="44"
          className="stroke-hairline"
          strokeWidth="1.25"
        />
        <polyline
          points="12,40 52,40 66,16 82,52 96,30 112,40 188,40"
          fill="none"
          className="stroke-muted"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="66" cy="16" r="4.5" className="fill-accent" />
      </svg>
    );
  }
  // Hand over: package moving across with a confirmation mark.
  return (
    <svg viewBox="0 0 200 64" className="h-16 w-full" aria-hidden="true">
      <rect
        x="16"
        y="16"
        width="46"
        height="32"
        rx="7"
        className="fill-card stroke-muted"
        strokeWidth="1.25"
      />
      <line
        x1="76"
        y1="32"
        x2="122"
        y2="32"
        className="stroke-faint"
        strokeWidth="1.5"
      />
      <path d="M116,26 L124,32 L116,38 z" className="fill-faint" />
      <circle
        cx="156"
        cy="32"
        r="19"
        className="fill-card stroke-accent"
        strokeWidth="1.5"
      />
      <path
        d="M147,32 L153,38 L165,25"
        fill="none"
        className="stroke-accent"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Phases: diagram-led cards, two by two. */
export function CloudPhases() {
  const { t } = useI18n();
  const phases = [1, 2, 3, 4].map((i) => ({
    title: t(`svc2.cloud.phases.${i}.title`),
    desc: t(`svc2.cloud.phases.${i}.desc`),
    diagram: t(`svc2.cloud.phases.${i}.diagram`),
  }));
  return (
    <section data-anim-section="c-03" className="band">
      <div className="section container-x">
        <div>
          <p data-anim="eyebrow" className="eyebrow">{t("svc2.cloud.phases.eyebrow")}</p>
          <h2 data-anim="title" className="h2 mt-4 max-w-2xl text-4xl text-foreground md:text-5xl">
            {t("svc2.cloud.phases.title")}
          </h2>
          <p data-anim="lede" className="lead mt-5 max-w-2xl">{t("svc2.cloud.phases.desc")}</p>
        </div>
        <ol data-anim="grid" className="mt-12 grid gap-6 md:grid-cols-2">
          {phases.map((phase, i) => (
            <div key={phase.title} data-anim="card" className="h-full">
              <li className="card card-hover flex h-full flex-col p-7 sm:p-8">
                <div className="rounded-xl border border-hairline bg-surface px-5 py-4">
                  <PhaseDiagram index={i} />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="h3 text-xl text-foreground">{phase.title}</h3>
                  <span className="stat-num text-sm text-accent">{`0${i + 1}`}</span>
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {phase.diagram}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{phase.desc}</p>
              </li>
            </div>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Reference architecture: offset layer stack beside descriptions. */
export function CloudLayers() {
  const { t } = useI18n();
  const layers = [1, 2, 3, 4].map((i) => ({
    name: t(`svc2.cloud.layers.${i}.name`),
    tool: t(`svc2.cloud.layers.${i}.tool`),
    desc: t(`svc2.cloud.layers.${i}.desc`),
  }));
  const offsets = ["md:ml-0", "md:ml-8", "md:ml-16", "md:ml-24"];
  return (
    <section data-anim-section="c-04" className="bg-background">
      <div className="section container-x">
        <div>
          <div className="max-w-2xl">
            <h2 data-anim="title" className="h2 text-4xl text-foreground md:text-5xl">
              {t("svc2.cloud.layers.title")}
            </h2>
            <p data-anim="lede" className="lead mt-5">{t("svc2.cloud.layers.desc")}</p>
          </div>
        </div>
        <div className="mt-12 space-y-4">
          {layers.map((layer, i) => (
            <div key={layer.name} data-anim="layer">
              <div
                className={`grid items-center gap-4 md:grid-cols-[1.1fr_1fr] md:gap-10 ${offsets[i]}`}
              >
                <div className="flex items-center justify-between gap-4 rounded-xl border border-hairline bg-card px-5 py-4 shadow-sm">
                  <p className="text-[15px] font-semibold text-foreground">{layer.name}</p>
                  <p className="flex items-center gap-3 text-sm text-muted">
                    {i === 1 ? (
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                        {t("svc2.cloud.hero.edgeCaption")}
                      </span>
                    ) : null}
                    {layer.tool}
                  </p>
                </div>
                <p className="text-[15px] leading-relaxed text-muted md:pl-2">{layer.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p data-anim="note" className="mt-8 flex items-start gap-2.5 text-sm text-muted">
            <ArrowRight
              className="mt-0.5 h-4 w-4 shrink-0 text-accent"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            {t("svc2.cloud.layers.note")}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Two ways to engage: project takes the wider column. */
export function CloudPricing() {
  const { t } = useI18n();
  const project = {
    title: t("svc2.cloud.pricing.project.title"),
    desc: t("svc2.cloud.pricing.project.desc"),
    points: [1, 2, 3].map((i) => t(`svc2.cloud.pricing.project.${i}`)),
  };
  const retainer = {
    title: t("svc2.cloud.pricing.retainer.title"),
    desc: t("svc2.cloud.pricing.retainer.desc"),
    points: [1, 2, 3].map((i) => t(`svc2.cloud.pricing.retainer.${i}`)),
  };
  return (
    <section data-anim-section="c-05" className="bg-background">
      <div className="section container-x pt-0!">
        <div>
          <div className="max-w-2xl">
            <h2 data-anim="title" className="h2 text-4xl text-foreground md:text-5xl">
              {t("svc2.cloud.pricing.title")}
            </h2>
          </div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <div data-anim="card" data-card="project" className="h-full">
            <div className="card card-hover flex h-full flex-col p-8 md:p-10">
              <h3 className="h3 text-2xl text-foreground">{project.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.desc}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-hairline pt-6">
                {project.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[15px] text-foreground"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CalendlyButton label={t("svc2.cloud.pricing.cardCta")} variant="secondary" />
              </div>
            </div>
          </div>
          <div data-anim="card" data-card="retainer" className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-hairline bg-surface p-8 md:p-10">
              <h3 className="h3 text-2xl text-foreground">{retainer.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{retainer.desc}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-hairline pt-6">
                {retainer.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[15px] text-foreground"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CalendlyButton label={t("svc2.cloud.pricing.cardCta")} variant="secondary" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p data-anim="note" className="mt-8 text-sm text-muted">
            {t("svc2.cloud.pricing.note")}{" "}
            <Link href="/packages" className="font-medium text-accent hover:underline">
              {t("svc2.cloud.pricing.cta")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/** FAQ accordion. */
export function CloudFaq() {
  const { t } = useI18n();
  const items = [1, 2, 3].map((i) => ({
    q: t(`svc.cloud-devops.faq.${i}.q`),
    a: t(`svc.cloud-devops.faq.${i}.a`),
  }));
  return (
    <section data-anim-section="c-06" className="bg-background">
      <div className="section container-x pt-0!">
        <div data-anim="faq" className="max-w-3xl">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}

/** CTA: free infrastructure audit, statement left and checklist right. */
export function CloudCta() {
  const { t } = useI18n();
  const checklist = [1, 2, 3, 4, 5].map((i) => t(`svc2.cloud.cta.${i}`));
  return (
    <section data-anim-section="c-07" className="band">
      <div className="section container-x">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p data-anim="eyebrow" className="eyebrow">{t("svc2.cloud.cta.eyebrow")}</p>
            <h2 data-anim="title" className="h2 mt-4 text-4xl text-foreground md:text-5xl">
              {t("svc2.cloud.cta.title")}
            </h2>
            <p data-anim="lede" className="lead mt-5 max-w-xl">{t("svc2.cloud.cta.desc")}</p>
            <div data-anim="actions" className="mt-9">
              <CalendlyButton label={t("svc2.cloud.cta.button")} />
            </div>
            <p data-anim="note" className="mt-5 text-sm text-muted">{t("svc2.cloud.cta.note")}</p>
          </div>
          <div>
            <div data-anim="card" className="card p-8 md:p-9">
              <h3 data-anim="list-title" className="h3 text-lg text-foreground">{t("svc2.cloud.cta.listTitle")}</h3>
              <ul className="mt-6 space-y-4">
                {checklist.map((item) => (
                  <li
                    key={item}
                    data-anim="item"
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground"
                  >
                    <span
                      data-anim="chip"
                      className="relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-soft"
                    >
                      <span
                        data-anim="fill"
                        aria-hidden="true"
                        className="absolute inset-0 bg-accent"
                        style={{ transform: "scaleY(0)", transformOrigin: "50% 100%" }}
                      />
                      <Check
                        data-anim="check"
                        className="relative h-3.5 w-3.5 text-accent"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                    {item}
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
