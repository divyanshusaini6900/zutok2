"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  blur?: boolean;
};

export function Reveal({ delay = 0, y = 40, x = 0, scale = 1, blur = false, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale, filter: blur ? "blur(12px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
