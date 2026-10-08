import { createElement, type ReactElement } from "react";
import type { Metadata } from "next";
import { productList, type Product, type ProductSlug } from "@/lib/products";
import { formatINR, pricing, YEARLY_MONTHS_CHARGED, type Plan, type PricingGroup } from "@/lib/pricing";
import { site } from "@/lib/site";
import { plainText } from "@/lib/inline-links";

export const SITE_URL = "https://www.zutok.in";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;

/** PNGs rendered at build time by src/app/brand/[file]/route.tsx. */
export const ORG_LOGO = "/brand/logo-512.png";

/**
 * Social cards rendered at build time by src/app/og/[card]/route.tsx. They are plain `.png` files because
 * GitHub Pages serves extensionless files (what `opengraph-image.tsx` exports to) as application/octet-stream.
 */
export type OgCard = "site" | "pricing" | ProductSlug;
export const ogCards: OgCard[] = ["site", "pricing", ...productList.map((p) => p.slug)];
export const OG_SIZE = { width: 1200, height: 630 };
export const ogImage = (card: OgCard) => `/og/${card}.png`;

/**
 * Absolute URL in the form the static export serves: page paths always end in a slash
 * ("/pricing" → "https://www.zutok.in/pricing/"), file paths ("/llms.txt") are left alone.
 */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const cut = path.search(/[?#]/);
  const suffix = cut === -1 ? "" : path.slice(cut);
  let pathname = cut === -1 ? path : path.slice(0, cut);
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  if (!pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(pathname)) pathname += "/";
  return `${SITE_URL}${pathname}${suffix}`;
}

/** "ZChat" → "Zutok ZChat". Product names collide with other brands, so pair them with Zutok everywhere. */
export const brandedName = (p: Pick<Product, "name">) => (p.name.startsWith("Zutok") ? p.name : `Zutok ${p.name}`);

export const pricingGroup = (id: PricingGroup["id"]) => pricing.find((g) => g.id === id) ?? pricing[0];

const pricedPlans = (g: PricingGroup) => g.plans.filter((p): p is Plan & { monthly: number } => p.monthly !== null);

/** Lowest monthly price (billed monthly, excluding GST) in a pricing group. */
export const startingPrice = (id: PricingGroup["id"]) => Math.min(...pricedPlans(pricingGroup(id)).map((p) => p.monthly));

/** "Zutok Complete Suite", "Zutok CRM", "Zutok ZChat": a pricing group's name, paired with the brand. */
export const groupName = (g: PricingGroup) => (g.id === "suite" ? "Zutok Complete Suite" : brandedName({ name: g.label }));

/* ------------------------------------------------------------------ */
/* Page copy                                                          */
/* ------------------------------------------------------------------ */

/** One consistent entity sentence for Zutok, built from the same data as the pages. */
export const BRAND_SUMMARY =
  "Zutok Softwares makes Zutok CRM, an all-in-one CRM built for Indian businesses and priced in rupees. " +
  "Three products plug into it: ZChat, a WhatsApp, Instagram, Messenger and Telegram inbox with an AI sales agent; " +
  "ZShop, which sends WhatsApp order updates, COD confirmations and abandoned-cart reminders for Shopify, WooCommerce and in-house stores; " +
  "and Zloya, which runs loyalty points, VIP tiers, memberships and retention journeys for restaurants, cafés, salons and stores. " +
  `Plans start at ₹${formatINR(Math.min(startingPrice("crm"), startingPrice("zchat")))}/month (billed monthly, excluding 18% GST), ` +
  `and the Complete Suite of all four starts at ₹${formatINR(startingPrice("suite"))}/month.`;

export const HOME_TITLE = "Zutok: WhatsApp & Instagram Automation and CRM for India";
export const HOME_DESCRIPTION =
  "Zutok automates WhatsApp and Instagram for Indian businesses: an AI sales agent, broadcasts, comment-to-DM, COD and cart reminders, loyalty and a CRM, in ₹.";

export const PRICING_TITLE = "Zutok Pricing in ₹: CRM, WhatsApp, Store & Loyalty Plans";
/** The direct answer to "How much does Zutok cost?", shown under the /pricing/ h1 and as its first FAQ. */
export const PRICING_SUMMARY =
  `Zutok CRM starts at ₹${formatINR(startingPrice("crm"))}/month, ZChat at ₹${formatINR(startingPrice("zchat"))}, ` +
  `Zloya at ₹${formatINR(startingPrice("zloya"))}, ZShop at ₹${formatINR(startingPrice("zshop"))} ` +
  `and the Complete Suite of all four at ₹${formatINR(startingPrice("suite"))}, billed monthly and excluding 18% GST. ` +
  `Yearly billing charges ${YEARLY_MONTHS_CHARGED} months for 12, and there is no setup fee.`;
export const PRICING_DESCRIPTION =
  `Zutok CRM from ₹${formatINR(startingPrice("crm"))}/month, ZChat from ₹${formatINR(startingPrice("zchat"))}, ` +
  `Zloya from ₹${formatINR(startingPrice("zloya"))}, ZShop from ₹${formatINR(startingPrice("zshop"))}, ` +
  `Complete Suite from ₹${formatINR(startingPrice("suite"))}. Excl. GST; yearly plans give 2 months free.`;

export const productSeo: Record<ProductSlug, { title: string; description: string; keywords: string[] }> = {
  zchat: {
    title: "Zutok ZChat: WhatsApp & Instagram Inbox with AI Sales Agent",
    description: `Zutok ZChat puts WhatsApp, Instagram, Messenger and Telegram in one shared inbox, with an AI sales agent that quotes from your catalogue. From ₹${formatINR(startingPrice("zchat"))}/mo.`,
    keywords: [
      "Zutok ZChat",
      "WhatsApp Instagram Messenger Telegram inbox with AI",
      "Telegram AI chatbot for business",
      "Telegram and WhatsApp in one inbox",
      "Messenger and Telegram AI replies",
      "AI sales agent for WhatsApp and Instagram",
    ],
  },
  zshop: {
    title: "Shopify & WooCommerce WhatsApp Integration | Zutok ZShop",
    description: `Connect Shopify, WooCommerce or an in-house counter. Zutok ZShop sends WhatsApp order updates, COD confirmations and cart reminders, from ₹${formatINR(startingPrice("zshop"))}/mo.`,
    keywords: [
      "Zutok ZShop",
      "Shopify WhatsApp integration",
      "WooCommerce WhatsApp integration",
      "WhatsApp automation for ecommerce",
      "Shopify WhatsApp order notifications",
      "WhatsApp for online store India",
    ],
  },
  zloya: {
    title: `Zutok Zloya: Loyalty Program Software India, from ₹${formatINR(startingPrice("zloya"))}`,
    description: `Zutok Zloya runs loyalty at the billing counter in any browser: points, 4 VIP tiers, OTP-protected redemptions, memberships and journeys, from ₹${formatINR(startingPrice("zloya"))}/mo.`,
    keywords: [
      "Zutok Zloya",
      "loyalty program software India",
      "customer loyalty program software",
      "loyalty points software for shops",
      "VIP tier loyalty program",
      "digital loyalty card",
      "loyalty program without POS integration",
      "OTP loyalty redemption",
    ],
  },
  crm: {
    title: "CRM Software for Small Business in India | Zutok CRM",
    description: `Zutok CRM for Indian businesses: leads, proposals, GST invoices, projects, HRM, inventory and support tickets in one CRM, with flat plans from ₹${formatINR(startingPrice("crm"))}/month.`,
    keywords: [
      "Zutok CRM",
      "CRM software for small business India",
      "CRM with inventory management",
      "CRM with support tickets",
      "CRM automation software India",
      "CRM with roles and permissions",
      "migrate from Excel to CRM",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Metadata                                                           */
/* ------------------------------------------------------------------ */

export type PageMetadataOptions = {
  title: string;
  description: string;
  /** Route path, e.g. "/products/zchat/". Used for the canonical URL and og:url. */
  path: string;
  keywords?: string[];
  /** Social card path; defaults to the site card. Use `ogImage(...)` for a product card. */
  image?: string;
  imageAlt?: string;
  /** Skip the " | Zutok" title template (for titles that already lead with the brand). */
  absoluteTitle?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image = ogImage("site"),
  imageAlt,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const images = [{ url: absoluteUrl(image), ...OG_SIZE, alt: imageAlt ?? title, type: "image/png" }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.company,
      locale: "en_IN",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD)                                          */
/* Every helper returns a bare node; <JsonLd> adds the @context.      */
/* Only describe what is visible on the same page.                    */
/* ------------------------------------------------------------------ */

type Node = Record<string, unknown>;

export function JsonLd({ data }: { data: object | object[] }): ReactElement {
  const doc = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(doc).replace(/</g, "\\u003c") },
  });
}

export function organizationLd(): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.company,
    alternateName: [site.name],
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: absoluteUrl(ORG_LOGO),
      contentUrl: absoluteUrl(ORG_LOGO),
      width: 512,
      height: 512,
      caption: site.company,
    },
    image: { "@id": LOGO_ID },
    description: BRAND_SUMMARY,
    slogan: site.tagline,
    email: site.email,
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: site.email, areaServed: "IN" }],
    knowsAbout: [
      "Customer relationship management (CRM)",
      "WhatsApp Business Platform",
      "Omnichannel inbox for WhatsApp, Instagram, Messenger and Telegram",
      "AI sales agents",
      "WhatsApp broadcasts and message templates",
      "Shopify and WooCommerce order automation",
      "Cash-on-delivery (COD) order confirmation",
      "Abandoned cart recovery",
      "Customer loyalty programs and memberships",
      "GST invoicing",
      "HRM and payroll",
      "Inventory management",
    ],
  };
}

export function websiteLd(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: site.company,
    alternateName: [site.name],
    description: HOME_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function webPageLd({
  path,
  name,
  description,
  about,
  type = "WebPage",
  image,
  breadcrumb = false,
}: {
  path: string;
  name: string;
  description: string;
  /** What the page is about, e.g. `{ "@id": softwareAppId("zchat") }`. Defaults to the organization. */
  about?: object;
  type?: string;
  image?: string;
  /** Link to the BreadcrumbList from `breadcrumbLd` on the same page. */
  breadcrumb?: boolean;
}): Node {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: about ?? { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) } } : {}),
    ...(breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

/** Breadcrumb trail, home first. The last item is the current page. */
export function breadcrumbLd(items: { name: string; path: string }[]): Node {
  const current = absoluteUrl(items[items.length - 1]?.path ?? "/");
  return {
    "@type": "BreadcrumbList",
    "@id": `${current}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** Only for Q&As whose answers are in the page's HTML. Link markup is dropped, leaving the words a reader sees. */
export function faqLd(items: { q: string; a: string }[], path?: string): Node {
  return {
    "@type": "FAQPage",
    ...(path ? { "@id": `${absoluteUrl(path)}#faq` } : {}),
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: plainText(it.q),
      acceptedAnswer: { "@type": "Answer", text: plainText(it.a) },
    })),
  };
}

export const softwareAppId = (slug: ProductSlug) => `${absoluteUrl(`/products/${slug}/`)}#software`;

const subCategory: Record<ProductSlug, string> = {
  zchat: "Omnichannel inbox and AI sales agent",
  zshop: "E-commerce order and WhatsApp automation",
  zloya: "Customer loyalty and retention",
  crm: "Customer relationship management (CRM)",
};

/**
 * One Offer per priced plan, with the monthly price and the yearly (10 months for 12) price, in INR excluding GST.
 * Set `features: false` where the page shows each plan's blurb but not its feature list (the /pricing/ table).
 */
export function planOffersLd(
  group: PricingGroup,
  url: string,
  itemOffered?: object | object[],
  { features = true }: { features?: boolean } = {},
): Node[] {
  return pricedPlans(group).map((plan) => ({
    "@type": "Offer",
    name: group.id === "suite" ? `Zutok ${plan.name}` : `${groupName(group)} ${plan.name}`,
    description: features ? `${plan.blurb} Includes: ${plan.features.join("; ")}.` : plan.blurb,
    price: plan.monthly,
    priceCurrency: "INR",
    priceSpecification: [
      {
        "@type": "UnitPriceSpecification",
        name: "Billed monthly",
        price: plan.monthly,
        priceCurrency: "INR",
        billingDuration: "P1M",
        unitText: "month",
        valueAddedTaxIncluded: false,
      },
      {
        "@type": "UnitPriceSpecification",
        name: `Billed yearly (${YEARLY_MONTHS_CHARGED} months for 12)`,
        price: plan.monthly * YEARLY_MONTHS_CHARGED,
        priceCurrency: "INR",
        billingDuration: "P1Y",
        unitText: "year",
        valueAddedTaxIncluded: false,
      },
    ],
    url,
    seller: { "@id": ORG_ID },
    ...(itemOffered ? { itemOffered } : {}),
  }));
}

const PRICE_NOTE = `Prices are in Indian Rupees and exclude 18% GST. Yearly billing charges ${YEARLY_MONTHS_CHARGED} months for 12.`;

export function softwareAppLd(product: Product, group: PricingGroup = pricingGroup(product.slug)): Node {
  const url = absoluteUrl(`/products/${product.slug}/`);
  const offers = planOffersLd(group, `${url}#pricing`);
  const prices = pricedPlans(group).map((p) => p.monthly);
  return {
    "@type": "SoftwareApplication",
    "@id": softwareAppId(product.slug),
    name: brandedName(product),
    ...(brandedName(product) !== product.name ? { alternateName: product.name } : {}),
    description: product.summary,
    url,
    image: absoluteUrl(ogImage(product.slug)),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: subCategory[product.slug],
    operatingSystem: "Web",
    featureList: product.features.map((f) => f.title),
    publisher: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: offers.length,
      description: `Monthly plan prices. ${PRICE_NOTE}`,
      offers,
    },
  };
}

/**
 * Every plan on /pricing/, grouped the way the pricing tabs are. The tabs render one group's feature lists at a time,
 * so the offers carry only the blurb that PlanPriceTable shows for every plan.
 */
export function offerCatalogLd(): Node {
  const url = absoluteUrl("/pricing/");
  const slugs = productList.map((p) => p.slug);
  return {
    "@type": "OfferCatalog",
    "@id": `${url}#plans`,
    name: "Zutok plans and prices",
    description: PRICE_NOTE,
    url,
    numberOfItems: pricing.length,
    itemListElement: pricing.map((g) => ({
      "@type": "OfferCatalog",
      name: groupName(g),
      ...(g.note ? { description: g.note } : {}),
      numberOfItems: pricedPlans(g).length,
      itemListElement: planOffersLd(
        g,
        url,
        g.id === "suite" ? slugs.map((s) => ({ "@id": softwareAppId(s) })) : { "@id": softwareAppId(g.id) },
        { features: false },
      ),
    })),
  };
}
