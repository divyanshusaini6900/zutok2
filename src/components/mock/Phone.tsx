"use client";

import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, CheckCheck, ChevronLeft, Phone as PhoneIcon, Video } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export function PhoneShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(`relative mx-auto aspect-[9/19] w-full rounded-[2.6rem] bg-[#141018] p-[7px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.65),inset_0_0_0_2px_rgba(255,255,255,0.08)] ${className}`)}
    >
      <div className="absolute left-1/2 top-3 z-30 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full overflow-hidden rounded-[2.15rem] bg-[#efeae2]">{children}</div>
    </div>
  );
}

export type ChatMsg = {
  from: "in" | "out";
  text?: ReactNode;
  rich?: ReactNode;
  buttons?: string[];
  label?: string;
};

export function ChatScreen({
  title,
  subtitle,
  avatar,
  avatarBg = "#16a34a",
  messages,
  count,
  stagger = 0.55,
  headerBg = "#075e54",
}: {
  title: string;
  subtitle: string;
  avatar: ReactNode;
  avatarBg?: string;
  messages: ChatMsg[];
  count?: number;
  stagger?: number;
  headerBg?: string;
}) {
  const scripted = typeof count === "number";
  const visible = scripted ? messages.slice(0, count) : messages;

  return (
    <div className="flex h-full flex-col text-[#111b21]">
      <div className="flex items-center gap-2 px-3 pb-2.5 pt-9 text-white" style={{ background: headerBg }}>
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        <div
          className="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white"
          style={{ background: avatarBg }}
        >
          {avatar}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 truncate text-[12px] font-semibold">
            {title} <BadgeCheck className="size-3.5 shrink-0 text-[#25d366]" aria-hidden />
          </div>
          <div className="truncate text-[9.5px] text-white/75">{subtitle}</div>
        </div>
        <Video className="size-3.5 shrink-0" aria-hidden />
        <PhoneIcon className="size-3.5 shrink-0" aria-hidden />
      </div>
      <div
        className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden p-2.5"
        style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
      >
        <AnimatePresence initial={false}>
          {visible.map((m, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: scripted ? 0 : 0.25 + i * stagger,
              }}
              className={cx(`max-w-[88%] ${m.from === "in" ? "self-start" : "self-end"}`)}
            >
              {m.label && (
                <div className={cx(`mb-0.5 text-[8.5px] font-semibold text-black/45 ${m.from === "out" ? "text-right" : ""}`)}>
                  {m.label}
                </div>
              )}
              <div
                className={cx(`whitespace-pre-line rounded-xl px-2.5 py-1.5 text-[10.5px] leading-snug shadow-sm ${
                  m.from === "in" ? "rounded-tl-sm bg-white" : "rounded-tr-sm bg-[#d9fdd3]"
                }`)}
              >
                {m.rich}
                {m.text}
                <span className="ml-1.5 inline-flex translate-y-0.5 items-center gap-0.5 text-[8px] text-black/40">
                  10:{String(41 + i).padStart(2, "0")}
                  {m.from === "out" && <CheckCheck className="size-2.5 text-sky-500" aria-hidden />}
                </span>
              </div>
              {m.buttons && (
                <div className="mt-1 grid gap-1">
                  {m.buttons.map((b) => (
                    <div key={b} className="rounded-lg bg-white py-1 text-center text-[10px] font-semibold text-[#027eb5] shadow-sm">
                      {b}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-1.5 bg-[#f0f2f5] px-2 py-1.5">
        <div className="h-7 flex-1 rounded-full bg-white" />
        <div className="grid size-7 place-items-center rounded-full bg-[#00a884]">
          <span className="size-2 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
