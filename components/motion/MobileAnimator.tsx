"use client";

/**
 * MobileAnimator — GSAP setup for /services/mobile-apps.
 * Registry: ANIMATION-REGISTRY.md, /services/mobile-apps M-01..M-06.
 *
 * One unique mechanic per section, never repeated anywhere on the site:
 *   M-01 Triptych Fan          · M-02 Drop-Cap & Pop List
 *   M-03 Vine Growth (scrub)   · M-04 Statement Ledger
 *   M-05 Grid Rebuild          · M-06 Centre Bloom
 * No plain fade / fade-up / flip anywhere. Reduced-motion: the useAnimator
 * hook creates nothing, so SSR markup stands as the final state.
 */
import type { ReactNode } from "react";
import { gsap, SplitText, EASE, DUR, ENTER } from "@/lib/motion";
import type { AnimSetup } from "@/lib/motion/useAnimator";
import { Animator } from "@/components/motion/Animator";

/** Client wrapper so the server page can hand its sections to the animator. */
export function MobileAnimator({ children }: { children: ReactNode }) {
  return <Animator setup={mobileSetup}>{children}</Animator>;
}

export const mobileSetup: AnimSetup = ({ scope, conditions }) => {
  const { isDesktop } = conditions;
  const root = gsap.utils.selector(scope);
  const section = (id: string): HTMLElement | null =>
    (root(`[data-anim-section="${id}"]`)[0] as HTMLElement | undefined) ?? null;
  const lat = (desktop: number, mobile: number) => (isDesktop ? desktop : mobile);

  /* ── M-01 MobileHero — Triptych Fan (LOAD) ────────────────────────────
     Headline lines rise inside SplitText line masks while the three
     joined panels fan from centre (0 / ∓14° desktop, ∓7° mobile) under a
     shared perspective and settle flat into the triptych. */
  const hero = section("m-01");
  if (hero) {
    const hq = gsap.utils.selector(hero);
    const breadcrumb = hq('[data-anim="breadcrumb"]')[0] as HTMLElement | undefined;
    const eyebrow = hq('[data-anim="eyebrow"]')[0] as HTMLElement | undefined;
    const title = hq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const lede = hq('[data-anim="lede"]')[0] as HTMLElement | undefined;
    const actions = hq('[data-anim="actions"]')[0] as HTMLElement | undefined;
    const triptych = hq('[data-anim="triptych"]')[0] as HTMLElement | undefined;
    const panels = hq('[data-anim="panel"]') as HTMLElement[];
    const fan = isDesktop ? 14 : 7;

    if (triptych) gsap.set(triptych, { perspective: 1200 });

    const tl = gsap.timeline({ defaults: { ease: EASE.out } });
    if (breadcrumb) {
      tl.fromTo(breadcrumb, { x: lat(-16, -8) }, { x: 0, duration: DUR.fast }, 0);
    }
    if (eyebrow) {
      tl.fromTo(eyebrow, { y: 14 }, { y: 0, duration: DUR.fast }, 0.05);
    }
    if (title) {
      const split = new SplitText(title, { type: "lines", mask: "lines" });
      const lines = split.lines ?? [];
      if (lines.length) {
        tl.fromTo(
          lines,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: DUR.hero,
            stagger: 0.09,
            onComplete: () => split.revert(),
          },
          0.1,
        );
      }
    }
    if (lede) {
      tl.fromTo(lede, { y: 20 }, { y: 0, duration: DUR.base }, 0.45);
    }
    if (actions) {
      tl.fromTo(actions, { y: 16 }, { y: 0, duration: DUR.base }, 0.55);
    }
    if (panels.length) {
      gsap.set(panels, { willChange: "transform" });
      tl.fromTo(
        panels,
        {
          rotationY: (i: number) => (i === 0 ? fan : i === 2 ? -fan : 0),
          y: 28,
          transformOrigin: (i: number) =>
            i === 0 ? "100% 50%" : i === 2 ? "0% 50%" : "50% 50%",
        },
        {
          rotationY: 0,
          y: 0,
          duration: DUR.slow,
          ease: EASE.settle,
          stagger: 0.1,
        },
        0.5,
      );
    }
  }

  /* ── M-02 MobileChallenge — Drop-Cap & Pop List (PLAY) ────────────────
     The narrative's first letter scales 2.4→1 into place (SplitText
     first char, reverted on complete); the pain list pops in scale. */
  const challenge = section("m-02");
  if (challenge) {
    const cq = gsap.utils.selector(challenge);
    const title = cq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const body1 = cq('[data-anim="body1"]')[0] as HTMLElement | undefined;
    const body2 = cq('[data-anim="body2"]')[0] as HTMLElement | undefined;
    const items = cq('[data-anim="item"]') as HTMLElement[];

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: challenge,
        start: ENTER,
        once: true,
        refreshPriority: 2,
      },
    });
    if (title) {
      tl.fromTo(
        title,
        { x: lat(-24, -12) },
        { x: 0, duration: DUR.base },
        0,
      );
    }
    if (body1) {
      const split = new SplitText(body1, { type: "words, chars" });
      const firstChar = split.chars?.[0] as HTMLElement | undefined;
      if (firstChar) {
        gsap.set(firstChar, { scale: 2.4, transformOrigin: "0% 100%" });
        tl.to(
          firstChar,
          {
            scale: 1,
            duration: DUR.slow,
            ease: EASE.settle,
            onComplete: () => split.revert(),
          },
          0.1,
        );
      }
    }
    if (body2) {
      tl.fromTo(body2, { y: 16 }, { y: 0, duration: DUR.base }, 0.35);
    }
    if (items.length) {
      tl.fromTo(
        items,
        { scale: 0.8, transformOrigin: "0% 50%" },
        {
          scale: 1,
          duration: DUR.base,
          ease: EASE.pop,
          stagger: 0.08,
        },
        0.4,
      );
    }
  }

  /* ── M-03 MobilePartnership — Vine Growth (SCRUB) ─────────────────────
     A vertical connector grows scaleY down the week rows with scroll;
     each row's label slides in and its text ink deepens as the vine
     reaches it. The section header plays once on enter. */
  const partnership = section("m-03");
  if (partnership) {
    const pq = gsap.utils.selector(partnership);
    const title = pq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const lede = pq('[data-anim="lede"]')[0] as HTMLElement | undefined;
    const weeksWrap = pq('[data-anim="weeks"]')[0] as HTMLElement | undefined;
    const vine = pq('[data-anim="vine"]')[0] as HTMLElement | undefined;
    const weeks = pq('[data-anim="week"]') as HTMLElement[];

    const headerTl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: partnership,
        start: ENTER,
        once: true,
        refreshPriority: 3,
      },
    });
    if (title) {
      headerTl.fromTo(title, { x: lat(-24, -12) }, { x: 0, duration: DUR.base }, 0);
    }
    if (lede) {
      headerTl.fromTo(lede, { y: 14 }, { y: 0, duration: DUR.base }, 0.12);
    }

    if (weeksWrap && weeks.length) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: weeksWrap,
          start: "top 78%",
          end: "bottom 55%",
          scrub: 0.8,
          refreshPriority: 4,
        },
      });
      if (vine) {
        tl.fromTo(
          vine,
          { scaleY: 0, transformOrigin: "50% 0%" },
          { scaleY: 1, duration: weeks.length, ease: "none" },
          0,
        );
      }
      weeks.forEach((row, i) => {
        const rq = gsap.utils.selector(row);
        const label = rq('[data-anim="label"]')[0] as HTMLElement | undefined;
        const body = rq('[data-anim="body"]')[0] as HTMLElement | undefined;
        if (label) {
          tl.fromTo(
            label,
            { x: lat(-16, -8) },
            { x: 0, duration: 0.5, ease: EASE.out },
            i + 0.1,
          );
        }
        if (body) {
          tl.fromTo(
            body,
            { opacity: 0.35 },
            { opacity: 1, duration: 0.5, ease: "none" },
            i + 0.1,
          );
        }
      });
    }
  }

  /* ── M-04 MobileImpact — Statement Ledger (PLAY) ──────────────────────
     Per statement: the accent rule draws scaleX, the statement text
     slides x 24→0 and its qualitative label counter-slides x −16→0 —
     text and label meet like ledger entries. */
  const impact = section("m-04");
  if (impact) {
    const iq = gsap.utils.selector(impact);
    const title = iq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const statements = iq('[data-anim="statement"]') as HTMLElement[];

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: impact,
        start: ENTER,
        once: true,
        refreshPriority: 5,
      },
    });
    if (title) {
      tl.fromTo(title, { x: lat(-24, -12) }, { x: 0, duration: DUR.base }, 0);
    }
    statements.forEach((item, i) => {
      const eq = gsap.utils.selector(item);
      const rule = eq('[data-anim="rule"]')[0] as HTMLElement | undefined;
      const label = eq('[data-anim="label"]')[0] as HTMLElement | undefined;
      const text = eq('[data-anim="text"]')[0] as HTMLElement | undefined;
      const base = 0.1 + i * 0.12;
      if (rule) {
        tl.fromTo(
          rule,
          { scaleX: 0, transformOrigin: "0% 50%" },
          { scaleX: 1, duration: 0.6 },
          base,
        );
      }
      if (text) {
        tl.fromTo(text, { x: lat(24, 12) }, { x: 0, duration: DUR.base }, base + 0.05);
      }
      if (label) {
        tl.fromTo(
          label,
          { x: lat(-16, -8) },
          { x: 0, duration: DUR.base },
          base + 0.1,
        );
      }
    });
  }

  /* ── M-05 MobilePlatforms — Grid Rebuild (PLAY) ───────────────────────
     Platform rows rebuild from a scattered grid state: scale 0.9→1 and
     y 24→0 with a centre-out grid stagger. */
  const platforms = section("m-05");
  if (platforms) {
    const pq = gsap.utils.selector(platforms);
    const title = pq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const cards = pq('[data-anim="card"]') as HTMLElement[];

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: platforms,
        start: ENTER,
        once: true,
        refreshPriority: 6,
      },
    });
    if (title) {
      tl.fromTo(title, { x: lat(-24, -12) }, { x: 0, duration: DUR.base }, 0);
    }
    if (cards.length) {
      tl.fromTo(
        cards,
        { scale: 0.9, y: 24 },
        {
          scale: 1,
          y: 0,
          duration: DUR.base,
          stagger: { grid: "auto", from: "center", amount: 0.4 },
        },
        0.1,
      );
    }
  }

  /* ── M-06 MobileCta — Centre Bloom (PLAY) ─────────────────────────────
     The thin meta rule blooms scaleX from a centre origin, the closing
     block scales 0.96→1 beneath it and the button lands with a
     restrained elastic pop. */
  const cta = section("m-06");
  if (cta) {
    const cq = gsap.utils.selector(cta);
    const rule = cq('[data-anim="rule"]')[0] as HTMLElement | undefined;
    const meta = cq('[data-anim="meta"]')[0] as HTMLElement | undefined;
    const block = cq('[data-anim="block"]')[0] as HTMLElement | undefined;
    const button = cq('[data-anim="button"]')[0] as HTMLElement | undefined;
    const fine = cq('[data-anim="fine"]')[0] as HTMLElement | undefined;

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: cta,
        start: ENTER,
        once: true,
        refreshPriority: 7,
      },
    });
    if (rule) {
      tl.fromTo(
        rule,
        { scaleX: 0, transformOrigin: "50% 50%" },
        { scaleX: 1, duration: DUR.slow, ease: EASE.inOut },
        0,
      );
    }
    if (meta) {
      tl.fromTo(meta, { y: 10 }, { y: 0, duration: DUR.fast }, 0.15);
    }
    if (block) {
      tl.fromTo(
        block,
        { scale: 0.96, transformOrigin: "50% 0%" },
        { scale: 1, duration: DUR.slow, ease: EASE.settle },
        0.2,
      );
    }
    if (button) {
      tl.fromTo(
        button,
        { scale: 0.85 },
        { scale: 1, duration: 0.9, ease: "elastic.out(1, 0.55)" },
        0.6,
      );
    }
    if (fine) {
      tl.fromTo(fine, { y: 10 }, { y: 0, duration: DUR.fast }, 0.85);
    }
  }
};
