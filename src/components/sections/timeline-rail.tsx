"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * TimelineRail — the experience timeline's spine, drawn by scroll.
 *
 * Two lines in the same box: a static hairline (`bg-line`) showing the full
 * route, and an ink line that scales from the top as the reader moves down the
 * timeline — the "drawing" is `scaleY` on scroll progress through a spring, so
 * it trails the scrollbar with a little weight instead of tracking it rigidly.
 * scaleY is compositor-only; nothing here causes layout or paint per frame.
 *
 * This is the timeline's single client component. It measures itself (the
 * useScroll target is its own ref, and the element is stretched over the
 * entries by the caller's inset classes), so the entries stay server-rendered
 * and no data crosses the boundary.
 *
 * `aria-hidden` — the rail is pure decoration; the <ol> it accompanies is the
 * accessible timeline.
 *
 * Reduced motion renders the ink line full-length and static: the finished
 * drawing, without the drawing. Same principle as Reveal — disabling the
 * animation must never disable the content.
 */
export function TimelineRail({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Start drawing once the rail's top clears the lower fifth of the viewport
    // and finish while its end is still comfortably on screen — the ink stays
    // just ahead of the entry being read, never behind it.
    offset: ["start 0.85", "end 0.45"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute",
        // The route fades out rather than stopping dead — the timeline is
        // open-ended at the past end, and a hard stop reads as a fence post.
        "[mask-image:linear-gradient(to_bottom,black_85%,transparent)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-line" />

      {shouldReduceMotion ? (
        <div className="absolute inset-0 bg-ink" />
      ) : (
        <motion.div
          // Same safety net as Reveal: the SSR HTML carries scaleY(0), and the
          // <noscript>/reduced-motion resets key off this attribute. Without
          // it, no-JS visitors would get only the hairline — acceptable, but
          // the reset is free.
          data-motion=""
          style={{ scaleY }}
          className="absolute inset-0 origin-top bg-ink"
        />
      )}
    </div>
  );
}
