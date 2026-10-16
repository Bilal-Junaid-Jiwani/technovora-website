"use client";

/**
 * useAnimator — lifecycle hook every page animator uses.
 *
 * - Runs the page's setup inside a useGSAP context scoped to a wrapper ref,
 *   so all tweens/ScrollTriggers are reverted and killed on unmount.
 * - Creates NOTHING under prefers-reduced-motion: the SSR markup is the
 *   final state (project rule, registry foundation).
 * - Gives setups gsap.matchMedia conditions (isDesktop / isMobile) so
 *   mechanics can simplify at 390px without breaking layout.
 * - Refreshes ScrollTrigger after window load and font swap.
 */
import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { ensureMotionRegistered, gsap, ScrollTrigger } from "./index";

gsap.registerPlugin(useGSAP);

export interface AnimConditions {
  isDesktop: boolean;
  isMobile: boolean;
}

export type AnimSetup = (ctx: {
  scope: HTMLElement;
  conditions: AnimConditions;
}) => void;

export function useAnimator(
  setup: AnimSetup,
): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureMotionRegistered();
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          if (!ref.current) return;
          const conditions = (context.conditions ?? {
            isDesktop: true,
            isMobile: false,
          }) as unknown as AnimConditions;
          setup({ scope: ref.current, conditions });
        },
      );

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(refresh).catch(() => undefined);
      }

      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope: ref },
  );

  return ref;
}
