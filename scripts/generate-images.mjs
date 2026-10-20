// Writes smaller copies of the images listed in src/lib/image-loader.ts, so the
// browser can pick a size that fits the screen. GitHub Pages cannot resize
// images on request, so this runs ahead of time:  npm run images
import sharp from "sharp";
import { existsSync } from "node:fs";
import { join } from "node:path";

const publicDir = new URL("../public/", import.meta.url).pathname;

// Source file (largest size) and the smaller widths to create from it.
const images = [{ file: "images/gabriel-perfil.webp", widths: [320, 640] }];

for (const { file, widths } of images) {
  const source = join(publicDir, file);
  if (!existsSync(source)) {
    console.warn(`skipped, not found: ${file}`);
    continue;
  }
  for (const width of widths) {
    const target = source.replace(/\.webp$/, `-${width}.webp`);
    const info = await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(target);
    console.log(`${file.replace(/\.webp$/, `-${width}.webp`)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
  }
}
