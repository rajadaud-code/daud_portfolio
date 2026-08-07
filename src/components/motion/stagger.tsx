"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ComponentProps, ReactNode } from "react";

import { STAGGER, TRANSITION, VIEWPORT, fadeInUp } from "@/lib/motion";
import { MOTION_TAGS, type MotionTagName } from "./tags";

export interface StaggerProps
  extends Omit<ComponentProps<typeof motion.div>, "children"> {
  children: ReactNode;
  as?: MotionTagName;
  /** Seconds between each child. Defaults to STAGGER.base (0.08). */
  gap?: number;
}

/**
 * Stagger — a container whose <StaggerItem> children animate in sequence.
 *
 * Uses Framer's variant propagation: the parent flips to "visible" and children
 * inherit the state automatically. The alternative — passing an index to each
 * child and computing `delay={i * 0.08}` — puts the same arithmetic at every
 * call site and breaks the moment a list is filtered or reordered, because the
 * delay is baked to position rather than derived from the group.
 *
 * Grids and lists only. For a single element use <Reveal>.
 */
export function Stagger({
  children,
  as = "div",
  gap = STAGGER.base,
  ...props
}: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();
  // See the note in reveal.tsx — a union-typed component cannot accept one
  // props object without a cast, and the generic form only relocates it.
  const MotionTag = MOTION_TAGS[as] as typeof motion.div;

  if (shouldReduceMotion) {
    const Tag = as;
    return (
      <Tag className={props.className} style={props.style as CSSProperties}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      // Built inline rather than reusing `staggerContainer` wholesale, because
      // `gap` is a prop and the variant's transition must reflect it.
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: 0.1 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export interface StaggerItemProps
  extends Omit<ComponentProps<typeof motion.div>, "children"> {
  children: ReactNode;
  as?: MotionTagName;
}

/**
 * StaggerItem — one child of a <Stagger>.
 *
 * Declares no `initial`/`animate` of its own: it inherits state from the
 * parent's variant propagation and only names the variants it responds to.
 *
 * Under reduced motion the parent renders a plain tag, so no variant state ever
 * arrives — this component's own guard covers the case where an item is used
 * outside a Stagger.
 */
export function StaggerItem({
  children,
  as = "div",
  ...props
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[as] as typeof motion.div;

  if (shouldReduceMotion) {
    const Tag = as;
    return (
      <Tag className={props.className} style={props.style as CSSProperties}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      // See reveal.tsx: Framer SSRs the `hidden` variant as inline opacity:0,
      // so this element needs the same safety net if the animation never runs.
      data-motion=""
      variants={fadeInUp}
      transition={TRANSITION.slow}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
