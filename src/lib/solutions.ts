import type { ProductSlug } from "@/lib/products";
import { pricing } from "@/lib/pricing";
import {
  bundlePlanNames,
  CRM_PRICES,
  crmFrom,
  crmLowest,
  describeLimits,
  inr,
  perMonth,
  planGroup,
  priceLine,
  pricedPlan,
  solutionStart,
  ZSHOP_ZLOYA_INCLUDED,
  type Solution,
  type SolutionEntry,
  type SolutionSlug,
} from "@/lib/solution-kit";
import { linkTargets } from "@/lib/inline-links";
import { page as whatsappBusinessApi } from "@/lib/solution-pages/whatsapp-business-api";
import { page as whatsappMessageTemplates } from "@/lib/solution-pages/whatsapp-message-templates";
import { page as omnichannelTeamInbox } from "@/lib/solution-pages/omnichannel-team-inbox";
import { page as whatsappCrm } from "@/lib/solution-pages/whatsapp-crm";
import { page as facebookMessengerAutomation } from "@/lib/solution-pages/facebook-messenger-automation";

export type { Solution, SolutionEntry, SolutionPlan, SolutionSection, SolutionSlug } from "@/lib/solution-kit";

/**
 * Use-case landing pages under /solutions/. Every claim here restates src/lib/products.ts, src/lib/pricing.ts or
 * the product sections; prices are read from pricing.ts so the copy can't drift from the plans.
 *
 * Types and the price helpers (perMonth, priceLine, and the Zutok CRM ones re-exported from pricing.ts: crmFrom,
 * crmLowest, CRM_PRICES) live in src/lib/solution-kit.ts. Zutok CRM is priced per user (owner, 2026-10-09): CRM copy
 * quotes "₹1,299 per user per month" (crmFrom), or all three per-user prices (CRM_PRICES), never "from ₹999" without
 * its "5 or more users" condition, and never ties a CRM module to a user count. Newer pages live in their own
 * files under src/lib/solution-pages/ and are registered in `data` below; the key order of `data` is the page order.
 * Copy may link with "[label](/path/)" markup (src/lib/inline-links.ts); pages render it, JSON-LD gets plain text.
 *
 * OWNER TO CONFIRM (2026-10-09). The sources don't say either way, so these pages make no claim about them:
 * - COD confirmation: whether ZShop offers OTP checks, IVR calls, COD-to-prepaid offers, partial COD, pincode checks
 *   or RTO scores. (A "what it doesn't do" section was removed rather than guessed.)
 * - GST invoicing: e-invoices (IRN), e-way bills, GSTR filing, HSN/SAC lookup, Tally sync, UPI/card collection, POS
 *   billing. (The FAQ saying "no" to all of these was removed.)
 * - HRM: what "payroll" covers beyond salary records (payslips, PF/ESI/PT/TDS, salary runs, payouts). Headings say
 *   "HRM". (pricing.ts no longer has a CRM plan label; Zutok CRM is priced per user, owner 2026-10-09.)
 * - Zloya: that no coupon depends on a Google review.
 * - Zloya memberships: whether a membership or wallet balance can be redeemed at every outlet (pages only say the
 *   member is recognised at each outlet).
 * - ZChat plans (owner's pricing, 2026-10-09): only contacts, channels and CRM licenses per plan are published, so ZChat
 *   feature pages say a feature is "part of Zutok ZChat, with plans from …" and never name the plan it starts on.
 *   Not known, so never claimed: which ZChat plan has the AI agent, broadcasts, comment → DM, auto-assign, team
 *   reports or multiple AI agents; team seats; which channels count towards 1, 2 or 4.
 * - ZShop and Zloya come free with ZChat Growth and Scale and have no plans of their own. Their store, order, outlet
 *   and QR-code limits, and whether former Zloya Chain features (custom journeys and segments, customers 360°, API /
 *   POS integration) are included, aren't known, so these pages give no limits and make no such claim.
 */

/** "1, 2 or 4": one ZChat allowance across Starter, Growth and Scale, read from pricing.ts. */
const zchatEach = (key: "channels" | "crmLicenses") => {
  const [a, b, c] = ["Starter", "Growth", "Scale"].map((n) => pricedPlan("zchat", n).limits?.[key]);
  return `${a}, ${b} or ${c}`;
};

/** "₹1,299 per user/month": Zutok CRM for 1 user, billed monthly, short enough for meta descriptions. */
const crmPerUserMonth = `${inr(pricedPlan("crm", "1 user").monthly)} per user/month`;

const data: Record<SolutionSlug, SolutionEntry> = {
  /* ---------------------------------------------------------------- */
  /* ZChat                                                            */
  /* ---------------------------------------------------------------- */
  /** The broad "WhatsApp automation" page: every WhatsApp automation across ZChat and ZShop, linking to each one. */
  "whatsapp-automation": {
    name: "WhatsApp automation",
    kicker: "Zutok ZChat + ZShop · WhatsApp automation",
    relatedProduct: "zchat",
    title: "WhatsApp Automation Software for Indian Businesses",
    metaDescription:
      "Automate WhatsApp with Zutok: an AI agent that quotes from your catalogue, broadcasts on approved templates, COD confirmation, order updates and cart reminders.",
    keywords: [
      "WhatsApp automation",
      "WhatsApp automation software India",
      "24/7 WhatsApp auto reply",
      "WhatsApp auto reply after business hours",
      "automated WhatsApp messages for business",
      "WhatsApp auto reply for business",
      "WhatsApp marketing automation",
    ],
    h1: "WhatsApp automation for Indian businesses, from first reply to delivery",
    h1Accent: "from first reply to delivery",
    answer: `WhatsApp automation is software that sends and answers WhatsApp messages for your business. With Zutok, an AI agent answers product and price questions from your own catalogue, broadcasts go out on Meta-approved templates, and online stores confirm COD orders, send order updates and remind abandoned carts. It runs on the official WhatsApp Business Platform, with Zutok ZChat plans from ${priceLine("zchat", "Starter")}.`,
    summary:
      "Everything Zutok automates on WhatsApp: AI replies from your catalogue, broadcasts, COD confirmation, order updates, cart reminders and handoff to your team.",
    facts: [
      { value: "24/7", label: "AI replies, day or night" },
      { value: "5", label: "template formats: text, image, PDF, video and buttons" },
      { value: "3", label: "cart reminders: after 1 hour, 1 day and 3 days" },
    ],
    problem: {
      heading: "What is WhatsApp automation, and why do businesses use it?",
      lead: "WhatsApp automation is software that sends and answers WhatsApp messages for you: replies to everyday questions, campaign messages, order confirmations and delivery updates. Businesses use it because customers ask on WhatsApp at all hours, and answering every chat by hand doesn't keep up.",
      body: [
        "WhatsApp has rules that automation has to follow. Business messaging at scale runs on the official WhatsApp Business Platform (the WhatsApp Business API), and free-form messages are only allowed within 24 hours of the customer's last message. Anything later, like most order updates and campaigns, goes out as a template Meta has approved.",
        "Zutok is built around those rules, so every automated message is either a reply inside the 24-hour window or an approved template with the customer's details filled in.",
      ],
    },
    approach: {
      heading: "What can you automate on WhatsApp with Zutok?",
      lead: "Five kinds of messages: answers to product and price questions, broadcasts, COD confirmations, order updates and abandoned-cart reminders. They all go out from your ZChat number, and every reply comes back to one shared inbox.",
      bullets: [
        "AI sales agent: asks each product choice as a numbered list and quotes the price, order link and files from the one catalogue row that matches.",
        "Broadcasts: Text, Image, PDF, Video and Button templates to your leads, contacts or a custom audience, with sent, delivered and read numbers.",
        "COD confirmation (ZShop): buyers confirm cash-on-delivery orders on WhatsApp before anything ships, with a reminder after 4 hours by default.",
        "Order updates (ZShop): placed, packed, shipped and delivered messages, with courier tracking.",
        "Abandoned-cart reminders (ZShop): after 1 hour, 1 day and 3 days, with the discounts you set on the second and third.",
      ],
    },
    extra: [
      {
        heading: "Can WhatsApp reply automatically after business hours?",
        lead: "Yes. ZChat's AI sales agent answers day or night from your catalogue and the business facts you add: timings, address, delivery areas, and payment and return policy. Anything it can't answer waits in the shared inbox for your team.",
        body: [
          "So questions that arrive overnight, like timings or directions, are already answered by the time you open. The inbox's All, Mine and Unassigned views and its Open, Pending and Resolved status show the morning shift exactly which chats still need a person.",
        ],
      },
      {
        heading: "Is an AI agent the same as a WhatsApp auto reply or chatbot?",
        lead: "No. A fixed auto reply sends everyone the same message. ZChat's AI agent reads the question, asks each product choice as a numbered list and quotes only from the catalogue row that matches.",
        body: [
          "Instead of building a flow, you add your products with your own columns and rows, plus your business facts, and the agent works from those. It runs on OpenAI, Anthropic Claude, Google Gemini, Vertex AI or your own model, and with handoff on, it hands the chat to your team when a customer asks for a person.",
        ],
      },
      {
        heading: "Do I need the WhatsApp Business API for automation?",
        lead: "Yes. ZChat runs on the official WhatsApp Business Platform, and Zutok helps you set up and verify your number during onboarding. The [WhatsApp Business API](/solutions/whatsapp-business-api/) page covers setup and what Meta charges on top of your plan.",
      },
      {
        heading: "How does Zutok keep automated WhatsApp messages from spamming customers?",
        lead: "ZShop's promotional store messages, such as discount cart reminders, wait outside the quiet hours you set (for example 9 pm to 9 am) and respect a daily limit (for example one promo per day). Order updates always go out when they happen, even at 11 pm.",
        body: [
          "When someone says “stop contacting me”, one do-not-contact list, shared by ZShop and ZChat, applies on every channel, so they don't hear from a different automation the next day.",
          `You choose the quiet hours and daily limit when you set ZShop up. ZShop comes free with ZChat ${bundlePlanNames()}.`,
        ],
      },
      {
        heading: "What happens when a customer needs a person?",
        lead: "The chat moves to your team. With handoff on, the AI agent passes the conversation over whenever a customer asks for a person or the question falls outside its instructions, and the whole history stays in the same inbox.",
        body: [
          "ZChat's auto-assign spreads new and waiting chats across your team, so nothing sits unanswered. Every new chat also creates a lead in Zutok CRM with its source.",
        ],
      },
    ],
    steps: {
      heading: "How do you set up WhatsApp automation, step by step?",
      lead: "You set each automation up once. After that it runs on its own, and your team only steps in when a customer needs them.",
      items: [
        {
          title: "Connect your number",
          body: "ZChat runs on the official WhatsApp Business Platform. Zutok helps you set up and verify your number during onboarding.",
        },
        {
          title: "Add your catalogue and facts",
          body: "Products with your own columns and rows, plus timings, address, delivery areas, and payment and return policy.",
        },
        {
          title: "Create or sync templates",
          body: "Text, Image, PDF, Video and Button templates, with Meta's approval status for each one.",
        },
        {
          title: "Connect your store",
          body: "Optional: Shopify, WooCommerce, any platform with an API, or an in-house shop, for COD, order updates and carts.",
        },
        {
          title: "Set quiet hours and handoff",
          body: "Choose when ZShop's promotional messages may go out, and when a chat should move to a person.",
        },
        {
          title: "Go live",
          body: "The agent answers, campaigns send and store messages run, while replies land in the shared inbox as CRM leads.",
        },
      ],
    },
    features: {
      heading: "Which WhatsApp automations does Zutok include?",
      lead: "Each one has its own page with the details. Together they cover a customer's whole journey on WhatsApp.",
      items: [
        { icon: "bot", title: "AI sales agent", body: "Quotes from the catalogue row that matches, day or night." },
        { icon: "megaphone", title: "Broadcasts", body: "Approved templates to leads, contacts or custom lists." },
        { icon: "template", title: "Template studio", body: "Text, Image, PDF, Video and Button templates." },
        { icon: "receipt", title: "COD confirmation", body: "Confirm before dispatch, with an automatic reminder." },
        { icon: "package", title: "Order updates", body: "Placed, packed, shipped and delivered." },
        { icon: "cart", title: "Cart reminders", body: "After 1 hour, 1 day and 3 days." },
        { icon: "moon", title: "Quiet hours & limits", body: "ZShop promotions wait; order updates don't." },
        { icon: "users", title: "Chats → CRM leads", body: "Every new chat creates a lead with its source." },
      ],
    },
    plan: {
      heading: "How much does WhatsApp automation cost with Zutok?",
      lead: `The AI sales agent and broadcasts are part of Zutok ZChat. Plans start with ZChat Starter at ${priceLine("zchat", "Starter")}, for ${describeLimits("zchat", "Starter")}. Store automations run on [Zutok ZShop](/products/zshop/), which sends through ZChat and comes free with ZChat Growth at ${perMonth("zchat", "Growth")} and Scale at ${perMonth("zchat", "Scale")}. Meta's per-message charges for template messages are billed separately.`,
    },
    faqs: [
      {
        q: "What is WhatsApp automation?",
        a: "Software that sends and answers WhatsApp messages for your business: replies to questions, broadcasts, order confirmations and delivery updates. Zutok runs it on the official WhatsApp Business Platform, and every reply lands in one shared inbox.",
      },
      {
        q: "Can WhatsApp reply to customers automatically?",
        a: "Yes. ZChat's AI sales agent answers product and price questions from your catalogue and business facts, day or night, and with handoff on, it hands the chat to your team when a customer asks for a person.",
      },
      {
        q: "How do I set up auto reply on WhatsApp for my business?",
        a: `Connect your number on the official WhatsApp Business Platform (Zutok helps you set it up and verify it during onboarding), add your products and business facts, then turn on ZChat's AI agent and handoff. The AI agent is part of Zutok ZChat, with plans from ${perMonth("zchat", "Starter")}.`,
      },
      {
        q: "Is WhatsApp automation free?",
        a: `Zutok's automation is a paid plan, but you can see it working in a free 30-minute demo first, and there is no setup fee. AI replies and broadcasts are part of Zutok ZChat, with plans from ${priceLine("zchat", "Starter")}. Meta bills its WhatsApp charges separately, and monthly plans can be cancelled at the end of any month.`,
      },
      {
        q: "Can automated WhatsApp messages go out at night?",
        a: "Order updates do, because buyers want them as soon as they happen. ZShop's promotional messages, like cart reminders, wait for your quiet hours to end, and the AI agent replies whenever a customer writes to you.",
      },
      {
        q: "Do I need a website or a Shopify store for WhatsApp automation?",
        a: "Not for chats and broadcasts. For order automations, ZShop works with Shopify, WooCommerce, any platform with an API, or an in-house shop whose items live in the CRM.",
      },
      {
        q: "Can I automate Instagram as well as WhatsApp?",
        a: "Yes. The AI sales agent also answers on Instagram, Messenger and Telegram, and ZChat replies to comments on your Instagram and Facebook posts and reels and sends a private DM to everyone who comments. See [Instagram automation](/solutions/instagram-comment-to-dm/) and [Facebook Messenger automation](/solutions/facebook-messenger-automation/).",
      },
    ],
    related: [
      "instagram-comment-to-dm",
      "facebook-messenger-automation",
      "whatsapp-ai-sales-agent",
      "whatsapp-broadcast-campaigns",
      "whatsapp-business-api",
      "indiamart-meta-lead-ads-crm",
    ],
    spokes: {
      heading: "Every WhatsApp automation, in detail",
      lead: "Each page below covers one job: how it works step by step and what it costs in rupees.",
      items: [
        "whatsapp-business-api",
        "whatsapp-ai-sales-agent",
        "whatsapp-broadcast-campaigns",
        "whatsapp-message-templates",
        "omnichannel-team-inbox",
        "whatsapp-crm",
        "whatsapp-cod-confirmation",
        "abandoned-cart-recovery-whatsapp",
        "whatsapp-order-updates-courier-tracking",
      ],
    },
  },

  "whatsapp-business-api": whatsappBusinessApi,

  "whatsapp-ai-sales-agent": {
    name: "WhatsApp AI sales agent",
    kicker: "Zutok ZChat · AI sales agent",
    relatedProduct: "zchat",
    title: "WhatsApp AI Chatbot & Sales Agent for Your Catalogue",
    metaDescription:
      "Zutok ZChat's AI chatbot asks each product choice on WhatsApp, then quotes the price, order link and brochure from the one catalogue row that matches.",
    keywords: [
      "WhatsApp AI chatbot for business",
      "WhatsApp AI sales agent",
      "AI chatbot that doesn't make up prices",
      "WhatsApp chatbot with product catalogue",
      "ChatGPT for WhatsApp Business",
      "chatbot with human handoff",
      "send brochure automatically on WhatsApp",
    ],
    h1: "A WhatsApp AI chatbot and sales agent that quotes from your own catalogue",
    h1Accent: "from your own catalogue",
    answer: `Zutok ZChat's AI sales agent is a WhatsApp AI chatbot that answers product and price questions from your own catalogue rows. It asks each choice as a numbered list, then replies with the price, order link and files from the one row that matches, so it never makes up a price. ZChat plans start at ${priceLine("zchat", "Starter")}.`,
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
        "Alongside the catalogue you give the agent your business knowledge: timings, address, delivery areas, and payment and return policy. It answers from those facts only and never guesses. With handoff on, a chat moves to your team with the whole history when a question falls outside its instructions or the customer asks for a person.",
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
      {
        heading: "AI sales agent, keyword bot or a fixed auto reply: what's the difference?",
        lead: "A fixed auto reply sends everyone the same message, and a keyword bot follows the paths someone built for it. ZChat's AI sales agent reads the question, asks each product choice as a numbered list and quotes only from the row that matches.",
        body: [
          "It only offers values that exist with the customer's earlier choices, so a buyer who picked Glossy is never offered a size that doesn't come in glossy. The price only ever comes from the matched row.",
          "Questions that aren't about products are answered only from the business facts you add, and with handoff on, anything else goes to your team.",
        ],
      },
      {
        heading: "Which AI model can run your WhatsApp agent: OpenAI, Claude, Gemini or your own?",
        lead: "You choose: OpenAI, Anthropic Claude, Google Gemini, Vertex AI or your own model. You also set the temperature and reply length during setup.",
        body: [
          "In plain terms, temperature changes how varied the agent's wording is, and reply length changes how long its answers are. Neither changes where the facts come from: whichever model you pick, prices, order links and files only come from the catalogue row that matches, and other answers only from the business facts you add.",
          "The same agent, on the model you chose, replies on WhatsApp, Instagram, Messenger and Telegram, and hands chats to your team when needed.",
        ],
      },
      {
        heading: "When does the AI chatbot hand the chat to a human?",
        lead: "In two cases: when the customer asks for a person, or when the question falls outside the agent's instructions. Handoff is a setting you turn on, and the chat stays in the same ZChat inbox with its whole history.",
        body: [
          "It works the same way on WhatsApp, Instagram, Messenger and Telegram, so your team picks up where the agent stopped, whatever the channel.",
          "Narrow instructions keep the right questions with your team. A clinic, for example, can keep the agent to prices, timings and directions, so clinical questions always reach staff, and staff confirm appointment slots in the same chat.",
        ],
      },
      {
        heading: "Can the AI send a brochure, price list or video on WhatsApp?",
        lead: "Yes. Add a File column, attach the brochure, price list, PDF or video to the right rows, and when the agent quotes from a row the customer gets the real file along with the quote.",
        body: [
          "It works the same on WhatsApp, Instagram, Messenger and Telegram. Sending a PDF to many people who haven't written to you is different: that's a broadcast of an approved PDF template.",
        ],
        bullets: [
          "Example: a printer attaches a sample PDF to each visiting-card row, so the quote for 500 glossy cards arrives with its sample.",
          "Example: a property business attaches each project's brochure to that project's row, so an enquiry about one project gets the right brochure.",
          "Example: a diagnostic lab attaches its full price list, so a patient gets the PDF along with the price of the test they asked about.",
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
      lead: `The AI sales agent is part of Zutok ZChat. ZChat Starter costs ${priceLine("zchat", "Starter")}, for ${describeLimits("zchat", "Starter")}. Growth, at ${perMonth("zchat", "Growth")}, has ${describeLimits("zchat", "Growth")}, and Scale, at ${perMonth("zchat", "Scale")}, has ${describeLimits("zchat", "Scale")}.`,
    },
    faqs: [
      {
        q: "Can the WhatsApp AI agent hand a conversation over to a human?",
        a: "Yes. Turn on handoff and the agent passes the chat to your team whenever a customer asks for a person or the question falls outside its instructions. The conversation stays in the same ZChat inbox with its whole history.",
      },
      {
        q: "Does the AI sales agent work on Instagram, Messenger and Telegram too?",
        a: "Yes. The same agent answers on WhatsApp, Instagram, Messenger and Telegram, all from ZChat's shared inbox, and quotes only from your catalogue.",
      },
      {
        q: "Can I connect ChatGPT, Gemini or Claude to WhatsApp with ZChat?",
        a: `Yes. ZChat's AI agent runs on OpenAI (the company behind ChatGPT), Anthropic Claude, Google Gemini, Vertex AI or your own model, with your own temperature and reply length. It's part of Zutok ZChat, from ${perMonth("zchat", "Starter")}.`,
      },
      {
        q: "Can the AI agent quote a price I haven't set or give its own discount?",
        a: "No. It quotes only the price in the catalogue row that matches the customer's choices. With handoff on, a customer who asks for a person, or asks something outside the agent's instructions, goes to your team with the whole history.",
      },
      {
        q: "Will the AI answer questions that aren't about products?",
        a: "Only from the business knowledge you give it: timings, address, delivery areas, and payment and return policy. It doesn't guess, and anything outside its instructions can go to your team.",
      },
      {
        q: "Does the AI agent need the WhatsApp Business API?",
        a: "For WhatsApp, yes: ZChat runs on the official WhatsApp Business Platform, and the [WhatsApp Business API](/solutions/whatsapp-business-api/) page covers setup and Meta's charges.",
      },
    ],
    related: [
      "whatsapp-automation",
      "whatsapp-broadcast-campaigns",
      "instagram-comment-to-dm",
      "omnichannel-team-inbox",
      "whatsapp-crm",
      "facebook-messenger-automation",
    ],
  },

  "whatsapp-broadcast-campaigns": {
    name: "WhatsApp broadcasting",
    kicker: "Zutok ZChat · Broadcasting",
    relatedProduct: "zchat",
    title: "WhatsApp Broadcasting & Bulk Message Sender for India",
    metaDescription:
      "Send bulk WhatsApp campaigns on Meta-approved templates to leads, contacts or custom lists with Zutok ZChat, schedule or pause them, and track delivery live.",
    keywords: [
      "WhatsApp broadcasting",
      "WhatsApp broadcast software India",
      "bulk WhatsApp sender",
      "bulk WhatsApp message sender India",
      "schedule WhatsApp messages",
      "WhatsApp marketing campaign delivery report",
      "WhatsApp Business API broadcast",
    ],
    h1: "Bulk WhatsApp broadcasting software for Indian businesses",
    h1Accent: "for Indian businesses",
    answer: `Zutok ZChat is a bulk WhatsApp message sender built on the official WhatsApp Business Platform. Pick a Meta-approved template, send it to your leads, contacts or a custom audience now or on a schedule, pause it if plans change, and watch sent, delivered and read numbers as they arrive. Broadcasts are part of Zutok ZChat, with plans from ${priceLine("zchat", "Starter")}.`,
    summary:
      "How Zutok ZChat sends bulk WhatsApp campaigns with Meta-approved templates and shows sent, delivered and read numbers as they come in.",
    facts: [
      { value: "3", label: "audiences: your leads, your contacts or a custom audience" },
      { value: "Now or later", label: "send now or schedule it, and pause a campaign if plans change" },
      { value: "Live", label: "sent, delivered and read numbers" },
    ],
    problem: {
      heading: "What is a bulk WhatsApp sender, and why does it need templates?",
      lead: "A bulk WhatsApp sender sends one message to many customers at once. On the official WhatsApp Business Platform that's a broadcast, and because most people on your list haven't messaged you in the last 24 hours, it goes out as a template Meta has approved.",
      body: [
        "WhatsApp only allows free-form messages within 24 hours of a customer's last message. A template is a message you write in advance and submit to Meta under a category (Marketing, Utility or Authentication), and once it's approved you can use it in your campaigns.",
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
        heading: "What types of WhatsApp templates can I use in a broadcast?",
        lead: "Five formats, Text, Image, PDF, Video and Button, under Meta's three categories: Marketing, Utility and Authentication. How to create each one, get it approved and know when you need one is covered on the [WhatsApp template messages](/solutions/whatsapp-message-templates/) page.",
      },
      {
        heading: "Is sending bulk WhatsApp messages allowed, and will my number get banned?",
        lead: "ZChat sends broadcasts through the official WhatsApp Business Platform, the route Meta provides for business messaging at scale, using templates Meta has approved. Zutok helps you connect and verify your number. No tool can promise that a number will never be restricted, though.",
        body: [
          "The plain advice is to message people who expect to hear from you, like your own leads and customers, and to keep each campaign relevant to them. Their replies come back to your shared inbox, where your team can answer them.",
        ],
      },
      {
        heading: "What do sent, delivered and read mean?",
        lead: "They're the three stages of each message, and ZChat shows all three for every campaign, live, as they come in.",
        bullets: [
          "Sent: the message has gone out from your number.",
          "Delivered: it has reached the customer's phone.",
          "Read: WhatsApp has reported it as opened.",
        ],
      },
      {
        heading: "What happens after you hit send?",
        lead: "Replies land in ZChat's shared inbox, where your team already works, and every new chat creates a lead in Zutok CRM with its source.",
        body: [
          "ZChat's AI sales agent answers in the same inbox, quoting from your catalogue and handing chats to your team when a customer asks for a person, and auto-assign spreads new and waiting chats across the team, so replies to a big campaign don't sit unanswered.",
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
      heading: "What does WhatsApp broadcasting cost with Zutok?",
      lead: `Broadcasts and Meta templates are part of Zutok ZChat, with plans from ${priceLine("zchat", "Starter")}. Meta's per-message charges for template messages are billed separately, at its published rates.`,
    },
    faqs: [
      {
        q: "How do I send one WhatsApp message to thousands of customers?",
        a: "Use a broadcast. Pick a Meta-approved template, choose your audience from your leads, contacts or a custom list, then send it now or schedule it, and follow the sent, delivered and read numbers as they come in.",
      },
      {
        q: "How much does it cost to send bulk WhatsApp messages?",
        a: `Broadcasts are part of Zutok ZChat, with plans from ${priceLine("zchat", "Starter")}. On top of that, Meta charges per template message, billed separately at its published rates for India.`,
      },
      {
        q: "Can I see how many people received and read my broadcast?",
        a: "Yes. ZChat shows sent, delivered and read numbers for each campaign as they come in.",
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
        q: "Can I pause a scheduled broadcast?",
        a: "Yes. Campaigns can be scheduled for later, paused if your plans change, and filtered.",
      },
    ],
    related: [
      "whatsapp-message-templates",
      "whatsapp-business-api",
      "whatsapp-ai-sales-agent",
      "whatsapp-crm",
      "omnichannel-team-inbox",
      "whatsapp-automation",
    ],
  },

  "whatsapp-message-templates": whatsappMessageTemplates,

  "omnichannel-team-inbox": omnichannelTeamInbox,

  "whatsapp-crm": whatsappCrm,

  "instagram-comment-to-dm": {
    name: "Instagram automation",
    kicker: "Zutok ZChat · Instagram automation",
    relatedProduct: "zchat",
    title: "Instagram Automation: Comment-to-DM & AI DM Replies",
    metaDescription:
      "Instagram automation with Zutok ZChat: reply to comments on posts and reels, DM every commenter, and let the AI agent answer DMs from your catalogue.",
    keywords: [
      "Instagram automation",
      "Instagram DM auto reply",
      "Instagram comment to DM automation",
      "Instagram comment auto reply",
      "Instagram AI chatbot for business",
      "Instagram reel comment auto reply",
      "Instagram keyword comment DM",
    ],
    h1: "Instagram automation that DMs every commenter and answers with AI",
    h1Accent: "and answers with AI",
    answer: `Instagram automation in Zutok ZChat works in two places. When someone comments on your Instagram posts and reels, on any comment or only on keywords like “price”, it posts a public reply and sends them a private DM. In the DMs, ZChat's AI sales agent answers product and price questions from your catalogue. ZChat plans start at ${priceLine("zchat", "Starter")}.`,
    summary:
      "How Zutok ZChat automates Instagram: a public reply and a private DM for every comment on posts and reels, and an AI agent that answers DMs from your catalogue.",
    facts: [
      { value: "2", label: "triggers: any comment, or only keywords you choose" },
      { value: "1 + 1", label: "a public reply and a private DM for each comment" },
      { value: "4", label: "messaging apps the AI agent answers: Instagram, WhatsApp, Messenger, Telegram" },
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
    extra: [
      {
        heading: "How does AI auto reply to Instagram DMs work?",
        lead: "ZChat's AI sales agent reads each Instagram DM and answers it, the same way it answers WhatsApp, Messenger and Telegram. Unlike a fixed instant reply, which sends everyone the same message, it asks each product choice as a numbered list and quotes the price, order link and files from the one catalogue row that matches.",
        body: [
          "It answers other questions only from the business facts you give it, like timings, address, delivery areas, and payment and return policy, and it never guesses. With handoff on, when a customer asks for a person or a question falls outside its instructions, the chat moves to your team with the whole history.",
          `Instagram DMs land in the same shared inbox as your other channels. ZChat plans include ${zchatEach("channels")} channels, from ${perMonth("zchat", "Starter")}.`,
        ],
      },
      {
        heading: "Keyword or any comment, and what should the two replies say?",
        lead: "Trigger on any comment when nearly every comment is a buyer, as on a product reel, and on keywords like “price” or “link” when a post also draws general chatter. Either way you write two short texts: the public reply under the comment and the private DM.",
        body: [
          "Put the call to action in the caption, such as “Comment PRICE for details”, so people know which word gets them the DM. Here are three example pairs.",
        ],
        bullets: [
          "Example for a product reel. Public reply: “Sent you a DM with the price!” DM: “Thanks for asking! Here are the price and sizes for the kurta in this reel. Tell us your size and we'll share the order link.”",
          "Example for a launch post. Public reply: “Check your DMs for the link.” DM: “Here's the link to the new collection. Reply here if you'd like help picking a size.”",
          "Example for a property listing reel. Public reply: “We've sent you the details in a DM.” DM: “Thanks for your interest! Here are the location and price range for this listing. Would you like the brochure?”",
        ],
      },
      {
        heading: "What else can I automate on Instagram with Zutok?",
        lead: "The conversations that comment-to-DM and the AI agent start. Instagram DMs land in ZChat's shared inbox with WhatsApp, Messenger and Telegram, where every new chat becomes a lead in Zutok CRM with its source.",
        bullets: [
          "Labels and quick replies: tag conversations and answer everyday questions with saved replies.",
          "Auto-assign: new and waiting chats are spread across your team, so nothing sits unanswered.",
          "Team reports: conversations, resolution rate and load per channel and per agent.",
        ],
      },
    ],
    steps: {
      heading: "How do you set up Instagram automation, step by step?",
      lead: "One comment rule and one catalogue. After that, every matching comment and every DM is handled the same way.",
      items: [
        { title: "Connect your accounts", body: "Link Instagram and Messenger to ZChat in a few clicks." },
        { title: "Choose the trigger", body: "Any comment, or only comments with keywords like “price”." },
        { title: "Write both replies", body: "A short public reply to go under the comment, and the private DM with the details." },
        {
          title: "Turn on the AI agent",
          body: "Add your products and business facts once, and the agent answers DMs from them, with handoff to your team.",
        },
        { title: "Follow up in the inbox", body: "DMs land in the shared inbox and become leads in Zutok CRM." },
      ],
    },
    features: {
      heading: "What does ZChat's Instagram automation include?",
      items: [
        { icon: "bot", title: "AI replies in DMs", body: "The AI sales agent answers Instagram DMs from your catalogue." },
        { icon: "comment", title: "Posts and reels", body: "Comments on your Instagram posts and your reels." },
        { icon: "tags", title: "Keyword or any comment", body: "Trigger on the words you choose, or on every comment." },
        { icon: "megaphone", title: "Public reply + private DM", body: "A visible reply under the comment and the details in a DM." },
        { icon: "file", title: "Activity log", body: "A record of every auto-reply." },
        { icon: "inbox", title: "Unified inbox", body: "Instagram, WhatsApp, Messenger and Telegram, with All, Mine and Unassigned views." },
        { icon: "users", title: "Leads in Zutok CRM", body: "Every new chat creates a lead with its source." },
        { icon: "zap", title: "Labels & quick replies", body: "Saved answers for the questions you get every day." },
      ],
    },
    plan: {
      heading: "How much does Instagram automation cost with Zutok?",
      lead: `Comment → DM automation and the AI sales agent are part of Zutok ZChat, with plans from ${priceLine("zchat", "Starter")}. ZChat Starter includes ${describeLimits("zchat", "Starter")}; Growth, at ${perMonth("zchat", "Growth")}, and Scale, at ${perMonth("zchat", "Scale")}, include more contacts and channels.`,
    },
    faqs: [
      {
        q: "Can the comment DM include the price or a link?",
        a: "Yes. You write the private DM yourself, so it can carry the price, sizes or a link. When the person replies, the conversation carries on in ZChat's shared inbox, where the AI sales agent can answer from your catalogue.",
      },
      {
        q: "How much does Instagram AI auto-reply cost?",
        a: `AI replies are part of Zutok ZChat: Starter costs ${priceLine("zchat", "Starter")}, Growth ${perMonth("zchat", "Growth")} and Scale ${perMonth("zchat", "Scale")}, with ${zchatEach("channels")} channels.`,
      },
      {
        q: "Can my team still reply to Instagram DMs themselves?",
        a: "Yes. DMs land in ZChat's shared inbox with All, Mine and Unassigned views, so the team can see every DM and which ones nobody has taken yet. When the AI hands a chat over, the whole history stays with it.",
      },
      {
        q: "Can the DM trigger only when someone comments a keyword like “price”?",
        a: "Yes. Each rule can trigger on keywords you choose, or on any comment.",
      },
      {
        q: "Does comment-to-DM work on reels?",
        a: "Yes. A rule covers comments on your posts and your reels.",
      },
      {
        q: "Does comment-to-DM work on Facebook posts too?",
        a: "Yes. The same rules work on comments on Facebook posts and reels. The [Facebook Messenger automation](/solutions/facebook-messenger-automation/) page covers the Facebook side, including Messenger.",
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
    related: [
      "whatsapp-ai-sales-agent",
      "facebook-messenger-automation",
      "omnichannel-team-inbox",
      "whatsapp-crm",
      "whatsapp-automation",
      "whatsapp-broadcast-campaigns",
    ],
  },

  "facebook-messenger-automation": facebookMessengerAutomation,

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
      "COD order verification",
      "COD verification on WhatsApp",
      "COD verification Shopify WhatsApp",
      "WooCommerce COD confirmation",
      "confirm cash on delivery orders before shipping",
      "reduce fake COD orders",
      "COD confirmation reminder",
    ],
    h1: "COD order confirmation on WhatsApp, before anything ships",
    h1Accent: "before anything ships",
    answer: `Zutok ZShop asks cash-on-delivery buyers to confirm their order on WhatsApp before you ship it. If they don't reply, it reminds them automatically. Confirmed orders are tagged, and nothing is cancelled unless you switch that on. It works with Shopify, WooCommerce and in-house stores, and ZShop is ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST.`,
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
        heading: "What happens to each buyer response?",
        lead: "Every answer, including no answer, leads somewhere definite, and nothing is cancelled unless you've chosen that.",
        bullets: [
          "The buyer confirms: the order is tagged as confirmed and goes out as normal.",
          "The buyer replies with a question: the reply lands in your ZChat inbox for your team to answer.",
          "No reply: a reminder goes out after 4 hours by default, and ZShop stops asking after 24 hours.",
          "Still no reply: the order is tagged so your team can see it wasn't confirmed and decide what to do. Auto-cancel is optional and off by default.",
        ],
      },
      {
        heading: "Should you auto-cancel unconfirmed COD orders?",
        lead: "It's a trade-off. Cancelling automatically saves your team from chasing buyers who never meant to order, but it also drops orders from genuine buyers who simply missed the message.",
        body: [
          "ZShop's defaults lean towards keeping orders: unanswered orders are tagged, not cancelled, and your team decides. If you'd rather cancel them, switch on “Cancel if nobody replies”.",
        ],
      },
      {
        heading: "Does COD confirmation work for WooCommerce, custom sites and in-house stores?",
        lead: "Yes. ZShop connects Shopify through a custom app, WooCommerce or any platform with an API, and in-house shops whose items live in the CRM, and COD confirmation works the same way on all of them.",
        body: ["Webhooks register themselves, and you map your confirmation template once, whichever kind of store you run."],
      },
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
      heading: "How much does WhatsApp COD confirmation cost?",
      lead: `COD confirmation is part of [Zutok ZShop](/products/zshop/), which isn't sold on its own: it's ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST. ZShop sends WhatsApp messages through ZChat, and Meta's per-message charges for template messages are billed separately.`,
    },
    faqs: [
      {
        q: "What happens if a COD buyer doesn't reply? Is the order cancelled?",
        a: "Not by default. Buyers who don't confirm are tagged, and your team decides. You can switch on auto-cancel if you want it.",
      },
      {
        q: "Can WhatsApp confirmation stop all fake COD orders?",
        a: "No. It gives you a signal before you commit stock and courier charges: confirmed orders go out as normal, and unanswered ones wait for your team to check. No tool can guarantee that every COD buyer accepts the parcel.",
      },
      {
        q: "What goes in the confirmation message?",
        a: "Your own Meta-approved template, mapped once during setup. ZShop shows which order fields fill each numbered blank, and buttons like ✅ Confirm and ❌ Cancel are one way to let the buyer answer.",
      },
      {
        q: "Can I confirm COD orders without a website?",
        a: "Yes. Choose an in-house shop, keep your items in the CRM and take orders at the counter. COD confirmation works the same way as it does for Shopify and WooCommerce.",
      },
      {
        q: "When does the reminder go out?",
        a: "By default, 4 hours after the first message. ZShop stops asking after 24 hours.",
      },
      {
        q: "Do I need ZChat as well as ZShop?",
        a: `Yes. ZShop sends WhatsApp messages from your ZChat number, and it comes free with ZChat ${bundlePlanNames()}, so one ZChat plan covers both. Meta's per-message charges for template messages are billed separately.`,
      },
    ],
    related: [
      "whatsapp-automation",
      "abandoned-cart-recovery-whatsapp",
      "whatsapp-order-updates-courier-tracking",
      "whatsapp-message-templates",
      "omnichannel-team-inbox",
      "whatsapp-business-api",
    ],
  },

  "abandoned-cart-recovery-whatsapp": {
    name: "Abandoned cart recovery on WhatsApp",
    kicker: "Zutok ZShop · Cart recovery",
    relatedProduct: "zshop",
    title: "WhatsApp Abandoned Cart Recovery for Online Stores",
    metaDescription:
      "Zutok ZShop sends 3 WhatsApp cart reminders, after 1 hour, 1 day and 3 days, with a discount you set per step and none on the first. Shopify & WooCommerce.",
    keywords: [
      "WhatsApp abandoned cart recovery",
      "abandoned cart recovery WhatsApp",
      "WhatsApp cart reminder",
      "Shopify abandoned cart WhatsApp",
      "WooCommerce abandoned cart WhatsApp reminder",
      "abandoned cart discount sequence",
      "cart reminder timing",
      "recover abandoned checkouts India",
    ],
    h1: "Abandoned cart recovery on WhatsApp in three reminders",
    h1Accent: "in three reminders",
    answer: `Zutok ZShop wins back abandoned checkouts from Shopify, WooCommerce and in-house stores with three WhatsApp reminders: after one hour, one day and three days. The first carries no discount; you set the discount on the second and third. Reminders respect quiet hours and a daily limit. ZShop is ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST.`,
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
        heading: "What's the difference between an abandoned cart and an abandoned checkout?",
        lead: "An abandoned cart is a shopper who added items and left; an abandoned checkout is one who started paying and left before finishing. ZShop works from the abandoned carts and checkouts your connected store reports, and reminds the shopper on WhatsApp.",
      },
      {
        heading: "Why 1 hour, 1 day and 3 days, and why no discount on the first reminder?",
        lead: "Because each reminder has a different job. The first, after an hour, is a nudge for someone who got interrupted; the second, after a day, carries a small offer; the third, after three days, is a final, larger one.",
        body: [
          "The first reminder carries no discount on purpose: most buyers who come back after a nudge would have come back anyway, so they don't need one. That keeps the discounts for shoppers who need a reason to return.",
        ],
      },
      {
        heading: "What does each WhatsApp cart reminder say?",
        lead: "Whatever your approved templates say. Each reminder is mapped to a Meta-approved template, with the shopper's details filled into its numbered blanks.",
        body: ["Here is example wording for the three steps. The 5% and 10% are examples too: you set the discount on the second and third reminders."],
        bullets: [
          "Friendly nudge, after 1 hour (example): “Hi! You left a few things in your cart. They're saved for you whenever you're ready.”",
          "Still thinking?, after 1 day (example): “Still thinking it over? Here's 5% off if you complete your order.”",
          "Last chance, after 3 days (example): “Last chance: your cart is still waiting, now with 10% off.”",
        ],
      },
      {
        heading: "Is a cart reminder a promotional message?",
        lead: "Yes. ZShop treats cart reminders as promotional, so they wait outside your quiet hours, respect your daily limit and follow the do-not-contact list, for example no promotions from 9 pm to 9 am and one promo per day.",
        body: [
          "Order updates are different: they always go out when they happen. And a shopper who says “stop contacting me” is covered on every channel, because ZShop and ZChat share one do-not-contact list.",
        ],
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
      heading: "How much does abandoned cart recovery cost?",
      lead: `3-step abandoned-cart recovery, discounts and automations are part of [Zutok ZShop](/products/zshop/), which isn't sold on its own: it's ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST. ZShop sends through ZChat, and Meta's charges are separate.`,
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
      {
        q: "Do cart reminders need the WhatsApp Business API?",
        a: "Yes. Reminders go out from your ZChat number on the official WhatsApp Business Platform, using Meta-approved templates. The [WhatsApp Business API](/solutions/whatsapp-business-api/) page covers setup and Meta's charges.",
      },
      {
        q: "What happens when a shopper replies to a reminder?",
        a: "The reply lands in your ZChat inbox, where your team can answer it.",
      },
    ],
    related: [
      "whatsapp-automation",
      "whatsapp-cod-confirmation",
      "whatsapp-order-updates-courier-tracking",
      "whatsapp-message-templates",
      "whatsapp-business-api",
      "omnichannel-team-inbox",
    ],
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
      "WhatsApp order confirmation message",
      "WhatsApp order tracking notifications",
      "WhatsApp shipping notifications Shopify",
      "courier tracking updates on WhatsApp",
      "out for delivery WhatsApp message",
      "WooCommerce order notification WhatsApp",
      "where is my order automation",
    ],
    h1: "WhatsApp order status updates and courier tracking for online stores",
    h1Accent: "for online stores",
    answer: `Zutok ZShop sends buyers WhatsApp updates when an order is placed, packed, shipped and delivered, from your ZChat number. Its courier tracking checks status for out-for-delivery, delivered and failed attempts, and learns your real delivery times, like “usually 3–5 days”. ZShop is ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST.`,
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
        heading: "What does each WhatsApp order update say?",
        lead: "Your approved templates set the exact words. As a guide, here is what each stage carries, with example wording.",
        bullets: [
          "Placed (example): “Thanks! Your order has been placed.”",
          "Packed (example): “Your order is packed and ships tomorrow.”",
          "Shipped (example): “Your order is on its way. Track it with your tracking link. It usually arrives in 3–5 days.” The delivery estimate comes from courier tracking.",
          "Out for delivery (example): “Your parcel is out for delivery and arrives today.”",
          "Delivered (example): “Your order has been delivered.”",
        ],
      },
      {
        heading: "Which courier statuses send a message, and how often is status checked?",
        lead: "With courier tracking, ZShop checks courier status for out-for-delivery, delivered and failed attempts. It checks every few hours, so a message can arrive a few hours after the courier's scan rather than the moment it happens.",
        body: ["Tracking links are the ones you set, never guessed."],
      },
      {
        heading: "How are delivery time estimates like “3–5 days” worked out?",
        lead: "From your own deliveries. ZShop's courier tracking learns how long your parcels really take and uses that for estimates like “usually 3–5 days”.",
        body: ["So the estimate a buyer sees reflects your own deliveries, not a general promise."],
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
      heading: "How much do WhatsApp order updates and courier tracking cost?",
      lead: `WhatsApp order updates, courier tracking and delivery estimates are part of [Zutok ZShop](/products/zshop/), which isn't sold on its own: it's ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST. ZShop sends through ZChat, and Meta's charges are separate.`,
    },
    faqs: [
      {
        q: "Can customers get an out-for-delivery message on WhatsApp?",
        a: "Yes, with ZShop's courier tracking. It checks courier status every few hours and covers out-for-delivery, delivered and failed attempts.",
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
        q: "Can I add my own tracking link or a Track button?",
        a: "Yes. The shipped update carries the tracking link you set, never a guessed one, and your approved template can include a button.",
      },
      {
        q: "What happens on a failed delivery attempt?",
        a: "ZShop's courier tracking checks for failed attempts as well as out-for-delivery and delivered, so the buyer's updates follow what actually happened to the parcel. If the buyer replies, the reply lands in your ZChat inbox for your team.",
      },
      {
        q: "Do updates work for WooCommerce and counter orders?",
        a: "Yes. WooCommerce, any platform with an API and in-house shops get the same updates as Shopify. With no website, keep your items in the CRM and take orders at the counter in ZShop's in-house shop.",
      },
    ],
    related: [
      "whatsapp-automation",
      "whatsapp-cod-confirmation",
      "abandoned-cart-recovery-whatsapp",
      "whatsapp-message-templates",
      "whatsapp-business-api",
      "omnichannel-team-inbox",
    ],
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
      "restaurant membership program",
      "prepaid wallet for restaurants",
      "café membership card",
      "café prepaid card",
      "prepaid dining credit",
      "staff membership sales leaderboard",
    ],
    h1: "Membership and prepaid wallet software for restaurants and cafés",
    h1Accent: "for restaurants and cafés",
    answer: `Zutok Zloya lets restaurants, cafés and stores sell memberships at the counter: yearly perk bundles, or prepaid wallets like pay ₹5,000 and get ₹6,000 in credit. Every redemption needs a one-time password sent to the guest's phone, and a live leaderboard shows which staff sell the most. Zloya is ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST.`,
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
        heading: "Points, paid membership or prepaid wallet: which should a restaurant use?",
        lead: "Use points to reward visits as they happen, and a membership or wallet when you want the cash up front. You can run both in Zloya.",
        bullets: [
          "Points and 4 VIP tiers: the guest earns on every bill, at 1× to 2× depending on their tier, and the reward follows the visit.",
          "Perk-bundle membership: the guest pays once for a year of benefits, like a discount on every order, so you're paid before the visits.",
          "Prepaid wallet: the guest pays a fixed amount for a bigger credit with a validity period, and the balance itself brings them back.",
        ],
      },
      {
        heading: "How do you structure a prepaid wallet?",
        lead: "Decide four things: the price, the credit (including any bonus), how long the credit stays valid and any perks on top. Then sell it at the counter.",
        bullets: [
          "Example, “Prepaid Wallet 5K”: the guest pays ₹5,000 and gets ₹6,000 of dining credit over 180 days, including ₹1,000 bonus credit, plus 5% off every order.",
          "Example, “Club Dine-In 365”: a ₹1,999 yearly perk bundle with ₹500 of wallet credit, 15% off every order, a free appetiser every month and a birthday cake.",
        ],
      },
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
      heading: "How much do Zloya memberships and prepaid wallets cost?",
      lead: `Memberships, prepaid wallets and the staff sales leaderboard are part of [Zutok Zloya](/products/zloya/), which isn't sold on its own: it's ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST.`,
    },
    faqs: [
      {
        q: "How are membership and wallet redemptions protected from misuse?",
        a: "Every redemption needs a one-time password sent to the guest's phone, and every coupon is locked to one phone number.",
      },
      {
        q: "Is there an expiry date on the wallet balance?",
        a: "Wallet credit comes with a validity period. In the “Prepaid Wallet 5K” example, the ₹6,000 of credit is valid for 180 days.",
      },
      {
        q: "How do I track which staff sell memberships?",
        a: `On Zloya's live staff sales leaderboard, which ranks membership sales by staff member. Zloya comes free with ZChat ${bundlePlanNames()}.`,
      },
      {
        q: "Do I need a POS integration to sell memberships?",
        a: "No. The POS quick counter runs in any browser, so the cashier enters the bill amount and Zloya handles the rest. If you want your POS connected, ask about API / POS integration during your demo.",
      },
      {
        q: "Is a member recognised at every outlet?",
        a: "Yes. The guest profile is shared across every outlet, so a member is recognised at each branch.",
      },
      {
        q: "Is this only for restaurants?",
        a: "No. Zloya is built for restaurants, cafés, salons and stores, and memberships work the same way at each counter.",
      },
    ],
    related: ["automated-winback-birthday-campaigns", "restaurant-qr-code-customer-data"],
  },

  "restaurant-qr-code-customer-data": {
    name: "Smart QR codes for guest data",
    kicker: "Zutok Zloya · Smart QR codes",
    relatedProduct: "zloya",
    title: "Restaurant QR Codes to Collect Customer Phone Numbers",
    metaDescription:
      "Zutok Zloya QR codes on tables, Swiggy and Zomato boxes and partner stores collect guests' phone numbers with consent, and track scans and sign-ups per code.",
    keywords: [
      "collect customer phone numbers restaurant",
      "QR code to collect customer data for restaurants",
      "QR code on Swiggy and Zomato delivery boxes",
      "Swiggy Zomato customer data",
      "convert delivery customers to dine-in",
      "table standee QR sign-up",
      "QR code opt-in tracking",
    ],
    h1: "Collect restaurant customer data with QR codes on tables and Swiggy/Zomato boxes",
    h1Accent: "on tables and Swiggy/Zomato boxes",
    answer: `Zutok Zloya gives you smart QR codes for table standees, Swiggy and Zomato delivery boxes and partner stores. Guests scan, share their phone number and get a perk you choose, and each code shows its own scans, sign-ups and opt-in rate. Zloya is ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST.`,
    summary:
      "How Zutok Zloya smart QR codes on tables, Swiggy and Zomato boxes and partner stores collect guest numbers, with scans and opt-ins tracked per code.",
    facts: [
      { value: "3", label: "places to put them: tables, delivery boxes, partner stores" },
      { value: "Per code", label: "scans, sign-ups and opt-in rate" },
      { value: "Free", label: `Zloya comes with ZChat ${bundlePlanNames()}; it isn't sold separately` },
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
        heading: "Can I get my Swiggy and Zomato customers' phone numbers?",
        lead: "Not from the apps through Zutok: Zutok has no Swiggy or Zomato integration and no access to their data. What you can do is print a Zloya QR code on your own delivery boxes and let guests choose to share their number with you for a perk.",
        body: [
          "That keeps it consent-first: the guest scans, sees the offer and decides. Whatever the delivery apps do or don't share, a guest who signs up through your code is on a list you built yourself.",
        ],
      },
      {
        heading: "How do you turn delivery customers into dine-in guests, step by step?",
        lead: "Give every delivery guest a reason to come in, and a way to tell you who they are.",
        bullets: [
          "Create a code for your delivery boxes, separate from your table codes.",
          "Attach a dine-in perk to it, for example flat ₹150 off when they dine in.",
          "Stick the code on every Swiggy and Zomato box you send out.",
          "The guest scans, shares their phone number and gets the perk.",
          "They appear in Zloya's New segment, and when they visit, the cashier finds them by mobile number at the POS quick counter.",
        ],
      },
      {
        heading: "Which QR code placement works best?",
        lead: "The one your numbers point to. Give each placement its own code (Swiggy boxes, Zomato boxes, table standees, a partner store) and compare their scans, sign-ups and opt-in rate side by side.",
        body: [
          "Match the perk to the placement: a dine-in offer like flat ₹150 off on a delivery box, and something guests use with you, like 50 bonus points, on a table standee. If a code gets plenty of scans but few sign-ups, the offer may not be worth sharing a number for, so try a different perk on that code.",
          "These are sign-up codes, not a QR menu or online ordering: each one exists to collect a guest's number with their agreement.",
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
      heading: "How much do Zloya's smart QR codes cost?",
      lead: `Smart QR codes are part of [Zutok Zloya](/products/zloya/), which isn't sold on its own: it's ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST.`,
    },
    faqs: [
      {
        q: "Where can I put the QR codes?",
        a: "On table standees, on Swiggy and Zomato delivery boxes and at partner stores. Each placement gets its own code.",
      },
      {
        q: "What should I offer in exchange for a phone number?",
        a: "Something worth it where the code sits. For example, 50 bonus points on a table standee, or a dine-in offer like flat ₹150 off on a delivery box.",
      },
      {
        q: "Can I see who scanned a code?",
        a: "Scans are counted for each code. A guest joins your list when they share their phone number to claim the perk, so you see who signed up, not everyone who scanned.",
      },
      {
        q: "Can someone reuse the coupon?",
        a: "No. Every Zloya coupon is locked to one phone number, and redeeming it needs a one-time password sent to the guest's phone.",
      },
      {
        q: "What happens after a guest signs up?",
        a: "They appear in Zloya's smart segments, starting with New, which update automatically. Journeys like the first-visit welcome and the 30-day win-back then run on their own.",
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
    title: "Customer Win-Back & Birthday Offer Automation",
    metaDescription:
      "Zutok Zloya spots guests who stop visiting at 30 days and sends a win-back voucher, plus birthday, welcome and expiry offers locked to each guest's phone.",
    keywords: [
      "customer win-back campaign",
      "win back lost customers",
      "birthday offer automation",
      "welcome offer for new customers",
      "points expiry reminder",
      "customer retention software India",
      "customer segmentation for restaurants",
    ],
    h1: "Automated win-back, birthday and points-expiry campaigns for your regulars",
    h1Accent: "for your regulars",
    answer: `Zutok Zloya runs five automated retention journeys: a first-visit welcome, a birthday greeting, a 30-day “we miss you” win-back, a points-expiry alert and post-visit feedback. Offers are locked to each guest's phone, and guests are sorted automatically into segments like Slipping (30 days) and Lost (60+ days). Zloya is ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST.`,
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
        "Win-back is one of five ready-made journeys, alongside a welcome after the first visit, a birthday greeting, a points-expiry alert and a post-visit feedback request. The welcome, birthday and win-back messages carry offers like the examples on this page, and every coupon is locked to one phone number.",
      ],
    },
    extra: [
      {
        heading: "When does a customer count as lapsed?",
        lead: "In Zloya, a guest moves to Slipping after 30 days without a visit, and to Lost after 60 days or more. It happens automatically, with no tagging by hand.",
        body: [
          "The same 30-day mark works for salons and clinics, where clients who haven't come back get the win-back coupon; the [clinics, labs and salons guide](/industries/clinics-labs-salons/) covers that in more detail.",
        ],
      },
      {
        heading: "Which segments does Zloya create automatically?",
        lead: "Six, kept up to date without manual tagging. Each one pairs with a Zloya tool that gives those guests a reason to come back.",
        bullets: [
          "New guests: the first-visit welcome journey.",
          "Regulars: points and the four VIP tiers, Bronze to Platinum.",
          "Potential VIPs: VIP tiers, with perks unlocked by spend and visits.",
          "Slipping (30 days): the 30-day “we miss you” win-back journey.",
          "Lost (60+ days): guests who haven't been back in two months or more.",
          "Upcoming birthdays: the birthday journey.",
        ],
      },
      {
        heading: "What offer should a win-back message carry?",
        lead: "Something simple enough to act on, like the example flat ₹100 off voucher. Every coupon is locked to one phone number, and redeeming it at the counter needs a one-time password sent to the guest's phone.",
        body: ["Offers can carry a validity period too: the example first-visit welcome is 15% off, valid for 14 days."],
      },
      {
        heading: "How do birthday, anniversary and welcome offers work?",
        lead: "Each is a ready-made journey. The birthday journey sends a personal greeting with a gift and double points, for example a free dessert; anniversaries work the same way; and the first-visit welcome sends an offer after a guest's first visit, for example 15% off for 14 days.",
        body: ["Upcoming birthdays are their own smart segment, so you can see whose day is coming."],
      },
      {
        heading: "How do I remind customers before their loyalty points expire?",
        lead: "Turn on the points-expiry journey. Zloya alerts the guest to use their points before they expire, which is a reason to visit that they've already earned.",
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
      ],
    },
    plan: {
      heading: "How much do Zloya's automated journeys cost?",
      lead: `Birthday, win-back and expiry journeys are part of [Zutok Zloya](/products/zloya/), which isn't sold on its own: it's ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST.`,
    },
    faqs: [
      {
        q: "Do I need to tag customers manually?",
        a: "No. Zloya keeps its six segments, from New to Lost, up to date on its own.",
      },
      {
        q: "Can anniversaries get the same offer as birthdays?",
        a: "Yes. Anniversaries work the same way as birthdays: a personal greeting with a gift and double points.",
      },
      {
        q: "What welcome offer should a new customer get?",
        a: "One that brings them back for a second visit soon. The example first-visit welcome is 15% off, valid for 14 days, and like every Zloya coupon it's locked to the guest's phone number.",
      },
      {
        q: "Can loyalty coupons be shared or misused?",
        a: "No. Every coupon is locked to one phone number, and every redemption needs a one-time password sent to the guest's phone.",
      },
      {
        q: "Does it work across several outlets?",
        a: "Yes. The same guest profile is shared across every outlet.",
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
    title: "GST Billing Software with CRM: Quotation to Payment",
    metaDescription: `Send quotes and estimates, turn accepted ones into GST invoices with CGST and SGST, record payments, chase overdue bills and export PDFs. ${crmPerUserMonth}.`,
    keywords: [
      "GST billing software with CRM",
      "GST invoicing software with CRM",
      "quotation to invoice software",
      "quotation and invoice CRM India",
      "recurring invoice software India",
      "CGST SGST invoice",
      "track income and expenses",
    ],
    h1: "GST billing software with a built-in CRM, from quote to payment",
    h1Accent: "from quote to payment",
    answer: `Zutok CRM is GST billing software with the CRM built in. Send a quotation as an estimate, or a proposal, turn it into a GST invoice once it's accepted and record the payment. Invoices are in rupees with CGST and SGST on every line, plus recurring invoices, credit notes and bulk PDF export. Billing is part of Zutok CRM, at ${crmFrom()}, excl. 18% GST.`,
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
        "Recurring invoices handle repeat billing, credit notes handle corrections, and overdue reminders follow up on unpaid invoices.",
        "Every invoice sits on the customer's profile alongside their contacts, projects and support tickets, so sales and accounts work from the same record.",
      ],
    },
    extra: [
      {
        heading: "Quotation, estimate, proposal or invoice: what's the difference?",
        lead: "A quotation or estimate prices a specific job, a proposal sets out what you'll do and for how much, and an invoice asks for payment once the work or sale is agreed. In Zutok CRM a quotation is created as an estimate, and both estimates and proposals turn into GST invoices once accepted.",
        body: [
          "Estimate requests from your website arrive in the CRM as leads, so a request can become an estimate and then an invoice in one place.",
        ],
      },
      {
        heading: "Can Zutok CRM create GST invoices with CGST and SGST?",
        lead: "Yes. Invoices are in rupees with tax fields, and tax rates such as CGST and SGST go on every line.",
        body: ["You set up your tax rates and invoice format once, when you set up the CRM, and every invoice uses them."],
      },
      {
        heading: "How do I chase unpaid invoices?",
        lead: "With overdue reminders, which follow up on unpaid invoices. Every payment is recorded against its invoice, so you can see what's still owed.",
      },
      {
        heading: "How do recurring invoices and subscriptions work?",
        lead: "They're two separate tools. Recurring invoices bill a customer on a schedule, such as a monthly retainer. The Subscriptions module handles recurring billing alongside expense tracking.",
        body: ["Either way, payments are recorded against each invoice when they arrive."],
      },
      {
        heading: "Can I track expenses against income?",
        lead: "Yes. The Subscriptions & Expenses module adds expense tracking and an expenses vs income view, next to your invoices and payments.",
      },
      {
        heading: "What do I send my accountant at month end?",
        lead: "Export proposals, estimates, invoices and credit notes in bulk as PDF, and customers, leads and invoices as CSV, whenever you need them.",
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
      heading: "How much does GST invoicing in Zutok CRM cost?",
      lead: `Proposals, estimates, GST invoices, subscriptions, expenses and contracts are all part of Zutok CRM, priced per user: one CRM license is one user. ${CRM_PRICES}, excl. 18% GST.`,
    },
    faqs: [
      {
        q: "Can I convert a quotation into a GST invoice?",
        a: "Yes. Create the quotation as an estimate or a proposal, and once the customer accepts it, turn it into a GST invoice with tax on every line and record the payment.",
      },
      {
        q: "Are recurring invoices and the Subscriptions module included?",
        a: `Yes. Recurring invoices, credit notes and the Subscriptions module are all part of Zutok CRM, at ${crmFrom()} (${crmLowest()}), excl. 18% GST.`,
      },
      {
        q: "Does Zutok CRM include expense tracking?",
        a: "Yes. Expense tracking, with an expenses vs income view, is part of Zutok CRM, priced per user.",
      },
      {
        q: "Can I bill a monthly retainer?",
        a: "Yes. Set the client up with a recurring invoice and record each payment against it. If one goes unpaid, overdue reminders follow up.",
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
    related: ["indiamart-meta-lead-ads-crm", "crm-with-hrm-payroll", "whatsapp-crm"],
  },

  "indiamart-meta-lead-ads-crm": {
    name: "Lead management: IndiaMART & Meta Lead Ads",
    kicker: "Zutok CRM · Lead management",
    relatedProduct: "crm",
    title: "Lead Management CRM: IndiaMART & Facebook Leads",
    metaDescription: `IndiaMART enquiries and Facebook & Instagram lead forms sync into one Zutok CRM pipeline, from Enquiry to Customer, with tasks and reminders. ${crmPerUserMonth}.`,
    keywords: [
      "lead management CRM",
      "lead management software India",
      "IndiaMART CRM integration",
      "IndiaMART lead management",
      "Facebook lead ads CRM integration",
      "Instagram lead ads to CRM",
      "sales pipeline software",
    ],
    h1: "Lead management for IndiaMART and Facebook Lead Ads enquiries in one CRM pipeline",
    h1Accent: "in one CRM pipeline",
    answer: `Lead management means capturing every enquiry and following it up until it becomes a customer. Zutok CRM syncs IndiaMART enquiries and Meta Lead Ads (Facebook and Instagram lead forms) into one pipeline, beside website requests and, with ZChat, chat leads. Every lead moves from Enquiry to Follow-up, Hot and Customer, with tasks and reminders. It's part of Zutok CRM, at ${crmFrom()}, excl. 18% GST.`,
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
      heading: "How does Zutok CRM bring every lead source into one pipeline?",
      lead: "Through its Leads & Pipeline module. IndiaMART enquiries and Meta Lead Ads leads sync in on their own and land as enquiries on the same board as every other lead.",
      body: [
        "Other sources join the same pipeline: estimate requests from your website, imports from Excel or CSV and, if you use ZChat, every WhatsApp, Instagram, Messenger or Telegram conversation, which becomes a lead with its source.",
        "From there, tasks and reminders on every lead keep follow-ups on time, and lead reports and goals tracking sit in the same CRM.",
      ],
    },
    extra: [
      {
        heading: "What is lead management, and how is it different from a CRM?",
        lead: "Lead management is the part of sales that runs from first enquiry to a won customer. In Zutok it's the Leads & Pipeline module inside a full CRM, so a lead can go on to a proposal or estimate, a GST invoice and a customer profile without leaving the system.",
      },
      {
        heading: "How do IndiaMART enquiries get into Zutok CRM?",
        lead: "They sync in on their own. Field mapping puts each enquiry's details into your own lead fields, and the lead lands in the Enquiry stage with its source.",
      },
      {
        heading: "Do Facebook and Instagram lead forms sync automatically, or do I download CSVs?",
        lead: "They sync automatically. Leads from your Facebook and Instagram lead forms (Meta Lead Ads) land in the Enquiry stage with their source and mapped fields, so there's no CSV to download and re-upload.",
        body: [
          "Leads you've already downloaded can still come in: import them from Excel or CSV, and Zutok helps with the import during onboarding.",
          "A real estate business, for example, can run a site-visit lead form: each request arrives in Enquiry, ready for a call-back reminder.",
        ],
      },
      {
        heading: "How do follow-up reminders work?",
        lead: "Every lead carries its own tasks and reminders, from Enquiry through to Customer, so call-backs and next steps don't depend on someone remembering.",
      },
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
      heading: "How much does IndiaMART and Meta Lead Ads integration cost?",
      lead: `Meta Lead Ads and IndiaMART leads are part of Zutok CRM, priced per user: one CRM license is one user. ${CRM_PRICES}, excl. 18% GST. Leads from chats need ZChat, from ${perMonth("zchat", "Starter")}.`,
    },
    faqs: [
      {
        q: "Do Instagram lead form leads come in too?",
        a: "Yes. Meta Lead Ads covers both Facebook and Instagram lead forms, and leads from both sync into the same pipeline.",
      },
      {
        q: "Which stage does a new ad lead land in?",
        a: "Enquiry, with its source and mapped fields, on the same board as your IndiaMART, chat and website leads.",
      },
      {
        q: "How much does lead management cost?",
        a: `Lead management is part of Zutok CRM, priced per user: one CRM license is one user. ${CRM_PRICES}, excl. 18% GST. Lead reports and goals tracking are included.`,
      },
      {
        q: "Is the IndiaMART integration included whatever the number of users?",
        a: "Yes. IndiaMART and Meta Lead Ads leads are part of Zutok CRM, whatever the number of users.",
      },
      {
        q: "Can I import my existing leads from Excel?",
        a: "Yes. Import customers, leads and items from Excel or CSV, or from your old CRM. Zutok helps with the import during onboarding.",
      },
      {
        q: "Do WhatsApp chats become leads too?",
        a: "Yes, with ZChat: every new conversation creates a lead in Zutok CRM with its source. The [WhatsApp CRM](/solutions/whatsapp-crm/) page covers how chat leads work.",
      },
      {
        q: "Can I limit what each salesperson sees?",
        a: "Yes. Each staff member gets a role with its own permissions, so everyone sees only what they need.",
      },
    ],
    related: [
      "whatsapp-crm",
      "gst-invoicing-crm",
      "facebook-messenger-automation",
      "whatsapp-ai-sales-agent",
      "crm-with-hrm-payroll",
      "instagram-comment-to-dm",
    ],
  },

  "crm-with-hrm-payroll": {
    name: "CRM with HRM",
    kicker: "Zutok CRM · HRM, attendance & leave",
    relatedProduct: "crm",
    title: "CRM with HRM: Staff Records, Shifts, Attendance & Leave",
    metaDescription:
      "Zutok CRM includes HRM: staff records with contracts, insurance and salary, a shift planner, attendance and leave requests, beside your leads and invoices.",
    keywords: [
      "CRM with HRM",
      "HR and CRM in one software",
      "staff attendance software",
      "leave management system for small business",
      "shift planner software India",
      "employee contract expiry alert",
      "staff duty roster software",
    ],
    h1: "A CRM with HRM built in: staff records, shifts, attendance and leave",
    h1Accent: "staff records, shifts, attendance and leave",
    answer: `Zutok CRM puts HR in the same system as your leads and invoices: staff records with contracts, insurance and salary, alerts before a contract expires, a shift planner for your duty roster, and attendance and leave requests. Roles and permissions keep HR details with the people who need them. HRM is part of Zutok CRM, at ${crmFrom()}, excl. 18% GST.`,
    summary:
      "How Zutok CRM keeps staff records, contracts, salary, shifts, attendance and leave in the same system as your sales.",
    facts: [
      {
        value: inr(pricedPlan("crm", "1 user").monthly),
        label: "per user per month for Zutok CRM, HRM included (excl. 18% GST)",
      },
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
      heading: "How do I track staff attendance and leave without a register or spreadsheet?",
      lead: "Record them in Zutok CRM. Attendance is tracked in the CRM with attendance reports, and staff leave requests and approvals happen there too, instead of in a register or spreadsheet.",
      body: [
        "Each staff member gets a role with its own permissions, so sales, accounts and HR only see what they need.",
      ],
    },
    extra: [
      {
        heading: "What does a staff record in Zutok hold?",
        lead: "Each person's details, their contract (with an alert before it expires), their insurance records and their salary records.",
        body: ["If you need fields of your own, Zutok CRM has custom fields for every module."],
      },
      {
        heading: "Can I plan staff shifts and build a duty roster in Zutok CRM?",
        lead: "Yes. The shift planner lets you plan staff shifts and build shift tables, next to attendance, leave and each person's records.",
        body: [
          "A retail chain, for example, sets each outlet's shifts in the shift planner and records attendance and leave requests in Zutok CRM rather than in a register at each store. The [retail and franchise guide](/industries/retail-franchises/) walks through a whole day.",
        ],
      },
    ],
    steps: {
      heading: "How do you set up HR in Zutok CRM, step by step?",
      lead: "HR sits next to the rest of the CRM, so setup is mostly adding your people.",
      items: [
        {
          title: "Decide who uses the CRM",
          body: "Zutok CRM is priced per user, and one CRM license is one user. HRM, attendance and leave are included.",
        },
        { title: "Add your staff", body: "Records with contracts, insurance and salary." },
        { title: "Set roles and permissions", body: "So sales, accounts and HR each see only what they need." },
        { title: "Plan shifts", body: "Build shift tables in the shift planner." },
        { title: "Run attendance and leave", body: "Attendance, leave requests and attendance reports in one place." },
        { title: "Watch contract dates", body: "Get an alert before a staff contract expires." },
      ],
    },
    features: {
      heading: "What's in Zutok CRM's HRM?",
      items: [
        { icon: "usercog", title: "Staff records", body: "Every staff member's details in one place." },
        { icon: "file", title: "Contracts with alerts", body: "An alert before a contract expires." },
        { icon: "support", title: "Insurance", body: "Insurance details on each staff record." },
        { icon: "wallet", title: "Salary records", body: "Salary records for each person." },
        { icon: "calendar", title: "Shift planner", body: "Shifts and shift tables." },
        { icon: "timer", title: "Attendance", body: "Attendance tracking with reports." },
        { icon: "moon", title: "Leave requests", body: "Requests and approvals without the spreadsheets." },
        { icon: "users", title: "Roles & permissions", body: "Sales, accounts and HR each see their part." },
        { icon: "boxes", title: "Inventory in the same CRM", body: "Inventory and warehouse are part of Zutok CRM too." },
      ],
    },
    plan: {
      heading: "How much does HRM in Zutok CRM cost?",
      lead: `HRM (staff records with contracts, insurance and salary), the shift planner, attendance and leave are part of Zutok CRM, together with inventory, contracts, expenses and subscriptions. ${CRM_PRICES}, excl. 18% GST.`,
    },
    faqs: [
      {
        q: "Can I get alerts before staff contracts expire?",
        a: "Yes. Zutok's HRM alerts you before a staff contract expires.",
      },
      {
        q: "Can I limit what HR, sales and accounts staff can see?",
        a: "Yes. Each staff member gets a role with its own permissions, so sales, accounts and HR only see what they need.",
      },
      {
        q: "Is HRM an add-on, or part of the Zutok CRM price?",
        a: `Part of the price. Zutok CRM is priced per user (one CRM license is one user), and HRM, the shift planner, attendance and leave are included. ${CRM_PRICES}, excl. 18% GST.`,
      },
      {
        q: "How do leave requests and approvals work?",
        a: "Staff leave requests and their approvals are handled in Zutok CRM, so there's no separate leave register or spreadsheet to keep in sync.",
      },
      {
        q: "Does it work across outlets?",
        a: "Yes. A chain can set each outlet's shifts in the shift planner and record attendance and leave requests in the same Zutok CRM, rather than in a register at each store.",
      },
      {
        q: "What else comes with Zutok CRM?",
        a: "Leads and pipeline, proposals, estimates and GST invoices, projects and timesheets, inventory and warehouse, contracts, expenses, subscriptions, support tickets, and automation and reports, all included in the per-user price.",
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

/**
 * The plan a solution starts on, with its monthly price (billed monthly, excl. GST). ZShop and Zloya pages start on
 * the ZChat plan that includes them free (`bundled: true`), so `label` names the plan with its own product:
 * "Zutok ZChat Starter", "Zutok ZChat Growth". Zutok CRM is priced per user (`perUser: true`) with no starting tier,
 * so its label is just "Zutok CRM" and `monthly` is the 1-user price per user (₹1,299), never a "from" price.
 */
export function startingPlan(s: Solution) {
  const { group, bundled, perUser, plan } = solutionStart(s.relatedProduct, s.plan);
  const label = group === "crm" ? "Zutok CRM" : `Zutok ZChat ${plan.name}`;
  return { group, bundled, perUser, plan: plan.name, label, monthly: plan.monthly };
}

export const SOLUTIONS_HUB = {
  title: "Solutions: WhatsApp, Store, Loyalty & CRM Use Cases",
  description:
    "How Zutok handles WhatsApp CRM, AI sales, broadcasts, templates, team inbox, comment-to-DM, COD, cart recovery, order tracking, loyalty, GST and HRM.",
  h1: "WhatsApp, store, loyalty and CRM solutions for Indian businesses",
  h1Accent: "for Indian businesses",
  intro:
    "Each page below explains one job Zutok does, such as confirming COD orders on WhatsApp or selling prepaid memberships: how it works step by step and what it costs, with prices in rupees. Every solution runs on Zutok CRM and its three products: ZChat for chats and AI, ZShop for online stores and Zloya for loyalty. The ZChat pages also cover the WhatsApp Business API, message templates, the omnichannel team inbox and WhatsApp CRM.",
  keywords: [
    "Zutok solutions",
    "WhatsApp automation for business India",
    "WhatsApp COD confirmation",
    "abandoned cart recovery WhatsApp",
    "WhatsApp CRM India",
    "CRM with GST invoicing",
  ],
};

// Catch copy that drifts from pricing.ts or points at a page that doesn't exist.
for (const s of solutions) {
  // Plan names are checked against the group that sells the page's product: ZShop and Zloya pages use ZChat's plans.
  const names = pricing.find((g) => g.id === planGroup(s.relatedProduct))?.plans.map((p) => p.name) ?? [];
  const bad = [...(s.plan.startsOn && !names.includes(s.plan.startsOn) ? [s.plan.startsOn] : [])];
  if (bad.length) throw new Error(`solutions.ts: "${s.slug}" names unknown plans: ${bad.join(", ")}`);
  if (s.h1Accent && !s.h1.endsWith(s.h1Accent)) throw new Error(`solutions.ts: "${s.slug}" h1Accent is not the end of h1`);
  if (s.related.some((r) => r === s.slug || !(r in data))) throw new Error(`solutions.ts: "${s.slug}" has a bad related slug`);
  if (new Set(s.related).size !== s.related.length || s.related.length > 6)
    throw new Error(`solutions.ts: "${s.slug}" related must be at most 6 distinct slugs`);
  const spokes = s.spokes?.items ?? [];
  if (spokes.some((r) => r === s.slug || !(r in data)) || new Set(spokes).size !== spokes.length)
    throw new Error(`solutions.ts: "${s.slug}" has a bad or repeated spoke slug`);
  // In-copy links: a site path with a trailing slash (optionally #fragment), or an https URL.
  const copy = [
    s.answer,
    s.plan.lead,
    s.spokes?.lead ?? "",
    ...[s.problem, s.approach, ...(s.extra ?? [])].flatMap((x) => [x.lead, ...(x.body ?? []), ...(x.bullets ?? [])]),
    ...s.faqs.flatMap((f) => [f.q, f.a]),
  ];
  const badLink = copy.flatMap(linkTargets).find((h) => !/^(https:\/\/|\/([a-z0-9-]+\/)*(#[a-z0-9-]+)?$)/.test(h));
  if (badLink) throw new Error(`solutions.ts: "${s.slug}" has a malformed link "${badLink}"`);
  const self = copy.flatMap(linkTargets).find((h) => h === solutionPath(s.slug));
  if (self) throw new Error(`solutions.ts: "${s.slug}" links to itself`);
}
