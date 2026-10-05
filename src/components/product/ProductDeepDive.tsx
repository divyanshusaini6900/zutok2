"use client";

import { LayoutGroup, motion, useInView } from "motion/react";
import { Check, Clock, Crown, Heart, MoonStar, Send, ShieldCheck, Trophy } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { QRGlyph, QRStandee } from "@/components/mock/LoyaltyMocks";
import type { ProductSlug } from "@/lib/products";
import { cx } from "@/lib/cx";

function Row({
  kicker,
  title,
  body,
  bullets,
  visual,
  flip = false,
  accent,
  deep,
}: {
  kicker: string;
  title: ReactNode;
  body: string;
  bullets?: string[];
  visual: ReactNode;
  flip?: boolean;
  accent: string;
  deep: string;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <span
          className="inline-block rounded-full border-2 border-ink px-3 py-1 text-xs font-extrabold uppercase tracking-[0.25em] text-ink shadow-[3px_3px_0_#0b0b0b]"
          style={{ background: accent }}
        >
          {kicker}
        </span>
        <h2 className="mt-5 text-4xl font-extrabold leading-[1] tracking-tight sm:text-5xl" style={{ color: deep }}>
          {title}
        </h2>
        <p className="mt-5 text-lg font-medium leading-relaxed text-ink/70">{body}</p>
        {bullets && (
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 font-semibold text-ink/85">
                <span className="mt-1.5 size-3 shrink-0 rotate-45 border-2 border-ink" style={{ background: accent }} />
                {b}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
      <motion.div
        className={flip ? "lg:order-1" : ""}
        initial={{ opacity: 0, y: 60, rotate: flip ? -3 : 3 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 110, damping: 16 }}
      >
        {visual}
      </motion.div>
    </div>
  );
}

function CommentCard() {
  return (
    <div className="card mx-auto max-w-md overflow-hidden rounded-[2rem]">
      <div className="flex items-center gap-3 p-4">
        <div className="size-9 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] p-0.5">
          <div className="grid size-full place-items-center rounded-full bg-white text-[11px] font-bold">KE</div>
        </div>
        <div className="text-sm font-bold">kavya.ethnics</div>
        <span className="ml-auto text-xs text-black/40">Reel</span>
      </div>
      <div className="relative h-52 bg-[linear-gradient(135deg,#e11d48,#ff4d8d_50%,#ff7a1a)]">
        <div className="absolute inset-0 grid place-items-center font-serif text-4xl italic text-white">Rose Net Saree</div>
      </div>
      <div className="space-y-3 p-4 text-[13px]">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <b>dev.malhotra</b> Price? 😍
        </motion.div>
        <motion.div
          className="ml-6 rounded-xl bg-[#f5f3f8] p-2.5"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <b>kavya.ethnics</b> Sent you a DM with the price 💌
          <span className="ml-2 rounded-full bg-green px-2 py-0.5 text-[10px] font-bold text-white">auto</span>
        </motion.div>
        <motion.div
          className="flex items-start gap-2 rounded-2xl bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] p-3 text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.7 }}
        >
          <Send className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>Private DM: Hi Dev! The Rose Net saree is ₹2,899 with free shipping. Shall I reserve one?</span>
        </motion.div>
      </div>
    </div>
  );
}

function BroadcastCard() {
  const rows = [
    { k: "Sent", v: 2400, pct: 100, c: "#6c2bd9" },
    { k: "Delivered", v: 2352, pct: 98, c: "#2563eb" },
    { k: "Read", v: 1896, pct: 79, c: "#16a34a" },
    { k: "Replied", v: 312, pct: 13, c: "#ff6b1a" },
  ];
  return (
    <div className="rounded-[2rem] border-[2.5px] border-ink bg-[linear-gradient(150deg,#16a34a,#0b7a3b)] p-6 text-white shadow-[6px_6px_0_#0b0b0b]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">Broadcast example</div>
          <div className="mt-1 text-xl font-extrabold">Festive collection launch</div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-green">
          <WhatsAppIcon className="size-3.5" /> Marketing
        </span>
      </div>
      <div className="mt-6 space-y-4 rounded-2xl bg-white p-4 text-ink">
        {rows.map((r, i) => (
          <div key={r.k}>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-ink/70">{r.k}</span>
              <span className="font-extrabold">{r.v.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#f1eef6]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: r.c }}
                initial={{ width: 0 }}
                whileInView={{ width: `${r.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-white/75">Illustrative numbers. Your real delivery analytics appear here live.</p>
    </div>
  );
}

function ShopSettingsCard() {
  const rows = [
    { icon: MoonStar, t: "Quiet hours for promos", s: "9 pm – 9 am · 1 promo per day", on: true, c: "#6c2bd9" },
    { icon: ShieldCheck, t: "Ask COD buyers to confirm", s: "Remind after 4 h · stop after 24 h", on: true, c: "#16a34a" },
    { icon: Clock, t: "Chase unfinished carts", s: "1 h · 1 day · 3 days → 0% · 5% · 10%", on: true, c: "#ff6b1a" },
    { icon: Heart, t: "Cancel if nobody replies", s: "Off by default. Your call", on: false, c: "#ff4d8d" },
  ];
  return (
    <div className="space-y-3 rounded-[2rem] border-[2.5px] border-ink bg-[linear-gradient(150deg,#ff7a1a,#e0460a)] p-5 shadow-[6px_6px_0_#0b0b0b]">
      {rows.map((r, i) => (
        <motion.div
          key={r.t}
          className="flex items-center gap-4 rounded-2xl border-2 border-ink bg-white p-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.1 }}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white" style={{ background: r.c }}>
            <r.icon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-ink">{r.t}</div>
            <div className="text-xs font-medium text-ink/60">{r.s}</div>
          </div>
          <span className={cx(`flex h-6 w-11 items-center rounded-full p-0.5 ${r.on ? "justify-end bg-green" : "bg-ink/15"}`)}>
            <span className="size-5 rounded-full bg-white shadow" />
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function WindowExplainer() {
  return (
    <div className="card rounded-[2rem] p-6">
      <div className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ea580c]">The WhatsApp 24-hour rule</div>
      <div className="relative mt-8 h-24">
        <div className="absolute inset-x-0 top-10 h-2 rounded-full bg-[#f1eef6]" />
        <motion.div
          className="absolute left-0 top-10 h-2 rounded-full bg-green"
          initial={{ width: 0 }}
          whileInView={{ width: "30%" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute left-[30%] top-10 h-2 rounded-full bg-gradient-to-r from-orange to-red"
          initial={{ width: 0 }}
          whileInView={{ width: "70%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1 }}
        />
        {[
          { l: "Customer writes", x: "0%" },
          { l: "24 h window closes", x: "30%" },
          { l: "Order ships (day 2)", x: "62%" },
          { l: "Delivered (day 4)", x: "97%" },
        ].map((m) => (
          <div key={m.l} className="absolute top-8 -translate-x-1/2" style={{ left: m.x }}>
            <div className="mx-auto size-6 rounded-full border-4 border-white bg-orange shadow" />
            <div className="mt-2 w-24 text-center text-[11px] font-semibold text-ink/65">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-green p-4 text-white">
          <div className="font-extrabold">Free-form</div>
          <div className="text-white/85">Any message, inside 24 h</div>
        </div>
        <div className="rounded-2xl bg-orange p-4 text-[#2a0e00]">
          <div className="font-extrabold">Approved template</div>
          <div className="opacity-80">Everything after. ZShop fills in the details.</div>
        </div>
      </div>
    </div>
  );
}

function Memberships() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[
        {
          type: "Perk bundle · 365 days",
          name: "Club Dine-In 365",
          price: "₹1,999",
          lines: ["₹500 wallet credit", "15% off every order", "Free appetiser every month", "Birthday cake on us"],
          bg: "linear-gradient(160deg,#ff4d8d,#c026d3)",
        },
        {
          type: "Wallet credits · 180 days",
          name: "Prepaid Wallet 5K",
          price: "₹5,000",
          lines: ["₹6,000 in dining credit", "5% off every order", "₹1,000 bonus credit", "Sold at the counter"],
          bg: "linear-gradient(160deg,#6c2bd9,#4338ca)",
        },
      ].map((m) => (
        <div
          key={m.name}
          className="relative overflow-hidden rounded-[2rem] border-[2.5px] border-ink p-6 text-white shadow-[6px_6px_0_#0b0b0b]"
          style={{ background: m.bg }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/20 blur-2xl" />
          <div className="relative text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">{m.type}</div>
          <div className="relative mt-2 font-serif text-3xl italic">{m.name}</div>
          <div className="relative mt-4 font-display text-4xl tracking-wide">{m.price}</div>
          <ul className="relative mt-5 space-y-2 text-sm font-medium">
            {m.lines.map((l) => (
              <li key={l} className="flex items-center gap-2">
                <Crown className="size-3.5 text-white" aria-hidden /> {l}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="card rounded-[2rem] p-5 sm:col-span-2">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#db2777]">
          <Trophy className="size-4" aria-hidden /> Staff membership leaderboard
        </div>
        {[
          ["Rahul", 14, 100],
          ["Simran", 11, 78],
          ["Arjun", 7, 50],
        ].map(([n, v, w], i) => (
          <div key={n as string} className="mt-3 flex items-center gap-3 text-sm font-semibold">
            <span className="w-5 font-display text-[#db2777]">{i + 1}</span>
            <span className="w-16">{n}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#f3e8ff]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#ff4d8d] to-[#6c2bd9]"
                initial={{ width: 0 }}
                whileInView={{ width: `${w}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
              />
            </div>
            <span className="w-16 text-right text-ink/55">{v} sold</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QRCampaigns() {
  return (
    <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_1.1fr]">
      <QRStandee />
      <div className="space-y-4">
        {[
          { tag: "Delivery packet", name: "Swiggy / Zomato box", perk: "Flat ₹150 off when they dine in", seed: 3, c: "#ff6b1a" },
          { tag: "Table standee", name: "Table standee #1", perk: "50 bonus points", seed: 11, c: "#6c2bd9" },
        ].map((q, i) => (
          <motion.div
            key={q.name}
            className="card rounded-3xl p-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15 }}
          >
            <div className="flex items-start gap-3">
              <QRGlyph className="size-14 shrink-0 rounded-lg bg-paper p-1.5" seed={q.seed} />
              <div className="min-w-0">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: q.c }}>
                  {q.tag}
                </div>
                <div className="font-bold">{q.name}</div>
                <div className="text-xs text-ink/60">Perk: {q.perk}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-white">
              {["Scans", "Guests", "Opt-in %"].map((k) => (
                <div key={k} className="rounded-xl px-2 py-2" style={{ background: q.c }}>
                  {k}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const stages = [
  { stage: "Enquiry", color: "#8b5cf6" },
  { stage: "Follow-up", color: "#0ea5e9" },
  { stage: "Hot", color: "#ff6b1a" },
  { stage: "Customer", color: "#16a34a" },
];

const leads = [
  { name: "Neha Gupta", src: "Meta Lead Ads", c: "#2563eb", value: "₹45,000", stage: "Enquiry" },
  { name: "Kabir Joshi", src: "Website form", c: "#0d9488", value: "₹12,000", stage: "Enquiry" },
  { name: "Aarav Mehta", src: "IndiaMART", c: "#ea580c", value: "₹80,000", stage: "Follow-up" },
  { name: "Sana Qureshi", src: "Instagram", c: "#db2777", value: "₹9,500", stage: "Follow-up" },
  { name: "Meera Iyer", src: "WhatsApp", c: "#16a34a", value: "₹1,20,000", stage: "Hot" },
  { name: "Riya Kapoor", src: "WhatsApp", c: "#16a34a", value: "₹4,299", stage: "Customer" },
];
const MOVER = "Meera Iyer";

function PipelineBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setWon((w) => !w), 2600);
    return () => clearInterval(id);
  }, [inView]);

  const stageOf = (l: (typeof leads)[number]) => (l.name === MOVER && won ? "Customer" : l.stage);

  return (
    <div ref={ref} className="card rounded-[2rem] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#6d28d9]">Leads</div>
          <div className="text-lg font-extrabold">Sales pipeline</div>
        </div>
        <span className="rounded-full border-2 border-ink bg-[#8b5cf6] px-3 py-0.5 text-[11px] font-extrabold text-ink">6 leads</span>
      </div>
      <LayoutGroup>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {stages.map((s) => {
            const here = leads.filter((l) => stageOf(l) === s.stage);
            return (
              <div key={s.stage} className="min-w-0 rounded-2xl bg-smoke p-2">
                <div
                  className="flex items-center justify-between rounded-lg px-2 py-1 text-[11px] font-extrabold text-white"
                  style={{ background: s.color }}
                >
                  {s.stage}
                  <span className="rounded-full bg-white/25 px-1.5">{here.length}</span>
                </div>
                <div className="mt-2 min-h-[7.5rem] space-y-2">
                  {here.map((l) => {
                    const justWon = l.name === MOVER && won;
                    return (
                      <motion.div
                        key={l.name}
                        layoutId={`lead-${l.name}`}
                        layout
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                        className={cx(
                          "rounded-xl border-2 border-ink bg-white p-2",
                          justWon ? "shadow-[3px_3px_0_#16a34a]" : "shadow-[2px_2px_0_#0b0b0b]",
                        )}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate text-[12px] font-bold">{l.name}</span>
                          {justWon && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="rounded-full bg-[#16a34a] px-1.5 text-[9px] font-extrabold text-white"
                            >
                              WON
                            </motion.span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-1">
                          <span
                            className="truncate rounded-full px-1.5 text-[9px] font-bold"
                            style={{ background: `${l.c}1f`, color: l.c }}
                          >
                            {l.src}
                          </span>
                          <span className="shrink-0 text-[10px] font-semibold text-ink/55">{l.value}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}

function InvoiceCard() {
  const lines = [
    ["Website redesign", "₹18,000"],
    ["SEO setup", "₹7,000"],
  ];
  const totals = [
    ["Subtotal", "₹25,000"],
    ["CGST 9%", "₹2,250"],
    ["SGST 9%", "₹2,250"],
  ];
  const timeline = ["Proposal accepted", "Invoice sent", "Paid via UPI"];
  return (
    <div className="card relative mx-auto max-w-md overflow-hidden rounded-[2rem]">
      <div className="flex items-center justify-between bg-ink px-5 py-4 text-white">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c4b5fd]">Tax invoice</div>
          <div className="text-lg font-extrabold">INV-0248</div>
        </div>
        <div className="text-right text-[11px] leading-snug text-white/70">
          Issued today
          <br />
          Due in 15 days
        </div>
      </div>
      <div className="p-5">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink/45">Billed to</div>
        <div className="font-bold">Pixel &amp; Co. Studio</div>
        <div className="text-[12px] text-ink/55">GSTIN 27AAB••••1Z5 · Pune</div>

        <div className="mt-4 space-y-2 border-y-2 border-ink/10 py-3 text-sm">
          {lines.map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="font-medium">{k}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1 text-[13px] text-ink/65">
          {totals.map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-sm font-bold">Total</span>
          <span className="font-display text-4xl tracking-wide">₹29,500</span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {timeline.map((t, i) => (
            <motion.div
              key={t}
              className="rounded-xl border-2 border-ink px-2 py-2 text-center text-[11px] font-bold"
              initial={{ backgroundColor: "#ffffff" }}
              whileInView={{ backgroundColor: i === 2 ? "#22c55e" : "#ede9fe" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.45 }}
            >
              <Check className="mx-auto mb-1 size-4" aria-hidden />
              {t}
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="pointer-events-none absolute right-6 top-24 rounded-xl border-[3px] border-[#16a34a] px-3 py-1 font-display text-3xl tracking-widest text-[#16a34a]"
        initial={{ opacity: 0, scale: 2.2, rotate: -28 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, type: "spring", stiffness: 300, damping: 14 }}
      >
        PAID
      </motion.div>
    </div>
  );
}

export function ProductDeepDive({ slug }: { slug: ProductSlug }) {
  if (slug === "crm") {
    const deep = "#0b0b0b";
    return (
      <div className="space-y-32">
        <Row
          deep={deep}
          accent="#8b5cf6"
          kicker="Leads & pipeline"
          title={
            <>
              Every enquiry, <span className="font-serif font-normal italic text-[#6d28d9]">one pipeline.</span>
            </>
          }
          body="Leads from WhatsApp and Instagram chats, Meta Lead Ads, IndiaMART and your website's estimate requests land on one board. Move them from Enquiry to Customer and never miss a follow-up."
          bullets={["Meta Lead Ads and IndiaMART leads sync in", "Every ZChat conversation becomes a lead", "Tasks and reminders on every lead"]}
          visual={<PipelineBoard />}
        />
        <Row
          deep={deep}
          flip
          accent="#22c55e"
          kicker="GST invoicing"
          title={
            <>
              Quote. Invoice. <span className="font-serif font-normal italic text-[#16a34a]">Get paid.</span>
            </>
          }
          body="Send a proposal or estimate, turn it into a GST invoice once it's accepted and record the payment. Recurring invoices and credit notes are built in."
          bullets={["Tax rates like CGST and SGST on every line", "Recurring invoices and overdue reminders", "Bulk PDF export for your accountant"]}
          visual={<InvoiceCard />}
        />
      </div>
    );
  }
  if (slug === "zchat") {
    const deep = "#0b0b0b";
    return (
      <div className="space-y-32">
        <Row
          deep={deep}
          accent="#ff4d8d"
          kicker="Comment automation"
          title={
            <>
              Every <span className="font-serif font-normal italic text-[#db2777]">&ldquo;price?&rdquo;</span> comment becomes a DM.
            </>
          }
          body="Set a rule once. When someone comments on an Instagram or Facebook post or reel, ZChat replies publicly and sends them a private DM with the details."
          bullets={["Trigger on keywords or any comment", "Public reply plus a private DM", "Activity log for every auto-reply"]}
          visual={<CommentCard />}
        />
        <Row
          deep={deep}
          flip
          accent="#22c55e"
          kicker="Broadcasting"
          title={
            <>
              Reach thousands. <span className="font-serif font-normal italic text-[#16a34a]">Personally.</span>
            </>
          }
          body="Send Meta-approved WhatsApp templates with text, images, PDFs, video and buttons to leads, contacts or a custom list, and follow delivery as it happens."
          bullets={["Schedule, pause and filter campaigns", "Sync templates from Meta in one click", "Replies land back in the shared inbox"]}
          visual={<BroadcastCard />}
        />
      </div>
    );
  }
  if (slug === "zshop") {
    const deep = "#0b0b0b";
    return (
      <div className="space-y-32">
        <Row
          deep={deep}
          accent="#ff6b1a"
          kicker="Sensible defaults"
          title={
            <>
              Built by people who have <span className="font-serif font-normal italic text-[#ea580c]">run shops.</span>
            </>
          }
          body="There's no discount on the first cart reminder, since most buyers come back anyway. Order updates go out even at 11 pm, but promotions wait for morning. COD orders are never cancelled unless you choose to."
          bullets={["Delivery estimates come from your own real deliveries", "Tracking links are set by you, never guessed", "Test messages only go to your own test number"]}
          visual={<ShopSettingsCard />}
        />
        <Row
          deep={deep}
          flip
          accent="#22c55e"
          kicker="Know the rules"
          title={
            <>
              We handle <span className="font-serif font-normal italic text-[#16a34a]">WhatsApp&apos;s rules</span> for you.
            </>
          }
          body="WhatsApp only allows free-form messages within 24 hours of a customer's last message. Most order updates come later than that, so ZShop maps each one to an approved template and fills in the details."
          visual={<WindowExplainer />}
        />
      </div>
    );
  }
  const deep = "#0b0b0b";
  return (
    <div className="space-y-32">
      <Row
        deep={deep}
        accent="#ff4d8d"
        kicker="Memberships & wallets"
        title={
          <>
            Get paid <span className="font-serif font-normal italic text-[#db2777]">before</span> they visit.
          </>
        }
        body="Sell yearly perk bundles and prepaid wallets at the counter. Guests commit to coming back, you get cash up front, and staff compete on a live leaderboard."
        visual={<Memberships />}
      />
      <Row
        deep={deep}
        flip
        accent="#ff6b1a"
        kicker="Smart QR codes"
        title={
          <>
            Turn delivery orders into <span className="font-serif font-normal italic text-[#6c2bd9]">walk-ins.</span>
          </>
        }
        body="Stick a QR code on every Swiggy or Zomato box and every table. Guests scan, share their number and get a perk, and each code shows you scans, sign-ups and opt-in rate."
        visual={<QRCampaigns />}
      />
    </div>
  );
}
