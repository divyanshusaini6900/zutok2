"use client";

import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BookOpenText, Bot, Check, CreditCard, FileText, Hand, Link2, Plus, Sparkles, Upload } from "lucide-react";
import { ChatScreen, PhoneShell, type ChatMsg } from "@/components/mock/Phone";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { cx } from "@/lib/cx";

type ColType = "choose" | "info" | "qty" | "price" | "link" | "file";

const types: Record<ColType, { label: string; color: string; bg: string; note: string }> = {
  choose: { label: "Customer chooses", color: "#6c2bd9", bg: "#efe7ff", note: "Asked one by one, as a numbered list." },
  info: { label: "Information", color: "#0369a1", bg: "#e0f2fe", note: "Shown with the price and answered when asked." },
  qty: { label: "Quantity", color: "#c2410c", bg: "#ffedd5", note: "Packs like 100 / 500. Any other number gets the next bigger pack." },
  price: { label: "Price", color: "#15803d", bg: "#dcfce7", note: "Only ever taken from the row that matches every choice." },
  link: { label: "Link", color: "#be185d", bg: "#fce7f3", note: "The first link column is the order link." },
  file: { label: "File", color: "#0f766e", bg: "#ccfbf1", note: "Brochure, price list, PDF or video. The customer gets the real file." },
};

const columns: { name: string; type: ColType }[] = [
  { name: "Paper", type: "choose" },
  { name: "Size", type: "choose" },
  { name: "Qty", type: "qty" },
  { name: "Price (₹)", type: "price" },
  { name: "Delivery", type: "info" },
  { name: "Order link", type: "link" },
  { name: "Sample", type: "file" },
];

const rows = [
  ["Matte", "Standard", "100", "450", "3–5 days"],
  ["Matte", "Standard", "500", "1,250", "3–5 days"],
  ["Glossy", "Standard", "100", "520", "3–5 days"],
  ["Glossy", "Standard", "500", "1,450", "3–5 days"],
  ["Glossy", "Square", "500", "1,650", "4–6 days"],
  ["Textured", "Standard", "500", "1,990", "5–7 days"],
];

function Quote() {
  return (
    <div className="mb-1 w-[11.5rem] overflow-hidden rounded-lg border border-black/15 bg-white">
      <div className="bg-gradient-to-r from-[#16a34a] to-[#0b7a3b] px-2 py-1.5 text-[9px] font-bold text-white">Glossy · Standard · 500 cards</div>
      <div className="px-2 py-1.5">
        <div className="text-[15px] font-extrabold text-[#0b0b0b]">₹1,450</div>
        <div className="text-[9px] text-black/55">Delivery in 3–5 days</div>
        <div className="mt-1.5 grid gap-1">
          <div className="rounded-md bg-[#16a34a] py-1 text-center text-[9.5px] font-bold text-white">🛒 Order now</div>
          <div className="flex items-center gap-1 rounded-md bg-[#ccfbf1] px-1.5 py-1 text-[9px] font-semibold text-[#0f766e]">
            📄 glossy-sample.pdf
          </div>
        </div>
      </div>
    </div>
  );
}

const chat: ChatMsg[] = [
  { from: "in", text: "Hi! I need visiting cards 🙂" },
  { from: "out", label: "Zutok AI", text: "Happy to help! Which paper?\n1. Matte\n2. Glossy\n3. Textured" },
  { from: "in", text: "2" },
  { from: "out", label: "Zutok AI", text: "Glossy ✨ Which size?\n1. Standard\n2. Square" },
  { from: "in", text: "1" },
  { from: "out", label: "Zutok AI", text: "How many cards?\nPacks: 100 · 500" },
  { from: "in", text: "400" },
  { from: "out", label: "Zutok AI", rich: <Quote />, text: "400 isn't a pack, so here's the next one up:" },
];

export const TOTAL = 21;

const steps = [
  { icon: Plus, title: "Add a product", body: "Name, description and photos. Or import your whole catalogue from a sheet." },
  { icon: Sparkles, title: "Design your own columns", body: "Paper, size, colour, delivery time, brochure: any name, any number. Pick a type for each." },
  { icon: Upload, title: "Fill in the rows", body: "One row per combination of choices and pack. Leave a cell empty when it doesn't matter." },
  { icon: Bot, title: "The AI sells from it", body: "It asks each choice, then quotes the price, order link and files from the one row that matches. Nothing is guessed." },
];

function derive(k: number) {
  const colsShown = Math.max(0, Math.min(7, k));
  const rowsShown = Math.max(0, Math.min(6, k - 7));
  const chatCount = Math.max(0, Math.min(8, k - 13));
  const phase = k < 1 ? 0 : k < 8 ? 1 : k < 14 ? 2 : 3;
  const paper = chatCount >= 3 ? "Glossy" : null;
  const size = chatCount >= 5 ? "Standard" : null;
  const qty = chatCount >= 7 ? "500" : null;
  return { colsShown, rowsShown, chatCount, phase, paper, size, qty };
}

function Catalog({ k }: { k: number }) {
  const { colsShown, rowsShown, phase, paper, size, qty } = derive(k);
  const lastType = columns[Math.max(0, colsShown - 1)].type;

  return (
    <div className="flex h-full min-h-0 flex-col rounded-[1.6rem] border-[2.5px] border-ink bg-white p-4 text-ink shadow-[6px_6px_0_#6b6b6b] sm:p-5">
      <div className="flex items-center gap-3">
        <div className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl border-2 border-ink bg-gradient-to-br from-[#ff6b1a] via-[#ff4d8d] to-[#6c2bd9] text-white">
          <CreditCard className="size-7" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#16a34a]">Product</div>
          <div className="truncate text-base font-extrabold sm:text-lg">Premium Visiting Cards</div>
          <div className="truncate text-xs text-ink/55">350 GSM, full colour on both sides</div>
        </div>
        <span className="hidden rounded-full border-2 border-ink bg-[#22c55e] px-3 py-0.5 text-[11px] font-bold text-ink sm:inline">8 products</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/45">Columns &amp; rows</div>
        <div className="text-[11px] font-semibold text-ink/40">{rowsShown} rows</div>
      </div>

      <div className="no-scrollbar mt-2 min-h-0 flex-1 overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[26px_repeat(7,minmax(0,1fr))] gap-1.5 border-b-2 border-ink pb-2">
            <div className="self-end text-[10px] font-bold text-ink/30">#</div>
            {columns.map((c, i) => {
              const shown = i < colsShown;
              const next = i === colsShown && phase <= 1;
              const t = types[c.type];
              return (
                <div key={c.name} className="min-w-0">
                  <AnimatePresence mode="wait" initial={false}>
                    {shown ? (
                      <motion.div
                        key="on"
                        initial={{ opacity: 0, y: -12, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 22 }}
                      >
                        <div className="truncate text-[12px] font-extrabold">{c.name}</div>
                        <div
                          className="mt-1 truncate rounded-md px-1.5 py-0.5 text-[9px] font-bold"
                          style={{ background: t.bg, color: t.color }}
                        >
                          {t.label}
                        </div>
                      </motion.div>
                    ) : next ? (
                      <motion.div
                        key="next"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid h-[38px] place-items-center rounded-lg border-2 border-dashed border-[#16a34a]/50 text-[10px] font-bold text-[#16a34a]"
                      >
                        + Column
                      </motion.div>
                    ) : (
                      <div key="off" className="h-[38px]" />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-1.5 space-y-1.5">
            <AnimatePresence initial={false}>
              {rows.slice(0, rowsShown).map((r, ri) => {
                const dim = (paper && r[0] !== paper) || (size && r[1] !== size) || (qty && r[2] !== qty);
                const hit = !!qty && !dim;
                return (
                  <motion.div
                    key={ri}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: dim ? 0.25 : 1, x: 0, scale: hit ? 1.02 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className={cx(`grid grid-cols-[26px_repeat(7,minmax(0,1fr))] items-center gap-1.5 rounded-xl px-1 py-2 text-[12px] font-semibold ${
                      hit ? "bg-[#16a34a] text-white shadow-[4px_4px_0_#0b0b0b]" : "bg-smoke"
                    }`)}
                  >
                    <div className={cx(`pl-1 text-[10px] font-bold ${hit ? "text-white/60" : "text-ink/30"}`)}>{ri + 1}</div>
                    {r.map((v, ci) => (
                      <div key={ci} className="truncate">
                        {ci === 3 ? `₹${v}` : v}
                      </div>
                    ))}
                    <div className="truncate">
                      <span
                        className={cx(`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                          hit ? "bg-white/20" : "bg-[#fce7f3] text-[#be185d]"
                        }`)}
                      >
                        <Link2 className="size-3" aria-hidden /> order
                      </span>
                    </div>
                    <div className="truncate">
                      <span
                        className={cx(`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                          hit ? "bg-white/20" : "bg-[#ccfbf1] text-[#0f766e]"
                        }`)}
                      >
                        <FileText className="size-3" aria-hidden /> PDF
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {phase === 2 && rowsShown < 6 && (
              <div className="grid h-9 place-items-center rounded-xl border-2 border-dashed border-ink/20 text-[11px] font-bold text-ink/40">
                + Add row
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 min-h-[3.25rem] rounded-2xl bg-smoke px-3 py-2.5 text-[12px]">
        <AnimatePresence mode="wait">
          {phase <= 1 ? (
            <motion.div key={`t-${lastType}-${phase}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {phase === 0 ? (
                <span className="text-ink/60">Start with a product. Then add any columns you need, name them and pick a type.</span>
              ) : (
                <span>
                  <b className="font-extrabold" style={{ color: types[lastType].color }}>
                    {types[lastType].label}:
                  </b>{" "}
                  <span className="text-ink/70">{types[lastType].note}</span>
                </span>
              )}
            </motion.div>
          ) : phase === 2 ? (
            <motion.div key="rows" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-ink/70">
              <b className="text-ink">One row per combination.</b> The AI only offers values that exist with the earlier
              choices.
            </motion.div>
          ) : (
            <motion.div key="talk" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-ink/70">
              {qty ? (
                <>
                  <b className="inline-flex items-center gap-1 text-[#15803d]">
                    <Check className="size-3.5" aria-hidden /> 1 row matched.
                  </b>{" "}
                  Price, order link and sample PDF come from that row only.
                </>
              ) : (
                <>
                  <b className="text-ink">Narrowing down…</b>{" "}
                  {paper ? `Paper: ${paper}` : "Waiting for paper"}
                  {size ? ` · Size: ${size}` : ""}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Steps({ phase, compact = false }: { phase: number; compact?: boolean }) {
  if (compact) {
    const s = steps[phase];
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-3"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#22c55e] text-ink">
            <s.icon className="size-5" aria-hidden />
          </span>
          <span>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#4ade80]">Step {phase + 1} of 4</span>{" "}
            <span className="block font-bold">{s.title}</span>{" "}
            <span className="block text-sm text-white/75">{s.body}</span>
          </span>
        </motion.div>
      </AnimatePresence>
    );
  }
  return (
    <div className="flex h-full flex-col">
      <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#4ade80]">ZChat Sales Agent</div>
      <h3 className="mt-3 text-3xl font-extrabold leading-[1] tracking-tight xl:text-4xl">
        Your catalogue.
        <br />
        <span className="font-serif font-normal italic">Your AI salesperson.</span>
      </h3>
      <ol className="relative mt-7 space-y-2">
        {steps.map((s, i) => {
          const active = i === phase;
          const done = i < phase;
          return (
            <li
              key={s.title}
              className={cx(`flex gap-3 rounded-2xl border-2 p-3 transition-all duration-500 ${
                active ? "border-white bg-white text-ink shadow-[5px_5px_0_#6b6b6b]" : "border-transparent text-white"
              }`)}
            >
              <span
                className={cx(`grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${
                  active ? "bg-[#16a34a] text-white" : done ? "bg-[#22c55e] text-ink" : "border border-white/25 text-white"
                }`)}
              >
                {done ? <Check className="size-5" aria-hidden /> : <s.icon className="size-5" aria-hidden />}
              </span>
              <span className={active ? "" : "opacity-70"}>
                <span className="block text-[15px] font-bold leading-tight">{s.title}</span>{" "}
                <motion.span
                  className="block overflow-hidden text-[13px] leading-snug"
                  initial={false}
                  animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0, marginTop: active ? 4 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="block text-ink/65">{s.body}</span>
                </motion.span>
              </span>
            </li>
          );
        })}
      </ol>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {["OpenAI", "Claude", "Gemini", "Vertex AI", "Your own model"].map((m) => (
          <span key={m} className="rounded-full border border-white/30 px-2.5 py-1 text-[11px] font-bold">
            {m}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

function Stage({ k, compact = false }: { k: number; compact?: boolean }) {
  const { phase, chatCount } = derive(k);
  const phone = (
    <PhoneShell>
      <ChatScreen
        title="Inkwell Prints"
        subtitle="AI sales agent · online"
        avatar="IP"
        avatarBg="#6c2bd9"
        messages={chat}
        count={chatCount}
      />
    </PhoneShell>
  );

  if (compact) {
    return (
      <div className="dots-light relative overflow-hidden rounded-[2rem] border-[2.5px] border-ink bg-ink p-4 text-white">
        <div className="relative space-y-4">
          <Steps phase={phase} compact />
          <div className="h-[23rem]">
            <Catalog k={k} />
          </div>
          <div className="mx-auto w-[220px]">{phone}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="night relative mx-auto flex h-[88vh] w-[min(96vw,1440px)] overflow-hidden rounded-[2.5rem] border-[2.5px] border-ink p-6 text-white shadow-[10px_10px_0_#d4d4d4] xl:p-8">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -right-24 -top-24 size-[30rem] rounded-full bg-[#22c55e]/25 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 size-[26rem] rounded-full bg-[#6c2bd9]/25 blur-[110px]" />
      <div className="relative grid w-full grid-cols-[minmax(0,0.72fr)_minmax(0,1.8fr)_auto] gap-5 xl:gap-7">
        <Steps phase={phase} />
        <div className="min-h-0">
          <Catalog k={k} />
        </div>
        <div className="flex w-[min(250px,30vh)] items-center">{phone}</div>
      </div>
    </div>
  );
}

function PinnedStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [k, setK] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setK(Math.min(TOTAL, Math.floor(v * (TOTAL + 2)))));
  return (
    <div ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <Stage k={k} />
      </div>
    </div>
  );
}

function AutoStage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setK((v) => (v >= TOTAL + 6 ? 0 : v + 1)), 750);
    return () => clearInterval(id);
  }, [inView]);
  return (
    <div ref={ref} className="px-4">
      <Stage k={Math.min(k, TOTAL)} compact />
    </div>
  );
}

const extras = [
  {
    icon: BookOpenText,
    title: "Business knowledge",
    body: "Office hours, address, delivery areas, payment and return policy. The AI answers from these facts only and never guesses.",
    dark: true,
    tile: "#6c2bd9",
  },
  {
    icon: Bot,
    title: "Choose your AI",
    body: "OpenAI, Anthropic Claude, Google Gemini, Vertex AI or your own model, with your own temperature and reply length.",
    dark: false,
    tile: "#ff6b1a",
  },
  {
    icon: Hand,
    title: "Human handoff",
    body: "When a customer asks for a person, the chat moves to your team in the same inbox, with the whole history.",
    dark: true,
    tile: "#ff4d8d",
  },
];

export function SalesAgent() {
  return (
    <section id="sales-agent" className="relative bg-paper pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="shrink-0">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-[#22c55e] px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-ink shadow-[3px_3px_0_#0b0b0b]">
                <Sparkles className="size-3.5" aria-hidden /> New in ZChat
              </span>
            </Reveal>
            <h2 className="mt-5 text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-7xl">
              <SplitText text="Add your products." className="block" />
              <span className="block">
                <SplitText text="The AI" delay={0.1} />{" "}
                <SplitText text="sells them." className="font-serif font-normal italic" delay={0.15} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15} className="max-w-md text-lg text-ink/70">
            Give every product its own columns, like paper, size, quantity, price, order link and brochure. ZChat&apos;s AI
            agent asks each choice on WhatsApp and quotes from the one row that matches.
          </Reveal>
        </div>
      </div>

      <div className="mt-14 hidden lg:block">
        <PinnedStage />
      </div>
      <div className="mt-12 lg:hidden">
        <AutoStage />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-20 sm:px-6 md:grid-cols-3">
        {extras.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <div
              className={cx(`group h-full rounded-3xl border-[2.5px] border-ink p-7 transition duration-500 hover:-translate-y-1.5 ${
                e.dark ? "bg-ink text-white shadow-[6px_6px_0_#b5b5b5]" : "bg-white text-ink shadow-[6px_6px_0_#0b0b0b]"
              }`)}
            >
              <span
                className={cx(`grid size-12 place-items-center rounded-2xl border-2 text-white transition group-hover:rotate-6 group-hover:scale-110 ${
                  e.dark ? "border-white" : "border-ink"
                }`)}
                style={{ background: e.tile }}
              >
                <e.icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-6 text-xl font-extrabold">{e.title}</h3>
              <p className={cx(`mt-2 text-sm leading-relaxed ${e.dark ? "text-white/75" : "text-ink/70"}`)}>{e.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
