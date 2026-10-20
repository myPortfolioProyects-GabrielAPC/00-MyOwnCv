import type { Certificate } from "@/domain/work/certificate";
import type { WorkImage } from "@/domain/work/image";
import type { Experience } from "@/domain/work/experience";
import type { Project } from "@/domain/work/project";
import type { Locale } from "@/lib/locale";
import type {
  CertificateRecord,
  ExperienceRecord,
  ImageRecord,
  ProjectRecord,
} from "@/server/work/schemas";

function toImage(image: ImageRecord | undefined, locale: Locale): WorkImage | undefined {
  return image && { src: image.src, alt: image.alt[locale] };
}

export function toProject(record: ProjectRecord, locale: Locale): Project {
  return {
    id: record.id,
    name: record.name,
    year: record.year,
    summary: record.summary[locale],
    languages: record.languages,
    cloud: record.cloud,
    links: record.links,
    image: toImage(record.image, locale),
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
    employment: record.employment?.[locale],
    location: record.location?.[locale],
    tags: record.tags,
    image: toImage(record.image, locale),
    sample: record.sample,
  };
}

export function toCertificate(record: CertificateRecord, locale: Locale): Certificate {
  return {
    id: record.id,
    name: record.name,
    issuer: record.issuer,
    category: record.category,
    date: record.date,
    status: record.status,
    expires: record.expires,
    credentialId: record.credentialId,
    credentialUrl: record.credentialUrl,
    badge: record.badge,
    image: toImage(record.image, locale),
    sample: record.sample,
  };
}
