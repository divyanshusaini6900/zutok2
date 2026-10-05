import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is hosted on GitHub Pages (www.zutok.in), which only serves static files.
  output: "export",
  // Emit /pricing/index.html so every route resolves on a static host.
  trailingSlash: true,
  experimental: {
    // app/global-not-found.tsx: a branded out/404.html with its own head, instead of the default page inside the root
    // layout (which inherited the home page's title and "index, follow").
    globalNotFound: true,
  },
};

export default nextConfig;
