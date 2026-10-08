import Link from "next/link";
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
import {
  formatINR,
  getGroup,
  listJoin,
  pricedPlans,
  yearlyTotal,
  YEARLY_MONTHS_CHARGED,
  type PricingGroup,
} from "@/lib/pricing";
import { solutionPath } from "@/lib/solutions";
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
    "ZChat plans",
    "Zutok CRM price",
  ],
});

type CompareRow = { feature: string; cells: (boolean | string)[] };
type CompareTable = { id: string; title: string; group: PricingGroup; rows: CompareRow[] };

const zchat = getGroup("zchat");
const crm = getGroup("crm");

/** ZChat plans side by side, built only from what pricing.ts states for each plan. */
const zchatRows: CompareRow[] = (() => {
  const limits = zchat.plans.map((p) => {
    if (!p.limits) throw new Error(`pricing/page.tsx: ZChat ${p.name} has no limits`);
    return p.limits;
  });
  const free = zchat.plans.map((p) => (p.includesZShopAndZloya ? "Free" : false));
  return [
    { feature: "Contacts", cells: limits.map((l) => (l.contacts === null ? "Unlimited" : formatINR(l.contacts))) },
    { feature: "Channels", cells: limits.map((l) => formatINR(l.channels)) },
    { feature: "CRM licenses", cells: limits.map((l) => formatINR(l.crmLicenses)) },
    { feature: "Zutok ZShop (store automation)", cells: free },
    { feature: "Zutok Zloya (loyalty & memberships)", cells: free },
  ];
})();

/** Zutok CRM plans side by side, from the CRM feature lists in pricing.ts. */
const crmRows: CompareRow[] = [
  { feature: "Leads, customers & pipeline", cells: [true, true, true] },
  { feature: "GST invoices, proposals & payments", cells: [true, true, true] },
  { feature: "Users", cells: ["3", "10", "Unlimited"] },
  { feature: "HRM, payroll & attendance", cells: [false, true, true] },
  { feature: "Inventory & warehouse", cells: [false, true, true] },
  { feature: "Real Estate suite", cells: [false, false, true] },
  { feature: "Dedicated account manager", cells: [false, false, true] },
];

const compareTables: CompareTable[] = [
  { id: "compare-zchat", title: "Zutok ZChat plans", group: zchat, rows: zchatRows },
  { id: "compare-crm", title: "Zutok CRM plans", group: crm, rows: crmRows },
];

/** "₹19,200 for Starter, ₹47,988 for Growth and ₹95,988 for Scale": ZChat's yearly prices, as set per plan. */
const zchatYearly = listJoin(pricedPlans(zchat).map((p) => `₹${formatINR(yearlyTotal(p) ?? 0)} for ${p.name}`));

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
          <h1 className="text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-8xl">
            <span className="mb-6 block">
              <span className="inline-block rounded-full border-2 border-white bg-[#22c55e] px-4 py-1.5 text-xs font-extrabold uppercase leading-normal tracking-[0.3em] text-ink shadow-[3px_3px_0_#ffffff]">
                Zutok pricing in rupees
              </span>
            </span>
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
            Choose ZChat or Zutok CRM, <span className="font-serif font-normal italic">then a plan</span>
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
            Every ZChat and Zutok CRM plan in one table, billed monthly or yearly. Yearly Zutok CRM plans charge{" "}
            {YEARLY_MONTHS_CHARGED} months for 12; yearly ZChat plans cost {zchatYearly} a year. All prices are in Indian
            Rupees and exclude 18% GST.
          </p>
          <Reveal delay={0.1} className="mt-10">
            <PlanPriceTable linkProducts />
          </Reveal>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-medium text-ink/65">
            ZChat plans cover the Zutok software. Meta&apos;s per-message charges for WhatsApp template messages are billed
            separately at Meta&apos;s published rates.{" "}
            <Link
              href={solutionPath("whatsapp-business-api")}
              className="font-bold text-ink underline decoration-2 underline-offset-4"
            >
              How the WhatsApp Business API works and what Meta charges
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-6xl">
              Compare what&apos;s <span className="font-serif font-normal italic">included</span>
            </h2>
          </Reveal>
          {compareTables.map((t) => (
            <div key={t.id} className="mt-12">
              <h3 id={t.id} className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight">
                <span className="size-3 shrink-0 rounded-full ring-1 ring-ink/20" style={{ background: t.group.stripe }} />
                {t.title}
              </h3>
              <Reveal
                delay={0.1}
                className="mt-5 overflow-x-auto rounded-[2rem] border-[2.5px] border-ink bg-white shadow-[6px_6px_0_#0b0b0b]"
              >
                <table className="w-full min-w-[640px] text-left" aria-labelledby={t.id}>
                  <thead>
                    <tr className="bg-ink text-sm text-white">
                      <th className="p-5 font-bold">Feature</th>
                      {t.group.plans.map((p) => (
                        <th key={p.name} className="p-5 text-center font-extrabold">
                          {t.group.id === "crm" ? "CRM" : t.group.label} {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((row) => (
                      <tr key={row.feature} className="border-b border-ink/5 last:border-0">
                        <td className="p-5 text-sm font-semibold text-ink/80">{row.feature}</td>
                        {row.cells.map((c, i) => (
                          <td key={i} className={cx(`p-5 text-center ${t.group.plans[i]?.popular ? "bg-[#dcfce7]" : ""}`)}>
                            <Cell v={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            </div>
          ))}
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
