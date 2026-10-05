"use client";

import { motion } from "motion/react";
import { cx } from "@/lib/cx";

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  immediate?: boolean;
};

export function SplitText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.06,
  as = "span",
  immediate = false,
}: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  const variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const trigger = immediate
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-40px" } };

  return (
    <Tag className={className} variants={variants} {...trigger}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={cx(`inline-block will-change-transform ${wordClassName}`)}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {w}
            {/* Non-breaking space between words; the last word's plain space is dropped at the end of
                its line, so it only keeps this text apart from the next block in the raw HTML. */}
            {i < words.length - 1 ? "\u00a0" : " "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
