"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { platformModules } from "@/lib/products";
import { cx } from "@/lib/cx";

/** Panels rest in black and light up in their own colour when opened. */
const tones = [
  { bg: "#6c2bd9", fg: "#ffffff" },
  { bg: "#22c55e", fg: "#0b0b0b" },
  { bg: "#ff6b1a", fg: "#0b0b0b" },
  { bg: "#ff4d8d", fg: "#0b0b0b" },
  { bg: "#2563eb", fg: "#ffffff" },
  { bg: "#2dd4bf", fg: "#0b0b0b" },
];
const tone = (i: number) => tones[i % tones.length];

function Row({ start, offset }: { start: number; offset: number }) {
  const mods = platformModules.slice(start, start + 6);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!inView || hover) return;
    const id = setInterval(() => setActive((a) => (a + 1) % mods.length), 3200 + offset);
    return () => clearInterval(id);
  }, [inView, hover, mods.length, offset]);

  return (
    <div
      ref={ref}
      className="flex h-[26rem] gap-3"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {mods.map((m, i) => {
        const on = i === active;
        const t = tone(start + i);
        return (
          <button
            key={m.title}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-expanded={on}
            className={cx(`relative min-w-0 overflow-hidden rounded-[1.75rem] border-[2.5px] border-ink text-left transition-[flex-grow,background-color,color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              on ? "shadow-[6px_6px_0_#0b0b0b]" : ""
            }`)}
            style={{ flexGrow: on ? 6 : 1, flexBasis: 0, background: on ? t.bg : "#0b0b0b", color: on ? t.fg : "#ffffff" }}
          >
            <span className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/15 blur-2xl" />
            <span className="absolute left-5 top-5 font-display text-3xl opacity-70">{String(start + i + 1).padStart(2, "0")}</span>
            <span
              className="absolute right-4 top-6 size-2.5 rounded-full transition-opacity duration-500"
              style={{ background: t.bg, opacity: on ? 0 : 1 }}
            />
            <AnimatePresence initial={false}>
              {!on && (
                <motion.span
                  key="v"
                  className="vertical-text absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-lg font-extrabold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.25 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                  {m.title}
                </motion.span>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {on && (
                <motion.span
                  key="c"
                  className="absolute inset-0 flex flex-col justify-end p-7"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                >
                  <span className="mb-auto ml-auto grid size-16 place-items-center rounded-2xl border-[2.5px] border-current bg-white/20">
                    <Icon name={m.icon} className="size-8" />
                  </span>
                  <span className="block text-3xl font-extrabold leading-tight">{m.title}</span>
                  <span className="mt-2 block max-w-sm text-[15px] font-medium leading-snug opacity-85">{m.body}</span>
                  <span className="mt-4 flex flex-wrap gap-2">
                    {m.points.map((pt) => (
                      <span key={pt} className="flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-xs font-bold">
                        <Check className="size-3.5" aria-hidden /> {pt}
                      </span>
                    ))}
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

function MobileList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2.5">
      {platformModules.map((m, i) => {
        const on = open === i;
        const t = tone(i);
        return (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            className="overflow-hidden rounded-3xl border-[2.5px] border-ink transition-colors duration-500"
            style={{ background: on ? t.bg : "#0b0b0b", color: on ? t.fg : "#ffffff" }}
          >
            <button
              type="button"
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
            >
              <span className="font-display text-2xl opacity-70">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-lg font-extrabold">{m.title}</span>
              {!on && <span className="size-2.5 rounded-full" style={{ background: t.bg }} />}
              <Plus className={cx(`size-5 transition ${on ? "rotate-45" : ""}`)} aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm font-medium opacity-90">{m.body}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.points.map((pt) => (
                        <span key={pt} className="rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-bold">
                          {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export function ModulesAccordion({ cta = true }: { cta?: boolean }) {
  return (
    <section id="modules" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="shrink-0">
            <Reveal>
              <span className="inline-block rounded-full border-2 border-ink bg-[#a78bfa] px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-ink shadow-[3px_3px_0_#0b0b0b]">
                Zutok CRM
              </span>
            </Reveal>
            <h2 className="mt-5 text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
              <SplitText text="The CRM" className="block" />
              <span className="block">
                <SplitText text="underneath" className="font-serif font-normal italic" delay={0.1} />{" "}
                <SplitText text="it all." delay={0.15} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15} className="max-w-sm text-lg text-ink/70">
            30+ modules for sales, people, stock and support, in the same system as your chats, orders and guests.
          </Reveal>
        </div>

        <div className="mt-14 hidden space-y-3 lg:block">
          <Row start={0} offset={0} />
          <Row start={6} offset={600} />
        </div>
        <div className="mt-10 lg:hidden">
          <MobileList />
        </div>
        {cta && (
          <div className="mt-12 flex justify-center">
            <Button href="/products/crm">Explore Zutok CRM</Button>
          </div>
        )}
      </div>
    </section>
  );
}
