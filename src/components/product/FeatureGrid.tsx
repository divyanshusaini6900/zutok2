"use client";

import { motion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import type { Feature, Theme } from "@/lib/products";

export function FeatureGrid({ features, theme }: { features: Feature[]; theme: Theme }) {
  const looks = [
    { bg: "#0b0b0b", fg: "#ffffff", tile: theme.pop, tileFg: theme.popOn, shadow: theme.pop },
    { bg: "#ffffff", fg: "#0b0b0b", tile: "#0b0b0b", tileFg: "#ffffff", shadow: "#0b0b0b" },
    { bg: theme.pop, fg: theme.popOn, tile: "#ffffff", tileFg: "#0b0b0b", shadow: "#0b0b0b" },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => {
        const look = looks[(i + Math.floor(i / 3)) % 3];
        return (
          <motion.div
            key={f.title}
            className="group relative overflow-hidden rounded-[1.75rem] border-[2.5px] border-ink p-7"
            style={{ background: look.bg, color: look.fg, boxShadow: `6px 6px 0 ${look.shadow}` }}
            initial={{ opacity: 0, y: 50, rotate: (i % 3) - 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 140, damping: 18, delay: (i % 3) * 0.07 }}
          >
            <span className="pointer-events-none absolute -bottom-14 -right-14 size-40 rounded-full bg-current opacity-[0.06] transition-transform duration-700 group-hover:scale-150" />
            <div
              className="relative grid size-12 place-items-center rounded-2xl border-2 border-ink transition group-hover:rotate-6 group-hover:scale-110"
              style={{ background: look.tile, color: look.tileFg }}
            >
              <Icon name={f.icon} className="size-6" />
            </div>
            <h3 className="relative mt-6 text-xl font-extrabold">{f.title}</h3>
            <p className="relative mt-2 text-sm font-medium leading-relaxed opacity-80">{f.body}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
