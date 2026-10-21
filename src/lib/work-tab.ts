import type { WorkTab } from "@/content/work";

const TABS: readonly WorkTab[] = ["projects", "experience", "certificates"];

/** Fired on `window` with the open tab as `detail`, so the nav can highlight it. */
export const WORK_TAB_EVENT = "work-tab";

export function isWorkTab(value: string): value is WorkTab {
  return (TABS as readonly string[]).includes(value);
}
