"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reactive `window.matchMedia` hook built on `useSyncExternalStore` so it
 * hydrates cleanly (returns `false` during SSR) and re-renders on changes
 * without a subscribe-in-effect. Used to scope the hero's hover-only
 * interactions to fine pointers.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
