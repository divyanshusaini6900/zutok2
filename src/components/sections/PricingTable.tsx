"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Check, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { formatINR, pricing, priceFor, YEARLY_MONTHS_CHARGED, type PricingGroup } from "@/lib/pricing";
import { cx } from "@/lib/cx";

const onPop = (c: string) => (c === "#6c2bd9" ? "#ffffff" : "#0b0b0b");

export function PricingTable({ initial = "suite" }: { initial?: PricingGroup["id"] }) {
  const [tab, setTab] = useState<PricingGroup["id"]>(initial);
  const [yearly, setYearly] = useState(true);
  const group = pricing.find((g) => g.id === tab) ?? pricing[0];

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "");
      if (pricing.some((g) => g.id === h)) setTab(h as PricingGroup["id"]);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center gap-6">
        <div
          className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border-[2.5px] border-ink bg-white p-1.5 shadow-[4px_4px_0_#0b0b0b]"
          role="tablist"
        >
          {pricing.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={tab === g.id}
              onClick={() => setTab(g.id)}
              className={cx(`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition sm:px-5 ${
                tab === g.id ? "text-white" : "text-ink/65 hover:text-ink"
              }`)}
            >
              {tab === g.id && (
                <motion.span
                  layoutId="pricing-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative size-2.5 shrink-0 rounded-full ring-1 ring-ink/20" style={{ background: g.stripe }} />
              <span className="relative">{g.label}</span>{" "}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm font-semibold">
          <span className={yearly ? "text-ink/50" : "text-ink"}>Monthly</span>{" "}
          <button
            type="button"
            onClick={() => setYearly((y) => !y)}
            className={cx(`relative h-8 w-14 rounded-full border-2 border-ink p-0.5 transition-colors ${yearly ? "bg-ink" : "bg-ash"}`)}
            role="switch"
            aria-checked={yearly}
            aria-label="Bill yearly"
          >
            <motion.span
              className="block size-6 rounded-full border-2 border-ink bg-white"
              animate={{ x: yearly ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={yearly ? "text-ink" : "text-ink/50"}>Yearly</span>{" "}
          <span className="rounded-full border-2 border-ink bg-[#22c55e] px-2.5 py-0.5 text-xs font-extrabold text-ink">2 months free</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {group.note && (
            <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-sm font-medium text-ink/65">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden /> {group.note}
            </p>
          )}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-center">
            {group.plans.map((plan, i) => {
              const price = priceFor(plan, yearly);
              const pop = !!plan.popular;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40, rotate: i === 0 ? -2 : i === 2 ? 2 : 0 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 140, damping: 18 }}
                  className={cx(`relative flex flex-col overflow-hidden rounded-[2rem] border-[2.5px] border-ink p-7 sm:p-8 ${
                    pop ? "text-white lg:py-11" : "bg-white text-ink shadow-[6px_6px_0_#0b0b0b]"
                  }`)}
                  style={
                    pop
                      ? { background: `linear-gradient(155deg, ${group.color}, ${group.color2})`, boxShadow: `8px 8px 0 ${group.pop}` }
                      : undefined
                  }
                >
                  <span className="absolute inset-x-0 top-0 h-2" style={{ background: group.stripe }} />
                  {pop && <div className="pointer-events-none absolute -right-16 -top-16 size-60 rounded-full bg-white/10 blur-2xl" />}
                  <div className="relative flex items-center justify-between">
                    <h3 className="text-xl font-extrabold">{plan.name}</h3>
                    {pop && (
                      <span
                        className="rounded-full border-2 border-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider"
                        style={{ background: group.pop, color: onPop(group.pop) }}
                      >
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className={cx(`relative mt-2 text-sm ${pop ? "text-white/80" : "text-ink/60"}`)}>{plan.blurb}</p>
                  <div className="relative mt-7 flex items-end gap-1">
                    <span className={cx(`mb-2 text-2xl font-bold ${pop ? "text-white/80" : "text-ink/60"}`)}>₹</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={`${plan.name}-${yearly}`}
                        className="font-display text-6xl tracking-wide"
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -24, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {price === null ? "Custom" : formatINR(price)}
                      </motion.span>
                    </AnimatePresence>
                    <span className={cx(`mb-2 text-sm font-semibold ${pop ? "text-white/75" : "text-ink/50"}`)}>/month</span>
                  </div>
                  <div className={cx(`relative mt-1 space-y-1 text-xs font-medium ${pop ? "text-white/80" : "text-ink/55"}`)}>
                    <div>
                      {plan.monthly !== null &&
                        (yearly
                          ? `₹${formatINR(plan.monthly * YEARLY_MONTHS_CHARGED)} billed yearly + GST`
                          : "Billed monthly + GST")}
                    </div>
                    {/* The other billing option too, so both prices are in the page whichever toggle is active. */}
                    {plan.monthly !== null && (
                      <div>
                        {yearly
                          ? `or ₹${formatINR(plan.monthly)}/month billed monthly`
                          : `or ₹${formatINR(plan.monthly * YEARLY_MONTHS_CHARGED)}/year billed yearly`}
                      </div>
                    )}
                    {plan.worth && (
                      <div className={cx(`font-bold ${pop ? "text-white underline decoration-2 underline-offset-4" : "text-[#15803d]"}`)}>
                        ₹{formatINR(plan.worth)}/mo if bought separately
                      </div>
                    )}
                  </div>
                  <ul className={cx(`relative mt-7 flex-1 space-y-3 border-t-2 pt-7 ${pop ? "border-white/20" : "border-ink/10"}`)}>
                    {plan.features.map((f) => (
                      <li key={f} className={cx(`flex items-start gap-3 text-sm font-medium ${pop ? "text-white" : "text-ink/80"}`)}>
                        <span
                          className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full"
                          style={{ background: group.pop, color: onPop(group.pop) }}
                        >
                          <Check className="size-3" aria-hidden />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#demo"
                    className={cx(`relative mt-8 block rounded-full border-2 py-3.5 text-center text-sm font-extrabold transition hover:-translate-y-0.5 ${
                      pop ? "border-white bg-white text-ink" : "border-ink bg-ink text-white"
                    }`)}
                  >
                    {pop ? "Start with a free demo" : "Talk to us"}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
      <p className="mt-10 text-center text-xs font-medium text-ink/55">
        All prices in Indian Rupees, exclusive of 18% GST. Meta WhatsApp conversation charges are billed at Meta&apos;s rates.
      </p>
    </div>
  );
}
