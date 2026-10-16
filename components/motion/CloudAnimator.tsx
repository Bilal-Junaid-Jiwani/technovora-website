"use client";

/**
 * CloudAnimator — GSAP setup for /services/cloud-devops.
 * Registry: ANIMATION-REGISTRY.md, /services/cloud-devops C-01..C-07.
 *
 * One unique mechanic per section, never repeated anywhere on the site:
 *   C-01 Pipeline Stroke Draw  · C-02 Diagonal Row Wipe
 *   C-03 Tilt Settle Cards     · C-04 Stack Assembly
 *   C-05 Split-Apart Cards     · C-06 Divider Cascade
 *   C-07 Fill-Up Checklist
 * No plain fade / fade-up / flip anywhere. Reduced-motion: the useAnimator
 * hook creates nothing, so SSR markup stands as the final state.
 */
import type { ReactNode } from "react";
import { gsap, SplitText, EASE, DUR, ENTER } from "@/lib/motion";
import type { AnimSetup } from "@/lib/motion/useAnimator";
import { Animator } from "@/components/motion/Animator";

/** Client wrapper so the server page can hand its sections to the animator. */
export function CloudAnimator({ children }: { children: ReactNode }) {
  return <Animator setup={cloudSetup}>{children}</Animator>;
}

export const cloudSetup: AnimSetup = ({ scope, conditions }) => {
  const { isDesktop } = conditions;
  const root = gsap.utils.selector(scope);
  const section = (id: string): HTMLElement | null =>
    (root(`[data-anim-section="${id}"]`)[0] as HTMLElement | undefined) ?? null;
  const lat = (desktop: number, mobile: number) => (isDesktop ? desktop : mobile);

  /* ── C-01 CloudHero — Pipeline Stroke Draw (LOAD + SCRUB) ─────────────
     The headline rises in a block mask first (load); then the schematic
     pipeline's strokes draw themselves with a short scroll scrub,
     each node popping as its path completes. */
  const hero = section("c-01");
  if (hero) {
    const hq = gsap.utils.selector(hero);
    const breadcrumb = hq('[data-anim="breadcrumb"]')[0] as HTMLElement | undefined;
    const eyebrow = hq('[data-anim="eyebrow"]')[0] as HTMLElement | undefined;
    const title = hq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const lede = hq('[data-anim="lede"]')[0] as HTMLElement | undefined;
    const actions = hq('[data-anim="actions"]')[0] as HTMLElement | undefined;
    const pipeline = hq('[data-anim="pipeline"]')[0] as HTMLElement | undefined;
    const caption = hq('[data-anim="caption"]')[0] as HTMLElement | undefined;
    const svg = hq('[data-anim="pipeline-svg"]')[0] as unknown as SVGSVGElement | undefined;
    const nodes = hq('[data-anim="node"]') as unknown as SVGGElement[];

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
    if (pipeline) {
      tl.fromTo(
        pipeline,
        { y: 28 },
        { y: 0, duration: DUR.slow, ease: EASE.settle },
        0.4,
      );
    }
    if (caption) {
      tl.fromTo(caption, { y: 10 }, { y: 0, duration: DUR.fast }, 0.8);
    }

    if (svg && nodes.length) {
      const draw = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top 92%",
          end: "bottom 45%",
          scrub: 0.6,
          refreshPriority: 2,
        },
      });
      let pos = 0;
      nodes.forEach((node) => {
        const shapes = Array.from(
          node.querySelectorAll<SVGGeometryElement>("line, rect"),
        );
        shapes.forEach((shape) => {
          let len = 0;
          try {
            len = shape.getTotalLength();
          } catch {
            len = 0;
          }
          if (len > 0) {
            gsap.set(shape, { strokeDasharray: len, strokeDashoffset: len });
            draw.to(shape, { strokeDashoffset: 0, duration: 1, ease: "none" }, pos);
            pos += 1;
          }
        });
        draw.fromTo(
          node,
          { scale: 0.85, transformOrigin: "50% 50%" },
          { scale: 1, duration: 0.5, ease: EASE.pop },
          Math.max(pos - 0.3, 0),
        );
      });
    }
  }

  /* ── C-02 CloudRisks — Diagonal Row Wipe (PLAY) ───────────────────────
     Risk rows reveal behind a diagonal clip polygon whose slanted
     leading edge sweeps left→right; mitigation text settles in
     behind the edge, staggered by row. */
  const risks = section("c-02");
  if (risks) {
    const rq = gsap.utils.selector(risks);
    const title = rq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const lede = rq('[data-anim="lede"]')[0] as HTMLElement | undefined;
    const rows = rq('[data-anim="row"]') as HTMLElement[];
    const mitigations = rq('[data-anim="mitigation"]') as HTMLElement[];

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: risks,
        start: ENTER,
        once: true,
        refreshPriority: 3,
      },
    });
    if (title) {
      tl.fromTo(title, { x: lat(-24, -12) }, { x: 0, duration: DUR.base }, 0);
    }
    if (lede) {
      tl.fromTo(lede, { y: 16 }, { y: 0, duration: DUR.base }, 0.1);
    }
    if (rows.length) {
      tl.fromTo(
        rows,
        { clipPath: "polygon(0% 0%, 0% 0%, -12% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 112% 0%, 100% 100%, 0% 100%)",
          duration: DUR.slow,
          ease: EASE.inOut,
          stagger: 0.12,
          clearProps: "clipPath",
        },
        0.15,
      );
    }
    if (mitigations.length) {
      tl.fromTo(
        mitigations,
        { x: lat(18, 10) },
        { x: 0, duration: DUR.base, stagger: 0.12 },
        0.5,
      );
    }
  }

  /* ── C-03 CloudPhases — Tilt Settle Cards (PLAY) ──────────────────────
     Phase cards settle from rotationX 10° + y 32 under a perspective
     parent. Only the card wrappers move — the small diagram SVGs
     inside stay static (stroke-draw belongs to C-01). */
  const phases = section("c-03");
  if (phases) {
    const pq = gsap.utils.selector(phases);
    const eyebrow = pq('[data-anim="eyebrow"]')[0] as HTMLElement | undefined;
    const title = pq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const lede = pq('[data-anim="lede"]')[0] as HTMLElement | undefined;
    const grid = pq('[data-anim="grid"]')[0] as HTMLElement | undefined;
    const cards = pq('[data-anim="card"]') as HTMLElement[];

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: phases,
        start: ENTER,
        once: true,
        refreshPriority: 4,
      },
    });
    if (grid) gsap.set(grid, { perspective: 1000 });
    if (eyebrow) {
      tl.fromTo(eyebrow, { x: lat(-14, -8) }, { x: 0, duration: DUR.fast }, 0);
    }
    if (title) {
      tl.fromTo(title, { x: lat(-24, -12) }, { x: 0, duration: DUR.base }, 0.05);
    }
    if (lede) {
      tl.fromTo(lede, { y: 16 }, { y: 0, duration: DUR.base }, 0.15);
    }
    if (cards.length) {
      gsap.set(cards, { willChange: "transform" });
      tl.fromTo(
        cards,
        { rotationX: 10, y: 32, transformOrigin: "50% 100%" },
        {
          rotationX: 0,
          y: 0,
          duration: DUR.slow,
          ease: EASE.settle,
          stagger: 0.1,
        },
        0.2,
      );
    }
  }

  /* ── C-04 CloudLayers — Stack Assembly (PLAY) ─────────────────────────
     The DNS→CDN→App→DB layers arrive from staggered y offsets
     (−18px × index) with a slight rotation and land in stack order
     on the settle ease — a soft landing, never a bounce. */
  const layersSec = section("c-04");
  if (layersSec) {
    const lq = gsap.utils.selector(layersSec);
    const title = lq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const lede = lq('[data-anim="lede"]')[0] as HTMLElement | undefined;
    const layers = lq('[data-anim="layer"]') as HTMLElement[];
    const note = lq('[data-anim="note"]')[0] as HTMLElement | undefined;

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: layersSec,
        start: ENTER,
        once: true,
        refreshPriority: 5,
      },
    });
    if (title) {
      tl.fromTo(title, { x: lat(-24, -12) }, { x: 0, duration: DUR.base }, 0);
    }
    if (lede) {
      tl.fromTo(lede, { y: 16 }, { y: 0, duration: DUR.base }, 0.1);
    }
    if (layers.length) {
      tl.fromTo(
        layers,
        {
          y: (i: number) => -18 * (i + 1),
          rotation: (i: number) => (i % 2 === 0 ? -1.2 : 1.2),
        },
        {
          y: 0,
          rotation: 0,
          duration: DUR.slow,
          ease: EASE.settle,
          stagger: 0.12,
        },
        0.15,
      );
    }
    if (note) {
      tl.fromTo(note, { x: lat(14, 8) }, { x: 0, duration: DUR.base }, 0.75);
    }
  }

  /* ── C-05 CloudPricing — Split-Apart Cards (PLAY) ─────────────────────
     Project and Retainer start overlapped at the centre (xPercent
     ∓12, moving inward so no overflow is possible) and split apart
     into their grid positions; the pricing pointer rises in a mask
     after the split. On mobile's single column the pair settles
     vertically instead of splitting. */
  const pricing = section("c-05");
  if (pricing) {
    const pq = gsap.utils.selector(pricing);
    const title = pq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const project = pq('[data-card="project"]')[0] as HTMLElement | undefined;
    const retainer = pq('[data-card="retainer"]')[0] as HTMLElement | undefined;
    const note = pq('[data-anim="note"]')[0] as HTMLElement | undefined;

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: pricing,
        start: ENTER,
        once: true,
        refreshPriority: 6,
      },
    });
    if (title) {
      tl.fromTo(title, { x: lat(-24, -12) }, { x: 0, duration: DUR.base }, 0);
    }
    if (isDesktop && project && retainer) {
      tl.fromTo(
        project,
        { xPercent: 12 },
        { xPercent: 0, duration: DUR.slow, ease: EASE.settle },
        0.15,
      ).fromTo(
        retainer,
        { xPercent: -12 },
        { xPercent: 0, duration: DUR.slow, ease: EASE.settle },
        0.15,
      );
    } else {
      const stacked = [project, retainer].filter(
        (el): el is HTMLElement => Boolean(el),
      );
      if (stacked.length) {
        tl.fromTo(
          stacked,
          { y: 24 },
          { y: 0, duration: DUR.base, stagger: 0.1 },
          0.15,
        );
      }
    }
    if (note) {
      tl.fromTo(
        note,
        { y: 12, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: DUR.base,
          clearProps: "clipPath",
        },
        0.8,
      );
    }
  }

  /* ── C-06 CloudFaq — Divider Cascade (PLAY) ───────────────────────────
     Entrance only: FAQ row hairlines draw left→right (row clip),
     staggered down the list, and question text settles behind each
     divider. The accordion's open/close behaviour is the shared
     component's own and is never GSAP-driven (contrast H-07).
     Rows are reached by structure inside the section scope — the
     shared FaqAccordion markup itself is untouched. */
  const faqSec = section("c-06");
  if (faqSec) {
    const fq = gsap.utils.selector(faqSec);
    const faq = fq('[data-anim="faq"]')[0] as HTMLElement | undefined;
    const list = faq?.firstElementChild as HTMLElement | undefined;
    const rows = list ? (Array.from(list.children) as HTMLElement[]) : [];
    const questions = rows
      .map((row) => row.querySelector<HTMLElement>("button span:first-child"))
      .filter((el): el is HTMLElement => Boolean(el));

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: faqSec,
        start: ENTER,
        once: true,
        refreshPriority: 7,
      },
    });
    if (rows.length) {
      tl.fromTo(
        rows,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: DUR.base,
          ease: EASE.inOut,
          stagger: 0.1,
          clearProps: "clipPath",
        },
        0,
      );
    }
    if (questions.length) {
      tl.fromTo(
        questions,
        { x: lat(12, 6) },
        { x: 0, duration: DUR.base, stagger: 0.1 },
        0.12,
      );
    }
  }

  /* ── C-07 CloudCta — Fill-Up Checklist (PLAY) ─────────────────────────
     Each audit checklist chip fills accent (inner scaleY 0→1) in
     sequence while the item slides x 14→0 and its check turns white
     on the fill; the CTA button rises in a mask last. */
  const cta = section("c-07");
  if (cta) {
    const cq = gsap.utils.selector(cta);
    const eyebrow = cq('[data-anim="eyebrow"]')[0] as HTMLElement | undefined;
    const title = cq('[data-anim="title"]')[0] as HTMLElement | undefined;
    const lede = cq('[data-anim="lede"]')[0] as HTMLElement | undefined;
    const actions = cq('[data-anim="actions"]')[0] as HTMLElement | undefined;
    const note = cq('[data-anim="note"]')[0] as HTMLElement | undefined;
    const card = cq('[data-anim="card"]')[0] as HTMLElement | undefined;
    const items = cq('[data-anim="item"]') as HTMLElement[];

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: {
        trigger: cta,
        start: ENTER,
        once: true,
        refreshPriority: 8,
      },
    });
    if (eyebrow) {
      tl.fromTo(eyebrow, { x: lat(-14, -8) }, { x: 0, duration: DUR.fast }, 0);
    }
    if (title) {
      tl.fromTo(title, { y: 22 }, { y: 0, duration: DUR.base }, 0.05);
    }
    if (lede) {
      tl.fromTo(lede, { y: 16 }, { y: 0, duration: DUR.base }, 0.15);
    }
    if (note) {
      tl.fromTo(note, { y: 10 }, { y: 0, duration: DUR.fast }, 0.25);
    }
    if (card) {
      tl.fromTo(
        card,
        { y: 24 },
        { y: 0, duration: DUR.slow, ease: EASE.settle },
        0.1,
      );
    }
    items.forEach((item, i) => {
      const iq = gsap.utils.selector(item);
      const fill = iq('[data-anim="fill"]')[0] as HTMLElement | undefined;
      const check = iq('[data-anim="check"]')[0] as unknown as SVGElement | undefined;
      const pos = 0.45 + i * 0.22;
      if (fill) {
        tl.to(
          fill,
          {
            scaleY: 1,
            transformOrigin: "50% 100%",
            duration: 0.45,
            ease: EASE.inOut,
          },
          pos,
        );
      }
      if (check) {
        tl.to(check, { color: "#ffffff", duration: 0.25 }, pos + 0.25);
      }
      tl.fromTo(item, { x: lat(14, 7) }, { x: 0, duration: DUR.base }, pos);
    });
    if (actions) {
      tl.fromTo(
        actions,
        { y: 16, clipPath: "inset(100% 0 0 0)" },
        {
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: DUR.base,
          clearProps: "clipPath",
        },
        0.45 + items.length * 0.22 + 0.1,
      );
    }
  }
};
