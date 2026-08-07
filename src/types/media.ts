/**
 * A local image with the metadata next/image needs to reserve layout space.
 *
 * `alt` is required and `width`/`height` are required because both are
 * load-bearing: missing alt is an accessibility defect, missing dimensions is a
 * CLS defect. Making them optional would let either ship silently.
 */
export interface ImageAsset {
  /** Path under /public, e.g. "/projects/expense-management.png". */
  src: string;
  /** Describes the image's content. Empty string only if purely decorative. */
  alt: string;
  width: number;
  height: number;
}

/**
 * An asset the PRD calls for but which has not been supplied yet.
 *
 * Modelled as `null` rather than a fake placeholder path so that "missing" is
 * unrepresentable as "present". Components must branch on it, which means a
 * forgotten asset degrades visibly instead of 404-ing in production.
 */
export type OptionalImageAsset = ImageAsset | null;
