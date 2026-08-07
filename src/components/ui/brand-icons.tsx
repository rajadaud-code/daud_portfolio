import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Brand marks.
 *
 * These live here because lucide-react no longer ships them: brand icons were
 * removed in v1 (trademark reasons — they were never lucide's to relicense).
 * `import { Github } from "lucide-react"` is a build error on the installed
 * version, not a deprecation warning, so there is no upstream to wait for.
 *
 * Scope is deliberately narrow: a mark goes in this file only when the site
 * links to that service and the *logo* is the recognisable affordance. A
 * generic lucide icon is the right answer for everything else — this is not a
 * place to accumulate logos.
 *
 * Sized in `em` rather than px so a mark inherits the type size of whatever it
 * sits beside, and matches the `[&_svg]:size-4` rules in buttonVariants when
 * given a size class. `currentColor` keeps them on the semantic palette.
 */

export type BrandIconProps = ComponentProps<"svg">;

/**
 * The GitHub mark.
 *
 * A single filled path, unlike lucide's stroked geometry — so `fill-current`
 * and no `stroke`. GitHub permits use of the mark to link to GitHub content,
 * which is exactly and only what it does here.
 */
export function GithubIcon({ className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={cn("size-[1em]", className)}
      {...props}
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

/**
 * The LinkedIn mark.
 */
export function LinkedinIcon({ className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={cn("size-[1em]", className)}
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  );
}
