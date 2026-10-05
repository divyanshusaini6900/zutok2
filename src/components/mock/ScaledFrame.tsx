"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";

export function ScaledFrame({
  width,
  height,
  children,
  className = "",
  label,
}: {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
  /** Describes the mock as one image for screen readers instead of its sample data. */
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    // data-nosnippet keeps the mock's sample figures out of search snippets and AI answers; nothing visible changes.
    <div
      ref={ref}
      data-nosnippet=""
      className={cx(`relative w-full ${className}`)}
      style={{ aspectRatio: `${width} / ${height}` }}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale ?? 0.5})`, visibility: scale === null ? "hidden" : "visible" }}
      >
        {children}
      </div>
    </div>
  );
}

export function BrowserChrome({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-ink/10 bg-white shadow-[0_50px_120px_-40px_rgba(60,40,140,0.45)]">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-ink/5 bg-[#f6f5fa] px-4">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#ff9f43]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <div className="ml-4 flex h-6 max-w-md flex-1 items-center justify-center gap-1.5 rounded-md bg-white text-[11px] text-ink/45 ring-1 ring-ink/5">
          <svg viewBox="0 0 24 24" className="size-3" aria-hidden>
            <path fill="currentColor" d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 1 1 6 0v3H9Z" />
          </svg>
          {url}
        </div>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}
