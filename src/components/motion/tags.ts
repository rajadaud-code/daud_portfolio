import { motion } from "framer-motion";

/**
 * Static motion component lookup.
 *
 * The obvious implementation of a polymorphic `as` prop is
 * `motion.create(as)` — but that builds a component *during render*, and a
 * freshly-created component type is a different element to React, so the whole
 * subtree unmounts and remounts on every parent render. `useMemo` only papers
 * over it: the memo cache is a performance hint React is free to discard, not
 * a correctness guarantee. The react-hooks/static-components lint rule flags
 * exactly this.
 *
 * These are created once at module scope instead. As a bonus the union
 * constrains `as` to elements that make sense as animated containers, so
 * `as="table"` is a compile error rather than a surprise.
 *
 * Add an entry when a section genuinely needs one.
 */
export const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  nav: motion.nav,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  figure: motion.figure,
} as const;

/** Elements that <Reveal> / <Stagger> can render as. */
export type MotionTagName = keyof typeof MOTION_TAGS;
