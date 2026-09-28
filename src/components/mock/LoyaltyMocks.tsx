"use client";

import { motion } from "motion/react";
import { Crown, Delete, Search, ShieldCheck, Sparkles, Star } from "lucide-react";
import { GoogleIcon } from "@/components/ui/BrandIcons";

export const tiers = [
  {
    name: "Bronze",
    mult: "1x",
    rule: "Welcome tier",
    perk: "1 point per ₹100 + welcome bonus",
    bg: "linear-gradient(135deg,#9a3412 0%,#fb923c 48%,#c2410c 100%)",
    ink: "#fff7ed",
  },
  {
    name: "Silver",
    mult: "1.25x",
    rule: "₹5,000 · 3 visits",
    perk: "Priority table booking",
    bg: "linear-gradient(135deg,#475569 0%,#e2e8f0 50%,#64748b 100%)",
    ink: "#0f172a",
  },
  {
    name: "Gold VIP",
    mult: "1.5x",
    rule: "₹15,000 · 8 visits",
    perk: "Free dessert above ₹1,000",
    bg: "linear-gradient(135deg,#ff4d8d 0%,#c026d3 52%,#6c2bd9 100%)",
    ink: "#ffffff",
  },
  {
    name: "Platinum Elite",
    mult: "2x",
    rule: "₹35,000 · 15 visits",
    perk: "Chef's table & VIP lounge",
    bg: "linear-gradient(135deg,#0b0b0b 0%,#3f3f46 48%,#0b0b0b 100%)",
    ink: "#ffffff",
  },
];

export function TierCard({ tier, name = "Ananya Rao", points = "2,340" }: { tier: (typeof tiers)[number]; name?: string; points?: string }) {
  return (
    <div
      className="relative aspect-[1.586] w-full overflow-hidden rounded-[22px] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]"
      style={{ background: tier.bg, color: tier.ink }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 9px)",
        }}
      />
      <div className="pointer-events-none absolute -right-10 -top-16 size-48 rounded-full bg-white/20 blur-2xl" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] opacity-70">Zloya Pass</div>
            <div className="mt-1 font-serif text-2xl italic leading-none">{tier.name}</div>
          </div>
          <Crown className="size-6 opacity-80" aria-hidden />
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest opacity-60">Member</div>
            <div className="text-sm font-semibold">{name}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest opacity-60">{tier.mult} points</div>
            <div className="font-display text-2xl leading-none tracking-wide">{points}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function POSMock() {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "del"];
  return (
    <div className="w-full overflow-hidden rounded-[26px] border-2 border-ink bg-white text-ink shadow-[8px_8px_0_#0b0b0b]">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#ff4d8d] to-[#6c2bd9] px-5 py-4 text-white">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/80">POS quick counter</div>
          <div className="text-sm font-semibold">Table 7 · Server: Rahul</div>
        </div>
        <ShieldCheck className="size-5 text-white" aria-hidden />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2.5 text-sm">
          <span className="font-semibold opacity-60">+91</span>
          <span className="font-semibold tracking-wider">98290 •••45</span>
          <Search className="ml-auto size-4 opacity-50" aria-hidden />
        </div>
        <motion.div
          className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#fff0f6] to-[#f3ecff] p-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid size-11 place-items-center rounded-full bg-[#6c2bd9] font-bold text-white">A</div>
          <div className="flex-1">
            <div className="text-sm font-bold">Ananya Rao</div>
            <div className="text-[11px] opacity-70">Gold VIP · 11 visits · 🎂 in 3 days</div>
          </div>
          <div className="text-right">
            <div className="font-display text-xl leading-none">2,340</div>
            <div className="text-[10px] opacity-60">points</div>
          </div>
        </motion.div>
        <div className="flex items-end justify-between rounded-xl bg-black/[0.03] px-4 py-3">
          <div className="text-[11px] opacity-60">Bill amount</div>
          <div className="font-display text-3xl tracking-wide">₹1,850</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {keys.map((k) => (
            <div key={k} className="grid h-10 place-items-center rounded-xl bg-black/[0.04] text-sm font-semibold">
              {k === "del" ? <Delete className="size-4" aria-hidden /> : k}
            </div>
          ))}
        </div>
        <motion.div
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4d8d] to-[#6c2bd9] py-3 text-sm font-semibold text-white"
          animate={{ boxShadow: ["0 0 0 0 rgba(255,77,141,0.55)", "0 0 0 12px rgba(255,77,141,0)"] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <Sparkles className="size-4" aria-hidden /> Award 28 points (1.5×)
        </motion.div>
      </div>
    </div>
  );
}

function qrCells(seed: number) {
  const size = 21;
  const cells: boolean[] = [];
  let s = seed;
  for (let i = 0; i < size * size; i++) {
    s = (s * 9301 + 49297) % 233280;
    cells.push(s / 233280 > 0.52);
  }
  return { size, cells };
}

export function QRGlyph({ className = "", color = "#0b0b0b", seed = 7 }: { className?: string; color?: string; seed?: number }) {
  const { size, cells } = qrCells(seed);
  const finder = (x: number, y: number) => {
    const inBox = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
    return inBox(0, 0) || inBox(size - 7, 0) || inBox(0, size - 7);
  };
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} shapeRendering="crispEdges" aria-hidden>
      {cells.map((on, i) => {
        const x = i % size;
        const y = Math.floor(i / size);
        if (finder(x, y) || !on) return null;
        return <rect key={i} x={x} y={y} width="1" height="1" fill={color} />;
      })}
      {[
        [0, 0],
        [size - 7, 0],
        [0, size - 7],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x + 0.5} y={y + 0.5} width="6" height="6" fill="none" stroke={color} strokeWidth="1" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill={color} />
        </g>
      ))}
    </svg>
  );
}

export function QRStandee() {
  return (
    <div className="relative mx-auto w-full max-w-[260px]">
      <div className="arch relative overflow-hidden border-2 border-ink bg-gradient-to-b from-[#ff4d8d] to-[#6c2bd9] px-6 pb-6 pt-14 text-center text-paper shadow-[8px_8px_0_#0b0b0b]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.35),transparent_70%)]" />
        <div className="relative text-[10px] uppercase tracking-[0.35em] text-white/80">Table 07</div>
        <div className="relative mt-2 font-serif text-3xl italic leading-none">
          Scan & <span className="underline decoration-2 underline-offset-4">earn</span>
        </div>
        <div className="relative mx-auto mt-5 w-36 rounded-2xl bg-paper p-3">
          <QRGlyph className="w-full" />
        </div>
        <div className="relative mt-4 text-sm font-semibold">50 bonus points</div>
        <div className="relative text-[11px] opacity-70">on your first scan</div>
      </div>
      <div className="mx-auto h-4 w-40 rounded-b-xl border-2 border-t-0 border-ink bg-[#4c1d95]" />
    </div>
  );
}

export function ReviewMock() {
  return (
    <div className="w-full rounded-[26px] border-2 border-ink bg-white p-5 text-ink shadow-[8px_8px_0_#0b0b0b]">
      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#db2777]">How was your evening?</div>
      {[
        ["Food & taste", 5],
        ["Staff & service", 5],
        ["Ambience & music", 4],
        ["Cleanliness", 5],
      ].map(([label, n], i) => (
        <div key={label as string} className="mt-3 flex items-center justify-between text-sm">
          <span>{label}</span>
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, s) => (
              <motion.span
                key={s}
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 + s * 0.05, type: "spring", stiffness: 300 }}
              >
                <Star
                  className="size-4"
                  fill={s < (n as number) ? "#ff6b1a" : "transparent"}
                  stroke={s < (n as number) ? "#ff6b1a" : "#d4d4d4"}
                  aria-hidden
                />
              </motion.span>
            ))}
          </span>
        </div>
      ))}
      <motion.div
        className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f6f8fc] p-3"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >
        <GoogleIcon className="size-7" />
        <div className="flex-1 text-[12px]">
          <div className="font-semibold">Loved it? Share on Google</div>
          <div className="opacity-60">Happy guests go straight to your review page</div>
        </div>
      </motion.div>
    </div>
  );
}
