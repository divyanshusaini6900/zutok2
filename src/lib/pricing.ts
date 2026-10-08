import type { ProductSlug } from "@/lib/products";

/** A ZChat plan's allowances, exactly as the owner set them. */
export type PlanLimits = {
  /** `null` means unlimited contacts. */
  contacts: number | null;
  channels: number;
  crmLicenses: number;
};

export type Plan = {
  name: string;
  monthly: number | null;
  /**
   * The owner's yearly price: the total billed for 12 months and the per-month figure shown for it. Both are stored as
   * given and neither is computed from the other (₹1,599 × 12 is ₹19,188, not ₹19,200). Plans without it (Zutok CRM)
   * charge YEARLY_MONTHS_CHARGED months for 12.
   */
  yearly?: { total: number; perMonth: number };
  /** ZChat only: contacts, channels and CRM licenses. */
  limits?: PlanLimits;
  /** Zutok ZShop and Zutok Zloya come free with this plan. Neither is sold separately. */
  includesZShopAndZloya?: boolean;
  blurb: string;
  features: string[];
  /** Highlights the plan's card and its column in the comparison tables. */
  popular?: boolean;
  /** The highlighted card's badge. Defaults to "Most popular" (cards) and "Popular" (the /pricing/ table). */
  badge?: string;
};

export type PricedPlan = Plan & { monthly: number };

export type PricingGroupId = "zchat" | "crm";

export type PricingGroup = {
  id: PricingGroupId;
  label: string;
  color: string;
  color2: string;
  /** Accent colour for checks, badges and the top stripe. */
  pop: string;
  stripe: string;
  note?: string;
  plans: Plan[];
};

/** Zutok CRM only: a yearly CRM plan charges 10 months for 12. ZChat's yearly prices are the explicit `plan.yearly` values. */
export const YEARLY_MONTHS_CHARGED = 10;

/** Products that aren't sold on their own: they come free with the ZChat plans flagged `includesZShopAndZloya`. */
export const BUNDLED_PRODUCTS = ["zshop", "zloya"] as const satisfies readonly ProductSlug[];

export const isBundled = (slug: ProductSlug | PricingGroupId) => (BUNDLED_PRODUCTS as readonly string[]).includes(slug);

/** "₹2,000" */
export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

/** "₹2,000" */
export const inr = (n: number) => `₹${formatINR(n)}`;

/** "a", "a and b", "a, b and c" */
export function listJoin(items: string[]) {
  return items.length < 2 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const plural = (n: number, one: string) => `${formatINR(n)} ${n === 1 ? one : `${one}s`}`;

/** ["500 contacts", "1 channel", "1 CRM license"], lower case, for use inside sentences. */
export function limitParts(l: PlanLimits) {
  return [
    l.contacts === null ? "unlimited contacts" : plural(l.contacts, "contact"),
    plural(l.channels, "channel"),
    plural(l.crmLicenses, "CRM license"),
  ];
}

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** One feature line on the ZChat Growth and Scale cards. */
export const ZSHOP_ZLOYA_FEATURE = "ZShop + Zloya included free";

/** A ZChat plan whose blurb and feature list are built from its limits, so the two can't disagree. */
function zchatPlan(p: Omit<Plan, "blurb" | "features" | "limits"> & { limits: PlanLimits }): Plan {
  const parts = limitParts(p.limits);
  return {
    ...p,
    blurb: `${capitalise(listJoin(parts))}${p.includesZShopAndZloya ? ", with ZShop and Zloya free" : ""}.`,
    features: [...parts.map(capitalise), ...(p.includesZShopAndZloya ? [ZSHOP_ZLOYA_FEATURE] : [])],
  };
}

/** Plans as the owner set them on 2026-10-09: ZChat first, then Zutok CRM. The order drives the tabs and every table. */
export const pricing: PricingGroup[] = [
  {
    id: "zchat",
    label: "ZChat",
    color: "#0b0b0b",
    color2: "#2e2e2e",
    pop: "#22c55e",
    stripe: "#22c55e",
    note: "ZShop and Zloya are included free with ZChat Growth and Scale. Meta's per-message charges for WhatsApp template messages are billed separately at Meta's published rates.",
    plans: [
      zchatPlan({
        name: "Starter",
        monthly: 2000,
        yearly: { total: 19200, perMonth: 1599 },
        limits: { contacts: 500, channels: 1, crmLicenses: 1 },
      }),
      zchatPlan({
        name: "Growth",
        monthly: 5000,
        yearly: { total: 47988, perMonth: 3999 },
        limits: { contacts: 1500, channels: 2, crmLicenses: 2 },
        includesZShopAndZloya: true,
        // Highlighted, but not "Most popular": these ZChat plans were priced on 2026-10-09, so there is no sales data yet.
        popular: true,
        badge: "Recommended",
      }),
      zchatPlan({
        name: "Scale",
        monthly: 10000,
        yearly: { total: 95988, perMonth: 7499 },
        limits: { contacts: null, channels: 4, crmLicenses: 4 },
        includesZShopAndZloya: true,
      }),
    ],
  },
  {
    id: "crm",
    label: "Zutok CRM",
    color: "#0b0b0b",
    color2: "#2e2e2e",
    pop: "#6c2bd9",
    stripe: "#6c2bd9",
    plans: [
      {
        name: "Starter",
        monthly: 799,
        blurb: "Leads, sales and projects for small teams.",
        features: [
          "Up to 3 users",
          "Leads, customers & pipeline",
          "Proposals, estimates & GST invoices",
          "Projects, tasks & tickets",
          "Meta Lead Ads & IndiaMART leads",
        ],
      },
      {
        name: "Growth",
        monthly: 1299,
        popular: true,
        blurb: "Run sales, people and stock from one place.",
        features: [
          "Up to 10 users",
          "Everything in Starter",
          "HRM, payroll, attendance & leave",
          "Inventory & warehouse",
          "Contracts, expenses, subscriptions",
          "Automation & reports",
        ],
      },
      {
        name: "Enterprise",
        monthly: 1999,
        blurb: "For large teams, agencies and multi-branch businesses.",
        features: [
          "Unlimited users",
          "Everything in Growth",
          "Real Estate suite",
          "Custom fields for every module",
          "Dedicated account manager",
          "Priority support",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Lookups. Each throws at build time on an unknown group or plan.    */
/* ------------------------------------------------------------------ */

/** The pricing group that sells a product: Zutok CRM for "crm", ZChat for "zchat", "zshop" and "zloya". */
export const planGroup = (slug: ProductSlug | PricingGroupId): PricingGroupId => (slug === "crm" ? "crm" : "zchat");

export function getGroup(id: PricingGroupId): PricingGroup {
  const g = pricing.find((x) => x.id === id);
  if (!g) throw new Error(`pricing.ts: no pricing group "${id}"`);
  return g;
}

export const pricedPlans = (g: PricingGroup) => g.plans.filter((p): p is PricedPlan => p.monthly !== null);

/** A priced plan by group and name, e.g. getPlan("zchat", "Growth"). */
export function getPlan(group: PricingGroupId, name: string): PricedPlan {
  const plan = pricedPlans(getGroup(group)).find((p) => p.name === name);
  if (!plan) throw new Error(`pricing.ts: no priced plan "${name}" in "${group}"`);
  return plan;
}

/** The cheapest priced plan in a group (ZChat Starter, CRM Starter). */
export const cheapestPlan = (group: PricingGroupId) =>
  pricedPlans(getGroup(group)).reduce((a, b) => (b.monthly < a.monthly ? b : a));

/** The ZChat plans that include ZShop and Zloya free (Growth and Scale). */
export const bundlePlans = () => pricedPlans(getGroup("zchat")).filter((p) => p.includesZShopAndZloya);

/* ------------------------------------------------------------------ */
/* Prices                                                             */
/* ------------------------------------------------------------------ */

/** What one year costs: ZChat's stated yearly total, or the CRM's monthly price × YEARLY_MONTHS_CHARGED. */
export function yearlyTotal(plan: Plan) {
  if (plan.monthly === null) return null;
  return plan.yearly?.total ?? plan.monthly * YEARLY_MONTHS_CHARGED;
}

/** The per-month figure shown for a plan: the monthly price, or when billed yearly ZChat's stated figure / the CRM's yearly ÷ 12. */
export function priceFor(plan: Plan, yearly: boolean) {
  if (plan.monthly === null) return null;
  if (!yearly) return plan.monthly;
  return plan.yearly?.perMonth ?? Math.round((plan.monthly * YEARLY_MONTHS_CHARGED) / 12);
}

/** "₹2,000/month, or ₹1,599/month billed yearly" (CRM: "₹799/month, or ₹666/month billed yearly"). */
export function priceBothWays(group: PricingGroupId, name: string) {
  const p = getPlan(group, name);
  return `${inr(p.monthly)}/month, or ${inr(priceFor(p, true) ?? p.monthly)}/month billed yearly`;
}

/** "₹2,000/month, or ₹1,599/month billed yearly": where ZChat plans start. */
export const zchatFrom = () => priceBothWays("zchat", cheapestPlan("zchat").name);

/** "₹799/month": where Zutok CRM plans start, billed monthly. */
export const crmFrom = () => `${inr(cheapestPlan("crm").monthly)}/month`;

/** "Growth and Scale" */
export const bundlePlanNames = () => listJoin(bundlePlans().map((p) => p.name));

/** "Growth & Scale": the same, short enough for meta descriptions, chips and buttons. */
export const BUNDLE_PLANS_SHORT = bundlePlans()
  .map((p) => p.name)
  .join(" & ");

/**
 * "included free with ZChat Growth (₹5,000/month, or ₹3,999/month billed yearly) and Scale (₹10,000/month, or
 * ₹7,499/month billed yearly)". Lower case, to finish a sentence about ZShop or Zloya. Excludes GST; say so nearby.
 */
export const ZSHOP_ZLOYA_INCLUDED = `included free with ZChat ${listJoin(
  bundlePlans().map((p) => `${p.name} (${priceBothWays("zchat", p.name)})`),
)}`;

/** "included free with ZChat Growth (₹5,000/month) and Scale (₹10,000/month)": the billed-monthly prices only. */
export const ZSHOP_ZLOYA_INCLUDED_MONTHLY = `included free with ZChat ${listJoin(
  bundlePlans().map((p) => `${p.name} (${inr(p.monthly)}/month)`),
)}`;

/** "ZShop and Zloya are included free with ZChat Growth and Scale." No prices. */
export const ZSHOP_ZLOYA_NOTE = `ZShop and Zloya are included free with ZChat ${bundlePlanNames()}.`;

/**
 * One line on how a product is priced, for cards, sidebars and llms.txt:
 * "Plans from ₹2,000/month billed monthly, excl. 18% GST." for ZChat (₹799 for "crm"), and
 * "Included free with ZChat Growth (₹5,000/month) and Scale (₹10,000/month), excl. 18% GST." for ZShop and Zloya.
 */
export function productPriceNote(slug: ProductSlug) {
  if (isBundled(slug)) return `${capitalise(ZSHOP_ZLOYA_INCLUDED_MONTHLY)}, excl. 18% GST.`;
  return `Plans from ${inr(cheapestPlan(planGroup(slug)).monthly)}/month billed monthly, excl. 18% GST.`;
}

/** "500 contacts, 1 channel and 1 CRM license" for a ZChat plan. */
export const describeLimits = (group: PricingGroupId, name: string) => {
  const l = getPlan(group, name).limits;
  if (!l) throw new Error(`pricing.ts: "${group} ${name}" has no limits`);
  return listJoin(limitParts(l));
};
