import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";
import { solutionPath, type Solution } from "@/lib/solutions";

export function SolutionCard({ solution, footnote }: { solution: Solution; footnote?: string }) {
  const pop = products[solution.relatedProduct].theme.pop;
  return (
    <Link
      href={solutionPath(solution.slug)}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border-[2.5px] border-ink bg-white p-7 text-ink shadow-[6px_6px_0_#0b0b0b] transition duration-500 hover:-translate-y-1 hover:shadow-[9px_9px_0_#0b0b0b]"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className="rounded-full border-2 border-ink px-3 py-1 text-[11px] font-extrabold uppercase leading-snug tracking-[0.15em] text-ink"
          style={{ background: pop }}
        >
          {solution.kicker}
        </span>
        <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-white transition duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
          <ArrowUpRight className="size-5" aria-hidden />
        </span>
      </div>
      <h3 className="mt-6 text-2xl font-extrabold leading-tight">{solution.name}</h3>
      <p className="mt-3 text-[15px] font-medium leading-relaxed text-ink/70">{solution.summary}</p>
      {footnote && <p className="mt-auto pt-6 text-sm font-bold text-ink/80">{footnote}</p>}
    </Link>
  );
}
