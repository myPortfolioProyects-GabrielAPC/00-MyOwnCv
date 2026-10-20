"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Types `text` one character at a time; retypes when `text` changes. */
export function useTypewriter(text: string, speed = 45) {
  const reducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState({ text, count: 0 });

  const count = progress.text === text ? progress.count : 0;
  const done = count >= text.length;

  useEffect(() => {
    if (reducedMotion || done) return;
    const timer = setInterval(() => {
      setProgress((prev) => ({
        text,
        count: prev.text === text ? prev.count + 1 : 1,
      }));
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, reducedMotion, done]);

  return reducedMotion ? text : text.slice(0, count);
}
