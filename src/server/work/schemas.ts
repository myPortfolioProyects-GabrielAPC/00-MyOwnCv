import { existsSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { CERTIFICATE_CATEGORIES } from "@/domain/work/certificate";
import { YEAR_MONTH_PATTERN } from "@/domain/work/period";
import { LOCALES } from "@/lib/locale";

const text = z.string().trim().min(1);
const id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use a lowercase slug, e.g. cost-radar");
const yearMonth = z.string().regex(YEAR_MONTH_PATTERN, "Expected YYYY-MM");

/** Text written once per language, e.g. { "en": "...", "es": "..." }. */
export const localized = z.record(z.enum(LOCALES), text);

/** Picture stored under public/images/work/. The file must exist. */
export const imageSchema = z.object({
  src: z
    .string()
    .regex(/^\/images\/work\/[\w./-]+\.(webp|png|jpe?g|svg)$/, "Use a path like /images/work/certificates/logo.webp")
    .refine((src) => existsSync(join(process.cwd(), "public", src)), "File not found under public/"),
  alt: localized,
});

export const projectSchema = z.object({
  id,
  name: text,
  year: z.number().int().min(1990).max(2100),
  summary: localized,
  languages: z.array(text).default([]),
  cloud: z.array(text).default([]),
  links: z
    .object({ demo: z.url().optional(), repository: z.url().optional() })
    .default({}),
  image: imageSchema.optional(),
  featured: z.boolean().default(false),
  sample: z.boolean().default(false),
});

export const experienceSchema = z
  .object({
    id,
    role: localized,
    organization: text,
    from: yearMonth,
    to: yearMonth.nullable(),
    description: localized,
    employment: localized.optional(),
    location: localized.optional(),
    tags: z.array(text).default([]),
    image: imageSchema.optional(),
    sample: z.boolean().default(false),
  })
  .refine((item) => item.to === null || item.to >= item.from, {
    message: "`to` cannot be earlier than `from`",
    path: ["to"],
  });

export const certificateSchema = z.object({
  id,
  name: text,
  issuer: text,
  category: z.enum(CERTIFICATE_CATEGORIES),
  date: yearMonth,
  status: z.enum(["earned", "in-progress"]),
  expires: yearMonth.optional(),
  credentialId: text.optional(),
  credentialUrl: z.url().optional(),
  badge: text.max(5),
  image: imageSchema.optional(),
  sample: z.boolean().default(false),
});

export type ImageRecord = z.output<typeof imageSchema>;

export type ProjectRecord = z.output<typeof projectSchema>;
export type ExperienceRecord = z.output<typeof experienceSchema>;
export type CertificateRecord = z.output<typeof certificateSchema>;

/**
 * Validates a whole JSON file and fails with a readable message that names
 * the file, so a typo in a JSON shows up at build time.
 */
export function parseCollection<S extends z.ZodType<{ id: string }>>(
  file: string,
  schema: S,
  data: unknown,
): z.output<S>[] {
  const result = z.array(schema).safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid src/server/work/data/${file}:\n${z.prettifyError(result.error)}`);
  }
  const seen = new Set<string>();
  for (const item of result.data) {
    if (seen.has(item.id)) {
      throw new Error(`Invalid src/server/work/data/${file}: duplicated id "${item.id}"`);
    }
    seen.add(item.id);
  }
  return result.data;
}
