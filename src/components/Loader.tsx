"use client";

import { animate, AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const letters = "ZUTOK".split("");
const panels = ["#22c55e", "#ff6b1a", "#ff4d8d", "#0b0b0b"];

export function Loader() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"count" | "wipe" | "done">("count");
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) return;
    const c = animate(0, 100, {
      duration: 1.3,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (counter.current) counter.current.textContent = String(Math.round(v)).padStart(3, "0");
      },
      onComplete: () => setPhase("wipe"),
    });
    return () => c.stop();
  }, [reduced]);

  useEffect(() => {
    if (phase !== "wipe") return;
    const t = setTimeout(() => setPhase("done"), 1350);
    return () => clearTimeout(t);
  }, [phase]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
          // The letters and counter are decoration, not page text, so keep them out of search snippets.
          data-nosnippet=""
        >
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-paper text-ink"
            animate={{ y: phase === "wipe" ? "-100%" : "0%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: phase === "wipe" ? 0.45 : 0 }}
          >
            <div className="dots absolute inset-0 opacity-60" />
            <svg viewBox="-30 -30 492 432" className="relative w-28 sm:w-36" fill="currentColor">
              <motion.path
                d="M122 0H432L277 170Z"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ originX: 0.5, originY: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 16 }}
              />
              <motion.path
                d="M152 205L307 372H0Z"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ originX: 0.5, originY: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 16 }}
              />
              <motion.path
                d="M77 35L357 340"
                fill="none"
                stroke="currentColor"
                strokeWidth="46"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.45, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
            <div className="relative mt-6 flex overflow-hidden font-display text-7xl tracking-[0.14em] sm:text-9xl">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", rotate: 12 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="relative mt-1 text-xs font-extrabold uppercase tracking-[0.8em] sm:text-sm"
              initial={{ opacity: 0, letterSpacing: "1.4em" }}
              animate={{ opacity: 1, letterSpacing: "0.8em" }}
              transition={{ delay: 0.75, duration: 0.8 }}
            >
              Softwares
            </motion.div>
            <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between sm:left-10 sm:right-10">
              <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-70">One CRM · Every customer</span>
              <span className="font-display text-5xl tabular-nums sm:text-7xl">
                <span ref={counter}>000</span>%
              </span>
            </div>
          </motion.div>

          {panels.map((c, i) => (
            <motion.div
              key={c}
              className="absolute inset-0"
              style={{ background: c }}
              initial={{ y: "100%" }}
              animate={phase === "wipe" ? { y: ["100%", "0%", "0%", "-100%"] } : { y: "100%" }}
              transition={{ duration: 1.15, times: [0, 0.38, 0.52, 1], delay: i * 0.06, ease: [0.76, 0, 0.24, 1] }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
