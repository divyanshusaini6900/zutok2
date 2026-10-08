/**
 * Company-wide copy shared by several pages, the About page and llms.txt, so every place says the same thing.
 * Page files can't export extra values, so copy that more than one route needs lives here.
 */

import { formatINR, pricing } from "@/lib/pricing";
import { BRAND_SUMMARY, PRICING_SUMMARY } from "@/lib/seo";

export type QA = { q: string; a: string };

export { onboardingSteps } from "@/lib/onboarding";

/** "₹2,299": a Complete Suite plan's monthly price. Throws at build time if the plan is renamed. */
function suitePrice(name: string) {
  const monthly = pricing.find((g) => g.id === "suite")?.plans.find((p) => p.name === name)?.monthly;
  if (monthly == null) throw new Error(`company.ts: no priced suite plan "${name}"`);
  return `₹${formatINR(monthly)}`;
}

const PER_USER =
  "No. Plans have a flat monthly price with user and seat limits: Zutok CRM covers up to 3, up to 10 or unlimited users, and ZChat comes with 2, 5 or 15 team seats. Prices exclude 18% GST.";

/** Home page FAQ. */
export const homeFaqs: QA[] = [
  { q: "What is Zutok?", a: BRAND_SUMMARY },
  {
    q: "Can Zutok automate WhatsApp and Instagram?",
    a: "Yes. ZChat's AI sales agent answers product and price questions from your catalogue on WhatsApp, Instagram, Messenger and Telegram. On WhatsApp, ZChat also sends broadcasts on Meta-approved templates, and ZShop confirms COD orders, sends order updates and reminds abandoned carts. On Instagram and Facebook, ZChat replies to comments on your posts and reels and sends a private DM to everyone who comments.",
  },
  {
    q: "Can I buy just one product?",
    a: "Yes. ZChat, ZShop and Zloya are each sold on their own, and each includes the CRM features it needs. The Complete Suite bundles all of them for less.",
  },
  {
    q: "What's in each Complete Suite plan?",
    a:
      `Suite Starter (${suitePrice("Suite Starter")}/month) has CRM Starter for 3 users, ZChat Starter for WhatsApp and Instagram, ZShop Starter for 1 store and 500 orders a month, Zloya for 1 outlet and an onboarding call. ` +
      `Suite Growth (${suitePrice("Suite Growth")}/month) has CRM Growth for 10 users with HRM and inventory, ZChat Growth with all 4 channels and the AI sales agent, ZShop Growth for 3 stores with abandoned carts, Zloya Growth for 3 outlets with memberships, and guided setup with template approval help. ` +
      `Suite Enterprise (${suitePrice("Suite Enterprise")}/month) has CRM Enterprise with unlimited users, ZChat Scale, ZShop Scale, Zloya Chain and a dedicated success manager. ` +
      "Each costs about 40% less than buying the four products separately, excluding 18% GST.",
  },
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
    a: "There is no setup fee. Monthly plans can be cancelled at the end of any month, and yearly plans give you two months free.",
  },
];

/** Billing questions on /pricing/. */
export const pricingFaqs: QA[] = [
  { q: "How much does Zutok cost?", a: PRICING_SUMMARY },
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
