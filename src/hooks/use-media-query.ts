"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks a CSS media query.
 *
 * Built on useSyncExternalStore rather than useState + useEffect because the
 * naive version renders one frame with a wrong value before the effect
 * corrects it — a visible flash on first paint. useSyncExternalStore is
 * React's supported way to read an external value during render without
 * tearing, and it takes an explicit server snapshot so SSR and hydration agree.
 *
 * Reach for this only for behaviour that CSS genuinely cannot express (e.g.
 * mounting a different component tree). Responsive *styling* belongs in
 * Tailwind breakpoints, which cost no JS and no hydration.
 *
 * @example const isDesktop = useMediaQuery("(min-width: 768px)");
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  /**
   * The server has no viewport. `false` is the honest answer, and it makes the
   * mobile-first branch the SSR default — the safer of the two to ship.
   */
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
