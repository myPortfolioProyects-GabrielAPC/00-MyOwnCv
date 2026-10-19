import type { Certificate } from "@/domain/work/certificate";
import type { Experience } from "@/domain/work/experience";
import type { Project } from "@/domain/work/project";
import type { Locale } from "@/lib/locale";
import type {
  CertificateRecord,
  ExperienceRecord,
  ProjectRecord,
} from "@/server/work/schemas";

export function toProject(record: ProjectRecord, locale: Locale): Project {
  return {
    id: record.id,
    name: record.name,
    year: record.year,
    summary: record.summary[locale],
    languages: record.languages,
    cloud: record.cloud,
    links: record.links,
    image: record.image,
    featured: record.featured,
    sample: record.sample,
  };
}

export function toExperience(record: ExperienceRecord, locale: Locale): Experience {
  return {
    id: record.id,
    role: record.role[locale],
    organization: record.organization,
    period: { from: record.from, to: record.to },
    description: record.description[locale],
    tags: record.tags,
    sample: record.sample,
  };
}

export function toCertificate(record: CertificateRecord): Certificate {
  return {
    id: record.id,
    name: record.name,
    issuer: record.issuer,
    category: record.category,
    date: record.date,
    status: record.status,
    credentialUrl: record.credentialUrl,
    badge: record.badge,
    sample: record.sample,
  };
}
