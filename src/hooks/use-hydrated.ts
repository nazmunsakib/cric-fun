"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/** True only after React has hydrated in the browser. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
