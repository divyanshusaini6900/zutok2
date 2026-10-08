import type { IndustrySlug } from "@/lib/industries";
import type { ProductSlug } from "@/lib/products";
import type { SolutionSlug } from "@/lib/solutions";

/**
 * The solution pages each industry guide links to, and (reversed) the guides each solution page links back to.
 * Only pairs where the guide itself describes that use case.
 */
export const industrySolutions: Record<IndustrySlug, SolutionSlug[]> = {
  "restaurants-cafes": [
    "restaurant-membership-prepaid-wallet",
    "restaurant-qr-code-customer-data",
    "automated-winback-birthday-campaigns",
    // The guide's ZChat section: a shared inbox with All, Mine and Unassigned views, and every new chat saved as a lead.
    "omnichannel-team-inbox",
    "whatsapp-crm",
  ],
  "d2c-fashion-brands": [
    "whatsapp-cod-confirmation",
    "abandoned-cart-recovery-whatsapp",
    "whatsapp-order-updates-courier-tracking",
    "whatsapp-ai-sales-agent",
    "whatsapp-message-templates",
    "instagram-comment-to-dm",
    // "price?" comments on Facebook posts and reels, and Messenger in the shared inbox.
    "facebook-messenger-automation",
  ],
  "real-estate": [
    "indiamart-meta-lead-ads-crm",
    "whatsapp-crm",
    "whatsapp-ai-sales-agent",
    "omnichannel-team-inbox",
    "instagram-comment-to-dm",
    // Comment → DM on Facebook listing reels, and Meta lead forms for site visits.
    "facebook-messenger-automation",
  ],
  "agencies-services": [
    "gst-invoicing-crm",
    "indiamart-meta-lead-ads-crm",
    "crm-with-hrm-payroll",
    "omnichannel-team-inbox",
    "whatsapp-crm",
  ],
  "clinics-labs-salons": [
    "whatsapp-ai-sales-agent",
    "omnichannel-team-inbox",
    // The guide's FAQ on the WhatsApp Business app vs the official platform for a busy front desk.
    "whatsapp-business-api",
    "restaurant-membership-prepaid-wallet",
    "automated-winback-birthday-campaigns",
  ],
  "retail-franchises": ["crm-with-hrm-payroll", "restaurant-membership-prepaid-wallet", "automated-winback-birthday-campaigns"],
};

/** Industry guides that link to a solution page, in guide order. */
export const industriesForSolution = (slug: SolutionSlug) =>
  (Object.keys(industrySolutions) as IndustrySlug[]).filter((i) => industrySolutions[i].includes(slug));

/**
 * Solution pages filed under another product that a product page also lists among its use cases, because the
 * product runs on them: ZShop sends from the ZChat number on Meta-approved templates, and every ZChat chat becomes
 * a Zutok CRM lead.
 */
export const productExtraSolutions: Record<ProductSlug, SolutionSlug[]> = {
  zchat: [],
  zshop: ["whatsapp-message-templates", "whatsapp-business-api"],
  zloya: [],
  crm: ["whatsapp-crm"],
};
