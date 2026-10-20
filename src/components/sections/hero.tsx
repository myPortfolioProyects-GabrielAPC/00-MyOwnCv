"use client";

import { ArrowRight, Download } from "lucide-react";
import { useLocale } from "@/components/layout/locale-provider";
import { EqualizerAvatar } from "@/components/sections/equalizer-avatar";
import { ButtonLink } from "@/components/ui/button-link";
import { hero } from "@/content/hero";
import { useTypewriter } from "@/hooks/use-typewriter";

export function Hero() {
  const { locale } = useLocale();
  const t = hero[locale];
  const typed = useTypewriter(t.headline);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-var(--header-h))] items-start desk:items-center short:items-center"
    >
      <div aria-hidden="true" className="hero-grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-scan pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-10 desk:grid-cols-12 desk:py-16 short:grid-cols-12 short:py-6">
        <div className="flex flex-col gap-4 sm:gap-6 desk:col-span-7 short:col-span-7">
          <div className="hero-rise flex items-center gap-4">
            <span className="shrink-0 font-display text-[0.9375rem] tracking-[0.08em] whitespace-nowrap text-secondary">01 /</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[0.8125rem] font-bold text-on-accent">
              <span className="hero-pulse size-2 rounded-full bg-on-accent" />
              {t.status}
            </span>
          </div>

          <p className="hero-rise hero-d1 m-0 font-mono text-[0.8125rem] text-text-muted sm:text-[0.95rem]">
            <span className="text-primary">&gt;</span> whoami <span className="text-text">→ {t.fullName}</span>
          </p>

          <h1
            id="hero-title"
            aria-label={t.headline}
            className="m-0 min-h-[2.1em] font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-normal tracking-[0.01em]"
          >
            <span aria-hidden="true">
              {typed}
              <span className="hero-cursor" />
            </span>
          </h1>

          <p className="hero-rise hero-d3 m-0 max-w-[52ch] text-[0.9375rem]/[1.55] text-text-muted sm:text-xl/[1.6]">{t.intro}</p>

          <div className="hero-rise hero-d4 flex flex-wrap gap-4 pt-2">
            <ButtonLink href="#work" trailing={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />}>
              {t.ctaWork}
            </ButtonLink>
            <ButtonLink
              href="#cv"
              variant="secondary"
              leading={<Download size={18} strokeWidth={1.75} aria-hidden="true" />}
            >
              {t.ctaCv}
            </ButtonLink>
          </div>

          <ul className="hero-rise hero-d5 m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 pt-4 font-mono text-[0.8125rem] text-text-muted">
            {[t.city, ...t.traits].map((item) => (
              <li key={item}>
                <span className="text-primary">&gt;</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-first desk:order-none desk:col-span-5 short:order-none short:col-span-5">
          <EqualizerAvatar alt={t.photoAlt} />
        </div>
      </div>
    </section>
  );
}
