"use client";

import { useSyncExternalStore } from "react";

/** Sizes the user can pick for the Work dashboard, as multipliers. */
export const WORK_ZOOM_STEPS = [0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2] as const;

const DEFAULT_ZOOM = 1;
const STORAGE_KEY = "work-zoom";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  try {
    const stored = Number(localStorage.getItem(STORAGE_KEY));
    return (WORK_ZOOM_STEPS as readonly number[]).includes(stored) ? stored : DEFAULT_ZOOM;
  } catch {
    return DEFAULT_ZOOM;
  }
}

function getServerSnapshot() {
  return DEFAULT_ZOOM;
}

function store(zoom: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(zoom));
  } catch {
    // Storage can be blocked; the choice then lasts only until reload.
  }
  listeners.forEach((listener) => listener());
}

/** The user's size choice for the Work dashboard, remembered between visits. */
export function useWorkZoom() {
  const zoom = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const index = WORK_ZOOM_STEPS.indexOf(zoom as (typeof WORK_ZOOM_STEPS)[number]);

  return {
    zoom,
    zoomIn: () => store(WORK_ZOOM_STEPS[Math.min(index + 1, WORK_ZOOM_STEPS.length - 1)]),
    zoomOut: () => store(WORK_ZOOM_STEPS[Math.max(index - 1, 0)]),
    reset: () => store(DEFAULT_ZOOM),
    canZoomIn: index < WORK_ZOOM_STEPS.length - 1,
    canZoomOut: index > 0,
  };
}
