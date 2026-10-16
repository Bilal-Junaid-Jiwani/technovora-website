"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ARTICLES } from "./articles";

/**
 * ArticleGrid — the essay index (round 3).
 * Date-led hairline rows: season and reading time lead, then topic,
 * title and standfirst. The featured essay is shown above and excluded
 * here to avoid duplication. Rows stay flush; a hover wash and arrow
 * mark the link, nothing more.
 * Animation: B-03 Date-First Rows (see BlogAnimator).
 */
export function ArticleGrid() {
  const { t } = useI18n();
  const rest = ARTICLES.slice(1);

  return (
    <section data-anim-section="b-03" className="border-t border-hairline bg-background">
      <div className="container-x pb-20 pt-2 md:pb-28">
        {rest.map((article) => (
          <Link
            key={article.slug}
            data-anim="row"
            href={`/blog/${article.slug}`}
            className="group grid gap-3 border-b border-hairline py-10 transition-colors hover:bg-surface md:grid-cols-[170px_1fr_auto] md:items-start md:gap-12 md:px-4"
          >
            <span data-anim="date" className="shrink-0 text-sm leading-relaxed text-muted">
              {t(article.seasonKey)}
              <br />
              <span className="text-faint">{t(article.readKey)}</span>
            </span>
            <span data-anim="row-body" className="block">
              <span className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-accent">
                {t(article.topicKey)}
              </span>
              <span className="h2 mt-3 block text-2xl text-foreground transition-colors group-hover:text-accent md:text-[1.75rem]">
                {t(article.titleKey)}
              </span>
              <span className="mt-3 block max-w-2xl leading-relaxed text-muted">
                {t(article.descKey)}
              </span>
            </span>
            <ArrowUpRight
              className="hidden h-5 w-5 shrink-0 self-center text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
