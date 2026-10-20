"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/base-path";
import type { Locale } from "@/lib/locale";

export type WorkCollection = "projects" | "experience" | "certificates";

export type CollectionState<T> =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; items: T[] };

// One request per URL for the whole session; failed ones are retried.
const cache = new Map<string, Promise<unknown[]>>();

function load(url: string) {
  let request = cache.get(url);
  if (!request) {
    request = fetch(url).then((response) => {
      if (!response.ok) throw new Error(`${response.status} ${url}`);
      return response.json() as Promise<unknown[]>;
    });
    request.catch(() => cache.delete(url));
    cache.set(url, request);
  }
  return request;
}

/** Loads one collection of the Work mock API in the given language. */
export function useWorkCollection<T>(collection: WorkCollection, locale: Locale) {
  const url = withBasePath(`/api/${locale}/${collection}.json`);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ url: string; attempt: number; items: T[] | null } | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    load(url)
      .then((items) => {
        if (!cancelled) setResult({ url, attempt, items: items as T[] });
      })
      .catch(() => {
        if (!cancelled) setResult({ url, attempt, items: null });
      });
    return () => {
      cancelled = true;
    };
  }, [url, attempt]);

  let state: CollectionState<T> = { status: "loading" };
  if (result && result.url === url && result.attempt === attempt) {
    state = result.items ? { status: "ready", items: result.items } : { status: "error" };
  }

  return { state, retry: () => setAttempt((value) => value + 1) };
}
