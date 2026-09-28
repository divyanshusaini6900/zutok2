"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";

export function WordRotator({
  words,
  colors,
  interval = 2200,
  className = "",
  wordClassName = "",
  onChange,
}: {
  words: string[];
  colors?: string[];
  interval?: number;
  className?: string;
  wordClassName?: string;
  onChange?: (index: number) => void;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  useEffect(() => {
    onChange?.(i);
  }, [i, onChange]);

  return (
    <span className={cx(`relative inline-grid align-bottom [perspective:600px] ${className}`)}>
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1" aria-hidden>
          {w}
        </span>
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={words[i]}
          className={cx(`col-start-1 row-start-1 origin-bottom ${wordClassName}`)}
          style={colors ? { color: colors[i % colors.length] } : undefined}
          initial={{ y: "70%", rotateX: -85, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          exit={{ y: "-70%", rotateX: 85, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{words[0]}</span>
    </span>
  );
}
