import type { Period } from "@/domain/work/period";

export type Experience = {
  id: string;
  role: string;
  organization: string;
  period: Period;
  description: string;
  tags: string[];
  sample: boolean;
};
