"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ComponentProps, ReactNode } from "react";

import { DISTANCE, TRANSITION, VIEWPORT } from "@/lib/motion";
import { MOTION_TAGS, type MotionTagName } from "./tags";

export interface RevealProps
  extends Omit<ComponentProps<typeof motion.div>, "children"> {
  children: ReactNode;
  /** Seconds to wait after the element enters view. */
  delay?: number;
  /** Travel distance in px. Defaults to DISTANCE.base (16). */
  distance?: number;
  /** Element to render. Constrained to MOTION_TAGS — see tags.ts. */
  as?: MotionTagName;
  /**
   * When the reveal fires.
   *
   * - "view" (default) — on scroll into view. For everything below the fold.
   * - "mount" — immediately on mount. For above-the-fold content like the hero.
   *
   * These are not interchangeable. `whileInView` for the hero *appears* to work
   * (it is already in view, so it fires) but it fires on the intersection
   * observer's first callback rather than on paint, which shows up as a stutter
   * on a slow first load. "mount" is also honest about intent.
   */
  trigger?: "view" | "mount";
}

/**
 * Reveal — fade + rise when scrolled into view.
 *
 * The workhorse. This file carries `"use client"` so that sections importing it
 * do not have to: a Server Component can render
 * <Reveal><ExpensiveServerThing /></Reveal> and only the wrapper ships to the
 * browser — `children` arrives as already-rendered RSC payload, not as client
 * JS. Putting `motion.div` directly in a section would drag that whole subtree
 * into the client bundle.
 *
 * Reduced motion is honoured here, once, rather than in each caller. Note the
 * treatment: content still appears, it simply appears *immediately*. Disabling
 * the animation must never disable the content — a reveal that never runs
 * because opacity is stuck at 0 is an invisible page.
 */
export function Reveal({
  children,
  delay = 0,
  distance = DISTANCE.base,
  as = "div",
  trigger = "view",
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  /*
   * The cast is the price of a polymorphic `as`, and it is deliberate.
   *
   * MOTION_TAGS[as] has a union type, and TypeScript cannot prove that one
   * props object satisfies every member of that union — motion.div and
   * motion.ul differ in their event-handler element types (HTMLDivElement vs
   * HTMLUListElement). Writing the fully-generic version does not remove the
   * cast either; it only moves it and costs three type parameters on the way.
   *
   * Contained here, on one line, and sound at runtime: the tag rendered is
   * always the tag named by `as`. The only imprecision a caller can hit is an
   * event handler typed with the wrong HTMLElement subtype — which affects the
   * `event.currentTarget` type and nothing else.
   */
  const MotionTag = MOTION_TAGS[as] as typeof motion.div;

  if (shouldReduceMotion) {
    const Tag = as;
    return (
      <Tag className={props.className} style={props.style as CSSProperties}>
        {children}
      </Tag>
    );
  }

  const shown = { opacity: 1, y: 0 };
  const triggerProps =
    trigger === "mount"
      ? { animate: shown }
      : { whileInView: shown, viewport: VIEWPORT };

  return (
    <MotionTag
      // The hook for the safety nets in globals.css and the root layout's
      // <noscript>. Framer renders `initial` into the SSR HTML as an inline
      // opacity:0 — so anything that stops the animation from running leaves
      // this element permanently invisible. See the reduced-motion block in
      // globals.css for the failure this prevents; it is not hypothetical.
      data-motion=""
      initial={{ opacity: 0, y: distance }}
      {...triggerProps}
      transition={{ ...TRANSITION.slow, delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
