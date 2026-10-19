import { Check, ListFilter, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { RailGroup } from "@/components/sections/work/filter-model";
import type { work } from "@/content/work";
import type { FilterValue } from "@/domain/work/filters";

type Copy = (typeof work)["en"];

/**
 * Filter column. On narrow screens it becomes a bottom drawer that
 * `open` slides in.
 */
export function FilterRail({
  id,
  open,
  groups,
  activeCount,
  resultCount,
  copy,
  onToggle,
  onClear,
  onClose,
}: {
  id: string;
  open: boolean;
  groups: RailGroup[];
  activeCount: number;
  resultCount: number;
  copy: Copy;
  onToggle: (key: string, value: FilterValue) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <aside
      id={id}
      aria-label={copy.filters}
      className={`work-rail relative flex flex-col gap-6 border-r border-border bg-(--work-rail) px-5 py-6 min-[821px]:min-h-0 min-[821px]:overflow-y-auto max-[820px]:fixed max-[820px]:inset-x-0 max-[820px]:bottom-0 max-[820px]:z-40 max-[820px]:max-h-[82vh] max-[820px]:overflow-y-auto max-[820px]:border-t-2 max-[820px]:border-r-0 max-[820px]:border-t-primary max-[820px]:bg-surface max-[820px]:transition-transform max-[820px]:duration-[450ms] max-[820px]:ease-(--ease-out) ${
        open ? "max-[820px]:visible max-[820px]:translate-y-0" : "max-[820px]:invisible max-[820px]:translate-y-[105%]"
      }`}
    >
      <div className="relative z-[1] flex items-center justify-between gap-2">
        <h2 className="m-0 flex items-center gap-2 font-mono text-[13px] font-medium tracking-[0.1em] text-text-muted uppercase">
          <ListFilter size={18} strokeWidth={1.6} aria-hidden="true" />
          {copy.filters}
          {activeCount > 0 && <b className="font-medium text-primary">[{activeCount}]</b>}
        </h2>
        <button
          type="button"
          onClick={onClear}
          disabled={activeCount === 0}
          className="cursor-pointer border-0 bg-transparent py-1 font-mono text-[13px] text-primary underline underline-offset-[3px] disabled:cursor-default disabled:text-text-muted disabled:no-underline disabled:opacity-60"
        >
          {copy.clear}
        </button>
        <button
          ref={closeRef}
          type="button"
          aria-label={copy.closeFilters}
          onClick={onClose}
          className="hidden size-9 cursor-pointer place-items-center border border-border bg-surface transition-colors hover:border-secondary max-[820px]:grid"
        >
          <X size={18} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>

      <div className="relative z-[1] flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.key} className="flex flex-col gap-2.5">
            <h3 className="m-0 flex items-center gap-2 font-display text-[15px] font-normal tracking-[0.04em] before:h-px before:w-2.5 before:bg-secondary">
              {group.title}
            </h3>
            <div
              className={
                group.layout === "grid"
                  ? "grid grid-cols-3 gap-1 max-[820px]:grid-cols-4"
                  : "flex flex-col gap-0.5 max-[820px]:flex-row max-[820px]:flex-wrap max-[820px]:gap-1.5"
              }
            >
              {group.options.map((option) => (
                <button
                  key={String(option.value)}
                  type="button"
                  aria-pressed={option.pressed}
                  onClick={() => onToggle(group.key, option.value)}
                  className={`flex cursor-pointer items-center gap-2.5 border text-left transition-colors duration-150 ${
                    group.layout === "grid"
                      ? "justify-center px-1 py-2 font-mono text-[13px] font-medium"
                      : "w-full px-2.5 py-2 text-[15px] max-[820px]:w-auto max-[820px]:border-border-strong"
                  } ${
                    option.pressed
                      ? group.layout === "grid"
                        ? "border-primary bg-primary text-on-primary"
                        : "border-primary bg-surface"
                      : "border-transparent bg-transparent hover:border-border-strong hover:bg-surface"
                  } ${option.count === 0 && !option.pressed ? "opacity-45" : ""}`}
                >
                  {group.layout === "list" && (
                    <span
                      className={`grid size-3.5 flex-none place-items-center border-[1.5px] transition-colors duration-150 ${
                        option.pressed ? "border-primary bg-primary" : "border-border-strong"
                      }`}
                    >
                      <Check
                        size={10}
                        strokeWidth={2.4}
                        aria-hidden="true"
                        className={`text-on-primary transition-[opacity,transform] duration-300 ease-(--ease-bounce) ${
                          option.pressed ? "scale-100 opacity-100" : "scale-40 opacity-0"
                        }`}
                      />
                    </span>
                  )}
                  <span className={group.layout === "list" ? "min-w-0 flex-1" : ""}>
                    {option.label}
                  </span>
                  {group.layout === "list" && (
                    <span className="font-mono text-xs text-text-muted tabular-nums">
                      {option.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="relative z-[1] m-0 mt-auto font-mono text-xs/[1.5] text-text-muted max-[820px]:hidden">
        {copy.legend}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="sticky bottom-0 z-[1] mt-1 hidden cursor-pointer border-0 bg-primary p-3.5 text-base text-on-primary max-[820px]:block"
      >
        {copy.showResults(resultCount)}
      </button>
    </aside>
  );
}
