"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CopyStatus = "idle" | "copied" | "error";

export interface UseCopyToClipboard {
  status: CopyStatus;
  copy: (value: string) => Promise<void>;
}

/**
 * Copies text and exposes a transient status for UI feedback.
 *
 * Backs the "Copy email" button (PRD nice-to-have). The status auto-resets so
 * the button returns to its resting label without the caller managing a timer.
 *
 * Failure is surfaced as an "error" status rather than swallowed: the
 * Clipboard API rejects in real, non-exotic situations — a non-secure origin,
 * or a browser that withholds permission — and a button that silently does
 * nothing is worse than one that admits it failed.
 */
export function useCopyToClipboard(resetDelay = 2000): UseCopyToClipboard {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear on unmount so a pending reset cannot setState on a dead component.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(
    async (value: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      try {
        await navigator.clipboard.writeText(value);
        setStatus("copied");
      } catch {
        setStatus("error");
      }

      timeoutRef.current = setTimeout(() => setStatus("idle"), resetDelay);
    },
    [resetDelay],
  );

  return { status, copy };
}
