import { perMonth, priceLine, type SolutionEntry } from "@/lib/solution-kit";

/**
 * /solutions/whatsapp-message-templates/
 * Owns the "create a template, get it approved, and know when you need one" intent: definition, session vs template, the
 * 24-hour rule on a real order, the five formats, the three categories and what approved templates are used for.
 * Sending campaigns stays on /solutions/whatsapp-broadcast-campaigns/, which this page links to.
 * Guardrails: no approval timelines or guarantees, no rejection lists, no editing rules, no size or button limits, no
 * carousels or template libraries, no OTP-sending product, no Meta rate figures.
 * The template studio and broadcasts are "part of Zutok ZChat, with plans from …": which ZChat plan includes them is not
 * published (owner's pricing, 2026-10-09), so no plan is named.
 * Meta's charges follow Meta's own pricing page (developers.facebook.com/docs/whatsapp/pricing/, checked 2026-10-09):
 * per template message by category, and utility templates sent inside an open customer service window are free.
 */
export const page: SolutionEntry = {
  name: "WhatsApp message templates",
  kicker: "Zutok ZChat · Template studio",
  relatedProduct: "zchat",
  title: "WhatsApp Template Messages: Approval & 24-Hour Rule",
  metaDescription:
    "Create Text, Image, PDF, Video and Button WhatsApp templates in Zutok ZChat, track Meta approval, and learn when WhatsApp's 24-hour rule means you need one.",
  keywords: [
    "WhatsApp template message",
    "WhatsApp message template approval",
    "how to create WhatsApp template",
    "WhatsApp template categories marketing utility authentication",
    "WhatsApp 24 hour rule",
    "session message vs template message",
    "WhatsApp template with buttons",
    "WhatsApp template with image",
  ],
  h1: "WhatsApp template messages, from approval to the 24-hour rule",
  h1Accent: "from approval to the 24-hour rule",
  answer: `A WhatsApp template message is written in advance and approved by Meta, and you need one whenever you message a customer more than 24 hours after their last message. In Zutok ZChat's template studio, Indian businesses create or sync Text, Image, PDF, Video and Button templates, choose Marketing, Utility or Authentication, and track approval. ZChat plans start at ${priceLine("zchat", "Starter")}.`,
  summary:
    "What a WhatsApp template message is, when the 24-hour rule means you need one, and how to create, categorise and get templates approved in Zutok ZChat.",
  facts: [
    { value: "24 h", label: "after the customer's last message, free-form replies stop and templates take over" },
    { value: "5", label: "formats: Text, Image, PDF, Video and Button" },
    { value: "1 click", label: "to sync the templates you've already made in Meta" },
  ],
  problem: {
    heading: "What is a WhatsApp template message, and when do you need one?",
    lead: "A template is a message you write in advance and submit to Meta under a category; once Meta approves it, you can send it. You need one whenever you message a customer more than 24 hours after their last message, because WhatsApp only allows free-form messages inside that window.",
    body: [
      "That window is often called the 24-hour session window, and it decides more of your messages than you might expect. Broadcasts go to people who mostly haven't written to you that day. Order updates usually arrive days after the last chat. And a buyer who ordered on your website has never messaged you on WhatsApp at all, so their COD confirmation is usually a template too.",
    ],
    bullets: [
      "Free-form (session) message: written on the spot and sent within 24 hours of the customer's last message. This is how your team and the AI sales agent reply in ZChat's shared inbox.",
      "Template message: written in advance and approved by Meta. Needed for anything sent after those 24 hours, including broadcasts and most order updates.",
    ],
  },
  approach: {
    heading: "How do you create a WhatsApp template and get it approved in ZChat?",
    lead: "In ZChat's template studio. Create the template there, or sync one you've already made in Meta, pick its category and follow its approval status until Meta approves it. Zutok guides you through the approval.",
    body: [
      "The studio has five formats (Text, Image, PDF, Video and Button) and three categories (Marketing, Utility and Authentication), and every template shows where it is in Meta's approval. If you've already built templates in Meta, they come into ZChat in one click, so you don't rebuild them by hand.",
      "Approval is Meta's call, so nobody can promise you a result or a date. What Zutok does is guide you through getting your templates approved.",
    ],
  },
  extra: [
    {
      heading: "How does WhatsApp's 24-hour rule play out on a real order?",
      lead: "By the clock. The window closes 24 hours after the customer's last message, so anything you send days later, like shipping and delivery updates, has to be an approved template.",
      bullets: [
        "Day 0: a customer asks about a product on WhatsApp. Your team or the AI agent replies free-form, and the customer orders.",
        "Day 1: 24 hours after their last message, the window closes.",
        "Day 2: the order ships. The shipped update has to be an approved template.",
        "Day 4: the order arrives. The delivered update needs a template too.",
        "Whenever the customer replies, the 24 hours start again from that message, so your team can answer free-form.",
      ],
    },
    {
      heading: "Can a WhatsApp template include an image, a PDF, a video or buttons?",
      lead: "Yes. ZChat's template studio has five formats, and each one suits a different job. Every format can be created in the studio or synced from Meta.",
      bullets: [
        "Text: the everyday format, for announcements, updates and reminders.",
        "Image: when the picture does the selling, like a new collection or an offer.",
        "PDF: when customers want the full list, such as your catalogue, menu or price list.",
        "Video: a short video alongside your message.",
        "Button: when you want a one-tap answer, like the ✅ Confirm and ❌ Cancel buttons on a COD confirmation.",
      ],
    },
    {
      heading: "Which category should a template go under: Marketing, Utility or Authentication?",
      lead: "The one that matches what the message is for. You submit each template to Meta under one of these three categories, and you choose it in ZChat when you create the template.",
      bullets: [
        "Marketing: promotional messages, such as a new collection, an offer or a campaign broadcast.",
        "Utility: updates about something the customer has already started with you, such as an order confirmation or a delivery update.",
        "Authentication: verification codes, such as a one-time password.",
      ],
    },
  ],
  steps: {
    heading: "How does a template go from draft to the customer's phone?",
    lead: "You connect your number once. After that, every template follows the same path, and the replies come back to one inbox.",
    items: [
      {
        title: "Connect your number",
        body: "ZChat runs on the official WhatsApp Business Platform, and Zutok helps you set up and verify your number.",
      },
      {
        title: "Write it or sync it",
        body: "Create the template in the studio in one of five formats, or bring in the ones you've made in Meta in one click.",
      },
      { title: "Pick the category", body: "Marketing, Utility or Authentication, to match what the message is for." },
      { title: "Track Meta's approval", body: "The studio shows each template's approval status, and Zutok guides you through it." },
      {
        title: "Put it to work",
        body: "Send it as a broadcast to leads, contacts or a custom audience, or map it in ZShop to a COD confirmation, order update or cart reminder.",
      },
      {
        title: "Answer the replies",
        body: "Replies land in ZChat's shared inbox, and a reply restarts the 24 hours, so your team can answer free-form.",
      },
    ],
  },
  features: {
    heading: "Where do approved templates get used in Zutok?",
    lead: "In two places: ZChat broadcasts, and the store messages ZShop sends from your ZChat number. The tools that manage them sit in the same studio.",
    items: [
      {
        icon: "megaphone",
        title: "Broadcasts",
        body: "Send to leads, contacts or a custom audience, with live sent, delivered and read numbers.",
      },
      { icon: "receipt", title: "COD confirmation (ZShop)", body: "Website COD buyers get an approved template that ZShop fills in." },
      { icon: "package", title: "Order updates (ZShop)", body: "Placed, packed, shipped and delivered, each mapped to a template once." },
      { icon: "cart", title: "Cart reminders (ZShop)", body: "Each of the three reminders can go out as its own approved template." },
      { icon: "workflow", title: "Numbered blanks filled in", body: "ZShop shows which order or cart fields fill each numbered blank." },
      { icon: "swap", title: "One-click Meta sync", body: "Templates you've already made in Meta come straight into ZChat." },
      { icon: "layers", title: "Approval status", body: "See where each template is in Meta's approval." },
      { icon: "inbox", title: "Replies in one inbox", body: "Customer replies land in ZChat's shared inbox for your team or the AI agent." },
    ],
  },
  plan: {
    heading: "What do WhatsApp templates cost with Zutok?",
    lead: `The template studio and broadcasts are part of Zutok ZChat, with plans from ${priceLine("zchat", "Starter")}. Meta may also charge for each template message you send, billed separately at Meta's published rates for India and at cost; its [pricing page](https://developers.facebook.com/docs/whatsapp/pricing/) has the current rates.`,
  },
  faqs: [
    {
      q: "What's the difference between a session message and a template message?",
      a: "A session (free-form) message is any reply sent within 24 hours of the customer's last message. A template message is written in advance and approved by Meta, and it's the only kind you can send after those 24 hours.",
    },
    {
      q: "Do WhatsApp templates need Meta's approval?",
      a: "Yes. Each template is submitted to Meta under a category and can be sent once it's approved. ZChat shows the approval status of every template, and Zutok guides you through getting templates approved. Approval itself is Meta's decision.",
    },
    {
      q: "Can I use templates I've already made in Meta?",
      a: "Yes. Templates you've already made in Meta sync into ZChat's template studio in one click, so you can use them in broadcasts without rebuilding them.",
    },
    {
      q: "What happens when a customer replies to a template?",
      a: "The reply lands in ZChat's shared inbox. Because the 24 hours count from the customer's last message, your team or the AI sales agent can then answer free-form, and a new chat becomes a lead in Zutok CRM with its source.",
    },
    {
      q: "How do order details get into an order-update template?",
      a: "Through ZShop's template mapping. You map your Meta-approved templates once, and ZShop shows which order or cart fields fill each numbered blank, then fills them in for every COD confirmation, order update and cart reminder.",
    },
    {
      q: "Is it free to send WhatsApp template messages?",
      a: `Not always. Meta charges per template message by category (Marketing, Utility or Authentication) at its published rates for India, billed separately from your Zutok plan and at cost. Meta's [pricing page](https://developers.facebook.com/docs/whatsapp/pricing/) also says utility templates sent while the customer service window is open, the 24 hours after the customer's last message, are free. The template studio itself is part of Zutok ZChat, from ${perMonth("zchat", "Starter")}.`,
    },
  ],
  related: [
    "whatsapp-broadcast-campaigns",
    "whatsapp-business-api",
    "whatsapp-order-updates-courier-tracking",
    "whatsapp-cod-confirmation",
    "abandoned-cart-recovery-whatsapp",
    "whatsapp-automation",
  ],
};
