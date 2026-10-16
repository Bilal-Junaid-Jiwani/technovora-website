"use client";

/**
 * Page transition wrapper. Transitions are intentionally absent: route
 * changes render immediately, which keeps navigation instant and the
 * initial JS bundle small.
 */
export function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
