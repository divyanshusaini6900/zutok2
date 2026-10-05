"use client";

import { motion } from "motion/react";
import {
  Bell,
  Boxes,
  Briefcase,
  ChartColumn,
  Crown,
  Home,
  LayoutDashboard,
  MessagesSquare,
  Plus,
  Receipt,
  Search,
  Settings,
  ShoppingBag,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";
import { BrowserChrome } from "./ScaledFrame";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { cx } from "@/lib/cx";

const menu = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Leads", badge: "12", color: "#6c2bd9" },
  { icon: MessagesSquare, label: "Z Chat", badge: "5", color: "#16a34a" },
  { icon: ShoppingBag, label: "ZShop", color: "#ff6b1a" },
  { icon: Crown, label: "Zloya Retention", color: "#ec4899" },
  { icon: Receipt, label: "Sales", color: "#0891b2" },
  { icon: Briefcase, label: "Projects", color: "#db2777" },
  { icon: UserCog, label: "HRM", color: "#65a30d" },
  { icon: Boxes, label: "Inventory", color: "#ea580c" },
  { icon: Home, label: "Real Estate", color: "#059669" },
  { icon: ChartColumn, label: "Reports", color: "#0284c7" },
];

const kpis = [
  { label: "Revenue this month", value: "₹4,82,900", delta: "+24.8%", color: "#6c2bd9", tint: "#e4dbff" },
  { label: "New leads", value: "128", delta: "+18", color: "#16a34a", tint: "#cdf3de" },
  { label: "Store orders", value: "312", delta: "+9.2%", color: "#ff6b1a", tint: "#ffdcc6" },
  { label: "Repeat guests", value: "38%", delta: "+6 pts", color: "#ec4899", tint: "#ffd9ea" },
];

const bars = [42, 58, 49, 71, 64, 88, 76, 94, 81, 100, 90, 97];

const donut = [
  { label: "ZChat", value: 34, color: "#16a34a" },
  { label: "ZShop", value: 28, color: "#ff6b1a" },
  { label: "Zloya", value: 18, color: "#ec4899" },
  { label: "Services", value: 20, color: "#6c2bd9" },
];

const activity = [
  { dot: "#16a34a", title: "New WhatsApp lead", sub: "Aarav M. asked about bulk pricing", time: "2m" },
  { dot: "#ff6b1a", title: "COD confirmed", sub: "Order #1042 · ₹4,299", time: "6m" },
  { dot: "#ec4899", title: "Gold VIP unlocked", sub: "Priya S. crossed ₹15,000", time: "14m" },
  { dot: "#6c2bd9", title: "Invoice paid", sub: "INV-0231 · ₹18,400", time: "32m" },
];

const R = 58;
const C = 2 * Math.PI * R;
const arcs = donut.map((d, i) => ({
  ...d,
  len: (d.value / 100) * C,
  offset: -donut.slice(0, i).reduce((s, x) => s + (x.value / 100) * C, 0),
}));

function Donut() {
  return (
    <svg viewBox="0 0 160 160" className="size-40 -rotate-90" aria-hidden>
      <circle cx="80" cy="80" r={R} fill="none" stroke="#f1eff7" strokeWidth="22" />
      {arcs.map((d, i) => (
        <motion.circle
          key={d.label}
          cx="80"
          cy="80"
          r={R}
          fill="none"
          stroke={d.color}
          strokeWidth="22"
          strokeDashoffset={d.offset}
          initial={{ strokeDasharray: `0 ${C}` }}
          whileInView={{ strokeDasharray: `${d.len - 3} ${C}` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}

const panel = "rounded-2xl border border-ink/[0.06] bg-white shadow-[0_8px_24px_-16px_rgba(23,20,42,0.25)]";

export function DashboardMock() {
  return (
    <BrowserChrome url="crm.zutok.in/admin">
      <div className="flex h-full text-ink">
        <aside className="flex w-[220px] shrink-0 flex-col gap-1 border-r border-ink/5 bg-gradient-to-b from-[#f1eaff] to-[#ffe9ef] p-3">
          <div className="mb-3 flex items-center gap-3 rounded-2xl border border-ink/5 bg-white p-3 shadow-sm">
            <div className="grid size-10 place-items-center rounded-xl border-2 border-ink bg-white text-ink">
              <LogoMark className="h-5 w-6" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-bold">Zutok</div>
              <div className="truncate text-[11px] text-ink/45">admin@zutok.in</div>
            </div>
          </div>
          {menu.map((m) => (
            <div
              key={m.label}
              className={cx(`flex items-center gap-3 rounded-xl px-3 py-2 text-[12.5px] ${
                m.active ? "bg-violet font-semibold text-white shadow-[0_8px_20px_-8px_#6c2bd9]" : "text-ink/65"
              }`)}
            >
              <m.icon className="size-4" style={{ color: m.active ? "white" : m.color }} aria-hidden />
              <span className="flex-1">{m.label}</span>
              {m.badge && (
                <span className="rounded-full bg-[#ede4ff] px-1.5 text-[10px] font-semibold text-violet">{m.badge}</span>
              )}
            </div>
          ))}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col bg-[#f9f6ff]">
          <div className="flex h-14 shrink-0 items-center gap-3 border-b border-ink/5 bg-white px-5">
            <Logo className="text-[11px]" />
            <div className="ml-2 flex h-8 w-64 items-center gap-2 rounded-full bg-[#f3f2f8] px-3 text-[12px] text-ink/40">
              <Search className="size-3.5" aria-hidden /> Search leads, orders, guests…
            </div>
            <div className="grid size-8 place-items-center rounded-lg bg-violet text-white">
              <Plus className="size-4" aria-hidden />
            </div>
            <div className="ml-auto flex items-center gap-4 text-ink/50">
              <Settings className="size-4" aria-hidden />
              <div className="relative">
                <Bell className="size-4" aria-hidden />
                <span className="absolute -right-1 -top-1 size-2 rounded-full bg-shop" />
              </div>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[1fr_300px] gap-4 p-5">
            <div className="flex min-w-0 flex-col gap-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet">Business overview</div>
                  <div className="text-xl font-bold">Good morning, Zutok 👋</div>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-[11px] text-ink/60 shadow-sm">September 2026</div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {kpis.map((k, i) => (
                  <motion.div
                    key={k.label}
                    className="relative overflow-hidden rounded-2xl p-4 shadow-[0_8px_24px_-16px_rgba(23,20,42,0.3)]"
                    style={{ background: `linear-gradient(145deg, ${k.tint}, #ffffff)` }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.7 }}
                  >
                    <div className="absolute -right-5 -top-5 size-16 rounded-full opacity-20" style={{ background: k.color }} />
                    <div className="relative text-[11px] text-ink/55">{k.label}</div>
                    <div className="relative mt-2 text-[22px] font-bold tracking-tight">{k.value}</div>
                    <div
                      className="relative mt-1 inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[11px] font-semibold"
                      style={{ color: k.color }}
                    >
                      <TrendingUp className="size-3" aria-hidden /> {k.delta}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-3">
                <div className={cx(`flex flex-col p-4 ${panel}`)}>
                  <div className="flex items-center justify-between">
                    <div className="text-[13px] font-semibold">Monthly revenue</div>
                    <div className="text-[11px] text-ink/40">₹ in thousands</div>
                  </div>
                  <div className="mt-4 flex flex-1 items-end gap-2">
                    {bars.map((b, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t-md"
                        style={{
                          background:
                            i === bars.length - 3
                              ? "linear-gradient(180deg,#ec4899,#6c2bd9)"
                              : "linear-gradient(180deg,#a996ff,#e4ddff)",
                        }}
                        initial={{ height: "4%" }}
                        whileInView={{ height: `${b}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] text-ink/35">
                    {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
                <div className={cx(`flex flex-col items-center p-4 ${panel}`)}>
                  <div className="self-start text-[13px] font-semibold">Revenue by product</div>
                  <div className="relative mt-2">
                    <Donut />
                    <div className="absolute inset-0 grid place-items-center text-center">
                      <div>
                        <div className="text-lg font-bold">₹4.8L</div>
                        <div className="text-[10px] text-ink/45">this month</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid w-full grid-cols-2 gap-x-3 gap-y-1.5">
                    {donut.map((d) => (
                      <div key={d.label} className="flex items-center gap-2 text-[11px] text-ink/70">
                        <span className="size-2 rounded-full" style={{ background: d.color }} />
                        {d.label}
                        <span className="ml-auto text-ink/40">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className={cx(`p-4 ${panel}`)}>
                <div className="text-[13px] font-semibold">Live activity</div>
                <div className="mt-3 space-y-3">
                  {activity.map((a, i) => (
                    <motion.div
                      key={a.title}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                    >
                      <span
                        className="mt-1 size-2 shrink-0 rounded-full"
                        style={{ background: a.dot, boxShadow: `0 0 0 4px ${a.dot}22` }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-semibold">{a.title}</div>
                        <div className="truncate text-[11px] text-ink/45">{a.sub}</div>
                      </div>
                      <span className="text-[10px] text-ink/35">{a.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className={cx(`p-4 ${panel}`)}>
                <div className="text-[13px] font-semibold">Lead pipeline</div>
                {[
                  { s: "Enquiry", n: 42, c: "#6c2bd9" },
                  { s: "Follow-up", n: 28, c: "#06b6d4" },
                  { s: "Hot", n: 16, c: "#ff6b1a" },
                  { s: "Customer", n: 31, c: "#16a34a" },
                ].map((p, i) => (
                  <div key={p.s} className="mt-3">
                    <div className="flex justify-between text-[11px] text-ink/60">
                      <span>{p.s}</span>
                      <span className="font-semibold text-ink">{p.n}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#f1eff7]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: p.c }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(p.n / 42) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.5 + i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet to-[#8b5cf6] p-3 text-white shadow-[0_12px_28px_-12px_#6c2bd9]">
                <div className="grid size-9 place-items-center rounded-xl bg-white/20">
                  <WhatsAppIcon className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-bold">Zutok Softwares</div>
                  <div className="text-[10px] text-white/80">5 chats waiting · AI replying</div>
                </div>
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-[#4ade80]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}
