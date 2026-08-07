import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const tagVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-pill",
    // Mono + wide tracking is the metadata voice established in Phase 1. Tech
    // chips are labels about the work, not part of the prose.
    "font-mono text-label uppercase",
    "transition-colors duration-[var(--duration-fast)] ease-editorial",
  ],
  {
    variants: {
      variant: {
        /** Tech stack chips on project cards. */
        default: "border border-line bg-canvas text-ink-muted",
        /** Filled. For counts and status. */
        solid: "bg-surface-raised text-ink",
        /** The accent, used sparingly — e.g. a "Present" role on the timeline. */
        accent: "bg-accent-subtle text-accent",
      },
      size: {
        sm: "px-2 py-0.5 text-[0.6875rem]",
        base: "px-2.5 py-1",
      },
    },
    defaultVariants: { variant: "default", size: "base" },
  },
);

export interface TagProps
  extends ComponentProps<"span">,
    VariantProps<typeof tagVariants> {}

/**
 * Tag — a non-interactive label.
 *
 * A <span>, deliberately. Tech chips are read, not pressed; rendering them as
 * buttons would put a dozen fake stops in the keyboard tab order of every
 * project card.
 *
 * The Projects page filters look similar but *are* controls — those use
 * <Button variant="secondary"> with aria-pressed, not this.
 */
export function Tag({ className, variant, size, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, size }), className)} {...props} />
  );
}

/**
 * TagList — chips as a semantic list.
 *
 * A screen reader announces "list, 6 items" instead of running six unrelated
 * words together. `list-none` drops the bullets while `role="list"` keeps the
 * semantics that some browsers strip along with the marker.
 */
export function TagList({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      role="list"
      className={cn("flex flex-wrap gap-1.5 list-none p-0", className)}
      {...props}
    />
  );
}
