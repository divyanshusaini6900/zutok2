/**
 * Company-wide copy shared by several pages, the About page and llms.txt, so every place says the same thing.
 * Page files can't export extra values, so copy that more than one route needs lives here.
 */

import { BRAND_SUMMARY, PRICING_SUMMARY } from "@/lib/seo";

export type QA = { q: string; a: string };

export { onboardingSteps } from "@/lib/onboarding";

/** Home page FAQ. */
export const homeFaqs: QA[] = [
  { q: "What is Zutok?", a: BRAND_SUMMARY },
  {
    q: "Can I buy just one product?",
    a: "Yes. ZChat, ZShop and Zloya are each sold on their own, and each includes the CRM features it needs. The Complete Suite bundles all of them for less.",
  },
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
