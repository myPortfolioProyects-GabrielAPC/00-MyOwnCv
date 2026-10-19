/**
 * Prefixes a public path with the deployment base path (GitHub Pages serves
 * the site from /<repository>). Needed for `next/image` with unoptimized
 * images and for `fetch` calls, which Next.js does not prefix by itself.
 */
export function withBasePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
