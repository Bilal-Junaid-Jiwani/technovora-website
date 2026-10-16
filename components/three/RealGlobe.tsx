"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import * as THREE from "three";
import { useTheme } from "@/components/layout/ThemeProvider";

export interface RealGlobeProps {
  size?: number;
}

interface GeoFeature {
  type: string;
  properties: Record<string, unknown>;
  geometry: { type: string; coordinates: unknown };
}

// Decorative points only: no names, no labels, no implied offices. The hero
// copy states the studio is remote-first and worldwide; these markers are
// part of the globe's visual rhythm, nothing more.
const MARKERS = [
  { lat: 1.3521, lng: 103.8198 },
  { lat: -6.2088, lng: 106.8456 },
  { lat: 37.0902, lng: -95.7129 },
];

// Restored from the pre-rebuild hero globe (react-globe.gl dotted earth),
// retinted from the old purple brand palette to the current design tokens:
// ink dots on a paper globe in light mode, paper dots on near-black in dark,
// the single orange accent for atmosphere and rings in both.
const PALETTE = {
  dark: {
    globeColor: "#0a0c10",
    globeOpacity: 0.55,
    hexColor: "#e8ecf3",
    gridColor: "#ffffff",
    gridOpacity: 0.14,
    hexMargin: 0.7,
    atmosphereColor: "#f97316",
    ringColor: "249, 115, 22",
  },
  light: {
    globeColor: "#f4f6f9",
    globeOpacity: 0.92,
    hexColor: "#1c2536",
    gridColor: "#1c2536",
    gridOpacity: 0.22,
    hexMargin: 0.7,
    atmosphereColor: "#f97316",
    ringColor: "249, 115, 22",
  },
} as const;

export default function RealGlobe({ size = 520 }: RealGlobeProps) {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const { theme } = useTheme();
  const [countries, setCountries] = useState<GeoFeature[]>([]);
  const colors = theme === "dark" ? PALETTE.dark : PALETTE.light;

  // three-globe draws its lat/long graticule as LineSegments with a hard-coded
  // pale grey at 10% opacity, which disappears on a light globe. Restyle it to
  // match the theme.
  const styleGraticule = useCallback(() => {
    const scene = globeEl.current?.scene();
    if (!scene) return;
    scene.traverse((obj) => {
      const line = obj as THREE.LineSegments;
      const mat = line.material as THREE.LineBasicMaterial | undefined;
      if (line.isLineSegments && mat?.isLineBasicMaterial) {
        mat.color.set(colors.gridColor);
        mat.opacity = colors.gridOpacity;
        mat.needsUpdate = true;
      }
    });
  }, [colors.gridColor, colors.gridOpacity]);

  useEffect(() => {
    styleGraticule();
  }, [styleGraticule, countries]);

  useEffect(() => {
    fetch("/data/world.geojson")
      .then((res) => res.json())
      .then((data) => setCountries(data.features ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      globeEl.current.controls().autoRotate = !reduced;
      globeEl.current.controls().autoRotateSpeed = 0.6;
      globeEl.current.controls().enableZoom = false;
      globeEl.current.pointOfView({ altitude: 2.05 }, 0);
    }
  }, []);

  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: colors.globeColor,
        transparent: true,
        opacity: colors.globeOpacity,
        shininess: 3,
      }),
    [colors.globeColor, colors.globeOpacity],
  );

  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex cursor-move items-center justify-center"
      aria-hidden="true"
    >
      <Globe
        ref={globeEl}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={globeMaterial}
        showAtmosphere
        atmosphereColor={colors.atmosphereColor}
        atmosphereAltitude={0.15}
        showGraticules
        onGlobeReady={styleGraticule}
        hexPolygonsData={countries}
        hexPolygonResolution={3}
        hexPolygonMargin={colors.hexMargin}
        hexPolygonUseDots={true}
        hexPolygonColor={() => colors.hexColor}
        hexPolygonAltitude={0.006}
        pointsData={MARKERS}
        pointLat={(d: object) => (d as { lat: number }).lat}
        pointLng={(d: object) => (d as { lng: number }).lng}
        pointColor={() => `rgb(${colors.ringColor})`}
        pointRadius={0.35}
        pointAltitude={0.01}
        ringsData={MARKERS}
        ringLat={(d: object) => (d as { lat: number }).lat}
        ringLng={(d: object) => (d as { lng: number }).lng}
        ringColor={() => (t: number) => `rgba(${colors.ringColor}, ${1 - t})`}
        ringMaxRadius={4.5}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1800}
      />
    </div>
  );
}
