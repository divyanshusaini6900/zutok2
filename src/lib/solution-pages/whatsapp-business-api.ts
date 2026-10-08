import { perMonth, priceLine, type SolutionEntry } from "@/lib/solution-kit";

/**
 * /solutions/whatsapp-business-api/
 * Owns the "get the WhatsApp Business API, and what does it cost" intent: access with Zutok's setup help, the two bills
 * (ZChat plan + Meta's charges at cost) and what runs on the number. Template formats, categories and the 24-hour rule
 * are handed to /solutions/whatsapp-message-templates/, and sending campaigns to /solutions/whatsapp-broadcast-campaigns/.
 * Positioning is "software on the official platform, with setup help": no partner, BSP or green-tick claims, no approval
 * timelines, no Meta rate figures, nothing about moving an existing number.
 * Meta's pricing is described only as Meta's own page states it (developers.facebook.com/docs/whatsapp/pricing/, checked
 * 2026-10-09: per-message charges since July 1, 2025; non-template messages and utility templates sent inside an open
 * customer service window are free), and linked rather than quoted.
 */
export const page: SolutionEntry = {
  name: "WhatsApp Business API",
  kicker: "Zutok ZChat · WhatsApp Business Platform",
  relatedProduct: "zchat",
  title: "WhatsApp Business API in India: Setup Help and Cost",
  metaDescription:
    `Zutok ZChat runs on the official WhatsApp Business Platform. We help set up and verify your number; plans from ${perMonth("zchat", "Starter")}, with Meta's charges billed at cost.`,
  keywords: [
    "WhatsApp Business API India",
    "WhatsApp Business API pricing India",
    "how to get WhatsApp Business API",
    "WhatsApp Business API setup",
    "official WhatsApp Business Platform",
    "WhatsApp API for small business",
    "is WhatsApp Business API free",
  ],
  h1: "WhatsApp Business API for Indian businesses, with setup help",
  h1Accent: "with setup help",
  answer: `The WhatsApp Business API, also called the official WhatsApp Business Platform, is what Indian businesses need to run WhatsApp from a shared team inbox, an AI agent and broadcasts. Zutok ZChat is software on that platform, and Zutok helps you set up and verify your number. Plans start with ZChat Starter at ${priceLine("zchat", "Starter")}; Meta's charges are billed separately, at cost.`,
  summary:
    "Getting the WhatsApp Business API with Zutok ZChat: help setting up and verifying your number, what runs on it, and the two costs, your ZChat plan and Meta's charges at cost.",
  facts: [
    { value: "₹0", label: "setup fee, and monthly plans cancel at the end of any month" },
    { value: "2", label: "bills: your ZChat plan, and Meta's charges billed separately at cost" },
    { value: "2–15", label: "team seats in one shared inbox, from ZChat Starter to Scale" },
  ],
  problem: {
    heading: "What is the WhatsApp Business API, and what runs on it?",
    lead: "It's the official WhatsApp Business Platform: the way business software like ZChat sends and receives WhatsApp messages for you. ZChat connects to it, so you need the API to use ZChat on WhatsApp, and Zutok helps you set it up.",
    body: [
      "Everything ZChat does on WhatsApp runs through that connection: the shared inbox your team replies from, the AI sales agent, broadcasts, and the COD confirmations, order updates and cart reminders that ZShop sends from your ZChat number.",
      "The platform comes with WhatsApp's rules as well. The one you'll meet first is the 24-hour rule: free-form replies are allowed only within 24 hours of the customer's last message, and anything later goes out as a template Meta has approved. Our [WhatsApp message templates](/solutions/whatsapp-message-templates/) page covers that rule and template approval in detail. This page is about getting access and what it costs.",
    ],
  },
  approach: {
    heading: "What does Zutok set up for you, and what does Meta do?",
    lead: "Meta runs the WhatsApp Business Platform, approves message templates and charges for template messages. Zutok gives you ZChat, the software your team works in, and helps you set up and verify your number and get your templates approved.",
    body: [
      "Zutok's part starts with the free 30-minute demo, where we look at your business and explain how the WhatsApp Business API would work for it. Once you choose a plan, onboarding configures your channels, catalogue and team together on a call, and Zutok helps you set up and verify your number, so it goes live in the same inbox your team will use.",
      "Meta's part stays with Meta. Template approval is Meta's decision, so Zutok guides you through it rather than promising an outcome or a date. Meta charges per template message, billed separately at its published rates for India and at cost, which means your ZChat plan price covers the software, your team seats and, from Growth, the AI sales agent.",
    ],
  },
  extra: [
    {
      heading: "Is the WhatsApp Business API free?",
      lead: `No. With Zutok you pay for two things: a ZChat plan, from ${perMonth("zchat", "Starter")} excl. 18% GST, and Meta's charges for template messages, which are billed separately at Meta's published rates for India, at cost.`,
      body: [
        "Meta publishes those rates on its own [WhatsApp Business Platform pricing page](https://developers.facebook.com/docs/whatsapp/pricing/), so check the current figures there rather than relying on a copy here. Meta charges per template message, by category, and the same page says free-form messages sent inside the 24-hour customer service window are free, and so are utility templates sent while that window is open.",
        "Your ZChat plan covers the software and your team seats on every plan, and the AI sales agent, broadcasts and Meta templates from Growth.",
      ],
    },
    {
      heading: "How many people on my team can answer WhatsApp customers?",
      lead: "As many as your plan has team seats: 2 on ZChat Starter, 5 on Growth and 15 on Scale, all working from one shared inbox.",
      body: [
        "A small business can start on Starter, which covers WhatsApp and Instagram with labels and quick replies, and syncs every contact to Zutok CRM as a lead. Growth adds Messenger and Telegram, team reports and the AI sales agent, which replies on all four channels and, with handoff on, hands a chat to your team when a customer asks for a person or the question falls outside its instructions.",
        "On Scale, auto-assign spreads new and waiting chats across the team so nothing sits unanswered, and you can run multiple AI agents.",
      ],
    },
    {
      heading: "When do you need an approved template instead of a normal reply?",
      lead: "When you message a customer more than 24 hours after their last message. Inside that window your team and the AI agent can reply freely; after it, the message has to be a template Meta has approved.",
      body: [
        "That's why every broadcast is a template, and why most ZShop order updates and website COD confirmations are too. ZChat Growth includes the template studio, where you create or sync Text, Image, PDF, Video and Button templates and track their approval. Formats, categories and approval are explained step by step on our [WhatsApp message templates](/solutions/whatsapp-message-templates/) page.",
      ],
    },
  ],
  steps: {
    heading: "How do you get the WhatsApp Business API with Zutok, step by step?",
    lead: "From the demo to a live inbox, Zutok does the setup with you, on a call rather than through a form.",
    items: [
      {
        title: "Book a free demo",
        body: "A 30-minute walkthrough built around your business, where we look at your setup and explain the WhatsApp Business API.",
      },
      {
        title: "Choose your ZChat plan",
        body: "Starter for a shared WhatsApp + Instagram inbox, Growth for the AI agent and broadcasts, Scale for bigger teams. No setup fee.",
      },
      {
        title: "Connect and verify your number",
        body: "During onboarding, Zutok helps you set up your number on the official WhatsApp Business Platform and verify it.",
      },
      {
        title: "Set up your team",
        body: "Channels, catalogue and team are configured together on the call, and each person gets a seat in the shared inbox.",
      },
      {
        title: "Get templates approved",
        body: "On ZChat Growth, create templates or sync them from Meta, and Zutok guides you through Meta's approval.",
      },
      {
        title: "Go live",
        body: "Customers message your number, chats land in the shared inbox, and every new chat becomes a lead in Zutok CRM with its source.",
      },
    ],
  },
  features: {
    heading: "What do you get with ZChat on the WhatsApp Business API?",
    lead: "Setup help and clear billing first, then everything that runs on your number. Where a feature starts on a higher plan or needs ZShop, it says so.",
    items: [
      { icon: "plug", title: "Number setup help", body: "Zutok helps you set up and verify your number during onboarding." },
      { icon: "template", title: "Template approval help", body: "Guidance through getting your message templates approved by Meta." },
      { icon: "receipt", title: "Meta's charges at cost", body: "Billed separately at Meta's published rates for India. No setup fee from Zutok." },
      { icon: "inbox", title: "Shared team inbox", body: "2, 5 or 15 team seats, with All, Mine and Unassigned views." },
      { icon: "bot", title: "AI sales agent (Growth)", body: "Quotes from your catalogue on WhatsApp, Instagram, Messenger and Telegram." },
      {
        icon: "megaphone",
        title: "Broadcasts (Growth)",
        body: "Approved templates to leads, contacts or a custom audience, with sent, delivered and read numbers.",
      },
      {
        icon: "package",
        title: "Store messages (ZShop)",
        body: "COD confirmations, order updates and cart reminders, sent from your ZChat number.",
      },
      { icon: "users", title: "Chats → CRM leads", body: "Every new chat creates a lead in Zutok CRM with its source." },
    ],
  },
  plan: {
    heading: "How much does the WhatsApp Business API cost in India with Zutok?",
    lead: `Two parts. The software is your ZChat plan, from Starter at ${priceLine("zchat", "Starter")}. Growth, at ${perMonth("zchat", "Growth")}, adds the AI sales agent and broadcasts, and Scale, at ${perMonth("zchat", "Scale")}, gives you 15 seats. Meta's charges for template messages come on top, billed separately at Meta's published rates for India and at cost. There is no setup fee.`,
    includes: [
      { label: "Team seats", from: "Starter" },
      { label: "AI sales agent", from: "Growth" },
      { label: "Broadcasts & Meta templates", from: "Growth" },
      { label: "Auto-assign", from: "Scale" },
    ],
    highlights: {
      Starter: "WhatsApp + Instagram in one shared inbox for 2 seats, with contacts synced to CRM leads.",
      Growth: "All 4 channels, 5 seats, the AI sales agent, broadcasts and Meta templates.",
      Scale: "Everything in Growth, with 15 seats, multiple AI agents and priority support.",
    },
    suite: "Suite Starter",
  },
  faqs: [
    {
      q: "Do I need the WhatsApp Business API?",
      a: "To use ZChat on WhatsApp, yes. ZChat connects to the official WhatsApp Business Platform, which is how business software sends and receives WhatsApp messages, and Zutok helps you set up and verify your number during onboarding.",
    },
    {
      q: "Is there a setup fee, and can I cancel?",
      a: "There's no setup fee. Monthly plans can be cancelled at the end of any month, yearly billing charges 10 months for 12, and upgrades are prorated. Downgrades take effect at the end of your billing period.",
    },
    {
      q: "Do you help get my number verified and my templates approved?",
      a: "Yes. Zutok helps you set up and verify your number during onboarding, and guides you through getting your message templates approved by Meta. Approval itself is Meta's decision, so we don't promise timelines.",
    },
    {
      q: "Are Meta's WhatsApp charges included in the ZChat price?",
      a: "No. Meta's per-message charges for template messages are billed separately, at its published rates for India and at cost. Your ZChat plan covers the software, your team seats and, from Growth, the AI sales agent.",
    },
    {
      q: "Can I use the WhatsApp Business API on ZChat Starter?",
      a: `Yes. Starter, at ${perMonth("zchat", "Starter")}, puts WhatsApp and Instagram in a shared inbox for 2 team seats, with labels, quick replies and contacts synced to CRM leads. The AI sales agent, broadcasts and Meta templates start with Growth at ${perMonth("zchat", "Growth")}.`,
    },
    {
      q: "Does the AI sales agent run on the WhatsApp Business API?",
      a: "Yes, from ZChat Growth. It answers on WhatsApp, Instagram, Messenger and Telegram, quotes the price, order link and files from the one catalogue row that matches the customer's choices, and hands the chat to your team when needed.",
    },
    {
      q: "What else can I run on the same WhatsApp number?",
      a: "Store messages. ZShop sends through ZChat, so your number also sends COD confirmations, order updates and, from ZShop Growth, abandoned-cart reminders. Buyer replies land in the same ZChat inbox.",
    },
  ],
  related: [
    "whatsapp-message-templates",
    "whatsapp-automation",
    "omnichannel-team-inbox",
    "whatsapp-broadcast-campaigns",
    "whatsapp-ai-sales-agent",
    "whatsapp-crm",
  ],
};
