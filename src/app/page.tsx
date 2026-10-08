import { Loader } from "@/components/Loader";
import { Hero } from "@/components/sections/Hero";
import { TickerBand } from "@/components/sections/TickerBand";
import { ReadyTo } from "@/components/sections/ReadyTo";
import { SalesAgent } from "@/components/sections/SalesAgent";
import { ExplodedCRM } from "@/components/sections/ExplodedCRM";
import { ShopJourney } from "@/components/sections/ShopJourney";
import { ZloyaStack } from "@/components/sections/ZloyaStack";
import { ModulesAccordion } from "@/components/sections/ModulesAccordion";
import { Statement, StatsBand } from "@/components/sections/Statement";
import { Industries } from "@/components/sections/Industries";
import { PricingTable } from "@/components/sections/PricingTable";
import { FAQ } from "@/components/sections/FAQ";
import { DemoCTA } from "@/components/sections/DemoCTA";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { homeFaqs as faqs } from "@/lib/company";
import { productList } from "@/lib/products";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  JsonLd,
  absoluteUrl,
  brandedName,
  faqLd,
  ogImage,
  pageMetadata,
  webPageLd,
} from "@/lib/seo";

export const metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "Zutok",
    "Zutok Softwares",
    "all-in-one CRM for Indian businesses",
    "all-in-one CRM for small business India",
    "WhatsApp and Instagram inbox with CRM",
    "CRM with GST invoices",
    "ZChat ZShop Zloya",
  ],
});

const jsonLd = [
  webPageLd({ path: "/", name: HOME_TITLE, description: HOME_DESCRIPTION, image: ogImage("site") }),
  {
    "@type": "ItemList",
    "@id": `${absoluteUrl("/")}#products`,
    name: "Zutok products",
    itemListElement: productList.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: brandedName(p),
      description: p.kicker,
      url: absoluteUrl(`/products/${p.slug}/`),
    })),
  },
  faqLd(faqs, "/"),
];

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Loader />
      <Hero delay={1.75} />
      <TickerBand />
      <ReadyTo />
      <SalesAgent />
      <ExplodedCRM />
      <ShopJourney />
      <ZloyaStack />
      <ModulesAccordion />
      <Statement />
      <StatsBand />
      <Industries />

      <section id="pricing" className="relative bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-14 text-center">
            <Reveal>
              <span className="inline-block rounded-full border-2 border-ink bg-[#22c55e] px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-ink shadow-[3px_3px_0_#0b0b0b]">
                Pricing
              </span>
            </Reveal>
            <h2 className="mt-5 text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
              <SplitText text="Simple plans," className="block" />
              <SplitText text="priced in rupees." className="block font-serif font-normal italic" delay={0.1} />
            </h2>
          </div>
          <PricingTable />
        </div>
      </section>

      <section id="faq" className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="font-display text-6xl uppercase leading-none tracking-wide sm:text-8xl">
              Zutok, <br />
              <span className="text-outline">explained</span>
            </h2>
            <p className="mt-6 max-w-sm font-medium text-ink/65">If your question isn&apos;t answered here, ask us during a free demo.</p>
          </div>
          <FAQ items={faqs} pop="#ff6b1a" />
        </div>
      </section>

      <DemoCTA />
    </>
  );
}
