import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export interface TextLinkProps extends ComponentProps<typeof Link> {
  /** Adds rel="noopener noreferrer" and opens in a new tab. */
  external?: boolean;
}

/**
 * TextLink — an inline link in prose.
 *
 * Real `text-decoration`, not an animated ::after bar. A pseudo-element
 * underline cannot follow a link that wraps across a line break — it draws one
 * flat rule under the whole box — and inline prose is exactly where wrapping
 * happens. The animated-underline trick belongs on nav items, which never wrap.
 *
 * The underline is always visible and only changes colour on hover: links in
 * body copy must be identifiable without hovering, which is both WCAG 1.4.1
 * (colour is not the only distinguishing signal) and plain sense on a site
 * whose entire palette is black, grey, and one blue.
 */
export function TextLink({
  className,
  external = false,
  target,
  rel,
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={cn(
        "text-ink underline-offset-4",
        "decoration-line-strong underline decoration-1",
        "transition-colors duration-[var(--duration-fast)] ease-editorial",
        "hover:text-accent hover:decoration-accent",
        className,
      )}
      target={external ? "_blank" : target}
      rel={external ? "noopener noreferrer" : rel}
      {...props}
    />
  );
}
