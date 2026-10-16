import type { ReactNode } from "react";

/**
 * The /about experience was designed for the dark theme and is preserved
 * exactly as-is: this layout pins the dark token scope for the route so the
 * page renders identically regardless of the visitor's site-wide theme.
 * (app/about/page.tsx and its section components are intentionally untouched.)
 */
export default function AboutLayout({ children }: { children: ReactNode }) {
  return <div className="dark">{children}</div>;
}
