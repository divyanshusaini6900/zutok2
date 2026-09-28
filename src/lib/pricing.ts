export type Plan = {
  name: string;
  monthly: number | null;
  blurb: string;
  features: string[];
  popular?: boolean;
  worth?: number;
};

export type PricingGroup = {
  id: "suite" | "crm" | "zchat" | "zshop" | "zloya";
  label: string;
  color: string;
  color2: string;
  /** Accent colour for checks, badges and the top stripe. */
  pop: string;
  stripe: string;
  note?: string;
  plans: Plan[];
};

export const YEARLY_MONTHS_CHARGED = 10;

export const pricing: PricingGroup[] = [
  {
    id: "suite",
    label: "Complete Suite",
    color: "#0b0b0b",
    color2: "#2e2e2e",
    pop: "#6c2bd9",
    stripe: "linear-gradient(90deg,#22c55e 0 25%,#ff6b1a 25% 50%,#ff4d8d 50% 75%,#6c2bd9 75%)",
    note: "Zutok CRM + ZChat + ZShop + Zloya together, about 40% less than buying them separately.",
    plans: [
      {
        name: "Suite Starter",
        monthly: 2299,
        worth: 3896,
        blurb: "Everything a small team needs to start selling on chat.",
        features: [
          "CRM Starter (3 users)",
          "ZChat Starter: WhatsApp + Instagram",
          "ZShop Starter: 1 store, 500 orders/mo",
          "Zloya: 1 outlet",
          "Onboarding call",
        ],
      },
      {
        name: "Suite Growth",
        monthly: 5299,
        worth: 8796,
        popular: true,
        blurb: "The full Zutok stack for growing brands and outlets.",
        features: [
          "CRM Growth (10 users) with HRM & Inventory",
          "ZChat Growth: all 4 channels + AI sales agent",
          "ZShop Growth: 3 stores, abandoned carts",
          "Zloya Growth: 3 outlets + memberships",
          "Guided setup and template approval help",
        ],
      },
      {
        name: "Suite Enterprise",
        monthly: 11499,
        worth: 18996,
        blurb: "Unlimited everything, with white-label and a dedicated manager.",
        features: [
          "CRM Enterprise: unlimited users",
          "ZChat Scale: 15 seats, multiple AI agents",
          "ZShop Scale: unlimited stores",
          "Zloya Chain: unlimited outlets",
          "Dedicated success manager",
        ],
      },
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
        blurb: "For large teams, agencies and SaaS resellers.",
        features: [
          "Unlimited users",
          "Everything in Growth",
          "Real Estate suite",
          "Multi-tenant SaaS & API",
          "ZTheme custom branding",
          "Priority support",
        ],
      },
    ],
  },
  {
    id: "zchat",
    label: "ZChat",
    color: "#0b0b0b",
    color2: "#2e2e2e",
    pop: "#22c55e",
    stripe: "#22c55e",
    note: "Meta's WhatsApp conversation charges are billed separately at Meta's published rates.",
    plans: [
      {
        name: "Starter",
        monthly: 799,
        blurb: "A shared inbox for WhatsApp and Instagram.",
        features: [
          "WhatsApp + Instagram",
          "2 team seats",
          "Labels & quick replies",
          "Contacts sync to CRM leads",
        ],
      },
      {
        name: "Growth",
        monthly: 1999,
        popular: true,
        blurb: "All channels, an AI sales agent and broadcasts.",
        features: [
          "WhatsApp, Instagram, Messenger, Telegram",
          "5 team seats",
          "AI sales agent with your product catalogue",
          "Broadcasts & Meta templates",
          "Comment → DM automation",
          "Team reports",
        ],
      },
      {
        name: "Scale",
        monthly: 4499,
        blurb: "For busy support and sales teams.",
        features: [
          "Everything in Growth",
          "15 team seats",
          "Multiple AI agents",
          "Auto-assign & export / import",
          "Priority support",
        ],
      },
    ],
  },
  {
    id: "zshop",
    label: "ZShop",
    color: "#0b0b0b",
    color2: "#2e2e2e",
    pop: "#ff6b1a",
    stripe: "#ff6b1a",
    note: "Needs ZChat for WhatsApp delivery. Meta conversation charges are billed separately.",
    plans: [
      {
        name: "Starter",
        monthly: 1299,
        blurb: "Order updates and COD confirmation for one store.",
        features: [
          "1 store (Shopify, WooCommerce or in-house)",
          "Up to 500 orders / month",
          "WhatsApp order updates",
          "COD confirmation",
        ],
      },
      {
        name: "Growth",
        monthly: 2999,
        popular: true,
        blurb: "Win back carts and track every parcel.",
        features: [
          "Up to 3 stores",
          "Up to 3,000 orders / month",
          "3-step abandoned-cart recovery",
          "Courier tracking & delivery estimates",
          "Discounts & automations",
        ],
      },
      {
        name: "Scale",
        monthly: 6499,
        blurb: "For high-volume D2C brands.",
        features: [
          "Unlimited stores",
          "Unlimited orders (fair use)",
          "Multi-store dashboard",
          "Template approval support",
          "Dedicated manager",
        ],
      },
    ],
  },
  {
    id: "zloya",
    label: "Zloya",
    color: "#0b0b0b",
    color2: "#2e2e2e",
    pop: "#ff4d8d",
    stripe: "#ff4d8d",
    plans: [
      {
        name: "Single Outlet",
        monthly: 999,
        blurb: "Loyalty and reviews for one location.",
        features: [
          "1 outlet",
          "POS quick counter",
          "Points & 4 VIP tiers",
          "5 smart QR codes",
          "Feedback & Google review booster",
        ],
      },
      {
        name: "Growth",
        monthly: 2499,
        popular: true,
        blurb: "Memberships and automated journeys.",
        features: [
          "Up to 3 outlets",
          "Memberships & prepaid wallets",
          "Birthday, win-back & expiry journeys",
          "Staff sales leaderboard",
          "Unlimited smart QR codes",
        ],
      },
      {
        name: "Chain",
        monthly: 5999,
        blurb: "For chains and franchises.",
        features: [
          "Unlimited outlets",
          "Customers 360° across outlets",
          "Custom journeys & segments",
          "API / POS integration",
          "Dedicated manager",
        ],
      },
    ],
  },
];

export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

export function priceFor(plan: Plan, yearly: boolean) {
  if (plan.monthly === null) return null;
  return yearly ? Math.round((plan.monthly * YEARLY_MONTHS_CHARGED) / 12) : plan.monthly;
}
