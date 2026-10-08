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
   * The owner's yearly price: the total billed for 12 months and the per-month figure shown for it, both stored as
   * given and neither computed from the other (₹1,599 × 12 is ₹19,188, not ₹19,200; Zutok CRM ₹1,039 × 12 = ₹12,468).
   * Zutok CRM figures are per user.
   */
  yearly: { total: number; perMonth: number };
  /** ZChat only: contacts, channels and CRM licenses. */
  limits?: PlanLimits;
  /**
   * Zutok CRM only: the number of users a per-user price applies to, as the owner stated it: exactly `min` users, or
   * `min` or more with `orMore`. No other user counts are priced (nothing is published for 2 or 4 users).
   */
  users?: { min: number; orMore?: boolean };
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
  /** Every price is per user (one license = one user). Zutok CRM only. */
  perUser?: boolean;
  /** Owner-stated yearly discount, shown as a badge ("20% off"). Zutok CRM only; the yearly figures themselves are stored as given. */
  yearlyOff?: number;
  /**
   * Zutok CRM only: what every price includes, the same at every user count, so it is shown once for the group rather
   * than as a list on each price card. Each CRM plan's `features` is this same list.
   */
  sharedFeatures?: string[];
  plans: Plan[];
};

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

/**
 * What Zutok CRM includes, the same for every user count: nothing is gated by the number of users. Every module is part
 * of Zutok CRM, priced per user.
 */
export const CRM_FEATURES = [
  "Leads, pipeline, Meta Lead Ads & IndiaMART",
  "Proposals, estimates & GST invoices",
  "Projects, tasks & timesheets",
  "HRM, attendance & leave",
  "Inventory & warehouse",
  "Real Estate suite",
  "Subscriptions, expenses & support tickets",
  "Automation, reports & custom fields",
];

/** The owner's stated yearly discount on Zutok CRM (2026-10-09). The yearly figures are stored as given, not computed. */
const CRM_YEARLY_OFF = 20;

/**
 * Prices as the owner set them on 2026-10-09: ZChat plans first, then Zutok CRM's per-user prices (1 user, 3 users,
 * 5 or more users). The order drives the tabs and every table.
 */
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
    note: `Zutok CRM is priced per user: one CRM license is one user. Billed yearly, it costs ${CRM_YEARLY_OFF}% less.`,
    perUser: true,
    yearlyOff: CRM_YEARLY_OFF,
    sharedFeatures: CRM_FEATURES,
    // Owner's per-user prices (2026-10-09), stored exactly as given. No tier is marked popular: there is no data for it.
    plans: [
      {
        name: "1 user",
        users: { min: 1 },
        monthly: 1299,
        yearly: { total: 12468, perMonth: 1039 },
        blurb: "For one user, with every Zutok CRM module.",
        features: CRM_FEATURES,
      },
      {
        name: "3 users",
        users: { min: 3 },
        monthly: 1199,
        yearly: { total: 11508, perMonth: 959 },
        blurb: "Per user, for 3 users, with every Zutok CRM module.",
        features: CRM_FEATURES,
      },
      {
        name: "5 or more users",
        users: { min: 5, orMore: true },
        monthly: 999,
        yearly: { total: 9588, perMonth: 799 },
        blurb: "Per user, for 5 or more users, with every Zutok CRM module.",
        features: CRM_FEATURES,
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

/**
 * The cheapest priced plan in a group: ZChat Starter, or Zutok CRM "5 or more users" (₹999 per user). Never quote the
 * CRM one as "from ₹999" without its 5-or-more condition: use `crmLowest` or `crmPriceRange`.
 */
export const cheapestPlan = (group: PricingGroupId) =>
  pricedPlans(getGroup(group)).reduce((a, b) => (b.monthly < a.monthly ? b : a));

/** The ZChat plans that include ZShop and Zloya free (Growth and Scale). */
export const bundlePlans = () => pricedPlans(getGroup("zchat")).filter((p) => p.includesZShopAndZloya);

/* ------------------------------------------------------------------ */
/* Prices                                                             */
/* ------------------------------------------------------------------ */

/** What one year costs: the owner's stated yearly total (per user for Zutok CRM). */
export function yearlyTotal(plan: Plan) {
  if (plan.monthly === null) return null;
  return plan.yearly.total;
}

/** The per-month figure shown for a plan: the monthly price, or the stated per-month figure when billed yearly (per user for Zutok CRM). */
export function priceFor(plan: Plan, yearly: boolean) {
  if (plan.monthly === null) return null;
  return yearly ? plan.yearly.perMonth : plan.monthly;
}

/** " per user" for Zutok CRM, "" for ZChat: goes straight after a price ("₹1,299 per user/month"). */
const perUserSuffix = (group: PricingGroupId) => (getGroup(group).perUser ? " per user" : "");

/** "₹2,000/month, or ₹1,599/month billed yearly"; Zutok CRM: "₹1,299 per user/month, or ₹1,039 per user/month billed yearly". */
export function priceBothWays(group: PricingGroupId, name: string) {
  const p = getPlan(group, name);
  const u = perUserSuffix(group);
  return `${inr(p.monthly)}${u}/month, or ${inr(priceFor(p, true) ?? p.monthly)}${u}/month billed yearly`;
}

/** "₹2,000/month, or ₹1,599/month billed yearly": where ZChat plans start. */
export const zchatFrom = () => priceBothWays("zchat", cheapestPlan("zchat").name);

/* ------------------------------------------------------------------ */
/* Zutok CRM: priced per user (owner, 2026-10-09)                      */
/* One CRM license is one user. Prices exist only for 1 user, 3 users  */
/* and 5 or more users: never state a price for 2 or 4 users.          */
/* ------------------------------------------------------------------ */

/** Zutok CRM's per-user prices, in order: "1 user", "3 users", "5 or more users". */
export const crmTiers = () => pricedPlans(getGroup("crm"));

/** "Zutok CRM is priced per user: one CRM license is one user." */
export const CRM_PER_USER = "Zutok CRM is priced per user: one CRM license is one user.";

/** "₹1,299 per user per month": Zutok CRM for 1 user, billed monthly. The default short form. */
export const crmFrom = () => `${inr(crmTiers()[0].monthly)} per user per month`;

/** "₹999 per user with 5 or more users": the lowest per-user price, always with its condition attached. */
export const crmLowest = () => {
  const p = cheapestPlan("crm");
  return `${inr(p.monthly)} per user with ${p.name}`;
};

/** "₹1,299 per user per month (₹999 per user with 5 or more users)" */
export const crmPriceRange = () => `${crmFrom()} (${crmLowest()})`;

/**
 * "₹1,299 per user per month, ₹1,199 per user with 3 users and ₹999 per user with 5 or more users; billed yearly
 * it's 20% less (₹1,039, ₹959 and ₹799 per user per month)". Lower case, to finish a sentence; excludes GST.
 */
export const crmPrices = () => {
  const [first, ...rest] = crmTiers();
  return (
    `${inr(first.monthly)} per user per month, ${listJoin(rest.map((p) => `${inr(p.monthly)} per user with ${p.name}`))}; ` +
    `billed yearly it's ${getGroup("crm").yearlyOff}% less (${listJoin(crmTiers().map((p) => inr(p.yearly.perMonth)))} per user per month)`
  );
};

/** "Zutok CRM costs ₹1,299 per user per month, ₹1,199 per user with 3 users and ... (₹1,039, ₹959 and ₹799 per user per month)". No full stop. */
export const CRM_PRICES = `Zutok CRM costs ${crmPrices()}`;

/**
 * "₹1,039 per user per month (₹12,468 a year) for 1 user, ₹959 per user per month (₹11,508 a year) with 3 users and
 * ₹799 per user per month (₹9,588 a year) with 5 or more users": Zutok CRM billed yearly.
 */
export const crmYearlyPrices = () =>
  listJoin(
    crmTiers().map(
      (p, i) => `${inr(p.yearly.perMonth)} per user per month (${inr(p.yearly.total)} a year) ${i === 0 ? "for" : "with"} ${p.name}`,
    ),
  );

/** "₹12,468, ₹11,508 and ₹9,588 per user per year" */
export const CRM_YEARLY_TOTALS = `${listJoin(crmTiers().map((p) => inr(p.yearly.total)))} per user per year`;

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
 * "Plans from ₹2,000/month billed monthly, excl. 18% GST." for ZChat,
 * "₹1,299 per user per month billed monthly (₹999 per user with 5 or more users), excl. 18% GST." for Zutok CRM, and
 * "Included free with ZChat Growth (₹5,000/month) and Scale (₹10,000/month), excl. 18% GST." for ZShop and Zloya.
 */
export function productPriceNote(slug: ProductSlug) {
  if (isBundled(slug)) return `${capitalise(ZSHOP_ZLOYA_INCLUDED_MONTHLY)}, excl. 18% GST.`;
  if (planGroup(slug) === "crm") return `${capitalise(crmFrom())} billed monthly (${crmLowest()}), excl. 18% GST.`;
  return `Plans from ${inr(cheapestPlan(planGroup(slug)).monthly)}/month billed monthly, excl. 18% GST.`;
}

/** "500 contacts, 1 channel and 1 CRM license" for a ZChat plan. */
export const describeLimits = (group: PricingGroupId, name: string) => {
  const l = getPlan(group, name).limits;
  if (!l) throw new Error(`pricing.ts: "${group} ${name}" has no limits`);
  return listJoin(limitParts(l));
};
