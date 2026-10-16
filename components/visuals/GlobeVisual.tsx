"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface GlobeVisualProps {
  /** Diameter in px */
  size?: number;
  className?: string;
  /** Slow-rotating dashed orbit ring. Default true. */
  orbit?: boolean;
  /** Seconds per orbit revolution. Default 90. */
  orbitDuration?: number;
  /** Faint atmosphere wash behind the globe (dark-mode friendly). Default false. */
  atmosphere?: boolean;
  /** Overall opacity of the linework. Default 1. */
  opacity?: number;
  /** Accessible label. Decorative by default (aria-hidden). */
  label?: string;
}

/**
 * Tasteful wireframe globe: hairline meridians/parallels, one accent meridian,
 * and an optional slow dashed orbit ring. Pure SVG + CSS — no heavy assets,
 * no WebGL. Honors prefers-reduced-motion (orbit freezes).
 */
export function GlobeVisual({
  size = 320,
  className,
  orbit = true,
  orbitDuration = 90,
  atmosphere = false,
  opacity = 1,
  label,
}: GlobeVisualProps) {
  const decorative = !label;
  const R = 150;
  const cx = 200;
  const cy = 200;
  const parallels = [-104, -52, 0, 52, 104];

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size, opacity }}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={label}
    >
      <style>{`
        @keyframes globe-orbit-spin {
          to { transform: rotate(360deg); }
        }
        .globe-orbit {
          transform-origin: 200px 200px;
          animation: globe-orbit-spin ${orbitDuration}s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .globe-orbit { animation: none; }
        }
      `}</style>

      {atmosphere && (
        <Image
          src="/images/globe-sm.webp"
          alt=""
          aria-hidden
          fill
          className="object-cover opacity-40 blur-[1px] [mask-image:radial-gradient(circle,black_30%,transparent_72%)]"
          sizes={`${size}px`}
        />
      )}

      <svg
        viewBox="0 0 400 400"
        width={size}
        height={size}
        className="relative text-muted"
        fill="none"
        aria-hidden={decorative || undefined}
      >
        <defs>
          <radialGradient id="globe-fade" cx="50%" cy="50%" r="50%">
            <stop offset="62%" stopColor="black" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <mask id="globe-mask">
            <rect width="400" height="400" fill="url(#globe-fade)" />
          </mask>
        </defs>

        <g mask="url(#globe-mask)" stroke="currentColor" strokeWidth="1">
          {/* outer sphere */}
          <circle cx={cx} cy={cy} r={R} opacity="0.7" />
          {/* meridians */}
          <ellipse cx={cx} cy={cy} rx={R} ry={R} opacity="0.45" />
          <ellipse cx={cx} cy={cy} rx="100" ry={R} opacity="0.38" />
          <ellipse cx={cx} cy={cy} rx="50" ry={R} opacity="0.3" />
          {/* accent meridian */}
          <ellipse
            cx={cx}
            cy={cy}
            rx="125"
            ry={R}
            opacity="0.8"
            stroke="#F97316"
            strokeWidth="1.25"
          />
          {/* parallels */}
          {parallels.map((dy) => {
            const half = Math.sqrt(R * R - dy * dy);
            return (
              <line
                key={dy}
                x1={cx - half}
                x2={cx + half}
                y1={cy + dy}
                y2={cy + dy}
                opacity="0.34"
              />
            );
          })}
          {/* node dots where accent meridian meets equator */}
          <circle cx={cx - 125} cy={cy} r="3" fill="#F97316" stroke="none" opacity="0.9" />
          <circle cx={cx + 125} cy={cy} r="3" fill="#F97316" stroke="none" opacity="0.9" />
        </g>

        {orbit && (
          <g className="globe-orbit">
            <circle
              cx={cx}
              cy={cy}
              r={R + 34}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 9"
              opacity="0.5"
            />
            <circle cx={cx} cy={cy - (R + 34)} r="4" fill="#F97316" stroke="none" />
            <circle
              cx={cx + (R + 34)}
              cy={cy}
              r="2.5"
              fill="currentColor"
              stroke="none"
              opacity="0.6"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
