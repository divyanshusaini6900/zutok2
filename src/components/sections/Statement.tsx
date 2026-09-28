"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Counter } from "@/components/ui/Counter";
import { Wave } from "@/components/ui/Wave";
import { cx } from "@/lib/cx";

const text =
  "Your customers already message you on [WhatsApp], comment on [Instagram] and walk up to your [counter]. Zutok turns every chat, order and visit into [one CRM], so no customer slips away.";

const colors: Record<string, { bg: string; fg: string }> = {
  WhatsApp: { bg: "#22c55e", fg: "#0b0b0b" },
  Instagram: { bg: "linear-gradient(115deg,#f58529,#dd2a7b 55%,#8134af)", fg: "#ffffff" },
  counter: { bg: "#ff6b1a", fg: "#0b0b0b" },
  "one CRM": { bg: "#0b0b0b", fg: "#ffffff" },
};

type Token = { word: string; key?: string };

function tokenize(s: string): Token[] {
  const out: Token[] = [];
  const re = /\[([^\]]+)\]|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m[1]) out.push({ word: m[1], key: m[1] });
    else out.push({ word: m[2] });
  }
  return out;
}

const tokens = tokenize(text);

function Word({ t, i, n, p }: { t: Token; i: number; n: number; p: MotionValue<number> }) {
  const start = i / n;
  const end = start + 1.5 / n;
  const opacity = useTransform(p, [start, end], [0.14, 1]);
  const accent = t.key ? colors[t.key] : undefined;
  const bg = useTransform(p, [start, end], [0, 1]);
  const color = useTransform(p, [start, end], ["#0b0b0b", accent ? accent.fg : "#0b0b0b"]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      {accent && (
        <motion.span
          className="absolute -inset-x-1.5 inset-y-1 -z-10 origin-left rounded-lg border-2 border-ink shadow-[3px_3px_0_#0b0b0b]"
          style={{ background: accent.bg, scaleX: bg }}
        />
      )}
      <motion.span style={{ opacity, color }} className={accent ? "px-1" : ""}>
        {t.word}
      </motion.span>
    </span>
  );
}

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  return (
    <section className="relative bg-paper py-24 sm:py-36">
      <div ref={ref} className="relative isolate mx-auto max-w-6xl px-5 sm:px-6">
        <p className="text-[2rem] font-extrabold leading-[1.18] tracking-tight text-ink sm:text-5xl lg:text-[4.1rem]">
          {tokens.map((t, i) => (
            <Word key={i} t={t} i={i} n={tokens.length} p={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  );
}

const stats = [
  { value: 4, label: "messaging channels, one inbox", color: "#22c55e" },
  { value: 30, suffix: "+", label: "CRM modules, leads to payroll", color: "#a78bfa" },
  { value: 32, label: "Shopify webhook topics synced", color: "#ff6b1a" },
  { value: 24, suffix: "/7", label: "AI agent replying to buyers", color: "#ff4d8d" },
];

export function StatsBand() {
  return (
    <section className="relative">
      <div className="bg-paper">
        <Wave fill="#0b0b0b" back="#ff6b1a" />
      </div>
      <div className="bg-ink py-14 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 sm:px-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className={cx(`px-4 ${i > 0 ? "lg:border-l-2 lg:border-white/20" : ""}`)}
            >
              <div className="font-display text-7xl leading-none tracking-wide sm:text-8xl" style={{ color: s.color }}>
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 max-w-[12rem] text-sm font-bold text-white/80">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-paper">
        <Wave fill="#0b0b0b" flip back="#ff6b1a" />
      </div>
    </section>
  );
}
