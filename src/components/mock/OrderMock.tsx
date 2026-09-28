"use client";

import { motion } from "motion/react";
import { Check, IndianRupee, MapPin, Package, Truck } from "lucide-react";
import { ShopifyIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

const steps = [
  { label: "Placed", icon: Package },
  { label: "COD confirmed", icon: Check },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: MapPin },
];

export function OrderMock({ progress = 3 }: { progress?: number }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[28px] border border-shop/10 bg-white p-6 text-shop-deep shadow-[0_50px_100px_-40px_rgba(244,81,30,0.55)]">
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[#ffe1cc]" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-[#f2f8e8] px-3 py-1 text-[11px] font-semibold text-[#3f6212]">
          <ShopifyIcon className="size-3.5 text-[#5e8e3e]" /> Shopify · Kavya Ethnics
        </div>
        <span className="rounded-full bg-shop-2/15 px-3 py-1 text-[11px] font-bold text-[#b45309]">COD</span>
      </div>
      <div className="relative mt-5 flex items-center gap-4">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#8a1538] via-[#c2185b] to-[#f59e0b] shadow-lg">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(255,215,130,0.9) 0 3px, transparent 4px), radial-gradient(circle at 70% 60%, rgba(255,215,130,0.8) 0 2px, transparent 3px)",
              backgroundSize: "18px 18px, 14px 14px",
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-shop">Order #1042</div>
          <div className="truncate text-lg font-bold">Maroon Banarasi Silk</div>
          <div className="text-xs text-shop-deep/55">Riya Kapoor · Jaipur</div>
        </div>
        <div className="flex items-center font-display text-3xl tracking-wide text-shop">
          <IndianRupee className="size-6" aria-hidden />
          4,299
        </div>
      </div>

      <div className="relative mt-7">
        <div className="absolute left-[12.5%] right-[12.5%] top-5 h-0.5 bg-shop/10" />
        <motion.div
          className="absolute left-[12.5%] top-5 h-0.5 bg-gradient-to-r from-shop to-shop-2"
          initial={{ width: 0 }}
          whileInView={{ width: `${(progress / (steps.length - 1)) * 75}%` }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
        />
        <div className="relative grid grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-2 text-center">
              <motion.div
                className="grid size-10 place-items-center rounded-full border-2"
                initial={{ backgroundColor: "#ffffff", borderColor: "#fde3d6", color: "#ff6b1a" }}
                whileInView={
                  i <= progress
                    ? { backgroundColor: "#ff6b1a", borderColor: "#fdba74", color: "#ffffff" }
                    : { backgroundColor: "#ffffff", borderColor: "#fde3d6", color: "#ff6b1a" }
                }
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.6 }}
              >
                <s.icon className="size-4" aria-hidden />
              </motion.div>
              <span className="text-[11px] font-medium text-shop-deep/70">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-6 flex items-center gap-3 rounded-2xl bg-[#e3f8ea] p-3 ring-1 ring-chat/20">
        <div className="grid size-9 place-items-center rounded-xl bg-[#25d366] text-white">
          <WhatsAppIcon className="size-5" />
        </div>
        <div className="flex-1 text-[12px] text-chat-deep">
          <div className="font-semibold">Update sent on WhatsApp</div>
          <div className="text-chat-deep/60">“Out for delivery, usually arrives today”</div>
        </div>
        <span className="text-[10px] text-chat-deep/50">via ZChat</span>
      </div>
    </div>
  );
}
