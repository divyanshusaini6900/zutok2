"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Cake, Crown, Gift, Heart, Hourglass, MessageSquareHeart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Wave } from "@/components/ui/Wave";
import { POSMock, QRStandee, ReviewMock, tiers } from "@/components/mock/LoyaltyMocks";

const extras = [
  ["480", "Welcome bonus on the first bill"],
  ["1,260", "Priority table booking unlocked"],
  ["2,340", "Free dessert on every visit above ₹1,000"],
  ["6,820", "Chef's table and VIP lounge access"],
];

function BigTier({ i }: { i: number }) {
  const t = tiers[i];
  return (
    <div
      className="relative aspect-[1.58] w-full overflow-hidden rounded-[28px] border-2 border-white/20 p-6 shadow-[0_40px_70px_-30px_rgba(0,0,0,0.8)] sm:p-8"
      style={{ background: t.bg, color: t.ink }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
        style={{ backgroundImage: "repeating-linear-gradient(115deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 10px)" }}
      />
      <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-white/25 blur-2xl" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.35em] opacity-70">Zloya Pass · Tier {i + 1}</div>
            <div className="mt-2 font-serif text-4xl italic leading-none sm:text-5xl">{t.name}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Crown className="size-8 opacity-85" aria-hidden />
            <span className="rounded-full bg-black/15 px-3 py-1 text-xs font-bold">{t.mult} points</span>
          </div>
        </div>
        <div className="mt-4 max-w-xs text-sm font-semibold opacity-85">{extras[i][1]}</div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest opacity-65">Unlocks at</div>
            <div className="text-sm font-bold">{t.rule}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest opacity-65">Ananya&apos;s points</div>
            <div className="font-display text-4xl leading-none tracking-wide sm:text-5xl">{extras[i][0]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StackCard({ i, n, p }: { i: number; n: number; p: MotionValue<number> }) {
  const scale = useTransform(p, [i / n, 1], [1, 1 - (n - 1 - i) * 0.06]);
  const shade = useTransform(p, [i / n, 1], [0, (n - 1 - i) * 0.16]);
  return (
    <div className="sticky" style={{ top: `calc(18vh + ${i * 28}px)` }}>
      <motion.div className="relative origin-top" style={{ scale }}>
        <BigTier i={i} />
        <motion.div className="pointer-events-none absolute inset-0 rounded-[28px] bg-black" style={{ opacity: shade }} />
      </motion.div>
    </div>
  );
}

const segments = ["New guests", "Regulars", "Potential VIPs", "Slipping (30d)", "Lost (60d+)", "Birthdays"];

const journeys = [
  { icon: Heart, name: "First-visit welcome", reward: "15% off · valid 14 days", bg: "#ff4d8d", fg: "#0b0b0b" },
  { icon: Cake, name: "Birthday celebration", reward: "Free dessert + double points", bg: "#6c2bd9", fg: "#ffffff" },
  { icon: Gift, name: "We miss you (30 days)", reward: "Flat ₹100 off voucher", bg: "#ff6b1a", fg: "#0b0b0b" },
  { icon: Hourglass, name: "Points expiry alert", reward: "Use them before they expire", bg: "#22c55e", fg: "#0b0b0b" },
  { icon: MessageSquareHeart, name: "Post-visit feedback", reward: "30-second rating link", bg: "#2563eb", fg: "#ffffff" },
];

export function ZloyaStack({ from = "#ffffff" }: { from?: string }) {
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stack, offset: ["start 0.2", "end end"] });

  return (
    <section id="zloya" className="relative">
      <div style={{ background: from }}>
        <Wave fill="#0b0b0b" back="#ff4d8d" />
      </div>
      <div className="relative overflow-x-clip bg-ink text-paper">
        <div className="dots-light pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-40 top-40 size-[34rem] rounded-full bg-[#ff4d8d]/20 blur-[140px]" />
        <div className="pointer-events-none absolute -right-40 bottom-60 size-[30rem] rounded-full bg-[#6c2bd9]/25 blur-[140px]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 pb-10 pt-16 sm:px-6 lg:grid-cols-[1fr_1.05fr]">
          <div className="lg:sticky lg:top-[18vh] lg:self-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-[#ff4d8d] px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-ink shadow-[3px_3px_0_#ffffff]">
                <Crown className="size-3.5" aria-hidden /> Zloya
              </span>
            </Reveal>
            <h2 className="mt-6 font-serif text-6xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              <SplitText text="First visit." className="block" />
              <SplitText text="Second visit." className="block text-paper/55" delay={0.1} />
              <SplitText text="Regular for life." className="block italic text-[#ff7aa8]" delay={0.2} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/75">
                Loyalty and retention for restaurants, cafés, salons and stores. Guests earn points at the counter, climb
                four VIP tiers and get personal messages that bring them back.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-7 flex flex-wrap gap-2">
              {segments.map((s) => (
                <span key={s} className="rounded-full border border-paper/25 bg-white/5 px-3.5 py-1.5 text-sm font-semibold">
                  {s}{" "}
                </span>
              ))}
            </Reveal>
            <Reveal delay={0.35} className="mt-8 flex flex-wrap gap-3">
              <Button href="/products/zloya" variant="light">
                Explore Zloya
              </Button>
              <Button href="/pricing#zloya" variant="outline">
                From ₹999/mo
              </Button>
            </Reveal>
          </div>

          <div ref={stack} className="relative space-y-[26vh] pb-[12vh]">
            {tiers.map((_, i) => (
              <StackCard key={i} i={i} n={tiers.length} p={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-ink">
        <Wave fill="#ffffff" back="#ff4d8d" />
      </div>

      <div className="bg-paper pb-24 pt-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <h3 className="text-center text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
              At the counter. On the table. <span className="font-serif font-normal italic">On Google.</span>
            </h3>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 items-end gap-10 lg:grid-cols-3">
            <Reveal>
              <POSMock />
              <p className="mt-5 text-center text-sm font-semibold text-ink/65">POS counter: bill in, points out, OTP to redeem</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:-translate-y-14">
              <QRStandee />
              <p className="mt-5 text-center text-sm font-semibold text-ink/65">Smart QR on tables and Swiggy / Zomato packs</p>
            </Reveal>
            <Reveal delay={0.2}>
              <ReviewMock />
              <p className="mt-5 text-center text-sm font-semibold text-ink/65">Happy guests go to Google, unhappy ones alert you</p>
            </Reveal>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {journeys.map((j, i) => (
              <motion.div
                key={j.name}
                initial={{ opacity: 0, y: 40, rotate: i % 2 ? 4 : -4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 140, damping: 16, delay: i * 0.06 }}
                whileHover={{ y: -8, rotate: i % 2 ? 2 : -2 }}
                className="rounded-3xl border-2 border-ink p-5 shadow-[5px_5px_0_#0b0b0b]"
                style={{ background: j.bg, color: j.fg }}
              >
                <span className="grid size-11 place-items-center rounded-2xl border-2 border-current bg-white/20">
                  <j.icon className="size-5" aria-hidden />
                </span>
                <div className="mt-6 text-lg font-extrabold leading-tight">{j.name}</div>
                <div className="mt-1 text-sm font-medium opacity-80">{j.reward}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
