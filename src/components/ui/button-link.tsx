"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";

const variants = {
  primary:
    "border-0 bg-primary text-on-primary hover:shadow-[0_0_12px_color-mix(in_srgb,var(--color-primary)_40%,transparent),0_8px_24px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]",
  secondary:
    "border-[1.5px] border-primary bg-transparent text-primary hover:bg-primary hover:text-on-primary",
} as const;

type ButtonLinkProps = {
  href: string;
  variant?: keyof typeof variants;
  leading?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  leading,
  trailing,
  children,
}: ButtonLinkProps) {
  const magnetic = useMagnetic();

  return (
    <a
      href={href}
      {...magnetic}
      className={`mag group inline-flex min-h-12 items-center gap-2.5 rounded-md px-6 py-3 font-bold ${variants[variant]}`}
    >
      {leading}
      {children}
      {trailing && (
        <span className="transition-transform duration-150 ease-(--ease-bounce) group-hover:translate-x-1">
          {trailing}
        </span>
      )}
    </a>
  );
}
