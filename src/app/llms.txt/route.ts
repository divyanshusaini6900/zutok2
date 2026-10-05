import { llmsTxt } from "@/lib/llms";

// Exported as out/llms.txt (https://llmstxt.org): a short Markdown index of the site for AI assistants.
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
