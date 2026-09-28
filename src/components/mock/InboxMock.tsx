"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { Bot, CheckCheck, ChevronsLeft, Paperclip, Search, Send, Smile, Sparkles, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrowserChrome } from "./ScaledFrame";
import { InstagramIcon, MessengerIcon, TelegramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { cx } from "@/lib/cx";

const chIcon = {
  wa: { Icon: WhatsAppIcon, color: "#25d366" },
  ig: { Icon: InstagramIcon, color: "#e1306c" },
  fb: { Icon: MessengerIcon, color: "#0a7cff" },
  tg: { Icon: TelegramIcon, color: "#29a9eb" },
} as const;

const convos = [
  { name: "Riya Kapoor", ch: "wa", msg: "Is the maroon Banarasi in stock?", time: "now", unread: 2, active: true, color: "#f472b6" },
  { name: "Aarav Mehta", ch: "ig", msg: "Bulk order price for 50 pcs?", time: "2m", unread: 1, color: "#60a5fa" },
  { name: "Sana Qureshi", ch: "fb", msg: "Thanks! Received the parcel 🙌", time: "9m", color: "#34d399" },
  { name: "Kabir Joshi", ch: "tg", msg: "Can I change the delivery address?", time: "21m", color: "#2dd4bf" },
  { name: "Meera Iyer", ch: "wa", msg: "Book a table for 4 at 8pm", time: "1h", color: "#c084fc" },
  { name: "Dev Malhotra", ch: "ig", msg: "Reply to comment: price?", time: "2h", color: "#fb923c" },
];

type Msg = { from: "in" | "ai" | "agent"; text: string };

const script: Msg[] = [
  { from: "in", text: "Hi! Is the maroon Banarasi silk saree in stock? 😍" },
  { from: "ai", text: "Yes, it is! The Maroon Banarasi Silk is ₹4,299 with free shipping. Shall I reserve one for you?" },
  { from: "in", text: "Yes please. Is COD available?" },
  { from: "ai", text: "COD is available ✅ I've created order #1042. You'll get a WhatsApp confirmation to tap and confirm." },
  { from: "agent", text: "Hi Riya, Neha here from the team. Adding a matching blouse piece as a gift 🎁" },
];

export function InboxMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const next = () => {
      if (!alive || i >= script.length) return;
      const isReply = script[i].from !== "in";
      if (isReply) setTyping(true);
      timers.push(
        setTimeout(
          () => {
            if (!alive) return;
            setTyping(false);
            i += 1;
            setCount(i);
            timers.push(setTimeout(next, 700));
          },
          isReply ? 1300 : 500,
        ),
      );
    };
    timers.push(setTimeout(next, 400));
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [inView]);

  return (
    <div ref={ref} className="h-full w-full">
      <BrowserChrome url="crm.zutok.in/admin/zchat">
        <div className="flex h-full bg-[#f6f7f9] text-[#0f172a]">
          <div className="flex w-[330px] shrink-0 flex-col border-r border-black/5 bg-white">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <div className="text-[17px] font-bold">Z Chat</div>
                <div className="text-[11px] text-slate-500">Unified conversations</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="grid size-8 place-items-center rounded-full bg-indigo-50 text-indigo-600">
                  <ChevronsLeft className="size-4" aria-hidden />
                </div>
                <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">6</span>
              </div>
            </div>
            <div className="mx-5 mt-3 grid grid-cols-3 rounded-xl bg-slate-100 p-1 text-center text-[12px]">
              <span className="rounded-lg bg-[#1f6feb] py-1.5 font-semibold text-white">All</span>
              <span className="py-1.5 text-slate-500">Mine</span>
              <span className="py-1.5 text-slate-500">Unassigned</span>
            </div>
            <div className="mx-5 mt-3 rounded-xl border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] font-semibold">
                  <Bot className="size-4 text-indigo-600" aria-hidden /> AI Agent for all
                </div>
                <span className="flex h-5 w-9 items-center justify-end rounded-full bg-[#1f6feb] px-0.5">
                  <span className="size-4 rounded-full bg-white" />
                </span>
              </div>
              <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2">
                <div className="text-[12px] font-bold">Zutok AI</div>
                <div className="text-[10px] text-slate-500">Gemini · handoff on</div>
              </div>
            </div>
            <div className="mx-5 mt-3 flex items-center gap-2 text-[11px]">
              <span className="font-semibold text-indigo-600">All</span>
              <span className="text-slate-500">Open</span>
              <span className="rounded-full bg-emerald-500 px-1.5 text-[10px] font-bold text-white">4</span>
              <span className="text-slate-500">Pending</span>
              <span className="rounded-full bg-orange-500 px-1.5 text-[10px] font-bold text-white">2</span>
            </div>
            <div className="mx-5 mt-3 flex h-8 items-center gap-2 rounded-lg border border-slate-200 px-3 text-[11px] text-slate-400">
              <Search className="size-3.5" aria-hidden /> Search conversations…
            </div>
            <div className="mt-2 flex-1 space-y-1 overflow-hidden px-3">
              {convos.map((c) => {
                const ch = chIcon[c.ch as keyof typeof chIcon];
                return (
                  <div
                    key={c.name}
                    className={cx(`flex items-center gap-3 rounded-xl px-2 py-2.5 ${c.active ? "bg-indigo-50 ring-1 ring-indigo-200" : ""}`)}
                  >
                    <div className="relative">
                      <div
                        className="grid size-10 place-items-center rounded-full text-[13px] font-bold text-white"
                        style={{ background: c.color }}
                      >
                        {c.name[0]}
                      </div>
                      <span
                        className="absolute -bottom-0.5 -right-0.5 grid size-4 place-items-center rounded-full ring-2 ring-white"
                        style={{ background: ch.color, color: "white" }}
                      >
                        <ch.Icon className="size-2.5" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between">
                        <span className="truncate text-[12.5px] font-semibold">{c.name}</span>
                        <span className="text-[10px] text-slate-400">{c.time}</span>
                      </div>
                      <div className="truncate text-[11px] text-slate-500">{c.msg}</div>
                    </div>
                    {c.unread && (
                      <span className="grid size-5 place-items-center rounded-full bg-[#25d366] text-[10px] font-bold text-white">
                        {c.unread}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-16 items-center gap-3 border-b border-black/5 bg-white px-5">
              <div className="grid size-10 place-items-center rounded-full bg-[#f472b6] font-bold text-white">R</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-[14px] font-bold">
                  Riya Kapoor
                  <span className="flex items-center gap-1 rounded-full bg-[#25d366]/15 px-2 py-0.5 text-[10px] font-semibold text-[#128c4a]">
                    <WhatsAppIcon className="size-3" /> WhatsApp
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">+91 98••• ••210 · Lead · Follow-up</div>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">Open</span>
            </div>
            <div
              className="flex flex-1 flex-col justify-end gap-3 overflow-hidden px-6 py-5"
              style={{
                backgroundImage: "radial-gradient(rgba(15,23,42,0.05) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            >
              <AnimatePresence initial={false}>
                {script.slice(0, count).map((m, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={cx(`flex max-w-[72%] flex-col ${m.from === "in" ? "self-start" : "self-end items-end"}`)}
                  >
                    {m.from !== "in" && (
                      <span className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                        {m.from === "ai" ? (
                          <>
                            <Sparkles className="size-3 text-indigo-500" aria-hidden /> Zutok AI
                          </>
                        ) : (
                          <>Neha · Sales</>
                        )}
                      </span>
                    )}
                    <div
                      className={cx(`rounded-2xl px-4 py-2.5 text-[13px] leading-snug shadow-sm ${
                        m.from === "in"
                          ? "rounded-bl-md bg-white"
                          : m.from === "ai"
                            ? "rounded-br-md bg-gradient-to-br from-indigo-600 to-violet text-white"
                            : "rounded-br-md bg-[#d9fdd3]"
                      }`)}
                    >
                      {m.text}
                    </div>
                    {m.from !== "in" && <CheckCheck className="mt-1 size-3.5 text-sky-500" aria-hidden />}
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1 self-end rounded-2xl bg-white px-4 py-3 shadow-sm"
                  >
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="size-1.5 rounded-full bg-indigo-400"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-3 border-t border-black/5 bg-white px-5 py-3">
              <Smile className="size-5 text-slate-400" aria-hidden />
              <Paperclip className="size-5 text-slate-400" aria-hidden />
              <div className="flex h-10 flex-1 items-center rounded-full bg-slate-100 px-4 text-[12px] text-slate-400">
                Type a reply or / for quick replies
              </div>
              <div className="grid size-10 place-items-center rounded-full bg-[#25d366] text-white">
                <Send className="size-4" aria-hidden />
              </div>
            </div>
          </div>

          <div className="flex w-[250px] shrink-0 flex-col gap-3 border-l border-black/5 bg-white p-4">
            <div className="flex flex-col items-center rounded-2xl bg-slate-50 p-4 text-center">
              <div className="grid size-14 place-items-center rounded-full bg-[#f472b6] text-xl font-bold text-white">R</div>
              <div className="mt-2 text-[14px] font-bold">Riya Kapoor</div>
              <div className="text-[11px] text-slate-500">Jaipur · First chat today</div>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                <Tag className="size-3" aria-hidden /> Labels
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ["Hot lead", "bg-rose-100 text-rose-700"],
                  ["COD", "bg-orange-100 text-orange-700"],
                  ["Sarees", "bg-violet-100 text-violet-700"],
                ].map(([l, c]) => (
                  <span key={l} className={cx(`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c}`)}>
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 p-3 text-[11px]">
              <div className="font-semibold text-slate-500">CRM lead</div>
              <div className="mt-1 flex justify-between">
                <span>Status</span>
                <span className="font-semibold text-indigo-600">Follow-up</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>Source</span>
                <span className="font-semibold">Z Chat</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>Value</span>
                <span className="font-semibold">₹4,299</span>
              </div>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-[11px]">
              <div className="font-semibold text-emerald-700">ZShop order #1042</div>
              <div className="mt-1 text-emerald-800/80">COD · awaiting WhatsApp confirm</div>
            </div>
          </div>
        </div>
      </BrowserChrome>
    </div>
  );
}
