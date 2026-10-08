import type { IconName } from "@/components/ui/Icon";
import type { ProductSlug } from "@/lib/products";
import { formatINR, pricing, YEARLY_MONTHS_CHARGED, type PricingGroup } from "@/lib/pricing";

/**
 * Types and price helpers shared by src/lib/solutions.ts and the per-page files in src/lib/solution-pages/.
 * This module must never import solutions.ts or a solution page, so the data files can import it without a cycle.
 */

export type SolutionSlug =
  | "whatsapp-automation"
  | "whatsapp-business-api"
  | "whatsapp-ai-sales-agent"
  | "whatsapp-broadcast-campaigns"
  | "whatsapp-message-templates"
  | "omnichannel-team-inbox"
  | "whatsapp-crm"
  | "instagram-comment-to-dm"
  | "facebook-messenger-automation"
  | "whatsapp-cod-confirmation"
  | "abandoned-cart-recovery-whatsapp"
  | "whatsapp-order-updates-courier-tracking"
  | "restaurant-membership-prepaid-wallet"
  | "restaurant-qr-code-customer-data"
  | "automated-winback-birthday-campaigns"
  | "gst-invoicing-crm"
  | "indiamart-meta-lead-ads-crm"
  | "crm-with-hrm-payroll";

export type SolutionSection = {
  /** Question-style H2, phrased the way people search. */
  heading: string;
  /** One or two sentences that answer the heading directly. Shown first. */
  lead: string;
  body?: string[];
  bullets?: string[];
};

export type SolutionPlan = {
  heading: string;
  /** Direct answer naming the plan and its price. */
  lead: string;
  /** What this page is about, per plan. The first item's `from` is the plan the solution starts on. */
  includes: { label: string; from: string }[];
  /** One line per plan name, saying what matters about that plan for this use case. */
  highlights: Record<string, string>;
  /** Complete Suite plan that already contains the first item. */
  suite?: string;
};

export type Solution = {
  slug: SolutionSlug;
  /** Short name for breadcrumbs, cards and links. */
  name: string;
  /** Pill above the H1. */
  kicker: string;
  relatedProduct: ProductSlug;
  /** <title> (the layout adds " | Zutok"). */
  title: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  /** Trailing words of `h1` set in serif italic. */
  h1Accent?: string;
  /** 40–70 word answer shown right under the H1: what it is, who it's for, the starting price. */
  answer: string;
  /** One line for cards and llms.txt. */
  summary: string;
  facts: { value: string; label: string }[];
  problem: SolutionSection;
  approach: SolutionSection;
  extra?: SolutionSection[];
  steps: { heading: string; lead: string; items: { title: string; body: string }[] };
  features: { heading: string; lead?: string; items: { title: string; body: string; icon: IconName }[] };
  plan: SolutionPlan;
  faqs: { q: string; a: string }[];
  /** Up to 6 cards at the foot of the page (the grid shows 3 per row). */
  related: SolutionSlug[];
  /** Hub pages only: every detailed page the hub covers, shown as a pill list after the prose sections. */
  spokes?: { heading: string; lead: string; items: SolutionSlug[] };
};

/** One page's data, keyed by its slug in solutions.ts. */
export type SolutionEntry = Omit<Solution, "slug">;

export type GroupId = PricingGroup["id"];

export function pricedPlan(group: GroupId, name: string) {
  const plan = pricing.find((g) => g.id === group)?.plans.find((p) => p.name === name);
  if (!plan || plan.monthly === null) throw new Error(`solution-kit.ts: no priced plan "${name}" in "${group}"`);
  return { ...plan, monthly: plan.monthly };
}

/** "₹1,999/month" */
export const perMonth = (group: GroupId, plan: string) => `₹${formatINR(pricedPlan(group, plan).monthly)}/month`;

/** "₹1,999/month billed monthly (₹19,990/year), excl. 18% GST" */
export const priceLine = (group: GroupId, plan: string) => {
  const m = pricedPlan(group, plan).monthly;
  return `₹${formatINR(m)}/month billed monthly (₹${formatINR(m * YEARLY_MONTHS_CHARGED)}/year), excl. 18% GST`;
};
