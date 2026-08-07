import type { OptionalImageAsset } from "./media";

export interface SocialLinks {
  email: string;
  linkedin: string;
  github: string;
}

export interface Education {
  degree: string;
  institution: string;
}

/**
 * Downloadable resume.
 *
 * `href: null` is the PRD's explicit placeholder state. Components render the
 * control in a disabled/"coming soon" form rather than linking to a 404.
 */
export interface ResumeAsset {
  href: string | null;
  /** Filename suggested to the browser on download. */
  filename: string;
}

/**
 * Every piece of identity, contact, and SEO-defining content on the site.
 * Single source of truth: nothing below is duplicated into a component.
 */
export interface SiteConfig {
  name: string;
  role: string;
  /** Hero headline. */
  headline: string;
  /** Hero subheading. */
  subheading: string;
  /** About-page bio. Array of paragraphs — the PRD's copy is multi-paragraph. */
  bio: string[];
  education: Education;
  /** Current position, one line. */
  current: string;
  links: SocialLinks;
  resume: ResumeAsset;
  /** Location string, e.g. "Islamabad, Pakistan". */
  location: string;
  /** Hero portrait. `null` until supplied. */
  photo: OptionalImageAsset;
  /** Canonical origin, no trailing slash. Drives OG/canonical/sitemap URLs. */
  url: string;
  /** Default meta description and OG description. */
  description: string;
  /** Baseline keyword set for metadata. */
  keywords: string[];
}
