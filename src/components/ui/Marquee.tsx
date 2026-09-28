import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";

type Props = {
  items: ReactNode[];
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: ReactNode;
};

export function Marquee({ items, duration = 36, reverse = false, className = "", itemClassName = "", separator }: Props) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <div key={i} className={cx(`flex shrink-0 items-center ${itemClassName}`)}>
          {it}
          {separator}
        </div>
      ))}
    </div>
  );
  return (
    <div className={cx(`flex overflow-hidden ${className}`)}>
      <div
        className={cx(`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`)}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
