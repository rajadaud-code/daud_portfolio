import type { Metadata } from "next";

import { site } from "@/content";
import type { Route } from "@/types";

/**
 * SEO foundation.
 *
 * One builder, used by every route. Per-page metadata objects hand-written in
 * each page.tsx drift immediately — one page forgets openGraph, another sets a
 * canonical that doesn't match its own URL, and nobody notices because none of
 * it is visible in the browser.
 */

/**
 * `next build` runs before the deploy environment is necessarily configured, so
 * a missing NEXT_PUBLIC_SITE_URL cannot be a hard failure. It must not be
 * silent either — canonical tags pointing at localhost are invisible locally
 * and actively harmful in production.
 */
if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  console.warn(
    "\n[seo] NEXT_PUBLIC_SITE_URL is not set — canonical URLs, OG tags and " +
      "sitemap.xml will point at localhost. Set it in the deploy environment.\n",
  );
}

/** Trailing slashes make canonical URLs inconsistent. Strip once, here. */
const origin = site.url.replace(/\/$/, "");

interface BuildMetadataOptions {
  /** Page title, without the site suffix — the template appends it. */
  title: string;
  description?: string;
  /** Route this metadata belongs to. Drives the canonical URL. */
  path: Route;
}

/**
 * Route metadata, defaults filled from site config.
 *
 * Everything a page must not forget — canonical, OG, Twitter card — is derived
 * from `path` and `title` rather than restated per page.
 */
export function buildMetadata({
  title,
  description = site.description,
  path,
}: BuildMetadataOptions): Metadata {
  const url = new URL(path, origin).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
    },
  };
}

/**
 * Root metadata, inherited by every route.
 *
 * `metadataBase` is what lets child routes declare relative OG image paths and
 * have Next resolve them to absolute URLs — required, since crawlers reject
 * relative og:image.
 *
 * The title template gives every page a consistent suffix while `default`
 * covers the homepage, which should read as the name alone rather than
 * "Home — Muhammad Daud Israr".
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.links.linkedin }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: origin,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // TODO (Phase 7): og-image, icons, and manifest once the visual identity and
  // profile photo exist. Declaring an icon path before the file exists ships a
  // 404 into every page's <head>.
};

/**
 * schema.org Person JSON-LD.
 *
 * Structured data is how a search engine learns that this site is *a person*
 * with a job and profiles elsewhere, rather than a page that happens to
 * mention a name — it drives the knowledge-panel and rich-result treatment
 * that plain meta tags cannot.
 *
 * Injected by the root layout in Phase 2.
 */
export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: origin,
    jobTitle: site.role,
    description: site.description,
    email: `mailto:${site.links.email}`,
    sameAs: [site.links.github, site.links.linkedin],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: site.education.institution,
    },
    knowsAbout: site.keywords,
  };
}
