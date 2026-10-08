import { perMonth, priceLine, type SolutionEntry } from "@/lib/solution-kit";

/**
 * /solutions/facebook-messenger-automation/
 * Owns the Facebook Page and Messenger query family. Leads with Messenger chats and the AI agent, then the plan gating
 * (Messenger starts on ZChat Growth, while Instagram DMs are on Starter) and Facebook lead forms in the CRM. Comment
 * rule mechanics stay in one short section that points to /solutions/instagram-comment-to-dm/ instead of repeating it.
 * Meta's private-reply rules are quoted as Meta's own rules, from developers.facebook.com/docs/messenger-platform/
 * discovery/private-replies/ (checked October 2026), never as ZChat behaviour.
 * Not in the sources, so never claimed: AI-written comment replies, Messenger broadcasts, sponsored messages or one-time
 * notifications, click-to-Messenger ads, Groups / profiles / Stories / Live / ad comments, buttons or images in the
 * comment DM, sentiment or spam moderation, hiding comments, a free plan.
 */
export const page: SolutionEntry = {
  name: "Facebook Messenger automation",
  kicker: "Zutok ZChat · Facebook & Messenger",
  relatedProduct: "zchat",
  title: "Facebook Messenger Automation and AI Chatbot",
  metaDescription:
    "Zutok ZChat answers Facebook Messenger chats with an AI agent, replies to Page post and reel comments with a private DM, and turns every chat into a CRM lead.",
  keywords: [
    "Facebook Messenger automation",
    "Messenger chatbot for business India",
    "Facebook Messenger AI auto reply",
    "Facebook page auto reply",
    "Facebook comment auto reply",
  ],
  h1: "Facebook Messenger automation, from first message to CRM lead",
  h1Accent: "from first message to CRM lead",
  answer: `Facebook Messenger automation in Zutok ZChat gives your Facebook Page an AI sales agent that answers Messenger chats from your catalogue and business facts, and hands them to your team when needed. Rules on your Page's posts and reels reply to comments publicly and send a private DM, and every chat becomes a CRM lead. It starts on ZChat Growth at ${priceLine("zchat", "Growth")}.`,
  summary:
    "How Zutok ZChat automates a Facebook Page: AI answers in Messenger, a public reply and private DM for post and reel comments, and every chat saved as a CRM lead.",
  facts: [
    { value: "24/7", label: "AI replies in Messenger, from your catalogue and business facts" },
    { value: "1", label: "inbox for Messenger, WhatsApp, Instagram and Telegram chats" },
    { value: "Growth", label: "the ZChat plan Messenger starts on. Starter covers WhatsApp + Instagram" },
  ],
  problem: {
    heading: "Why do Facebook Page enquiries go unanswered?",
    lead: "Because they arrive in three places at once: Messenger chats, comments under your posts and reels, and lead forms from your ads. Each needs a different reply, and each usually sits on a different screen from your WhatsApp.",
    body: [
      "Most of those messages ask something specific: the price of the outfit in a reel, whether you deliver to an area, what a property's price list says. A set greeting doesn't answer them, and a reply in the comments puts the details in front of everyone instead of starting a conversation you can follow up.",
      "Automating a Facebook Page well means answering Messenger properly, moving comments into private chats, and making sure every one of those people ends up as a lead someone can call back.",
    ],
  },
  approach: {
    heading: "Can an AI agent answer Facebook Messenger chats for my business?",
    lead: "Yes. On ZChat Growth, the same AI sales agent that answers WhatsApp, Instagram and Telegram also answers Messenger. It asks each product choice as a numbered list, then replies with the price, order link and files from the one catalogue row that matches.",
    body: [
      "It isn't a Messenger chatbot you build as a flow. You add your products with your own columns and rows, plus business facts like timings, address, delivery areas, and payment and return policy, and the agent works from those. It answers only from what you've given it and never guesses.",
      "You choose the model it runs on, OpenAI, Anthropic Claude, Google Gemini, Vertex AI or your own, with your own temperature and reply length. With handoff on, any chat where the customer asks for a person, or the question falls outside the agent's instructions, moves to your team with the whole history.",
      "For a property broker, that might mean a buyer asks about a project in Messenger late at night and gets the price list file from that project's catalogue row. For a clothing brand, a shopper picks a size and colour and gets the order link.",
    ],
  },
  extra: [
    {
      heading: "Why does Messenger need ZChat Growth when Instagram works on Starter?",
      lead: `Because ZChat Starter covers WhatsApp and Instagram only. Messenger starts on ZChat Growth, at ${perMonth("zchat", "Growth")}, together with Telegram, the AI sales agent and comment-to-DM.`,
      body: [
        "So a business that only needs Instagram DMs in a shared inbox can start on Starter, while a Facebook Page's messages need Growth. Growth also gives you 5 team seats and team reports, and ZChat Scale adds 15 seats, multiple AI agents and auto-assign for busier Pages.",
        "Broadcasts in ZChat are WhatsApp campaigns on Meta-approved templates. On Facebook, ZChat automates the Messenger replies and the comment rules.",
      ],
    },
    {
      heading: "How do I auto-reply to Facebook comments with a private message?",
      lead: "Add a comment rule in ZChat and choose its trigger: keywords you pick, or any comment on your Facebook posts and reels. Each matching comment gets your public reply underneath and your private DM, and the activity log keeps a record of every auto-reply.",
      body: [
        "Both texts are written by you, so the rule only ever sends what you approved. Rules work the same way on Instagram, so trigger choices and example reply pairs are covered on the [Instagram automation](/solutions/instagram-comment-to-dm/) page.",
        "Meta sets its own rules for private replies to comments. These are Meta's rules, not ZChat settings, and Meta can change them; its [Messenger Platform documentation](https://developers.facebook.com/docs/messenger-platform/discovery/private-replies/) says:",
      ],
      bullets: [
        "Only one private message can be sent to the person who commented.",
        "It has to be sent within 7 days of the post or comment being created.",
        "The conversation continues only once the person replies, inside Meta's 24-hour messaging window.",
      ],
    },
    {
      heading: "Do Facebook lead form leads go into the same CRM as Messenger chats?",
      lead: `Yes. Facebook and Instagram lead forms (Meta Lead Ads) sync into Zutok CRM and land in the Enquiry stage with their source and mapped fields, next to the leads your Messenger chats create. Lead Ads sync is in every Zutok CRM plan, from CRM Starter at ${perMonth("crm", "Starter")}.`,
      body: [
        "A real estate business, for example, can run a site-visit request form on Facebook while comment rules answer its listing reels. Both kinds of enquiry land on one Enquiry → Follow-up → Hot → Customer pipeline, with tasks and reminders for the call-backs. The [IndiaMART and Meta Lead Ads](/solutions/indiamart-meta-lead-ads-crm/) page covers the lead-form side in detail.",
      ],
    },
  ],
  steps: {
    heading: "How do you set up Facebook Page auto replies and Messenger automation, step by step?",
    lead: "Messenger, the AI agent and comment rules are all part of ZChat Growth, so it's one setup.",
    items: [
      { title: "Start on ZChat Growth", body: "Messenger, the AI agent and comment-to-DM start on Growth, with 5 team seats." },
      { title: "Link Messenger", body: "Connect Messenger to ZChat in a few clicks, next to WhatsApp, Instagram and Telegram." },
      {
        title: "Give the agent your catalogue",
        body: "Products with your own columns and rows, plus your business facts. Or import them from a sheet.",
      },
      {
        title: "Pick a model, turn on handoff",
        body: "OpenAI, Anthropic Claude, Google Gemini, Vertex AI or your own model, and handoff to your team.",
      },
      { title: "Write your comment rules", body: "Keywords or any comment, then the public reply and the private DM." },
      { title: "Connect your lead forms", body: "In Zutok CRM, Meta Lead Ads sync into the same pipeline as your Messenger leads." },
    ],
  },
  features: {
    heading: "What does ZChat automate on Facebook and Messenger?",
    items: [
      { icon: "bot", title: "AI agent in Messenger", body: "Numbered choices, then the price, order link and files from the matching row." },
      { icon: "plug", title: "Your choice of AI model", body: "OpenAI, Anthropic Claude, Google Gemini, Vertex AI or your own." },
      { icon: "support", title: "Handoff with history", body: "The chat moves to a person with every earlier message." },
      { icon: "comment", title: "Comment rules", body: "A public reply and a private DM on Facebook posts and reels, each one logged." },
      { icon: "chart", title: "Team reports", body: "Conversations, resolution rate and load per channel, Messenger included." },
      { icon: "inbox", title: "One inbox, four channels", body: "Messenger next to WhatsApp, Instagram and Telegram." },
      { icon: "users", title: "Chats → CRM leads", body: "Each new Messenger chat becomes a lead with its source." },
      { icon: "megaphone", title: "Lead forms in the pipeline", body: "Meta Lead Ads sync into Zutok CRM, from CRM Starter." },
    ],
  },
  plan: {
    heading: "How much does Facebook Messenger automation cost?",
    lead: `Messenger, the AI sales agent and comment-to-DM come with ZChat Growth at ${priceLine("zchat", "Growth")}, with 5 team seats. ZChat Starter, at ${perMonth("zchat", "Starter")}, doesn't include Messenger. Facebook lead-form sync is a Zutok CRM feature, from CRM Starter at ${perMonth("crm", "Starter")}.`,
    includes: [
      { label: "Messenger in the shared inbox", from: "Growth" },
      { label: "AI sales agent on Messenger", from: "Growth" },
      { label: "Comment → DM on Facebook posts & reels", from: "Growth" },
      { label: "Auto-assign", from: "Scale" },
    ],
    highlights: {
      Starter: "WhatsApp + Instagram for 2 seats. Messenger isn't included.",
      Growth: "All 4 channels including Messenger, 5 seats, the AI agent, comment → DM and team reports.",
      Scale: "Everything in Growth with 15 seats, multiple AI agents and auto-assign.",
    },
    suite: "Suite Growth",
  },
  faqs: [
    {
      q: "Will the AI make up answers in Messenger?",
      a: "No. It quotes prices, order links and files only from the catalogue row that matches the customer's choices, answers other questions only from the business facts you add, and never guesses. With handoff on, anything outside its instructions goes to your team.",
    },
    {
      q: "Can my team reply to Messenger chats themselves?",
      a: "Yes. Messenger chats sit in ZChat's shared inbox next to WhatsApp, Instagram and Telegram, with All, Mine and Unassigned views and Open, Pending and Resolved status, so your team sees which chats still need an answer. When the AI hands a chat over, its whole history stays with it.",
    },
    {
      q: "Is every Messenger chat saved as a CRM lead?",
      a: "Yes. Every new chat creates a lead in Zutok CRM with its source. With Zutok CRM, from CRM Starter, those leads share one Enquiry → Follow-up → Hot → Customer pipeline with your Facebook lead-form leads, with tasks and reminders for each follow-up.",
    },
    {
      q: "Can one tool handle Facebook comments, Messenger and Instagram together?",
      a: "Yes. ZChat's comment rules work on Facebook and Instagram posts and reels, and Messenger chats land in one inbox with Instagram, WhatsApp and Telegram, where the same AI agent answers and every new chat becomes a CRM lead.",
    },
    {
      q: "When is a simple automatic reply on my Facebook Page enough?",
      a: "When everyone should get the same message, such as a greeting or an away notice, a fixed automatic reply does the job. ZChat is for when the answer depends on the question: a price from your catalogue, a delivery area from your business facts, or a handoff to a person.",
    },
    {
      q: "Do Facebook lead forms need ZChat?",
      a: `No. Facebook and Instagram lead forms (Meta Lead Ads) sync into Zutok CRM, which includes them in every plan from CRM Starter at ${perMonth("crm", "Starter")}. ZChat Growth is what adds Messenger chats, the AI agent and comment rules.`,
    },
  ],
  related: [
    "instagram-comment-to-dm",
    "indiamart-meta-lead-ads-crm",
    "whatsapp-ai-sales-agent",
    "omnichannel-team-inbox",
    "whatsapp-crm",
    "whatsapp-automation",
  ],
};
