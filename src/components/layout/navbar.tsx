"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/layout/locale-provider";
import { GlitchText } from "@/components/ui/glitch-text";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { SocialLinks } from "@/components/ui/social-links";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { nav } from "@/content/nav";
import type { WorkTab } from "@/content/work";
import { useActiveSection } from "@/hooks/use-active-section";
import { DESKTOP_QUERY } from "@/lib/breakpoints";
import { WORK_TAB_EVENT } from "@/lib/work-tab";

// The first three are tabs of the work dashboard: their links open the tab and scroll to "#work".
const SECTIONS = [
  { id: "projects", key: "projects", section: "work", hex: "0x01" },
  { id: "experience", key: "experience", section: "work", hex: "0x02" },
  { id: "certificates", key: "certificates", section: "work", hex: "0x03" },
  { id: "about", key: "about", section: "about", hex: "0x04" },
  { id: "contact", key: "contact", section: "contact", hex: "0x05" },
] as const;

const SECTION_IDS = [...new Set(SECTIONS.map((link) => link.section))];

export function Navbar() {
  const { locale } = useLocale();
  const t = nav[locale];
  const [active, setActive] = useActiveSection(SECTION_IDS);
  const [workTab, setWorkTab] = useState<WorkTab>("projects");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onTab = (event: Event) => setWorkTab((event as CustomEvent<WorkTab>).detail);
    window.addEventListener(WORK_TAB_EVENT, onTab);
    return () => window.removeEventListener(WORK_TAB_EVENT, onTab);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
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

  const isCurrent = (link: (typeof SECTIONS)[number]) =>
    active === link.section && (link.section !== "work" || workTab === link.id);

  const go = (section: string) => {
    setActive(section);
    setOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-(--header-h) items-center justify-between gap-2 border-b border-border bg-bg px-4 transition-colors duration-300 sm:gap-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href="#top"
            aria-label={t.home}
            onClick={() => setOpen(false)}
            className="glitch-host flex min-h-11 min-w-0 flex-none items-center"
          >
            <GlitchText className="font-display text-[clamp(0.875rem,4.5vw,1.125rem)]/none tracking-[0.02em] whitespace-nowrap">
              Gabriel Peñaranda
            </GlitchText>
          </Link>
          <SocialLinks />
        </div>

        <nav aria-label={t.main} className="hidden gap-5 desk:flex min-[72rem]:gap-8">
          {SECTIONS.map((link) => {
            const { id, key, section } = link;
            const isActive = isCurrent(link);
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => go(section)}
                className={`glitch-host inline-flex min-h-11 items-center gap-2 transition-colors duration-150 before:size-[7px] before:bg-secondary before:transition-transform before:duration-[350ms] before:ease-(--ease-bounce) ${
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
            className="grid size-11 cursor-pointer place-items-center border border-border bg-surface text-text transition-colors duration-150 hover:border-secondary desk:hidden"
          >
            <span className="burger-lines" data-open={open} />
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="nav-panel fixed inset-x-0 top-(--header-h) bottom-0 z-40 flex flex-col gap-[18px] overflow-y-auto px-6 py-7 desk:hidden"
        >
          <p className="m-0 font-mono text-[0.8125rem] text-(--nav-panel-muted)">
            &gt; {t.signal}
            <i className="nav-blink not-italic">_</i>
          </p>
          <nav aria-label={t.mainMobile} className="flex flex-col">
            {SECTIONS.map((link) => {
              const { id, key, section, hex } = link;
              const isActive = isCurrent(link);
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => go(section)}
                  className={`glitch-host flex items-center justify-between border-b border-[color-mix(in_srgb,var(--nav-panel-text)_15%,transparent)] py-3 font-display text-[2.125rem]/[1.2] ${
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
            <SocialLinks variant="panel" />
          </div>
        </div>
      )}
    </>
  );
}
