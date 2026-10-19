import { SampleBadge } from "@/components/sections/work/sample-badge";
import { Tag } from "@/components/sections/work/tag";
import type { work } from "@/content/work";
import type { Experience } from "@/domain/work/experience";
import type { Selection } from "@/domain/work/filters";
import { yearOf } from "@/domain/work/period";

type Copy = (typeof work)["en"];

function formatPeriod(item: Experience, now: string) {
  const from = yearOf(item.period.from);
  if (item.period.to === null) return `${from} — ${now}`;
  const to = yearOf(item.period.to);
  return from === to ? String(from) : `${from} — ${to}`;
}

/** One entry of the experience timeline. */
export function ExperienceRow({
  item,
  selection,
  copy,
  index,
}: {
  item: Experience;
  selection: Selection;
  copy: Copy;
  index: number;
}) {
  return (
    <div
      className="work-in relative grid grid-cols-[140px_minmax(0,1fr)] gap-5 pt-1 pb-5 pl-6 before:absolute before:top-[22px] before:-left-[6px] before:size-[11px] before:rotate-45 before:border-[1.5px] before:border-secondary before:bg-surface max-[820px]:grid-cols-[minmax(0,1fr)] max-[820px]:gap-1 max-[820px]:pl-[18px] max-[820px]:before:top-4"
      style={{ "--k": index } as React.CSSProperties}
    >
      <p className="m-0 pt-[18px] font-mono text-sm font-medium text-secondary tabular-nums max-[820px]:pt-3">
        {formatPeriod(item, copy.now)}
      </p>
      <article className="relative flex min-w-0 flex-col border border-border bg-surface transition-[border-color,box-shadow] duration-300 hover:border-primary hover:shadow-(--work-glow)">
        {item.sample && <SampleBadge label={copy.sample} />}
        <div className="flex flex-1 flex-col gap-2.5 p-4">
          <h4 className="m-0 pr-14 font-display text-xl/[1.2] tracking-[0.02em] text-balance">
            {item.role}
          </h4>
          <p className="m-0 font-mono text-xs text-text-muted">@ {item.organization}</p>
          <p className="m-0 text-[15px] text-text-muted">{item.description}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag) => (
              <Tag key={tag} hit={selection.tag?.includes(tag) ?? false}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
