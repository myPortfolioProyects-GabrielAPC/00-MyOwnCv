"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/layout/locale-provider";
import { GlitchText } from "@/components/ui/glitch-text";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { nav } from "@/content/nav";
import { useActiveSection } from "@/hooks/use-active-section";

const SECTIONS = [
  { id: "work", key: "work", hex: "0x01" },
  { id: "about", key: "about", hex: "0x02" },
  { id: "exp", key: "experience", hex: "0x03" },
  { id: "contact", key: "contact", hex: "0x04" },
] as const;

const SECTION_IDS = SECTIONS.map((section) => section.id);

export function Navbar() {
  const { locale } = useLocale();
  const t = nav[locale];
  const [active, setActive] = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 761px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  const go = (id: string) => {
    setActive(id);
    setOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-bg px-8 py-5 transition-colors duration-300 max-[760px]:px-5 max-[760px]:py-[18px]">
        <Link
          href="#top"
          aria-label={t.home}
          onClick={() => setOpen(false)}
          className="glitch-host min-w-0 flex-none"
        >
          <GlitchText className="font-display text-lg/none tracking-[0.02em] whitespace-nowrap max-[359px]:text-sm">
            Gabriel Peñaranda
          </GlitchText>
        </Link>

        <nav aria-label={t.main} className="flex gap-6 min-[1024px]:gap-8 max-[760px]:hidden">
          {SECTIONS.map(({ id, key }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => go(id)}
                className={`glitch-host inline-flex items-center gap-2 py-2 transition-colors duration-150 before:size-[7px] before:bg-secondary before:transition-transform before:duration-[350ms] before:ease-(--ease-bounce) ${
                  isActive
                    ? "text-secondary before:scale-100 before:rotate-0"
                    : "text-text before:scale-0 before:rotate-45"
                }`}
              >
                <GlitchText>{t[key]}</GlitchText>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="hidden size-11 cursor-pointer place-items-center border border-border bg-surface text-text transition-colors duration-150 hover:border-secondary max-[760px]:grid"
          >
            <span className="burger-lines" data-open={open} />
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="nav-panel fixed inset-x-0 top-[81px] bottom-0 z-40 flex flex-col gap-[18px] overflow-y-auto px-6 py-7 min-[761px]:hidden"
        >
          <p className="m-0 font-mono text-[13px] text-(--nav-panel-muted)">
            &gt; {t.signal}
            <i className="nav-blink not-italic">_</i>
          </p>
          <nav aria-label={t.mainMobile} className="flex flex-col">
            {SECTIONS.map(({ id, key, hex }) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => go(id)}
                  className={`glitch-host flex items-center justify-between border-b border-[color-mix(in_srgb,var(--nav-panel-text)_15%,transparent)] py-3 font-display text-[34px]/[1.2] ${
                    isActive ? "text-secondary" : "text-(--nav-panel-text)"
                  }`}
                >
                  <GlitchText>{t[key]}</GlitchText>
                  <span
                    className={`font-mono text-xs font-medium ${
                      isActive ? "text-secondary" : "text-(--nav-panel-muted)"
                    }`}
                  >
                    {hex}
                  </span>
                </a>
              );
            })}
          </nav>
          <div className="mt-auto flex items-center gap-2.5 font-mono text-xs text-(--nav-panel-muted)">
            <ThemeToggle variant="panel" />
            <span>gabriel_penaranda</span>
          </div>
        </div>
      )}
    </>
  );
}
