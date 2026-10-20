import type { WorkImage } from "@/domain/work/image";
import type { Period } from "@/domain/work/period";

export type Experience = {
  id: string;
  role: string;
  organization: string;
  period: Period;
  description: string;
  /** e.g. "Full-time", "Internship". */
  employment?: string;
  location?: string;
  tags: string[];
  /** Logo of the organization. */
  image?: WorkImage;
  sample: boolean;
};
