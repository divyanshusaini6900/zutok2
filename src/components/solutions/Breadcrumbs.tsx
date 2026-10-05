import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; path: string };

/** Visible trail that mirrors the page's BreadcrumbList JSON-LD. The last item is the current page. */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-ink/60">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="size-4 text-ink/35" aria-hidden />}
              {last ? (
                <span aria-current="page" className="text-ink">
                  {it.name}
                </span>
              ) : (
                <Link href={it.path} className="underline-offset-4 transition hover:text-ink hover:underline">
                  {it.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
