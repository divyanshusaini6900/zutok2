"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, MapPin, Package, ShoppingCart, Star, Store, Truck, UserCheck } from "lucide-react";
import { ShopifyIcon, WooIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/cx";

type Stop = { icon: typeof Truck; title: string; caption: string; body: ReactNode };

function Bubble({ children, buttons, me = false }: { children: ReactNode; buttons?: string[]; me?: boolean }) {
  return (
    <div className={me ? "flex justify-end" : ""}>
      <div
        className={cx(`max-w-[92%] rounded-2xl px-3 py-2 text-[13px] leading-snug text-[#111b21] shadow-sm ${
          me ? "rounded-tr-sm bg-[#d9fdd3]" : "rounded-tl-sm bg-[#f0f2f5]"
        }`)}
      >
        {children}
      </div>
      {buttons && (
        <div className="mt-1.5 grid max-w-[92%] grid-cols-2 gap-1.5">
          {buttons.map((b) => (
            <div key={b} className="rounded-xl bg-[#f0f2f5] py-1.5 text-center text-[12px] font-bold text-[#027eb5]">
              {b}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const stops: Stop[] = [
  {
    icon: ShoppingCart,
    title: "Cart left behind",
    caption: "Abandoned-cart recovery",
    body: (
      <div className="space-y-2">
        {[
          ["After 1 hour", "Friendly nudge", "0%"],
          ["After 1 day", "Still thinking?", "5% off"],
          ["After 3 days", "Last chance", "10% off"],
        ].map(([t, d, o]) => (
          <div key={t} className="flex items-center justify-between rounded-xl bg-[#fff1e6] px-3 py-2 text-[13px]">
            <span>
              <b>{t}</b> · {d}
            </span>
            <span className="rounded-full border-2 border-ink bg-[#ff6b1a] px-2 text-[11px] font-bold text-ink">{o}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Store,
    title: "Order placed",
    caption: "Shopify, WooCommerce or counter",
    body: (
      <div>
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-[#95bf47] text-white">
            <ShopifyIcon className="size-4" />
          </span>
          <span className="grid size-8 place-items-center rounded-lg bg-[#7f54b3] text-white">
            <WooIcon className="size-4" />
          </span>
          <span className="grid size-8 place-items-center rounded-lg bg-ink text-white">
            <Store className="size-4" aria-hidden />
          </span>
        </div>
        <div className="mt-3 rounded-xl bg-[#fff1e6] p-3 text-[13px]">
          <div className="font-bold">#1042 · Maroon Banarasi Silk</div>
          <div className="text-black/60">₹4,299 · Cash on delivery · Jaipur</div>
        </div>
      </div>
    ),
  },
  {
    icon: Check,
    title: "COD confirmed",
    caption: "Before anything ships",
    body: (
      <div className="space-y-2">
        <Bubble buttons={["✅ Confirm", "❌ Cancel"]}>Please confirm your COD order #1042 for ₹4,299.</Bubble>
        <Bubble me>✅ Confirm</Bubble>
      </div>
    ),
  },
  {
    icon: Package,
    title: "Packed",
    caption: "Order updates on WhatsApp",
    body: <Bubble>Packed today 📦 It ships tomorrow morning.</Bubble>,
  },
  {
    icon: Truck,
    title: "Shipped",
    caption: "Courier tracking built in",
    body: <Bubble buttons={["📍 Track parcel"]}>On its way! It usually arrives in 3–5 days.</Bubble>,
  },
  {
    icon: MapPin,
    title: "Out for delivery",
    caption: "Status checked every few hours",
    body: <Bubble>Arriving today 🏠 Please keep ₹4,299 ready.</Bubble>,
  },
  {
    icon: UserCheck,
    title: "Delivered",
    caption: "Buyer saved to your CRM",
    body: (
      <div className="space-y-2">
        <Bubble>Delivered! How was your order?</Bubble>
        <Bubble me>
          <span className="flex gap-0.5 text-[#ff6b1a]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5" fill="currentColor" aria-hidden />
            ))}
          </span>
        </Bubble>
      </div>
    ),
  },
];

function Van({ spin }: { spin: MotionValue<number> }) {
  return (
    <div className="relative animate-bob">
      <svg viewBox="0 0 220 120" className="w-[150px] drop-shadow-[6px_6px_0_rgba(11,11,11,0.25)] sm:w-[190px]" aria-hidden>
        <g stroke="#0b0b0b" strokeWidth="4" strokeLinejoin="round">
          <path d="M18 34 Q18 20 32 20 H128 Q140 20 140 32 V92 H18 Z" fill="#ff6b1a" />
          <path d="M140 42 H176 Q186 42 192 52 L206 72 Q210 78 210 86 V92 H140 Z" fill="#ff6b1a" />
          <path d="M150 50 H174 Q180 50 184 56 L194 72 H150 Z" fill="#bfe6ff" />
          <rect x="18" y="80" width="192" height="12" rx="4" fill="#0b0b0b" />
          <rect x="30" y="34" width="96" height="36" rx="10" fill="#0b0b0b" />
        </g>
        <text x="78" y="58" textAnchor="middle" fontSize="18" fontWeight="900" fill="#fff" fontFamily="Arial, sans-serif">
          ZUTOK
        </text>
        <rect x="199" y="73" width="10" height="8" rx="2" fill="#ffffff" stroke="#0b0b0b" strokeWidth="2" />
      </svg>
      {[48, 168].map((cx) => (
        <motion.svg
          key={cx}
          viewBox="0 0 40 40"
          className="absolute w-[27px] sm:w-[34px]"
          style={{ left: `${(cx / 220) * 100}%`, top: "64%", x: "-50%", rotate: spin }}
          aria-hidden
        >
          <circle cx="20" cy="20" r="19" fill="#0b0b0b" />
          <circle cx="20" cy="20" r="9" fill="#e5e5e5" />
          <rect x="18.5" y="4" width="3" height="32" fill="#0b0b0b" />
          <rect x="4" y="18.5" width="32" height="3" fill="#0b0b0b" />
        </motion.svg>
      ))}
    </div>
  );
}

export function ShopJourney() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const van = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [dist, setDist] = useState(0);
  const [reached, setReached] = useState(-1);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(p, [0.04, 0.96], [0, -dist]);
  const spin = useTransform(x, (v) => -v * 0.9);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(x, "change", () => {
    const vr = van.current?.getBoundingClientRect();
    if (!vr) return;
    const front = vr.left + vr.width * 0.8;
    let last = -1;
    cards.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.left + r.width * 0.5 <= front) last = i;
    });
    setReached(last);
  });

  return (
    <section id="zshop" ref={wrap} className="relative h-[420vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-paper text-ink">
        <div className="dots pointer-events-none absolute inset-0 opacity-70" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-5 px-5 pt-24 sm:px-6 sm:pt-28 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-[#ff6b1a] px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-ink shadow-[3px_3px_0_#0b0b0b]">
              <Truck className="size-3.5" aria-hidden /> ZShop · Order journey
            </span>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] tracking-wide sm:text-7xl lg:text-8xl">
              Cart to doorstep.
              <br />
              <span className="text-outline">On WhatsApp.</span>
            </h2>
          </div>
          <p className="hidden max-w-sm text-base font-semibold leading-relaxed text-ink/70 lg:block lg:pb-3">
            Connect Shopify, WooCommerce or your own counter. ZShop confirms COD, chases carts and keeps buyers updated
            until the parcel arrives.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[58%]">
          <motion.div ref={track} className="absolute bottom-0 left-0 flex h-full items-end" style={{ x }}>
            <div className="w-[34vw] shrink-0 sm:w-[30vw]" />
            {stops.map((s, i) => {
              const on = i <= reached;
              return (
                <div key={s.title} className="relative flex h-full w-[82vw] shrink-0 flex-col justify-end sm:w-[380px]">
                  <motion.div
                    ref={(el) => {
                      cards.current[i] = el;
                    }}
                    className="mx-3 mb-[7.5rem] rounded-3xl border-2 border-ink bg-white p-4 shadow-[6px_6px_0_#0b0b0b] sm:mb-36"
                    animate={{ opacity: on ? 1 : 0.5, y: on ? 0 : 26, scale: on ? 1 : 0.94, rotate: on ? 0 : i % 2 ? 2 : -2 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cx(`grid size-10 shrink-0 place-items-center rounded-xl border-2 border-ink transition-colors duration-500 ${
                          on ? "bg-[#22c55e] text-ink" : "bg-[#fff1e6] text-[#c2410c]"
                        }`)}
                      >
                        {on ? <Check className="size-5" aria-hidden /> : <s.icon className="size-5" aria-hidden />}
                      </span>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c2410c]">Stop {i + 1}</div>
                        <div className="text-lg font-extrabold leading-tight">{s.title}</div>
                      </div>
                    </div>
                    <div className="mt-3">{s.body}</div>
                    <div className="mt-3 text-[11px] font-semibold text-black/45">{s.caption}</div>
                  </motion.div>
                  <div className="absolute bottom-[5.25rem] left-1/2 -translate-x-1/2 sm:bottom-[6.25rem]">
                    <span
                      className={cx(`block size-5 rounded-full border-4 border-ink transition-colors duration-500 ${
                        on ? "bg-[#ff6b1a]" : "bg-paper"
                      }`)}
                    />
                  </div>
                </div>
              );
            })}
            <div className="flex h-full w-[90vw] shrink-0 flex-col justify-end pb-40 pl-10 sm:w-[640px] sm:pb-44">
              <div className="font-display text-5xl uppercase leading-none sm:text-7xl">Runs itself.</div>
              <div className="mt-4 flex max-w-md flex-wrap gap-2">
                {["32 Shopify webhook topics", "Quiet hours for promos", "One do-not-contact list", "Estimates from real deliveries"].map(
                  (t) => (
                    <span key={t} className="rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">
                      {t}
                    </span>
                  ),
                )}
              </div>
              <div className="mt-6">
                <Button href="/products/zshop">Explore ZShop</Button>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-[5.5rem] border-t-[3px] border-ink bg-ink sm:h-[6.5rem]">
              <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#ffffff_0_38px,transparent_38px_70px)]" />
            </div>
          </motion.div>

          <div ref={van} className="absolute bottom-[2.6rem] left-[6vw] z-20 sm:bottom-[3.4rem] sm:left-[10vw]">
            <Van spin={spin} />
          </div>
        </div>
      </div>
    </section>
  );
}
