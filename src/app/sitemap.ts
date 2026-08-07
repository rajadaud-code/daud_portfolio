import type { MetadataRoute } from "next";

import { navigation, site } from "@/content";

/**
 * sitemap.xml, generated from the same navigation list the nav renders.
 *
 * Deriving it means a new page cannot be added to the site and forgotten by
 * search engines — the two are structurally incapable of disagreeing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = site.url.replace(/\/$/, "");
  const lastModified = new Date();

  return navigation.map((item) => ({
    url: new URL(item.href, origin).toString(),
    lastModified,
    changeFrequency: "monthly",
    // The homepage is the entry point; the rest rank equally beneath it.
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
