import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Button styles, shared by <Button> and <ButtonLink>.
 *
 * Exported because the two components must be pixel-identical. A hero with a
 * <button> "Contact Me" next to an <a> "View Projects" that differ by one pixel
 * of padding is the kind of defect nobody can name but everybody sees.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-control font-medium whitespace-nowrap",
    "transition-[background-color,color,border-color,transform,box-shadow]",
    "duration-[var(--duration-fast)] ease-editorial",
    // Motion on press, not on hover: hover moves the target out from under the
    // cursor, press confirms the hit. Compositor-only, so it never costs layout.
    "active:scale-[0.98]",
    // Disabled must never look interactive. `pointer-events-none` would also
    // suppress the not-allowed cursor, so both are set explicitly.
    "disabled:pointer-events-none disabled:opacity-45",
    // Icons should not be selectable or capture the click target.
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /** The single strongest call to action on a page. Ink, not accent —
         *  the PRD allows one blue, and spending it on every button is how a
         *  minimal palette turns loud. Blue stays for links and focus. */
        primary:
          "bg-ink text-ink-inverse shadow-hairline hover:bg-neutral-800 hover:shadow-card",
        /** Equal weight, lower urgency. Hairline border, the house idiom. */
        secondary:
          "border border-line bg-canvas text-ink hover:border-line-strong hover:bg-surface",
        /** Chromeless until touched. Toolbars, filters, icon actions. */
        ghost: "text-ink-muted hover:bg-surface hover:text-ink",
        /** Reads as prose. This is where the accent lives. */
        link: "h-auto rounded-none p-0 text-accent underline-offset-4 hover:text-accent-hover hover:underline",
      },
      size: {
        sm: "h-9 px-3.5 text-sm [&_svg]:size-4",
        base: "h-11 px-5 text-sm [&_svg]:size-4",
        /** Hero CTAs. */
        lg: "h-13 px-7 text-base [&_svg]:size-5",
        /** Square. For a lone icon — min 36px keeps the touch target honest. */
        icon: "size-11 [&_svg]:size-5",
      },
    },
    compoundVariants: [
      // `link` is text, so it must not inherit any size's box metrics.
      { variant: "link", size: ["sm", "base", "lg", "icon"], className: "h-auto p-0" },
    ],
    defaultVariants: { variant: "primary", size: "base" },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  /** Rendered before the label. Omitted while loading. */
  leadingIcon?: ReactNode;
  /** Rendered after the label. Omitted while loading. */
  trailingIcon?: ReactNode;
};

export interface ButtonProps
  extends Omit<ComponentProps<"button">, "color">,
  ButtonBaseProps {
  /** Swaps the leading icon for a spinner and disables interaction. */
  isLoading?: boolean;
}

/**
 * Button — for actions. If it navigates, use <ButtonLink>.
 *
 * That split is not pedantry: a <div onClick> or an <a> used as a button loses
 * keyboard activation, middle-click-to-new-tab, and the right screen-reader
 * role. Picking the correct element is most of accessibility.
 */
export function Button({
  className,
  variant,
  size,
  isLoading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      // Explicit: a <button> inside a form defaults to type="submit" and will
      // silently submit it.
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      // Announces the pending state instead of leaving AT users with a button
      // that has stopped responding for no stated reason.
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : (
        leadingIcon
      )}
      {children}
      {!isLoading && trailingIcon}
    </button>
  );
}

export interface ButtonLinkProps
  extends Omit<ComponentProps<typeof Link>, "color">,
  ButtonBaseProps { }

/**
 * ButtonLink — navigation that looks like a button.
 *
 * Wraps next/link, so internal routes keep prefetching and client-side
 * transitions. For external URLs pass `target="_blank"`; `rel` is set
 * automatically below.
 */
export function ButtonLink({
  className,
  variant,
  size,
  leadingIcon,
  trailingIcon,
  children,
  target,
  rel,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      target={target}
      // target="_blank" without noopener hands the opened page a live
      // window.opener reference back into this one. Defaulted, not left to
      // every call site to remember.
      rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
      {...props}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </Link>
  );
}
