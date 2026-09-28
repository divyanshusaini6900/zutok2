"use client";

import { motion } from "motion/react";
import { Cake, Crown, Gift, Sparkles } from "lucide-react";
import { QRGlyph } from "./LoyaltyMocks";

const item = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.25 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
});

export function PassScreen() {
  return (
    <div className="flex h-full flex-col gap-2.5 bg-[linear-gradient(180deg,#ffffff,#fdeaf3)] px-3 pb-3 pt-9 text-ink">
      <motion.div {...item(0)} className="flex items-center justify-between">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#db2777]">Zloya Pass</div>
          <div className="text-[13px] font-extrabold">Spice Route Café</div>
        </div>
        <div className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#6c2bd9] text-white">
          <Crown className="size-3.5" aria-hidden />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotateX: -60, y: 20 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ delay: 0.35, type: "spring", stiffness: 120, damping: 14 }}
        className="relative overflow-hidden rounded-2xl p-3 shadow-[0_14px_30px_-12px_rgba(108,43,217,0.8)]"
        style={{ background: "linear-gradient(135deg,#ff4d8d 0%,#c026d3 52%,#6c2bd9 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "repeating-linear-gradient(115deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 8px)" }}
        />
        <div className="relative flex items-start justify-between text-white">
          <span className="font-serif text-lg italic leading-none">Gold VIP</span>
          <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[8px] font-bold">1.5x points</span>
        </div>
        <div className="relative mt-5 flex items-end justify-between text-white">
          <div>
            <div className="text-[7px] uppercase tracking-widest opacity-70">Member</div>
            <div className="text-[11px] font-bold">Ananya Rao</div>
          </div>
          <div className="font-display text-2xl leading-none">2,340</div>
        </div>
      </motion.div>

      <motion.div {...item(3)} className="rounded-xl bg-white p-2.5 shadow-sm">
        <div className="flex justify-between text-[9px] font-semibold">
          <span>660 pts to Platinum Elite</span>
          <span className="text-[#db2777]">78%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#fde0ec]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#ff4d8d] to-[#6c2bd9]"
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>

      {[
        { icon: Cake, t: "Birthday dessert unlocked", c: "#ff4d8d" },
        { icon: Gift, t: "Free dessert above ₹1,000", c: "#ff6b1a" },
        { icon: Sparkles, t: "Double points this weekend", c: "#6c2bd9" },
      ].map((p, i) => (
        <motion.div key={p.t} {...item(4 + i)} className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-sm">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg text-white" style={{ background: p.c }}>
            <p.icon className="size-3" aria-hidden />
          </span>
          <span className="text-[10px] font-semibold">{p.t}</span>
        </motion.div>
      ))}

      <motion.div
        {...item(7)}
        className="mt-auto flex items-center gap-2.5 rounded-xl border-2 border-dashed border-[#ff4d8d]/60 bg-white p-2"
      >
        <QRGlyph className="size-12 shrink-0" color="#0b0b0b" seed={5} />
        <div>
          <div className="text-[8px] font-bold uppercase tracking-widest text-[#db2777]">Show at counter</div>
          <div className="text-[11px] font-extrabold">WELCOME15</div>
          <div className="text-[8.5px] opacity-70">15% off · valid 14 days</div>
        </div>
      </motion.div>
    </div>
  );
}
