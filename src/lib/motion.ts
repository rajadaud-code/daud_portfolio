import type { Transition, Variants } from "framer-motion";

/**
 * Motion vocabulary for the whole site.
 *
 * Rule: components import from here, they do not author easings or durations
 * inline. Ad-hoc timings are how a site drifts from "premium" to "animated" —
 * ten slightly different fade speeds read as sloppiness even when no single one
 * looks wrong.
 *
 * The easing curves duplicate --ease-editorial / --ease-entrance in globals.css.
 * CSS cannot read a TS object and Framer cannot read a CSS var, so the pair is
 * mirrored by hand. Change one, change the other.
 */

/** cubic-bezier control points. Framer takes the raw array form. */
export const EASE = {
  /** Decisive, expo-style settle. Default for entrances and layout shifts. */
  editorial: [0.16, 1, 0.3, 1],
  /** Slightly softer landing. For elements arriving under the pointer. */
  entrance: [0.22, 1, 0.36, 1],
  /** Symmetric. For reversible states (open/close, toggle). */
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const DURATION = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  /** Hero-scale reveals only. Long enough to read as choreography. */
  editorial: 1.0,
} as const;

/** Delay between children in a staggered group. */
export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

/** Distance (px) an element travels on a reveal. Restraint is the point. */
export const DISTANCE = {
  sm: 8,
  base: 16,
  lg: 32,
} as const;

export const TRANSITION: Record<string, Transition> = {
  base: { duration: DURATION.base, ease: EASE.editorial },
  slow: { duration: DURATION.slow, ease: EASE.editorial },
  editorial: { duration: DURATION.editorial, ease: EASE.editorial },
  /** Hover/tap feedback. Spring, because pointer response should feel physical. */
  interactive: { type: "spring", stiffness: 400, damping: 30, mass: 0.6 },
};

/**
 * Shared viewport config for scroll-triggered reveals.
 * `once` — replaying on every scroll-past is a novelty that becomes an irritant.
 * `margin` — fires slightly before the element enters, so it is already settled
 * by the time the user's eye reaches it rather than animating under their gaze.
 */
export const VIEWPORT = { once: true, margin: "-10% 0px -10% 0px" } as const;

/* ---------------------------------------------------------------------------
   VARIANTS
   Consumed by the motion primitives in components/motion/ (Phase 2).
   Named for intent, not for the transform they happen to apply.
   ------------------------------------------------------------------------- */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITION.base },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.base },
  visible: { opacity: 1, y: 0, transition: TRANSITION.slow },
};

/** Parent of a staggered group. Children run `fadeInUp` (or similar) themselves. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER.base, delayChildren: 0.1 },
  },
};

/**
 * Hero headline reveal: text rises out of an overflow-hidden mask.
 *
 * `visible` is a *dynamic* variant — it reads a per-element delay from Framer's
 * `custom` prop. A static variant cannot do this: a `transition` declared
 * inside a variant wins over one passed as a prop, so `transition={{ delay }}`
 * on the component would be silently discarded and every word would land at
 * once. This is the supported way to vary one value per element while keeping
 * the curve defined in exactly one place.
 */
export const maskReveal: Variants = {
  hidden: { y: "125%", opacity: 0, filter: "blur(6px)" },
  visible: (delay: number = 0) => ({
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

/** Route-level transition. Applied by the page-transition wrapper (Phase 2). */
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE.editorial } },
  exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE.editorial } },
};
