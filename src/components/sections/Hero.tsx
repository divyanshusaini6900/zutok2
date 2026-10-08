"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { Crown, Receipt, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { LogoMark } from "@/components/ui/Logo";
import { WordRotator } from "@/components/ui/WordRotator";
import { DashboardMock } from "@/components/mock/DashboardMock";
import { ScaledFrame } from "@/components/mock/ScaledFrame";
import { cx } from "@/lib/cx";

const chips = [
  { icon: WhatsAppIcon, bg: "#25d366", title: "New WhatsApp lead", sub: "Riya K. · via Zutok AI", x: -1, y: -1, pos: "left-[-2%] top-[10%]" },
  { icon: ShoppingBag, bg: "#ff6b1a", title: "COD confirmed", sub: "Order #1042 · ₹4,299", x: 1, y: -1, pos: "right-[-3%] top-[4%]" },
  { icon: Crown, bg: "#ff4d8d", title: "Gold VIP unlocked", sub: "Priya S. · 1.5x points", x: -1, y: 1, pos: "left-[-4%] bottom-[18%]" },
  { icon: Receipt, bg: "#6c2bd9", title: "Invoice paid", sub: "INV-0231 · ₹18,400", x: 1, y: 1, pos: "right-[-2%] bottom-[26%]" },
];

const platforms = [
  { word: "WhatsApp", bg: "linear-gradient(135deg,#25d366,#128c7e)" },
  { word: "Instagram", bg: "linear-gradient(115deg,#f58529,#dd2a7b 50%,#8134af)" },
  { word: "Messenger", bg: "linear-gradient(135deg,#0099ff,#a033ff)" },
  { word: "Telegram", bg: "linear-gradient(135deg,#2aabee,#1c7fc4)" },
];

const shapes = [
  { cls: "left-[7%] top-[24%] size-14 rounded-full border-[2.5px] border-ink bg-[#22c55e] shadow-[4px_4px_0_#0b0b0b]", d: 0 },
  { cls: "right-[9%] top-[17%] h-14 w-16 bg-ink [clip-path:polygon(0_0,100%_0,50%_100%)]", d: -2 },
  { cls: "left-[11%] top-[64%] h-12 w-14 bg-ink [clip-path:polygon(50%_0,100%_100%,0_100%)]", d: -4 },
  { cls: "right-[13%] top-[60%] size-12 rotate-12 rounded-xl border-[2.5px] border-ink bg-[#ff6b1a] shadow-[4px_4px_0_#0b0b0b]", d: -1 },
  { cls: "left-[40%] top-[14%] size-6 rounded-full border-[2.5px] border-ink bg-[#ff4d8d]", d: -3 },
];

function Line({ children, i, delay, className = "" }: { children: React.ReactNode; i: number; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        className={cx(`block ${className}`)}
        initial={{ y: "110%", rotate: 3 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ delay: delay + i * 0.12, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 150, damping: 32, mass: 0.35 });

  const textY = useTransform(p, [0, 0.45], ["0%", "-30%"]);
  const textOpacity = useTransform(p, [0.04, 0.3], [1, 0]);
  const textScale = useTransform(p, [0, 0.45], [1, 0.9]);
  const devY = useTransform(p, [0, 0.62], ["57vh", "0vh"]);
  const devScale = useTransform(p, [0, 0.62], [0.74, 1]);
  const devRotX = useTransform(p, [0, 0.58], [32, 0]);
  const whiteLayer = useTransform(p, [0.3, 0.72], [1, 0]);
  const markRotate = useTransform(p, [0, 1], [-8, 40]);
  const markScale = useTransform(p, [0, 0.6], [1, 1.6]);
  const [word, setWord] = useState(0);

  return (
    <section ref={ref} className="relative h-[240vh] bg-ink" aria-label="Zutok Softwares">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="dots-light absolute inset-0" />
        <motion.div className="absolute inset-0 bg-paper" style={{ opacity: whiteLayer }}>
          <div className="dots absolute inset-0 opacity-70" />
          <motion.div
            className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 text-ink/[0.05]"
            style={{ rotate: markRotate, scale: markScale }}
          >
            <LogoMark className="h-[62vh] w-[72vh]" />
          </motion.div>
          {shapes.map((s, i) => (
            <motion.span
              key={i}
              className={cx(`absolute hidden lg:block ${s.cls}`)}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0, y: [0, -14, 0] }}
              transition={{
                default: { type: "spring", stiffness: 160, damping: 12, delay: delay + 0.6 + i * 0.08 },
                y: { repeat: Infinity, duration: 4 + i * 0.6, ease: "easeInOut", delay: s.d },
              }}
            />
          ))}
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
          className="relative z-10 mx-auto max-w-7xl px-4 pt-28 text-center text-ink sm:px-6 sm:pt-32"
        >
          <motion.div
            className="mx-auto inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.22em] shadow-[3px_3px_0_#0b0b0b]"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
          >
            <LogoMark className="h-3 w-3.5" />
            ZChat · ZShop · Zloya · CRM
          </motion.div>

          <h1 className="mt-7 text-[11.5vw] font-extrabold leading-[0.95] tracking-[-0.05em] sm:text-7xl md:text-8xl lg:text-[6.2rem]">
            <Line i={0} delay={delay}>
              Sell on{" "}
              <span className="relative inline-block -rotate-2 overflow-hidden rounded-2xl border-[3px] border-ink bg-ink px-3 pb-1 text-white shadow-[5px_5px_0_#0b0b0b] sm:px-4">
                {platforms.map((pl, k) => (
                  <motion.span
                    key={pl.word}
                    className="absolute inset-0"
                    style={{ background: pl.bg }}
                    initial={false}
                    animate={{ opacity: k === word ? 1 : 0 }}
                    transition={{ duration: 0.55 }}
                    aria-hidden
                  />
                ))}
                <span className="relative">
                  <WordRotator
                    words={platforms.map((pl) => pl.word)}
                    label="WhatsApp, Instagram, Messenger and Telegram."
                    onChange={setWord}
                  />
                </span>
              </span>
            </Line>{" "}
            <Line i={1} delay={delay}>
              Ship on time.
            </Line>{" "}
            <Line i={2} delay={delay} className="font-serif font-normal italic tracking-[-0.02em]">
              Bring them back.
            </Line>
          </h1>

          {/* Phones and short screens get a shorter version of the entity sentence below, so the H1 is never left without it. */}
          <motion.p
            className="mx-auto mt-5 max-w-sm text-[15px] font-medium leading-snug text-ink/70 sm:mt-3 sm:max-w-3xl sm:text-base sm:[@media(min-height:821px)]:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.55, duration: 0.8 }}
          >
            Zutok is the all-in-one CRM for Indian businesses.
          </motion.p>

          <motion.p
            className="mx-auto mt-7 hidden max-w-2xl text-lg font-medium leading-relaxed text-ink/70 sm:block [@media(max-height:820px)]:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.55, duration: 0.8 }}
          >
            Zutok is the all-in-one CRM for Indian businesses: a WhatsApp and Instagram inbox with an AI sales agent,
            store automation for COD and carts, and loyalty that turns first-timers into regulars.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.7, duration: 0.8 }}
          >
            <Button href="/#demo">Book a free demo</Button>
            <Button href="/pricing" variant="white">
              See pricing in ₹
            </Button>
          </motion.div>
        </motion.div>

        <motion.div className="absolute inset-0 z-20 flex items-center justify-center [perspective:1800px]" style={{ y: devY }}>
          <motion.div
            style={{ scale: devScale, rotateX: devRotX, transformOrigin: "50% 100%" }}
            className="relative w-[min(92vw,1200px,139vh)]"
          >
            <div className="overflow-hidden rounded-[20px] border-[2.5px] border-ink shadow-[8px_8px_0_#b5b5b5]">
              <ScaledFrame width={1200} height={740} label="Preview of the Zutok CRM dashboard">
                <DashboardMock />
              </ScaledFrame>
            </div>
            {chips.map((c) => (
              <Chip key={c.title} chip={c} p={p} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.3em] text-ink lg:flex [@media(max-height:760px)]:hidden"
          style={{ opacity: textOpacity }}
        >
          Scroll
          <motion.span
            className="block h-6 w-0.5 bg-ink"
            animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function Chip({ chip, p }: { chip: (typeof chips)[number]; p: MotionValue<number> }) {
  const x = useTransform(p, [0.3, 0.7], [0, chip.x * 140]);
  const y = useTransform(p, [0.3, 0.7], [0, chip.y * 90]);
  const opacity = useTransform(p, [0, 0.2, 0.55, 0.75], [0, 1, 1, 0]);
  return (
    // Sample notifications: data-nosnippet keeps them out of search snippets and AI answers.
    <motion.div
      data-nosnippet=""
      className={cx(`brut-sm absolute z-10 hidden items-center gap-3 rounded-2xl bg-white py-3 pl-3 pr-5 lg:flex ${chip.pos}`)}
      style={{ x, y, opacity }}
    >
      <span className="grid size-10 place-items-center rounded-xl border-2 border-ink text-white" style={{ background: chip.bg }}>
        <chip.icon className="size-5" />
      </span>
      <span>
        <span className="block text-sm font-bold text-ink">{chip.title}</span>
        <span className="block text-xs font-medium text-ink/60">{chip.sub}</span>
      </span>
    </motion.div>
  );
}
