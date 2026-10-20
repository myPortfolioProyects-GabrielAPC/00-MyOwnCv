import {
  countOption,
  optionsOf,
  type FilterGroup,
  type FilterValue,
  type Selection,
} from "@/domain/work/filters";

export type RailOption = {
  value: FilterValue;
  label: string;
  count: number;
  pressed: boolean;
};

export type RailGroup = {
  key: string;
  title: string;
  /** Short values such as years are laid out in a grid instead of a list. */
  layout: "list" | "grid";
  options: RailOption[];
};

/** Turns domain filter groups into what the filter rail renders. */
export function buildRailGroups<T>(
  items: readonly T[],
  groups: readonly FilterGroup<T>[],
  selection: Selection,
  titleOf: (key: string) => string,
  labelOf: (key: string, value: FilterValue) => string,
): RailGroup[] {
  return groups.map((group) => ({
    key: group.key,
    title: titleOf(group.key),
    layout: group.key === "year" ? "grid" : "list",
    options: optionsOf(items, group).map((value) => ({
      value,
      label: labelOf(group.key, value),
      count: countOption(items, groups, selection, group.key, value),
      pressed: selection[group.key]?.includes(value) ?? false,
    })),
  }));
}

export function selectedCount(selection: Selection) {
  return Object.values(selection).reduce((total, values) => total + values.length, 0);
}
