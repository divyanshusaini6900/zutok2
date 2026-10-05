import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { industryPath, type Industry } from "@/lib/industries";
import { products } from "@/lib/products";
import { brandedName } from "@/lib/seo";

/**
 * Link card for an industry guide, in the home page Industries card colours.
 * The heading's link stretches over the whole card, so the product chips stay plain text.
 */
export function IndustryCard({
  industry,
  text = industry.tagline,
  heading: Heading = "h3",
}: {
  industry: Industry;
  text?: string;
  heading?: "h2" | "h3";
}) {
  const t = industry.theme;
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border-[2.5px] border-ink p-7 shadow-[6px_6px_0_#0b0b0b] transition duration-500 hover:-translate-y-1 hover:shadow-[9px_9px_0_#0b0b0b]"
      style={{ background: t.bg, color: t.fg }}
    >
      <div className="pointer-events-none absolute -bottom-16 -right-16 size-48 rounded-full bg-white/15" />
      <div className="relative flex items-start justify-between gap-4">
        <span className="grid size-14 place-items-center rounded-2xl border-[2.5px] border-current bg-white/20">
          <Icon name={industry.icon} className="size-7" />
        </span>
        <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-white text-ink transition duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
          <ArrowUpRight className="size-5" aria-hidden />
        </span>
      </div>
      <Heading className="mt-8 text-2xl font-extrabold">
        <Link href={industryPath(industry.slug)} className="after:absolute after:inset-0 after:z-10 after:content-['']">
          {industry.name}
        </Link>
      </Heading>
      <p className="relative mt-2 flex-1 text-[15px] leading-relaxed opacity-90">{text}</p>
      <ul className="relative mt-6 flex flex-wrap gap-2" aria-label="Zutok products used">
        {industry.uses.map((slug) => (
          <li key={slug} className="rounded-full border-2 border-current px-3 py-0.5 text-xs font-bold">
            {brandedName(products[slug])}
          </li>
        ))}
      </ul>
    </div>
  );
}
