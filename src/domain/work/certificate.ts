import type { WorkImage } from "@/domain/work/image";
import type { YearMonth } from "@/domain/work/period";

export const CERTIFICATE_CATEGORIES = ["aws", "gcp", "language", "ux"] as const;

export type CertificateCategory = (typeof CERTIFICATE_CATEGORIES)[number];

export type CertificateStatus = "earned" | "in-progress";

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  category: CertificateCategory;
  /** Issue date, or the expected date while the certificate is in progress. */
  date: YearMonth;
  status: CertificateStatus;
  /** Expiry date, for certificates that expire. */
  expires?: YearMonth;
  credentialId?: string;
  credentialUrl?: string;
  /** Short code shown on the seal, e.g. "CLF". */
  badge: string;
  /** Logo of the issuer or the certificate. The seal with `badge` is the fallback. */
  image?: WorkImage;
  sample: boolean;
};
