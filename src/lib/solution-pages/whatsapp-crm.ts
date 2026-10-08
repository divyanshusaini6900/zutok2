import { perMonth, priceLine, type SolutionEntry } from "@/lib/solution-kit";

/**
 * /solutions/whatsapp-crm/
 * Owns the CRM record behind a chat: every new ZChat conversation becomes a Zutok CRM lead with its source, then
 * pipeline, tasks and reminders, proposal, GST invoice and customer profile, kept in the company's account. How a team
 * answers chats is /solutions/omnichannel-team-inbox/, and IndiaMART / Meta Lead Ads capture is
 * /solutions/indiamart-meta-lead-ads-crm/; both are linked rather than repeated.
 * Plan split, because the sources don't say a ZChat-only account gets the full pipeline: chat-to-lead sync is ZChat
 * Starter; pipeline, tasks, proposals and GST invoices are Zutok CRM (from CRM Starter) or Suite Starter.
 * Not in the sources, so never claimed: lead scoring, lead auto-assignment, click-to-chat from a lead, call logging,
 * email sync, Zapier-style integrations, phone-number matching for chat leads (that is a ZShop buyer feature), a free trial.
 */
export const page: SolutionEntry = {
  name: "WhatsApp CRM",
  kicker: "Zutok ZChat + CRM · WhatsApp CRM",
  relatedProduct: "zchat",
  title: "WhatsApp CRM India: Turn Every Chat into a Lead",
  metaDescription:
    "Every WhatsApp, Instagram, Messenger and Telegram chat becomes a Zutok CRM lead with its source, then moves from Enquiry to Customer with tasks and reminders.",
  keywords: [
    "WhatsApp CRM",
    "WhatsApp CRM India",
    "CRM with WhatsApp integration India",
    "WhatsApp lead management",
    "WhatsApp leads to CRM",
    "Instagram and WhatsApp CRM",
    "WhatsApp CRM for small business",
    "WhatsApp sales CRM",
  ],
  h1: "The WhatsApp CRM where every chat becomes a lead",
  h1Accent: "where every chat becomes a lead",
  answer: `A WhatsApp CRM keeps each chat as a sales lead your team can follow up. With Zutok, every new WhatsApp or Instagram chat in ZChat creates a lead in Zutok CRM, tagged with its source. Chat-to-lead sync starts with ZChat Starter at ${perMonth("zchat", "Starter")}; the pipeline, proposals and GST invoices need Zutok CRM, from CRM Starter at ${perMonth("crm", "Starter")}, or take both in Suite Starter at ${perMonth("suite", "Suite Starter")}, excl. GST.`,
  summary:
    "How Zutok turns every WhatsApp, Instagram, Messenger and Telegram chat into a CRM lead with its source, then follows it from Enquiry to Customer and invoice.",
  facts: [
    { value: "4", label: "chat channels that create leads: WhatsApp, Instagram, Messenger and Telegram" },
    { value: "1", label: "pipeline for chat, IndiaMART, Meta Lead Ads, website and imported leads" },
    { value: "CSV/PDF", label: "export of your customers, leads and invoices, whenever you like" },
  ],
  problem: {
    heading: "Do I need a CRM for WhatsApp, or is the WhatsApp Business app enough?",
    lead: "If WhatsApp is where your sales start, you need a CRM. A chat app keeps the conversation; a CRM keeps the lead: where it came from, which stage it has reached, what you quoted and when someone has to follow up.",
    body: [
      "Without one, the record of a sale is spread across phones and memory. An enquiry on Instagram never reaches the person who handles WhatsApp, a promised call-back depends on someone remembering it, and when a salesperson leaves, the chats that started their deals can leave with their phone.",
      "A WhatsApp CRM puts that record in the company's account, next to every other lead, so the follow-up doesn't depend on whose phone the customer happened to message.",
    ],
  },
  approach: {
    heading: "How does a WhatsApp CRM work in Zutok?",
    lead: "ZChat and Zutok CRM run in the same account. When a new conversation starts, ZChat creates a lead in Zutok CRM tagged with the channel it came from, and your team replies to the chat right inside the CRM.",
    body: [
      "On ZChat Starter that covers WhatsApp and Instagram. From ZChat Growth, Messenger and Telegram chats become leads too, and so do replies to your broadcasts, comment-to-DM conversations and chats the AI sales agent answers first.",
      "So it's a CRM with WhatsApp built in rather than connected: there's no separate connector or browser extension to set up, because the inbox is part of the same Zutok account. Each lead then joins the pipeline, Enquiry → Follow-up → Hot → Customer, where tasks and reminders keep the next step on time.",
    ],
  },
  extra: [
    {
      heading: "Can WhatsApp leads sit in the same pipeline as IndiaMART and Meta Lead Ads leads?",
      lead: "Yes. Chat leads land on the same board as IndiaMART enquiries, Facebook and Instagram lead forms (Meta Lead Ads), estimate requests from your website and the leads you import from Excel, CSV or an old CRM.",
      body: [
        "That keeps WhatsApp lead management on one board: a buyer who fills in a lead form and a buyer who messages you are followed up the same way, and each keeps its source. The [IndiaMART and Meta Lead Ads](/solutions/indiamart-meta-lead-ads-crm/) page explains how those two sources sync in. Both are in every CRM plan from CRM Starter, and from CRM Growth, lead reports show how the pipeline is moving.",
      ],
    },
    {
      heading: "Can I send a quote or a GST invoice to a lead that came from WhatsApp?",
      lead: "Yes, in Zutok CRM. Send a proposal or estimate in rupees with tax fields, turn it into a GST invoice with tax rates like CGST and SGST once the customer accepts, and record the payment against it.",
      body: [
        "When the lead becomes a customer, everything sits on one customer profile: contacts, invoices, projects and support tickets, with the full history. Proposals, estimates and GST invoices are in every CRM plan from CRM Starter, and invoices export in bulk as PDF for your accountant.",
      ],
    },
    {
      heading: "How do you keep chats as company records instead of on a salesperson's phone?",
      lead: "Keep them in the company's Zutok account. Chats and the leads they create stay with the business, each staff member gets a role with its own permissions, and you can export customers, leads and invoices to CSV or PDF whenever you like.",
      body: [
        "Your data belongs to you, and it's stored on secure servers with regular database backups. When someone joins or leaves the sales team, the chats and leads stay where they are, and the next person picks up from the same record.",
      ],
    },
  ],
  steps: {
    heading: "How do you turn WhatsApp chats into CRM leads, step by step?",
    lead: "You set it up once, with Zutok's help during onboarding. After that, every new chat reaches the CRM without anyone copying it across.",
    items: [
      { title: "Import what you already have", body: "Customers and leads from Excel, CSV or your old CRM, with Zutok's help." },
      {
        title: "Connect WhatsApp and Instagram",
        body: "ZChat runs on the official WhatsApp Business Platform, and Zutok helps you set up and verify the number. Messenger and Telegram join on Growth.",
      },
      { title: "Set stages and roles", body: "Your lead stages, staff roles and permissions, tax rates and invoice format." },
      { title: "Let chats create leads", body: "Each new chat becomes a lead with its source and starts as an Enquiry." },
      { title: "Follow up on time", body: "Tasks and reminders on every lead as it moves to Follow-up and Hot." },
      { title: "Quote, invoice, close", body: "A proposal or estimate, then a GST invoice and payment, and the lead becomes a Customer." },
    ],
  },
  features: {
    heading: "What does Zutok's WhatsApp CRM include?",
    lead: "Chat-to-lead sync comes with ZChat. The pipeline, follow-ups and billing are Zutok CRM features.",
    items: [
      { icon: "users", title: "Every chat becomes a lead", body: "Created in Zutok CRM automatically, tagged with its source channel." },
      { icon: "inbox", title: "Inbox inside the CRM", body: "Your team replies to chats right inside Zutok CRM." },
      { icon: "layers", title: "One pipeline for every source", body: "Chats, IndiaMART, Meta Lead Ads, website requests and imports." },
      { icon: "calendar", title: "Tasks & reminders", body: "On every lead, so no follow-up is forgotten." },
      { icon: "file", title: "Proposals & estimates", body: "In rupees with tax fields, turned into invoices once accepted." },
      { icon: "receipt", title: "GST invoices & payments", body: "Tax rates like CGST and SGST on every line, with payments recorded." },
      { icon: "building", title: "Customer profiles", body: "Contacts, invoices, projects and tickets, with full history." },
      { icon: "megaphone", title: "Broadcasts to leads (Growth)", body: "Approved WhatsApp templates to leads, contacts or a custom list." },
    ],
  },
  plan: {
    heading: "How much does a WhatsApp CRM cost in India with Zutok?",
    lead: `WhatsApp and Instagram chats become CRM leads from ZChat Starter at ${priceLine("zchat", "Starter")}. The pipeline, tasks, proposals and GST invoices are Zutok CRM features, from CRM Starter at ${perMonth("crm", "Starter")} for up to 3 users, and Suite Starter, at ${perMonth("suite", "Suite Starter")}, bundles CRM Starter with ZChat Starter, ZShop Starter and Zloya for one outlet. Meta's WhatsApp charges are billed separately.`,
    includes: [
      { label: "Contacts sync to CRM leads", from: "Starter" },
      { label: "Messenger & Telegram chats as leads", from: "Growth" },
      { label: "Broadcasts to your leads", from: "Growth" },
    ],
    highlights: {
      Starter: "WhatsApp + Instagram chats become CRM leads, with 2 seats, labels and quick replies.",
      Growth: "WhatsApp and Instagram chats keep syncing as leads, Messenger and Telegram chats become leads too, plus broadcasts, the AI agent and 5 seats.",
      Scale: "Everything in Growth: chats on all 4 channels sync as leads, with 15 seats, auto-assign and export / import.",
    },
    suite: "Suite Starter",
  },
  faqs: [
    {
      q: "What is a WhatsApp CRM?",
      a: "A CRM that saves WhatsApp conversations as leads you can follow up, quote and invoice, instead of leaving them as chats on a phone. In Zutok, ZChat creates a lead in Zutok CRM for every new chat, tagged with its source, and the lead moves from Enquiry to Customer.",
    },
    {
      q: "How do I save WhatsApp chats in a CRM automatically?",
      a: "Connect your number to ZChat. From then on, every new WhatsApp chat creates a lead in Zutok CRM with its source on its own, with no copying, spreadsheet or browser extension. Contacts and leads you already have can be imported from Excel or CSV during onboarding.",
    },
    {
      q: "Can Instagram DMs, Messenger and Telegram chats become leads too?",
      a: `Yes. Instagram DMs become leads alongside WhatsApp from ZChat Starter at ${perMonth("zchat", "Starter")}, so it works as an Instagram and WhatsApp CRM from the first plan. Messenger and Telegram join on ZChat Growth at ${perMonth("zchat", "Growth")}. Each lead is tagged with the channel it came from.`,
    },
    {
      q: "Can store buyers from Shopify or WooCommerce join the same CRM?",
      a: "Yes, with ZShop. Every buyer from Shopify, WooCommerce or an in-house shop becomes a CRM lead, matched on phone number only, so two people with the same name are never mixed up. ZShop sends its WhatsApp messages from your ZChat number.",
    },
    {
      q: "Can the CRM remind me to follow up with a lead?",
      a: `Yes, in Zutok CRM. Every lead carries its own tasks and reminders from Enquiry through Follow-up and Hot to Customer, so a promised call-back doesn't depend on someone remembering it. The pipeline and reminders are Zutok CRM features, from CRM Starter at ${perMonth("crm", "Starter")}.`,
    },
    {
      q: "Do I need the WhatsApp Business API for a WhatsApp CRM?",
      a: "For ZChat, yes: it connects to the official WhatsApp Business Platform, covered on the [WhatsApp Business API](/solutions/whatsapp-business-api/) page. Zutok CRM itself works on its own, and chats join it once you add ZChat.",
    },
  ],
  related: [
    "omnichannel-team-inbox",
    "indiamart-meta-lead-ads-crm",
    "whatsapp-ai-sales-agent",
    "gst-invoicing-crm",
    "instagram-comment-to-dm",
    "whatsapp-automation",
  ],
};
