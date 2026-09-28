import { cx } from "@/lib/cx";

export function LogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 432 372" className={className} fill="currentColor" aria-hidden>
      <path d="M122 0H432L277 170Z" />
      <path d="M152 205L307 372H0Z" />
      <path d="M77 35L357 340" fill="none" stroke="currentColor" strokeWidth="46" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  className = "",
  pill = true,
  short = false,
  light = false,
}: {
  className?: string;
  pill?: boolean;
  short?: boolean;
  light?: boolean;
}) {
  const inner = (
    <span className={cx(`inline-flex items-center gap-2 ${light ? "text-white" : "text-ink"}`)}>
      <LogoMark className="h-[1.2em] w-[1.4em]" />
      <span className="font-sans font-extrabold leading-none tracking-[-0.02em]">{short ? "Zutok" : "Zutok Softwares"}</span>
    </span>
  );
  if (!pill) return <span className={cx(`inline-flex ${className}`)}>{inner}</span>;
  return (
    <span
      className={cx(`inline-flex items-center rounded-full border-[2.5px] px-3.5 py-1.5 ${light ? "border-white" : "border-ink bg-white"} ${className}`)}
    >
      {inner}
    </span>
  );
}
