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

const faqs = [
  {
    q: "Can I buy just one product?",
    a: "Yes. ZChat, ZShop and Zloya are each sold on their own, and each includes the CRM features it needs. The Complete Suite bundles all of them for less.",
  },
  {
    q: "How does the ZChat AI know my prices?",
    a: "You add each product with your own columns and rows, like size, paper, quantity, price and order link. The AI asks the customer each choice and quotes only from the row that matches, so it never makes up a price.",
  },
  {
    q: "Is my data safe, and who owns it?",
    a: "Your data belongs to you. It is stored on secure servers with regular database backups, and you can export customers, leads and invoices to CSV or PDF whenever you like.",
  },
  {
    q: "Do you help with WhatsApp Business API approval?",
    a: "Yes. We guide you through connecting your number to the official WhatsApp Business Platform and getting your message templates approved by Meta.",
  },
  {
    q: "Do invoices support GST?",
    a: "Yes. Proposals, estimates, invoices and credit notes are all in rupees with tax fields, and you can export them in bulk as PDF.",
  },
  {
    q: "Is there a setup fee or lock-in?",
    a: "There is no setup fee. Monthly plans can be cancelled at the end of any month, and yearly plans give you two months free.",
  },
];

export default function Home() {
  return (
    <>
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
              Got <br />
              <span className="text-outline">questions?</span>
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
