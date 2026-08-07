import type { OptionalImageAsset } from "./media";

export interface Certification {
  /** URL-safe id. React key. */
  slug: string;
  title: string;
  /** Awarding body. */
  issuer: string;
  /** Public verification link. Required — an unverifiable certification is a claim. */
  verifyUrl: string;
  /** ISO year-month, if known. Omitted where the PRD does not state one. */
  issued?: string;
  /** Optional certification image/badge preview. */
  image?: OptionalImageAsset;
}
