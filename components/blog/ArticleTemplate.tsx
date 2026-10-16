"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { ArticleTag } from "./articles";
import { gsap, SplitText, EASE, DUR, ENTER } from "@/lib/motion";
import { useAnimator, type AnimSetup } from "@/lib/motion/useAnimator";

interface ArticleNav {
  slug: string;
  titleKey: string;
}

interface ArticleTemplateProps {
  topic: string;
  title: string;
  seasonKey: string;
  readTime: string;
  prev: ArticleNav | null;
  next: ArticleNav | null;
  children: ReactNode;
}

/**
 * Slim reading-progress bar fixed under the viewport top.
 * Position indicator, not decoration — no animation library.
 */
function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px]"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/**
 * Article animator (BA-01..BA-04) — runs inside the template so all
 * three article slugs inherit it. Registry: Standfirst Sequence ·
 * Ink Scrub Prose · Crossing Arrows · Ruled Parting.
 */
const articleSetup: AnimSetup = ({ scope, conditions }) => {
  const lat = (v: number) => (conditions.isMobile ? Math.round(v / 2) : v);
  const q = (sel: string) => scope.querySelector(sel) as HTMLElement | null;
  const ruleLine = (el: HTMLElement) =>
    gsap.set(el, {
      backgroundImage: "linear-gradient(var(--hairline), var(--hairline))",
      backgroundPosition: "0 0",
      backgroundRepeat: "no-repeat",
      backgroundSize: "0% 1px",
      borderTopColor: "transparent",
    });

  /* ── BA-01 Article hero · Standfirst Sequence (LOAD) ──────── */
  const heroSec = q('[data-anim-section="ba-01"]');
  if (heroSec) {
    const back = heroSec.querySelector(
      '[data-anim="back"]',
    ) as HTMLElement | null;
    const tag = heroSec.querySelector(
      '[data-anim="tag"]',
    ) as HTMLElement | null;
    const title = heroSec.querySelector(
      '[data-anim="title"]',
    ) as HTMLElement | null;
    const rule = heroSec.querySelector(
      '[data-anim="rule"]',
    ) as HTMLElement | null;
    const metaItems = Array.from(
      heroSec.querySelectorAll('[data-anim="meta-item"]'),
    ) as HTMLElement[];

    if (rule) ruleLine(rule);
    const tl = gsap.timeline({ defaults: { ease: EASE.settle } });
    if (back) tl.from(back, { x: lat(-12), duration: DUR.fast }, 0);
    if (tag)
      tl.from(tag, { scale: 0.6, duration: DUR.fast, ease: EASE.pop }, 0.08);
    if (title) {
      const split = SplitText.create(title, { type: "words", mask: "words" });
      if (split.words && split.words.length) {
        tl.from(
          split.words,
          {
            yPercent: 115,
            duration: DUR.slow,
            stagger: 0.04,
            onComplete: () => split.revert(),
          },
          0.14,
        );
      }
    }
    if (rule)
      tl.to(rule, { backgroundSize: "100% 1px", duration: DUR.slow }, 0.35);
    if (metaItems.length)
      tl.from(
        metaItems,
        { x: lat(12), duration: DUR.base, stagger: 0.09 },
        "-=0.6",
      );
  }

  /* ── BA-02 Prose body · Ink Scrub Prose (SCRUB) ───────────── */
  const prose = q('[data-anim="prose"]');
  if (prose) {
    /* Theme ink colour, read once (batched) — blocks deepen from a
       45% wash of the foreground to 80% (headings to full) as they
       cross the reading zone. Colour is this section's specialty
       channel; everything else stays transform-only. */
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--text")
      .trim();
    const hexMatch = /^#?([0-9a-f]{6})$/i.exec(raw);
    const [r, g, b] = hexMatch
      ? [
          parseInt(hexMatch[1].slice(0, 2), 16),
          parseInt(hexMatch[1].slice(2, 4), 16),
          parseInt(hexMatch[1].slice(4, 6), 16),
        ]
      : [14, 21, 38];

    const blocks = Array.from(
      prose.querySelectorAll(":scope > p, :scope > h2, :scope > ul"),
    ) as HTMLElement[];

    blocks.forEach((block, i) => {
      const isHeading = block.tagName === "H2";
      const endAlpha = isHeading ? 1 : 0.8;
      const st = {
        trigger: block,
        start: "top 90%",
        end: "top 38%",
        scrub: 0.6,
        refreshPriority: 10 + i,
      };
      gsap.fromTo(
        block,
        { color: `rgba(${r}, ${g}, ${b}, 0.45)` },
        {
          color: `rgba(${r}, ${g}, ${b}, ${endAlpha})`,
          ease: "none",
          scrollTrigger: st,
        },
      );
      if (isHeading) {
        /* Accent tick grows beside the heading as it activates.
           Visual only (aria-hidden), no copy change. */
        const tick = document.createElement("span");
        tick.setAttribute("aria-hidden", "true");
        tick.style.cssText =
          "display:inline-block;width:3px;height:0.82em;margin-right:0.55rem;border-radius:2px;background:var(--accent);vertical-align:-0.06em;transform-origin:center;";
        block.prepend(tick);
        gsap.fromTo(
          tick,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { ...st } },
        );
      }
    });
  }

  /* ── BA-03 Prev/Next · Crossing Arrows (PLAY) ─────────────── */
  const navSec = q('[data-anim-section="ba-03"]');
  if (navSec) {
    const prevBlock = navSec.querySelector(
      '[data-anim="prev"]',
    ) as HTMLElement | null;
    const nextBlock = navSec.querySelector(
      '[data-anim="next"]',
    ) as HTMLElement | null;
    gsap.set(navSec, { overflow: "hidden" });
    const tl = gsap.timeline({
      defaults: { ease: EASE.settle },
      scrollTrigger: {
        trigger: navSec,
        start: ENTER,
        once: true,
        refreshPriority: 90,
      },
    });
    if (prevBlock)
      tl.from(prevBlock, { x: lat(-28), duration: DUR.slow }, 0);
    if (nextBlock)
      tl.from(nextBlock, { x: lat(28), duration: DUR.slow }, 0);
  }

  /* ── BA-04 Closing CTA · Ruled Parting (PLAY) ─────────────── */
  const ctaSec = q('[data-anim-section="ba-04"]');
  if (ctaSec) {
    const band = ctaSec.querySelector(
      '[data-anim="cta-band"]',
    ) as HTMLElement | null;
    const titleCol = ctaSec.querySelector(
      '[data-anim="cta-title"]',
    ) as HTMLElement | null;
    const buttonCol = ctaSec.querySelector(
      '[data-anim="cta-button"]',
    ) as HTMLElement | null;
    if (band) ruleLine(band);
    const tl = gsap.timeline({
      defaults: { ease: EASE.settle },
      scrollTrigger: {
        trigger: ctaSec,
        start: ENTER,
        once: true,
        refreshPriority: 91,
      },
    });
    if (band)
      tl.to(band, { backgroundSize: "100% 1px", duration: DUR.slow }, 0);
    if (titleCol)
      tl.from(titleCol, { x: lat(-14), duration: DUR.base }, "-=0.6");
    if (buttonCol)
      tl.from(buttonCol, { x: lat(14), duration: DUR.base }, "<");
  }
};

/**
 * Shared layout for all article pages (round 3) — the journal's reading
 * room. Structure and hierarchy kept, presentation elevated: back link,
 * topic tag, display title, then a hairline meta ledger (author, season,
 * reading time). Prose measure stays ~70ch; the first paragraph reads as
 * a standfirst. Prev/next footer and the closing CTA close the essay.
 * Body prose is hardcoded in English in each article page file;
 * `.related-link` styles are preserved.
 */
export function ArticleTemplate({
  topic,
  title,
  seasonKey,
  readTime,
  prev,
  next,
  children,
}: ArticleTemplateProps) {
  const { t } = useI18n();
  const calendly = t("common.calendly");
  const animRef = useAnimator(articleSetup);

  return (
    <div ref={animRef} className="bg-background">
      <ReadingProgress />

      {/* Article hero */}
      <section
        data-anim-section="ba-01"
        className="container-x pb-14 pt-20 md:pb-20 md:pt-32"
        style={{ maxWidth: "47.5rem" }}
      >
        <Link
          data-anim="back"
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("blog3.article.back")}
        </Link>
        <div data-anim="tag" className="mt-12">
          <ArticleTag>{topic}</ArticleTag>
        </div>
        <h1
          data-anim="title"
          className="display mt-6 text-4xl text-foreground md:text-[3.4rem] md:leading-[1.06]"
        >
          {title}
        </h1>
        <div
          data-anim="rule"
          className="rule mt-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-5 text-sm"
        >
          <span data-anim="meta-item" className="font-medium text-foreground">
            {t("blog3.article.author")}
          </span>
          <span data-anim="meta-item" className="text-muted">
            {t(seasonKey)}
            <span className="mx-3 text-faint" aria-hidden="true">
              /
            </span>
            {readTime}
          </span>
        </div>
      </section>

      {/* Prose body */}
      <section
        data-anim-section="ba-02"
        className="container-x"
        style={{ maxWidth: "47.5rem" }}
      >
        <div
          data-anim="prose"
          className="pb-4 [&_h2]:h2 [&_h2]:mt-16 [&_h2]:text-[1.7rem] [&_h2]:text-foreground [&_li]:leading-[1.85] [&_li::marker]:text-accent [&_p]:mt-6 [&_p]:text-[1.0625rem] [&_p]:leading-[1.85] [&_p]:text-foreground/80 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mt-6 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6 [&_ul]:text-foreground/80 [&>p:first-of-type]:text-[1.3rem] [&>p:first-of-type]:leading-[1.65] [&>p:first-of-type]:text-foreground"
        >
          {children}
        </div>
      </section>

      {/* Prev / next */}
      {(prev || next) && (
        <section
          data-anim-section="ba-03"
          className="container-x py-14 md:py-20"
          style={{ maxWidth: "47.5rem" }}
        >
          <nav
            aria-label="More essays"
            className="rule grid gap-10 pt-12 sm:grid-cols-2"
          >
            <div data-anim="prev">
              {prev && (
                <Link href={`/blog/${prev.slug}`} className="group block">
                  <span className="inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    <ArrowLeft
                      className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                      aria-hidden="true"
                    />
                    {t("blog3.article.prev")}
                  </span>
                  <span className="h2 mt-3 block text-xl text-foreground transition-colors group-hover:text-accent">
                    {t(prev.titleKey)}
                  </span>
                </Link>
              )}
            </div>
            <div data-anim="next" className="sm:text-right">
              {next && (
                <Link href={`/blog/${next.slug}`} className="group block">
                  <span className="inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    {t("blog3.article.next")}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="h2 mt-3 block text-xl text-foreground transition-colors group-hover:text-accent">
                    {t(next.titleKey)}
                  </span>
                </Link>
              )}
            </div>
          </nav>
        </section>
      )}

      {/* Closing CTA — ruled band */}
      <section
        data-anim-section="ba-04"
        className="container-x pb-24 md:pb-32"
        style={{ maxWidth: "47.5rem" }}
      >
        <div
          data-anim="cta-band"
          className="rule flex flex-col gap-6 pt-12 md:flex-row md:items-center md:justify-between"
        >
          <div data-anim="cta-title">
            <h2 className="h2 text-xl text-foreground md:text-2xl">
              {t("blog3.article.cta.title")}
            </h2>
            <p className="mt-2 max-w-md leading-relaxed text-muted">
              {t("blog3.article.cta.desc")}
            </p>
          </div>
          <a
            data-anim="cta-button"
            href={calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0"
          >
            {t("blog3.article.cta.button")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
