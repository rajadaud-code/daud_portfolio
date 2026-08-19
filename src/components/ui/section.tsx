import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export const sectionVariants = cva("", {
  variants: {
    /**
     * Vertical rhythm. Provides proportional spacing across mobile and desktop.
     */
    spacing: {
      /** The house rhythm for standalone sections. */
      default: "py-section",
      /**
       * Reduced top padding, standard bottom. Ideal for sections immediately
       * following hero, headers, or previous sections.
       */
      tight: "pt-2 pb-section sm:pt-4",
      /** Compact vertical spacing for related modules */
      compact: "py-stack",
      /** Completely chromeless / zero padding */
      none: "py-0",
    },
  },
  defaultVariants: { spacing: "default" },
});

export interface SectionProps
  extends ComponentProps<"section">,
    VariantProps<typeof sectionVariants> {
  /**
   * Anchor target. Also wires the section to its heading via
   * aria-labelledby, so screen-reader landmark navigation announces
   * "Projects, region" rather than "region".
   */
  id?: string;
}

/**
 * Section — vertical rhythm.
 *
 * `py-section` is the fluid clamp(6rem, 12vw, 11rem) from Phase 1. Editorial
 * spacing is mostly this one decision applied without exception: sections that
 * each pick their own padding are what make a page feel improvised.
 */
export function Section({
  className,
  id,
  spacing,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={cn(sectionVariants({ spacing }), className)}
      {...props}
    >
      {children}
    </section>
  );
}

/**
 * `title` is omitted from the native div props: HTML's title attribute is a
 * string tooltip, and ours is renderable content (a heading may contain an
 * emphasised span). Same name, different meaning — so the native one is
 * dropped rather than shadowed, which would let a caller pass a ReactNode that
 * silently ends up as a tooltip.
 */
export interface SectionHeaderProps extends Omit<ComponentProps<"div">, "title"> {
  /** Small mono label above the title — "01 / Selected Work". */
  eyebrow?: string;
  title: ReactNode;
  /** One line of supporting copy. */
  description?: ReactNode;
  /** Right-aligned slot, e.g. a "View all" link. */
  action?: ReactNode;
  /**
   * Must match the parent Section's `id` for aria-labelledby to resolve.
   */
  sectionId?: string;
}

/**
 * SectionHeader — eyebrow + h2 + optional description and action.
 *
 * Always renders an <h2>. Every page has exactly one <h1> (the hero, or the
 * page title), and sections sit one level below it. Heading level is document
 * structure, not a size choice — the size comes from `text-h2`. Skipping from
 * h1 to h3 because it "looked better" is how a page becomes unnavigable by
 * screen reader while looking perfect.
 */
export function SectionHeader({
  className,
  eyebrow,
  title,
  description,
  action,
  sectionId,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-4">
        {eyebrow ? (
          <span className="font-mono text-label uppercase text-ink-subtle">
            {eyebrow}
          </span>
        ) : null}

        <h2
          id={sectionId ? `${sectionId}-heading` : undefined}
          // text-balance stops a two-line heading leaving one orphaned word —
          // cheap, and it is most of what separates set type from typed text.
          className="text-h2 text-ink text-balance"
        >
          {title}
        </h2>

        {description ? (
          <p className="max-w-prose-editorial text-lead text-ink-muted text-pretty">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
