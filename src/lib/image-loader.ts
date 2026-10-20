import { withBasePath } from "@/lib/base-path";

// Images that have smaller copies made by `npm run images`
// (scripts/generate-images.mjs): path -> copy widths, plus the original's width.
const COPIES: Record<string, { widths: number[]; original: number }> = {
  "/images/gabriel-perfil.webp": { widths: [320, 640], original: 994 },
};

/**
 * Custom loader for next/image. GitHub Pages cannot resize images on request,
 * so this picks the smallest pre-made copy that is at least `width` wide.
 * Other images are served as they are.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const copies = COPIES[src];
  if (!copies) return withBasePath(src);

  const best = copies.widths.find((candidate) => candidate >= width);
  return withBasePath(best ? src.replace(/\.webp$/, `-${best}.webp`) : src);
}
