"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MouseEvent } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { cx } from "@/lib/cx";

const industries: { icon: IconName; title: string; body: string; uses: string[]; bg: string; fg: string }[] = [
  {
    icon: "food",
    title: "Restaurants & cafés",
    body: "Points at the counter, QR on every table and delivery box, birthday journeys and Google reviews.",
    uses: ["Zloya", "ZChat"],
    bg: "#ff6b1a",
    fg: "#0b0b0b",
  },
  {
    icon: "bag",
    title: "D2C & fashion brands",
    body: "WhatsApp order updates, COD confirmation, cart recovery and an AI that answers “is it in stock?”",
    uses: ["ZShop", "ZChat"],
    bg: "#ff4d8d",
    fg: "#0b0b0b",
  },
  {
    icon: "home",
    title: "Real estate",
    body: "Properties, owners, brokers, buy and rent requests, and site-visit leads from Meta ads.",
    uses: ["CRM", "ZChat"],
    bg: "#22c55e",
    fg: "#0b0b0b",
  },
  {
    icon: "briefcase",
    title: "Agencies & services",
    body: "Proposals, GST invoices, projects, timesheets and a shared inbox for every client.",
    uses: ["CRM", "ZChat"],
    bg: "#6c2bd9",
    fg: "#ffffff",
  },
  {
    icon: "clinic",
    title: "Clinics, labs & salons",
    body: "Appointment chats, test price lists the AI can quote, memberships and repeat-visit reminders.",
    uses: ["ZChat", "Zloya"],
    bg: "#2563eb",
    fg: "#ffffff",
  },
  {
    icon: "store",
    title: "Retail & franchises",
    body: "Inventory, staff attendance, loyalty across outlets, and one view of every customer.",
    uses: ["CRM", "Zloya", "ZShop"],
    bg: "#0b0b0b",
    fg: "#ffffff",
  },
];

function TiltCard({ item, i }: { item: (typeof industries)[number]; i: number }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 200, damping: 18 });
  const glare = useTransform([mx, my], ([x, y]) => `radial-gradient(260px circle at ${Number(x) * 100}% ${Number(y) * 100}%, rgba(255,255,255,0.35), transparent 65%)`);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 120, damping: 16, delay: (i % 3) * 0.08 }}
      className="[perspective:1000px]"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, background: item.bg, color: item.fg, transformStyle: "preserve-3d" }}
        className="relative h-full overflow-hidden rounded-[2rem] border-[2.5px] border-ink p-7 shadow-[6px_6px_0_#0b0b0b]"
      >
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />
        <div className="pointer-events-none absolute -bottom-16 -right-16 size-48 rounded-full bg-white/15" />
        <span
          className="relative grid size-14 place-items-center rounded-2xl border-[2.5px] border-current bg-white/20"
          style={{ transform: "translateZ(40px)" }}
        >
          <Icon name={item.icon} className="size-7" />
        </span>
        <h3 className="relative mt-10 text-2xl font-extrabold" style={{ transform: "translateZ(30px)" }}>
          {item.title}
        </h3>
        <p className="relative mt-2 text-[15px] leading-relaxed opacity-90">{item.body}</p>
        <div className="relative mt-6 flex flex-wrap gap-2">
          {item.uses.map((u) => (
            <span key={u} className="rounded-full border-2 border-current px-3 py-0.5 text-xs font-bold">
              {u}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

const steps = [
  { n: "01", title: "Book a demo", body: "We look at how you sell today and show you the parts of Zutok that fit.", pop: "#a78bfa", dark: true },
  { n: "02", title: "We set it up with you", body: "Channels, store, catalogue, tiers and team, configured together on a call.", pop: "#ff4d8d", dark: false },
  { n: "03", title: "Watch it run", body: "Chats get answered, orders confirmed and guests come back, all in one CRM.", pop: "#22c55e", dark: true },
];

export function Industries() {
  return (
    <section className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="shrink-0 text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
            <SplitText text="Made for how" className="block" />
            <span className="block">
              <SplitText text="India" className="font-serif font-normal italic" delay={0.1} />{" "}
              <SplitText text="sells." delay={0.15} />
            </span>
          </h2>
          <Reveal className="max-w-md text-lg text-ink/70">
            Your customers are on WhatsApp and Instagram, and they walk up to your counter. Zutok connects all of it.
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <TiltCard key={ind.title} item={ind} i={i} />
          ))}
        </div>

        <div className="relative mt-28">
          <Reveal>
            <h2 className="text-center font-display text-6xl uppercase tracking-wide sm:text-8xl">
              Live in <span className="text-outline">3 steps</span>
            </h2>
          </Reveal>
          <div className="relative mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 16, delay: i * 0.12 }}
                className={cx(`relative overflow-hidden rounded-[2rem] border-[2.5px] border-ink p-8 ${
                  s.dark ? "bg-ink text-white shadow-[6px_6px_0_#b5b5b5]" : "bg-white text-ink shadow-[6px_6px_0_#0b0b0b]"
                }`)}
              >
                <span className={cx(`absolute -right-3 -top-8 font-display text-[9rem] leading-none ${s.dark ? "text-white/15" : "text-ink/10"}`)}>
                  {s.n}
                </span>
                <span
                  className="relative inline-block rounded-full border-2 border-ink px-3 py-0.5 text-xs font-extrabold uppercase tracking-[0.2em] text-ink"
                  style={{ background: s.pop }}
                >
                  Step {s.n}
                </span>
                <h3 className="relative mt-10 text-2xl font-extrabold">{s.title}</h3>
                <p className={cx(`relative mt-2 ${s.dark ? "text-white/80" : "text-ink/70"}`)}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
