import { Minus, Plus } from "lucide-react";
import type { work } from "@/content/work";

type Copy = (typeof work)["en"];

const button =
  "grid size-10 cursor-pointer place-items-center border border-border bg-surface text-text transition-colors duration-150 hover:border-secondary disabled:cursor-default disabled:opacity-40 disabled:hover:border-border";

/** "−  100%  +" buttons that resize the dashboard. Hidden on small screens. */
export function SizeControls({
  zoom,
  canZoomIn,
  canZoomOut,
  copy,
  onZoomIn,
  onZoomOut,
  onReset,
}: {
  zoom: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  copy: Copy;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}) {
  return (
    <div role="group" aria-label={copy.size} className="flex items-center gap-2 max-[820px]:hidden">
      <button type="button" aria-label={copy.zoomOut} disabled={!canZoomOut} onClick={onZoomOut} className={button}>
        <Minus size={18} strokeWidth={1.6} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={copy.zoomReset}
        disabled={zoom === 1}
        onClick={onReset}
        className="h-10 min-w-16 cursor-pointer border border-border bg-surface px-2 font-mono text-xs text-text-muted tabular-nums transition-colors duration-150 hover:border-secondary hover:text-text disabled:cursor-default disabled:hover:border-border disabled:hover:text-text-muted"
      >
        {Math.round(zoom * 100)}%
      </button>
      <button type="button" aria-label={copy.zoomIn} disabled={!canZoomIn} onClick={onZoomIn} className={button}>
        <Plus size={18} strokeWidth={1.6} aria-hidden="true" />
      </button>
    </div>
  );
}
