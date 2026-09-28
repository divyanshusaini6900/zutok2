import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is hosted on GitHub Pages (www.zutok.in), which only serves static files.
  output: "export",
  // Emit /pricing/index.html so every route resolves on a static host.
  trailingSlash: true,
};

export default nextConfig;
