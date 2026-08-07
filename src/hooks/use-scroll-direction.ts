"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

export interface ScrollState {
  direction: ScrollDirection;
  /** True while the page is scrolled past `topOffset`. Drives the nav's border/blur. */
  isScrolled: boolean;
}

interface UseScrollDirectionOptions {
  /**
   * Minimum px of travel before a direction flip is accepted. Prevents the
   * sticky nav from flickering on trackpad jitter or scroll bounce.
   */
  threshold?: number;
  /** Distance from the top at which `isScrolled` becomes true. */
  topOffset?: number;
}

/**
 * Reports scroll direction and whether the page has left the top.
 *
 * Backs the sticky nav (Phase 2): hide on scroll down, reveal on scroll up.
 *
 * Reads are batched into a rAF callback and the listener is passive, so
 * scrolling never blocks on our handler and we sample layout at most once per
 * frame. A bare scroll handler that touches scrollY fires far more often than
 * the compositor can paint and is a classic source of jank on exactly the kind
 * of long, animation-heavy page this PRD asks for.
 */
export function useScrollDirection({
  threshold = 8,
  topOffset = 16,
}: UseScrollDirectionOptions = {}): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: "up",
    isScrolled: false,
  });

  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastY.current;

      setState((previous) => {
        const isScrolled = currentY > topOffset;
        // Ignore sub-threshold movement, but always keep isScrolled honest.
        if (Math.abs(delta) < threshold) {
          return previous.isScrolled === isScrolled
            ? previous
            : { ...previous, isScrolled };
        }

        const direction: ScrollDirection = delta > 0 ? "down" : "up";
        return previous.direction === direction && previous.isScrolled === isScrolled
          ? previous
          : { direction, isScrolled };
      });

      if (Math.abs(delta) >= threshold) lastY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, topOffset]);

  return state;
}
