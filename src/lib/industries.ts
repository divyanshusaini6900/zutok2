import type { IconName } from "@/components/ui/Icon";
import type { ProductSlug } from "@/lib/products";
import {
  bundlePlanNames,
  cheapestPlan,
  CRM_PRICES,
  crmFrom,
  crmLowest,
  crmPrices,
  crmTiers,
  describeLimits,
  formatINR,
  getGroup,
  getPlan,
  limitParts,
  ZSHOP_ZLOYA_INCLUDED,
  type PricedPlan,
  type PricingGroup,
  type PricingGroupId,
} from "@/lib/pricing";

/*
 * Industry guides at /industries/<slug>/. One page per card in the home page Industries section.
 * Every claim here restates src/lib/products.ts, src/lib/pricing.ts or the product sections. Demo names
 * (Kavya Ethnics and the rest) are mockups, so nothing below presents them as customers.
 */

export type IndustrySlug =
  | "restaurants-cafes"
  | "d2c-fashion-brands"
  | "real-estate"
  | "agencies-services"
  | "clinics-labs-salons"
  | "retail-franchises";

type GroupId = PricingGroupId;

export type IndustryPlanPick = {
  group: GroupId;
  /**
   * Plan name exactly as in src/lib/pricing.ts: a ZChat plan ("Growth"), or one of Zutok CRM's per-user prices
   * ("1 user", "3 users", "5 or more users").
   */
  plan: string;
  /** Why this plan fits the industry, from the plan's own feature list. */
  fit: string;
};

export type Industry = {
  slug: IndustrySlug;
  /** Short name for cards, breadcrumbs and links, as on the home page card. */
  name: string;
  /** One line for cards. */
  tagline: string;
  icon: IconName;
  /** Card colours from the home page Industries section; `pop` is the accent for shadows on white. */
  theme: { bg: string; fg: string; pop: string };
  title: string;
  metaDescription: string;
  keywords: string[];
  /** One heading in two parts; the second is set in the italic serif. */
  h1: [string, string];
  /** 40–70 word direct answer, shown right under the h1. */
  answer: string;
  /** Products this industry uses, in the order they are introduced. */
  uses: ProductSlug[];
  relatedProduct: ProductSlug;
  problem: { heading: string; paragraphs: string[] };
  approach: {
    heading: string;
    intro: string;
    products: { slug: ProductSlug; role: string; points: string[]; linkText: string }[];
  };
  workflow: { heading: string; intro: string; steps: { label: string; title: string; body: string }[] };
  features: { heading: string; items: { icon: IconName; title: string; body: string; product: ProductSlug }[] };
  plans: { heading: string; answer: string; picks: IndustryPlanPick[] };
  faqHeading: string;
  faqs: { q: string; a: string }[];
  related: IndustrySlug[];
};

/* ------------------------------------------------------------------ */
/* Prices come from src/lib/pricing.ts, so the copy can't drift.      */
/* ------------------------------------------------------------------ */

/** A priced plan by group and name. Throws at build time if the plan is renamed or removed. */
export function findPlan(group: GroupId, name: string): { group: PricingGroup; plan: PricedPlan } {
  return { group: getGroup(group), plan: getPlan(group, name) };
}

/** "Zutok ZChat Growth"; for Zutok CRM, which is priced per user, "Zutok CRM, 3 users". */
export function planLabel(group: GroupId, name: string): string {
  const g = findPlan(group, name).group;
  const label = g.label.startsWith("Zutok") ? g.label : `Zutok ${g.label}`;
  return g.perUser ? `${label}, ${name}` : `${label} ${name}`;
}

/**
 * A ZChat plan's monthly price, billed monthly, excluding GST: "₹2,000". ZChat only: Zutok CRM is priced per user, so
 * its copy uses the per-user helpers from src/lib/pricing.ts (crmFrom, crmLowest, crmPrices, CRM_PRICES).
 */
const inr = (group: "zchat", name: string) => `₹${formatINR(findPlan(group, name).plan.monthly)}`;

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * A ZChat pick whose "what it covers" line is built from the plan's own data in src/lib/pricing.ts, so it can't drift:
 * "500 contacts, 1 channel, 1 CRM license" for Starter, and for Growth and Scale the same allowances plus ZShop and Zloya
 * free. `lead` names the free product the guide is about, so the line opens with it. Per-plan ZChat features (AI agent,
 * broadcasts, which channels) aren't in the owner's plan data, so they are never listed here.
 */
function zchatPick(name: string, lead?: "zshop" | "zloya"): IndustryPlanPick {
  const plan = getPlan("zchat", name);
  if (!plan.limits) throw new Error(`industries.ts: ZChat ${name} has no limits`);
  const limits = limitParts(plan.limits).join(", ");
  if (!plan.includesZShopAndZloya) return { group: "zchat", plan: name, fit: capitalise(limits) };
  const fit = lead
    ? `${lead === "zshop" ? "ZShop and Zloya" : "Zloya and ZShop"} included free; ${limits}`
    : `${capitalise(limits)}, ZShop and Zloya included free`;
  return { group: "zchat", plan: name, fit };
}

/**
 * One row per Zutok CRM per-user price ("1 user", "3 users", "5 or more users"), all with the same `fit`: Zutok CRM is
 * priced per user and no module depends on the number of users, so what each row covers is the same.
 */
function crmPicks(fit: string): IndustryPlanPick[] {
  return crmTiers().map((p) => ({ group: "crm", plan: p.name, fit }));
}

/** Zutok CRM's lowest per-user price ("5 or more users"), for large teams. Always quoted with its user count. */
const largeTeam = cheapestPlan("crm");

/* ------------------------------------------------------------------ */
/* Pages                                                              */
/* ------------------------------------------------------------------ */

const restaurants: Industry = {
  slug: "restaurants-cafes",
  name: "Restaurants & cafés",
  tagline: "Points at the counter, QR on every table and delivery box, birthday journeys and guest feedback.",
  icon: "food",
  theme: { bg: "#ff6b1a", fg: "#0b0b0b", pop: "#ff6b1a" },
  title: "Restaurant CRM & Loyalty Program for Cafés in India",
  metaDescription:
    "Restaurant CRM and loyalty for Indian cafés: points at the billing counter, VIP tiers, QR sign-ups, guest feedback, win-back journeys and a WhatsApp inbox.",
  keywords: [
    "restaurant CRM India",
    "restaurant loyalty program software",
    "restaurant loyalty software",
    "CRM for cafés",
    "café loyalty program",
    "restaurant feedback system",
    "multi-outlet restaurant loyalty",
  ],
  h1: ["A CRM for Indian", "restaurants and cafés"],
  answer:
    "Zutok helps restaurants and cafés in India bring guests back. Zutok Zloya awards loyalty points at the billing counter from any browser, collects guests' phone numbers through QR codes on tables and Swiggy or Zomato boxes, and runs birthday and win-back journeys. Zutok ZChat brings WhatsApp and Instagram enquiries into one inbox. " +
    `Zloya comes free with ZChat Growth (${inr("zchat", "Growth")}/month) and Scale (${inr("zchat", "Scale")}/month), billed monthly, excluding 18% GST.`,
  uses: ["zloya", "zchat"],
  relatedProduct: "zloya",
  problem: {
    heading: "Why do restaurants and cafés need a CRM?",
    paragraphs: [
      "Most restaurants know their regulars by face, not by phone number. Dine-in guests pay and leave, delivery guests order through Swiggy and Zomato and may never visit, and questions about timings or delivery areas arrive on WhatsApp and Instagram. None of it adds up to a list of guests you can invite back.",
      "A restaurant CRM turns each bill, QR scan and chat into a guest record with a phone number, visits and a points balance. With that in place you can reward regulars, notice when someone stops coming and give them a reason to return.",
    ],
  },
  approach: {
    heading: "How does Zutok work for a restaurant?",
    intro:
      "Two Zutok products cover a restaurant's guests from the first enquiry to the tenth visit. Both feed Zutok CRM, so chats and guests end up in one place.",
    products: [
      {
        slug: "zloya",
        role: "Loyalty at the counter, on the table and after the visit.",
        points: [
          "POS quick counter: find a guest by mobile number, enter the bill and award points",
          "Bronze, Silver, Gold and Platinum tiers with 1× to 2× points",
          "Smart QR codes on table standees, Swiggy and Zomato boxes and partner stores",
          "Welcome, birthday, 30-day win-back, points-expiry and feedback journeys",
        ],
        linkText: "Zutok Zloya loyalty and memberships",
      },
      {
        slug: "zchat",
        role: "WhatsApp and Instagram enquiries in one shared inbox.",
        points: [
          "WhatsApp and Instagram in one inbox, with All, Mine and Unassigned views",
          "Labels and quick replies for the questions you get every day",
          "An AI agent that answers timings, address and delivery areas only from the facts you give it",
          "Every new chat becomes a lead in Zutok CRM",
        ],
        linkText: "Zutok ZChat WhatsApp inbox",
      },
    ],
  },
  workflow: {
    heading: "What does a day at a café look like with Zutok?",
    intro: "Here is how the pieces fit into an ordinary day of service, from the first message to the guest's next visit.",
    steps: [
      {
        label: "Before opening",
        title: "Enquiries get answered",
        body: "Messages about timings, your address or whether you deliver to an area land in the ZChat inbox. With the AI agent on, it replies from the business facts you've added and hands anything else to your staff.",
      },
      {
        label: "At the table",
        title: "Guests scan and join",
        body: "A smart QR standee on each table invites guests to share their phone number for a perk, such as bonus points. Each code shows its own scans, sign-ups and opt-in rate.",
      },
      {
        label: "At the counter",
        title: "The bill earns points",
        body: "The cashier opens the POS quick counter in a browser, looks the guest up by mobile number and enters the bill amount. Points are added at the guest's tier multiplier, and any redemption is confirmed with an OTP sent to the guest's phone.",
      },
      {
        label: "With every delivery",
        title: "Delivery guests get an invitation",
        body: "A QR code on Swiggy and Zomato boxes gives delivery guests a reason to sign up, for example an offer on their first dine-in visit. That is how a delivery order turns into a walk-in.",
      },
      {
        label: "After the visit",
        title: "Feedback comes in",
        body: "The post-visit feedback journey sends a short rating link. Guests rate food, service, ambience and cleanliness, and unhappy ratings alert you so a manager can follow up.",
      },
      {
        label: "Weeks later",
        title: "Journeys bring guests back",
        body: "Guests who haven't visited for 30 days move into the Slipping segment and get a win-back message with a coupon locked to their phone number. Birthdays get a greeting with a gift and double points.",
      },
    ],
  },
  features: {
    heading: "Which Zutok features matter most for restaurants?",
    items: [
      {
        icon: "scan",
        title: "POS quick counter",
        body: "Runs in any browser, so there is no POS integration to set up. Cashiers find guests by mobile number and award points in seconds.",
        product: "zloya",
      },
      {
        icon: "crown",
        title: "VIP tiers",
        body: "Four tiers, Bronze to Platinum, with point multipliers from 1× to 2×. Perks, for example priority table booking or a free dessert, unlock as guests spend more and visit more often.",
        product: "zloya",
      },
      {
        icon: "qr",
        title: "Smart QR codes",
        body: "For table standees, delivery boxes and partner stores. Track scans, sign-ups and opt-in rate for every code.",
        product: "zloya",
      },
      {
        icon: "wallet",
        title: "Memberships and prepaid wallets",
        body: "Sell yearly perk bundles or prepaid wallets, like pay ₹5,000 and get ₹6,000 in credit, with a staff sales leaderboard.",
        product: "zloya",
      },
      {
        icon: "pie",
        title: "Smart segments",
        body: "New, Regulars, Potential VIPs, Slipping (30 days), Lost (60+ days) and upcoming birthdays, updated automatically.",
        product: "zloya",
      },
      {
        icon: "star",
        title: "Guest feedback",
        body: "Ratings on food, service, ambience and cleanliness for each visit, so a bad evening shows up before it becomes a pattern.",
        product: "zloya",
      },
      {
        icon: "chart",
        title: "Retention analytics",
        body: "Repeat guest rate, loyalty-tracked sales and prepaid membership revenue on one dashboard.",
        product: "zloya",
      },
      {
        icon: "inbox",
        title: "WhatsApp and Instagram inbox",
        body: "One shared inbox for enquiries, with labels and quick replies, and every new chat saved as a lead.",
        product: "zchat",
      },
    ],
  },
  plans: {
    heading: "Which Zutok plan suits a restaurant or café?",
    answer:
      `Zloya isn't sold on its own. It comes free with ZChat Growth at ${inr("zchat", "Growth")}/month, which also gives you ${describeLimits("zchat", "Growth")}, and with ZChat Scale at ${inr("zchat", "Scale")}/month, which has ${describeLimits("zchat", "Scale")}. ` +
      `ZChat Starter, at ${inr("zchat", "Starter")}/month for ${describeLimits("zchat", "Starter")}, covers enquiries but doesn't include Zloya. Prices are billed monthly and exclude 18% GST.`,
    picks: [zchatPick("Growth", "zloya"), zchatPick("Scale", "zloya"), zchatPick("Starter")],
  },
  faqHeading: "Restaurant and café questions",
  faqs: [
    {
      q: "What is a restaurant CRM, and how is it different from a loyalty program?",
      a: "A restaurant CRM is the record of your guests: who they are, how often they visit and what they've earned. A loyalty program is one way to use it. In Zutok, Zloya is the loyalty layer, and guests from Zloya and chats from ZChat both land in Zutok CRM. Each guest record holds a phone number, visits and a points balance, and the same profile is shared across your outlets.",
    },
    {
      q: "How does a restaurant loyalty program work at the billing counter?",
      a: "The cashier opens Zloya's POS quick counter in a browser, looks the guest up by mobile number and enters the bill amount. Points are added automatically, at a higher rate for higher tiers. When a guest redeems, a one-time password sent to their phone confirms it.",
    },
    {
      q: "Do I need a POS integration to run loyalty in my restaurant?",
      a: "No. The POS quick counter runs in any browser, so the cashier enters the bill amount and Zloya handles the rest. If you run a chain and want your POS connected, ask about API / POS integration during your demo.",
    },
    {
      q: "How can my café collect customers' phone numbers?",
      a: "Put Zloya smart QR codes on table standees, delivery boxes and partner stores. Guests scan, share their number and get a perk. Each code shows its scans, sign-ups and opt-in rate, so you can see which placement works best.",
    },
    {
      q: "How does guest feedback work after a visit?",
      a: "The post-visit feedback journey sends guests a short rating link that takes about 30 seconds. They rate food, service, ambience and cleanliness, and low ratings alert a manager, who can follow up with that guest.",
    },
    {
      q: "How do I get more repeat customers at my restaurant?",
      a: `Notice who is drifting and give them a reason to return. Zloya moves guests into a Slipping segment after 30 days without a visit and a Lost segment after 60. The 30-day win-back journey sends them a coupon locked to their phone number, birthdays get a greeting with a gift and double points, and points-expiry reminders give regulars another reason to come in. These journeys are part of Zloya, which comes free with ZChat ${bundlePlanNames()}.`,
    },
    {
      q: "Can I run one loyalty program across several outlets?",
      a: "Yes. The same guest profile is shared across every outlet, so a regular is recognised at each branch.",
    },
  ],
  related: ["clinics-labs-salons", "retail-franchises", "d2c-fashion-brands"],
};

const d2c: Industry = {
  slug: "d2c-fashion-brands",
  name: "D2C & fashion brands",
  tagline: "WhatsApp order updates, COD confirmation, cart recovery and an AI that answers “is it in stock?”",
  icon: "bag",
  theme: { bg: "#ff4d8d", fg: "#0b0b0b", pop: "#ff4d8d" },
  title: "WhatsApp & Instagram Automation for D2C Fashion Brands",
  metaDescription:
    "For D2C and fashion brands: WhatsApp order updates, COD confirmation, cart recovery, an AI agent for stock and price questions, and buyers saved to your CRM.",
  keywords: [
    "WhatsApp automation for D2C brands",
    "D2C CRM India",
    "ecommerce CRM India",
    "Shopify CRM India",
    "fashion brand WhatsApp order updates",
    "Instagram DM selling for fashion brands",
    "COD confirmation for D2C",
    "AI chatbot for stock and price questions",
  ],
  h1: ["WhatsApp automation for", "D2C and fashion brands"],
  answer:
    "Zutok gives Indian D2C and fashion brands one system for the whole sale. Zutok ZChat answers price and availability questions on WhatsApp and Instagram with an AI agent that quotes from your catalogue, and Zutok ZShop confirms COD orders, recovers abandoned carts and sends order updates for Shopify, WooCommerce or in-house stores. " +
    `ZShop comes free with ZChat Growth (${inr("zchat", "Growth")}/month) and Scale (${inr("zchat", "Scale")}/month), billed monthly, excluding 18% GST.`,
  uses: ["zshop", "zchat"],
  relatedProduct: "zshop",
  problem: {
    heading: "Where do D2C brands lose sales on WhatsApp and Instagram?",
    paragraphs: [
      "A D2C sale in India often starts with a comment or DM asking for the price, moves to WhatsApp, and ends in a cash-on-delivery order that still has to be confirmed, packed, shipped and tracked. Each step tends to live in a different app, and each gap costs something: DMs nobody answered, carts left behind, COD parcels shipped to buyers who were never sure.",
      "Fashion brands feel it most, because buyers want to know the colour, size and price before they commit, and they expect the answer in the same chat.",
    ],
  },
  approach: {
    heading: "How does Zutok connect pre-sale chats to delivered orders?",
    intro:
      "ZChat handles the conversation before the order and ZShop handles everything after it. ZShop sends its WhatsApp messages from your ZChat number, so when a buyer replies to an order update, the reply lands in the inbox your team already works in.",
    products: [
      {
        slug: "zchat",
        role: "Before the order: answer, quote and sell in chat.",
        points: [
          "An AI sales agent that asks each choice as a numbered list and quotes the price and order link from the one matching row",
          "Comment → DM: a public reply and a private DM for everyone who comments on a post or reel",
          "Broadcasts of Meta-approved templates with images, video and buttons",
          "WhatsApp, Instagram, Messenger and Telegram in one shared inbox",
        ],
        linkText: "Zutok ZChat AI sales agent",
      },
      {
        slug: "zshop",
        role: "After the order: confirm, update and recover.",
        points: [
          "Connect Shopify through a custom app, WooCommerce or any platform with an API, or an in-house shop",
          "COD confirmation with automatic reminders and tags for confirmed orders",
          "Three abandoned-cart reminders, after one hour, one day and three days",
          "Placed, packed, shipped and delivered updates, plus courier tracking",
        ],
        linkText: "Zutok ZShop for Shopify and WooCommerce",
      },
    ],
  },
  workflow: {
    heading: "How does one order run from Instagram comment to doorstep?",
    intro: "This walk-through follows a single saree order. The products and prices are examples, not a customer's data.",
    steps: [
      {
        label: "Comment",
        title: "A reel gets a “price?” comment",
        body: "ZChat replies publicly and sends the commenter a private DM with the price. You set the rule once, to trigger on keywords or on any comment.",
      },
      {
        label: "Chat",
        title: "The AI answers the questions",
        body: "The buyer asks whether the maroon Banarasi silk is available. The AI offers the colours as a numbered list, then replies with the price and order link from the matching catalogue row. With handoff on, a buyer who asks for a person moves to your team with the whole history.",
      },
      {
        label: "Order",
        title: "The order comes in from your store",
        body: "Whether it was placed on Shopify, WooCommerce or taken in-house, the order arrives in ZShop and the buyer becomes a CRM lead, matched on phone number only.",
      },
      {
        label: "COD",
        title: "COD is confirmed before you ship",
        body: "ZShop asks the buyer to confirm the cash-on-delivery order on WhatsApp, reminds them if they don't reply and tags confirmed orders. Nothing is cancelled unless you switch on auto-cancel.",
      },
      {
        label: "Shipping",
        title: "Updates follow the parcel",
        body: "Packed, shipped, out-for-delivery and delivered messages go out on their own. ZShop checks courier status and learns your real delivery times, so the shipped message can say something like “usually 3–5 days”.",
      },
      {
        label: "Carts",
        title: "Abandoned carts get three reminders",
        body: "Buyers who leave without paying get a reminder after one hour, one day and three days. The first reminder carries no discount, and you choose the discount on the second and third.",
      },
    ],
  },
  features: {
    heading: "Which features do D2C and fashion brands use most?",
    items: [
      {
        icon: "bot",
        title: "AI sales agent with your catalogue",
        body: "Add products with your own columns, like colour, size, price and order link. The AI only quotes from the row that matches the buyer's choices, so it never makes up a price.",
        product: "zchat",
      },
      {
        icon: "layers",
        title: "Your own columns",
        body: "Set a column as information, for example availability or fabric, and the AI shares it with the price or when asked. A file column sends a real PDF or video.",
        product: "zchat",
      },
      {
        icon: "comment",
        title: "Comment → DM",
        body: "Turn “price?” comments on Instagram and Facebook posts and reels into private DMs, with an activity log for every auto-reply.",
        product: "zchat",
      },
      {
        icon: "megaphone",
        title: "Broadcasts",
        body: "Send Meta-approved templates with text, images, PDFs, video and buttons to leads, contacts or a custom audience, and follow sent, delivered and read numbers.",
        product: "zchat",
      },
      {
        icon: "receipt",
        title: "COD confirmation",
        body: "Confirm, remind and tag cash-on-delivery orders on WhatsApp before anything ships.",
        product: "zshop",
      },
      {
        icon: "cart",
        title: "Abandoned-cart recovery",
        body: "Three reminders, after one hour, one day and three days, with discounts you set on the second and third.",
        product: "zshop",
      },
      {
        icon: "truck",
        title: "Courier tracking",
        body: "Out-for-delivery, delivered and failed-attempt updates, with delivery estimates learned from your own deliveries.",
        product: "zshop",
      },
      {
        icon: "moon",
        title: "Quiet hours and one do-not-contact list",
        body: "Promotions respect quiet hours and a daily limit while order updates always go out. A “stop contacting me” applies on every channel.",
        product: "zshop",
      },
    ],
  },
  plans: {
    heading: "What does Zutok cost for a D2C brand?",
    answer:
      `ZShop sends its WhatsApp messages through ZChat, and it isn't sold on its own: it comes free with ZChat Growth at ${inr("zchat", "Growth")}/month (${describeLimits("zchat", "Growth")}) ` +
      `and ZChat Scale at ${inr("zchat", "Scale")}/month (${describeLimits("zchat", "Scale")}). So one plan covers both the chats and the store automation. Prices are billed monthly and exclude 18% GST.`,
    picks: [zchatPick("Growth", "zshop"), zchatPick("Scale", "zshop")],
  },
  faqHeading: "D2C brand questions",
  faqs: [
    {
      q: "How can a D2C brand automate WhatsApp order updates and COD confirmation?",
      a: "Connect your store to Zutok ZShop and map your Meta templates once. ZShop then sends placed, packed, shipped and delivered updates from your ZChat number, asks COD buyers to confirm, reminds them automatically and tags confirmed orders.",
    },
    {
      q: "Can an AI agent answer “is it in stock?” and price questions on WhatsApp and Instagram?",
      a: "Yes, from the catalogue you give it, on WhatsApp, Instagram, Messenger and Telegram. ZChat's AI only offers options that exist in your rows and quotes the price and order link from the row that matches. Add availability as an information column and it answers that too. Nothing is guessed.",
    },
    {
      q: "How do fashion brands turn Instagram comments into sales chats?",
      a: "With ZChat's comment → DM automation. Set a rule on keywords like “price” or on any comment, and ZChat replies publicly and sends a private DM with the details. The conversation then continues in the shared inbox.",
    },
    {
      q: "What happens if an item sells out?",
      a: "Update the catalogue. ZChat's AI answers only from the rows and information columns you fill in, so change the availability column or the row, or re-import the sheet, and it answers from that. It doesn't sync live stock from your store.",
    },
    {
      q: "Does it work with both Shopify and WooCommerce stores?",
      a: "Yes. Shopify connects through a custom app with 32 webhook topics synced, WooCommerce or any platform with an API connects too, and an in-house shop works with items kept in the CRM. Every feature works the same on all three.",
    },
    {
      q: "Where do my Shopify and WooCommerce orders and buyers end up?",
      a: "In Zutok CRM. ZShop brings every order in, and every buyer becomes a CRM lead, matched on phone number only, and is saved to the CRM on delivery. Chats from ZChat become leads too, with their source, and you can import customers and leads from Excel or CSV and export them to CSV.",
    },
    {
      q: "How does Zutok avoid duplicate or mixed-up customers?",
      a: "ZShop matches every buyer to a CRM lead on phone number only, never on name, so two shoppers with the same name are never mixed up.",
    },
    {
      q: "Which plan suits a high-volume D2C brand?",
      a: `ZChat Scale, at ${inr("zchat", "Scale")}/month excluding GST. It has ${describeLimits("zchat", "Scale")}, with ZShop and Zloya included free.`,
    },
  ],
  related: ["retail-franchises", "restaurants-cafes", "agencies-services"],
};

const realEstate: Industry = {
  slug: "real-estate",
  name: "Real estate",
  tagline: "Properties, owners, brokers, buy and rent requests, and site-visit leads from Meta ads.",
  icon: "home",
  theme: { bg: "#22c55e", fg: "#0b0b0b", pop: "#22c55e" },
  title: "Real Estate CRM for Brokers, Agents & Rentals in India",
  metaDescription:
    "Real estate CRM for brokers and property managers: properties, owners, buy and rent requests, tenants with renewal reminders, and Meta ad and WhatsApp leads.",
  keywords: [
    "real estate CRM India",
    "property CRM for brokers",
    "property dealer software India",
    "real estate lead management",
    "rental and tenant management CRM",
    "buyer and renter requirement tracking",
    "real estate WhatsApp leads",
  ],
  h1: ["Real estate CRM for Indian", "brokers and property managers"],
  answer:
    "Zutok CRM is a real estate CRM for Indian brokers, agents and property managers. Its Real Estate suite keeps properties, owners, agents, brokers, buy and rent requests and tenants in one place, while leads from Meta Lead Ads and Zutok ZChat's WhatsApp inbox enter one pipeline. " +
    `The suite is part of Zutok CRM, at ${crmFrom()} billed monthly, excluding 18% GST.`,
  uses: ["crm", "zchat"],
  relatedProduct: "crm",
  problem: {
    heading: "Why do property businesses outgrow spreadsheets and WhatsApp groups?",
    paragraphs: [
      "Property work has more moving parts than an ordinary sales pipeline. A broker tracks listings and the owners behind them, buyers and renters with different requirements, other brokers they work with, and tenants once a deal closes. Most of that ends up split across spreadsheets, WhatsApp groups and personal phone contacts.",
      "A real estate CRM keeps those records together and connects them to the enquiries coming in from ads and chats, so nobody on the team has to ask who is handling a lead or which property it was about.",
    ],
  },
  approach: {
    heading: "How does Zutok handle listings, enquiries and tenants?",
    intro:
      "The Real Estate suite in Zutok CRM holds the property side of the business, and ZChat brings the conversations in. Both sit in the same Zutok account, and every new chat becomes a CRM lead with its source. It's made for brokers, agents, property dealers and property managers, not for builders managing unit inventory, bookings and payment plans.",
    products: [
      {
        slug: "crm",
        role: "Property records and one lead pipeline.",
        points: [
          "Real Estate suite: properties and approvals, owners, agents, brokers, buy and rent requests, tenants and reports",
          "Meta Lead Ads and IndiaMART leads flow into Enquiry → Follow-up → Hot → Customer",
          "Tasks and reminders on every lead",
          "Customer contracts that remind you before renewal",
        ],
        linkText: "Zutok CRM and its Real Estate suite",
      },
      {
        slug: "zchat",
        role: "Enquiries on WhatsApp, Instagram, Messenger and Telegram.",
        points: [
          "One shared inbox for every channel, with Open, Pending and Resolved status",
          "An AI agent that sends the real brochure, price list, PDF or video from a catalogue row",
          "Office hours, address and other business facts answered only from what you provide",
          "Comment → DM on Instagram and Facebook posts and reels",
        ],
        linkText: "Zutok ZChat WhatsApp inbox and AI agent",
      },
    ],
  },
  workflow: {
    heading: "How does a property enquiry move through Zutok?",
    intro: "A typical path for one enquiry, from the first ad or message to a closed deal or a new tenant.",
    steps: [
      {
        label: "Ad",
        title: "A Meta lead form comes in",
        body: "Someone fills in your Meta Lead Ads form asking for a site visit. The lead lands in the Enquiry stage with its source and mapped fields, with no copying from a spreadsheet.",
      },
      {
        label: "Chat",
        title: "Another buyer writes on WhatsApp",
        body: "If you've added your projects to ZChat's catalogue, the AI answers from them and sends the brochure or price list file. Otherwise your team replies from the shared inbox. Either way, the chat becomes a lead.",
      },
      {
        label: "Request",
        title: "The requirement is recorded",
        body: "What the buyer or renter is looking for is saved as a buy or rent request in the Real Estate suite, alongside the properties, owners and brokers you work with.",
      },
      {
        label: "Follow-up",
        title: "The team follows up",
        body: "Tasks and reminders on the lead keep call-backs and site visits from slipping. As interest firms up, the lead moves from Enquiry to Follow-up, then Hot.",
      },
      {
        label: "Close",
        title: "The deal closes",
        body: "The lead becomes a customer. For a rental, the tenant is added in the Real Estate suite, and a contract with a renewal reminder keeps you ahead of the next renewal.",
      },
      {
        label: "Review",
        title: "You see the whole picture",
        body: "Real estate and lead reports show what is moving, and role-based permissions keep each agent to the records they need.",
      },
    ],
  },
  features: {
    heading: "Which Zutok features matter for brokers and property managers?",
    items: [
      {
        icon: "home",
        title: "Real Estate suite",
        body: "Properties and approvals, owners, agents, brokers, buy and rent requests, and tenants, with reports.",
        product: "crm",
      },
      {
        icon: "users",
        title: "One lead pipeline",
        body: "Leads from chats, Meta Lead Ads, IndiaMART and estimate requests move from Enquiry to Follow-up, Hot and Customer.",
        product: "crm",
      },
      {
        icon: "layers",
        title: "Custom fields",
        body: "Zutok CRM has custom fields for every module, so you can record the details your listings need.",
        product: "crm",
      },
      {
        icon: "building",
        title: "Customers and contracts",
        body: "Every customer with their contacts and history on one profile, plus contracts that remind you before renewal.",
        product: "crm",
      },
      {
        icon: "file",
        title: "Brochures on request",
        body: "Add a file column to a catalogue row and ZChat's AI sends the real brochure, price list, PDF or video.",
        product: "zchat",
      },
      {
        icon: "comment",
        title: "Comment → DM for listing reels",
        body: "Reply to comments on property posts and reels and send each commenter a private DM.",
        product: "zchat",
      },
      {
        icon: "megaphone",
        title: "Broadcasts",
        body: "Send Meta-approved templates to leads, contacts or a custom list and follow sent, delivered and read numbers.",
        product: "zchat",
      },
      {
        icon: "usercog",
        title: "Roles and permissions",
        body: "Each staff member gets a role with its own permissions, so agents, accounts and admins see only what they need.",
        product: "crm",
      },
    ],
  },
  plans: {
    heading: "How much does Zutok cost for a real estate business?",
    answer:
      `The Real Estate suite is part of Zutok CRM, which is priced per user: ${crmPrices()}, excluding 18% GST. ` +
      `For WhatsApp and Instagram enquiries, add a ZChat plan sized by the contacts and channels you need: Starter (${inr("zchat", "Starter")}/month) includes ${describeLimits("zchat", "Starter")}, and Growth (${inr("zchat", "Growth")}/month) ${describeLimits("zchat", "Growth")}.`,
    picks: [...crmPicks("Real Estate suite and every other Zutok CRM module"), zchatPick("Starter"), zchatPick("Growth")],
  },
  faqHeading: "Real estate CRM questions",
  faqs: [
    {
      q: "What is a real estate CRM, and how is it different from a generic CRM?",
      a: "A real estate CRM adds the records property work needs on top of an ordinary lead pipeline. Zutok CRM's Real Estate suite adds properties and approvals, owners, agents, brokers, buy and rent requests, tenants and real estate reports, while leads still move from Enquiry to Follow-up, Hot and Customer.",
    },
    {
      q: "Can property enquiries from Meta ads and WhatsApp go into one CRM?",
      a: "Yes. Meta Lead Ads leads sync into Zutok CRM, and with ZChat every new WhatsApp or Instagram chat creates a lead with its source. Both enter the same Enquiry → Follow-up → Hot → Customer pipeline.",
    },
    {
      q: "How do brokers track what buyers and renters are looking for?",
      a: "Save each requirement as a buy or rent request in the Real Estate suite, next to the properties, owners and brokers you work with. Zutok CRM also lets you add custom fields for the details your requests need.",
    },
    {
      q: "Can Zutok remind me before a rental agreement is due for renewal?",
      a: "Yes. When a rental closes, add the tenant in the Real Estate suite and keep their contract on file, and the contract reminds you before it's due for renewal. That helps with the 11-month agreements common in Indian rentals.",
    },
    {
      q: "Is it a tenant or PG management app?",
      a: "No. Zutok keeps tenants and their contracts as records next to your leads and properties, but it isn't built for rent collection, tenant KYC, maintenance requests or a tenant portal.",
    },
    {
      q: "Which lead sources does it support?",
      a: "Meta Lead Ads, IndiaMART, website estimate requests, chats from ZChat and imports from Excel or CSV. It has no 99acres, MagicBricks or Housing.com integration.",
    },
    {
      q: "Can the WhatsApp AI send a property brochure to an enquirer?",
      a: `Yes. In ZChat, add a file column to your catalogue and attach the brochure, price list, PDF or video to the right row. When the AI quotes from that row, the customer gets the real file. The AI agent is part of Zutok ZChat, with plans from ${inr("zchat", "Starter")}/month.`,
    },
    {
      q: "How much does a real estate CRM cost with Zutok?",
      a: `The Real Estate suite is part of Zutok CRM, priced per user (one CRM license is one user). ${CRM_PRICES}, excluding 18% GST. ZChat is optional for WhatsApp and Instagram enquiries, and Meta's WhatsApp charges are billed separately.`,
    },
  ],
  related: ["agencies-services", "retail-franchises", "clinics-labs-salons"],
};

const agencies: Industry = {
  slug: "agencies-services",
  name: "Agencies & services",
  tagline: "Proposals, GST invoices, projects, timesheets and a shared inbox for every client.",
  icon: "briefcase",
  theme: { bg: "#6c2bd9", fg: "#ffffff", pop: "#a78bfa" },
  title: "CRM for Agencies: Projects, Timesheets & GST Invoices",
  metaDescription:
    "For agencies and service businesses: proposals, GST invoices, projects, timesheets, meeting notes and a shared WhatsApp inbox for every client in one CRM.",
  keywords: [
    "CRM for agencies India",
    "CRM with project management",
    "project and timesheet software",
    "client project tracking software",
    "agency CRM with GST invoicing",
    "client proposal software",
    "client WhatsApp inbox",
  ],
  h1: ["CRM for agencies and", "service businesses in India"],
  answer:
    "Zutok CRM is a CRM for Indian agencies, consultancies and service firms that runs the whole client cycle: leads, proposals, projects with tasks and timesheets, GST invoices and payments, then support tickets. Zutok ZChat adds a shared WhatsApp and Instagram inbox for client conversations. " +
    `Zutok CRM costs ${crmFrom()} billed monthly (${crmLowest()}), excluding 18% GST.`,
  uses: ["crm", "zchat"],
  relatedProduct: "crm",
  problem: {
    heading: "Why do agencies lose track between the proposal and the payment?",
    paragraphs: [
      "In many agencies the proposal lives in a document, the project in a task tool, hours in a spreadsheet, the invoice in accounting software and the client's messages on someone's personal WhatsApp. When a client asks what they were billed for, or a project runs over, the answer is spread across five places.",
      "A CRM built for service work keeps every step attached to the client: what you proposed, what you are delivering, how long it took, and what has been invoiced and paid.",
    ],
  },
  approach: {
    heading: "How does Zutok run an agency from proposal to payment?",
    intro: "Zutok CRM covers the work itself and ZChat covers the conversations around it. Both live in the same Zutok account.",
    products: [
      {
        slug: "crm",
        role: "Sell, deliver and bill.",
        points: [
          "Proposals and estimates, including estimate requests from your website",
          "Projects with milestones, tasks, timesheets and meeting notes, linked to the client",
          "GST invoices with tax fields, recurring invoices, payments and credit notes",
          "Support tickets, a knowledge base and surveys after delivery",
        ],
        linkText: "Zutok CRM with GST invoicing and projects",
      },
      {
        slug: "zchat",
        role: "Client conversations in one shared inbox.",
        points: [
          "WhatsApp, Instagram, Messenger and Telegram, with All, Mine and Unassigned views",
          "Open, Pending and Resolved status, so no client waits unnoticed",
          "Labels and quick replies for repeat questions",
          "Every new chat creates a CRM lead with its source",
        ],
        linkText: "Zutok ZChat shared team inbox",
      },
    ],
  },
  workflow: {
    heading: "What does the client workflow look like, step by step?",
    intro: "Here is one client's path through Zutok, from first enquiry to after-sales support.",
    steps: [
      {
        label: "Lead",
        title: "An enquiry arrives",
        body: "A prospect sends an estimate request from your website, comes in through Meta Lead Ads or IndiaMART, or messages you on WhatsApp. Each one becomes a lead in the Enquiry stage.",
      },
      {
        label: "Proposal",
        title: "You send a proposal",
        body: "Send a proposal or estimate from the CRM. When the client accepts it, turn it into an invoice.",
      },
      {
        label: "Project",
        title: "The project is set up",
        body: "Create the project with milestones and tasks, assign the tasks to your team and keep meeting notes on it, all linked to the client.",
      },
      {
        label: "Time",
        title: "Hours are logged",
        body: "The team records its hours in timesheets, and timesheet reports show where the time went.",
      },
      {
        label: "Billing",
        title: "The GST invoice goes out",
        body: "The invoice carries tax fields such as CGST and SGST. Record the payment when it arrives. Recurring invoices suit retainers, and overdue reminders chase late payments.",
      },
      {
        label: "After launch",
        title: "Support continues",
        body: "Follow-up requests come in as support tickets on the client's profile, and the client's contract reminds you before it is due for renewal.",
      },
    ],
  },
  features: {
    heading: "Which Zutok features fit agency work best?",
    items: [
      {
        icon: "file",
        title: "Proposals and estimates",
        body: "Send proposals and estimates, collect estimate requests from your website and turn accepted ones into invoices.",
        product: "crm",
      },
      {
        icon: "receipt",
        title: "GST invoices and payments",
        body: "Invoices in rupees with tax fields, recurring invoices, payments, credit notes and bulk PDF export for your accountant.",
        product: "crm",
      },
      {
        icon: "briefcase",
        title: "Projects and timesheets",
        body: "Milestones, tasks, timesheets and meeting notes, all linked to the client they belong to.",
        product: "crm",
      },
      {
        icon: "building",
        title: "Client profiles and contracts",
        body: "Contacts, invoices, projects and tickets on one profile, plus contracts that remind you before renewal.",
        product: "crm",
      },
      {
        icon: "wallet",
        title: "Subscriptions and expenses",
        body: "Recurring billing, expense tracking and an expenses vs income view.",
        product: "crm",
      },
      {
        icon: "support",
        title: "Support and knowledge base",
        body: "Tickets, a knowledge base and surveys that keep clients happy after delivery.",
        product: "crm",
      },
      {
        icon: "chart",
        title: "Reports and goals",
        body: "Reports on sales, leads and timesheets, plus company goals.",
        product: "crm",
      },
      {
        icon: "inbox",
        title: "Shared client inbox",
        body: "Client chats from WhatsApp and Instagram in one inbox, with labels, statuses and team reports.",
        product: "zchat",
      },
    ],
  },
  plans: {
    heading: "What does Zutok cost for an agency's team?",
    answer:
      `Zutok CRM is priced per user, so the cost follows your team size: ${crmPrices()}, excluding 18% GST. ` +
      "No module depends on the number of users: proposals, estimates, GST invoices, projects and timesheets, contracts, expenses, subscriptions, HRM and reports are all part of Zutok CRM.",
    picks: [
      ...crmPicks("Proposals, GST invoices, projects, timesheets, HRM and reports"),
      zchatPick("Starter"),
      zchatPick("Growth"),
    ],
  },
  faqHeading: "Agency CRM questions",
  faqs: [
    {
      q: "What CRM features does a digital agency need?",
      a: "At the least: a lead pipeline, proposals, projects with tasks and timesheets, GST invoicing with payment tracking, and a client profile that ties them together. Zutok CRM has all of these, plus contracts, support tickets and reports on sales, leads and timesheets.",
    },
    {
      q: "Can I go from proposal to GST invoice to payment in one tool?",
      a: "Yes. Send a proposal or estimate in Zutok CRM, turn it into a GST invoice once it is accepted and record the payment. Recurring invoices and credit notes are built in, and you can export invoices in bulk as PDF.",
    },
    {
      q: "Can I track project timesheets for each client?",
      a: "Yes. Projects hold milestones, tasks, timesheets and meeting notes, and each project is linked to the customer it belongs to. Reports, including timesheet reports, are part of Zutok CRM too.",
    },
    {
      q: "Is a CRM project module different from a separate project tool?",
      a: "Yes, mostly in where it lives. In Zutok CRM, projects sit on the same customer profile as proposals, GST invoices, payments, tickets and contracts, with milestones, tasks, timesheets and meeting notes, so there's no second tool to keep in sync. It covers those essentials rather than everything a specialist project tool does.",
    },
    {
      q: "Are project timesheets the same as staff attendance?",
      a: "No. Project timesheets log hours against client projects, and timesheet reports show where the time went. Attendance and leave are separate HR modules in Zutok CRM.",
    },
    {
      q: "What happens after a project launches?",
      a: "Follow-up requests come in as support tickets on the client's profile, and the client's contract reminds you before it's due for renewal.",
    },
    {
      q: "Can each client's WhatsApp chats sit next to their projects and invoices?",
      a: "They live in the same Zutok account. ZChat keeps client chats in a shared inbox and creates a CRM lead for every new chat, with its source. The client's invoices, projects and tickets sit on their customer profile in Zutok CRM.",
    },
    {
      q: "What does Zutok CRM cost for a large agency team?",
      a: `With ${largeTeam.name}, Zutok CRM costs ₹${formatINR(largeTeam.monthly)} per user per month billed monthly, or ₹${formatINR(largeTeam.yearly.perMonth)} per user per month billed yearly (₹${formatINR(largeTeam.yearly.total)} per user per year), excluding 18% GST. Every module is part of Zutok CRM whatever the number of users, and each staff member gets a role with its own permissions.`,
    },
  ],
  related: ["real-estate", "retail-franchises", "d2c-fashion-brands"],
};

const clinics: Industry = {
  slug: "clinics-labs-salons",
  name: "Clinics, labs & salons",
  tagline: "Appointment chats, test price lists the AI can quote, memberships and repeat-visit reminders.",
  icon: "clinic",
  theme: { bg: "#2563eb", fg: "#ffffff", pop: "#2563eb" },
  title: "WhatsApp AI & Memberships for Clinics, Labs and Salons",
  metaDescription:
    "Answer appointment chats on WhatsApp, let the AI quote your test or service price list, sell memberships and send repeat-visit reminders with Zutok.",
  keywords: [
    "WhatsApp automation for clinics and salons",
    "WhatsApp for clinics India",
    "diagnostic lab WhatsApp price list",
    "salon membership software India",
    "salon loyalty program India",
    "repeat visit reminders for salons",
    "clinic WhatsApp inbox",
  ],
  h1: ["WhatsApp automation for", "clinics, labs and salons"],
  answer:
    "Zutok helps clinics, diagnostic labs and salons in India handle WhatsApp enquiries. Zutok ZChat puts appointment and price chats in one shared inbox, and its AI agent quotes test or service prices only from the price list you add. Salons can add Zutok Zloya for memberships, prepaid wallets and repeat-visit reminders. " +
    `ZChat starts at ${inr("zchat", "Starter")}/month, and Zloya comes free with ZChat Growth (${inr("zchat", "Growth")}/month) and Scale (${inr("zchat", "Scale")}/month), billed monthly, excluding 18% GST.`,
  uses: ["zchat", "zloya"],
  relatedProduct: "zchat",
  problem: {
    heading: "Why do clinics, labs and salons struggle with WhatsApp enquiries?",
    paragraphs: [
      "Patients and clients ask the same few things again and again: what does this test or service cost, what are your timings, where are you, can I come in today. The answers are simple, but they arrive all day on the front desk's phone, often while staff are busy with the person in front of them.",
      "Quoting from memory brings its own problems. A wrong price on WhatsApp is awkward to take back, and a slow reply sends the enquiry to the next clinic or salon on the list.",
    ],
  },
  approach: {
    heading: "How does Zutok answer price and appointment enquiries accurately?",
    intro:
      "ZChat answers the questions around an appointment, and your staff confirm the slot in the same chat. The AI is meant for prices, timings and directions, not medical advice: anything outside its instructions goes to your team. Zloya then handles memberships and repeat visits, mainly for salons.",
    products: [
      {
        slug: "zchat",
        role: "Enquiries, price quotes and handoff to staff.",
        points: [
          "WhatsApp, Instagram, Messenger and Telegram in one shared inbox",
          "An AI agent that quotes only from the row matching the customer's choices",
          "File columns that send your real price list PDF",
          "Handoff to staff, with the whole chat history, whenever a customer asks for a person",
        ],
        linkText: "Zutok ZChat AI agent for WhatsApp",
      },
      {
        slug: "zloya",
        role: "Memberships and repeat visits.",
        points: [
          "Yearly perk bundles and prepaid wallets, sold at the counter",
          "Points and Bronze to Platinum VIP tiers",
          "Slipping (30 days) and Lost (60+ days) segments, updated automatically",
          "Win-back, birthday and points-expiry journeys with coupons locked to the client's phone number",
        ],
        linkText: "Zutok Zloya memberships and loyalty",
      },
    ],
  },
  workflow: {
    heading: "How does a day at the front desk change with Zutok?",
    intro: "A walk-through for a lab and a salon. The tests, services and prices are whatever you add; Zutok doesn't supply them.",
    steps: [
      {
        label: "Morning",
        title: "Overnight questions are already answered",
        body: "Questions that came in after hours, like timings and address, were answered by the AI from your business facts. Anything it couldn't answer is waiting in the inbox for your team.",
      },
      {
        label: "Price check",
        title: "A patient asks what a test costs",
        body: "The AI asks which test or package they mean, as a numbered list, then quotes the price from the matching row of your list. If you've attached the full price list as a file, it sends that PDF too.",
      },
      {
        label: "Appointment",
        title: "Staff confirm the slot",
        body: "Keep slot booking with your team. The AI hands the chat over and staff confirm the time in the same conversation, using labels and quick replies for the questions they answer every day.",
      },
      {
        label: "At the counter",
        title: "A salon client takes a membership",
        body: "At billing, staff sell a yearly perk bundle or a prepaid wallet, for example pay ₹5,000 and get ₹6,000 in credit. A staff leaderboard shows who sold the most.",
      },
      {
        label: "Weeks later",
        title: "Repeat-visit reminders go out",
        body: "Clients who haven't returned in 30 days move into the Slipping segment, and the win-back journey sends them a coupon locked to their phone number.",
      },
      {
        label: "Every day",
        title: "You see how the desk is doing",
        body: "ZChat team reports show conversations, resolution rate, average resolution time and the load on each channel and each person.",
      },
    ],
  },
  features: {
    heading: "Which Zutok features fit clinics, labs and salons?",
    items: [
      {
        icon: "bot",
        title: "AI that quotes your price list",
        body: "The AI asks each choice and quotes only from the row that matches, so it never makes up a price.",
        product: "zchat",
      },
      {
        icon: "layers",
        title: "Your own columns",
        body: "Name columns for what you offer, like test, package or service, and add a file column for the full price list PDF.",
        product: "zchat",
      },
      {
        icon: "file",
        title: "Business knowledge",
        body: "Timings, address and payment policy, answered only from the facts you give the AI. It never guesses.",
        product: "zchat",
      },
      {
        icon: "users",
        title: "Human handoff",
        body: "With handoff on, when a client asks for a person, the chat moves to your team in the same inbox, with the whole history.",
        product: "zchat",
      },
      {
        icon: "tags",
        title: "Labels and quick replies",
        body: "Tag conversations and answer everyday questions, like timings or directions, with saved replies.",
        product: "zchat",
      },
      {
        icon: "wallet",
        title: "Memberships and prepaid wallets",
        body: "Sell yearly perk bundles or prepaid wallets at the counter, with a staff sales leaderboard.",
        product: "zloya",
      },
      {
        icon: "pie",
        title: "Smart segments",
        body: "Slipping (30 days), Lost (60+ days) and upcoming birthdays, updated automatically.",
        product: "zloya",
      },
      {
        icon: "repeat",
        title: "Automated journeys",
        body: "Welcome, birthday, 30-day win-back and points-expiry messages, each with a coupon locked to the client's phone number.",
        product: "zloya",
      },
    ],
  },
  plans: {
    heading: "What does Zutok cost for a clinic, lab or salon?",
    answer:
      `The shared inbox and the AI agent that quotes your price list are part of Zutok ZChat. ZChat Starter costs ${inr("zchat", "Starter")}/month for ${describeLimits("zchat", "Starter")}. ` +
      `Salons that want Zloya's memberships, prepaid wallets and win-back journeys can choose ZChat Growth (${inr("zchat", "Growth")}/month) or Scale (${inr("zchat", "Scale")}/month), which include Zloya free. Prices are billed monthly and exclude 18% GST.`,
    picks: [zchatPick("Starter"), zchatPick("Growth", "zloya"), zchatPick("Scale", "zloya")],
  },
  faqHeading: "Clinic, lab and salon questions",
  faqs: [
    {
      q: "Can a WhatsApp AI agent quote my lab test or salon service prices accurately?",
      a: "Yes, as long as the prices are in your catalogue. ZChat's AI asks the customer each choice and quotes only from the row that matches all of them, so it never makes up a price. It can also send your full price list as a PDF.",
    },
    {
      q: "How can a clinic or salon handle appointment enquiries on WhatsApp?",
      a: "Bring them into ZChat's shared inbox, where staff see All, Mine and Unassigned chats and mark each one Open, Pending or Resolved. The AI can answer timings and location, then hand the chat to staff to confirm the slot.",
    },
    {
      q: "Can a salon sell memberships and prepaid packages?",
      a: `Yes, with Zutok Zloya. Sell yearly perk bundles or prepaid wallets at the counter, like pay ₹5,000 and get ₹6,000 in credit, and track staff sales on a leaderboard. Zloya comes free with ZChat ${bundlePlanNames()}.`,
    },
    {
      q: "Is the WhatsApp Business app enough for a clinic's front desk?",
      a: "For a busy desk, ZChat runs on the official WhatsApp Business Platform instead, with a shared inbox for your team, the AI agent and Meta-approved templates. Free-form replies are allowed within 24 hours of the patient's last message, and later messages go out as approved templates. Zutok helps you set up and verify the number.",
    },
    {
      q: "What happens when a patient asks a medical question?",
      a: "The AI answers only from the facts you give it, so keep those to prices, timings, directions and similar business details. A clinical question falls outside its instructions and goes to your staff through handoff, with the whole chat history, and staff also confirm appointment slots.",
    },
    {
      q: "How do I win back salon clients who stopped coming?",
      a: `Zloya flags clients who haven't visited for 30 days as Slipping, and the 30-day win-back journey sends them a coupon locked to their phone number. Birthday messages add another reason to return. Zloya comes free with ZChat ${bundlePlanNames()}.`,
    },
    {
      q: "How can a salon track prepaid credits and membership revenue?",
      a: "Zloya's retention dashboard shows prepaid membership revenue next to your repeat guest rate and loyalty-tracked sales, and the staff leaderboard shows how many memberships each person has sold.",
    },
  ],
  related: ["restaurants-cafes", "retail-franchises", "agencies-services"],
};

const retail: Industry = {
  slug: "retail-franchises",
  name: "Retail & franchises",
  tagline: "Inventory, staff attendance, loyalty across outlets, and one view of every customer.",
  icon: "store",
  theme: { bg: "#0b0b0b", fg: "#ffffff", pop: "#a78bfa" },
  title: "CRM for Retail Stores & Franchises: Stock, Staff, Loyalty",
  metaDescription:
    "For retail stores and franchises: inventory across warehouses, staff attendance, loyalty shared across outlets, counter orders and one customer view.",
  keywords: [
    "CRM for retail chains and franchises",
    "multi-outlet loyalty program",
    "loyalty program for franchise",
    "multi-warehouse inventory for retail chains",
    "staff attendance for retail stores",
    "WhatsApp order updates without a website",
    "retail store CRM India",
  ],
  h1: ["CRM for retail stores,", "chains and franchises"],
  answer:
    "Zutok is a CRM for Indian retail stores, chains and franchises. Zutok CRM tracks stock across warehouses and staff attendance and leave; Zutok Zloya runs one loyalty program across every outlet with a shared customer profile; and Zutok ZShop sends WhatsApp updates for counter orders. " +
    `Zutok CRM, with inventory and HRM included, costs ${crmFrom()} billed monthly, excluding 18% GST.`,
  uses: ["crm", "zloya", "zshop"],
  relatedProduct: "crm",
  problem: {
    heading: "Why is running several outlets harder without one system?",
    paragraphs: [
      "Every new outlet multiplies the admin: stock moving out of the warehouse, shifts and leave at each location, and customers who shop at more than one branch. When each store keeps its own registers and its own loyalty cards, head office never sees the full picture, and a regular at one branch is a stranger at the next.",
      "Retail chains and franchises need stock, people and customers in one system, with the same customer recognised wherever they shop.",
    ],
  },
  approach: {
    heading: "How does Zutok bring stock, staff and loyalty together?",
    intro: "Three Zutok products split the work, and all of them feed Zutok CRM.",
    products: [
      {
        slug: "crm",
        role: "Stock, staff and the back office.",
        points: [
          "Inventory and warehouse: stock in, stock out, losses and adjustments, with a full history for every warehouse",
          "Attendance and leave with a shift planner",
          "HRM and payroll: staff records, contracts, insurance and salary",
          "Sales, order and quantity reports, plus company goals",
        ],
        linkText: "Zutok CRM inventory, HRM and attendance",
      },
      {
        slug: "zloya",
        role: "Loyalty across outlets.",
        points: [
          "POS quick counter at every outlet, in any browser",
          "Points and four VIP tiers, with OTP-protected redemptions",
          "The same guest profile shared across every outlet",
          "Win-back, birthday and points-expiry journeys with coupons locked to the customer's phone number",
        ],
        linkText: "Zutok Zloya multi-outlet loyalty",
      },
      {
        slug: "zshop",
        role: "Counter orders with WhatsApp updates.",
        points: [
          "An in-house shop with items kept in the CRM",
          "Orders taken at the counter, with every automation still working",
          "WhatsApp order updates sent from your ZChat number",
          "Buyers saved as CRM leads, matched on phone number only",
        ],
        linkText: "Zutok ZShop for in-store orders",
      },
    ],
  },
  workflow: {
    heading: "How does a day across your outlets run with Zutok?",
    intro: "One day in a small chain with a central warehouse, as an example.",
    steps: [
      {
        label: "Opening",
        title: "Shifts are already planned",
        body: "Each outlet's shifts are set in the shift planner, and attendance and leave requests are recorded in Zutok CRM rather than in a register.",
      },
      {
        label: "Morning",
        title: "Stock leaves the warehouse",
        body: "Stock going out is recorded as stock out, with any losses and adjustments noted, so every warehouse keeps a full history.",
      },
      {
        label: "At the till",
        title: "Customers earn points at any branch",
        body: "A cashier at any outlet looks the customer up by mobile number on the POS quick counter, enters the bill and awards points. Because the profile is shared, the customer is recognised at every branch.",
      },
      {
        label: "Counter order",
        title: "A counter order gets WhatsApp updates",
        body: "Staff take an order at the counter in ZShop's in-house shop, and the customer gets WhatsApp order updates just like an online buyer.",
      },
      {
        label: "Evening",
        title: "Head office reviews the day",
        body: "Sales, order and quantity reports in the CRM, and repeat guest rate and loyalty-tracked sales in Zloya, show how each part of the business is doing.",
      },
      {
        label: "Ongoing",
        title: "Lapsing customers get a nudge",
        body: "Customers who haven't come back in 30 days move to the Slipping segment and get a win-back message with a coupon locked to their phone number.",
      },
    ],
  },
  features: {
    heading: "Which Zutok features matter for multi-outlet retail?",
    items: [
      {
        icon: "boxes",
        title: "Inventory and warehouse",
        body: "Stock in, stock out, losses and adjustments, stock import and export, and warehouse reports.",
        product: "crm",
      },
      {
        icon: "calendar",
        title: "Attendance and leave",
        body: "Shift planner, attendance and leave requests without the spreadsheets.",
        product: "crm",
      },
      {
        icon: "usercog",
        title: "HRM and payroll",
        body: "Staff records, contracts, insurance and salary, with alerts before a contract expires.",
        product: "crm",
      },
      {
        icon: "crown",
        title: "Loyalty across outlets",
        body: "Points, Bronze to Platinum tiers and OTP-protected redemptions, with one guest profile shared by every outlet.",
        product: "zloya",
      },
      {
        icon: "pie",
        title: "Smart segments",
        body: "New, Regulars, Potential VIPs, Slipping (30 days), Lost (60+ days) and upcoming birthdays, updated automatically.",
        product: "zloya",
      },
      {
        icon: "plug",
        title: "No POS integration needed",
        body: "The POS quick counter runs in any browser next to your billing. If you want your POS connected, ask about API / POS integration during your demo.",
        product: "zloya",
      },
      {
        icon: "store",
        title: "In-house shop",
        body: "Keep items in the CRM, take orders at the counter and still send WhatsApp order updates.",
        product: "zshop",
      },
      {
        icon: "chart",
        title: "Reports and goals",
        body: "Sales, order, quantity and lead reports, plus company goals.",
        product: "crm",
      },
    ],
  },
  plans: {
    heading: "What does Zutok cost for a retail chain or franchise?",
    answer:
      `Inventory, HRM, payroll, attendance and leave are part of Zutok CRM, priced per user: ${crmPrices()}, excluding 18% GST. ` +
      `For loyalty and counter-order updates, Zloya and ZShop come free with ZChat Growth (${inr("zchat", "Growth")}/month) and Scale (${inr("zchat", "Scale")}/month). Chains with 10 or more outlets can ask for special pricing during the demo.`,
    picks: [
      ...crmPicks("Inventory and warehouse, HRM, attendance and leave"),
      zchatPick("Growth", "zloya"),
      zchatPick("Scale", "zloya"),
    ],
  },
  faqHeading: "Retail and franchise questions",
  faqs: [
    {
      q: "How can a retail chain run one loyalty program across all its outlets?",
      a: `Use Zutok Zloya, which comes free with ZChat ${bundlePlanNames()}. Every outlet uses the POS quick counter, and the same customer profile is shared across all of them, so a customer is recognised at every store.`,
    },
    {
      q: "Can I manage stock across warehouses and staff attendance in the same CRM?",
      a: "Yes. Zutok CRM includes inventory and warehouse management, with a full history for every warehouse, alongside HRM, payroll, attendance and leave.",
    },
    {
      q: "Can I see stock for each warehouse separately?",
      a: "Yes. Zutok CRM keeps a full stock history for every warehouse, with warehouse reports.",
    },
    {
      q: "How do I record damaged or lost stock?",
      a: "Record it as a loss or an adjustment in the same inventory module, so that warehouse's history stays accurate.",
    },
    {
      q: "I only sell at the counter. Can I still send WhatsApp order updates?",
      a: `Yes. Choose ZShop's in-house shop, keep your items in the CRM and take orders at the counter. Every automation still works. ZShop sends the WhatsApp messages through ZChat and comes free with ZChat ${bundlePlanNames()}.`,
    },
    {
      q: "What does it cost to send WhatsApp updates for counter orders?",
      a: `ZShop isn't sold on its own: it's ${ZSHOP_ZLOYA_INCLUDED}. Meta's charges are billed separately, and prices exclude 18% GST.`,
    },
    {
      q: "Is there special pricing for franchises with many outlets?",
      a: "Yes. Zutok has special pricing for chains with 10 or more outlets; ask about it during your demo.",
    },
    {
      q: "Does Zutok replace my billing or POS software?",
      a: "No. Zloya's POS quick counter runs in any browser next to your current billing, so you don't need an integration to start. If you want your POS connected, ask about API / POS integration during your demo.",
    },
  ],
  related: ["restaurants-cafes", "d2c-fashion-brands", "real-estate"],
};

/* ------------------------------------------------------------------ */
/* Exports                                                            */
/* ------------------------------------------------------------------ */

export const industries: Record<IndustrySlug, Industry> = {
  "restaurants-cafes": restaurants,
  "d2c-fashion-brands": d2c,
  "real-estate": realEstate,
  "agencies-services": agencies,
  "clinics-labs-salons": clinics,
  "retail-franchises": retail,
};

/** In the same order as the home page Industries cards. */
export const industryList: Industry[] = [restaurants, d2c, realEstate, agencies, clinics, retail];

export const industrySlugs: IndustrySlug[] = industryList.map((i) => i.slug);

export function getIndustry(slug: string): Industry | undefined {
  return (industries as Record<string, Industry | undefined>)[slug];
}

/** Trailing-slash route, as the static export serves it. */
export const industryPath = (slug: IndustrySlug) => `/industries/${slug}/`;

/** The h1 as one string, for metadata, JSON-LD and llms.txt. */
export const industryH1 = (i: Pick<Industry, "h1">) => i.h1.join(" ");

/** Copy for the /industries/ hub. */
export const industriesHub = {
  path: "/industries/",
  title: "CRM & WhatsApp Automation by Industry",
  description:
    "How restaurants, D2C brands, real estate firms, agencies, clinics, salons and retail chains in India use Zutok CRM, ZChat, ZShop and Zloya, with prices in ₹.",
  h1: ["CRM and WhatsApp automation", "for your industry"] as [string, string],
  intro:
    "Zutok Softwares makes Zutok CRM and three products that plug into it: ZChat for WhatsApp and Instagram chats, ZShop for store orders and Zloya for loyalty. Each guide below shows which of them fit one kind of business, how a typical day runs with them and what they cost in rupees.",
};
