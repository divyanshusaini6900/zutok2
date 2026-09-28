"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${prefix}${new Intl.NumberFormat("en-IN").format(Math.round(v))}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {new Intl.NumberFormat("en-IN").format(value)}
      {suffix}
    </span>
  );
}
