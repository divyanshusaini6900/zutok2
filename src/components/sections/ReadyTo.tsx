"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState, type ComponentType, type ReactNode } from "react";
import { ArrowUpRight, Bot, Check, Crown, Gift, PackageCheck, QrCode, ShoppingCart, Star, Truck } from "lucide-react";
import { InstagramIcon, MessengerIcon, ShopifyIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ChatScreen, PhoneShell, type ChatMsg } from "@/components/mock/Phone";
import { PassScreen } from "@/components/mock/PassScreen";
import { InlineText } from "@/components/ui/InlineText";
import { products, type ProductSlug } from "@/lib/products";
import { scrollToY } from "@/lib/scroll";
import { cx } from "@/lib/cx";

type Item = {
  slug: ProductSlug;
  verb: string;
  line: string;
  /** May link to the page that covers the feature, with "[label](/path/)" markup (src/lib/inline-links.ts). */
  bullets: string[];
  /** Optional text link after the product button. */
  more?: { label: string; href: string };
  price: string;
  stickers: { Icon: ComponentType<{ className?: string }>; bg: string; pos: string }[];
};

const items: Item[] = [
  {
    slug: "zchat",
    verb: "SELL",
    line: "Every chat in one inbox, and an AI agent that answers, quotes and closes.",
    bullets: [
      "[One inbox](/solutions/omnichannel-team-inbox/) for WhatsApp, Instagram, Messenger & Telegram",
      "[AI sales agent](/solutions/whatsapp-ai-sales-agent/) that quotes from your catalogue",
      "[WhatsApp broadcasts](/solutions/whatsapp-broadcast-campaigns/) and [Instagram comment → DM](/solutions/instagram-comment-to-dm/)",
    ],
    more: { label: "Everything Zutok automates on WhatsApp", href: "/solutions/whatsapp-automation/" },
    price: "From ₹799/mo",
    stickers: [
      { Icon: WhatsAppIcon, bg: "#25d366", pos: "left-[-18%] top-[8%]" },
      { Icon: InstagramIcon, bg: "linear-gradient(135deg,#f58529,#dd2a7b 55%,#8134af)", pos: "right-[-20%] top-[22%]" },
      { Icon: Bot, bg: "#6c2bd9", pos: "left-[-22%] bottom-[22%]" },
      { Icon: MessengerIcon, bg: "linear-gradient(135deg,#0099ff,#a033ff)", pos: "right-[-14%] bottom-[8%]" },
    ],
  },
  {
    slug: "zshop",
    verb: "SHIP",
    line: "Orders flow in from any store, and buyers hear from you on WhatsApp until the parcel lands.",
    bullets: [
      "Shopify, WooCommerce or your own counter",
      "[COD confirmation](/solutions/whatsapp-cod-confirmation/) before you ship",
      "3-step [abandoned-cart recovery](/solutions/abandoned-cart-recovery-whatsapp/)",
    ],
    price: "From ₹1,299/mo",
    stickers: [
      { Icon: ShoppingCart, bg: "#ff6b1a", pos: "left-[-18%] top-[10%]" },
      { Icon: ShopifyIcon, bg: "#95bf47", pos: "right-[-20%] top-[20%]" },
      { Icon: Truck, bg: "#2563eb", pos: "left-[-22%] bottom-[20%]" },
      { Icon: PackageCheck, bg: "#22c55e", pos: "right-[-14%] bottom-[8%]" },
    ],
  },
  {
    slug: "zloya",
    verb: "RETAIN",
    line: "Points at the counter, VIP tiers and journeys that bring first-timers back again and again.",
    bullets: [
      "Points and 4 VIP tiers at the POS",
      "[Birthday, win-back and expiry journeys](/solutions/automated-winback-birthday-campaigns/)",
      "[Smart QR](/solutions/restaurant-qr-code-customer-data/) and a Google review booster",
    ],
    price: "From ₹999/mo",
    stickers: [
      { Icon: Crown, bg: "#ff4d8d", pos: "left-[-18%] top-[8%]" },
      { Icon: Gift, bg: "#6c2bd9", pos: "right-[-20%] top-[22%]" },
      { Icon: Star, bg: "#ff6b1a", pos: "left-[-22%] bottom-[20%]" },
      { Icon: QrCode, bg: "#22c55e", pos: "right-[-14%] bottom-[8%]" },
    ],
  },
];

const chatSale: ChatMsg[] = [
  { from: "in", text: "Hi! Is the maroon Banarasi silk in stock? 😍" },
  { from: "out", label: "Zutok AI", text: "Yes! It's ₹4,299 with free shipping. Which colour?\n1. Maroon\n2. Emerald" },
  { from: "in", text: "1" },
  { from: "out", label: "Zutok AI", text: "Lovely choice 😊 COD is available ✅", buttons: ["🛒 Order now"] },
];

const chatShip: ChatMsg[] = [
  { from: "out", text: "Order #1042 placed ✅\nMaroon Banarasi Silk · ₹4,299 · COD\nPlease confirm:", buttons: ["✅ Confirm", "❌ Cancel"] },
  { from: "in", text: "✅ Confirm" },
  { from: "out", text: "Confirmed! Packed today 📦" },
  { from: "out", text: "🚚 On its way. Usually arrives in 3–5 days.", buttons: ["📍 Track parcel"] },
];

function Screen({ slug }: { slug: ProductSlug }) {
  if (slug === "zloya") return <PassScreen />;
  return (
    <ChatScreen
      title="Kavya Ethnics"
      subtitle={slug === "zchat" ? "AI sales agent · online" : "Order updates · via ZShop"}
      avatar="KE"
      messages={slug === "zchat" ? chatSale : chatShip}
    />
  );
}

function Verb({ word }: { word: string }) {
  return (
    <span className="flex" aria-hidden>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%", rotate: 8 }}
          animate={{ y: "0%", rotate: 0 }}
          exit={{ y: "-105%", rotate: -8 }}
          transition={{ duration: 0.6, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function StickerLayer({ item }: { item: Item }) {
  const t = products[item.slug].theme;
  return (
    <AnimatePresence>
      {item.stickers.map((s, i) => (
        <motion.span
          key={`${item.slug}-${i}`}
          className={cx(`absolute z-20 grid size-16 place-items-center rounded-2xl border-[2.5px] ${s.pos}`)}
          style={{ background: s.bg, color: "#ffffff", borderColor: t.on, boxShadow: `4px 4px 0 ${t.on}` }}
          initial={{ scale: 0, rotate: -40, opacity: 0 }}
          animate={{ scale: 1, rotate: i % 2 ? 8 : -8, opacity: 1, y: [0, -10, 0] }}
          exit={{ scale: 0, rotate: 40, opacity: 0 }}
          transition={{
            default: { type: "spring", stiffness: 260, damping: 16, delay: 0.15 + i * 0.07 },
            y: { repeat: Infinity, duration: 3 + i * 0.4, ease: "easeInOut" },
          }}
        >
          <s.Icon className="size-8" />
        </motion.span>
      ))}
    </AnimatePresence>
  );
}

function Details({ item, compact = false }: { item: Item; compact?: boolean }) {
  const p = products[item.slug];
  const t = p.theme;
  return (
    <div>
      <h2
        className="inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-sm font-bold"
        style={{ background: t.pop, color: t.popOn, borderColor: t.on }}
      >
        {p.name} <span className="opacity-60">·</span> {p.kicker}
      </h2>
      <p className={cx(`mt-5 max-w-lg font-semibold leading-snug ${compact ? "text-lg" : "text-2xl"}`)}>{item.line}</p>
      <ul className="mt-5 space-y-2.5">
        {item.bullets.map((b) => (
          <li key={b} className="flex items-center gap-3 font-medium">
            <span className="grid size-6 shrink-0 place-items-center rounded-full" style={{ background: t.pop, color: t.popOn }}>
              <Check className="size-3.5" aria-hidden />
            </span>
            <span>
              <InlineText text={b} linkClassName="underline decoration-2 underline-offset-4 transition hover:opacity-75" />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href={`/products/${item.slug}`}
          className="group inline-flex items-center gap-2 rounded-full border-2 px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5"
          style={{ background: t.accent, color: t.accentOn, borderColor: t.accent }}
        >
          Explore {p.name}
          <ArrowUpRight className="size-4 transition group-hover:rotate-45" aria-hidden />
        </Link>
        <span className="rounded-full border-2 px-5 py-3 text-sm font-bold" style={{ borderColor: t.on }}>
          {item.price}
        </span>
        {item.more && (
          <Link href={item.more.href} className="text-sm font-bold underline decoration-2 underline-offset-4 transition hover:opacity-75">
            {item.more.label}
          </Link>
        )}
      </div>
    </div>
  );
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [pair, setPair] = useState<[number, number]>([0, 0]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.34 ? 0 : v < 0.67 ? 1 : 2;
    setPair(([prev, cur]) => (cur === next ? [prev, cur] : [cur, next]));
  });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [prevIdx, idx] = pair;
  const item = items[idx];
  const theme = products[item.slug].theme;
  const base = products[items[prevIdx].slug].theme.color;

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + (el.offsetHeight - window.innerHeight) * (i / 3 + 0.12));
  };

  return (
    <div ref={ref} className="relative h-[330vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden" style={{ background: base }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={idx}
            className="absolute inset-0"
            style={{ background: theme.color }}
            initial={{ clipPath: "circle(0% at 74% 50%)" }}
            animate={{ clipPath: "circle(150% at 74% 50%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
        </AnimatePresence>
        <div className={cx(`pointer-events-none absolute inset-0 ${theme.on === "#ffffff" ? "dots-light" : "dots"}`)} />
        <div className="grain pointer-events-none absolute inset-0" />

        <AnimatePresence mode="popLayout">
          <motion.div
            key={item.verb}
            className="pointer-events-none absolute -bottom-[6vw] left-[-2vw] select-none font-display text-[34vw] leading-none"
            style={{ color: "transparent", WebkitTextStroke: `2px ${theme.on}26` }}
            initial={{ opacity: 0, x: 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -120 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            {item.verb}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="relative mx-auto grid w-full max-w-7xl grid-cols-[1.15fr_1fr] items-center gap-10 px-6"
          animate={{ color: theme.on }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.35em] opacity-80">The Zutok family · Ready to</div>
            <div className="relative mt-2 overflow-hidden font-display text-[9.5vw] leading-[0.86] tracking-tight xl:text-[8.5rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={item.verb}>
                  <Verb word={item.verb} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative mt-6 min-h-[19rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Details item={item} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative flex justify-center [perspective:1400px]">
            <motion.div
              className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
              style={{ borderColor: `${theme.on}40` }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            />
            <div className="relative w-[min(290px,33vh)]">
              <StickerLayer item={item} />
              <motion.div animate={{ rotateY: -10, rotateX: 4 }} transition={{ duration: 1 }} style={{ transformStyle: "preserve-3d" }}>
                <PhoneShell>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={item.slug}
                      className="h-full"
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Screen slug={item.slug} />
                    </motion.div>
                  </AnimatePresence>
                </PhoneShell>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-4" animate={{ color: theme.on }}>
          {items.map((it, i) => (
            <button
              key={it.slug}
              type="button"
              onClick={() => jump(i)}
              className={cx(`flex items-center justify-end gap-3 text-right text-xs font-bold uppercase tracking-[0.2em] transition ${
                i === idx ? "opacity-100" : "opacity-45 hover:opacity-80"
              }`)}
            >
              <span>
                0{i + 1} {products[it.slug].name}
              </span>
              <span
                className={cx(`h-1 rounded-full transition-all duration-500 ${i === idx ? "w-10" : "w-4 bg-current"}`)}
                style={i === idx ? { background: products[it.slug].theme.pop } : undefined}
              />
            </button>
          ))}
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-steel/30">
          <motion.div className="h-full transition-colors duration-500" style={{ width: bar, background: theme.pop }} />
        </div>
      </div>
    </div>
  );
}

function MountInView({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  return (
    <div ref={ref} className={className}>
      {inView ? children : null}
    </div>
  );
}

function Stacked() {
  return (
    <div>
      {items.map((item) => {
        const theme = products[item.slug].theme;
        return (
          <section
            key={item.slug}
            className={cx(`relative overflow-hidden border-y-2 border-ink px-5 py-20 ${theme.on === "#ffffff" ? "dots-light" : "dots"}`)}
            style={{ background: theme.color, color: theme.on }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="text-xs font-bold uppercase tracking-[0.35em] opacity-80">Ready to</div>
              <div className="font-display text-[26vw] leading-[0.85]">{item.verb}</div>
            </motion.div>
            <div className="relative mx-auto mt-8 w-[min(240px,62vw)]">
              <StickerLayer item={item} />
              <PhoneShell>
                <MountInView className="h-full">
                  <Screen slug={item.slug} />
                </MountInView>
              </PhoneShell>
            </div>
            <div className="relative mt-10">
              <Details item={item} compact />
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function ReadyTo() {
  return (
    <section id="products" aria-label="Zutok products">
      <div className="hidden lg:block">
        <Pinned />
      </div>
      <div className="lg:hidden">
        <Stacked />
      </div>
    </section>
  );
}
