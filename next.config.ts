import type { NextConfig } from "next";

// The site is published as a GitHub Pages project site, so production URLs
// live under /<repository>. Development keeps serving from the root.
const basePath = process.env.NODE_ENV === "production" ? "/00-MyOwnCv" : "";

const nextConfig: NextConfig = {
  // Static export: the mock API routes are rendered to JSON files at build time.
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // The default image loader needs a server; this one picks pre-made copies.
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
