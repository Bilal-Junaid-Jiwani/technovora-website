"use client";

import { useI18n } from "@/lib/i18n";

/**
 * ContactHero - spare, confident header.
 * Headline plus the plain response-time promise; the split section below
 * carries the form and every channel. Left-aligned, one idea only.
 * Animation: CT-01 X-Axis Char Cascade (see ContactAnimator).
 */
export function ContactHero() {
  const { t } = useI18n();
  return (
    <section data-anim-section="ct-01" className="container-x pt-24 md:pt-28">
      <div className="max-w-3xl">
        <p data-anim="hero-eyebrow" className="eyebrow">
          {t("contact3.hero.eyebrow")}
        </p>
        <h1
          data-anim="hero-title"
          className="display mt-5 max-w-[16ch] text-5xl text-foreground md:text-7xl"
        >
          {t("contact3.hero.title")}
        </h1>
        <p data-anim="hero-lede" className="lead mt-6 max-w-[58ch]">
          {t("contact3.hero.desc")}
        </p>
      </div>
    </section>
  );
}
