import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

// Rendered to out/robots.txt by the static export.
export const dynamic = "force-static";

// Search and AI answer-engine crawlers, named so it is explicit that they are welcome.
// A crawler that matches a named group ignores the "*" group, so keep both groups' rules identical.
const answerEngines = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "DuckAssistBot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "CCBot",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: answerEngines, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
