import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { PricingTable } from "@/components/sections/PricingTable";
import { FAQ } from "@/components/sections/FAQ";
import { DemoCTA } from "@/components/sections/DemoCTA";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Wave } from "@/components/ui/Wave";
import { cx } from "@/lib/cx";

export const metadata: Metadata = {
  title: "Pricing in ₹",
  description:
    "Simple monthly and yearly plans in Indian Rupees for Zutok CRM, ZChat, ZShop, Zloya and the Complete Suite. Yearly plans include two months free.",
};

const compare: { feature: string; cells: (boolean | string)[] }[] = [
  { feature: "Leads, customers & pipeline", cells: [true, true, true, true] },
  { feature: "GST invoices, proposals & payments", cells: [true, true, true, true] },
  { feature: "Users", cells: ["3", "10", "Unlimited", "By plan"] },
  { feature: "HRM, payroll & attendance", cells: [false, true, true, "Growth+"] },
  { feature: "Inventory & warehouse", cells: [false, true, true, "Growth+"] },
  { feature: "Real Estate suite", cells: [false, false, true, "Enterprise"] },
  { feature: "WhatsApp + Instagram inbox (ZChat)", cells: [false, false, false, true] },
  { feature: "AI sales agent with your catalogue", cells: [false, false, false, "Growth+"] },
  { feature: "Store automation (ZShop)", cells: [false, false, false, true] },
  { feature: "Loyalty & memberships (Zloya)", cells: [false, false, false, true] },
  { feature: "Dedicated account manager", cells: [false, false, true, "Enterprise"] },
];

const faqs = [
  {
    q: "Are prices inclusive of GST?",
    a: "No. All prices are in Indian Rupees and exclude 18% GST, which is added to your invoice.",
  },
  {
    q: "How does yearly billing work?",
    a: "You pay for 10 months and get 12, which is two months free. The monthly figure shown is the yearly price divided by 12.",
  },
  {
    q: "What does WhatsApp messaging cost on top?",
    a: "Meta charges for template conversations at its published rates for India. These charges are billed separately from your Zutok plan and at cost.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade at any time and the difference is prorated. You can downgrade at the end of your billing period.",
  },
  {
    q: "Do you offer discounts for NGOs, startups or multiple outlets?",
    a: "Yes. Ask during your demo. We have special pricing for non-profits, early-stage startups and chains with 10+ outlets.",
  },
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span className="mx-auto grid size-6 place-items-center rounded-full border-2 border-ink bg-[#22c55e] text-ink" aria-label="Included">
        <Check className="size-3.5" aria-hidden />
      </span>
    );
  if (v === false) return <Minus className="mx-auto size-5 text-ink/25" aria-label="Not included" />;
  return <span className="text-sm font-bold text-ink/80">{v}</span>;
}

export default function PricingPage() {
  return (
    <div className="bg-paper">
      <section className="night relative overflow-hidden pt-36 text-white sm:pt-44">
        <div className="pointer-events-none absolute -left-20 top-10 size-[30rem] animate-float rounded-full bg-[#6c2bd9]/30 blur-[110px]" />
        <div className="pointer-events-none absolute -right-20 top-24 size-[28rem] animate-float rounded-full bg-[#22c55e]/20 blur-[110px] [animation-delay:-3s]" />
        <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 text-center sm:px-6">
          <Reveal>
            <span className="inline-block rounded-full border-2 border-white bg-[#22c55e] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.3em] text-ink shadow-[3px_3px_0_#ffffff]">
              Pricing in ₹
            </span>
          </Reveal>
          <h1 className="mt-6 text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-8xl">
            <SplitText text="Pay for what" className="block" immediate />
            <span className="block">
              <SplitText text="you" immediate delay={0.1} />{" "}
              <SplitText text="actually use." className="font-serif font-normal italic" immediate delay={0.15} />
            </span>
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-white/75">
              Start with one product or get all four together. Every plan is in rupees, with GST invoices, and has no setup
              fee.
            </p>
          </Reveal>
        </div>
        <Wave fill="#ffffff" back="#22c55e" />
      </section>

      <section className="pb-24 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <PricingTable />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-6xl">
              Compare what&apos;s <span className="font-serif font-normal italic">included</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 overflow-x-auto rounded-[2rem] border-[2.5px] border-ink bg-white shadow-[6px_6px_0_#0b0b0b]">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="bg-ink text-sm text-white">
                  <th className="p-5 font-bold">Feature</th>
                  {["CRM Starter", "CRM Growth", "CRM Enterprise", "Complete Suite"].map((h) => (
                    <th key={h} className="p-5 text-center font-extrabold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.feature} className="border-b border-ink/5 last:border-0">
                    <td className="p-5 text-sm font-semibold text-ink/80">{row.feature}</td>
                    {row.cells.map((c, i) => (
                      <td key={i} className={cx(`p-5 text-center ${i === 3 ? "bg-[#dcfce7]" : ""}`)}>
                        <Cell v={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="font-display text-6xl uppercase leading-none tracking-wide sm:text-7xl">
            Billing <br />
            <span className="text-outline">questions</span>
          </h2>
          <FAQ items={faqs} pop="#22c55e" />
        </div>
      </section>

      <DemoCTA />
    </div>
  );
}
