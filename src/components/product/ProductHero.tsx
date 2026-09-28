"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ComponentType } from "react";
import { Bot, Boxes, Briefcase, Crown, Gift, PackageCheck, Receipt, ShoppingCart, Star, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InstagramIcon, MessengerIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Wave } from "@/components/ui/Wave";
import { DashboardMock } from "@/components/mock/DashboardMock";
import { InboxMock } from "@/components/mock/InboxMock";
import { OrderMock } from "@/components/mock/OrderMock";
import { ChatScreen, PhoneShell } from "@/components/mock/Phone";
import { PassScreen } from "@/components/mock/PassScreen";
import { TierCard, tiers } from "@/components/mock/LoyaltyMocks";
import { ScaledFrame } from "@/components/mock/ScaledFrame";
import { products, type ProductSlug } from "@/lib/products";
import { cx } from "@/lib/cx";

const stickers: Record<ProductSlug, { Icon: ComponentType<{ className?: string }>; bg: string; pos: string }[]> = {
  zchat: [
    { Icon: WhatsAppIcon, bg: "#25d366", pos: "left-[-2%] top-[-6%]" },
    { Icon: InstagramIcon, bg: "linear-gradient(135deg,#f58529,#dd2a7b 55%,#8134af)", pos: "right-[4%] top-[-8%]" },
    { Icon: MessengerIcon, bg: "linear-gradient(135deg,#0099ff,#a033ff)", pos: "right-[-2%] bottom-[10%]" },
    { Icon: Bot, bg: "#6c2bd9", pos: "left-[-3%] bottom-[14%]" },
  ],
  zshop: [
    { Icon: ShoppingCart, bg: "#ff6b1a", pos: "left-[-2%] top-[-4%]" },
    { Icon: Truck, bg: "#2563eb", pos: "right-[2%] top-[-6%]" },
    { Icon: PackageCheck, bg: "#22c55e", pos: "left-[40%] bottom-[-6%]" },
  ],
  zloya: [
    { Icon: Crown, bg: "#ff4d8d", pos: "left-[-2%] top-[-6%]" },
    { Icon: Gift, bg: "#6c2bd9", pos: "right-[4%] top-[-6%]" },
    { Icon: Star, bg: "#ff6b1a", pos: "left-[44%] bottom-[-6%]" },
  ],
  crm: [
    { Icon: Users, bg: "#8b5cf6", pos: "left-[-2%] top-[-6%]" },
    { Icon: Receipt, bg: "#ff6b1a", pos: "right-[4%] top-[-8%]" },
    { Icon: Briefcase, bg: "#22c55e", pos: "right-[-2%] bottom-[10%]" },
    { Icon: Boxes, bg: "#ff4d8d", pos: "left-[-3%] bottom-[14%]" },
  ],
};

function Visual({ slug }: { slug: ProductSlug }) {
  if (slug === "crm") {
    return (
      <div className="overflow-hidden rounded-[20px] border-[2.5px] border-ink shadow-[8px_8px_0_#0b0b0b]">
        <ScaledFrame width={1200} height={740}>
          <DashboardMock />
        </ScaledFrame>
      </div>
    );
  }
  if (slug === "zchat") {
    return (
      <ScaledFrame width={1200} height={720}>
        <InboxMock />
      </ScaledFrame>
    );
  }
  if (slug === "zshop") {
    return (
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.25fr_1fr]">
        <OrderMock />
        <div className="mx-auto w-[min(270px,70vw)]">
          <PhoneShell>
            <ChatScreen
              title="Kavya Ethnics"
              subtitle="Order updates · via ZShop"
              avatar="KE"
              avatarBg="#ff6b1a"
              messages={[
                { from: "out", text: "Order #1042 placed ✅ ₹4,299 · COD\nPlease confirm:", buttons: ["✅ Confirm", "❌ Cancel"] },
                { from: "in", text: "✅ Confirm" },
                { from: "out", text: "Thank you! Packed today 📦" },
                { from: "out", text: "🚚 Shipped. Usually arrives in 3–5 days.", buttons: ["📍 Track parcel"] },
              ]}
            />
          </PhoneShell>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.3fr_1fr]">
      <div className="relative mx-auto h-[300px] w-full max-w-xl sm:h-[340px]">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            className="absolute left-1/2 top-6 w-[64%] max-w-[300px]"
            initial={{ x: "-50%", rotate: 0, y: 40, opacity: 0 }}
            animate={{ x: `${-50 + (i - 1.5) * 34}%`, rotate: (i - 1.5) * 9, y: Math.abs(i - 1.5) * 14, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 90, damping: 16 }}
            style={{ zIndex: i === 2 ? 5 : i }}
          >
            <TierCard tier={t} points={["480", "1,260", "2,340", "6,820"][i]} />
          </motion.div>
        ))}
      </div>
      <div className="mx-auto w-[min(260px,68vw)]">
        <PhoneShell>
          <PassScreen />
        </PhoneShell>
      </div>
    </div>
  );
}

export function ProductHero({ slug }: { slug: ProductSlug }) {
  const p = products[slug];
  const t = p.theme;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bigX = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const visualRot = useTransform(scrollYProgress, [0, 0.5], [0, -4]);
  const dark = t.on === "#ffffff";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-36 sm:pt-44"
      style={{ background: `linear-gradient(160deg, ${t.color} 0%, ${t.color2} 100%)`, color: t.on }}
    >
      <div className={cx(`pointer-events-none absolute inset-0 ${dark ? "dots-light" : "dots"}`)} />
      <div
        className="pointer-events-none absolute -left-32 top-24 size-[26rem] animate-float rounded-full blur-[120px]"
        style={{ background: t.pop, opacity: dark ? 0.18 : 0.14 }}
      />
      <div className="grain pointer-events-none absolute inset-0" />
      <motion.div
        className="pointer-events-none absolute top-24 whitespace-nowrap font-display text-[30vw] uppercase leading-none text-transparent"
        style={{ x: bigX, WebkitTextStroke: `2px ${t.on}26` }}
        aria-hidden
      >
        {p.name} {p.name}
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.span
          className="relative inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em]"
          style={{ background: t.pop, color: t.popOn, borderColor: t.on, boxShadow: `3px 3px 0 ${t.on}` }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {p.name} · {p.kicker}
        </motion.span>

        <h1 className="mt-8 text-[14vw] font-extrabold leading-[0.9] tracking-[-0.045em] sm:text-8xl lg:text-[8.5rem]">
          {p.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-2">
              <motion.span
                className={cx(`inline-block ${i === 2 ? "rounded-3xl border-[3px] px-4 pb-1 font-serif font-normal italic tracking-[-0.02em]" : ""}`)}
                style={i === 2 ? { background: t.pop, color: t.popOn, borderColor: t.on } : undefined}
                initial={{ y: "105%", rotate: 3 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <motion.p
            className="max-w-2xl text-lg font-medium leading-relaxed opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {p.summary}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button href="/#demo" variant={dark ? "light" : "primary"}>
              Book a free demo
            </Button>
            <Button href="#pricing" variant={dark ? "outline" : "ghost"} arrow={false}>
              See {p.name} pricing
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mt-20 pb-10"
          style={{ y: visualY, rotate: visualRot }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Visual slug={slug} />
          {stickers[slug].map((s, i) => (
            <motion.span
              key={i}
              className={cx(`absolute z-20 hidden size-16 place-items-center rounded-2xl border-[2.5px] text-white md:grid ${s.pos}`)}
              style={{ background: s.bg, borderColor: t.on, boxShadow: `4px 4px 0 ${t.on}` }}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: i % 2 ? 8 : -8, y: [0, -10, 0] }}
              transition={{
                default: { type: "spring", stiffness: 220, damping: 14, delay: 0.9 + i * 0.1 },
                y: { repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut" },
              }}
            >
              <s.Icon className="size-8" />
            </motion.span>
          ))}
        </motion.div>
      </div>
      <div className="relative">
        <Wave fill="#ffffff" back={t.pop} />
      </div>
    </section>
  );
}
