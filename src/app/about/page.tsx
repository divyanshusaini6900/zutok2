import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DemoCTA } from "@/components/sections/DemoCTA";
import { Breadcrumbs } from "@/components/solutions/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { InlineText } from "@/components/ui/InlineText";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { homeFaqs, onboardingSteps, pricingFaqs } from "@/lib/company";
import { cx } from "@/lib/cx";
import { industriesHub, industryList, industryPath } from "@/lib/industries";
import {
  BUNDLED_PRODUCTS,
  bundlePlanNames,
  crmPriceRange,
  crmTiers,
  formatINR,
  pricing,
  productPriceNote,
} from "@/lib/pricing";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import {
  BRAND_SUMMARY,
  JsonLd,
  ORG_ID,
  brandedName,
  breadcrumbLd,
  groupName,
  pageMetadata,
  startingPrice,
  webPageLd,
} from "@/lib/seo";

/*
 * The entity page for Zutok Softwares. Everything here restates the product, pricing and FAQ data the rest of the
 * site already shows; there is deliberately no history, team, address or customer claim, because the source has none.
 */

const TITLE = "About Zutok Softwares: Zutok CRM, ZChat, ZShop & Zloya";
const DESCRIPTION =
  "Zutok Softwares builds Zutok CRM for Indian businesses, plus ZChat for WhatsApp and Instagram, ZShop for store orders and Zloya for loyalty. Priced in ₹.";
const path = "/about/";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path,
  absoluteTitle: true,
  imageAlt: "Zutok Softwares: one CRM for every conversation, order and customer",
  keywords: ["Zutok Softwares", "about Zutok", "Zutok CRM", "Zutok ZChat", "Zutok ZShop", "Zutok Zloya"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path },
];

const jsonLd = [
  {
    ...webPageLd({ path, name: TITLE, description: BRAND_SUMMARY, type: "AboutPage", breadcrumb: true }),
    mainEntity: { "@id": ORG_ID },
  },
  breadcrumbLd(crumbs),
];

// The CRM first: the other three plug into it.
const family = [products.crm, products.zchat, products.zshop, products.zloya];
// ZShop and Zloya: not sold separately, they come free with ZChat Growth and Scale.
const bundled = BUNDLED_PRODUCTS.map((slug) => products[slug]);

const loginHost = new URL(site.loginUrl).host;
const siteHost = new URL(site.url).host;

const facts: { label: string; value: string; href?: string }[] = [
  { label: "Company", value: `${site.company}, also called ${site.name}` },
  { label: "Products", value: family.map(brandedName).join(", ") },
  { label: "Built for", value: "Businesses in India that sell on WhatsApp, Instagram and at the counter" },
  {
    label: "Prices",
    value:
      // Zutok CRM is priced per user; its ₹999 price is only ever shown with the "5 or more users" condition.
      `In Indian Rupees, excluding 18% GST: Zutok CRM ${crmPriceRange()}, ` +
      `ZChat from ₹${formatINR(startingPrice("zchat"))}/month`,
  },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Customer login", value: loginHost, href: site.loginUrl },
  { label: "Website", value: siteHost, href: "/" },
];

const answer = (list: { q: string; a: string }[], q: string) => {
  const hit = list.find((f) => f.q === q);
  if (!hit) throw new Error(`about: no FAQ "${q}"`);
  return hit.a;
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden pt-36 sm:pt-44">
        <div className="dots pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="pointer-events-none absolute -left-24 top-20 size-[26rem] animate-float rounded-full bg-[#6c2bd9]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 top-40 size-[26rem] animate-float rounded-full bg-[#22c55e]/20 blur-[120px] [animation-delay:-3s]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
          <Breadcrumbs items={crumbs} />
          <Reveal className="mt-8">
            <span className="inline-block rounded-full border-2 border-ink bg-[#a78bfa] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-ink shadow-[3px_3px_0_#0b0b0b]">
              About us
            </span>
          </Reveal>
          <h1 className="mt-6 max-w-5xl text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <SplitText text="About" immediate />{" "}
            <SplitText text="Zutok Softwares" className="font-serif font-normal italic" immediate delay={0.1} />
          </h1>
          {/* The entity summary, word for word the same as the Organization description and llms.txt. */}
          <p className="mt-8 max-w-3xl border-l-[5px] border-ink pl-5 text-lg font-medium leading-relaxed text-ink/80 sm:text-xl">
            {BRAND_SUMMARY}
          </p>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <Button href="#demo">Book a free demo</Button>
            <Button href="/pricing/" variant="ghost">
              See plans and prices
            </Button>
          </Reveal>

          <dl className="mt-16 grid grid-cols-1 overflow-hidden rounded-[2rem] border-[2.5px] border-ink bg-white shadow-[6px_6px_0_#0b0b0b] sm:grid-cols-2">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={cx(
                  "border-ink/10 p-6",
                  i > 0 && "border-t",
                  i === 1 && "sm:border-t-0",
                  i % 2 === 1 && "sm:border-l",
                  i === facts.length - 1 && facts.length % 2 === 1 && "sm:col-span-2",
                )}
              >
                <dt className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/55">{f.label}</dt>
                <dd className="mt-2 text-base font-bold text-ink">
                  {f.href ? (
                    <Link href={f.href} className="underline decoration-2 underline-offset-4">
                      {f.value}
                    </Link>
                  ) : (
                    f.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight text-ink sm:text-5xl">What does Zutok Softwares make?</h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-ink/70">
              One CRM and three products that plug into it. Zutok CRM is priced per user, ZChat is sold as plans that each
              include CRM licenses, and ZShop and Zloya come free with ZChat {bundlePlanNames()}.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {family.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.08} className="h-full">
                <Link
                  href={`/products/${p.slug}/`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border-[2.5px] border-ink bg-white p-7 text-ink shadow-[6px_6px_0_#0b0b0b] transition duration-500 hover:-translate-y-1 hover:shadow-[9px_9px_0_#0b0b0b]"
                >
                  <span className="absolute inset-x-0 top-0 h-2" style={{ background: p.theme.pop }} />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-4xl uppercase leading-none tracking-wide">{brandedName(p)}</h3>
                      <p className="mt-2 text-sm font-bold text-ink/60">{p.kicker}</p>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-white transition duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
                      <ArrowUpRight className="size-5" aria-hidden />
                    </span>
                  </div>
                  <p className="mt-5 text-[15px] font-medium leading-relaxed text-ink/75">{p.summary}</p>
                  <p className="mt-auto pt-6 text-sm font-bold text-ink/80">{productPriceNote(p.slug)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
        <div className="dots-light pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight sm:text-5xl">Who is Zutok for?</h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-white/75">
              Zutok is built in India for businesses that sell on WhatsApp, Instagram and at the counter. Each guide below shows
              which Zutok products fit one kind of business and what they cost.
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industryList.map((ind) => (
              <li key={ind.slug}>
                <Link
                  href={industryPath(ind.slug)}
                  className="group flex h-full flex-col rounded-[1.75rem] border-2 border-white/15 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-white/40"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3 text-xl font-extrabold">
                      <span className="size-3 shrink-0 rounded-full border-2 border-white" style={{ background: ind.theme.bg }} />
                      {ind.name}
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 transition duration-300 group-hover:rotate-45" aria-hidden />
                  </span>
                  <span className="mt-3 text-sm font-medium leading-relaxed text-white/70">{ind.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={industriesHub.path}
            className="mt-8 inline-block text-sm font-bold text-white underline decoration-2 underline-offset-4"
          >
            Every industry guide
          </Link>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight text-ink sm:text-5xl">How does onboarding work?</h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-ink/70">
              You start with a free demo, then the Zutok team sets your account up with you on a call. During onboarding we help
              you import customers, leads and items from Excel or your old CRM, and connect your number to the official WhatsApp
              Business Platform.
            </p>
            <ol className="mt-10 space-y-4">
              {onboardingSteps.map((s) => (
                <li key={s.n} className="flex gap-5 rounded-[1.75rem] border-[2.5px] border-ink bg-white p-6 shadow-[5px_5px_0_#0b0b0b]">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-[#a78bfa] font-display text-xl text-ink">
                    {s.n}
                  </span>
                  <span>
                    <span className="block text-xl font-extrabold text-ink">{s.title}</span>
                    <span className="mt-1 block font-medium text-ink/70">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight text-ink sm:text-5xl">How is Zutok priced?</h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-ink/70">
              In Indian Rupees, excluding 18% GST, billed monthly or yearly.{" "}
              <InlineText text={answer(homeFaqs, "Is there a setup fee or lock-in?")} />
            </p>
            <ul className="mt-10 overflow-hidden rounded-[1.75rem] border-[2.5px] border-ink bg-white shadow-[5px_5px_0_#0b0b0b]">
              {pricing.map((g) => (
                <li key={g.id} className="flex items-center justify-between gap-4 border-b border-ink/10 px-6 py-4 last:border-0">
                  <span className="flex items-center gap-3 font-extrabold text-ink">
                    <span className="size-3 shrink-0 rounded-full ring-1 ring-ink/20" style={{ background: g.stripe }} />
                    {groupName(g)}
                  </span>
                  {/* Zutok CRM: the 1-user price, never an unconditioned "from ₹999". */}
                  <span className="whitespace-nowrap text-sm font-bold text-ink/80">
                    {g.perUser
                      ? `₹${formatINR(crmTiers()[0].monthly)} per user/month`
                      : `from ₹${formatINR(startingPrice(g.id))}/month`}
                  </span>
                </li>
              ))}
              {/* ZShop and Zloya have no plans of their own: they come with ZChat Growth and Scale. */}
              <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-6 py-4">
                <span className="flex items-center gap-3 font-extrabold text-ink">
                  <span className="flex shrink-0 -space-x-1">
                    {bundled.map((p) => (
                      <span key={p.slug} className="size-3 rounded-full ring-1 ring-ink/20" style={{ background: p.theme.pop }} />
                    ))}
                  </span>
                  {bundled.map(brandedName).join(" and ")}
                </span>
                <span className="text-sm font-bold text-ink/80">free with ZChat {bundlePlanNames()}</span>
              </li>
            </ul>
            <div className="mt-6 space-y-3 text-[15px] font-medium leading-relaxed text-ink/70">
              <p>
                <InlineText text={answer(pricingFaqs, "What does WhatsApp messaging cost on top?")} />
              </p>
              <p>There is special pricing for non-profits, early-stage startups and chains with 10+ outlets. Ask during your demo.</p>
              <p>
                <Link href="/pricing/" className="font-bold text-ink underline decoration-2 underline-offset-4">
                  Compare every Zutok plan and price
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight text-ink sm:text-5xl">Who owns the data?</h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-ink/70">
              <InlineText text={answer(homeFaqs, "Is my data safe, and who owns it?")} />
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight text-ink sm:text-5xl">How do I contact Zutok?</h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-ink/70">
              Email{" "}
              <a href={`mailto:${site.email}`} className="font-bold text-ink underline decoration-2 underline-offset-4">
                {site.email}
              </a>{" "}
              or book a free demo with the form below. Existing customers log in at{" "}
              <a href={site.loginUrl} className="font-bold text-ink underline decoration-2 underline-offset-4">
                {loginHost}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <DemoCTA />
    </div>
  );
}
