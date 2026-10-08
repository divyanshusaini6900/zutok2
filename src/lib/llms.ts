import { homeFaqs, onboardingSteps, pricingFaqs, type QA } from "@/lib/company";
import { industriesHub, industryH1, industryList, industryPath } from "@/lib/industries";
import {
  formatINR,
  getGroup,
  isBundled,
  listJoin,
  pricedPlans,
  pricing,
  productPriceNote,
  yearlyTotal,
  zchatFrom,
  YEARLY_MONTHS_CHARGED,
  ZSHOP_ZLOYA_INCLUDED,
  ZSHOP_ZLOYA_NOTE,
  type PricingGroup,
} from "@/lib/pricing";
import { platformModules, products, type Product } from "@/lib/products";
import { SOLUTIONS_HUB, solutionPath, solutions } from "@/lib/solutions";
import { site } from "@/lib/site";
import { isExternal, mapLinks } from "@/lib/inline-links";
import {
  BRAND_SUMMARY,
  PRICING_DESCRIPTION,
  absoluteUrl,
  brandedName,
  groupName,
  startingPrice,
} from "@/lib/seo";

/*
 * /llms.txt and /llms-full.txt (https://llmstxt.org), built from the same data modules as the pages,
 * so they can't say anything the site doesn't. Plain Markdown, absolute URLs.
 */

// The CRM first: the other three plug into it.
const family: Product[] = [products.crm, products.zchat, products.zshop, products.zloya];

const price = (n: number) => `₹${formatINR(n)}`;
const link = (label: string, path: string, note?: string) => `- [${label}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;
/** Copy with "[label](/path/)" links (src/lib/inline-links.ts) as Markdown with absolute URLs. */
const md = (s: string) => mapLinks(s, (href) => (isExternal(href) ? href : absoluteUrl(href)));
const faqBlock = (items: QA[]) => items.map((f) => `**${md(f.q)}**\n${md(f.a)}`).join("\n\n");

/** "₹19,200 for Starter, ₹47,988 for Growth and ₹95,988 for Scale": ZChat's yearly prices, as the owner set them. */
const zchatYearly = listJoin(pricedPlans(getGroup("zchat")).map((p) => `${price(yearlyTotal(p) ?? 0)} for ${p.name}`));

const keyFacts = [
  `- Website: ${absoluteUrl("/")}`,
  `- Company: ${site.company}, also called ${site.name}. Its products are always named with the brand: ${family.map(brandedName).join(", ")}.`,
  "- Market: businesses in India that sell on WhatsApp, Instagram and at the counter.",
  `- Prices: in Indian Rupees (INR), excluding 18% GST. The plans are Zutok ZChat and Zutok CRM, billed monthly or yearly. ` +
    `${ZSHOP_ZLOYA_NOTE} They aren't sold separately. ` +
    `Zutok CRM yearly billing charges ${YEARLY_MONTHS_CHARGED} months for 12; ZChat yearly prices are ${zchatYearly}. No setup fee.`,
  "- WhatsApp: ZChat connects to the official WhatsApp Business Platform. Meta's per-message charges for WhatsApp template messages are billed separately at Meta's published rates.",
  `- Contact: ${site.email}. Book a demo at ${absoluteUrl("/#demo")}. Customers log in at ${new URL(site.loginUrl).href}.`,
];

const productLine = (p: Product) => `${p.kicker}. ${p.summary} ${productPriceNote(p.slug)}`;

/** The short index: what Zutok is and where each topic lives. */
export function llmsTxt(): string {
  return [
    `# ${site.company}`,
    `> ${BRAND_SUMMARY}`,
    keyFacts.join("\n"),
    "## Products",
    family.map((p) => link(brandedName(p), `/products/${p.slug}/`, productLine(p))).join("\n"),
    "## Solutions",
    [
      link("All Zutok solutions", "/solutions/", SOLUTIONS_HUB.description),
      ...solutions.map((s) => link(s.name, solutionPath(s.slug), s.summary)),
    ].join("\n"),
    "## Industries",
    [
      link("All industry guides", industriesHub.path, industriesHub.description),
      ...industryList.map((i) => link(i.name, industryPath(i.slug), `${industryH1(i)}. ${i.tagline}`)),
    ].join("\n"),
    "## Pricing",
    [
      link("Zutok plans and prices", "/pricing/", PRICING_DESCRIPTION),
      ...pricing.map((g) =>
        link(
          groupName(g),
          `/products/${g.id}/#pricing`,
          `from ${price(startingPrice(g.id))}/month billed monthly, excl. 18% GST.${g.note ? ` ${g.note}` : ""}`,
        ),
      ),
      link(
        `${brandedName(products.zshop)} and ${brandedName(products.zloya)}`,
        "/pricing/",
        `not sold separately. They're ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST.`,
      ),
    ].join("\n"),
    "## About",
    link(
      `About ${site.company}`,
      "/about/",
      "What Zutok makes, who it is for, how onboarding and pricing work, and how to contact the team.",
    ),
    "## Optional",
    link("llms-full.txt", "/llms-full.txt", "Everything above in one file: every feature, plan, price and FAQ on the site."),
  ].join("\n\n") + "\n";
}

const planLines = (g: PricingGroup) =>
  g.plans.map((p) => {
    const year = yearlyTotal(p);
    const cost =
      p.monthly === null || year === null
        ? "Custom price"
        : `${price(p.monthly)}/month billed monthly, or ${price(year)}/year billed yearly` +
          (p.yearly ? ` (shown as ${price(p.yearly.perMonth)}/month)` : "");
    // A ZChat blurb already lists the plan's allowances, which are its whole feature list.
    const includes = p.limits ? "" : ` Includes: ${p.features.join("; ")}.`;
    return `- **${p.name}**: ${cost}. ${p.blurb}${includes}`;
  });

const productSection = (p: Product) =>
  [
    `### ${brandedName(p)}`,
    `URL: ${absoluteUrl(`/products/${p.slug}/`)}`,
    `${p.kicker}. ${p.summary}`,
    "#### Features",
    p.features.map((f) => `- **${f.title}**: ${f.body}`).join("\n"),
    ...(p.slug === "crm"
      ? ["#### Modules", platformModules.map((m) => `- **${m.title}**: ${m.body} (${m.points.join("; ")})`).join("\n")]
      : []),
    "#### Getting started",
    p.steps.map((s, i) => `${i + 1}. **${s.title}**: ${s.body}`).join("\n"),
    "#### In numbers",
    p.stats.map((s) => `- ${s.prefix ?? ""}${s.value}${s.suffix ?? ""} ${s.label}`).join("\n"),
    "#### Plans",
    isBundled(p.slug)
      ? `${brandedName(p)} isn't sold separately: it's ${ZSHOP_ZLOYA_INCLUDED}, excl. 18% GST. See Zutok ZChat under Pricing below.`
      : `From ${p.slug === "zchat" ? zchatFrom() : `${price(startingPrice("crm"))}/month billed monthly`}, excl. 18% GST. ` +
        "Every plan is listed under Pricing below.",
    "#### FAQ",
    faqBlock(p.faqs),
  ].join("\n\n");

/** The full reference: every product, plan, solution and industry guide, with their FAQs. */
export function llmsFullTxt(): string {
  return [
    `# ${site.company}: full reference`,
    `> ${BRAND_SUMMARY}`,
    `This file is generated from the same content as ${absoluteUrl("/")} and lists only what the site says. ` +
      `All prices are in Indian Rupees (INR) and exclude 18% GST. The short index is at ${absoluteUrl("/llms.txt")}.`,

    "## Company",
    `URL: ${absoluteUrl("/about/")}`,
    keyFacts.join("\n"),
    "### How onboarding works",
    onboardingSteps.map((s, i) => `${i + 1}. **${s.title}**: ${s.body}`).join("\n"),
    "### Common questions",
    faqBlock(homeFaqs),

    "## Products",
    family.map(productSection).join("\n\n"),

    "## Pricing",
    `URL: ${absoluteUrl("/pricing/")}`,
    `Yearly Zutok CRM billing charges ${YEARLY_MONTHS_CHARGED} months for 12 (two months free); yearly ZChat prices are listed per plan. ` +
      `${ZSHOP_ZLOYA_NOTE} Prices exclude 18% GST.`,
    pricing
      .map((g) => [`### ${groupName(g)}`, ...(g.note ? [g.note] : []), planLines(g).join("\n")].join("\n\n"))
      .join("\n\n"),
    "### Billing questions",
    faqBlock(pricingFaqs),

    "## Solutions",
    `URL: ${absoluteUrl("/solutions/")}`,
    SOLUTIONS_HUB.intro,
    solutions
      .map((s) =>
        [
          `### ${s.name}`,
          `URL: ${absoluteUrl(solutionPath(s.slug))}`,
          `Product: ${brandedName(products[s.relatedProduct])}`,
          md(s.answer),
          md(s.plan.lead),
          "#### FAQ",
          faqBlock(s.faqs),
        ].join("\n\n"),
      )
      .join("\n\n"),

    "## Industries",
    `URL: ${absoluteUrl(industriesHub.path)}`,
    industriesHub.intro,
    industryList
      .map((i) =>
        [
          `### ${industryH1(i)}`,
          `URL: ${absoluteUrl(industryPath(i.slug))}`,
          `Products used: ${i.uses.map((u) => brandedName(products[u])).join(", ")}`,
          i.answer,
          i.plans.answer,
          "#### FAQ",
          faqBlock(i.faqs),
        ].join("\n\n"),
      )
      .join("\n\n"),
  ].join("\n\n") + "\n";
}
