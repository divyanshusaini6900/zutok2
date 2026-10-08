import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ProductHero } from "@/components/product/ProductHero";
import { FeatureGrid } from "@/components/product/FeatureGrid";
import { ProductDeepDive } from "@/components/product/ProductDeepDive";
import { ExplodedCRM } from "@/components/sections/ExplodedCRM";
import { ModulesAccordion } from "@/components/sections/ModulesAccordion";
import { SalesAgent } from "@/components/sections/SalesAgent";
import { ShopJourney } from "@/components/sections/ShopJourney";
import { ZloyaStack } from "@/components/sections/ZloyaStack";
import { PricingTable } from "@/components/sections/PricingTable";
import { FAQ } from "@/components/sections/FAQ";
import { DemoCTA } from "@/components/sections/DemoCTA";
import { Counter } from "@/components/ui/Counter";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { industriesHub, industryList, industryPath } from "@/lib/industries";
import { productList, products, type Product, type ProductSlug } from "@/lib/products";
import { crmTiers, isBundled, listJoin, ZSHOP_ZLOYA_INCLUDED } from "@/lib/pricing";
import { solutionBySlug, solutionPath, solutionsFor } from "@/lib/solutions";
import { productExtraSolutions } from "@/lib/crosslinks";
import { cx } from "@/lib/cx";
import {
  JsonLd,
  brandedName,
  breadcrumbLd,
  faqLd,
  ogImage,
  pageMetadata,
  productSeo,
  softwareAppId,
  softwareAppLd,
  webPageLd,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return productList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = products[slug as ProductSlug];
  if (!p) return {};
  const seo = productSeo[p.slug];
  return pageMetadata({
    ...seo,
    path: `/products/${p.slug}/`,
    absoluteTitle: true,
    image: ogImage(p.slug),
    imageAlt: `${brandedName(p)}: ${p.kicker}`,
  });
}

/**
 * The line under the pricing heading. ZShop and Zloya have no plans of their own, so their pages explain the bundle;
 * Zutok CRM is priced per user (owner, 2026-10-09).
 */
function PricingNote({ p }: { p: Product }) {
  if (isBundled(p.slug)) {
    return (
      <>
        {brandedName(p)} isn&apos;t sold separately: it&apos;s {ZSHOP_ZLOYA_INCLUDED}, excluding 18% GST.{" "}
        <Link href="/pricing/" className="font-bold text-ink underline decoration-2 underline-offset-4">
          Compare every plan
        </Link>
      </>
    );
  }
  if (p.slug === "zchat") return <>Pick a plan by how many contacts and channels you need. Every plan includes CRM licenses.</>;
  // The per-user and yearly-discount note sits above the cards (PricingTable), so this line doesn't repeat it.
  return <>Prices per user for {listJoin(crmTiers().map((t) => t.name))}, each with every Zutok CRM module.</>;
}

function Signature({ slug }: { slug: ProductSlug }) {
  if (slug === "crm") {
    return (
      <>
        <ExplodedCRM cta={{ href: "#modules", label: "See all modules" }} />
        <ModulesAccordion cta={false} />
      </>
    );
  }
  if (slug === "zchat") return <SalesAgent />;
  if (slug === "zshop") return <ShopJourney />;
  return <ZloyaStack from="#ffffff" />;
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const p = products[slug as ProductSlug];
  if (!p) notFound();
  const t = p.theme;
  const others = productList.filter((o) => o.slug !== p.slug);
  // This product's own solution pages, then the ones filed under another product that it runs on.
  const useCases = [...solutionsFor(p.slug), ...productExtraSolutions[p.slug].map((sl) => solutionBySlug[sl])];
  const usedBy = industryList.filter((i) => i.uses.includes(p.slug));
  const path = `/products/${p.slug}/`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: brandedName(p), path },
  ];
  const jsonLd = [
    webPageLd({
      path,
      name: productSeo[p.slug].title,
      description: productSeo[p.slug].description,
      about: { "@id": softwareAppId(p.slug) },
      image: ogImage(p.slug),
      breadcrumb: true,
    }),
    breadcrumbLd(crumbs),
    softwareAppLd(p),
    faqLd(p.faqs, path),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <ProductHero slug={p.slug} crumbs={crumbs} />

      <div className="-rotate-1 border-y-[2.5px] border-ink py-5" style={{ background: t.pop }}>
        <Marquee
          items={p.marquee.map((m) => (
            <span key={m} className="px-8 font-display text-3xl uppercase tracking-wide sm:text-4xl" style={{ color: t.popOn }}>
              {m}
            </span>
          ))}
          separator={<span className="size-3 rotate-45 bg-ink" />}
          duration={40}
        />
      </div>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {p.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
                className={cx(`rounded-[1.75rem] border-[2.5px] border-ink p-8 ${
                  i === 1 ? "bg-ink text-white" : "bg-white text-ink shadow-[6px_6px_0_#0b0b0b]"
                }`)}
                style={i === 1 ? { boxShadow: `6px 6px 0 ${t.pop}` } : undefined}
              >
                <div className="font-display text-7xl tracking-wide" style={i === 1 ? { color: t.pop } : undefined}>
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-sm font-semibold opacity-80">{s.label}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-28 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="shrink-0 text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-7xl">
              <SplitText text="Everything in" className="block" />
              <SplitText text={`${p.name}.`} className="block font-serif font-normal italic" wordClassName="" delay={0.1} />
            </h2>
            <Reveal className="max-w-md text-lg font-medium text-ink/70">
              Every feature below is already built into {p.name}. Nothing to add later and no plugins to install.
            </Reveal>
          </div>
          <div className="mt-12">
            <FeatureGrid features={p.features} theme={t} />
          </div>
        </div>
      </section>

      <Signature slug={p.slug} />

      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ProductDeepDive slug={p.slug} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
        <div className="dots-light pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute -left-20 top-10 size-[26rem] rounded-full opacity-30 blur-[110px]"
          style={{ background: t.pop }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center font-display text-5xl uppercase tracking-wide sm:text-7xl">
              Up and running in <span style={{ color: t.pop }}>3 steps</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {p.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <div className="relative h-full overflow-hidden rounded-[2rem] border-2 border-white/15 bg-white/[0.04] p-8">
                  <span className="absolute -right-2 -top-6 font-display text-[9rem] leading-none text-white/10">{i + 1}</span>
                  <span
                    className="relative grid size-12 place-items-center rounded-2xl border-2 border-white font-display text-xl"
                    style={{ background: t.pop, color: t.popOn }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="relative mt-8 text-2xl font-extrabold">{s.title}</h3>
                  <p className="relative mt-3 font-medium text-white/75">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-14 text-center">
            <h2 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-7xl">
              <SplitText text={isBundled(p.slug) ? `How to get ${p.name}` : `${p.name} pricing`} className="block" />
            </h2>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-2xl font-medium text-ink/65">
                <PricingNote p={p} />
              </p>
            </Reveal>
          </div>
          <PricingTable initial={p.slug} />
        </div>
      </section>

      <section className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="font-display text-6xl uppercase leading-none tracking-wide text-ink sm:text-7xl">
            {p.name}
            <br />
            <span className="text-outline">FAQ</span>
          </h2>
          <FAQ items={p.faqs} pop={t.pop} />
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="text-3xl font-extrabold text-ink">{p.name} use cases</h2>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {useCases.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={solutionPath(s.slug)}
                    className="group flex items-center justify-between gap-4 rounded-2xl border-[2.5px] border-ink bg-white px-5 py-4 text-ink shadow-[4px_4px_0_#0b0b0b] transition duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0b0b0b]"
                  >
                    <span className="flex items-center gap-3 font-extrabold">
                      <span
                        className="size-3 shrink-0 rounded-full border-2 border-ink"
                        style={{ background: products[s.relatedProduct].theme.pop }}
                      />
                      {s.name}
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 transition duration-300 group-hover:rotate-45" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/solutions/" className="mt-5 inline-block text-sm font-bold text-ink underline decoration-2 underline-offset-4">
              Every Zutok solution
            </Link>
          </div>
          <div>
            <Reveal>
              <h2 className="text-3xl font-extrabold text-ink">{p.name} by industry</h2>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {usedBy.map((ind) => (
                <li key={ind.slug}>
                  <Link
                    href={industryPath(ind.slug)}
                    className="group flex items-center justify-between gap-4 rounded-2xl border-[2.5px] border-ink bg-white px-5 py-4 text-ink shadow-[4px_4px_0_#0b0b0b] transition duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0b0b0b]"
                  >
                    <span className="flex items-center gap-3 font-extrabold">
                      <span className="size-3 shrink-0 rounded-full border-2 border-ink" style={{ background: ind.theme.bg }} />
                      {ind.name}
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 transition duration-300 group-hover:rotate-45" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={industriesHub.path} className="mt-5 inline-block text-sm font-bold text-ink underline decoration-2 underline-offset-4">
              Every industry guide
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Works even better with</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.1} className="h-full">
                <Link
                  href={`/products/${o.slug}/`}
                  className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[2rem] border-[2.5px] border-ink p-7 shadow-[6px_6px_0_#0b0b0b] transition duration-500 hover:-translate-y-1 hover:shadow-[9px_9px_0_#0b0b0b]"
                  style={{ background: o.theme.pop, color: o.theme.popOn }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="font-display text-5xl uppercase leading-none tracking-wide">{o.name}</div>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-white text-ink transition duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
                      <ArrowUpRight className="size-5" aria-hidden />
                    </span>
                  </div>
                  <div className="max-w-xs text-sm font-semibold opacity-80">{o.kicker}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DemoCTA />
    </div>
  );
}
