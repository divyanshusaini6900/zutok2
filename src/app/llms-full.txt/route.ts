import { llmsFullTxt } from "@/lib/llms";

// Exported as out/llms-full.txt: every product, plan, solution and industry guide with its FAQs, in one Markdown file.
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
