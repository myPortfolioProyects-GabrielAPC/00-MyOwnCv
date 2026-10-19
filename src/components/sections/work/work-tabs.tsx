import type { KeyboardEvent } from "react";
import type { WorkTab } from "@/content/work";

const ORDER: WorkTab[] = ["projects", "experience", "certificates"];
const HEX: Record<WorkTab, string> = {
  projects: "0x01",
  experience: "0x02",
  certificates: "0x03",
};

export function tabId(tab: WorkTab) {
  return `work-tab-${tab}`;
}

export function WorkTabs({
  tab,
  label,
  labels,
  counts,
  onSelect,
}: {
  tab: WorkTab;
  label: string;
  labels: Record<WorkTab, string>;
  counts: Record<WorkTab, string>;
  onSelect: (tab: WorkTab) => void;
}) {
  const onKeyDown = (event: KeyboardEvent) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const next = ORDER[(ORDER.indexOf(tab) + step + ORDER.length) % ORDER.length];
    onSelect(next);
    document.getElementById(tabId(next))?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="relative flex shrink-0 border-b border-border"
    >
      {ORDER.map((id, index) => {
        const selected = id === tab;
        return (
          <button
            key={id}
            id={tabId(id)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls="work-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(id)}
            className={`flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2.5 bg-transparent px-4 py-[18px] text-base transition-colors duration-150 before:size-[7px] before:bg-secondary before:transition-transform before:duration-[350ms] before:ease-(--ease-bounce) hover:bg-[color-mix(in_srgb,var(--color-primary)_5%,transparent)] max-[820px]:flex-col max-[820px]:gap-1 max-[820px]:px-2 max-[820px]:py-3.5 max-[820px]:text-[15px] max-[820px]:before:hidden ${
              index > 0 ? "border-l border-border" : ""
            } ${
              selected
                ? "text-secondary before:scale-100 before:rotate-0"
                : "text-text-muted before:scale-0 before:rotate-45 hover:text-text"
            }`}
          >
            <span className="font-mono text-[11px] font-medium text-text-muted max-[820px]:hidden">
              {HEX[id]}
            </span>
            <span>{labels[id]}</span>
            <span className="border border-border px-[7px] py-px font-mono text-xs font-medium text-text-muted">
              {counts[id]}
            </span>
          </button>
        );
      })}
      <span
        aria-hidden="true"
        className="absolute -bottom-px left-0 h-0.5 w-1/3 bg-primary transition-transform duration-[450ms] ease-(--ease-out)"
        style={{ transform: `translateX(${ORDER.indexOf(tab) * 100}%)` }}
      />
    </div>
  );
}
