import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { FeatureGrid } from "@/components/product/FeatureGrid";
import { FAQ } from "@/components/sections/FAQ";
import { DemoCTA } from "@/components/sections/DemoCTA";
import { Breadcrumbs } from "@/components/solutions/Breadcrumbs";
import { PlanCards } from "@/components/solutions/PlanCards";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import { SolutionProse } from "@/components/solutions/SolutionProse";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { formatINR, YEARLY_MONTHS_CHARGED } from "@/lib/pricing";
import { products } from "@/lib/products";
import { getSolution, solutionBySlug, solutionPath, solutions } from "@/lib/solutions";
import { industriesForSolution } from "@/lib/crosslinks";
import { industries, industriesHub, industryPath } from "@/lib/industries";
import {
  JsonLd,
  brandedName,
  breadcrumbLd,
  faqLd,
  ogImage,
  pageMetadata,
  pricingGroup,
  softwareAppId,
  startingPrice,
  webPageLd,
} from "@/lib/seo";
import { cx } from "@/lib/cx";

export const dynamicParams = false;

// Typed by hand rather than with PageProps<"/solutions/[slug]">, which only exists once the route types are regenerated.
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getSolution(slug);
  if (!s) return {};
  return pageMetadata({
    title: s.title,
    description: s.metaDescription,
    path: solutionPath(s.slug),
    keywords: s.keywords,
    image: ogImage(s.relatedProduct),
    imageAlt: `${brandedName(products[s.relatedProduct])}: ${s.name}`,
  });
}

export default async function SolutionPage(props: Props) {
  const { slug } = await props.params;
  const s = getSolution(slug);
  if (!s) notFound();
  const product = products[s.relatedProduct];
  const pop = product.theme.pop;
  const productName = brandedName(product);
  const productPath = `/products/${product.slug}/`;
  const path = solutionPath(s.slug);
  const lead = s.h1Accent ? s.h1.slice(0, -s.h1Accent.length).trim() : s.h1;
  const suite = s.plan.suite ? pricingGroup("suite").plans.find((p) => p.name === s.plan.suite) : undefined;
  const note = pricingGroup(s.relatedProduct).note;
  const guides = industriesForSolution(s.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions/" },
    { name: s.name, path },
  ];
  const jsonLd = [
    webPageLd({
      path,
      name: s.title,
      description: s.answer,
      about: { "@id": softwareAppId(s.relatedProduct) },
      image: ogImage(s.relatedProduct),
      breadcrumb: true,
    }),
    breadcrumbLd(crumbs),
    faqLd(s.faqs, path),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden pt-36 sm:pt-44">
        <div className="dots pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div
          className="pointer-events-none absolute -right-24 top-16 size-[28rem] animate-float rounded-full opacity-25 blur-[120px]"
          style={{ background: pop }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24">
          <Breadcrumbs items={crumbs} />
          <Reveal className="mt-8">
            <span
              className="inline-block rounded-full border-2 border-ink px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-ink shadow-[3px_3px_0_#0b0b0b]"
              style={{ background: pop }}
            >
              {s.kicker}
            </span>
          </Reveal>
          <h1 className="mt-6 max-w-5xl text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <SplitText text={lead} immediate />
            {s.h1Accent && (
              <>
                {" "}
                <SplitText text={s.h1Accent} className="font-serif font-normal italic" immediate delay={0.1} />
              </>
            )}
          </h1>
          {/* The direct answer, right under the H1, unanimated so it reads the same with or without JS. */}
          <p
            className="mt-8 max-w-3xl border-l-[5px] pl-5 text-lg font-medium leading-relaxed text-ink/80 sm:text-xl"
            style={{ borderColor: pop }}
          >
            {s.answer}
          </p>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <Button href="#demo">Book a free demo</Button>
            <Button href={productPath} variant="ghost">
              Explore {productName}
            </Button>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {s.facts.map((f, i) => (
              <Reveal
                key={f.label}
                delay={i * 0.08}
                className={cx(
                  "rounded-[1.75rem] border-[2.5px] border-ink p-6",
                  i === 1 ? "bg-ink text-white" : "bg-white text-ink shadow-[6px_6px_0_#0b0b0b]",
                )}
                style={i === 1 ? { boxShadow: `6px 6px 0 ${pop}` } : undefined}
              >
                <div className="font-display text-5xl tracking-wide" style={i === 1 ? { color: pop } : undefined}>
                  {f.value}
                </div>
                <p className="mt-2 text-sm font-semibold opacity-80">{f.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
          <div className="max-w-3xl space-y-16">
            {[s.problem, s.approach, ...(s.extra ?? [])].map((sec) => (
              <SolutionProse key={sec.heading} section={sec} pop={pop} />
            ))}
          </div>
          <aside>
            <div className="rounded-[2rem] border-[2.5px] border-ink p-7 shadow-[6px_6px_0_#0b0b0b] lg:sticky lg:top-28" style={{ background: pop }}>
              <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-ink/70">Part of</div>
              <div className="mt-2 font-display text-4xl uppercase leading-none tracking-wide text-ink">{productName}</div>
              <p className="mt-3 text-sm font-semibold text-ink/80">{product.kicker}</p>
              <p className="mt-5 text-sm font-bold text-ink">
                Plans from ₹{formatINR(startingPrice(product.slug))}/month billed monthly, excl. 18% GST.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={productPath} variant="white">
                  Explore {productName}
                </Button>
                <Button href="/pricing/" variant="ghost" arrow={false}>
                  Compare all plans
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
        <div className="dots-light pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute -left-20 top-10 size-[26rem] rounded-full opacity-30 blur-[110px]"
          style={{ background: pop }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight sm:text-5xl">{s.steps.heading}</h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-white/75">{s.steps.lead}</p>
          </div>
          <ol className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {s.steps.items.map((st, i) => (
              <li key={st.title}>
                <Reveal
                  delay={(i % 3) * 0.08}
                  className="relative h-full overflow-hidden rounded-[2rem] border-2 border-white/15 bg-white/[0.04] p-7"
                >
                  <span className="absolute -right-2 -top-6 font-display text-[8rem] leading-none text-white/10" aria-hidden>
                    {i + 1}
                  </span>
                  <span
                    className="relative grid size-11 place-items-center rounded-2xl border-2 border-white font-display text-lg text-ink"
                    style={{ background: pop }}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <h3 className="relative mt-6 text-xl font-extrabold">{st.title}</h3>
                  <p className="relative mt-2 font-medium leading-relaxed text-white/75">{st.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight text-ink sm:text-5xl">{s.features.heading}</h2>
            {s.features.lead && <p className="mt-5 text-lg font-medium leading-relaxed text-ink/70">{s.features.lead}</p>}
          </div>
          <div className="mt-12">
            <FeatureGrid features={s.features.items} theme={product.theme} />
          </div>
        </div>
      </section>

      <section id="pricing" className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight text-ink sm:text-5xl">{s.plan.heading}</h2>
            <p className="mt-5 text-lg font-semibold leading-relaxed text-ink">{s.plan.lead}</p>
          </div>
          <div className="mt-12">
            <PlanCards product={s.relatedProduct} plan={s.plan} pop={pop} />
          </div>
          <div className="mt-10 max-w-3xl space-y-3 text-[15px] font-medium leading-relaxed text-ink/70">
            {suite?.monthly && (
              <p>
                Also part of the Zutok Complete Suite, from {suite.name} at ₹{formatINR(suite.monthly)}/month billed monthly (₹
                {formatINR(suite.monthly * YEARLY_MONTHS_CHARGED)}/year), excl. 18% GST.
              </p>
            )}
            {note && <p>{note}</p>}
            <p>
              All prices are in Indian Rupees and exclude 18% GST. Yearly billing charges {YEARLY_MONTHS_CHARGED} months for 12.{" "}
              <Link href="/pricing/" className="font-bold text-ink underline underline-offset-4">
                Compare every Zutok plan
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="font-display text-6xl uppercase leading-none tracking-wide text-ink sm:text-7xl">
              Questions,
              <br />
              <span className="text-outline">answered</span>
            </h2>
            <p className="mt-6 max-w-sm font-medium text-ink/65">If your question isn&apos;t answered here, ask us during a free demo.</p>
          </div>
          <FAQ items={s.faqs} pop={pop} />
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Related solutions</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {s.related.map((r, i) => (
              <Reveal key={r} delay={i * 0.08} className="h-full">
                <SolutionCard solution={solutionBySlug[r]} />
              </Reveal>
            ))}
          </div>
          {guides.length > 0 && (
            <div className="mt-10">
              <h3 className="text-2xl font-extrabold text-ink">Industry guides that use it</h3>
              <ul className="mt-5 flex flex-wrap gap-3">
                {guides.map((g) => (
                  <li key={g}>
                    <Link
                      href={industryPath(g)}
                      className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-bold text-ink shadow-[3px_3px_0_#0b0b0b] transition hover:-translate-y-0.5"
                    >
                      {industries[g].name}
                      <ArrowUpRight className="size-4 transition group-hover:rotate-45" aria-hidden />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={industriesHub.path}
                    className="inline-flex items-center rounded-full border-2 border-ink px-4 py-2 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
                  >
                    All industry guides
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div className={cx("grid grid-cols-1 gap-5 md:grid-cols-2", guides.length > 0 ? "mt-10" : "mt-5")}>
            <Link
              href={productPath}
              className="group flex items-center justify-between gap-6 rounded-[2rem] border-[2.5px] border-ink p-7 text-ink shadow-[6px_6px_0_#0b0b0b] transition duration-500 hover:-translate-y-1 hover:shadow-[9px_9px_0_#0b0b0b]"
              style={{ background: pop }}
            >
              <span>
                <span className="block font-display text-4xl uppercase leading-none tracking-wide">{productName}</span>
                <span className="mt-2 block text-sm font-semibold opacity-80">{product.kicker}</span>
              </span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-white transition duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
                <ArrowUpRight className="size-5" aria-hidden />
              </span>
            </Link>
            <Link
              href="/solutions/"
              className="group flex items-center justify-between gap-6 rounded-[2rem] border-[2.5px] border-ink bg-ink p-7 text-white shadow-[6px_6px_0_#b5b5b5] transition duration-500 hover:-translate-y-1 hover:shadow-[9px_9px_0_#b5b5b5]"
            >
              <span>
                <span className="block font-display text-4xl uppercase leading-none tracking-wide">All solutions</span>
                <span className="mt-2 block text-sm font-semibold text-white/75">WhatsApp, store, loyalty and CRM use cases</span>
              </span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-white bg-white text-ink transition duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-5" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <DemoCTA />
    </div>
  );
}
