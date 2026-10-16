"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ARTICLES } from "./articles";

/**
 * FeaturedArticle — the lead essay (round 3).
 * The journal's front page: topic and season as a quiet ledger line,
 * then the essay title at display scale and its standfirst. Typography
 * carries it — no card, no image, no panel.
 * Animation: B-02 Diagonal Panel Sweep (see BlogAnimator).
 */
export function FeaturedArticle() {
  const { t } = useI18n();
  const featured = ARTICLES[0];

  return (
    <section data-anim-section="b-02" className="bg-background">
      <div className="container-x py-16 md:py-24">
        <div data-anim="panel" className="max-w-3xl">
          <p
            data-anim="feat-meta"
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm"
          >
            <span className="font-semibold text-accent">
              {t("blog3.featured.label")}
            </span>
            <span className="text-muted">{t(featured.topicKey)}</span>
            <span className="text-faint">{t(featured.seasonKey)}</span>
            <span className="text-faint">{t(featured.readKey)}</span>
          </p>
          <Link href={`/blog/${featured.slug}`} className="group mt-7 block">
            <h2 className="display text-4xl text-foreground transition-colors group-hover:text-accent md:text-6xl">
              <span className="block overflow-hidden">
                <span data-anim="feat-title" className="block">
                  {t(featured.titleKey)}
                </span>
              </span>
            </h2>
            <p data-anim="feat-excerpt" className="lead mt-6 max-w-2xl">
              {t(featured.descKey)}
            </p>
            <span
              data-anim="feat-excerpt"
              className="mt-9 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-foreground"
            >
              {t("blog3.featured.read")}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
