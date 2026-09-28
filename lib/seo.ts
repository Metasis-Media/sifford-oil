import type { Metadata } from "next";
import { site } from "./site";

// Shared with app/opengraph-image.tsx so the tags and the generated image agree.
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Sifford Oil Company: fuel, auto service and propane in Rockwell, NC since 1955",
};

export const baseOpenGraph = {
  type: "website",
  siteName: site.name,
  locale: "en_US",
} as const;

/** Per-page metadata with a canonical URL and a matching og:url. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    // A page-level openGraph replaces the root one, including the file-based image, so re-attach it.
    openGraph: { ...baseOpenGraph, url: path, description, images: [ogImage] },
  };
}

/** BreadcrumbList structured data: Home › {name}. */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", site.url).toString() },
      { "@type": "ListItem", position: 2, name, item: new URL(path, site.url).toString() },
    ],
  };
}
