const variants = {
  default: "border-border-strong text-text",
  cloud: "border-primary text-primary",
} as const;

/** Small mono label. `hit` marks values that match an active filter. */
export function Tag({
  children,
  variant = "default",
  hit = false,
}: {
  children: string;
  variant?: keyof typeof variants;
  hit?: boolean;
}) {
  return (
    <span
      className={`border px-2 py-[3px] font-mono text-xs ${
        hit ? "border-primary bg-primary text-on-primary" : variants[variant]
      }`}
    >
      {children}
    </span>
  );
}
