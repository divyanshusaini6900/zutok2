import type { IconName } from "@/components/ui/Icon";

export type ProductSlug = "zchat" | "zshop" | "zloya" | "crm";

export type Theme = {
  color: string;
  color2: string;
  accent: string;
  accentOn: string;
  deep: string;
  on: string;
  /** Product colour, used only for accents, stickers and mockups. */
  pop: string;
  popOn: string;
};

export type Feature = { title: string; body: string; icon: IconName };

export type Product = {
  slug: ProductSlug;
  name: string;
  kicker: string;
  headline: [string, string, string];
  summary: string;
  theme: Theme;
  marquee: string[];
  features: Feature[];
  steps: { title: string; body: string }[];
  stats: { value: number; suffix?: string; prefix?: string; label: string }[];
  faqs: { q: string; a: string }[];
};

export const products: Record<ProductSlug, Product> = {
  zchat: {
    slug: "zchat",
    name: "ZChat",
    kicker: "Omnichannel inbox + AI agent",
    headline: ["Every chat.", "One inbox.", "Zero missed sales."],
    summary:
      "WhatsApp, Instagram, Messenger and Telegram land in one shared inbox. An AI agent answers in seconds, your team takes over when it matters, and every chat becomes a lead in your CRM.",
    theme: {
      color: "#0b0b0b",
      color2: "#1c1c1c",
      accent: "#ffffff",
      accentOn: "#0b0b0b",
      deep: "#0b0b0b",
      on: "#ffffff",
      pop: "#22c55e",
      popOn: "#0b0b0b",
    },
    marquee: [
      "WhatsApp",
      "Instagram DMs",
      "Messenger",
      "Telegram",
      "AI Agent",
      "Broadcasts",
      "Meta Templates",
      "Comment → DM",
      "Quick Replies",
      "Auto Assign",
    ],
    features: [
      {
        icon: "inbox",
        title: "One unified inbox",
        body: "WhatsApp, Instagram, Messenger and Telegram in one place, with All, Mine and Unassigned views and Open, Pending and Resolved status.",
      },
      {
        icon: "bot",
        title: "AI sales agent",
        body: "Add your products once. The agent asks each choice as a numbered list and replies with the price, order link and files from the one row that matches.",
      },
      {
        icon: "layers",
        title: "Your own columns & rows",
        body: "Size, colour, paper, delivery time, brochure: any column, any number. Set each one as a choice, information, quantity, price, link or file.",
      },
      {
        icon: "file",
        title: "Business knowledge",
        body: "Timings, address, delivery areas, payment and return policy. The AI answers only from the facts you give it and never guesses.",
      },
      {
        icon: "plug",
        title: "Choose your AI",
        body: "Run the agent on OpenAI, Anthropic Claude, Google Gemini, Vertex AI or your own model, with your own temperature and reply length.",
      },
      {
        icon: "zap",
        title: "Auto-assign backlog",
        body: "Spread new and waiting chats across your team automatically so nothing sits unanswered.",
      },
      {
        icon: "megaphone",
        title: "WhatsApp broadcasting",
        body: "Send Meta-approved templates to leads, contacts or a custom audience, and see sent, delivered and read numbers as they come in.",
      },
      {
        icon: "template",
        title: "Template studio",
        body: "Create and sync Text, Image, PDF, Video and Button templates for Marketing, Utility and Authentication, and track their approval status.",
      },
      {
        icon: "comment",
        title: "Comment → DM automation",
        body: "Auto-reply to comments on Instagram and Facebook posts and reels, and send a private DM to everyone who comments.",
      },
      {
        icon: "tags",
        title: "Labels & quick replies",
        body: "Tag conversations and answer the questions you get every day with saved replies.",
      },
      {
        icon: "users",
        title: "Contacts → CRM leads",
        body: "Every new chat creates a lead in Zutok CRM with its source, so sales can follow it up from one place.",
      },
      {
        icon: "chart",
        title: "Team reports",
        body: "Conversations, resolution rate, average resolution time, load per channel and per agent.",
      },
    ],
    steps: [
      { title: "Connect channels", body: "Link WhatsApp Business, Instagram, Messenger and Telegram in a few clicks." },
      { title: "Add your catalogue", body: "Products, your own columns and rows, plus your business facts. Or import them from a sheet." },
      { title: "Sell on autopilot", body: "The AI asks, quotes and sends the order link, and hands over to your team when needed." },
    ],
    stats: [
      { value: 4, label: "channels in one inbox" },
      { value: 24, suffix: "/7", label: "AI replies, day or night" },
      { value: 5, label: "template formats: text, image, PDF, video, buttons" },
    ],
    faqs: [
      {
        q: "Do I need the WhatsApp Business API?",
        a: "Yes. ZChat connects to the official WhatsApp Business Platform, and we help you set up and verify your number during onboarding.",
      },
      {
        q: "Are Meta's WhatsApp conversation charges included?",
        a: "No. Meta bills template conversations separately at its published rates. Your ZChat plan covers the software, seats and AI agent.",
      },
      {
        q: "How does the AI know my prices?",
        a: "You add each product with your own columns and rows, like paper, size, quantity, price and order link. The AI only quotes from the row that matches the customer's choices, so it never makes up a price.",
      },
      {
        q: "Can the AI agent hand a chat to my team?",
        a: "Yes. Turn on handoff and the agent passes the conversation to a person whenever a customer asks for one or the question falls outside its instructions.",
      },
    ],
  },

  zshop: {
    slug: "zshop",
    name: "ZShop",
    kicker: "Orders, COD and carts on WhatsApp",
    headline: ["Orders in.", "Updates out.", "Revenue back."],
    summary:
      "Connect Shopify, WooCommerce or your in-house counter. ZShop brings every order into the CRM, confirms cash-on-delivery on WhatsApp, recovers abandoned carts and keeps buyers updated until the parcel arrives.",
    theme: {
      color: "#ffffff",
      color2: "#f2f2f2",
      accent: "#0b0b0b",
      accentOn: "#ffffff",
      deep: "#0b0b0b",
      on: "#0b0b0b",
      pop: "#ff6b1a",
      popOn: "#0b0b0b",
    },
    marquee: [
      "Shopify",
      "WooCommerce",
      "In-house store",
      "COD confirmation",
      "Abandoned carts",
      "Courier tracking",
      "Order updates",
      "Discounts",
      "Quiet hours",
      "CRM leads",
    ],
    features: [
      {
        icon: "store",
        title: "Connect any store",
        body: "Shopify through a custom app, WooCommerce or any platform with an API, or an in-house shop whose items live in the CRM. Every feature works the same on all three.",
      },
      {
        icon: "package",
        title: "WhatsApp order updates",
        body: "Order placed, packed, shipped and delivered, sent from your ZChat number. When a buyer replies, it lands in the same inbox.",
      },
      {
        icon: "receipt",
        title: "COD confirmation",
        body: "Ask cash-on-delivery buyers to confirm on WhatsApp, remind them automatically and tag confirmed orders. Nothing is cancelled unless you choose to.",
      },
      {
        icon: "cart",
        title: "Abandoned-cart recovery",
        body: "Three reminders, after one hour, one day and three days, with a discount you set at each step. The first reminder carries none.",
      },
      {
        icon: "truck",
        title: "Courier tracking",
        body: "Checks courier status for out-for-delivery, delivered and failed attempts, and learns your real delivery times, like “usually 3–5 days”.",
      },
      {
        icon: "moon",
        title: "Quiet hours & limits",
        body: "Promotional messages respect quiet hours and a daily limit. Order updates always go out when they happen.",
      },
      {
        icon: "users",
        title: "Buyers → CRM",
        body: "Every customer becomes a CRM lead, matched on phone number only, so two people with the same name are never mixed up.",
      },
      {
        icon: "ban",
        title: "One do-not-contact list",
        body: "When someone says “stop contacting me”, it applies on every channel, shared with ZChat and ZCall.",
      },
      {
        icon: "workflow",
        title: "Automations & templates",
        body: "Discounts, carts, messages and automations in one place, with Meta template mapping for every numbered blank.",
      },
    ],
    steps: [
      { title: "Connect your store", body: "Shopify, WooCommerce, a custom site, or an in-house counter. Webhooks register themselves." },
      { title: "Approve your templates", body: "Map your Meta templates once. We show you which fields fill each blank." },
      { title: "Let orders run themselves", body: "COD confirmations, cart reminders and delivery updates go out automatically." },
    ],
    stats: [
      { value: 32, label: "Shopify webhook topics synced" },
      { value: 3, label: "abandoned-cart reminders" },
      { value: 3, label: "store types: Shopify, API, in-house" },
    ],
    faqs: [
      {
        q: "Will ZShop cancel orders when a COD buyer doesn't reply?",
        a: "Not by default. Buyers who don't confirm are tagged, and your team decides. You can switch on auto-cancel if you want it.",
      },
      {
        q: "Why does WhatsApp need approved templates?",
        a: "WhatsApp only allows free-form messages within 24 hours of the customer's last message. Most order updates fall outside that window, so they are sent as approved templates.",
      },
      {
        q: "I don't have a website. Can I still use ZShop?",
        a: "Yes. Choose an in-house shop, keep your items in the CRM and take orders at the counter. Every automation still works.",
      },
    ],
  },

  zloya: {
    slug: "zloya",
    name: "Zloya",
    kicker: "Loyalty, memberships & retention",
    headline: ["First visit.", "Second visit.", "Regular for life."],
    summary:
      "A loyalty and retention system for restaurants, cafés, salons and stores. Award points at the counter, sell memberships, run automated win-back journeys and collect guest feedback and Google reviews.",
    theme: {
      color: "#0b0b0b",
      color2: "#1c1c1c",
      accent: "#ffffff",
      accentOn: "#0b0b0b",
      deep: "#0b0b0b",
      on: "#ffffff",
      pop: "#ff4d8d",
      popOn: "#0b0b0b",
    },
    marquee: [
      "Loyalty points",
      "VIP tiers",
      "Memberships",
      "Prepaid wallets",
      "Birthday journeys",
      "Win-back",
      "Smart QR",
      "Google reviews",
      "POS counter",
      "OTP redemption",
    ],
    features: [
      {
        icon: "scan",
        title: "POS quick counter",
        body: "Cashiers look up a guest by mobile number, enter the bill and award points in seconds. Redemptions are protected by OTP.",
      },
      {
        icon: "crown",
        title: "VIP tiers",
        body: "Bronze, Silver, Gold and Platinum, with point multipliers from 1× to 2× and perks unlocked by spend and visits.",
      },
      {
        icon: "wallet",
        title: "Memberships & wallets",
        body: "Sell yearly perk bundles or prepaid wallets, like pay ₹5,000 and get ₹6,000 in credit, with a staff sales leaderboard.",
      },
      {
        icon: "repeat",
        title: "Automated journeys",
        body: "Welcome, birthday, 30-day win-back, points-expiry and feedback messages go out on their own, each with a coupon locked to the guest's phone number.",
      },
      {
        icon: "qr",
        title: "Smart QR codes",
        body: "QR codes on table standees, Swiggy and Zomato delivery boxes and partner stores collect guests' phone numbers. Track scans, sign-ups and opt-in rate for each code.",
      },
      {
        icon: "star",
        title: "Reputation booster",
        body: "Guests rate food, service, ambience and cleanliness, and low ratings alert you first so a manager can follow up. The booster also points guests to your Google review page.",
      },
      {
        icon: "pie",
        title: "Smart segments",
        body: "New, Regulars, Potential VIPs, Slipping (30 days), Lost (60+ days) and upcoming birthdays, updated automatically.",
      },
      {
        icon: "chart",
        title: "Retention analytics",
        body: "Repeat guest rate, loyalty-tracked sales and prepaid membership revenue on one dashboard.",
      },
      {
        icon: "cake",
        title: "Birthdays & anniversaries",
        body: "Send a personal greeting with a gift and double points that make guests want to come back.",
      },
    ],
    steps: [
      { title: "Place QR & open the counter", body: "Print standees, stick QR on delivery packs and log in at the POS counter." },
      { title: "Guests earn and join", body: "Every bill earns points, tiers unlock perks, memberships lock in future visits." },
      { title: "Journeys bring them back", body: "Birthday gifts, win-back vouchers and expiry nudges run on autopilot." },
    ],
    stats: [
      { value: 4, label: "VIP tiers, 1× to 2× points" },
      { value: 5, label: "ready-made retention journeys" },
      { value: 4, label: "feedback dimensions per visit" },
    ],
    faqs: [
      {
        q: "Does Zloya work without a POS integration?",
        a: "Yes. The POS quick counter runs in any browser, so the cashier enters the bill amount and Zloya handles the rest.",
      },
      {
        q: "How are redemptions protected from misuse?",
        a: "Every redemption needs a one-time password sent to the guest's phone, and every coupon is locked to one phone number.",
      },
      {
        q: "Can I run it across multiple outlets?",
        a: "Yes. Growth covers up to three outlets and Chain has no limit, with the same guest profile shared across every outlet.",
      },
    ],
  },

  crm: {
    slug: "crm",
    name: "Zutok CRM",
    kicker: "Sales, people, stock & support",
    headline: ["Every lead.", "Every invoice.", "One CRM."],
    summary:
      "Leads, customers, proposals, GST invoices, projects, HRM, payroll and inventory in one CRM built for Indian businesses. Chats from ZChat, orders from ZShop and guests from Zloya land in the same place.",
    theme: {
      color: "#ffffff",
      color2: "#f2f2f2",
      accent: "#0b0b0b",
      accentOn: "#ffffff",
      deep: "#0b0b0b",
      on: "#0b0b0b",
      pop: "#8b5cf6",
      popOn: "#0b0b0b",
    },
    marquee: [
      "Leads",
      "Meta Lead Ads",
      "IndiaMART",
      "Proposals",
      "Estimates",
      "GST invoices",
      "Payments",
      "Projects",
      "Timesheets",
      "HRM & payroll",
      "Inventory",
      "Support tickets",
      "Reports",
    ],
    features: [
      {
        icon: "users",
        title: "Leads & pipeline",
        body: "Leads from chats, Meta Lead Ads, IndiaMART and estimate requests move from Enquiry to Follow-up, Hot and Customer.",
      },
      {
        icon: "building",
        title: "Customers & contracts",
        body: "Every customer with their contacts, invoices, projects and tickets on one profile, plus contracts that remind you before renewal.",
      },
      {
        icon: "file",
        title: "Proposals & estimates",
        body: "Send proposals and estimates, collect estimate requests from your website and turn accepted ones into invoices.",
      },
      {
        icon: "receipt",
        title: "GST invoices & payments",
        body: "Invoices in rupees with tax fields, recurring invoices, payments, credit notes and bulk PDF export for your accountant.",
      },
      {
        icon: "briefcase",
        title: "Projects & tasks",
        body: "Milestones, tasks, timesheets and meeting notes, all linked to the customer they belong to.",
      },
      {
        icon: "usercog",
        title: "HRM & payroll",
        body: "Staff records, contracts, insurance and salary, with alerts before a contract expires.",
      },
      {
        icon: "calendar",
        title: "Attendance & leave",
        body: "Shift planner, attendance and leave requests without the spreadsheets.",
      },
      {
        icon: "boxes",
        title: "Inventory & warehouse",
        body: "Stock in, stock out, losses and adjustments, with a full history for every warehouse.",
      },
      {
        icon: "home",
        title: "Real estate suite",
        body: "Properties, owners, agents, brokers, buy and rent requests, and tenants in one place.",
      },
      {
        icon: "wallet",
        title: "Subscriptions & expenses",
        body: "Recurring billing, expense tracking and a clear expenses vs income view.",
      },
      {
        icon: "support",
        title: "Support & knowledge base",
        body: "Tickets, a knowledge base and surveys that keep customers happy after the sale.",
      },
      {
        icon: "chart",
        title: "Automation & reports",
        body: "Custom email and SMS templates, scheduled jobs, company goals and reports on sales, leads and timesheets.",
      },
    ],
    steps: [
      { title: "Bring your data in", body: "Import customers, leads and items from Excel or your old CRM. We help you during onboarding." },
      { title: "Set up your team", body: "Add staff with roles and permissions, your lead stages, tax rates and invoice format." },
      { title: "Run the whole business", body: "Leads, invoices, projects, payroll and stock in one place, with ZChat, ZShop or Zloya plugged in when you need them." },
    ],
    stats: [
      { value: 30, suffix: "+", label: "modules, from leads to payroll" },
      { value: 4, label: "lead stages, enquiry to customer" },
      { value: 3, label: "products that plug in: ZChat, ZShop, Zloya" },
    ],
    faqs: [
      {
        q: "Can I bring in my existing data?",
        a: "Yes. Import customers, leads and items from Excel or CSV, or from your old CRM. We help with the import during onboarding.",
      },
      {
        q: "Does invoicing support GST?",
        a: "Yes. Proposals, estimates, invoices and credit notes are in rupees with tax fields, and you can export them in bulk as PDF.",
      },
      {
        q: "Can I control what each staff member sees?",
        a: "Yes. Each staff member gets a role with its own permissions, so sales, accounts and HR only see what they need.",
      },
      {
        q: "Do I need ZChat, ZShop or Zloya to use the CRM?",
        a: "No. Zutok CRM works on its own. When you add a product, its chats, orders or guests land in the same CRM.",
      },
    ],
  },
};

export const productList = [products.zchat, products.zshop, products.zloya, products.crm];

export const platformModules: {
  title: string;
  body: string;
  icon: IconName;
  points: string[];
}[] = [
  {
    title: "Leads & Pipeline",
    body: "Capture leads from chats, Meta Lead Ads and imports, then move them from enquiry to paying customer.",
    icon: "users",
    points: ["Enquiry → Follow-up → Hot → Customer", "Meta Lead Ads & IndiaMART", "Field mapping"],
  },
  {
    title: "Sales & GST Invoicing",
    body: "Proposals, estimates, invoices, payments and credit notes, all in rupees.",
    icon: "receipt",
    points: ["Proposals & estimates", "Recurring invoices", "Payments & credit notes"],
  },
  {
    title: "Projects & Tasks",
    body: "Plan projects, assign tasks, log time and keep meeting notes next to the client.",
    icon: "briefcase",
    points: ["Projects & milestones", "Tasks & timesheets", "Meeting notes"],
  },
  {
    title: "HRM & Payroll",
    body: "Staff records, contracts, insurance and salary, with alerts before contracts expire.",
    icon: "usercog",
    points: ["Staff & contracts", "Insurance", "Salary & payroll"],
  },
  {
    title: "Attendance & Leave",
    body: "Shifts, shift tables, attendance and leave requests without the spreadsheets.",
    icon: "calendar",
    points: ["Shift planner", "Leave requests", "Attendance reports"],
  },
  {
    title: "Inventory & Warehouse",
    body: "Stock in, stock out, losses and adjustments, with a full warehouse history.",
    icon: "boxes",
    points: ["Stock import & export", "Loss & adjustment", "Warehouse reports"],
  },
  {
    title: "Real Estate Suite",
    body: "Properties, owners, agents, brokers, buy and rental requests, and tenants.",
    icon: "home",
    points: ["Properties & approvals", "Buy & rent requests", "Tenants & reports"],
  },
  {
    title: "Subscriptions & Expenses",
    body: "Recurring billing, expense tracking and an expenses vs income view.",
    icon: "wallet",
    points: ["Subscriptions", "Expenses", "Expenses vs income"],
  },
  {
    title: "Support & Knowledge Base",
    body: "Tickets, a knowledge base and surveys to keep customers happy after the sale.",
    icon: "support",
    points: ["Support tickets", "Knowledge base", "Surveys"],
  },
  {
    title: "Automation & Messaging",
    body: "Automation manager, scheduled jobs and custom email and SMS templates.",
    icon: "workflow",
    points: ["Automation manager", "Custom email / SMS", "Scheduled jobs"],
  },
  {
    title: "Reports & Goals",
    body: "Sales, orders, quantities, leads and timesheet reports, plus company goals.",
    icon: "chart",
    points: ["Sales & order reports", "Lead reports", "Goals tracking"],
  },
  {
    title: "Customers & Contracts",
    body: "Customer profiles with contacts and full history, plus contracts that remind you before renewal.",
    icon: "building",
    points: ["Customers & contacts", "Contract renewals", "Bulk PDF & CSV export"],
  },
];
