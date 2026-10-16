"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { motion, transform, useMotionValue, useMotionValueEvent } from "framer-motion";
import type { MotionValue } from "framer-motion";
import Image from "next/image";

interface ScrollRunnerProps {
  /** 0..1 progress of the horizontal-scroll section */
  progress: MotionValue<number>;
  /** the sticky viewport the runner is pinned inside */
  stickyRef: RefObject<HTMLElement | null>;
  /** the rule lines (panel 4, panel 5) the runner stands on */
  lineARef: RefObject<HTMLElement | null>;
  lineBRef: RefObject<HTMLElement | null>;
  /** shown while the page is NOT scrolling */
  idleSrc?: string;
  /** shown while scrolling. If it is the same file as idleSrc the gallop is procedural (CSS). */
  runSrc?: string;
  /** progress range where the runner is on screen: [fadeInStart, fullyIn, startFadeOut, gone] */
  visible?: [number, number, number, number];
  /** progress range over which it moves from the first line to the second */
  handoff?: [number, number];
  /** the bundled engraving is black-on-transparent; invert it for the dark panels. Turn off for full-colour art. */
  invertArt?: boolean;
}

const IDLE_DELAY_MS = 160;
const DEFAULT_VISIBLE: [number, number, number, number] = [0.5, 0.58, 0.92, 0.99];
const DEFAULT_HANDOFF: [number, number] = [0.6, 0.8];

/**
 * A character pinned to the viewport while the page scrolls horizontally underneath it.
 * Scrolling  -> the "running" layer is shown (gallop + motion-blur trail), facing the way it runs.
 * Not scrolling -> the "idle" layer fades in, like the reference's rabbit.gif / rabbitStop.png pair.
 */
export function ScrollRunner({
  progress,
  stickyRef,
  lineARef,
  lineBRef,
  idleSrc = "/images/about/deer.webp",
  runSrc = "/images/about/deer.webp",
  visible = DEFAULT_VISIBLE,
  handoff = DEFAULT_HANDOFF,
  invertArt = true,
}: ScrollRunnerProps) {
  const [running, setRunning] = useState(false);
  const [facing, setFacing] = useState<1 | -1>(1);
  const lineYs = useRef<[number, number]>([0, 0]);
  const lastProgress = useRef(0);
  const idleTimer = useRef<number | undefined>(undefined);
  const y = useMotionValue(0);
  // Set by hand (not useTransform): framer would otherwise hand a scroll-derived opacity to a native
  // scroll timeline whose range does not line up with this section, fading the runner in late.
  const opacity = useMotionValue(0);
  const procedural = idleSrc === runSrc;

  const syncY = useCallback(
    (p: number) => {
      const [a, b] = lineYs.current;
      const t = Math.min(1, Math.max(0, (p - handoff[0]) / (handoff[1] - handoff[0])));
      y.set(a + (b - a) * t);
      opacity.set(transform(p, visible, [0, 1, 1, 0]));
    },
    [handoff, visible, y, opacity]
  );

  // Measure where the two rule lines sit inside the sticky viewport (vertical position never
  // changes while scrolling horizontally, so this only needs to run on layout changes).
  useEffect(() => {
    const measure = () => {
      const sticky = stickyRef.current;
      const l1 = lineARef.current;
      const l2 = lineBRef.current;
      if (!sticky || !l1 || !l2) return;
      const top = sticky.getBoundingClientRect().top;
      lineYs.current = [l1.getBoundingClientRect().top - top, l2.getBoundingClientRect().top - top];
      syncY(progress.get());
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stickyRef.current) ro.observe(stickyRef.current);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [stickyRef, lineARef, lineBRef, progress, syncY]);

  useEffect(() => () => window.clearTimeout(idleTimer.current), []);

  useMotionValueEvent(progress, "change", (p) => {
    syncY(p);
    const delta = p - lastProgress.current;
    lastProgress.current = p;
    // Only bother React while the runner can actually be seen.
    if (p < visible[0] || p > visible[3] || Math.abs(delta) < 0.00002) return;
    setFacing(delta > 0 ? 1 : -1); // scrolling forward drags the world left, so it runs right
    setRunning(true);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setRunning(false), IDLE_DELAY_MS);
  });

  const layer = invertArt ? "object-contain invert contrast-125 brightness-125" : "object-contain";

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, y }}
      className="pointer-events-none absolute left-[18vw] top-0 z-30 h-28 w-28 -translate-y-[94%] lg:h-40 lg:w-40 2xl:h-52 2xl:w-52"
    >
      {/* The art faces left; flip it so it faces the direction it is running. */}
      <div
        className="relative h-full w-full transition-transform duration-200"
        style={{ transform: `scaleX(${facing === 1 ? -1 : 1})` }}
      >
        {/* Idle layer */}
        <div className={`absolute inset-0 transition-opacity duration-150 ${running ? "opacity-0" : "opacity-100"}`}>
          <Image src={idleSrc} alt="" fill sizes="208px" className={layer} />
        </div>

        {/* Running layer: motion-blur trail + main sprite */}
        <div
          className={`absolute inset-0 transition-opacity duration-150 ${running ? "opacity-100" : "opacity-0"} ${
            procedural && running ? "runner-gallop" : ""
          }`}
        >
          {procedural && (
            <>
              <Image src={runSrc} alt="" fill sizes="208px" className={`${layer} runner-ghost runner-ghost-2`} />
              <Image src={runSrc} alt="" fill sizes="208px" className={`${layer} runner-ghost runner-ghost-1`} />
            </>
          )}
          <Image src={runSrc} alt="" fill sizes="208px" className={layer} unoptimized={runSrc.endsWith(".gif")} />
        </div>
      </div>
    </motion.div>
  );
}
