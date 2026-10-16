"use client";

/**
 * Animator — wraps a page's sections so a page animator can run GSAP scoped
 * to them. The wrapper is `display: contents`, so it introduces zero layout
 * change; ScrollTriggers target the real section elements inside.
 */
import type { ReactNode } from "react";
import { useAnimator, type AnimSetup } from "@/lib/motion/useAnimator";

export function Animator({
  setup,
  children,
}: {
  setup: AnimSetup;
  children: ReactNode;
}) {
  const ref = useAnimator(setup);
  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
