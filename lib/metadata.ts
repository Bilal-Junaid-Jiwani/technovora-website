import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage ?? "/og/default.png";
  // Titles passed in already carry the "| Technovora" suffix — don't double it.
  const ogTitle = title.endsWith(`| ${SITE_NAME}`) ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
  };
}
