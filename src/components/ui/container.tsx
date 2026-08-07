import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const containerVariants = cva("mx-auto w-full px-gutter", {
  variants: {
    width: {
      /** 1440px. Full editorial width — hero, project grids, nav, footer. */
      page: "max-w-page",
      /** 704px. Reading measure: ~70 characters at body size. Long-form prose
       *  only (bio, case-study text). Wider than this and the eye loses the
       *  line return — the single most common typographic failure on
       *  portfolio sites. */
      prose: "max-w-prose-editorial",
      /** No cap. For full-bleed rows that still want the gutter. */
      full: "max-w-none",
    },
  },
  defaultVariants: { width: "page" },
});

export interface ContainerProps
  extends ComponentProps<"div">,
    VariantProps<typeof containerVariants> {}

/**
 * Container — horizontal bounds and gutter.
 *
 * The only place `px-gutter` should appear. Nesting Containers double-pads;
 * if a child needs a narrower measure, use Container width="prose" *instead*
 * of the outer one, not inside it.
 */
export function Container({ className, width, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ width }), className)} {...props} />
  );
}
