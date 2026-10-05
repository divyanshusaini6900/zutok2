"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";

const listOf = (words: string[]) =>
  words.length > 1 ? `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}` : (words[0] ?? "");

/**
 * Visible words are drawn from `data-word` with ::before, so the only text node is the
 * screen-reader label. The raw HTML then reads as one sentence, e.g. "WhatsApp, Instagram and Telegram".
 */
export function WordRotator({
  words,
  colors,
  interval = 2200,
  className = "",
  wordClassName = "",
  label,
  onChange,
}: {
  words: string[];
  colors?: string[];
  interval?: number;
  className?: string;
  wordClassName?: string;
  /** Text for screen readers and crawlers. Defaults to every word as a list. */
  label?: string;
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
        <span key={w} data-word={w} className="invisible col-start-1 row-start-1 before:content-[attr(data-word)]" aria-hidden />
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={words[i]}
          data-word={words[i]}
          className={cx(`col-start-1 row-start-1 origin-bottom before:content-[attr(data-word)] ${wordClassName}`)}
          style={colors ? { color: colors[i % colors.length] } : undefined}
          initial={{ y: "70%", rotateX: -85, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          exit={{ y: "-70%", rotateX: 85, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
      </AnimatePresence>
      <span className="sr-only">{label ?? listOf(words)}</span>
    </span>
  );
}
