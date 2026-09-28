"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import {
  Bell,
  Boxes,
  Briefcase,
  ChartColumn,
  Crown,
  LayoutDashboard,
  MessagesSquare,
  Receipt,
  ShoppingBag,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { cx } from "@/lib/cx";

const W = 560;
const H = 360;
const lift = "shadow-[0_16px_24px_-10px_rgba(0,0,0,0.55)]";

function BaseLayer() {
  return (
    <div className="absolute inset-0 flex overflow-hidden rounded-[22px] border-2 border-ink bg-white shadow-[0_60px_80px_-20px_rgba(0,0,0,0.85)]">
      <div className="flex w-[130px] flex-col gap-1 border-r-2 border-ink bg-[#f1eaff] p-2.5">
        <div className="mb-2 flex items-center gap-1.5 rounded-lg border border-ink bg-white p-1.5">
          <span className="grid size-5 place-items-center rounded-md bg-ink text-white">
            <LogoMark className="h-2.5 w-3" />
          </span>
          <span className="text-[9px] font-extrabold text-ink">Zutok</span>
        </div>
        {[
          { i: LayoutDashboard, t: "Dashboard", on: true, c: "#ffffff" },
          { i: Users, t: "Leads", c: "#6c2bd9" },
          { i: MessagesSquare, t: "Z Chat", c: "#16a34a" },
          { i: ShoppingBag, t: "ZShop", c: "#ff6b1a" },
          { i: Crown, t: "Zloya", c: "#ec4899" },
          { i: Receipt, t: "Sales", c: "#2563eb" },
          { i: UserCog, t: "HRM", c: "#0d9488" },
          { i: Boxes, t: "Inventory", c: "#ea580c" },
          { i: ChartColumn, t: "Reports", c: "#0284c7" },
        ].map((m) => (
          <div
            key={m.t}
            className={cx(`flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[8.5px] font-semibold ${
              m.on ? "bg-[#6c2bd9] text-white" : "text-ink/70"
            }`)}
          >
            <m.i className="size-2.5" style={{ color: m.c }} aria-hidden />
            {m.t}
          </div>
        ))}
      </div>
      <div className="flex-1 bg-[#faf7ff]">
        <div className="flex h-8 items-center justify-between border-b border-ink/10 bg-white px-3">
          <span className="h-3.5 w-28 rounded-full bg-[#f1eaff]" />
          <Bell className="size-3 text-ink/40" aria-hidden />
        </div>
      </div>
    </div>
  );
}

function KpiLayer() {
  return (
    <div className="absolute inset-0 pl-[142px] pr-3 pt-11">
      <div className="grid grid-cols-4 gap-2">
        {[
          { l: "Revenue", v: "₹4.8L", c: "#ffffff", bg: "#6c2bd9" },
          { l: "Leads", v: "128", c: "#16a34a" },
          { l: "Orders", v: "312", c: "#ea580c" },
          { l: "Repeat", v: "38%", c: "#db2777" },
        ].map((k) => (
          <div
            key={k.l}
            className={cx(`rounded-xl border-[1.5px] border-ink p-2 ${lift} ${k.bg ? "text-white" : "bg-white text-ink"}`)}
            style={k.bg ? { background: k.bg } : undefined}
          >
            <div className="text-[7.5px] font-semibold opacity-70">{k.l}</div>
            <div className="text-[13px] font-extrabold">{k.v}</div>
            <div className="mt-0.5 flex items-center gap-0.5 text-[7px] font-bold" style={{ color: k.c }}>
              <TrendingUp className="size-2" aria-hidden /> +12%
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[1.4fr_1fr] gap-2">
        <div className={cx(`flex h-[118px] items-end gap-1 rounded-xl border-[1.5px] border-ink bg-white p-2 ${lift}`)}>
          {[40, 62, 50, 74, 66, 88, 78, 96, 84, 100].map((b, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{ height: `${b}%`, background: i === 7 ? "linear-gradient(#ff4d8d,#6c2bd9)" : "#d9c9ff" }}
            />
          ))}
        </div>
        <div className={cx(`grid h-[118px] place-items-center rounded-xl border-[1.5px] border-ink bg-white ${lift}`)}>
          <div
            className="size-16 rounded-full"
            style={{
              background: "conic-gradient(#22c55e 0 34%, #ff6b1a 0 62%, #ff4d8d 0 80%, #6c2bd9 0)",
              mask: "radial-gradient(circle, transparent 42%, black 43%)",
              WebkitMask: "radial-gradient(circle, transparent 42%, black 43%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PipelineLayer() {
  const cols = [
    { t: "Enquiry", c: "#6c2bd9", n: 3 },
    { t: "Follow-up", c: "#0284c7", n: 2 },
    { t: "Hot", c: "#ea580c", n: 2 },
    { t: "Customer", c: "#16a34a", n: 3 },
  ];
  return (
    <div className="absolute inset-0 grid grid-cols-4 gap-2 pl-[142px] pr-3 pt-[88px]">
      {cols.map((c) => (
        <div key={c.t} className="space-y-1.5">
          <div className="rounded-md px-1.5 py-1 text-[8px] font-bold text-white" style={{ background: c.c }}>
            {c.t}
          </div>
          {Array.from({ length: c.n }).map((_, i) => (
            <div key={i} className={cx(`rounded-lg border border-ink bg-white p-1.5 ${lift}`)}>
              <div className="h-1.5 w-3/4 rounded-full bg-ink/15" />
              <div className="mt-1 h-1.5 w-1/2 rounded-full" style={{ background: `${c.c}66` }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function FloatLayer() {
  return (
    <div className="absolute inset-0">
      <div className={cx(`absolute left-[34%] top-[8%] flex w-[170px] items-center gap-2 rounded-xl border-[1.5px] border-ink bg-white p-2 ${lift}`)}>
        <span className="grid size-6 place-items-center rounded-lg bg-[#25d366] text-white">
          <WhatsAppIcon className="size-3.5" />
        </span>
        <span>
          <span className="block text-[8.5px] font-bold text-ink">Riya: Price for 2 kurtas?</span>
          <span className="block text-[7.5px] font-semibold text-[#16a34a]">Zutok AI replied · 2s</span>
        </span>
      </div>
      <div className={cx(`absolute right-[4%] top-[40%] w-[140px] rounded-xl border-[1.5px] border-ink bg-white p-2 ${lift}`)}>
        <div className="text-[7.5px] font-bold uppercase tracking-wider text-[#6c2bd9]">GST invoice</div>
        <div className="text-[12px] font-extrabold text-ink">₹18,400</div>
        <div className="mt-1 inline-block rounded-full bg-[#dcfce7] px-1.5 text-[7px] font-bold text-[#15803d]">PAID</div>
      </div>
      <div className={cx(`absolute bottom-[10%] left-[30%] flex items-center gap-2 rounded-xl border-[1.5px] border-ink bg-[#ff6b1a] p-2 text-ink ${lift}`)}>
        <ShoppingBag className="size-3.5" aria-hidden />
        <span className="text-[8.5px] font-bold">COD confirmed · #1042</span>
      </div>
      <div className={cx(`absolute bottom-[26%] right-[18%] flex items-center gap-2 rounded-xl border-[1.5px] border-ink bg-[#ff4d8d] p-2 text-ink ${lift}`)}>
        <Crown className="size-3.5" aria-hidden />
        <span className="text-[8.5px] font-bold">Gold VIP unlocked</span>
      </div>
      <div className={cx(`absolute left-[4%] top-[46%] flex items-center gap-2 rounded-xl border-[1.5px] border-ink bg-[#22c55e] p-2 text-ink ${lift}`)}>
        <Briefcase className="size-3.5" aria-hidden />
        <span className="text-[8.5px] font-bold">Payroll done · 24 staff</span>
      </div>
    </div>
  );
}

const layers = [BaseLayer, KpiLayer, PipelineLayer, FloatLayer];

function Layer({ i, p, children }: { i: number; p: MotionValue<number>; children: React.ReactNode }) {
  const z = useTransform(p, [0.08, 0.5], [i * 2, i * 82]);
  return (
    <motion.div className="absolute inset-0" style={{ z, transformStyle: "preserve-3d" }}>
      {children}
    </motion.div>
  );
}

const callouts = [
  { t: "Leads & pipeline", s: "Enquiry → Customer, with Meta & IndiaMART leads", side: "left", top: "18%", at: 0.3, c: "#a78bfa" },
  { t: "WhatsApp inbox", s: "ZChat replies right inside the CRM", side: "left", top: "44%", at: 0.36, c: "#22c55e" },
  { t: "HRM & payroll", s: "Staff, contracts, attendance, salary", side: "left", top: "70%", at: 0.42, c: "#2dd4bf" },
  { t: "KPIs & reports", s: "Revenue, orders and repeat rate live", side: "right", top: "16%", at: 0.33, c: "#ff4d8d" },
  { t: "GST invoices", s: "Proposals, estimates, payments", side: "right", top: "42%", at: 0.39, c: "#60a5fa" },
  { t: "Inventory & orders", s: "Stock in, stock out, every warehouse", side: "right", top: "68%", at: 0.45, c: "#ff6b1a" },
] as const;

function Callout({ c, p }: { c: (typeof callouts)[number]; p: MotionValue<number> }) {
  const opacity = useTransform(p, [c.at, c.at + 0.06], [0, 1]);
  const x = useTransform(p, [c.at, c.at + 0.08], [c.side === "left" ? -40 : 40, 0]);
  const line = useTransform(p, [c.at + 0.02, c.at + 0.1], [0, 1]);
  const left = c.side === "left";
  return (
    <motion.div
      className={cx(`absolute flex items-center gap-3 ${left ? "left-[4%] flex-row" : "right-[4%] flex-row-reverse text-right"}`)}
      style={{ top: c.top, opacity, x }}
    >
      <div className="max-w-[15rem]">
        <div className={cx(`flex items-center gap-2 text-lg font-extrabold leading-tight text-white ${left ? "" : "justify-end"}`)}>
          <span className={cx(`size-2.5 shrink-0 rounded-full xl:hidden ${left ? "" : "order-2"}`)} style={{ background: c.c }} />
          {c.t}
        </div>
        <div className="text-[13px] text-white/65">{c.s}</div>
      </div>
      <motion.span
        className={cx(`relative hidden h-0.5 w-20 rounded-full xl:block ${left ? "origin-left" : "origin-right"}`)}
        style={{ scaleX: line, background: c.c }}
      >
        <span
          className={cx(`absolute top-1/2 size-3 -translate-y-1/2 rounded-full ring-4 ring-white/20 ${left ? "-right-1" : "-left-1"}`)}
          style={{ background: c.c }}
        />
      </motion.span>
    </motion.div>
  );
}

export function ExplodedCRM() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 });
  const rotateZ = useTransform(p, [0, 1], [-46, -28]);
  const rotateX = useTransform(p, [0, 0.5, 1], [62, 56, 50]);
  const stackScale = useTransform(p, [0, 0.5], [0.85, 0.94]);
  const stackY = useTransform(p, [0.08, 0.5], [0, 70]);
  const titleY = useTransform(p, [0, 0.2], [40, 0]);
  const markRotate = useTransform(p, [0, 1], [0, 60]);

  return (
    <section id="platform" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(120%_90%_at_50%_100%,#2e2e2e_0%,#0b0b0b_62%)] text-white">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-white/[0.04]"
          style={{ rotate: markRotate }}
        >
          <LogoMark className="h-[80vh] w-[92vh]" />
        </motion.div>
        <div className="pointer-events-none absolute left-1/2 top-[58%] size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
        <div className="pointer-events-none absolute left-1/2 top-[58%] size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20" />
        <div className="pointer-events-none absolute left-1/2 top-[60%] size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6c2bd9]/40 blur-[120px]" />
        <div className="pointer-events-none absolute left-[62%] top-[70%] size-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4d8d]/25 blur-[110px]" />

        <motion.div className="relative z-10 mx-auto max-w-7xl px-5 pt-24 text-center sm:px-6 sm:pt-28" style={{ y: titleY }}>
          <div className="text-xs font-bold uppercase tracking-[0.35em] text-[#c4b5fd]">Zutok CRM · 30+ modules</div>
          <h2 className="mt-3 text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Engineered to run{" "}
            <span className="inline-block -rotate-2 rounded-2xl bg-white px-3 pb-1 font-serif font-normal italic text-ink shadow-[5px_5px_0_#6b6b6b]">
              everything.
            </span>
          </h2>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 top-[30%] flex items-center justify-center [perspective:2200px]">
          <motion.div style={{ scale: stackScale, y: stackY }} className="origin-center scale-[0.55] sm:scale-75 lg:scale-100">
            <motion.div
              className="relative"
              style={{ width: W, height: H, rotateX, rotateZ, transformStyle: "preserve-3d" }}
            >
              {layers.map((L, i) => (
                <Layer key={i} i={i} p={p}>
                  <L />
                </Layer>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[26%] hidden lg:block">
          {callouts.map((c) => (
            <Callout key={c.t} c={c} p={p} />
          ))}
        </div>

        <div className="absolute inset-x-4 bottom-6 flex flex-wrap justify-center gap-2 lg:hidden">
          {callouts.map((c) => (
            <span key={c.t} className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
              {c.t}
            </span>
          ))}
        </div>

        <div className="absolute bottom-8 right-8 hidden lg:block">
          <Button href="/#modules" variant="light">
            See all modules
          </Button>
        </div>
      </div>
    </section>
  );
}
