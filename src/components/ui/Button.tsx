import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Variant = "primary" | "white" | "light" | "outline" | "ghost";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  external?: boolean;
};

const styles: Record<Variant, string> = {
  primary: "border-2 border-ink bg-ink text-white shadow-[4px_4px_0_#b5b5b5] hover:shadow-[6px_6px_0_#b5b5b5]",
  white: "border-2 border-ink bg-white text-ink shadow-[4px_4px_0_#0b0b0b] hover:shadow-[6px_6px_0_#0b0b0b]",
  light: "border-2 border-white bg-white text-ink shadow-[4px_4px_0_#6b6b6b] hover:shadow-[6px_6px_0_#6b6b6b]",
  outline: "border-2 border-white text-white hover:bg-white hover:text-ink",
  ghost: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
};

export function Button({ href, children, variant = "primary", className = "", arrow = true, external = false }: Props) {
  const cls = cx(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-tight transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
    styles[variant],
    className,
  );
  const inner = (
    <>
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowUpRight
          className="relative size-4 transition-transform duration-300 group-hover:rotate-45"
          aria-hidden
        />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
