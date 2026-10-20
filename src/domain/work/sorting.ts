import type { Certificate } from "@/domain/work/certificate";
import type { Experience } from "@/domain/work/experience";
import type { Project } from "@/domain/work/project";

const byTextDesc = (a: string, b: string) => b.localeCompare(a);

/** Featured first, then newest year first. */
export function sortProjects(projects: readonly Project[]) {
  return [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year || a.name.localeCompare(b.name),
  );
}

/** Newest start first. */
export function sortExperience(items: readonly Experience[]) {
  return [...items].sort((a, b) => byTextDesc(a.period.from, b.period.from));
}

/** In-progress first, then newest date first. */
export function sortCertificates(items: readonly Certificate[]) {
  return [...items].sort(
    (a, b) =>
      Number(b.status === "in-progress") - Number(a.status === "in-progress") ||
      byTextDesc(a.date, b.date),
  );
}
