"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { onboardingSteps } from "@/lib/onboarding";
import type { IndustrySlug } from "@/lib/industries";
import { cx } from "@/lib/cx";

// Each card opens its guide at /industries/<slug>/. Only the slug type is imported, so the guides' copy stays out of
// this client bundle.
const industries: { slug: IndustrySlug; icon: IconName; title: string; body: string; uses: string[]; bg: string; fg: string }[] = [
  {
    slug: "restaurants-cafes",
    icon: "food",
    title: "Restaurants & cafés",
    body: "Points at the counter, QR on every table and delivery box, birthday journeys and Google reviews.",
    uses: ["Zloya", "ZChat"],
    bg: "#ff6b1a",
    fg: "#0b0b0b",
  },
  {
    slug: "d2c-fashion-brands",
    icon: "bag",
    title: "D2C & fashion brands",
    body: "WhatsApp order updates, COD confirmation, cart recovery and an AI that answers “is it in stock?”",
    uses: ["ZShop", "ZChat"],
    bg: "#ff4d8d",
    fg: "#0b0b0b",
  },
  {
    slug: "real-estate",
    icon: "home",
    title: "Real estate",
    body: "Properties, owners, brokers, buy and rent requests, and site-visit leads from Meta ads.",
    uses: ["CRM", "ZChat"],
    bg: "#22c55e",
    fg: "#0b0b0b",
  },
  {
    slug: "agencies-services",
    icon: "briefcase",
    title: "Agencies & services",
    body: "Proposals, GST invoices, projects, timesheets and a shared inbox for every client.",
    uses: ["CRM", "ZChat"],
    bg: "#6c2bd9",
    fg: "#ffffff",
  },
  {
    slug: "clinics-labs-salons",
    icon: "clinic",
    title: "Clinics, labs & salons",
    body: "Appointment chats, test price lists the AI can quote, memberships and repeat-visit reminders.",
    uses: ["ZChat", "Zloya"],
    bg: "#2563eb",
    fg: "#ffffff",
  },
  {
    slug: "retail-franchises",
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
    >
      <Link
        href={`/industries/${item.slug}/`}
        className="group block h-full rounded-[2rem] [perspective:1000px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <motion.div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX: rx, rotateY: ry, background: item.bg, color: item.fg, transformStyle: "preserve-3d" }}
          className="relative h-full overflow-hidden rounded-[2rem] border-[2.5px] border-ink p-7 shadow-[6px_6px_0_#0b0b0b]"
        >
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />
          <div className="pointer-events-none absolute -bottom-16 -right-16 size-48 rounded-full bg-white/15" />
          <span className="relative flex items-start justify-between gap-4 [transform-style:preserve-3d]">
            <span
              className="grid size-14 place-items-center rounded-2xl border-[2.5px] border-current bg-white/20"
              style={{ transform: "translateZ(40px)" }}
            >
              <Icon name={item.icon} className="size-7" />
            </span>
            <span
              className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-white text-ink transition duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white"
              aria-hidden
            >
              <ArrowUpRight className="size-5" />
            </span>
          </span>
          <h3 className="relative mt-10 text-2xl font-extrabold" style={{ transform: "translateZ(30px)" }}>
            {item.title}
          </h3>
          <p className="relative mt-2 text-[15px] leading-relaxed opacity-90">{item.body}</p>
          <div className="relative mt-6 flex flex-wrap gap-2">
            {item.uses.map((u) => (
              <span key={u} className="rounded-full border-2 border-current px-3 py-0.5 text-xs font-bold">
                {u}{" "}
              </span>
            ))}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Card styles for the onboarding steps, in step order.
const stepStyles = [
  { pop: "#a78bfa", dark: true },
  { pop: "#ff4d8d", dark: false },
  { pop: "#22c55e", dark: true },
];
const steps = onboardingSteps.map((s, i) => ({ ...s, ...stepStyles[i % stepStyles.length] }));

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
        <Reveal className="mt-10 flex justify-center">
          <Button href="/industries/" variant="ghost">
            Read the industry guides
          </Button>
        </Reveal>

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
                <span
                  className={cx(`absolute -right-3 -top-8 font-display text-[9rem] leading-none ${s.dark ? "text-white/15" : "text-ink/10"}`)}
                  aria-hidden
                >
                  {s.n}{" "}
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
