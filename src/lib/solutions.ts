import type { IconName } from "@/components/ui/Icon";
import type { ProductSlug } from "@/lib/products";
import { formatINR, pricing, YEARLY_MONTHS_CHARGED, type PricingGroup } from "@/lib/pricing";

/**
 * Use-case landing pages under /solutions/. Every claim here restates src/lib/products.ts, src/lib/pricing.ts or
 * the product sections; prices are read from pricing.ts so the copy can't drift from the plans.
 */

export type SolutionSlug =
  | "whatsapp-ai-sales-agent"
  | "whatsapp-broadcast-campaigns"
  | "instagram-comment-to-dm"
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
  related: SolutionSlug[];
};

type GroupId = PricingGroup["id"];

function pricedPlan(group: GroupId, name: string) {
  const plan = pricing.find((g) => g.id === group)?.plans.find((p) => p.name === name);
  if (!plan || plan.monthly === null) throw new Error(`solutions.ts: no priced plan "${name}" in "${group}"`);
  return { ...plan, monthly: plan.monthly };
}

/** "₹1,999/month" */
const perMonth = (group: GroupId, plan: string) => `₹${formatINR(pricedPlan(group, plan).monthly)}/month`;

/** "₹1,999/month billed monthly (₹19,990/year), excl. 18% GST" */
const priceLine = (group: GroupId, plan: string) => {
  const m = pricedPlan(group, plan).monthly;
  return `₹${formatINR(m)}/month billed monthly (₹${formatINR(m * YEARLY_MONTHS_CHARGED)}/year), excl. 18% GST`;
};

const data: Record<SolutionSlug, Omit<Solution, "slug">> = {
  /* ---------------------------------------------------------------- */
  /* ZChat                                                            */
  /* ---------------------------------------------------------------- */
  "whatsapp-ai-sales-agent": {
    name: "WhatsApp AI sales agent",
    kicker: "Zutok ZChat · AI sales agent",
    relatedProduct: "zchat",
    title: "WhatsApp AI Sales Agent That Quotes From Your Catalogue",
    metaDescription:
      "Zutok ZChat's AI sales agent asks each product choice on WhatsApp, then quotes the price, order link and files from the one catalogue row that matches.",
    keywords: [
      "WhatsApp AI sales agent",
      "WhatsApp AI chatbot for business India",
      "AI chatbot that quotes prices on WhatsApp",
      "WhatsApp chatbot with product catalogue",
      "AI chatbot with human handoff",
      "WhatsApp bot OpenAI Gemini Claude",
    ],
    h1: "A WhatsApp AI sales agent that quotes from your own catalogue",
    h1Accent: "from your own catalogue",
    answer: `Zutok ZChat's AI sales agent answers product and price questions on WhatsApp. You add each product with your own columns and rows. The agent asks the customer each choice as a numbered list, then replies with the price, order link and files from the one row that matches, so it never makes up a price. It comes with ZChat Growth at ${priceLine("zchat", "Growth")}.`,
    summary:
      "How Zutok ZChat's AI agent asks each choice on WhatsApp and quotes the price, order link and files from your own catalogue rows, with human handoff.",
    facts: [
      { value: "6", label: "column types the agent understands" },
      { value: "1 row", label: "every quote comes from the one row that matches" },
      { value: "5", label: "AI options: OpenAI, Claude, Gemini, Vertex AI or your own model" },
    ],
    problem: {
      heading: "Why is it hard to answer price questions on WhatsApp quickly and correctly?",
      lead: "Because the right price depends on the customer's choices. Someone asking “how much for visiting cards?” first has to pick a paper, a size and a quantity, and only then can anyone look up the right line in your price list.",
      body: [
        "Doing that by hand in every chat is slow, and enquiries don't wait for office hours. Handing it to a general-purpose chatbot is risky in a different way: a bot that is free to improvise can quote a price you never set.",
        "What you need is an agent that asks the questions your staff would ask, then reads the price from your own data instead of making one up.",
      ],
    },
    approach: {
      heading: "How does a WhatsApp AI chatbot know my prices without making them up?",
      lead: "In ZChat the price only ever comes from your catalogue. You give each product its own columns and rows, the agent narrows down the customer's choices one at a time, and it quotes from the single row that matches all of them.",
      body: [
        "Every column has a type that tells the agent what to do with it. Columns set to “Customer chooses” are asked one by one as a numbered list, and the agent only offers values that exist with the earlier choices. “Information” columns, like delivery time, are shown with the price and answered when asked. The “Price” column is only ever read from the matched row.",
        "Alongside the catalogue you give the agent your business knowledge: timings, address, delivery areas, and payment and return policy. It answers from those facts only and never guesses. If a question falls outside its instructions, or the customer asks for a person, the chat moves to your team with the whole history.",
      ],
    },
    extra: [
      {
        heading: "What happens when a customer asks for a quantity that isn't one of my packs?",
        lead: "The agent quotes the next bigger pack. Quantity columns hold packs like 100 and 500, and any other number gets the next pack up.",
        body: [
          "Say a printer sells glossy, standard-size visiting cards in packs of 100 and 500. A customer who picks Glossy, then Standard, then types 400 is told that 400 isn't a pack, and gets the price, order link and sample PDF from the 500-card row.",
        ],
      },
    ],
    steps: {
      heading: "How do you set up the AI sales agent, step by step?",
      lead: "Most of the work is building the catalogue once. After that, the agent sells from it on its own.",
      items: [
        {
          title: "Connect WhatsApp",
          body: "ZChat runs on the official WhatsApp Business Platform (the WhatsApp Business API). Zutok helps you set up and verify your number during onboarding.",
        },
        { title: "Add your products", body: "Name, description and photos for each product, or import your whole catalogue from a sheet." },
        { title: "Design your columns", body: "Paper, size, colour, delivery time, brochure: any name, any number. Give each column a type." },
        { title: "Fill in the rows", body: "One row per combination of choices and pack. Leave a cell empty when it doesn't matter." },
        {
          title: "Add facts and pick your AI",
          body: "Timings, address, delivery areas, payment and return policy. Then choose the model, temperature and reply length.",
        },
        {
          title: "Turn on handoff and go live",
          body: "The agent asks, quotes and sends the order link, and passes the chat to your team when needed.",
        },
      ],
    },
    features: {
      heading: "What does each column type tell the agent to do?",
      lead: "Every column you add gets one of six types. The type decides whether the agent asks about it, shows it, rounds it up to a pack, quotes it or sends it.",
      items: [
        { icon: "layers", title: "Customer chooses", body: "Asked one by one, as a numbered list. Use it for options like paper, size or colour." },
        { icon: "timer", title: "Information", body: "Shown with the price and answered when asked, like delivery time." },
        { icon: "boxes", title: "Quantity", body: "Packs like 100 or 500. Any other number gets the next bigger pack." },
        { icon: "receipt", title: "Price", body: "Only ever taken from the row that matches every choice." },
        { icon: "cart", title: "Link", body: "The first link column is the order link the customer gets with the quote." },
        { icon: "file", title: "File", body: "A brochure, price list, PDF or video. The customer gets the real file." },
      ],
    },
    plan: {
      heading: "How much does a WhatsApp AI sales agent cost in India?",
      lead: `With Zutok, the AI sales agent comes with ZChat Growth at ${priceLine("zchat", "Growth")}, along with all four channels and 5 team seats. ZChat Scale at ${perMonth("zchat", "Scale")} adds multiple AI agents and 15 seats.`,
      includes: [
        { label: "AI sales agent with your catalogue", from: "Growth" },
        { label: "Multiple AI agents", from: "Scale" },
      ],
      highlights: {
        Starter: "Shared WhatsApp + Instagram inbox for 2 seats.",
        Growth: "All 4 channels, 5 seats, broadcasts and the AI sales agent.",
        Scale: "15 seats, multiple AI agents, auto-assign and export / import.",
      },
      suite: "Suite Growth",
    },
    faqs: [
      {
        q: "Can the WhatsApp AI agent hand a conversation over to a human?",
        a: "Yes. Turn on handoff and the agent passes the chat to your team whenever a customer asks for a person or the question falls outside its instructions. The conversation stays in the same ZChat inbox with its whole history.",
      },
      {
        q: "Can I choose which AI model runs the agent, such as OpenAI, Claude or Gemini?",
        a: "Yes. Run the agent on OpenAI, Anthropic Claude, Google Gemini, Vertex AI or your own model, and set your own temperature and reply length.",
      },
      {
        q: "Will the AI answer questions that aren't about products?",
        a: "Only from the business knowledge you give it: timings, address, delivery areas, and payment and return policy. It doesn't guess, and anything outside its instructions can go to your team.",
      },
      {
        q: "Do I need the WhatsApp Business API?",
        a: "Yes. ZChat connects to the official WhatsApp Business Platform, and Zutok helps you set up and verify your number during onboarding.",
      },
      {
        q: "Are Meta's WhatsApp charges included in the price?",
        a: "No. Meta bills template conversations separately at its published rates. Your ZChat plan covers the software, seats and AI agent.",
      },
    ],
    related: ["whatsapp-broadcast-campaigns", "instagram-comment-to-dm", "indiamart-meta-lead-ads-crm"],
  },

  "whatsapp-broadcast-campaigns": {
    name: "WhatsApp broadcast campaigns",
    kicker: "Zutok ZChat · Broadcasts",
    relatedProduct: "zchat",
    title: "WhatsApp Broadcast Campaigns with Meta-Approved Templates",
    metaDescription:
      "Send Meta-approved WhatsApp templates with text, images, PDFs, video and buttons to leads or custom lists with Zutok ZChat, and track sent, delivered and read.",
    keywords: [
      "WhatsApp broadcast software India",
      "bulk WhatsApp messages with approved templates",
      "WhatsApp template message approval",
      "WhatsApp marketing campaign delivery report",
      "WhatsApp Business API broadcast",
      "WhatsApp image video PDF templates",
    ],
    h1: "WhatsApp broadcast software for Indian businesses, built on approved templates",
    h1Accent: "built on approved templates",
    answer: `Zutok ZChat sends WhatsApp broadcasts through the official WhatsApp Business Platform, using templates Meta has approved. Build Text, Image, PDF, Video and Button templates in the template studio, track their approval, send them to leads, contacts or a custom audience, and watch sent, delivered and read numbers as they arrive. Broadcasts come with ZChat Growth at ${priceLine("zchat", "Growth")}.`,
    summary:
      "How Zutok ZChat sends bulk WhatsApp campaigns with Meta-approved templates and shows sent, delivered and read numbers as they come in.",
    facts: [
      { value: "5", label: "template formats: text, image, PDF, video and buttons" },
      { value: "3", label: "template categories: Marketing, Utility and Authentication" },
      { value: "Live", label: "sent, delivered and read numbers" },
    ],
    problem: {
      heading: "Why do WhatsApp broadcasts need Meta-approved templates?",
      lead: "WhatsApp only allows free-form messages within 24 hours of a customer's last message. Most people on a broadcast list haven't written to you in that window, so the message has to go out as a template Meta has approved.",
      body: [
        "A template is a message you write in advance and submit to Meta under a category: Marketing, Utility or Authentication. Once it's approved, you can use it in your campaigns.",
        "That's why every ZChat campaign starts in the template studio rather than in a chat window.",
      ],
    },
    approach: {
      heading: "How does ZChat run a WhatsApp broadcast campaign?",
      lead: "You create or sync a template, choose who gets it and send it now or on a schedule. Delivery numbers update as they come in, and every reply comes back to the shared inbox.",
      body: [
        "The template studio covers five formats (Text, Image, PDF, Video and Button) across the Marketing, Utility and Authentication categories, and shows where each template is in Meta's approval. Templates you've already made in Meta sync into ZChat in one click.",
        "Audiences come from what's already in Zutok: your leads, your contacts or a custom list. Campaigns can be scheduled, paused and filtered. When a customer replies, the reply lands in the same shared inbox your team already works in, so a campaign turns straight into conversations.",
      ],
    },
    extra: [
      {
        heading: "What types of WhatsApp templates can I create?",
        lead: "Five: Text, Image, PDF, Video and Button templates. You can create each one in ZChat's template studio or sync it from Meta, under the Marketing, Utility or Authentication category.",
        bullets: [
          "Text: a written message, for announcements, updates and reminders.",
          "Image: a picture with your message, such as a new collection or an offer.",
          "PDF: a document like a catalogue, menu or price list.",
          "Video: a short video with your message.",
          "Button: a message with buttons the customer can tap to respond.",
        ],
      },
    ],
    steps: {
      heading: "How do you send a WhatsApp broadcast, step by step?",
      lead: "Once your number is connected, every campaign is a template, an audience and a send button.",
      items: [
        {
          title: "Connect your number",
          body: "ZChat runs on the official WhatsApp Business Platform. Zutok guides you through connecting your number.",
        },
        {
          title: "Create or sync a template",
          body: "Build Text, Image, PDF, Video or Button templates in the template studio, or sync your existing ones from Meta in one click.",
        },
        {
          title: "Get it approved",
          body: "Pick Marketing, Utility or Authentication and track the approval status. Zutok helps you get templates approved by Meta.",
        },
        { title: "Choose your audience", body: "Your leads, your contacts or a custom audience." },
        { title: "Send or schedule", body: "Send now or schedule it for later, and pause a campaign if your plans change." },
        { title: "Follow delivery and replies", body: "Sent, delivered and read numbers update live, and replies land in the shared inbox." },
      ],
    },
    features: {
      heading: "What's included in ZChat broadcasting?",
      lead: "Everything you need to run a campaign sits in ZChat, next to the inbox where the replies arrive.",
      items: [
        { icon: "megaphone", title: "Broadcasts to any list", body: "Send to your leads, contacts or a custom audience." },
        { icon: "template", title: "Template studio", body: "Create Text, Image, PDF, Video and Button templates." },
        { icon: "layers", title: "Three categories", body: "Marketing, Utility and Authentication, with the approval status of each template." },
        { icon: "swap", title: "One-click sync", body: "Pull in the templates you already have in Meta." },
        { icon: "timer", title: "Schedule & pause", body: "Schedule, pause and filter campaigns." },
        { icon: "chart", title: "Live delivery numbers", body: "Sent, delivered and read, as they come in." },
        { icon: "inbox", title: "Replies in one inbox", body: "Your team picks up every reply in ZChat's shared inbox." },
        { icon: "users", title: "Leads in Zutok CRM", body: "Every new chat creates a lead with its source." },
      ],
    },
    plan: {
      heading: "Which ZChat plan includes WhatsApp broadcasts, and what does it cost?",
      lead: `Broadcasts and Meta templates come with ZChat Growth at ${priceLine("zchat", "Growth")}. Meta charges for template conversations separately, at its published rates.`,
      includes: [{ label: "Broadcasts & Meta templates", from: "Growth" }],
      highlights: {
        Starter: "Shared WhatsApp + Instagram inbox for 2 seats.",
        Growth: "All 4 channels, 5 seats, broadcasts, templates and the AI sales agent.",
        Scale: "Everything in Growth with 15 seats and priority support.",
      },
      suite: "Suite Growth",
    },
    faqs: [
      {
        q: "Can I see how many people received and read my broadcast?",
        a: "Yes. ZChat shows sent, delivered and read numbers for each campaign as they come in.",
      },
      {
        q: "Are Meta's WhatsApp message charges included in the plan?",
        a: "No. Meta bills template conversations separately at its published rates for India. Your ZChat plan covers the software and seats.",
      },
      {
        q: "Where do customer replies to a broadcast go?",
        a: "Back to ZChat's shared inbox, where your team can answer them. Every new chat also creates a lead in Zutok CRM with its source.",
      },
      {
        q: "Do you help with WhatsApp template approval?",
        a: "Yes. Zutok guides you through connecting your number to the official WhatsApp Business Platform and getting your message templates approved by Meta.",
      },
      {
        q: "Can I schedule a broadcast for later?",
        a: "Yes. Campaigns can be scheduled, paused and filtered.",
      },
    ],
    related: ["whatsapp-ai-sales-agent", "instagram-comment-to-dm", "abandoned-cart-recovery-whatsapp"],
  },

  "instagram-comment-to-dm": {
    name: "Instagram comment-to-DM automation",
    kicker: "Zutok ZChat · Comment → DM",
    relatedProduct: "zchat",
    title: "Instagram & Facebook Comment-to-DM Automation",
    metaDescription:
      "When someone comments on your Instagram or Facebook post or reel, Zutok ZChat replies publicly and sends a private DM. Trigger on keywords or any comment.",
    keywords: [
      "Instagram comment to DM automation",
      "auto DM Instagram comments",
      "Instagram reel comment auto reply",
      "Facebook comment auto reply",
      "keyword comment to DM India",
      "Instagram DM automation for business",
    ],
    h1: "Instagram and Facebook comment-to-DM automation for posts and reels",
    h1Accent: "for posts and reels",
    answer: `Zutok ZChat replies automatically when someone comments on your Instagram or Facebook posts and reels. On any comment, or only on keywords you choose like “price”, it posts a public reply and sends that person a private DM with the details. Every auto-reply is logged, and the DM lands in your shared inbox. It comes with ZChat Growth at ${priceLine("zchat", "Growth")}.`,
    summary:
      "How Zutok ZChat answers Instagram and Facebook comments with a public reply and a private DM, triggered by keywords or by any comment.",
    facts: [
      { value: "2", label: "platforms: Instagram and Facebook posts and reels" },
      { value: "1 + 1", label: "a public reply and a private DM for each comment" },
      { value: "Every", label: "auto-reply recorded in the activity log" },
    ],
    problem: {
      heading: "What happens to “price?” comments when nobody answers them?",
      lead: "They pile up. When a post or reel is doing well, comments asking for the price or the link come in faster than anyone can answer by hand, and each one is a buyer waiting for a reply.",
      body: [
        "Answering in the comments also puts the details in front of everyone, when what you really want is a one-to-one conversation you can follow up. Comment-to-DM automation does both: a quick public reply, then the real answer in private.",
      ],
    },
    approach: {
      heading: "How do I automatically send a DM to everyone who comments on my Instagram reel?",
      lead: "Set a rule once in ZChat. When someone comments on your post or reel, ZChat posts a public reply under the comment, sends them a private DM with the details and records the auto-reply in its activity log.",
      body: [
        "You decide what triggers the rule: any comment, or only comments with keywords you choose. The public reply shows everyone that the person has been answered, something like “Sent you a DM with the price”, while the DM carries the actual details.",
        "The DM conversation lands in ZChat's unified inbox alongside WhatsApp, Messenger and Telegram, and every new chat creates a lead in Zutok CRM with its source. From there your team carries the conversation on, with labels and quick replies for the questions you get every day.",
      ],
    },
    steps: {
      heading: "How do you set up comment-to-DM, step by step?",
      lead: "It takes one rule. After that, every matching comment is handled the same way.",
      items: [
        { title: "Connect your accounts", body: "Link Instagram and Messenger to ZChat in a few clicks." },
        { title: "Choose the trigger", body: "Any comment, or only comments with keywords like “price”." },
        { title: "Write both replies", body: "A short public reply to go under the comment, and the private DM with the details." },
        { title: "Let it run", body: "Each matching comment gets the public reply and the DM, and the activity log records it." },
        { title: "Follow up in the inbox", body: "DMs land in the shared inbox and become leads in Zutok CRM." },
      ],
    },
    features: {
      heading: "What does ZChat's comment automation include?",
      items: [
        { icon: "comment", title: "Posts and reels", body: "Comments on both Instagram and Facebook posts and reels." },
        { icon: "tags", title: "Keyword or any comment", body: "Trigger on the words you choose, or on every comment." },
        { icon: "megaphone", title: "Public reply + private DM", body: "A visible reply under the comment and the details in a DM." },
        { icon: "file", title: "Activity log", body: "A record of every auto-reply." },
        { icon: "inbox", title: "Unified inbox", body: "Instagram, WhatsApp, Messenger and Telegram, with All, Mine and Unassigned views." },
        { icon: "users", title: "Leads in Zutok CRM", body: "Every new chat creates a lead with its source." },
        { icon: "zap", title: "Labels & quick replies", body: "Saved answers for the questions you get every day." },
      ],
    },
    plan: {
      heading: "Which ZChat plan includes comment-to-DM automation?",
      lead: `Comment → DM automation comes with ZChat Growth at ${priceLine("zchat", "Growth")}, along with all four channels and 5 team seats.`,
      includes: [{ label: "Comment → DM automation", from: "Growth" }],
      highlights: {
        Starter: "Shared WhatsApp + Instagram inbox for 2 seats.",
        Growth: "All 4 channels, 5 seats, comment → DM, broadcasts and the AI sales agent.",
        Scale: "Everything in Growth with 15 seats and multiple AI agents.",
      },
      suite: "Suite Growth",
    },
    faqs: [
      {
        q: "Can the DM trigger only when someone comments a keyword like “price”?",
        a: "Yes. Each rule can trigger on keywords you choose, or on any comment.",
      },
      {
        q: "Does comment-to-DM work on Facebook posts too?",
        a: "Yes. ZChat auto-replies to comments on both Instagram and Facebook posts and reels, and sends a private DM to everyone who comments.",
      },
      {
        q: "Where do the DM conversations go, and are they saved as leads?",
        a: "They land in ZChat's unified inbox with your WhatsApp, Messenger and Telegram chats, and every new chat creates a lead in Zutok CRM with its source.",
      },
      {
        q: "Can I see which comments got an automatic reply?",
        a: "Yes. The activity log records every auto-reply.",
      },
    ],
    related: ["whatsapp-ai-sales-agent", "whatsapp-broadcast-campaigns", "indiamart-meta-lead-ads-crm"],
  },

  /* ---------------------------------------------------------------- */
  /* ZShop                                                            */
  /* ---------------------------------------------------------------- */
  "whatsapp-cod-confirmation": {
    name: "WhatsApp COD confirmation",
    kicker: "Zutok ZShop · COD confirmation",
    relatedProduct: "zshop",
    title: "WhatsApp COD Confirmation for Shopify & WooCommerce",
    metaDescription:
      "Zutok ZShop asks COD buyers to confirm on WhatsApp before you ship, sends reminders and tags confirmed orders. Auto-cancel is off unless you turn it on.",
    keywords: [
      "COD order confirmation on WhatsApp",
      "COD verification Shopify WhatsApp",
      "WooCommerce COD confirmation",
      "confirm cash on delivery orders before shipping",
      "reduce fake COD orders",
      "COD confirmation reminder",
    ],
    h1: "COD order confirmation on WhatsApp, before anything ships",
    h1Accent: "before anything ships",
    answer: `Zutok ZShop asks cash-on-delivery buyers to confirm their order on WhatsApp before you ship it. If they don't reply, it reminds them automatically. Confirmed orders are tagged, and nothing is cancelled unless you switch that on. It works with Shopify, WooCommerce and in-house stores, from ZShop Starter at ${priceLine("zshop", "Starter")}, with ZChat for WhatsApp delivery.`,
    summary:
      "How Zutok ZShop asks COD buyers to confirm on WhatsApp before dispatch, reminds them and tags the order, with auto-cancel off by default.",
    facts: [
      { value: "4 h", label: "until the reminder goes out, by default" },
      { value: "24 h", label: "until ZShop stops asking, by default" },
      { value: "Off", label: "auto-cancel, unless you turn it on" },
    ],
    problem: {
      heading: "Why confirm COD orders before shipping?",
      lead: "Because a cash-on-delivery order costs you packing and courier charges before you've been paid anything. If the buyer didn't mean it or has changed their mind, you only find out when the parcel comes back as RTO.",
      body: [
        "A quick confirmation on WhatsApp gives you a signal before you commit stock and shipping. Orders the buyer confirms go out as normal, and orders without an answer can wait for your team to check them first.",
      ],
    },
    approach: {
      heading: "How do I automatically confirm COD orders on WhatsApp before shipping?",
      lead: "Connect your store to ZShop and turn on COD confirmation. Each new COD order gets a WhatsApp message asking the buyer to confirm, a reminder follows if they don't answer, and confirmed orders are tagged.",
      body: [
        "The defaults are to remind after 4 hours and stop asking after 24 hours. Buyers who don't confirm are tagged rather than cancelled, so your team decides what happens to the order. If you'd rather cancel unanswered orders automatically, “Cancel if nobody replies” is there too, and it's off by default.",
        "The message goes out from your ZChat number, for example with ✅ Confirm and ❌ Cancel buttons. If the buyer replies with a question instead, the reply lands in the same inbox for your team to answer.",
      ],
    },
    extra: [
      {
        heading: "Do COD confirmation messages need approved WhatsApp templates?",
        lead: "Usually, yes. WhatsApp only allows free-form messages within 24 hours of the customer's last message. A buyer who ordered on your website hasn't messaged you on WhatsApp, so the confirmation goes out as an approved template that ZShop fills in.",
        body: ["You map your Meta templates once during setup, and ZShop shows you which order fields fill each numbered blank."],
      },
    ],
    steps: {
      heading: "How does WhatsApp COD confirmation work, step by step?",
      lead: "You set it up once. After that, every COD order follows the same path.",
      items: [
        {
          title: "Connect your store",
          body: "Shopify through a custom app, WooCommerce or any platform with an API, or an in-house shop. Webhooks register themselves.",
        },
        { title: "Map your template", body: "Map your Meta-approved confirmation template once. ZShop shows which fields fill each blank." },
        { title: "A COD order comes in", body: "ZShop sends the buyer a WhatsApp message asking them to confirm, before anything ships." },
        { title: "A reminder if there's no reply", body: "By default a reminder goes out after 4 hours, and ZShop stops asking after 24 hours." },
        {
          title: "Tag and decide",
          body: "Confirmed orders are tagged. Buyers who don't confirm are tagged too, and your team decides, unless you've switched on auto-cancel.",
        },
      ],
    },
    features: {
      heading: "What can you control in COD confirmation?",
      lead: "ZShop's defaults lean towards keeping orders, not cancelling them.",
      items: [
        { icon: "receipt", title: "Confirm before dispatch", body: "COD buyers are asked to confirm on WhatsApp before anything ships." },
        { icon: "timer", title: "Automatic reminder", body: "A reminder after 4 hours by default." },
        { icon: "calendar", title: "Stops after 24 hours", body: "ZShop stops asking after 24 hours by default." },
        { icon: "tags", title: "Tags, not cancellations", body: "Unconfirmed orders are tagged, and your team decides." },
        { icon: "ban", title: "Optional auto-cancel", body: "“Cancel if nobody replies” stays off unless you turn it on." },
        { icon: "inbox", title: "Replies in the inbox", body: "Buyer replies land in your ZChat inbox." },
        { icon: "store", title: "Any store", body: "Shopify, WooCommerce or any platform with an API, and in-house shops." },
        { icon: "users", title: "Buyers → CRM", body: "Every buyer becomes a CRM lead, matched on phone number only." },
      ],
    },
    plan: {
      heading: "How much does WhatsApp COD confirmation cost with ZShop?",
      lead: `COD confirmation is part of ZShop Starter at ${priceLine("zshop", "Starter")}, for 1 store and up to 500 orders a month. ZShop sends WhatsApp messages through ZChat, so you'll need ZChat too, and Meta's conversation charges are billed separately.`,
      includes: [{ label: "COD confirmation", from: "Starter" }],
      highlights: {
        Starter: "1 store, up to 500 orders a month, order updates and COD confirmation.",
        Growth: "Up to 3 stores and 3,000 orders a month, plus cart recovery and courier tracking.",
        Scale: "Unlimited stores and orders (fair use), with a multi-store dashboard.",
      },
      suite: "Suite Starter",
    },
    faqs: [
      {
        q: "What happens if a COD buyer doesn't reply? Is the order cancelled?",
        a: "Not by default. Buyers who don't confirm are tagged, and your team decides. You can switch on auto-cancel if you want it.",
      },
      {
        q: "Does WhatsApp COD confirmation work with WooCommerce or without a website?",
        a: "Yes. ZShop works with Shopify through a custom app, WooCommerce or any platform with an API, and in-house shops whose items live in the CRM. Every feature works the same on all three.",
      },
      {
        q: "When does the reminder go out?",
        a: "By default, 4 hours after the first message. ZShop stops asking after 24 hours.",
      },
      {
        q: "Do I need ZChat as well as ZShop?",
        a: "Yes. ZShop sends WhatsApp messages from your ZChat number, so it needs ZChat for WhatsApp delivery. Meta's conversation charges are billed separately.",
      },
    ],
    related: ["abandoned-cart-recovery-whatsapp", "whatsapp-order-updates-courier-tracking", "whatsapp-ai-sales-agent"],
  },

  "abandoned-cart-recovery-whatsapp": {
    name: "Abandoned cart recovery on WhatsApp",
    kicker: "Zutok ZShop · Cart recovery",
    relatedProduct: "zshop",
    title: "Abandoned Cart Recovery on WhatsApp in 3 Reminders",
    metaDescription:
      "Zutok ZShop sends 3 WhatsApp cart reminders, after 1 hour, 1 day and 3 days, with a discount you set per step and none on the first. Shopify & WooCommerce.",
    keywords: [
      "abandoned cart recovery WhatsApp",
      "Shopify abandoned cart WhatsApp",
      "WooCommerce abandoned cart WhatsApp reminder",
      "abandoned cart discount sequence",
      "cart reminder timing",
      "recover abandoned checkouts India",
    ],
    h1: "Abandoned cart recovery on WhatsApp in three reminders",
    h1Accent: "in three reminders",
    answer: `Zutok ZShop wins back abandoned checkouts from Shopify, WooCommerce and in-house stores with three WhatsApp reminders: after one hour, one day and three days. The first reminder carries no discount, and you set the discount on the second and third. Promotional messages respect quiet hours and a daily limit. Cart recovery comes with ZShop Growth at ${priceLine("zshop", "Growth")}.`,
    summary:
      "How Zutok ZShop sends three WhatsApp cart reminders (after 1 hour, 1 day and 3 days) with discounts on the later two, quiet hours and one do-not-contact list.",
    facts: [
      { value: "3", label: "reminders: after 1 hour, 1 day and 3 days" },
      { value: "0%", label: "discount on the first reminder" },
      { value: "1", label: "do-not-contact list across every channel" },
    ],
    problem: {
      heading: "What is abandoned cart recovery, and what makes it work?",
      lead: "When a shopper starts checkout and leaves without paying, the store still knows what was in the cart. Abandoned cart recovery reminds that shopper to come back and finish the order, sometimes with a discount.",
      body: [
        "The hard parts are timing and money. Remind too often and you annoy people; offer a discount straight away and you give it to buyers who would have come back anyway. ZShop's sequence is built around both.",
      ],
    },
    approach: {
      heading: "How does WhatsApp abandoned cart recovery work for Shopify and WooCommerce?",
      lead: "ZShop picks up abandoned carts from your connected store and sends three WhatsApp reminders from your ZChat number, after one hour, one day and three days. The first carries no discount; the second and third carry the discounts you set.",
      body: [
        "For example: a friendly nudge after one hour with no discount, a “Still thinking?” message after one day with 5% off, and a “Last chance” message after three days with 10% off. The discounts on the second and third reminders are yours to set.",
        "Discounts, carts, messages and automations live in one place in ZShop, with Meta template mapping for every numbered blank, so each reminder can go out as an approved WhatsApp template with the shopper's details filled in.",
      ],
    },
    extra: [
      {
        heading: "When should abandoned cart reminders be sent, and should the first one include a discount?",
        lead: "ZShop uses one hour, one day and three days, and keeps the first reminder free of any discount, since most buyers come back anyway. The discount is saved for the later reminders, when a shopper needs more of a reason to return.",
        body: [
          "Spacing the reminders out also gives each one a different job: the first is a nudge, the second a small offer and the third a final, larger one.",
        ],
      },
      {
        heading: "Will cart reminders go out late at night?",
        lead: "Not during your quiet hours. Promotional messages, such as discount reminders, respect quiet hours and a daily limit, for example 9 pm to 9 am and one promo per day. Only order updates go out whenever they happen.",
      },
    ],
    steps: {
      heading: "How do you set up cart recovery, step by step?",
      lead: "Five steps, all done once.",
      items: [
        {
          title: "Connect your store",
          body: "Shopify, WooCommerce, a custom site with an API, or an in-house store. Webhooks register themselves.",
        },
        { title: "Map your templates", body: "Map a Meta-approved template to each reminder. ZShop shows which fields fill each blank." },
        { title: "Set the discounts", body: "Choose the discount for the second and third reminders, for example 5% and 10%. The first carries none." },
        { title: "Set quiet hours and a daily limit", body: "For example, no promotions from 9 pm to 9 am and one promo per day." },
        { title: "Let it run", body: "Reminders go out after 1 hour, 1 day and 3 days, from your ZChat number." },
      ],
    },
    features: {
      heading: "What keeps cart reminders useful instead of annoying?",
      lead: "The sequence comes with the guard-rails ZShop applies to every promotional message.",
      items: [
        { icon: "cart", title: "Three-step sequence", body: "Reminders after 1 hour, 1 day and 3 days." },
        { icon: "gift", title: "Discounts on later steps", body: "You set them for reminders two and three; the first carries none." },
        { icon: "moon", title: "Quiet hours", body: "Promotions wait outside hours like 9 pm to 9 am." },
        { icon: "timer", title: "Daily limit", body: "For example, one promo per day." },
        { icon: "ban", title: "One do-not-contact list", body: "“Stop contacting me” applies on every channel." },
        { icon: "workflow", title: "Automations & templates", body: "Discounts, carts, messages and automations in one place." },
        { icon: "users", title: "Buyers → CRM", body: "Every customer becomes a CRM lead, matched on phone number only." },
      ],
    },
    plan: {
      heading: "Which ZShop plan includes abandoned cart recovery?",
      lead: `3-step abandoned-cart recovery comes with ZShop Growth at ${priceLine("zshop", "Growth")}, for up to 3 stores and 3,000 orders a month, along with courier tracking, discounts and automations. ZShop needs ZChat for WhatsApp delivery, and Meta's charges are separate.`,
      includes: [
        { label: "3-step abandoned-cart recovery", from: "Growth" },
        { label: "Discounts & automations", from: "Growth" },
      ],
      highlights: {
        Starter: "1 store, up to 500 orders a month, order updates and COD confirmation.",
        Growth: "Up to 3 stores and 3,000 orders a month, cart recovery and courier tracking.",
        Scale: "Unlimited stores and orders (fair use), for high-volume D2C brands.",
      },
      suite: "Suite Growth",
    },
    faqs: [
      {
        q: "When are the abandoned cart reminders sent?",
        a: "After one hour, one day and three days. The first reminder carries no discount, and you set the discount on the second and third.",
      },
      {
        q: "What happens if a shopper asks to stop receiving messages?",
        a: "It applies everywhere. When someone says “stop contacting me”, ZShop's single do-not-contact list, shared with ZChat, covers every channel.",
      },
      {
        q: "Does cart recovery work with WooCommerce and in-house stores?",
        a: "Yes. Every ZShop feature works the same on Shopify, WooCommerce (or any platform with an API) and in-house shops.",
      },
      {
        q: "Can I change the discounts?",
        a: "Yes. You set the discount on the second and third reminders, for example 5% and 10%. The first reminder carries no discount.",
      },
    ],
    related: ["whatsapp-cod-confirmation", "whatsapp-order-updates-courier-tracking", "whatsapp-broadcast-campaigns"],
  },

  "whatsapp-order-updates-courier-tracking": {
    name: "WhatsApp order updates & courier tracking",
    kicker: "Zutok ZShop · Order updates",
    relatedProduct: "zshop",
    title: "WhatsApp Order Updates & Courier Tracking for Stores",
    metaDescription:
      "Zutok ZShop sends placed, packed, shipped and delivered updates on WhatsApp, tracks courier status and quotes delivery times learned from your real deliveries.",
    keywords: [
      "WhatsApp order status updates",
      "WhatsApp shipping notifications Shopify",
      "courier tracking updates on WhatsApp",
      "out for delivery WhatsApp message",
      "WooCommerce order notification WhatsApp",
      "delivery time estimate",
    ],
    h1: "WhatsApp order status updates and courier tracking for online stores",
    h1Accent: "for online stores",
    answer: `Zutok ZShop sends buyers WhatsApp updates when an order is placed, packed, shipped and delivered, from your ZChat number. Its courier tracking checks status for out-for-delivery, delivered and failed attempts, and learns your real delivery times, like “usually 3–5 days”. Order updates come with ZShop Starter at ${priceLine("zshop", "Starter")}; courier tracking needs ZShop Growth at ${perMonth("zshop", "Growth")}.`,
    summary:
      "How Zutok ZShop sends placed, packed, shipped and delivered updates on WhatsApp, checks courier status and learns your real delivery times.",
    facts: [
      { value: "4", label: "order updates: placed, packed, shipped, delivered" },
      { value: "32", label: "Shopify webhook topics synced" },
      { value: "24 h", label: "WhatsApp's free-form window; later updates use templates" },
    ],
    problem: {
      heading: "What do buyers want to know after they order?",
      lead: "Mostly one thing: where the order is. When nobody tells them, they ask, and every “where is my order?” message is one more chat for your team to answer.",
      body: [
        "Sending the update before they ask answers the question in advance. The buyer sees each stage in one WhatsApp chat, and your team hears only from the people who actually need help.",
      ],
    },
    approach: {
      heading: "How do I send automatic WhatsApp shipping updates to Shopify or WooCommerce customers?",
      lead: "Connect the store to ZShop and map your templates once. From then on ZShop sends an update at each stage (placed, packed, shipped and delivered) from your ZChat number, and buyer replies land in the same inbox.",
      body: [
        "On Shopify, ZShop syncs 32 webhook topics and the webhooks register themselves. WooCommerce, any platform with an API and in-house shops get the same updates.",
        "Order updates are never held back: they go out when they happen, even at 11 pm. Only promotional messages wait for your quiet hours to end.",
      ],
    },
    extra: [
      {
        heading: "Why do WhatsApp order updates need approved templates?",
        lead: "Because of WhatsApp's 24-hour rule. Free-form messages are only allowed within 24 hours of the customer's last message, and most order updates come later than that, so ZShop maps each one to an approved template and fills in the details.",
        body: [
          "Picture a customer who writes to you and then orders. The 24-hour window closes on day one, the order ships on day two and arrives on day four, so both of those updates need a template. You map your Meta templates once, and ZShop shows which fields fill each blank.",
        ],
      },
      {
        heading: "How are delivery time estimates like “3–5 days” worked out?",
        lead: "From your own deliveries. ZShop's courier tracking learns how long your parcels really take and uses that for estimates like “usually 3–5 days”.",
        body: [
          "Courier status is checked every few hours for out-for-delivery, delivered and failed attempts. Tracking links are the ones you set, never guessed.",
        ],
      },
    ],
    steps: {
      heading: "What does the buyer receive, from order to doorstep?",
      lead: "Each stop below is a WhatsApp message from your ZChat number. Cash-on-delivery orders get one extra step before anything ships.",
      items: [
        { title: "Order placed", body: "The order comes in from Shopify, WooCommerce or your counter, and the buyer hears it has been placed." },
        { title: "COD confirmed", body: "Cash-on-delivery buyers are asked to confirm before anything ships." },
        { title: "Packed", body: "A short note that the order is packed and when it ships." },
        { title: "Shipped", body: "A shipped update with your tracking link and the usual delivery time." },
        { title: "Out for delivery", body: "Courier status is checked every few hours, so the buyer knows the parcel arrives today." },
        { title: "Delivered", body: "A delivered message, and the buyer is saved to your CRM." },
      ],
    },
    features: {
      heading: "What's included in ZShop order updates and courier tracking?",
      items: [
        { icon: "package", title: "Four order updates", body: "Placed, packed, shipped and delivered, from your ZChat number." },
        { icon: "truck", title: "Courier tracking", body: "Out-for-delivery, delivered and failed attempts." },
        { icon: "timer", title: "Learned delivery estimates", body: "Based on how long your real deliveries take." },
        { icon: "plug", title: "Your tracking links", body: "Set by you, never guessed." },
        { icon: "moon", title: "Updates at any hour", body: "Order updates go out even at 11 pm; promotions wait." },
        { icon: "inbox", title: "Replies in the inbox", body: "Buyer replies land in the same ZChat inbox." },
        { icon: "zap", title: "Safe testing", body: "Test messages only go to your own test number." },
        { icon: "users", title: "Buyers → CRM", body: "Matched on phone number only, so two people with the same name are never mixed up." },
      ],
    },
    plan: {
      heading: "Which ZShop plan includes order updates and courier tracking?",
      lead: `WhatsApp order updates are in ZShop Starter at ${priceLine("zshop", "Starter")}. Courier tracking and delivery estimates come with ZShop Growth at ${priceLine("zshop", "Growth")}. ZShop needs ZChat for WhatsApp delivery, and Meta's charges are separate.`,
      includes: [
        { label: "WhatsApp order updates", from: "Starter" },
        { label: "Courier tracking & delivery estimates", from: "Growth" },
      ],
      highlights: {
        Starter: "1 store, up to 500 orders a month, order updates and COD confirmation.",
        Growth: "Up to 3 stores and 3,000 orders a month, courier tracking and delivery estimates.",
        Scale: "Unlimited stores and orders (fair use), with a multi-store dashboard.",
      },
      suite: "Suite Starter",
    },
    faqs: [
      {
        q: "Can customers get an out-for-delivery message on WhatsApp?",
        a: "Yes, with courier tracking on ZShop Growth. It checks courier status every few hours and covers out-for-delivery, delivered and failed attempts.",
      },
      {
        q: "What happens when a buyer replies to an order update?",
        a: "The reply lands in the same ZChat inbox as your other chats, so your team can answer it there.",
      },
      {
        q: "Are order updates sent at night?",
        a: "Yes. Order updates always go out when they happen, even at 11 pm. Only promotional messages wait for quiet hours to end.",
      },
      {
        q: "Can I test the messages before buyers see them?",
        a: "Yes. Test messages only go to your own test number.",
      },
      {
        q: "Do I need a website to send order updates?",
        a: "No. Choose an in-house shop, keep your items in the CRM and take orders at the counter. Every automation still works.",
      },
    ],
    related: ["whatsapp-cod-confirmation", "abandoned-cart-recovery-whatsapp", "whatsapp-ai-sales-agent"],
  },

  /* ---------------------------------------------------------------- */
  /* Zloya                                                            */
  /* ---------------------------------------------------------------- */
  "restaurant-membership-prepaid-wallet": {
    name: "Memberships & prepaid wallets",
    kicker: "Zutok Zloya · Memberships",
    relatedProduct: "zloya",
    title: "Membership & Prepaid Wallet Software for Restaurants",
    metaDescription:
      "Zutok Zloya sells yearly perk memberships and prepaid wallets (pay ₹5,000, get ₹6,000 credit) with OTP-protected redemptions and a staff sales leaderboard.",
    keywords: [
      "restaurant membership program software",
      "prepaid wallet for restaurants",
      "café membership card",
      "prepaid dining credit",
      "salon membership software India",
      "staff membership sales leaderboard",
    ],
    h1: "Membership and prepaid wallet software for restaurants, cafés and salons",
    h1Accent: "for restaurants, cafés and salons",
    answer: `Zutok Zloya lets restaurants, cafés, salons and stores sell memberships at the counter: yearly perk bundles, or prepaid wallets like pay ₹5,000 and get ₹6,000 in credit. Every redemption needs a one-time password sent to the guest's phone, and a live leaderboard shows which staff sell the most. Memberships come with Zloya Growth at ${priceLine("zloya", "Growth")}.`,
    summary:
      "How Zutok Zloya sells yearly perk memberships and prepaid wallets at the counter, with OTP-protected redemptions and a staff sales leaderboard.",
    facts: [
      { value: "2", label: "ways to sell: perk bundles and prepaid wallets" },
      { value: "OTP", label: "on every redemption" },
      { value: "Live", label: "staff sales leaderboard" },
    ],
    problem: {
      heading: "Why sell memberships and prepaid wallets?",
      lead: "Because they turn a future visit into a commitment today. The guest pays up front, gets more value than they paid for, and has a reason to keep coming back until the credit or perks are used.",
      body: [
        "Points reward a visit after it happens. A membership or wallet works the other way round: you get the cash before the visit, and the guest's own balance is what brings them back.",
      ],
    },
    approach: {
      heading: "How does a prepaid wallet membership work for a restaurant or café?",
      lead: "The guest pays a fixed amount and gets a bigger credit to spend over a set period, for example ₹6,000 of dining credit for ₹5,000. Each time they use it, a one-time password sent to their phone confirms the redemption.",
      body: [
        "Zloya sells two kinds of plan. A perk bundle is a yearly membership with benefits: the example “Club Dine-In 365” bundles ₹500 of wallet credit, 15% off every order, a free appetiser every month and a birthday cake. A prepaid wallet is credit with a validity: the example “Prepaid Wallet 5K” is ₹5,000 for ₹6,000 of dining credit over 180 days, including ₹1,000 bonus credit, with 5% off every order.",
        "Those are examples, and the plans you sell are your own. Retention analytics then show prepaid membership revenue on the same dashboard as your repeat guest rate.",
      ],
    },
    extra: [
      {
        heading: "Can staff sell memberships at the counter, with each sale tracked?",
        lead: "Yes. Memberships are sold at the counter, and a live staff sales leaderboard shows how many each person has sold, so your team competes to sell them.",
      },
    ],
    steps: {
      heading: "How do you start selling memberships, step by step?",
      lead: "Everything happens at the counter you already use for points.",
      items: [
        { title: "Open the POS counter", body: "Zloya's POS quick counter runs in any browser, so no POS integration is needed." },
        { title: "Create your plans", body: "A yearly perk bundle, a prepaid wallet, or both." },
        { title: "Sell at the counter", body: "Staff sell memberships to guests, and every sale shows on the leaderboard." },
        { title: "Redeem with an OTP", body: "When the guest uses credit or perks, a one-time password to their phone confirms it." },
        { title: "Watch the revenue", body: "Prepaid membership revenue sits next to your repeat guest rate." },
      ],
    },
    features: {
      heading: "What's included in Zloya memberships and wallets?",
      items: [
        { icon: "crown", title: "Perk bundles", body: "Yearly memberships with benefits like discounts and monthly treats." },
        { icon: "wallet", title: "Prepaid wallets", body: "Like pay ₹5,000 and get ₹6,000 in credit." },
        { icon: "scan", title: "OTP-protected redemption", body: "Every redemption needs a one-time password." },
        { icon: "tags", title: "Locked to one number", body: "Every coupon is locked to one phone number." },
        { icon: "chart", title: "Staff sales leaderboard", body: "A live ranking of membership sales by staff member." },
        { icon: "building", title: "Every outlet", body: "The same guest profile is shared across outlets." },
        { icon: "pie", title: "Membership revenue", body: "Prepaid membership revenue on the retention dashboard." },
      ],
    },
    plan: {
      heading: "Which Zloya plan includes memberships and prepaid wallets?",
      lead: `Memberships, prepaid wallets and the staff sales leaderboard come with Zloya Growth at ${priceLine("zloya", "Growth")}, for up to 3 outlets. Zloya Chain at ${perMonth("zloya", "Chain")} has no outlet limit.`,
      includes: [
        { label: "Memberships & prepaid wallets", from: "Growth" },
        { label: "Staff sales leaderboard", from: "Growth" },
      ],
      highlights: {
        "Single Outlet": "1 outlet, POS counter, points and 4 VIP tiers.",
        Growth: "Up to 3 outlets, memberships, prepaid wallets and automated journeys.",
        Chain: "Unlimited outlets, customers 360° across outlets, API / POS integration.",
      },
      suite: "Suite Growth",
    },
    faqs: [
      {
        q: "How are membership and wallet redemptions protected from misuse?",
        a: "Every redemption needs a one-time password sent to the guest's phone, and every coupon is locked to one phone number.",
      },
      {
        q: "Does Zloya work across multiple outlets?",
        a: "Yes. The same guest profile is shared across every outlet. Growth covers up to three outlets and Chain has no limit.",
      },
      {
        q: "Do I need a POS integration to sell memberships?",
        a: "No. The POS quick counter runs in any browser, so the cashier enters the bill amount and Zloya handles the rest. API / POS integration is available on Chain.",
      },
      {
        q: "Can a salon or store sell memberships too, not just a restaurant?",
        a: "Yes. Zloya is built for restaurants, cafés, salons and stores.",
      },
    ],
    related: ["automated-winback-birthday-campaigns", "restaurant-qr-code-customer-data"],
  },

  "restaurant-qr-code-customer-data": {
    name: "Smart QR codes for guest data",
    kicker: "Zutok Zloya · Smart QR codes",
    relatedProduct: "zloya",
    title: "Smart QR Codes on Tables & Delivery Boxes for Guest Data",
    metaDescription:
      "Put Zutok Zloya smart QR codes on table standees, Swiggy and Zomato boxes and partner stores to collect guest numbers, then track scans, sign-ups and opt-ins.",
    keywords: [
      "QR code to collect customer data for restaurants",
      "QR code on Swiggy and Zomato delivery boxes",
      "turn delivery customers into dine-in guests",
      "table standee QR sign-up",
      "QR code opt-in tracking",
      "restaurant customer database",
    ],
    h1: "Collect restaurant customer data with QR codes on tables and Swiggy/Zomato boxes",
    h1Accent: "on tables and Swiggy/Zomato boxes",
    answer: `Zutok Zloya gives you smart QR codes for table standees, Swiggy and Zomato delivery boxes and partner stores. Guests scan, share their phone number and get a perk you choose, and each code shows its own scans, sign-ups and opt-in rate. Zloya Single Outlet at ${priceLine("zloya", "Single Outlet")} includes 5 codes, and Growth has unlimited codes.`,
    summary:
      "How Zutok Zloya smart QR codes on tables, Swiggy and Zomato boxes and partner stores collect guest numbers, with scans and opt-ins tracked per code.",
    facts: [
      { value: "3", label: "places to put them: tables, delivery boxes, partner stores" },
      { value: "Per code", label: "scans, sign-ups and opt-in rate" },
      { value: "5", label: "codes on Single Outlet, unlimited on Growth" },
    ],
    problem: {
      heading: "Why should a restaurant build its own guest list?",
      lead: "Because a guest you can't contact is a guest you can't invite back. People who order through a delivery app, or pay and leave, usually don't leave a number with you.",
      body: [
        "Without a number you can't send a welcome offer, a birthday greeting or a “we miss you” voucher. A QR code with a perk gives the guest a reason to share their number, and gives you a list you've built yourself, with their agreement.",
      ],
    },
    approach: {
      heading: "How can a restaurant build its own customer list from Swiggy and Zomato orders?",
      lead: "Put a Zloya QR code on every Swiggy and Zomato box, with a perk for scanning like flat ₹150 off when they dine in. The guest scans, shares their number and gets the perk, and you have a guest you can bring back to the restaurant.",
      body: [
        "The same idea works inside the restaurant on table standees, and at partner stores. Each placement gets its own code, so every code's scans, sign-ups and opt-in rate are tracked separately.",
        "New sign-ups then appear in Zloya's smart segments, which update automatically: New, Regulars, Potential VIPs, Slipping, Lost and upcoming birthdays.",
      ],
    },
    extra: [
      {
        heading: "What perk should I offer guests for scanning a QR code?",
        lead: "Match the perk to where the code is. On a delivery box, offer something that brings the guest in, like flat ₹150 off when they dine in. On a table standee, offer something they can use with you, like 50 bonus points.",
        body: [
          "You choose the perk for each code. Because every code is tracked separately, you can compare scans, sign-ups and opt-in rate side by side and see which placement and perk bring in the most guests.",
        ],
      },
    ],
    steps: {
      heading: "How do you set up smart QR codes, step by step?",
      lead: "One code per placement, one perk per code.",
      items: [
        { title: "Create a code per placement", body: "Table standees, Swiggy and Zomato boxes, and each partner store." },
        { title: "Pick the perk", body: "What guests get for signing up, such as bonus points or a dine-in offer." },
        { title: "Print and place", body: "Print standees, stick the QR on delivery packs and log in at the POS counter." },
        { title: "Guests scan and join", body: "They share their number and get the perk." },
        { title: "Compare the codes", body: "Scans, sign-ups and opt-in rate for each code." },
      ],
    },
    features: {
      heading: "What do Zloya's smart QR codes include?",
      items: [
        { icon: "qr", title: "A code per placement", body: "Tables, Swiggy and Zomato boxes and partner stores." },
        { icon: "gift", title: "A perk per code", body: "Bonus points, a dine-in offer or another perk you choose." },
        { icon: "chart", title: "Numbers per code", body: "Scans, sign-ups and opt-in rate." },
        { icon: "pie", title: "Smart segments", body: "New, Regulars, Potential VIPs, Slipping, Lost and birthdays." },
        { icon: "scan", title: "POS quick counter", body: "Guests earn points on every bill, in any browser." },
        { icon: "crown", title: "VIP tiers", body: "Bronze, Silver, Gold and Platinum, with 1× to 2× points." },
      ],
    },
    plan: {
      heading: "How many smart QR codes can I create on each plan?",
      lead: `Zloya Single Outlet at ${priceLine("zloya", "Single Outlet")} includes 5 smart QR codes. Zloya Growth at ${perMonth("zloya", "Growth")} has unlimited smart QR codes, for up to 3 outlets.`,
      includes: [
        { label: "Smart QR codes", from: "Single Outlet" },
        { label: "Unlimited smart QR codes", from: "Growth" },
      ],
      highlights: {
        "Single Outlet": "1 outlet, POS counter, points, 4 VIP tiers and 5 smart QR codes.",
        Growth: "Up to 3 outlets, unlimited smart QR codes, memberships and journeys.",
        Chain: "Unlimited outlets, custom journeys & segments, API / POS integration.",
      },
    },
    faqs: [
      {
        q: "Where can I put the QR codes?",
        a: "On table standees, on Swiggy and Zomato delivery boxes and at partner stores. Each placement gets its own code.",
      },
      {
        q: "How do I measure which QR code works best?",
        a: "Compare each code's scans, sign-ups and opt-in rate. Zloya tracks them for every code separately.",
      },
      {
        q: "What happens after a guest signs up?",
        a: "They appear in Zloya's smart segments, which update automatically: New, Regulars, Potential VIPs, Slipping, Lost and upcoming birthdays.",
      },
      {
        q: "Do I need a POS system?",
        a: "No. Zloya's POS quick counter runs in any browser. The cashier enters the bill amount and Zloya handles the rest.",
      },
    ],
    related: ["restaurant-membership-prepaid-wallet", "automated-winback-birthday-campaigns"],
  },

  "automated-winback-birthday-campaigns": {
    name: "Birthday, win-back & expiry journeys",
    kicker: "Zutok Zloya · Automated journeys",
    relatedProduct: "zloya",
    title: "Automated Birthday, Win-Back & Points-Expiry Journeys",
    metaDescription:
      "Zutok Zloya sends welcome, birthday, 30-day win-back, points-expiry and feedback messages on its own, each with a coupon locked to the guest's phone number.",
    keywords: [
      "customer win-back campaign automation",
      "birthday offer automation for restaurants",
      "points expiry reminder",
      "lapsed customer re-engagement",
      "customer retention automation India",
      "customer segmentation slipping lost",
    ],
    h1: "Automated win-back, birthday and points-expiry campaigns for your regulars",
    h1Accent: "for your regulars",
    answer: `Zutok Zloya runs five ready-made retention journeys on its own: a first-visit welcome, a birthday greeting, a 30-day “we miss you” win-back, a points-expiry alert and post-visit feedback. Each message carries a coupon locked to the guest's phone number, and guests are sorted automatically into segments like Slipping (30 days) and Lost (60+ days). Journeys come with Zloya Growth at ${priceLine("zloya", "Growth")}.`,
    summary:
      "How Zutok Zloya's five automated journeys (welcome, birthday, 30-day win-back, points expiry and feedback) bring guests back with phone-locked coupons.",
    facts: [
      { value: "5", label: "ready-made retention journeys" },
      { value: "30 days", label: "without a visit puts a guest in Slipping" },
      { value: "60+ days", label: "without a visit puts a guest in Lost" },
    ],
    problem: {
      heading: "What is a win-back campaign?",
      lead: "A win-back campaign is a message, usually with an offer, sent to a customer who used to come in and has gone quiet. The aim is to bring them back before the habit fades.",
      body: [
        "Done by hand, it means checking who hasn't visited for a month, writing to each of them and tracking who used the offer. That is hard to keep up while running a busy floor, which is why it works best automated.",
      ],
    },
    approach: {
      heading: "How do I automatically win back customers who haven't visited in 30 days?",
      lead: "Turn on Zloya's “We miss you (30 days)” journey. Guests who haven't been back for 30 days get a message with a voucher, for example flat ₹100 off, locked to their phone number.",
      body: [
        "The same 30-day mark puts them in the Slipping segment, and after 60 days without a visit they move to Lost, so you can see at a glance who still needs a reason to return. Redeeming the voucher at the counter needs a one-time password sent to the guest's phone.",
        "Win-back is one of five journeys that run the same way, each with its own coupon: a welcome after the first visit, a birthday greeting, a points-expiry alert and a post-visit feedback request.",
      ],
    },
    extra: [
      {
        heading: "What should a restaurant birthday offer include?",
        lead: "Something personal that they use by coming in. Zloya's birthday journey sends a personal greeting with a gift and double points, for example a free dessert plus double points.",
        body: ["Anniversaries work the same way, and upcoming birthdays are their own smart segment, so you can see whose day is coming."],
      },
      {
        heading: "How do I remind customers before their loyalty points expire?",
        lead: "Turn on the points-expiry journey. Zloya alerts the guest to use their points before they expire, which is a reason to visit that they've already earned.",
      },
      {
        heading: "How are customers grouped into segments like Slipping or Lost?",
        lead: "Automatically. Zloya keeps six smart segments up to date without any manual tagging. Slipping means 30 days without a visit, and Lost means 60 days or more.",
        bullets: ["New guests", "Regulars", "Potential VIPs", "Slipping (30 days)", "Lost (60+ days)", "Upcoming birthdays"],
      },
    ],
    steps: {
      heading: "Which journeys does Zloya run, and when?",
      lead: "Five ready-made journeys follow a guest from the first visit onwards. The offers below are examples.",
      items: [
        { title: "First-visit welcome", body: "After the first visit, for example 15% off, valid for 14 days." },
        { title: "Birthday celebration", body: "A personal greeting with a gift, such as a free dessert, and double points." },
        { title: "We miss you (30 days)", body: "For guests who haven't been back in 30 days, for example a flat ₹100 off voucher." },
        { title: "Points expiry alert", body: "A nudge to use their points before they expire." },
        { title: "Post-visit feedback", body: "A 30-second rating link after the visit." },
      ],
    },
    features: {
      heading: "What keeps Zloya's journeys safe and measurable?",
      items: [
        { icon: "repeat", title: "Runs on its own", body: "Journeys go out automatically once they're switched on." },
        { icon: "tags", title: "Phone-locked coupons", body: "Every coupon is locked to one phone number." },
        { icon: "scan", title: "OTP on redemption", body: "Every redemption needs a one-time password." },
        { icon: "pie", title: "Smart segments", body: "Six segments that update automatically." },
        { icon: "chart", title: "Retention analytics", body: "Repeat guest rate and loyalty-tracked sales on one dashboard." },
        { icon: "building", title: "Every outlet", body: "The same guest profile across outlets." },
        { icon: "workflow", title: "Custom journeys", body: "Build your own journeys and segments on Chain." },
      ],
    },
    plan: {
      heading: "Which Zloya plan includes birthday, win-back and expiry journeys?",
      lead: `Birthday, win-back and expiry journeys come with Zloya Growth at ${priceLine("zloya", "Growth")}, for up to 3 outlets. Custom journeys and segments come with Zloya Chain at ${perMonth("zloya", "Chain")}.`,
      includes: [
        { label: "Birthday, win-back & expiry journeys", from: "Growth" },
        { label: "Custom journeys & segments", from: "Chain" },
      ],
      highlights: {
        "Single Outlet": "1 outlet, POS counter, points, 4 VIP tiers and feedback.",
        Growth: "Up to 3 outlets, ready-made journeys, memberships and unlimited QR codes.",
        Chain: "Unlimited outlets, custom journeys & segments, customers 360°.",
      },
      suite: "Suite Growth",
    },
    faqs: [
      {
        q: "Can loyalty coupons be shared or misused?",
        a: "No. Every coupon is locked to one phone number, and every redemption needs a one-time password sent to the guest's phone.",
      },
      {
        q: "Can I create my own journeys and segments?",
        a: "Yes, on Zloya Chain, which adds custom journeys and segments. Growth includes the ready-made birthday, win-back and expiry journeys.",
      },
      {
        q: "Does it work across several outlets?",
        a: "Yes. The same guest profile is shared across every outlet. Growth covers up to three outlets and Chain has no limit.",
      },
      {
        q: "How do I know if the journeys are working?",
        a: "Zloya's retention analytics show your repeat guest rate, loyalty-tracked sales and prepaid membership revenue on one dashboard.",
      },
    ],
    related: ["restaurant-qr-code-customer-data", "restaurant-membership-prepaid-wallet"],
  },

  /* ---------------------------------------------------------------- */
  /* Zutok CRM                                                        */
  /* ---------------------------------------------------------------- */
  "gst-invoicing-crm": {
    name: "CRM with GST invoicing",
    kicker: "Zutok CRM · GST invoicing",
    relatedProduct: "crm",
    title: "CRM with GST Invoicing, Proposals & Estimates in ₹",
    metaDescription: `Send proposals and estimates, turn accepted ones into GST invoices with CGST and SGST, record payments and export PDFs in bulk. Zutok CRM from ${perMonth("crm", "Starter")}.`,
    keywords: [
      "CRM with GST invoicing",
      "GST invoice software with CRM",
      "proposal and estimate software India",
      "quotation to invoice",
      "recurring invoices India",
      "CGST SGST invoice",
    ],
    h1: "A CRM with GST invoicing, from proposal to payment",
    h1Accent: "from proposal to payment",
    answer: `Zutok CRM keeps billing in the same place as your leads and customers. Send a proposal or estimate, turn it into a GST invoice once it's accepted and record the payment. Invoices are in rupees with tax rates like CGST and SGST on every line, plus recurring invoices, credit notes and bulk PDF export. It's in every plan, from CRM Starter at ${priceLine("crm", "Starter")}.`,
    summary:
      "How Zutok CRM turns accepted proposals and estimates into GST invoices with CGST and SGST lines, payments, credit notes and bulk PDF export.",
    facts: [
      { value: "CGST + SGST", label: "tax rates on every invoice line" },
      { value: "Recurring", label: "invoices and credit notes, built in" },
      { value: "Bulk PDF", label: "export for your accountant" },
    ],
    problem: {
      heading: "Why keep GST invoicing inside your CRM?",
      lead: "Because the quote, the customer and the payment are one story. When proposals live in one tool, invoices in another and customer details in a spreadsheet, every invoice starts with copying details across, and nobody can see who has been quoted, billed and paid.",
    },
    approach: {
      heading: "Can I convert an accepted proposal or estimate into an invoice?",
      lead: "Yes. In Zutok CRM you send a proposal or estimate, turn it into a GST invoice once the customer accepts it, and record the payment against it.",
      body: [
        "Estimate requests can also come from your website, so a request becomes an estimate and then an invoice in one place. Recurring invoices handle repeat billing, credit notes handle corrections, and overdue reminders follow up on unpaid invoices.",
        "Every invoice sits on the customer's profile alongside their contacts, projects and support tickets, so sales and accounts work from the same record.",
      ],
    },
    extra: [
      {
        heading: "Can Zutok CRM create GST invoices with CGST and SGST?",
        lead: "Yes. Invoices are in rupees with tax fields, and tax rates such as CGST and SGST go on every line.",
        body: ["You set up your tax rates and invoice format once, when you set up the CRM, and every invoice uses them."],
      },
    ],
    steps: {
      heading: "How does billing work in Zutok CRM, step by step?",
      lead: "From the first quote to your accountant's folder, without leaving the CRM.",
      items: [
        { title: "Set up tax rates and format", body: "Add your tax rates and invoice format during setup." },
        { title: "Send a proposal or estimate", body: "Or collect an estimate request from your website." },
        { title: "Convert to an invoice", body: "When it's accepted, turn it into a GST invoice with tax on every line." },
        { title: "Record the payment", body: "Record payments against the invoice and issue credit notes when needed." },
        { title: "Export for your accountant", body: "Bulk PDF export, or CSV whenever you need the data." },
      ],
    },
    features: {
      heading: "What does Zutok CRM's invoicing include?",
      items: [
        { icon: "file", title: "Proposals & estimates", body: "Send them, and turn accepted ones into invoices." },
        { icon: "layers", title: "Website estimate requests", body: "Collect estimate requests from your website." },
        { icon: "receipt", title: "GST invoices in ₹", body: "Tax rates like CGST and SGST on every line." },
        { icon: "repeat", title: "Recurring invoices", body: "For customers you bill on a schedule." },
        { icon: "wallet", title: "Payments & credit notes", body: "Record payments and issue credit notes." },
        { icon: "timer", title: "Overdue reminders", body: "Follow-ups on unpaid invoices." },
        { icon: "boxes", title: "Bulk PDF & CSV export", body: "Everything your accountant needs, in one export." },
        { icon: "building", title: "Customer profiles", body: "Invoices next to contacts, projects and tickets." },
      ],
    },
    plan: {
      heading: "Which Zutok CRM plan includes GST invoicing?",
      lead: `Proposals, estimates and GST invoices are in every Zutok CRM plan, starting with CRM Starter at ${priceLine("crm", "Starter")} for up to 3 users. CRM Growth at ${perMonth("crm", "Growth")} adds subscriptions, expenses and contracts for up to 10 users.`,
      includes: [
        { label: "Proposals, estimates & GST invoices", from: "Starter" },
        { label: "Subscriptions & expenses", from: "Growth" },
      ],
      highlights: {
        Starter: "Up to 3 users. Leads, pipeline, proposals, estimates and GST invoices.",
        Growth: "Up to 10 users. Adds HRM, inventory, contracts, expenses and subscriptions.",
        Enterprise: "Unlimited users, Real Estate suite and custom fields for every module.",
      },
      suite: "Suite Starter",
    },
    faqs: [
      {
        q: "Does it support recurring invoices and credit notes?",
        a: "Yes. Recurring invoices and credit notes are built in, along with overdue reminders.",
      },
      {
        q: "How do I send all my invoices to my accountant?",
        a: "Export them in bulk as PDF. You can also export customers, leads and invoices to CSV whenever you like.",
      },
      {
        q: "Can I control who sees invoices?",
        a: "Yes. Each staff member gets a role with its own permissions, so sales, accounts and HR only see what they need.",
      },
      {
        q: "Can I bring in my existing customers?",
        a: "Yes. Import customers, leads and items from Excel or CSV, or from your old CRM. Zutok helps with the import during onboarding.",
      },
    ],
    related: ["indiamart-meta-lead-ads-crm", "crm-with-hrm-payroll"],
  },

  "indiamart-meta-lead-ads-crm": {
    name: "IndiaMART & Meta Lead Ads CRM",
    kicker: "Zutok CRM · Leads & pipeline",
    relatedProduct: "crm",
    title: "CRM for IndiaMART & Meta Lead Ads Leads in One Pipeline",
    metaDescription:
      "Leads from IndiaMART, Meta Lead Ads, WhatsApp and Instagram chats and your website land on one Zutok CRM board, from Enquiry to Follow-up, Hot and Customer.",
    keywords: [
      "IndiaMART lead management CRM",
      "Meta Lead Ads CRM integration",
      "Facebook lead ads to CRM India",
      "IndiaMART leads to CRM automatically",
      "lead pipeline software India",
      "WhatsApp leads CRM",
    ],
    h1: "Manage IndiaMART and Meta Lead Ads leads in one CRM pipeline",
    h1Accent: "in one CRM pipeline",
    answer: `Zutok CRM syncs leads from IndiaMART and Meta Lead Ads into one pipeline, next to estimate requests from your website and, with ZChat, leads from WhatsApp and Instagram chats. Every lead moves through four stages, Enquiry, Follow-up, Hot and Customer, with tasks and reminders on each. Both integrations are in every plan, from CRM Starter at ${priceLine("crm", "Starter")}.`,
    summary:
      "How Zutok CRM syncs IndiaMART and Meta Lead Ads leads into one pipeline with chat and website leads, from Enquiry to Customer.",
    facts: [
      { value: "4", label: "lead stages, from Enquiry to Customer" },
      { value: "2", label: "lead sources synced in: IndiaMART and Meta Lead Ads" },
      { value: "1", label: "pipeline for every lead" },
    ],
    problem: {
      heading: "Why do IndiaMART and ad leads slip through the cracks?",
      lead: "Because they arrive in different places. IndiaMART enquiries sit in your IndiaMART account, ad leads sit in Meta, and chats sit on someone's phone, so follow-ups depend on someone remembering to check each one.",
    },
    approach: {
      heading: "How do I get IndiaMART leads into a CRM automatically?",
      lead: "Use Zutok CRM's Leads & Pipeline module. IndiaMART and Meta Lead Ads leads sync in on their own, with field mapping for their details, and land as enquiries on the same board as every other lead.",
      body: [
        "Other sources join the same pipeline: estimate requests from your website, imports from Excel or CSV and, if you use ZChat, every WhatsApp, Instagram, Messenger or Telegram conversation, which becomes a lead with its source.",
        "From there, tasks and reminders on every lead keep follow-ups on time, and lead reports and goals tracking sit in the same CRM.",
      ],
    },
    extra: [
      {
        heading: "What lead stages does Zutok CRM use?",
        lead: "The pipeline runs Enquiry → Follow-up → Hot → Customer. Every lead starts as an enquiry and moves along the board until it becomes a customer.",
        body: ["You set up your lead stages, staff roles and permissions when you set up the CRM."],
      },
    ],
    steps: {
      heading: "How do you bring all your lead sources into Zutok CRM?",
      lead: "Start with the leads you already have, then connect the sources that keep sending new ones.",
      items: [
        { title: "Import what you have", body: "Bring leads in from Excel or CSV, or from your old CRM. Zutok helps during onboarding." },
        { title: "Connect IndiaMART and Meta Lead Ads", body: "New leads from both sync in, with field mapping for their details." },
        { title: "Add chats and your website", body: "With ZChat, every conversation becomes a lead. Estimate requests from your website arrive too." },
        { title: "Set stages and roles", body: "Your lead stages, plus staff roles and permissions." },
        { title: "Follow up", body: "Tasks and reminders on every lead, from Enquiry to Customer." },
      ],
    },
    features: {
      heading: "What's in the Leads & Pipeline module?",
      items: [
        { icon: "building", title: "IndiaMART leads", body: "IndiaMART enquiries sync into the CRM." },
        { icon: "megaphone", title: "Meta Lead Ads", body: "Leads from Facebook and Instagram lead forms, synced in." },
        { icon: "inbox", title: "Chat leads from ZChat", body: "Every conversation becomes a lead with its source." },
        { icon: "file", title: "Website estimate requests", body: "Requests from your website land in the CRM." },
        { icon: "layers", title: "Field mapping", body: "Map incoming details to your lead fields." },
        { icon: "calendar", title: "Tasks & reminders", body: "On every lead, so no follow-up is missed." },
        { icon: "users", title: "Four-stage pipeline", body: "Enquiry, Follow-up, Hot and Customer." },
        { icon: "chart", title: "Lead reports & goals", body: "Reports on leads, plus company goals." },
      ],
    },
    plan: {
      heading: "Which plan includes IndiaMART and Meta Lead Ads integration?",
      lead: `Meta Lead Ads and IndiaMART leads are in every Zutok CRM plan, starting with CRM Starter at ${priceLine("crm", "Starter")} for up to 3 users. Leads from chats need ZChat, from ${perMonth("zchat", "Starter")}.`,
      includes: [
        { label: "Meta Lead Ads & IndiaMART leads", from: "Starter" },
        { label: "Automation & reports", from: "Growth" },
      ],
      highlights: {
        Starter: "Up to 3 users. Leads, customers & pipeline, proposals and GST invoices.",
        Growth: "Up to 10 users. Adds automation & reports, HRM and inventory.",
        Enterprise: "Unlimited users and custom fields for every module.",
      },
      suite: "Suite Starter",
    },
    faqs: [
      {
        q: "Can Facebook and Instagram Lead Ads go straight into my CRM?",
        a: "Yes. Meta Lead Ads leads sync into Zutok CRM and land in the same pipeline as your IndiaMART, chat and website leads.",
      },
      {
        q: "Can I import my existing leads from Excel?",
        a: "Yes. Import customers, leads and items from Excel or CSV, or from your old CRM. Zutok helps with the import during onboarding.",
      },
      {
        q: "Do WhatsApp chats become leads too?",
        a: "Yes, with ZChat. Every new conversation creates a lead in Zutok CRM with its source, so sales can follow it up from one place.",
      },
      {
        q: "Can I limit what each salesperson sees?",
        a: "Yes. Each staff member gets a role with its own permissions, so everyone sees only what they need.",
      },
    ],
    related: ["gst-invoicing-crm", "whatsapp-ai-sales-agent", "crm-with-hrm-payroll"],
  },

  "crm-with-hrm-payroll": {
    name: "CRM with HRM & payroll",
    kicker: "Zutok CRM · HRM & payroll",
    relatedProduct: "crm",
    title: "CRM with HRM, Payroll, Attendance & Leave in One Place",
    metaDescription:
      "Zutok CRM Growth adds HRM and payroll: staff records, contracts, insurance, salary, shift planner, attendance and leave, beside your leads and invoices.",
    keywords: [
      "CRM with HRM and payroll",
      "staff attendance and leave software",
      "shift planner software India",
      "employee contract expiry alerts",
      "HR and sales software in one",
      "CRM with attendance management",
    ],
    h1: "A CRM with HRM, payroll, attendance and leave built in",
    h1Accent: "built in",
    answer: `Zutok CRM Growth adds HR to the same system as your leads and invoices: staff records, contracts, insurance and salary, with alerts before a contract expires, plus a shift planner, attendance and leave requests. Roles and permissions keep HR details with the people who need them. HRM starts with CRM Growth at ${priceLine("crm", "Growth")}, for up to 10 users.`,
    summary:
      "How Zutok CRM Growth keeps staff records, contracts, salary, shifts, attendance and leave in the same system as your sales.",
    facts: [
      { value: "10", label: "users on CRM Growth, where HRM starts" },
      { value: "Alerts", label: "before a staff contract expires" },
      { value: "Roles", label: "so HR, sales and accounts each see their part" },
    ],
    problem: {
      heading: "Why run HR in the same system as sales?",
      lead: "Because a small business has one team, not two. When staff details sit in spreadsheets and sales in a CRM, shifts, leave and contract renewals are tracked away from the rest of the work, and things get missed.",
      body: [
        "Zutok's HRM covers the day-to-day records a growing team needs (staff, contracts, insurance, salary, shifts, attendance and leave) inside the same CRM as your leads, invoices and projects.",
      ],
    },
    approach: {
      heading: "Can I manage staff attendance and leave inside my CRM?",
      lead: "Yes. From CRM Growth, Zutok CRM includes a shift planner with shift tables, attendance and leave requests, plus attendance reports, without the spreadsheets.",
      body: [
        "Staff records live in the same CRM: each person's contract, insurance and salary, with alerts before a contract expires.",
        "Each staff member gets a role with its own permissions, so sales, accounts and HR only see what they need.",
      ],
    },
    extra: [
      {
        heading: "Does Zutok CRM keep payroll and salary records?",
        lead: "Yes. HRM & payroll keeps staff records, contracts, insurance and salary for each person, and alerts you before a contract expires.",
      },
    ],
    steps: {
      heading: "How do you set up HR in Zutok CRM, step by step?",
      lead: "HR sits next to the rest of the CRM, so setup is mostly adding your people.",
      items: [
        { title: "Choose CRM Growth", body: "HRM, payroll, attendance and leave start with Growth, for up to 10 users." },
        { title: "Add your staff", body: "Records with contracts, insurance and salary." },
        { title: "Set roles and permissions", body: "So sales, accounts and HR each see only what they need." },
        { title: "Plan shifts", body: "Build shift tables in the shift planner." },
        { title: "Run attendance and leave", body: "Attendance, leave requests and attendance reports in one place." },
        { title: "Watch contract dates", body: "Get an alert before a staff contract expires." },
      ],
    },
    features: {
      heading: "What's in Zutok CRM's HRM and payroll?",
      items: [
        { icon: "usercog", title: "Staff records", body: "Every staff member's details in one place." },
        { icon: "file", title: "Contracts with alerts", body: "An alert before a contract expires." },
        { icon: "support", title: "Insurance", body: "Insurance details on each staff record." },
        { icon: "wallet", title: "Salary & payroll", body: "Salary records for each person." },
        { icon: "calendar", title: "Shift planner", body: "Shifts and shift tables." },
        { icon: "timer", title: "Attendance", body: "Attendance tracking with reports." },
        { icon: "moon", title: "Leave requests", body: "Requests and approvals without the spreadsheets." },
        { icon: "users", title: "Roles & permissions", body: "Sales, accounts and HR each see their part." },
        { icon: "boxes", title: "Inventory in the same plan", body: "CRM Growth also adds inventory and warehouse." },
      ],
    },
    plan: {
      heading: "Which plan includes HRM and payroll?",
      lead: `HRM, payroll, attendance and leave come with CRM Growth at ${priceLine("crm", "Growth")}, for up to 10 users, together with inventory, contracts, expenses and subscriptions. They are not in CRM Starter.`,
      includes: [
        { label: "HRM, payroll, attendance & leave", from: "Growth" },
        { label: "Inventory & warehouse", from: "Growth" },
      ],
      highlights: {
        Starter: "Up to 3 users. Leads, invoices, projects and tickets.",
        Growth: "Up to 10 users. HRM, payroll, attendance & leave, plus inventory.",
        Enterprise: "Unlimited users, Real Estate suite and custom fields for every module.",
      },
      suite: "Suite Growth",
    },
    faqs: [
      {
        q: "Can I get alerts before staff contracts expire?",
        a: "Yes. HRM & payroll alerts you before a staff contract expires.",
      },
      {
        q: "Can I limit what HR, sales and accounts staff can see?",
        a: "Yes. Each staff member gets a role with its own permissions, so sales, accounts and HR only see what they need.",
      },
      {
        q: "Is HRM included in CRM Starter?",
        a: `No. HRM, payroll, attendance and leave start with CRM Growth at ${perMonth("crm", "Growth")}. Starter, at ${perMonth("crm", "Starter")}, covers leads, sales and projects for up to 3 users.`,
      },
      {
        q: "What else comes with CRM Growth?",
        a: "Inventory and warehouse, contracts, expenses, subscriptions, and automation and reports, on top of everything in Starter.",
      },
    ],
    related: ["gst-invoicing-crm", "indiamart-meta-lead-ads-crm"],
  },
};

/** Every solution, grouped by product in the order of `productList`. */
export const solutions: Solution[] = (Object.keys(data) as SolutionSlug[]).map((slug) => ({ slug, ...data[slug] }));

export const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s])) as Record<SolutionSlug, Solution>;

export const solutionSlugs: SolutionSlug[] = solutions.map((s) => s.slug);

export const getSolution = (slug: string): Solution | undefined => solutionBySlug[slug as SolutionSlug];

/** Trailing-slash route, as the static export serves it. */
export const solutionPath = (slug: SolutionSlug) => `/solutions/${slug}/`;

export const solutionsFor = (product: ProductSlug) => solutions.filter((s) => s.relatedProduct === product);

/** The plan a solution starts on, with its monthly price (billed monthly, excl. GST). */
export function startingPlan(s: Solution) {
  const name = s.plan.includes[0].from;
  return { group: s.relatedProduct, plan: name, monthly: pricedPlan(s.relatedProduct, name).monthly };
}

export const SOLUTIONS_HUB = {
  title: "Solutions: WhatsApp, Store, Loyalty & CRM Use Cases",
  description:
    "How Zutok handles WhatsApp AI sales, broadcasts, comment-to-DM, COD confirmation, cart recovery, order tracking, memberships, loyalty journeys, GST and HRM.",
  h1: "WhatsApp, store, loyalty and CRM solutions for Indian businesses",
  h1Accent: "for Indian businesses",
  intro:
    "Each page below explains one job Zutok does, such as confirming COD orders on WhatsApp or selling prepaid memberships: how it works step by step, and which plan includes it, with prices in rupees. Every solution runs on Zutok CRM and its three products: ZChat for chats and AI, ZShop for online stores and Zloya for loyalty.",
  keywords: [
    "Zutok solutions",
    "WhatsApp automation for business India",
    "WhatsApp COD confirmation",
    "abandoned cart recovery WhatsApp",
    "restaurant loyalty and membership software",
    "CRM with GST invoicing",
  ],
};

// Catch copy that drifts from pricing.ts or points at a page that doesn't exist.
for (const s of solutions) {
  const group = pricing.find((g) => g.id === s.relatedProduct);
  const names = group?.plans.map((p) => p.name) ?? [];
  const bad = [
    ...s.plan.includes.map((i) => i.from).filter((n) => !names.includes(n)),
    ...Object.keys(s.plan.highlights).filter((n) => !names.includes(n)),
    ...(s.plan.suite && !pricing.find((g) => g.id === "suite")?.plans.some((p) => p.name === s.plan.suite) ? [s.plan.suite] : []),
  ];
  if (bad.length) throw new Error(`solutions.ts: "${s.slug}" names unknown plans: ${bad.join(", ")}`);
  if (s.h1Accent && !s.h1.endsWith(s.h1Accent)) throw new Error(`solutions.ts: "${s.slug}" h1Accent is not the end of h1`);
  if (s.related.some((r) => r === s.slug || !(r in data))) throw new Error(`solutions.ts: "${s.slug}" has a bad related slug`);
}
