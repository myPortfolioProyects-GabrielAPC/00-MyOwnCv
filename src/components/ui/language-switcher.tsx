"use client";

import { useLocale } from "@/components/layout/locale-provider";
import { nav } from "@/content/nav";
import { LOCALES } from "@/lib/locale";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label={nav[locale].language}
      className="inline-flex border border-border bg-surface"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={`min-h-11 min-w-11 cursor-pointer border-0 px-2.5 font-mono text-xs/none font-medium uppercase transition-colors duration-150 ${
              active ? "bg-text text-bg" : "bg-transparent text-text-muted"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
