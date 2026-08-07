import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Skeleton — a loading placeholder.
 *
 * `aria-hidden` and no text: a skeleton is a visual courtesy, and announcing
 * "loading, loading, loading" once per placeholder is noise. The *region* that
 * is loading should carry aria-busy — see SkeletonGroup.
 *
 * A skeleton must trace the shape of the content it replaces. A grey box the
 * wrong size is worse than a spinner: it promises a layout, then shifts it.
 */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("skeleton rounded-control", className)}
      {...props}
    />
  );
}

export interface SkeletonGroupProps extends ComponentProps<"div"> {
  /** Human-readable description of what is loading, e.g. "Loading projects". */
  label: string;
}

/**
 * SkeletonGroup — the announced wrapper around a set of skeletons.
 *
 * One live announcement for the region, rather than one per placeholder.
 * `aria-busy` tells AT the content is pending; the visually-hidden label gives
 * it something to say.
 */
export function SkeletonGroup({
  className,
  label,
  children,
  ...props
}: SkeletonGroupProps) {
  return (
    <div role="status" aria-busy="true" className={cn(className)} {...props}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

/**
 * Matches the Card + CardMedia + CardBody geometry, so the swap from loading
 * to loaded does not move anything.
 *
 * TODO (Phase 5): if the Projects page filters stay client-side and instant,
 * this is only needed for route-level loading.tsx. Delete it rather than keep
 * an unused component if that turns out to be the case.
 */
export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col rounded-card border border-line bg-canvas">
      <Skeleton className="aspect-16/10 w-full rounded-[calc(var(--radius-card)-1px)]" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-1.5 pt-2">
          <Skeleton className="h-6 w-16 rounded-pill" />
          <Skeleton className="h-6 w-20 rounded-pill" />
          <Skeleton className="h-6 w-14 rounded-pill" />
        </div>
      </div>
    </div>
  );
}
