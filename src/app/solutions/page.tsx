import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DemoCTA } from "@/components/sections/DemoCTA";
import { Breadcrumbs } from "@/components/solutions/Breadcrumbs";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { crmFrom, formatINR } from "@/lib/pricing";
import { productList } from "@/lib/products";
import { SOLUTIONS_HUB, solutionPath, solutions, solutionsFor, startingPlan } from "@/lib/solutions";
import { JsonLd, absoluteUrl, brandedName, breadcrumbLd, pageMetadata, webPageLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: SOLUTIONS_HUB.title,
  description: SOLUTIONS_HUB.description,
  path: "/solutions/",
  keywords: SOLUTIONS_HUB.keywords,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions/" },
];

const listId = `${absoluteUrl("/solutions/")}#solutions`;

const jsonLd = [
  {
    ...webPageLd({
      path: "/solutions/",
      name: SOLUTIONS_HUB.title,
      description: SOLUTIONS_HUB.intro,
      type: "CollectionPage",
      breadcrumb: true,
    }),
    mainEntity: { "@id": listId },
  },
  breadcrumbLd(crumbs),
  {
    "@type": "ItemList",
    "@id": listId,
    name: "Zutok solutions",
    numberOfItems: solutions.length,
    itemListElement: solutions.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: absoluteUrl(solutionPath(s.slug)),
    })),
  },
];

const lead = SOLUTIONS_HUB.h1.slice(0, -SOLUTIONS_HUB.h1Accent.length).trim();

export default function SolutionsPage() {
  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden pt-36 sm:pt-44">
        <div className="dots pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="pointer-events-none absolute -left-24 top-20 size-[26rem] animate-float rounded-full bg-[#22c55e]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 top-40 size-[26rem] animate-float rounded-full bg-[#ff4d8d]/20 blur-[120px] [animation-delay:-3s]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
          <Breadcrumbs items={crumbs} />
          <Reveal className="mt-8">
            <span className="inline-block rounded-full border-2 border-ink bg-[#ff6b1a] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-ink shadow-[3px_3px_0_#0b0b0b]">
              Solutions
            </span>
          </Reveal>
          <h1 className="mt-6 max-w-5xl text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <SplitText text={lead} immediate />{" "}
            <SplitText text={SOLUTIONS_HUB.h1Accent} className="font-serif font-normal italic" immediate delay={0.1} />
          </h1>
          <p className="mt-8 max-w-3xl border-l-[5px] border-ink pl-5 text-lg font-medium leading-relaxed text-ink/80 sm:text-xl">
            {SOLUTIONS_HUB.intro}
          </p>
          <nav aria-label="Solutions by product" className="mt-10">
            <ul className="flex flex-wrap gap-3">
              {productList.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`#${p.slug}`}
                    className="inline-block rounded-full border-2 border-ink px-4 py-2 text-sm font-bold text-ink shadow-[3px_3px_0_#0b0b0b] transition hover:-translate-y-0.5"
                    style={{ background: p.theme.pop }}
                  >
                    {brandedName(p)} <span className="text-ink/60">· {solutionsFor(p.slug).length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {productList.map((p) => (
        <section key={p.slug} id={p.slug} className="scroll-mt-28 pb-24 sm:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col justify-between gap-5 border-t-[2.5px] border-ink pt-10 md:flex-row md:items-end">
              <div>
                <span
                  className="inline-block rounded-full border-2 border-ink px-3 py-1 text-xs font-extrabold uppercase tracking-[0.25em] text-ink"
                  style={{ background: p.theme.pop }}
                >
                  {p.kicker}
                </span>
                <h2 className="mt-4 text-4xl font-extrabold leading-[1] tracking-tight text-ink sm:text-5xl">
                  {brandedName(p)} <span className="font-serif font-normal italic">solutions</span>
                </h2>
              </div>
              <Link
                href={`/products/${p.slug}/`}
                className="group inline-flex items-center gap-2 self-start text-sm font-bold text-ink underline-offset-4 hover:underline md:self-auto"
              >
                Explore {brandedName(p)}
                <ArrowUpRight className="size-4 transition group-hover:rotate-45" aria-hidden />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {solutionsFor(p.slug).map((s, i) => {
                const start = startingPlan(s);
                // Zutok CRM is priced per user and has no starting tier: quote the 1-user price, never "From ₹…".
                const footnote =
                  start.group === "crm"
                    ? `Zutok CRM: ${crmFrom()}, excl. GST`
                    : `${start.bundled ? "Free with" : "From"} ${start.label}: ₹${formatINR(start.monthly)}/month, excl. GST`;
                return (
                  <Reveal key={s.slug} delay={i * 0.08} className="h-full">
                    <SolutionCard solution={s} footnote={footnote} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <DemoCTA />
    </div>
  );
}
