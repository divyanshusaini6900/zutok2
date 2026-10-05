import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { IndustryCard } from "@/components/industries/IndustryCard";
import {
  FeatureCards,
  GuideSection,
  IndustryHero,
  OnThisPage,
  PlanTable,
  ProductRoles,
  Prose,
  Workflow,
} from "@/components/industries/IndustryGuide";
import { FAQ } from "@/components/sections/FAQ";
import { DemoCTA } from "@/components/sections/DemoCTA";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getIndustry, industries, industriesHub, industryPath, industrySlugs } from "@/lib/industries";
import { pricing, YEARLY_MONTHS_CHARGED } from "@/lib/pricing";
import { products } from "@/lib/products";
import { industrySolutions } from "@/lib/crosslinks";
import { solutionBySlug, solutionPath } from "@/lib/solutions";
import { JsonLd, brandedName, breadcrumbLd, faqLd, ogImage, pageMetadata, softwareAppId, webPageLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return pageMetadata({
    title: ind.title,
    description: ind.metaDescription,
    path: industryPath(ind.slug),
    keywords: ind.keywords,
    image: ogImage(ind.relatedProduct),
    imageAlt: `${ind.title}, with ${brandedName(products[ind.relatedProduct])}`,
  });
}

const toc = [
  { id: "problem", label: "The problem" },
  { id: "how", label: "How Zutok helps" },
  { id: "day", label: "Step by step" },
  { id: "features", label: "Key features" },
  { id: "plans", label: "Plans and prices" },
  { id: "faq", label: "FAQ" },
];

/** Billing notes for the plans in the table, taken from each pricing group's own note. */
function planNotes(groups: string[]) {
  const named: Record<string, string> = { suite: "Complete Suite", zchat: "ZChat", zshop: "ZShop" };
  return [
    `Prices are in Indian rupees and exclude 18% GST. Yearly billing charges ${YEARLY_MONTHS_CHARGED} months for 12.`,
    ...pricing.filter((g) => g.note && groups.includes(g.id)).map((g) => `${named[g.id] ?? g.label}: ${g.note}`),
  ];
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const t = ind.theme;
  const path = industryPath(ind.slug);
  const rel = products[ind.relatedProduct];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: industriesHub.path },
    { name: ind.name, path },
  ];
  const jsonLd = [
    {
      ...webPageLd({
        path,
        name: ind.title,
        description: ind.metaDescription,
        about: { "@id": softwareAppId(ind.relatedProduct) },
        image: ogImage(ind.relatedProduct),
        breadcrumb: true,
      }),
      mentions: ind.uses.filter((s) => s !== ind.relatedProduct).map((s) => ({ "@id": softwareAppId(s) })),
    },
    breadcrumbLd(crumbs),
    faqLd(ind.faqs, path),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <IndustryHero industry={ind} crumbs={crumbs} />

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          <OnThisPage items={toc} />

          <article className="min-w-0 max-w-3xl space-y-20 sm:space-y-24">
            <GuideSection id="problem" n={1} kicker="The problem" title={ind.problem.heading} theme={t}>
              <Prose>
                {ind.problem.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Prose>
            </GuideSection>

            <GuideSection id="how" n={2} kicker="How Zutok helps" title={ind.approach.heading} theme={t}>
              <Prose>
                <p>{ind.approach.intro}</p>
              </Prose>
              <ProductRoles approach={ind.approach} />
            </GuideSection>

            <GuideSection id="day" n={3} kicker="Step by step" title={ind.workflow.heading} theme={t}>
              <Prose>
                <p>{ind.workflow.intro}</p>
              </Prose>
              <Workflow steps={ind.workflow.steps} theme={t} />
            </GuideSection>

            <GuideSection id="features" n={4} kicker="Key features" title={ind.features.heading} theme={t}>
              <FeatureCards items={ind.features.items} />
            </GuideSection>

            <GuideSection id="plans" n={5} kicker="Plans and prices" title={ind.plans.heading} theme={t}>
              <Prose>
                <p>{ind.plans.answer}</p>
              </Prose>
              <PlanTable picks={ind.plans.picks} notes={planNotes(ind.plans.picks.map((p) => p.group))} />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/pricing/" variant="ghost">
                  Compare every Zutok plan
                </Button>
                <Button href={`/products/${rel.slug}/#pricing`} variant="ghost">
                  {`${brandedName(rel)} plans in detail`}
                </Button>
              </div>
            </GuideSection>

            <GuideSection id="faq" n={6} kicker="FAQ" title={ind.faqHeading} theme={t}>
              <div className="mt-8">
                <FAQ items={ind.faqs} pop={t.pop} />
              </div>
            </GuideSection>
          </article>
        </div>
      </div>

      <section className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              More <span className="font-serif font-normal italic">industry guides</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {ind.related.map((r, i) => (
              <Reveal key={r} delay={i * 0.08} className="h-full">
                <IndustryCard industry={industries[r]} />
              </Reveal>
            ))}
          </div>
          <h3 className="mt-14 text-2xl font-extrabold text-ink">Related solutions</h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {industrySolutions[ind.slug].map((sl) => (
              <li key={sl}>
                <Link
                  href={solutionPath(sl)}
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-bold text-ink shadow-[3px_3px_0_#0b0b0b] transition hover:-translate-y-0.5"
                >
                  {solutionBySlug[sl].name}
                  <ArrowUpRight className="size-4 transition group-hover:rotate-45" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-lg font-medium leading-relaxed text-ink/70">
            Prefer to start from the product? Read about{" "}
            {ind.uses.map((s, i) => (
              <span key={s}>
                <Link href={`/products/${s}/`} className="font-bold text-ink underline decoration-2 underline-offset-4">
                  {brandedName(products[s])}
                </Link>
                {i < ind.uses.length - 2 ? ", " : i === ind.uses.length - 2 ? " and " : ""}
              </span>
            ))}
            , see{" "}
            <Link href="/pricing/" className="font-bold text-ink underline decoration-2 underline-offset-4">
              all Zutok plans and prices
            </Link>{" "}
            or browse{" "}
            <Link href={industriesHub.path} className="font-bold text-ink underline decoration-2 underline-offset-4">
              every industry guide
            </Link>
            .
          </p>
        </div>
      </section>

      <DemoCTA />
    </div>
  );
}
