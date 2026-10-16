"use client";

/**
 * SmmAnimator — GSAP setup for /services/smm.
 *
 * Registry rows SM-01..SM-06 (ANIMATION-REGISTRY.md). One unique mechanic
 * per section; nothing here is reused on any other page. All tweens are
 * created inside the shared useAnimator lifecycle (reduced-motion => setup
 * never runs, SSR markup is the final state).
 */
import type { ReactNode } from "react";
import { Animator } from "@/components/motion/Animator";
import type { AnimSetup } from "@/lib/motion/useAnimator";
import { gsap, SplitText, EASE, DUR, ENTER } from "@/lib/motion";

const setup: AnimSetup = ({ scope, conditions }) => {
  const lat = conditions.isMobile ? 0.5 : 1;
  const section = (id: string) =>
    scope.querySelector<HTMLElement>(`[data-anim-section="${id}"]`);
  const one = (root: HTMLElement, sel: string) =>
    root.querySelector<HTMLElement>(`[data-anim="${sel}"]`);
  const all = (root: HTMLElement, sel: string) =>
    gsap.utils.toArray<HTMLElement>(`[data-anim="${sel}"]`, root);

  /* ── SM-01 · SmmHero — Spine Sequence (LOAD) ────────────────────────── */
  const hero = section("sm-01");
  if (hero) {
    const tl = gsap.timeline({ defaults: { ease: EASE.out } });
    const crumb = one(hero, "crumb");
    if (crumb) tl.from(crumb, { x: -14 * lat, duration: DUR.fast }, 0);
    const eyebrow = one(hero, "eyebrow");
    if (eyebrow) tl.from(eyebrow, { x: -16 * lat, duration: DUR.fast }, 0.06);

    const title = one(hero, "title");
    if (title) {
      const split = SplitText.create(title, { type: "lines", mask: "lines" });
      tl.from(
        split.lines,
        {
          yPercent: 115,
          duration: DUR.hero,
          stagger: 0.08,
          onComplete: () => split.revert(),
        },
        0.12,
      );
    }
    const lede = one(hero, "lede");
    if (lede) tl.from(lede, { x: 22 * lat, duration: DUR.base }, 0.5);
    const actions = one(hero, "actions");
    if (actions) {
      tl.from(
        actions,
        { scale: 0.92, transformOrigin: "left center", duration: DUR.fast, ease: EASE.pop },
        0.62,
      );
    }
    const spineLine = one(hero, "spine-line");
    if (spineLine) {
      tl.from(spineLine, { scaleX: 0, duration: 0.9, ease: EASE.inOut }, 0.7);
    }
    all(hero, "chip").forEach((chip, i) => {
      tl.from(
        chip,
        {
          scale: 0.8,
          rotation: i === 1 ? 2.5 : -2.5,
          transformOrigin: "50% 25%",
          duration: 0.55,
          ease: EASE.pop,
        },
        0.85 + i * 0.16,
      );
    });
  }

  /* ── SM-02 · SmmTask — Typed Brief (PLAY) ───────────────────────────── */
  const task = section("sm-02");
  if (task) {
    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: task, start: ENTER, once: true, refreshPriority: 2 },
    });
    const eyebrow = one(task, "eyebrow");
    if (eyebrow) tl.from(eyebrow, { x: -12 * lat, duration: DUR.fast }, 0);
    const title = one(task, "title");
    if (title) tl.from(title, { x: -18 * lat, duration: 0.7 }, 0.06);
    all(task, "brief-line").forEach((line, i) => {
      tl.fromTo(
        line,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.5,
          ease: EASE.inOut,
        },
        0.2 + i * 0.16,
      );
    });
    const note = one(task, "note");
    if (note) tl.from(note, { x: 16 * lat, duration: DUR.base }, 1.05);
  }

  /* ── SM-03 · SmmSolution — Cadence Tag Cascade (PLAY) ───────────────── */
  const solution = section("sm-03");
  if (solution) {
    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: solution, start: ENTER, once: true, refreshPriority: 3 },
    });
    const head = one(solution, "head");
    if (head) {
      const headTitle = head.querySelector("h2");
      if (headTitle) {
        tl.fromTo(
          headTitle,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.7 },
          0,
        );
      }
      const headLede = head.querySelector("p");
      if (headLede) tl.from(headLede, { x: 20 * lat, duration: DUR.base }, 0.12);
    }
    all(solution, "row").forEach((row, i) => {
      const at = 0.2 + i * 0.38;
      const cadence = one(row, "cadence");
      if (cadence) {
        tl.from(cadence, { scale: 0.5, duration: 0.4, ease: EASE.pop }, at);
      }
      const content = one(row, "row-content");
      if (content) {
        tl.from(content, { yPercent: 105, duration: 0.65 }, at + 0.12);
      }
    });
  }

  /* ── SM-04 · SmmCycle — Cycle Stroke Loop (PLAY) ────────────────────── */
  const cycle = section("sm-04");
  if (cycle) {
    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: cycle, start: ENTER, once: true, refreshPriority: 4 },
    });
    const head = one(cycle, "head");
    if (head) {
      const headTitle = head.querySelector("h2");
      if (headTitle) {
        tl.fromTo(
          headTitle,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.7 },
          0,
        );
      }
      const headLede = head.querySelector("p");
      if (headLede) tl.from(headLede, { x: 20 * lat, duration: DUR.base }, 0.12);
    }
    const diagram = one(cycle, "diagram");
    if (diagram) {
      tl.from(diagram, { scale: 0.985, transformOrigin: "50% 50%", duration: DUR.base }, 0.1);
    }

    const lines = gsap.utils.toArray<SVGGeometryElement>(
      '[data-anim="cycle-arrow-line"]',
      cycle,
    );
    const returnPath = cycle.querySelector<SVGGeometryElement>(
      '[data-anim="cycle-arrow-return"]',
    );
    const drawables = returnPath ? [...lines, returnPath] : lines;
    const heads = gsap.utils.toArray<SVGElement>('[data-anim="cycle-arrow-head"]', cycle);
    const nodes = gsap.utils.toArray<SVGElement>('[data-anim="cycle-node"]', cycle);
    const steps = all(cycle, "cycle-step");

    drawables.forEach((path) => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    });
    if (heads.length > 0) gsap.set(heads, { opacity: 0 });
    if (steps.length > 0) gsap.set(steps, { opacity: 0.45 });

    const activate = (idx: number, at: number) => {
      steps.forEach((step, j) => {
        tl.to(step, { opacity: j === idx ? 1 : 0.45, duration: 0.25, ease: "none" }, at);
      });
      const step = steps[idx];
      if (step) {
        const num = one(step, "cycle-num");
        if (num) {
          tl.fromTo(num, { scale: 0.55 }, { scale: 1, duration: 0.3, ease: EASE.pop }, at);
        }
      }
      const node = nodes[idx];
      if (node) {
        tl.fromTo(
          node,
          { scale: 0.85 },
          { scale: 1, duration: 0.3, ease: EASE.pop, transformOrigin: "50% 50%" },
          at,
        );
      }
    };

    activate(0, 0.35);
    drawables.forEach((path, i) => {
      const at = 0.45 + i * 0.75;
      tl.to(path, { strokeDashoffset: 0, duration: 0.55, ease: EASE.inOut }, at);
      const head = heads[i];
      if (head) tl.to(head, { opacity: 1, duration: 0.15, ease: "none" }, at + 0.5);
      activate((i + 1) % 3, at + 0.55);
    });

    const note = one(cycle, "note");
    if (note) tl.from(note, { x: 14 * lat, duration: DUR.base }, 2.9);
  }

  /* ── SM-05 · SmmTiers — Column Rise Table (PLAY) ────────────────────── */
  const tiers = section("sm-05");
  if (tiers) {
    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: tiers, start: ENTER, once: true, refreshPriority: 5 },
    });
    const head = one(tiers, "head");
    if (head) {
      const headTitle = head.querySelector("h2");
      if (headTitle) {
        tl.fromTo(
          headTitle,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.7 },
          0,
        );
      }
      const headLede = head.querySelector("p");
      if (headLede) tl.from(headLede, { x: 20 * lat, duration: DUR.base }, 0.12);
    }
    const rule = one(tiers, "tier-rule");
    if (rule) tl.from(rule, { scaleX: 0, duration: 0.9, ease: EASE.inOut }, 0.15);
    [1, 2, 3].forEach((col, colIdx) => {
      const cells = gsap.utils.toArray<HTMLElement>(
        `[data-anim="tier-cell"][data-col="${col}"]`,
        tiers,
      );
      if (cells.length > 0) {
        tl.from(cells, { y: 28, duration: 0.6, stagger: 0.07 }, 0.25 + colIdx * 0.25);
      }
    });
    const note = one(tiers, "note");
    if (note) tl.from(note, { x: 14 * lat, duration: DUR.base }, 1.15);
  }

  /* ── SM-06 · SmmCta — Calendar Fill (PLAY) ──────────────────────────── */
  const cta = section("sm-06");
  if (cta) {
    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: cta, start: ENTER, once: true, refreshPriority: 6 },
    });
    const calendar = one(cta, "calendar");
    if (calendar) {
      tl.from(calendar, { scale: 0.96, transformOrigin: "50% 50%", duration: DUR.base }, 0);
    }
    const fills = all(cta, "cal-fill");
    if (fills.length > 0) {
      gsap.set(fills, { scale: 0, transformOrigin: "0% 100%" });
      tl.to(
        fills,
        {
          scale: 1,
          duration: 0.35,
          stagger: { each: 0.035, grid: [4, 7], from: "start" },
        },
        0.1,
      );
    }
    const title = one(cta, "title");
    if (title) {
      tl.fromTo(
        title,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7 },
        0.25,
      );
    }
    const lede = one(cta, "lede");
    if (lede) tl.from(lede, { x: 20 * lat, duration: DUR.base }, 0.4);
    const actions = one(cta, "actions");
    if (actions) {
      tl.from(
        actions,
        { scale: 0.9, transformOrigin: "left center", duration: DUR.fast, ease: EASE.pop },
        0.55,
      );
    }
    const fine = one(cta, "fine");
    if (fine) tl.from(fine, { x: -12 * lat, duration: DUR.base }, 0.65);
  }
};

export function SmmAnimator({ children }: { children: ReactNode }) {
  return <Animator setup={setup}>{children}</Animator>;
}
