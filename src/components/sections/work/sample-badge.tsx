export function SampleBadge({ label }: { label: string }) {
  return (
    <span className="absolute top-2.5 right-2.5 z-10 bg-accent px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.08em] text-on-accent">
      {label}
    </span>
  );
}
