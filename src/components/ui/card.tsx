import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const cardVariants = cva(
  ["relative rounded-card transition-colors duration-[var(--duration-fast)] ease-editorial"],
  {
    variants: {
      variant: {
        /** Hairline border on canvas. The default, and the house look. */
        outline: "border border-line bg-canvas",
        /** Tinted fill, no border. For blocks that need to recede. */
        surface: "bg-surface",
        /** Structure only — no border, no fill. For editorial rows and
         *  timeline entries that should not look like containers. */
        plain: "",
      },
      /**
       * Separate from `variant` because "is this clickable" and "how is this
       * filled" are orthogonal. An interactive `surface` card is legitimate;
       * folding them into one axis would need a variant per combination.
       */
      interactive: {
        true: "hover-lift cursor-pointer",
        false: "",
      },
    },
    compoundVariants: [
      // Elevation only reads against a bordered card. A `plain` card that
      // lifts is a shadow floating in space.
      { variant: "outline", interactive: true, className: "shadow-hairline" },
    ],
    defaultVariants: { variant: "outline", interactive: false },
  },
);

export interface CardProps
  extends ComponentProps<"div">,
  VariantProps<typeof cardVariants> { }

/**
 * Card — a surface. It is not a link and has no onClick.
 *
 * `interactive` styles a card that *contains* a link; it does not make the card
 * itself clickable. The card is decoration, the <a> inside it is the control.
 * Phase 3's project cards use a stretched-link overlay so the whole surface is
 * clickable while the accessibility tree still sees one honest link with the
 * project's title as its name.
 *
 * The alternative — onClick on the div — produces a card that a keyboard cannot
 * reach and a screen reader cannot describe, and it breaks the middle-click and
 * cmd-click that people actually use to open projects in a new tab.
 */
export function Card({ className, variant, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, interactive }), className)}
      {...props}
    />
  );
}

/**
 * CardMedia — fixed-ratio image frame.
 *
 * Ratio lives here rather than on each <Image> so every card in a grid crops
 * identically and the row cannot go ragged. `overflow-hidden` clips the image's
 * hover scale to the card's radius.
 *
 * `ratio: null` opts out of the inline style entirely, for frames whose size
 * must come from classes. An inline style cannot be overridden by any class at
 * any breakpoint, so a caller that needs a *responsive* ratio (the lead
 * project card: 16/10 stacked, fill-the-column at lg) has to own the sizing
 * with `aspect-*` utilities — the inline declaration must genuinely be absent,
 * not merely contradicted.
 */
export function CardMedia({
  className,
  ratio = "16/10",
  ...props
}: ComponentProps<"div"> & { ratio?: string | null }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[calc(var(--radius-card)-1px)] bg-surface",
        className,
      )}
      // Inline, because the ratio is data — a caller may pass "1/1" for a
      // certification. An arbitrary Tailwind class cannot be built from a prop
      // at runtime; the compiler only sees literal strings in source.
      style={ratio ? { aspectRatio: ratio } : undefined}
      {...props}
    />
  );
}

/** CardBody — the padded content well. Split out so media can sit flush. */
export function CardBody({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-3 p-5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-h3 text-ink text-balance", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p className={cn("text-sm leading-relaxed text-ink-muted", className)} {...props} />
  );
}

/** CardFooter — pushed to the bottom so cards in a row align their actions. */
export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-wrap items-center gap-3 pt-2", className)}
      {...props}
    />
  );
}
