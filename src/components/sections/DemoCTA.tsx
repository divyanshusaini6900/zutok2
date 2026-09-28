"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Wave } from "@/components/ui/Wave";
import { site } from "@/lib/site";
import { cx } from "@/lib/cx";

const interests = [
  { id: "ZChat", color: "#22c55e" },
  { id: "ZShop", color: "#ff6b1a" },
  { id: "Zloya", color: "#ff4d8d" },
  { id: "Zutok CRM", color: "#a78bfa" },
];

export function DemoCTA() {
  const [picked, setPicked] = useState<string[]>(["ZChat"]);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Business: ${data.get("business")}`,
      `Phone / WhatsApp: ${data.get("phone")}`,
      `Interested in: ${picked.join(", ") || "Not sure yet"}`,
      "",
      String(data.get("message") || ""),
    ].join("\n");
    const subject = `Demo request: ${data.get("business") || data.get("name")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-2xl border-2 border-ink/15 bg-white px-4 py-3.5 text-sm font-medium text-ink placeholder:text-ink/35 outline-none transition focus:border-ink focus:ring-4 focus:ring-[#a78bfa]/40";

  return (
    <section id="demo" className="relative overflow-hidden bg-ink pb-40 pt-16 text-white sm:pb-48">
      <div className="dots-light pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-24 top-40 size-[30rem] animate-float rounded-full bg-[#6c2bd9]/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-20 size-[28rem] animate-float rounded-full bg-[#ff4d8d]/25 blur-[120px] [animation-delay:-3s]" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative -mx-4 select-none" aria-hidden>
        <Marquee
          items={["Let's grow", "your business", "Let's grow", "your business"].map((t, i) => (
            <span
              key={i}
              className={cx(`px-6 font-display text-[18vw] uppercase leading-none tracking-tight sm:text-[12vw] ${
                i % 2 ? "text-outline-light" : "text-paper"
              }`)}
            >
              {t}
            </span>
          ))}
          separator={
            <span className="mx-4 size-6 rotate-45 rounded-md border-2 border-white bg-[conic-gradient(#22c55e_0_25%,#ff6b1a_0_50%,#ff4d8d_0_75%,#a78bfa_0)] sm:size-10" />
          }
          duration={28}
        />
      </div>

      <div className="relative mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight sm:text-6xl">
              Book a free{" "}
              <span className="inline-block -rotate-2 rounded-2xl border-[2.5px] border-white bg-[#22c55e] px-2.5 pb-1 font-serif font-normal italic text-ink">
                30-minute
              </span>{" "}
              demo.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg font-medium text-white/75">
              We&apos;ll show you Zutok using your own products, channels and outlets, then help you choose the right plan.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 space-y-3">
            {["A walkthrough built around your business", "Help with WhatsApp Business API setup", "Your data imported from Excel or your old CRM"].map((t) => (
              <div key={t} className="flex items-center gap-3 font-semibold">
                <CheckCircle2 className="size-6 shrink-0 text-[#22c55e]" aria-hidden /> {t}
              </div>
            ))}
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotate: 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 110, damping: 16 }}
        >
          <div className="rounded-[2rem] border-[2.5px] border-white bg-paper p-6 text-ink shadow-[8px_8px_0_#a78bfa] sm:p-8">
            {sent ? (
              <motion.div className="py-12 text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <CheckCircle2 className="mx-auto size-14 text-[#16a34a]" aria-hidden />
                <h3 className="mt-5 text-2xl font-extrabold">Your email app is open</h3>
                <p className="mt-2 text-ink/65">
                  Press send and we&apos;ll get back to you within one working day. If nothing opened, write to{" "}
                  <a className="font-semibold underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </p>
                <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-bold text-ink underline">
                  Edit my details
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-ink/60">Your name</span>
                    <input name="name" required autoComplete="name" className={field} placeholder="Full name" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-ink/60">Business name</span>
                    <input name="business" required autoComplete="organization" className={field} placeholder="Business name" />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-ink/60">Phone / WhatsApp</span>
                  <input name="phone" type="tel" required autoComplete="tel" className={field} placeholder="+91" />
                </label>
                <fieldset>
                  <legend className="mb-2 text-xs font-bold text-ink/60">Interested in</legend>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((it) => {
                      const on = picked.includes(it.id);
                      return (
                        <button
                          key={it.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setPicked((p) => (on ? p.filter((x) => x !== it.id) : [...p, it.id]))}
                          className="rounded-full border-2 px-4 py-2 text-sm font-bold transition"
                          style={{
                            borderColor: on ? "#0b0b0b" : "rgba(11,11,11,0.15)",
                            background: on ? it.color : "#ffffff",
                            color: on ? "#0b0b0b" : "rgba(11,11,11,0.7)",
                            boxShadow: on ? "3px 3px 0 #0b0b0b" : "none",
                          }}
                        >
                          {it.id}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-ink/60">Anything we should know? (optional)</span>
                  <textarea name="message" rows={3} className={cx(`${field} resize-none`)} placeholder="e.g. 2 cafés, 40 orders a day on Instagram" />
                </label>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-ink py-4 font-extrabold text-white shadow-[4px_4px_0_#a78bfa] transition hover:-translate-y-0.5"
                >
                  Book my free demo
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                </button>
                <p className="text-center text-xs font-medium text-ink/50">Opens your email app with these details filled in.</p>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <Wave fill="#ffffff" back="#a78bfa" />
      </div>
    </section>
  );
}
