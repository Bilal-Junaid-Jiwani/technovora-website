"use client";

import { useI18n } from "@/lib/i18n";

const POINTS = [1, 2, 3];

/**
 * MethodNote — the honesty note (round 3), kept and made plainer.
 * A ruled document block, not a card: the note reads first, the three
 * commitments follow as a plain list, and the "details on request" line
 * closes with the real sales address. Nothing here blurs the fact that
 * the work above is shown as anonymized examples.
 */
export function MethodNote() {
  const { t } = useI18n();
  return (
    <section data-anim-section="pf-05" className="container-x pb-24 md:pb-32">
      <div>
        <div className="relative mx-auto max-w-3xl px-1 py-1">
          <span aria-hidden data-anim="frame-edge" data-edge="top" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/50" />
          <span aria-hidden data-anim="frame-edge" data-edge="right" className="pointer-events-none absolute inset-y-0 right-0 w-px bg-accent/50" />
          <span aria-hidden data-anim="frame-edge" data-edge="bottom" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-accent/50" />
          <span aria-hidden data-anim="frame-edge" data-edge="left" className="pointer-events-none absolute inset-y-0 left-0 w-px bg-accent/50" />
          <div data-anim="method-text">
          <div className="rule pt-12">
            <h2 className="h2 text-3xl text-foreground md:text-4xl">
              {t("portfolio.method.title")}
            </h2>
            <p className="lead mt-5">{t("portfolio.method.note")}</p>
          </div>
          <ul className="mt-4">
            {POINTS.map((n) => (
              <li key={n} className="rule flex gap-5 py-5">
                <span className="display shrink-0 text-sm text-accent">
                  0{n}
                </span>
                <p className="leading-relaxed text-muted">
                  {t(`portfolio.method.${n}`)}
                </p>
              </li>
            ))}
          </ul>
          <p className="rule pt-6 text-muted">
            {t("portfolio.method.request")}{" "}
            <a
              href={`mailto:${t("common.email.sales")}`}
              className="font-semibold text-foreground underline decoration-hairline underline-offset-4 transition-colors hover:text-accent"
            >
              {t("common.email.sales")}
            </a>
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
