import type { IconName } from "@/components/ui/Icon";
import type { ProductSlug } from "@/lib/products";
import {
  bundlePlans,
  cheapestPlan,
  formatINR,
  getPlan,
  isBundled,
  planGroup,
  yearlyTotal,
  type PricedPlan,
  type PricingGroupId,
} from "@/lib/pricing";

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
  /**
   * Zutok CRM pages only: what this page is about, per CRM plan. The first item's `from` is the plan the page starts on,
   * and the plan cards tick each item from that plan up. ZChat, ZShop and Zloya pages leave it out: which ZChat plan
   * has which feature isn't published, so their cards list each plan's own contacts, channels and CRM licenses.
   */
  includes?: { label: string; from: string }[];
  /** Zutok CRM pages only: one line per plan name, saying what matters about that plan for this use case. */
  highlights?: Record<string, string>;
  /**
   * The plan the page starts on, in the pricing group that sells the page's product (see `planGroup`). Optional:
   * ZChat pages start on the cheapest ZChat plan, ZShop and Zloya pages on the first ZChat plan that includes them
   * free (Growth), and CRM pages on `includes[0].from`.
   */
  startsOn?: string;
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

/** "zchat" or "crm". ZShop and Zloya have no plans of their own: they come free with ZChat Growth and Scale. */
export type GroupId = PricingGroupId;

export { planGroup };
/** Shared ZChat / ZShop / Zloya copy, re-exported from src/lib/pricing.ts so solution pages need one import. */
export {
  bundlePlanNames,
  describeLimits,
  zchatFrom,
  ZSHOP_ZLOYA_INCLUDED,
  ZSHOP_ZLOYA_INCLUDED_MONTHLY,
  ZSHOP_ZLOYA_NOTE,
} from "@/lib/pricing";

/** A priced plan by group and name. Throws at build time if the plan is renamed or removed. */
export function pricedPlan(group: GroupId, name: string): PricedPlan {
  try {
    return getPlan(group, name);
  } catch {
    throw new Error(`solution-kit.ts: no priced plan "${name}" in "${group}"`);
  }
}

/**
 * The plan a solution page starts on, in the pricing group that sells its product: `startsOn` if set; otherwise the
 * first ZChat plan that includes ZShop and Zloya free (Growth) for those two, the cheapest plan (Starter) for ZChat,
 * and `includes[0].from` (or the cheapest plan) for Zutok CRM.
 */
export function solutionStart(product: ProductSlug, plan: Pick<SolutionPlan, "includes" | "startsOn">) {
  const group = planGroup(product);
  const bundled = isBundled(product);
  const fallback = bundled
    ? bundlePlans()[0].name
    : group === "crm"
      ? (plan.includes?.[0]?.from ?? cheapestPlan(group).name)
      : cheapestPlan(group).name;
  return { group, bundled, plan: pricedPlan(group, plan.startsOn ?? fallback) };
}

/** "₹2,000/month": the price billed monthly. */
export const perMonth = (group: GroupId, plan: string) => `₹${formatINR(pricedPlan(group, plan).monthly)}/month`;

/**
 * Both billing options, excluding GST:
 * ZChat: "₹2,000/month billed monthly (₹19,200/year, or ₹1,599/month billed yearly), excl. 18% GST"
 * CRM:   "₹799/month billed monthly (₹7,990/year), excl. 18% GST"
 */
export const priceLine = (group: GroupId, plan: string) => {
  const p = pricedPlan(group, plan);
  const perMonthYearly = p.yearly ? `, or ₹${formatINR(p.yearly.perMonth)}/month billed yearly` : "";
  return `₹${formatINR(p.monthly)}/month billed monthly (₹${formatINR(yearlyTotal(p) ?? 0)}/year${perMonthYearly}), excl. 18% GST`;
};
