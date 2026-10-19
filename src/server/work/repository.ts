import type { Certificate } from "@/domain/work/certificate";
import type { Experience } from "@/domain/work/experience";
import type { Project } from "@/domain/work/project";
import type { Locale } from "@/lib/locale";

/** Where Work content comes from. Swap the implementation to change the source. */
export interface WorkRepository {
  projects(locale: Locale): Promise<Project[]>;
  experience(locale: Locale): Promise<Experience[]>;
  certificates(locale: Locale): Promise<Certificate[]>;
}
