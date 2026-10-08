/**
 * Company-wide copy shared by several pages, the About page and llms.txt, so every place says the same thing.
 * Page files can't export extra values, so copy that more than one route needs lives here.
 */

import {
  formatINR,
  getGroup,
  limitParts,
  listJoin,
  pricedPlans,
  yearlyTotal,
  YEARLY_MONTHS_CHARGED,
  ZSHOP_ZLOYA_INCLUDED,
} from "@/lib/pricing";
import { BRAND_SUMMARY, PRICING_SUMMARY } from "@/lib/seo";

export type QA = { q: string; a: string };

export { onboardingSteps } from "@/lib/onboarding";

/* ZChat copy is built from pricing.ts, so the answers can't drift from the plans. */
const zchatPlans = pricedPlans(getGroup("zchat")).map((p) => {
  if (!p.limits) throw new Error(`company.ts: ZChat ${p.name} has no limits`);
  return { ...p, limits: p.limits };
});

/** "a, b or c" */
const orJoin = (items: string[]) => `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`;

/** "₹19,200 for Starter, ₹47,988 for Growth or ₹95,988 for Scale": ZChat's yearly prices, as set per plan. */
const zchatYearly = orJoin(zchatPlans.map((p) => `₹${formatINR(yearlyTotal(p) ?? 0)} for ${p.name}`));

/*
 * Only Zutok CRM is known not to charge per user. ZChat plans come with a set number of CRM licenses, and how extra
 * users or licenses are priced isn't published, so the answer doesn't say "No" for ZChat.
 */
const PER_USER =
  "Not on Zutok CRM: its plans have a flat monthly price for up to 3, up to 10 or unlimited users. " +
  "ZChat plans also have a flat monthly price, and include " +
  `${orJoin(zchatPlans.map((p) => (p.limits.contacts === null ? "unlimited" : formatINR(p.limits.contacts))))} contacts, ` +
  `${orJoin(zchatPlans.map((p) => formatINR(p.limits.channels)))} channels and ` +
  `${orJoin(zchatPlans.map((p) => formatINR(p.limits.crmLicenses)))} CRM licenses. Prices exclude 18% GST.`;

/** "ZChat Starter (₹2,000/month, or ₹19,200/year) includes 500 contacts, 1 channel and 1 CRM license. ..." */
const ZCHAT_PLANS =
  zchatPlans
    .map((p) => {
      const free = p.includesZShopAndZloya ? ", with ZShop and Zloya free" : "";
      return `ZChat ${p.name} (₹${formatINR(p.monthly)}/month, or ₹${formatINR(yearlyTotal(p) ?? 0)}/year) includes ${listJoin(limitParts(p.limits))}${free}.`;
    })
    .join(" ") + " Prices exclude 18% GST.";

const BUNDLE_QA: QA = {
  q: "Can I buy ZShop or Zloya on their own?",
  a: `No. Zutok ZShop and Zutok Zloya aren't sold separately: they're ${ZSHOP_ZLOYA_INCLUDED}, excluding 18% GST.`,
};

/** Home page FAQ. */
export const homeFaqs: QA[] = [
  { q: "What is Zutok?", a: BRAND_SUMMARY },
  {
    q: "Can Zutok automate WhatsApp and Instagram?",
    a: "Yes. ZChat's AI sales agent answers product and price questions from your catalogue on WhatsApp, Instagram, Messenger and Telegram. On WhatsApp, ZChat also sends broadcasts on Meta-approved templates, and ZShop confirms COD orders, sends order updates and reminds abandoned carts. On Instagram and Facebook, ZChat replies to comments on your posts and reels and sends a private DM to everyone who comments.",
  },
  {
    q: "Can I buy just one product?",
    a: `Yes. Zutok CRM and ZChat each have their own plans, and every ZChat plan includes CRM licenses. ZShop and Zloya aren't sold on their own: they're ${ZSHOP_ZLOYA_INCLUDED}, excluding 18% GST.`,
  },
  { q: "What's in each ZChat plan?", a: ZCHAT_PLANS },
  { q: "Do I pay per user?", a: PER_USER },
  {
    q: "How does the ZChat AI know my prices?",
    a: "You add each product with your own columns and rows, like size, paper, quantity, price and order link. The AI asks the customer each choice and quotes only from the row that matches, so it never makes up a price.",
  },
  {
    q: "Is my data safe, and who owns it?",
    a: "Your data belongs to you. It is stored on secure servers with regular database backups, and you can export customers, leads and invoices to CSV or PDF whenever you like.",
  },
  {
    q: "Do you help with WhatsApp Business API approval?",
    a: "Yes. We guide you through connecting your number to the official WhatsApp Business Platform and getting your message templates approved by Meta.",
  },
  {
    q: "Do invoices support GST?",
    a: "Yes. Proposals, estimates, invoices and credit notes are all in rupees with tax fields, and you can export them in bulk as PDF.",
  },
  {
    q: "Is there a setup fee or lock-in?",
    a:
      "There is no setup fee. Monthly plans can be cancelled at the end of any month. " +
      `Yearly Zutok CRM plans give you two months free, and yearly ZChat plans cost ${zchatYearly} a year.`,
  },
];

/** Billing questions on /pricing/. */
export const pricingFaqs: QA[] = [
  { q: "How much does Zutok cost?", a: PRICING_SUMMARY },
  { q: "What's in each ZChat plan?", a: ZCHAT_PLANS },
  BUNDLE_QA,
  {
    q: "Are prices inclusive of GST?",
    a: "No. All prices are in Indian Rupees and exclude 18% GST, which is added to your invoice.",
  },
  {
    q: "How does yearly billing work?",
    a:
      `For Zutok CRM you pay for ${YEARLY_MONTHS_CHARGED} months and get 12, which is two months free, and the monthly figure shown is the yearly price divided by 12. ` +
      `ZChat's yearly prices are fixed: ${listJoin(
        zchatPlans.map((p, i) => {
          const year = `₹${formatINR(yearlyTotal(p) ?? 0)}`;
          const shown = `₹${formatINR(p.yearly?.perMonth ?? 0)}/month`;
          return i === 0 ? `${p.name} ${year} a year (shown as ${shown})` : `${p.name} ${year} (${shown})`;
        }),
      )}.`,
  },
  {
    q: "What does WhatsApp messaging cost on top?",
    a: "Meta charges per template message at its published rates for India, billed separately from your Zutok plan and at cost. Meta's [WhatsApp pricing page](https://developers.facebook.com/docs/whatsapp/pricing/) lists the current rates and the messages it doesn't charge for.",
  },
  {
    q: "Is there a setup fee?",
    a: "No. There is no setup fee on any plan.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Monthly plans can be cancelled at the end of any month.",
  },
  {
    q: "Can I try Zutok first?",
    a: "Yes. Book a free 30-minute demo and we'll show you Zutok using your own products, channels and outlets, then help you choose the right plan.",
  },
  { q: "Do I pay per user?", a: PER_USER },
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade at any time and the difference is prorated. You can downgrade at the end of your billing period.",
  },
  {
    q: "Do you offer discounts for NGOs, startups or multiple outlets?",
    a: "Yes. Ask during your demo. We have special pricing for non-profits, early-stage startups and chains with 10+ outlets.",
  },
];
