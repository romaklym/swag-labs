import type { NextConfig } from "next";

// This site is hosted on GitHub Pages as a *project* site:
//   https://romaklym.github.io/swag-labs/
// so every route and asset must live under the "/swag-labs" base path. The
// store has no backend, so we emit a fully static site (`output: "export"`).
//
// Keep `basePath` in sync with BASE_PATH in src/lib/swag.ts — that constant is
// used to prefix plain <img> tags, which Next does NOT rewrite for basePath the
// way it does for <Link> and the router.
const basePath = process.env.NODE_ENV === "production" ? "/swag-labs" : "";

const nextConfig: NextConfig = {
  output: "export", // emit static HTML/CSS/JS into ./out at build time
  basePath,
  trailingSlash: true, // /inventory -> /inventory/index.html (no server rewrites)
  images: { unoptimized: true }, // no Image Optimization server on Pages
};

export default nextConfig;
