import Link from "next/link";
import { cx } from "@/lib/cx";

export type Crumb = { name: string; path: string };

/** Visible trail that mirrors the page's BreadcrumbList JSON-LD. The last crumb is the current page. */
export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cx("flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold", light ? "text-white/60" : "text-ink/55")}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={light ? "text-white" : "text-ink"}>
                  {c.name}
                </span>
              ) : (
                <Link
                  href={c.path}
                  className={cx("underline-offset-4 transition hover:underline", light ? "hover:text-white" : "hover:text-ink")}
                >
                  {c.name}
                </Link>
              )}
              {/* The spaces keep the trail readable as plain text ("Home › Industries › …"). */}
              {!last && (
                <>
                  {" "}
                  <span aria-hidden className={light ? "text-white/35" : "text-ink/30"}>
                    ›
                  </span>{" "}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
