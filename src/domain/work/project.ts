export type Project = {
  id: string;
  name: string;
  year: number;
  summary: string;
  languages: string[];
  cloud: string[];
  links: { demo?: string; repository?: string };
  /** Path under /public. Without it the UI draws a generated thumbnail. */
  image?: string;
  featured: boolean;
  /** Placeholder content that should be replaced with real data. */
  sample: boolean;
};
