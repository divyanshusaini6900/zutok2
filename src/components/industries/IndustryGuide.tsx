import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/industries/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { findPlan, planLabel, type Industry } from "@/lib/industries";
import { formatINR, YEARLY_MONTHS_CHARGED } from "@/lib/pricing";
import { products } from "@/lib/products";
import { brandedName } from "@/lib/seo";
import { cx } from "@/lib/cx";

/* Building blocks for /industries/<slug>/. Server components; animation comes only from Reveal and SplitText. */

type Theme = Industry["theme"];

/** "₹999/month" and "₹9,990/year", both billed as stated and excluding GST. */
function prices(group: Industry["plans"]["picks"][number]["group"], name: string) {
  const { plan } = findPlan(group, name);
  return {
    monthly: `₹${formatINR(plan.monthly)}`,
    yearly: `₹${formatINR(plan.monthly * YEARLY_MONTHS_CHARGED)}`,
  };
}

const planHref = (group: Industry["plans"]["picks"][number]["group"]) =>
  group === "suite" ? "/pricing/" : `/products/${group}/#pricing`;

export function IndustryHero({ industry, crumbs }: { industry: Industry; crumbs: Crumb[] }) {
  const t = industry.theme;
  const lead = industry.plans.picks[0];
  const price = prices(lead.group, lead.plan);
  return (
    <section className="relative overflow-hidden bg-paper pt-36 sm:pt-44">
      <div className="dots pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div
        className="pointer-events-none absolute -right-24 top-20 size-[28rem] animate-float rounded-full opacity-25 blur-[120px]"
        style={{ background: t.pop }}
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid grid-cols-1 gap-14 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] shadow-[3px_3px_0_#0b0b0b]"
              style={{ background: t.bg, color: t.fg }}
            >
              <Icon name={industry.icon} className="size-4" /> Industry guide
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              <SplitText text={industry.h1[0]} className="block" immediate />
              <SplitText text={industry.h1[1]} className="block font-serif font-normal italic" immediate delay={0.1} />
            </h1>
            {/* Answer-first: the direct answer sits right under the h1, unanimated, so it is the first thing read. */}
            <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-ink/80 sm:text-xl">{industry.answer}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#demo">Book a free demo</Button>
              <Button href="#plans" variant="ghost" arrow={false}>
                See plans and prices
              </Button>
            </div>
          </div>

          <Reveal delay={0.2} y={50}>
            <div
              className="relative -rotate-2 overflow-hidden rounded-[2rem] border-[2.5px] border-ink p-7"
              // An ink card keeps its accent shadow so it doesn't melt into an ink shadow.
              style={{ background: t.bg, color: t.fg, boxShadow: `8px 8px 0 ${t.bg === "#0b0b0b" ? t.pop : "#0b0b0b"}` }}
            >
              <div className="pointer-events-none absolute -bottom-16 -right-16 size-48 rounded-full bg-white/15" />
              <span className="relative grid size-14 place-items-center rounded-2xl border-[2.5px] border-current bg-white/20">
                <Icon name={industry.icon} className="size-7" />
              </span>
              <p className="relative mt-8 text-2xl font-extrabold">{industry.name}</p>
              <p className="relative mt-2 text-[15px] leading-relaxed opacity-90">{industry.tagline}</p>
              <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.2em] opacity-70">Built with</p>
              <ul className="relative mt-3 flex flex-wrap gap-2">
                {industry.uses.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/products/${slug}/`}
                      className="inline-block rounded-full border-2 border-current px-3 py-1 text-sm font-bold transition hover:bg-white/25"
                    >
                      {brandedName(products[slug])}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="relative mt-6 rounded-2xl border-2 border-ink bg-white p-4 text-ink">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">{planLabel(lead.group, lead.plan)}</p>
                <p className="mt-1 font-display text-4xl tracking-wide">
                  {price.monthly}
                  <span className="font-sans text-base font-bold tracking-normal">/month</span>
                </p>
                <p className="mt-1 text-sm font-medium text-ink/65">
                  Billed monthly ({price.yearly}/year if billed yearly), excl. 18% GST
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export type TocItem = { id: string; label: string };

/** Jump links. A chip row on small screens, a sticky list beside the article on large ones. */
export function OnThisPage({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
      <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-ink/45">On this page</p>
      <ol className="mt-4 flex flex-wrap gap-2 lg:block lg:space-y-1 lg:border-l-[2.5px] lg:border-ink/10">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="block rounded-full border-2 border-ink/15 px-3 py-1.5 text-sm font-semibold text-ink/65 transition hover:border-ink hover:text-ink lg:-ml-[2.5px] lg:rounded-none lg:border-0 lg:border-l-[2.5px] lg:border-transparent lg:px-0 lg:py-1.5 lg:pl-4"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** One article section: numbered kicker, question-style h2, then the body. */
export function GuideSection({
  id,
  n,
  kicker,
  title,
  theme,
  children,
}: {
  id: string;
  n: number;
  kicker: string;
  title: string;
  theme: Theme;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <span
        className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em] shadow-[3px_3px_0_#0b0b0b]"
        style={{ background: theme.bg, color: theme.fg }}
      >
        {String(n).padStart(2, "0")} · {kicker}
      </span>
      <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink/75">{children}</div>;
}

export function ProductRoles({ approach }: { approach: Industry["approach"] }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:[&>*:last-child:nth-child(odd)]:col-span-2">
      {approach.products.map((p) => {
        const prod = products[p.slug];
        return (
          <div
            key={p.slug}
            className="flex flex-col overflow-hidden rounded-[2rem] border-[2.5px] border-ink bg-white shadow-[6px_6px_0_#0b0b0b]"
          >
            <div className="border-b-[2.5px] border-ink px-6 py-4" style={{ background: prod.theme.pop, color: prod.theme.popOn }}>
              <h3 className="font-display text-3xl uppercase tracking-wide">{brandedName(prod)}</h3>
              <p className="text-sm font-bold opacity-80">{prod.kicker}</p>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="font-bold text-ink">{p.role}</p>
              <ul className="mt-4 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[15px] font-medium leading-snug text-ink/75">
                    <span className="mt-1.5 size-2.5 shrink-0 rotate-45 border-2 border-ink" style={{ background: prod.theme.pop }} />
                    {pt}
                  </li>
                ))}
              </ul>
              <Link
                href={`/products/${p.slug}/`}
                className="group mt-6 inline-flex items-center gap-1.5 self-start text-sm font-extrabold text-ink underline decoration-2 underline-offset-4"
              >
                {p.linkText}
                <ArrowUpRight className="size-4 transition group-hover:rotate-45" aria-hidden />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Workflow({ steps, theme }: { steps: Industry["workflow"]["steps"]; theme: Theme }) {
  return (
    <ol className="relative mt-10 space-y-4 before:absolute before:bottom-8 before:left-[2.7rem] before:top-8 before:w-[2.5px] before:bg-ink/15 sm:before:left-[2.95rem]">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={cx(
            "relative grid grid-cols-[auto_minmax(0,1fr)] gap-5 rounded-[1.75rem] border-[2.5px] border-ink bg-white p-5 sm:p-6",
            i % 2 ? "shadow-[4px_4px_0_#0b0b0b]" : "",
          )}
          style={i % 2 ? undefined : { boxShadow: `4px 4px 0 ${theme.pop}` }}
        >
          <span
            className="grid size-11 place-items-center rounded-2xl border-[2.5px] border-ink font-display text-xl"
            style={{ background: theme.bg, color: theme.fg }}
            aria-hidden
          >
            {i + 1}
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/45">{s.label}</p>
            <h3 className="mt-1 text-xl font-extrabold text-ink">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-ink/70">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function FeatureCards({ items }: { items: Industry["features"]["items"] }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((f) => {
        const prod = products[f.product];
        return (
          <div key={f.title} className="rounded-[1.75rem] border-[2.5px] border-ink bg-white p-6 shadow-[4px_4px_0_#0b0b0b]">
            <div className="flex items-center justify-between gap-3">
              <span
                className="grid size-11 place-items-center rounded-2xl border-2 border-ink"
                style={{ background: prod.theme.pop, color: prod.theme.popOn }}
              >
                <Icon name={f.icon} className="size-5" />
              </span>
              <span className="rounded-full border-2 border-ink/15 px-2.5 py-0.5 text-[11px] font-bold text-ink/60">
                {brandedName(prod)}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-extrabold leading-snug text-ink">{f.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink/70">{f.body}</p>
          </div>
        );
      })}
    </div>
  );
}

/** Plain price table: every figure is billed as labelled and excludes GST, matching src/lib/pricing.ts. */
export function PlanTable({ picks, notes }: { picks: Industry["plans"]["picks"]; notes: string[] }) {
  return (
    <>
      <div className="mt-8 overflow-x-auto rounded-[2rem] border-[2.5px] border-ink bg-white shadow-[6px_6px_0_#0b0b0b]">
        <table className="w-full min-w-[38rem] text-left">
          <thead>
            <tr className="bg-ink text-sm text-white">
              <th scope="col" className="p-4 pl-6 font-bold">
                Plan
              </th>
              <th scope="col" className="p-4 font-bold">
                What it covers
              </th>
              <th scope="col" className="whitespace-nowrap p-4 text-right font-bold">
                Billed monthly
              </th>
              <th scope="col" className="whitespace-nowrap p-4 pr-6 text-right font-bold">
                Billed yearly
              </th>
            </tr>
          </thead>
          <tbody>
            {picks.map((p) => {
              const price = prices(p.group, p.plan);
              return (
                <tr key={`${p.group}-${p.plan}`} className="border-b border-ink/10 last:border-0">
                  <th scope="row" className="p-4 pl-6 align-top">
                    <Link href={planHref(p.group)} className="font-extrabold text-ink underline-offset-4 hover:underline">
                      {planLabel(p.group, p.plan)}
                    </Link>
                  </th>
                  <td className="p-4 align-top text-sm font-medium leading-relaxed text-ink/70">{p.fit}</td>
                  <td className="whitespace-nowrap p-4 text-right align-top font-extrabold text-ink">
                    {price.monthly}
                    <span className="text-xs font-semibold text-ink/55">/month</span>
                  </td>
                  <td className="whitespace-nowrap p-4 pr-6 text-right align-top text-sm font-semibold text-ink/70">
                    {price.yearly}/year
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ul className="mt-5 space-y-1.5 text-sm font-medium leading-relaxed text-ink/60">
        {notes.map((n) => (
          <li key={n} className="flex items-start gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink/40" />
            {n}
          </li>
        ))}
      </ul>
    </>
  );
}
