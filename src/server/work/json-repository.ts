import { sortCertificates, sortExperience, sortProjects } from "@/domain/work/sorting";
import certificatesJson from "@/server/work/data/certificates.json";
import experienceJson from "@/server/work/data/experience.json";
import projectsJson from "@/server/work/data/projects.json";
import { toCertificate, toExperience, toProject } from "@/server/work/mappers";
import type { WorkRepository } from "@/server/work/repository";
import {
  certificateSchema,
  experienceSchema,
  parseCollection,
  projectSchema,
} from "@/server/work/schemas";

/** Mock API backend: reads the JSON files bundled at build time. */
export function createJsonWorkRepository(): WorkRepository {
  const projects = parseCollection("projects.json", projectSchema, projectsJson);
  const experience = parseCollection("experience.json", experienceSchema, experienceJson);
  const certificates = parseCollection("certificates.json", certificateSchema, certificatesJson);

  return {
    async projects(locale) {
      return sortProjects(projects.map((record) => toProject(record, locale)));
    },
    async experience(locale) {
      return sortExperience(experience.map((record) => toExperience(record, locale)));
    },
    async certificates() {
      return sortCertificates(certificates.map(toCertificate));
    },
  };
}
