import type { MetadataRoute } from "next";
import { industriesHub, industryPath, industrySlugs } from "@/lib/industries";
import { productList } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";
import { solutionPath, solutionSlugs } from "@/lib/solutions";

// Rendered to out/sitemap.xml by the static export.
export const dynamic = "force-static";

type Route = {
  /** Trailing-slash path, as the static export serves it. */
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  /**
   * Set (as "YYYY-MM-DD") when a page's content last really changed. Without it the URL has no <lastmod>, because a
   * build timestamp on every URL would change on every deploy and teach search engines to ignore the field.
   */
  lastModified?: string;
};

// One group per section of the site, read from the same data modules as the pages so new pages are listed
// automatically. To add a section, import its data module here and add a group.
// The public/*.html redirect stubs (contact, services, case-studies) are noindex and stay out.
const groups: Route[][] = [
  [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/pricing/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about/", priority: 0.6, changeFrequency: "monthly" },
  ],
  productList.map((p) => ({ path: `/products/${p.slug}/`, priority: 0.9, changeFrequency: "monthly" })),
  [
    { path: "/solutions/", priority: 0.8, changeFrequency: "monthly" },
    ...solutionSlugs.map((s): Route => ({ path: solutionPath(s), priority: 0.7, changeFrequency: "monthly" })),
  ],
  [
    { path: industriesHub.path, priority: 0.8, changeFrequency: "monthly" },
    ...industrySlugs.map((s): Route => ({ path: industryPath(s), priority: 0.7, changeFrequency: "monthly" })),
  ],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return groups.flat().map((r) => ({
    url: absoluteUrl(r.path),
    ...(r.lastModified ? { lastModified: r.lastModified } : {}),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
