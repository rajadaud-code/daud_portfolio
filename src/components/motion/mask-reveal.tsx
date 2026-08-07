"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment, type ReactNode } from "react";

import { maskReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface MaskRevealProps {
  children: ReactNode;
  /** Seconds before this element rises. Stagger by passing index * step. */
  delay?: number;
  className?: string;
}

/**
 * MaskReveal — text rises out of a fixed mask.
 *
 * The editorial headline move: an outer element clips, an inner element
 * translates from below the clip into place. Only `transform` animates, so it
 * runs entirely on the compositor.
 *
 * ## The descender trap
 *
 * `overflow-hidden` clips to the box, and a text box ends at the baseline-ish
 * bottom edge — so the tails of g, y, p, j are cut off. "Engineer" has a g, so
 * this is not hypothetical here.
 *
 * The fix is the paired `pb-[0.16em] -mb-[0.16em]`: padding extends the clip
 * region below the baseline far enough to contain descenders, and the equal
 * negative margin removes that extra height from layout so the headline's line
 * spacing is unchanged. Both halves are required — padding alone would push
 * following lines apart, margin alone would clip.
 *
 * ## Accessibility
 *
 * Splitting a headline into per-word spans is presentational only — provided
 * the spaces between words survive as real text nodes. See MaskRevealText.
 * Do not split into per-*character* spans: that genuinely does break
 * screen-reader pronunciation.
 *
 * Under reduced motion this renders a plain span: no mask, no transform, text
 * present immediately.
 */
export function MaskReveal({ children, delay = 0, className }: MaskRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  return (
    <span
      className={cn(
        "inline-block overflow-hidden pb-[0.16em] -mb-[0.16em]",
        className,
      )}
    >
      <motion.span
        // data-mask-word is the hook for the <noscript> fallback in the root
        // layout: Framer renders the `hidden` variant into the SSR HTML, so
        // without JS these words would stay translated 110% down and the
        // headline would never appear.
        data-mask-word=""
        className="inline-block will-change-transform"
        variants={maskReveal}
        // Feeds the dynamic `visible` variant its per-word delay. See lib/motion.ts.
        custom={delay}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.span>
    </span>
  );
}

export interface MaskRevealTextProps {
  /** Plain text. Split on whitespace; each word gets its own mask. */
  text: string;
  /** Delay before the first word. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
  className?: string;
}

/**
 * MaskRevealText — a string revealed word by word.
 *
 * ## Why real spaces, not flex `gap`
 *
 * The obvious implementation is a flex container with `gap-x-[0.25em]` between
 * word spans. It looks correct and is quietly broken: **CSS gap is not text.**
 * A flex container discards whitespace-only text nodes, so the DOM text content
 * collapses to "AISoftwareEngineer".
 *
 * That is not a cosmetic problem. It is what a crawler indexes for the most
 * important heading on the site, what a screen reader tries to pronounce, and
 * what lands in the clipboard when someone copies the headline.
 *
 * So: normal inline flow, with explicit `{" "}` text nodes between words. The
 * words are `inline-block` (they must be, to be masked and transformed) but the
 * spaces between them are real spaces — they render, they wrap, and they
 * survive into the accessible name.
 */
export function MaskRevealText({
  text,
  delay = 0,
  stagger = 0.08,
  className,
}: MaskRevealTextProps) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={cn("block", className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {/* A real space text node, not a gap. See above. */}
          {index > 0 ? " " : null}
          <MaskReveal delay={delay + index * stagger}>{word}</MaskReveal>
        </Fragment>
      ))}
    </span>
  );
}
