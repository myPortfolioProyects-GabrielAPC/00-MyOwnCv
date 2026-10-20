import type { Certificate } from "@/domain/work/certificate";
import type { Experience } from "@/domain/work/experience";
import { yearsOf } from "@/domain/work/period";
import type { Project } from "@/domain/work/project";

export type FilterValue = string | number;

/** One filter dimension: the values an item has along it. */
export type FilterGroup<T> = {
  key: string;
  values: (item: T) => readonly FilterValue[];
};

/** Chosen values per group key. */
export type Selection = Readonly<Record<string, readonly FilterValue[]>>;

/**
 * Same group = any chosen value matches; different groups = all must match.
 * `ignoreKey` leaves one group out, used to count what an option would add.
 */
export function matches<T>(
  item: T,
  groups: readonly FilterGroup<T>[],
  selection: Selection,
  ignoreKey?: string,
) {
  return groups.every((group) => {
    if (group.key === ignoreKey) return true;
    const chosen = selection[group.key] ?? [];
    if (chosen.length === 0) return true;
    const own = group.values(item);
    return chosen.some((value) => own.includes(value));
  });
}

export function applyFilters<T>(
  items: readonly T[],
  groups: readonly FilterGroup<T>[],
  selection: Selection,
) {
  return items.filter((item) => matches(item, groups, selection));
}

/** Distinct values found in the data for one group, sorted. */
export function optionsOf<T>(items: readonly T[], group: FilterGroup<T>) {
  const found = new Set<FilterValue>();
  items.forEach((item) => group.values(item).forEach((value) => found.add(value)));
  return [...found].sort((a, b) =>
    typeof a === "number" && typeof b === "number" ? a - b : String(a).localeCompare(String(b)),
  );
}

/** How many items would match if `value` were chosen in group `key`. */
export function countOption<T>(
  items: readonly T[],
  groups: readonly FilterGroup<T>[],
  selection: Selection,
  key: string,
  value: FilterValue,
) {
  const group = groups.find((candidate) => candidate.key === key);
  if (!group) return 0;
  return items.filter(
    (item) => matches(item, groups, selection, key) && group.values(item).includes(value),
  ).length;
}

export const projectFilters: readonly FilterGroup<Project>[] = [
  { key: "language", values: (project) => project.languages },
  { key: "cloud", values: (project) => project.cloud },
];

export function experienceFilters(currentYear: number): readonly FilterGroup<Experience>[] {
  return [
    { key: "tag", values: (item) => item.tags },
    { key: "year", values: (item) => yearsOf(item.period, currentYear) },
  ];
}

export const certificateFilters: readonly FilterGroup<Certificate>[] = [
  { key: "category", values: (certificate) => [certificate.category] },
];

