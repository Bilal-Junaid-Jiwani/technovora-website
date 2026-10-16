"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const SLUGS = [
  "ai-automation",
  "web-development",
  "mobile-apps",
  "cloud-devops",
  "design",
  "smm",
] as const;

const KEY: Record<(typeof SLUGS)[number], string> = {
  "ai-automation": "ai",
  "web-development": "web",
  "mobile-apps": "mobile",
  "cloud-devops": "cloud",
  design: "design",
  smm: "smm",
};

/**
 * Stripe-style product directory (registry /services #2, executed as a
 * directory rather than stacked image bands so the index stays scannable):
 * six full-row links. Index number and title sit left, the plain-spoken
 * description runs in its own column, and the whole row is the link.
 * Animated by ServicesIndexAnimator (S-02 Alternating Edge Panels); each
 * row's bottom hairline is an animatable span drawn on arrival.
 */
export function ServiceDirectory() {
  const { t } = useI18n();

  return (
    <section data-anim-section="s-02" className="bg-background">
      <div className="container-x pt-4 pb-24 md:pb-32">
        <div>
          <h2
            data-anim="heading"
            className="h2 max-w-2xl text-4xl text-foreground md:text-5xl"
          >
            {t("servicesidx.bands.heading")}
          </h2>
        </div>

        <div className="mt-12 border-t border-hairline md:mt-16">
          {SLUGS.map((slug, i) => {
            const k = KEY[slug];
            return (
              <Link
                data-anim="band"
                key={slug}
                href={`/services/${slug}`}
                className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-2 px-2 py-7 transition-colors duration-200 hover:bg-surface md:grid-cols-[4rem_minmax(0,5fr)_minmax(0,6fr)_auto] md:items-center md:gap-x-8 md:px-4 md:py-9"
              >
                <span
                  data-anim="band-inner"
                  className="stat-num text-sm text-faint transition-colors group-hover:text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  data-anim="band-inner"
                  className="h3 text-[22px] text-foreground md:text-[26px]"
                >
                  {t(`servicesidx.bands.${k}.title`)}
                </span>
                <span
                  data-anim="band-inner"
                  className="col-span-3 text-[15px] leading-relaxed text-muted md:col-span-1 md:text-base"
                >
                  {t(`servicesidx.bands.${k}.desc`)}
                </span>
                <span
                  data-anim="band-inner"
                  className="row-span-2 inline-flex items-center gap-2 self-center text-sm font-medium whitespace-nowrap text-muted transition-colors group-hover:text-accent md:row-span-1"
                >
                  <span className="hidden lg:inline">
                    {t("servicesidx.bands.link")}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <span
                  data-anim="hairline"
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full origin-left bg-hairline"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
