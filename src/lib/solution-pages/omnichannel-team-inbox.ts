import {
  bundlePlanNames,
  describeLimits,
  perMonth,
  priceLine,
  pricedPlan,
  type SolutionEntry,
} from "@/lib/solution-kit";

/** Each ZChat plan's limits, cheapest first (Starter, Growth, Scale), read from pricing.ts. */
const limits = ["Starter", "Growth", "Scale"].map((n) => pricedPlan("zchat", n).limits);
const [starterChannels, growthChannels, scaleChannels] = limits.map((l) => l?.channels);
const contacts = limits.map((l) => (l?.contacts == null ? "unlimited" : l.contacts.toLocaleString("en-IN")));
/** "500, 1,500 or unlimited" */
const contactRange = `${contacts[0]}, ${contacts[1]} or ${contacts[2]}`;

/**
 * /solutions/omnichannel-team-inbox/
 * Owns "how a human team works WhatsApp (plus Instagram, Messenger and Telegram) together": where chats come from,
 * Unassigned / Mine / All, Open / Pending / Resolved, labels and quick replies, auto-assign, AI handoff, team reports,
 * and the contacts × channels × CRM licenses × price split by plan. Which ZChat plan has which feature is not published
 * (owner's pricing, 2026-10-09), so no feature is tied to a plan. The lead record and pipeline belong to
 * /solutions/whatsapp-crm/, number setup and Meta's charges to /solutions/whatsapp-business-api/.
 * Not in the sources, so never claimed: internal notes, @mentions, collision detection, SLA timers, search, unread
 * counts, a mobile app, round-robin or skill routing, email / SMS / website chat, multiple numbers, team-seat counts or
 * extra-seat pricing, which channels count towards a plan's 1, 2 or 4. So the four platforms are "messaging apps" here,
 * and "channels" means only a plan's allowance.
 * Owner-confirmed (2026-10-09): every team member replies from the same business WhatsApp number.
 * Owner to confirm before saying more: how a chat is claimed or reassigned by hand. Until then the page only says what
 * the All / Mine / Unassigned views show, and auto-assign.
 */
export const page: SolutionEntry = {
  name: "Omnichannel team inbox",
  kicker: "Zutok ZChat · Omnichannel team inbox",
  relatedProduct: "zchat",
  title: "WhatsApp Team Inbox: Instagram, Messenger, Telegram",
  metaDescription:
    "Let your whole team reply from one WhatsApp number, plus Instagram, Messenger and Telegram, in one Zutok ZChat inbox with views, statuses and labels.",
  keywords: [
    "WhatsApp shared team inbox",
    "multiple users on one WhatsApp number",
    "omnichannel inbox India",
    "omnichannel team inbox",
    "WhatsApp team inbox",
    "WhatsApp multi-agent inbox",
    "unified inbox for WhatsApp Instagram Messenger Telegram",
    "WhatsApp customer support software",
    "WhatsApp chat assignment",
  ],
  h1: "An omnichannel team inbox for WhatsApp, Instagram, Messenger and Telegram",
  h1Accent: "for WhatsApp, Instagram, Messenger and Telegram",
  answer: `An omnichannel team inbox puts every chat channel in one shared inbox, so sales and support staff answer chats together from one WhatsApp number instead of sharing one phone. In Zutok ZChat, WhatsApp, Instagram, Messenger and Telegram land in one inbox, split by All, Mine and Unassigned views and Open, Pending and Resolved status. ZChat plans start at ${priceLine("zchat", "Starter")}.`,
  summary:
    "How a team answers WhatsApp, Instagram, Messenger and Telegram from one Zutok ZChat inbox, with views, statuses, labels, auto-assign and team reports.",
  facts: [
    { value: "4", label: "messaging apps in one inbox: WhatsApp, Instagram, Messenger and Telegram" },
    { value: "3 + 3", label: "views (All, Mine, Unassigned) and statuses (Open, Pending, Resolved)" },
    {
      value: String(scaleChannels),
      label: `channels on ZChat Scale, with ${starterChannels} on Starter and ${growthChannels} on Growth`,
    },
  ],
  problem: {
    heading: "What is a shared team inbox for WhatsApp, and when do you need one?",
    lead: "A shared team inbox, sometimes called a multi-agent inbox, is one place where several people answer the same business chats, each able to see which customers are theirs and which are still waiting. You need one when a single phone, or a few personal ones, can no longer show who is handling which customer.",
    body: [
      "The signs are familiar. Nobody is sure who answered the customer from this morning, while another customer has been waiting since lunch. Instagram DMs sit on a different phone from WhatsApp. A promised follow-up depends on someone remembering it, and when a staff member is on leave, their chats wait with their phone.",
      "A shared inbox fixes the visibility first. Every conversation sits in one place, every chat is either someone's or plainly unclaimed, and every chat shows whether it still needs work.",
    ],
  },
  approach: {
    heading: "How does a WhatsApp team inbox work in ZChat?",
    lead: "Every conversation lands in one inbox that the whole team works from. Three views split the work, three statuses keep waiting customers visible, and labels and quick replies speed up the everyday answers.",
    bullets: [
      "Views: All shows every conversation, Mine shows the chats that are yours, and Unassigned shows the ones nobody has picked up yet.",
      "Status: each conversation is Open, Pending or Resolved, so a customer who is still waiting never drops out of sight.",
      "Labels: tag conversations, for example by product or by the kind of enquiry, so the team can see what each chat is about.",
      "Quick replies: save answers to the questions you get every day, like timings and directions, and reuse them instead of retyping.",
    ],
    body: [
      "Chats don't only start with a customer's first message. Replies to your WhatsApp broadcasts, conversations started by comment-to-DM on Instagram and Facebook posts and reels, and buyers' replies to ZShop order updates and COD confirmations all land in the same inbox, so one team handles them together.",
      "Labels and quick replies are built in, and every new chat also creates a lead in Zutok CRM with its source, so a sales conversation never lives only in the inbox.",
    ],
  },
  extra: [
    {
      heading: "Can I manage WhatsApp, Instagram DMs, Messenger and Telegram in one unified inbox?",
      lead: "Yes. ZChat brings WhatsApp, Instagram, Messenger and Telegram into one omnichannel inbox, and each plan includes a set number of channels.",
      body: [
        "Choose by how many contacts and channels you need. Prices are billed monthly and exclude 18% GST, and Meta's per-message charges for WhatsApp template messages are billed separately.",
      ],
      bullets: [
        `ZChat Starter, ${perMonth("zchat", "Starter")}: ${describeLimits("zchat", "Starter")}.`,
        `ZChat Growth, ${perMonth("zchat", "Growth")}: ${describeLimits("zchat", "Growth")}, with ZShop and Zloya free.`,
        `ZChat Scale, ${perMonth("zchat", "Scale")}: ${describeLimits("zchat", "Scale")}, with ZShop and Zloya free.`,
      ],
    },
    {
      heading: "Can WhatsApp chats be assigned automatically?",
      lead: "Yes. Auto-assign spreads new and waiting chats across the team, so nothing sits unanswered. The Unassigned view shows chats nobody has taken yet, and Mine shows each person's own chats.",
      body: [
        "A simple routine for a small team: one person keeps an eye on Unassigned during busy hours, so new chats get a first answer, and All is there when a manager wants the full picture.",
        "When the AI sales agent is on, it answers first, on WhatsApp, Instagram, Messenger and Telegram alike. With handoff on, it passes a chat to a person whenever the customer asks for one or the question falls outside its instructions. The whole history stays in the same inbox, so whoever answers next can read what was already said.",
      ],
    },
    {
      heading: "How do I track chats that are still waiting, and how the team is doing?",
      lead: "Status shows what is waiting right now, and team reports show the pattern. Team reports cover conversations, resolution rate, average resolution time, and the load on each channel and each agent.",
      body: [
        "One way to use the statuses: Open for a chat that needs your team, Pending for one that is waiting on something, like the customer's reply or a price check, and Resolved once the question is answered.",
        "The reports answer the questions a manager usually asks: how many conversations came in, how many were resolved and how quickly, which channel is busiest, and whether one person is carrying more chats than the rest.",
      ],
    },
  ],
  steps: {
    heading: "How do you set up a WhatsApp team inbox, step by step?",
    lead: "Zutok configures your channels and team with you on a call during onboarding. After that, the routine is yours.",
    items: [
      {
        title: "Pick your plan",
        body: `ZChat Starter includes ${describeLimits("zchat", "Starter")}; Growth has ${growthChannels} channels and Scale ${scaleChannels}, with more contacts.`,
      },
      {
        title: "Connect your WhatsApp number",
        body: "ZChat runs on the official WhatsApp Business Platform. Zutok helps you set up and verify the number during onboarding.",
      },
      { title: "Link your other apps", body: "Instagram, Messenger or Telegram, each in a few clicks." },
      { title: "Add your team", body: "Everyone joins the shared inbox, and Mine shows each person their own chats." },
      {
        title: "Save labels and quick replies",
        body: "Tags for the kinds of chats you get, and saved answers for timings, directions and other everyday questions.",
      },
      {
        title: "Turn on handoff or auto-assign",
        body: "Let the AI agent answer first and hand chats over, or let auto-assign spread new and waiting chats across the team.",
      },
    ],
  },
  features: {
    heading: "What's in ZChat's shared team inbox?",
    lead: "Everything below works in the same inbox.",
    items: [
      {
        icon: "inbox",
        title: "Four apps, one inbox",
        body: "WhatsApp, Instagram, Messenger and Telegram, all in one shared inbox.",
      },
      { icon: "users", title: `${contactRange} contacts`, body: "Contacts on ZChat Starter, Growth and Scale." },
      { icon: "layers", title: "All, Mine, Unassigned", body: "Each person sees their own chats, and nobody misses unclaimed ones." },
      { icon: "timer", title: "Open, Pending, Resolved", body: "A status on every chat, so no customer waits unnoticed." },
      { icon: "tags", title: "Labels & quick replies", body: "Tag chats and answer everyday questions with saved replies." },
      { icon: "zap", title: "Auto-assign", body: "New and waiting chats are spread across the team automatically." },
      { icon: "chart", title: "Team reports", body: "Resolution rate, resolution time, and load per channel and per agent." },
      { icon: "bot", title: "AI agent with handoff", body: "Answers first, then passes the chat to a person with its history." },
    ],
  },
  plan: {
    heading: "How much does a WhatsApp team inbox cost in India?",
    lead: `ZChat Starter costs ${priceLine("zchat", "Starter")}, for ${describeLimits("zchat", "Starter")}. ZChat Growth, at ${perMonth("zchat", "Growth")}, gives ${describeLimits("zchat", "Growth")}, and ZChat Scale, at ${perMonth("zchat", "Scale")}, ${describeLimits("zchat", "Scale")}; both include ZShop and Zloya free. There is no setup fee, and Meta's WhatsApp charges are billed separately.`,
  },
  faqs: [
    {
      q: "Can my whole team reply from one WhatsApp number?",
      a: "Yes. Every team member replies from your one business WhatsApp number, in the shared ZChat inbox, so customers keep chatting with the same number whoever answers.",
    },
    {
      q: "How does a team share business WhatsApp chats in ZChat?",
      a: "Connect your number to ZChat (Zutok helps you set it up and verify it during onboarding) and add your team. Chats land in one shared inbox, where Unassigned shows chats nobody has taken yet and Mine shows each person their own.",
    },
    {
      q: "Do I need the WhatsApp Business API for a shared team inbox?",
      a: "Yes. ZChat connects to the official WhatsApp Business Platform, and the [WhatsApp Business API](/solutions/whatsapp-business-api/) page covers setup and Meta's charges.",
    },
    {
      q: "What happens to chats when someone is on leave or leaves the team?",
      a: "They stay in the shared inbox, not on a personal phone. The All view shows every conversation with its whole history, so the rest of the team can see which customers are still waiting, and every new chat is also saved as a lead in Zutok CRM.",
    },
    {
      q: "Can the AI agent hand a chat to a person in the same inbox?",
      a: "Yes. With handoff on, the agent passes the chat to your team when the customer asks for a person or the question falls outside its instructions, and the whole history stays with the chat.",
    },
    {
      q: "Where do replies to broadcasts, comment-to-DM and order updates go?",
      a: `Into the same shared inbox. Broadcasts and comment-to-DM are part of ZChat, and ZShop, free with ZChat ${bundlePlanNames()}, sends order updates and COD confirmations from your ZChat number, so buyers' replies arrive there too.`,
    },
    {
      q: "Is every new chat saved as a lead?",
      a: "Yes. Every new chat creates a lead in Zutok CRM with its source, so sales can follow it up from one place.",
    },
  ],
  related: [
    "whatsapp-crm",
    "whatsapp-ai-sales-agent",
    "instagram-comment-to-dm",
    "facebook-messenger-automation",
    "whatsapp-automation",
    "whatsapp-broadcast-campaigns",
  ],
};
