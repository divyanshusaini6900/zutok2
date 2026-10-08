import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/industries/Breadcrumbs";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { DemoCTA } from "@/components/sections/DemoCTA";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Wave } from "@/components/ui/Wave";
import { industriesHub, industryList, industryPath } from "@/lib/industries";
import { ZSHOP_ZLOYA_NOTE } from "@/lib/pricing";
import { productList } from "@/lib/products";
import { JsonLd, absoluteUrl, brandedName, breadcrumbLd, pageMetadata, webPageLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: industriesHub.title,
  description: industriesHub.description,
  path: industriesHub.path,
  keywords: [
    "Zutok industries",
    "CRM by industry India",
    ...industryList.map((i) => i.keywords[0]),
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Industries", path: industriesHub.path },
];

const listId = `${absoluteUrl(industriesHub.path)}#industries`;

const jsonLd = [
  {
    ...webPageLd({
      path: industriesHub.path,
      name: industriesHub.title,
      description: industriesHub.description,
      type: "CollectionPage",
      breadcrumb: true,
    }),
    mainEntity: { "@id": listId },
  },
  breadcrumbLd(crumbs),
  {
    "@type": "ItemList",
    "@id": listId,
    name: "Zutok industry guides",
    numberOfItems: industryList.length,
    itemListElement: industryList.map((ind, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: ind.name,
      description: ind.tagline,
      url: absoluteUrl(industryPath(ind.slug)),
    })),
  },
];

export default function IndustriesPage() {
  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <section className="night relative overflow-hidden pt-36 text-white sm:pt-44">
        <div className="pointer-events-none absolute -left-20 top-10 size-[30rem] animate-float rounded-full bg-[#ff6b1a]/25 blur-[110px]" />
        <div className="pointer-events-none absolute -right-20 top-24 size-[28rem] animate-float rounded-full bg-[#2563eb]/25 blur-[110px] [animation-delay:-3s]" />
        <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <Breadcrumbs items={crumbs} tone="light" />
          <h1 className="mt-8 text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
            <SplitText text={industriesHub.h1[0]} className="block" immediate />
            <SplitText text={industriesHub.h1[1]} className="block font-serif font-normal italic" immediate delay={0.1} />
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/75">{industriesHub.intro}</p>
        </div>
        <Wave fill="#ffffff" back="#ff6b1a" />
      </section>

      <section className="pb-24 pt-8 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {industryList.map((ind, i) => (
              <li key={ind.slug}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <IndustryCard industry={ind} heading="h2" />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight text-ink sm:text-6xl">
              Or start from <span className="font-serif font-normal italic">a product.</span>
            </h2>
            <p className="max-w-md text-lg font-medium text-ink/70">
              Zutok CRM and ZChat are sold as plans. {ZSHOP_ZLOYA_NOTE} Everything plugs into Zutok CRM, and prices are on the{" "}
              <Link href="/pricing/" className="font-bold text-ink underline decoration-2 underline-offset-4">
                Zutok pricing page
              </Link>
              .
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productList.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} className="h-full">
                <Link
                  href={`/products/${p.slug}/`}
                  className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[2rem] border-[2.5px] border-ink p-7 shadow-[6px_6px_0_#0b0b0b] transition duration-500 hover:-translate-y-1 hover:shadow-[9px_9px_0_#0b0b0b]"
                  style={{ background: p.theme.pop, color: p.theme.popOn }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-4xl uppercase leading-none tracking-wide">{brandedName(p)}</span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-white text-ink transition duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
                      <ArrowUpRight className="size-5" aria-hidden />
                    </span>
                  </div>
                  <span className="text-sm font-semibold opacity-80">{p.kicker}</span>
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
