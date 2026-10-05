import { Check, Minus } from "lucide-react";
import { Breadcrumbs } from "@/components/industries/Breadcrumbs";
import { PricingTable } from "@/components/sections/PricingTable";
import { PlanPriceTable } from "@/components/sections/PlanPriceTable";
import { FAQ } from "@/components/sections/FAQ";
import { DemoCTA } from "@/components/sections/DemoCTA";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Wave } from "@/components/ui/Wave";
import { pricingFaqs as faqs } from "@/lib/company";
import { YEARLY_MONTHS_CHARGED } from "@/lib/pricing";
import { cx } from "@/lib/cx";
import {
  JsonLd,
  PRICING_DESCRIPTION,
  PRICING_SUMMARY,
  PRICING_TITLE,
  absoluteUrl,
  breadcrumbLd,
  faqLd,
  offerCatalogLd,
  ogImage,
  pageMetadata,
  webPageLd,
} from "@/lib/seo";

export const metadata = pageMetadata({
  title: PRICING_TITLE,
  description: PRICING_DESCRIPTION,
  path: "/pricing/",
  absoluteTitle: true,
  image: ogImage("pricing"),
  imageAlt: "Zutok pricing: simple plans, priced in rupees",
  keywords: [
    "Zutok pricing",
    "WhatsApp CRM pricing India",
    "CRM price in INR",
    "ZChat price",
    "ZShop price",
    "Zloya price",
    "Complete Suite price",
  ],
});

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

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing/" },
];

const jsonLd = [
  webPageLd({
    path: "/pricing/",
    name: PRICING_TITLE,
    description: PRICING_DESCRIPTION,
    about: { "@id": absoluteUrl("/pricing/#plans") },
    image: ogImage("pricing"),
    breadcrumb: true,
  }),
  breadcrumbLd(crumbs),
  offerCatalogLd(),
  faqLd(faqs, "/pricing/"),
];

export default function PricingPage() {
  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <section className="night relative overflow-hidden pt-36 text-white sm:pt-44">
        <div className="pointer-events-none absolute -left-20 top-10 size-[30rem] animate-float rounded-full bg-[#6c2bd9]/30 blur-[110px]" />
        <div className="pointer-events-none absolute -right-20 top-24 size-[28rem] animate-float rounded-full bg-[#22c55e]/20 blur-[110px] [animation-delay:-3s]" />
        <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 text-center sm:px-6">
          <div className="mb-8 flex justify-center">
            <Breadcrumbs items={crumbs} tone="light" />
          </div>
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
          {/* The direct answer to "how much does Zutok cost?", unanimated so it reads the same with or without JS. */}
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/75">{PRICING_SUMMARY}</p>
        </div>
        <Wave fill="#ffffff" back="#22c55e" />
      </section>

      <section className="pb-24 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            Choose a product, <span className="font-serif font-normal italic">then a plan</span>
          </h2>
          <PricingTable />
        </div>
      </section>

      <section id="all-plans" className="scroll-mt-28 pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-6xl">
              All plans at a <span className="font-serif font-normal italic">glance</span>
            </h2>
          </Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-center font-medium text-ink/65">
            Every Zutok plan in one table: the price when billed monthly, and the yearly price, which charges{" "}
            {YEARLY_MONTHS_CHARGED} months for 12. All prices are in Indian Rupees and exclude 18% GST.
          </p>
          <Reveal delay={0.1} className="mt-10">
            <PlanPriceTable />
          </Reveal>
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
