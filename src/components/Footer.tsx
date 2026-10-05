import Link from "next/link";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { Marquee } from "@/components/ui/Marquee";
import { industriesHub, industryList, industryPath } from "@/lib/industries";
import { productList } from "@/lib/products";
import { solutionBySlug, solutionPath, type SolutionSlug } from "@/lib/solutions";
import { site } from "@/lib/site";

const solutionLink = (slug: SolutionSlug, label = solutionBySlug[slug].name) => ({ label, href: solutionPath(slug) });

const cols = [
  {
    title: "Products",
    links: productList.map((p) => ({ label: p.name, href: `/products/${p.slug}/` })),
  },
  {
    title: "Platform",
    links: [
      solutionLink("indiamart-meta-lead-ads-crm", "IndiaMART & Meta leads"),
      solutionLink("gst-invoicing-crm", "GST invoicing"),
      solutionLink("crm-with-hrm-payroll", "HRM & payroll"),
      { label: "Real estate CRM", href: industryPath("real-estate") },
      { label: "All CRM modules", href: "/products/crm/#modules" },
    ],
  },
  {
    title: "Solutions",
    links: [
      solutionLink("whatsapp-ai-sales-agent"),
      solutionLink("whatsapp-cod-confirmation"),
      solutionLink("abandoned-cart-recovery-whatsapp", "Abandoned cart recovery"),
      solutionLink("restaurant-membership-prepaid-wallet"),
      solutionLink("automated-winback-birthday-campaigns"),
      { label: "All solutions", href: "/solutions/" },
    ],
  },
  {
    title: "Industries",
    links: [
      ...industryList.map((i) => ({ label: i.name, href: industryPath(i.slug) })),
      { label: "All industries", href: industriesHub.path },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Zutok", href: "/about/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "Book a demo", href: "/#demo" },
      { label: "FAQ", href: "/#faq" },
      { label: "Log in", href: site.loginUrl },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-paper pt-6 text-ink">
      <div className="relative -mx-2 -rotate-1 border-y-[2.5px] border-ink bg-ink py-3 text-white">
        <Marquee
          items={["WhatsApp", "Instagram", "Messenger", "Telegram", "Shopify", "WooCommerce", "IndiaMART", "Meta Lead Ads", "Google Reviews", "GST invoices"].map(
            (t) => (
              <span key={t} className="px-6 font-display text-2xl uppercase tracking-wide">
                {t}
              </span>
            ),
          )}
          separator={<LogoMark className="h-4 w-5 text-white" />}
          duration={34}
        />
      </div>

      <div className="dots pointer-events-none absolute inset-0 top-20 opacity-50" />
      <div className="relative mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 xl:grid-cols-[1.3fr_repeat(5,minmax(0,1fr))]">
          <div className="col-span-2 md:col-span-3 xl:col-span-1">
            <Logo className="text-lg shadow-[4px_4px_0_#111]" />
            <p className="mt-6 max-w-sm text-sm font-medium leading-relaxed text-ink/70">
              {site.tagline} Built in India for businesses that sell on WhatsApp, Instagram and at the counter.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block rounded-full border-2 border-ink bg-ink px-5 py-2.5 text-base font-bold text-white shadow-[3px_3px_0_#111] transition hover:-translate-y-0.5"
            >
              {site.email}
            </a>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="inline-block rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-white">
                {c.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm font-semibold text-ink/80 underline-offset-4 transition hover:text-ink hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-16 flex select-none items-end justify-center gap-[2vw] overflow-hidden px-4" aria-hidden>
        <LogoMark className="mb-[2vw] h-[16vw] w-[18.6vw] shrink-0 text-ink" />
        <div className="font-display text-[22vw] leading-[0.8] tracking-tight text-transparent [-webkit-text-stroke:2.5px_#111]">
          ZUTOK
        </div>
      </div>

      <div className="relative border-t-[2.5px] border-ink bg-ink text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs font-bold sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {site.company}. All rights reserved.</p>
          <p>Prices in INR, exclusive of 18% GST.</p>
        </div>
      </div>
    </footer>
  );
}
