/**
 * Hook barrel.
 *
 * Note there is no `useReducedMotion` here: Framer Motion ships one, and
 * globals.css already neutralises CSS animation for those users. A third
 * implementation would be a third thing to keep in sync.
 * Import it from "framer-motion" directly.
 */
export { useMediaQuery } from "./use-media-query";
export { useScrollDirection } from "./use-scroll-direction";
export type { ScrollDirection, ScrollState } from "./use-scroll-direction";
export { useCopyToClipboard } from "./use-copy-to-clipboard";
export type { CopyStatus, UseCopyToClipboard } from "./use-copy-to-clipboard";
