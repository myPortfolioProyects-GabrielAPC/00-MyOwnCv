"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { useLocale } from "@/components/layout/locale-provider";
import { nav } from "@/content/nav";

const subscribe = () => () => {};

const variants = {
  // Hidden on small screens, where the toggle lives inside the menu panel.
  bar: "hidden border-border bg-surface text-text desk:grid",
  panel:
    "grid border-[color-mix(in_srgb,var(--nav-panel-text)_25%,transparent)] bg-transparent text-(--nav-panel-text)",
} as const;

export function ThemeToggle({ variant = "bar" }: { variant?: keyof typeof variants }) {
  const { locale } = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const t = nav[locale];
  const isDark = resolvedTheme === "dark";
  const label = !mounted ? t.toggleTheme : isDark ? t.toLight : t.toDark;
  const icon =
    "transition-transform duration-[400ms] ease-(--ease-bounce) group-hover:rotate-90";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`group size-11 cursor-pointer place-items-center border transition-colors duration-150 hover:border-secondary ${variants[variant]}`}
    >
      <Sun size={18} strokeWidth={1.6} aria-hidden="true" className={`${icon} dark:hidden`} />
      <Moon size={18} strokeWidth={1.6} aria-hidden="true" className={`${icon} hidden dark:block`} />
    </button>
  );
}
