import type { IndustrySlug } from "@/lib/industries";
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
  ],
  "d2c-fashion-brands": [
    "whatsapp-cod-confirmation",
    "abandoned-cart-recovery-whatsapp",
    "whatsapp-order-updates-courier-tracking",
    "instagram-comment-to-dm",
  ],
  "real-estate": ["indiamart-meta-lead-ads-crm", "whatsapp-ai-sales-agent", "instagram-comment-to-dm"],
  "agencies-services": ["gst-invoicing-crm", "indiamart-meta-lead-ads-crm", "crm-with-hrm-payroll"],
  "clinics-labs-salons": [
    "whatsapp-ai-sales-agent",
    "restaurant-membership-prepaid-wallet",
    "automated-winback-birthday-campaigns",
  ],
  "retail-franchises": ["crm-with-hrm-payroll", "restaurant-membership-prepaid-wallet", "automated-winback-birthday-campaigns"],
};

/** Industry guides that link to a solution page, in guide order. */
export const industriesForSolution = (slug: SolutionSlug) =>
  (Object.keys(industrySolutions) as IndustrySlug[]).filter((i) => industrySolutions[i].includes(slug));
