"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids crosses the middle of the viewport.
 * Ids that are not in the document yet are ignored.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).at(-1);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return [active, setActive] as const;
}
