import type { MetadataRoute } from "next";

import { site } from "@/content";

export default function robots(): MetadataRoute.Robots {
  const origin = site.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
