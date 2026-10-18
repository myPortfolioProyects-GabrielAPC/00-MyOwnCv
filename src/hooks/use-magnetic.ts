"use client";

import { useMemo, type MouseEvent } from "react";

/**
 * Handlers that pull an element slightly toward the cursor.
 * Pair with the `.mag` class, which reads the `--mx` / `--my` variables.
 */
export function useMagnetic() {
  return useMemo(
    () => ({
      onMouseMove: (event: MouseEvent<HTMLElement>) => {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        element.style.setProperty(
          "--mx",
          `${((event.clientX - rect.left - rect.width / 2) * 0.18).toFixed(1)}px`,
        );
        element.style.setProperty(
          "--my",
          `${((event.clientY - rect.top - rect.height / 2) * 0.25).toFixed(1)}px`,
        );
      },
      onMouseLeave: (event: MouseEvent<HTMLElement>) => {
        event.currentTarget.style.setProperty("--mx", "0px");
        event.currentTarget.style.setProperty("--my", "0px");
      },
    }),
    [],
  );
}
