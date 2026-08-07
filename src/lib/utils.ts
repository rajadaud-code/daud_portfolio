import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names, resolving Tailwind conflicts in favour of the last value.
 *
 * Without this, a component's internal classes and a caller's `className`
 * override both end up in the class list and the winner is decided by CSS
 * source order rather than by the caller's intent.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Absolute URL against the canonical site origin. Safe for OG tags and canonicals. */
export function absoluteUrl(path: string, origin: string): string {
  return new URL(path, origin).toString();
}

/** Strips the protocol and any trailing slash — for displaying links as plain text. */
export function formatUrlForDisplay(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
