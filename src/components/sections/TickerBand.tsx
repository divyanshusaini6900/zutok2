import { LogoMark } from "@/components/ui/Logo";
import { Marquee } from "@/components/ui/Marquee";

const a = ["WhatsApp inbox", "AI sales agent", "COD confirmation", "Abandoned carts", "Loyalty points", "VIP tiers", "GST invoices", "HRM & payroll"];
const b = [
  { name: "ZChat", bg: "#22c55e" },
  { name: "ZShop", bg: "#ff6b1a" },
  { name: "Zloya", bg: "#ff4d8d" },
  { name: "Zutok CRM", bg: "#a78bfa" },
];

export function TickerBand() {
  return (
    <section className="relative h-48 overflow-hidden bg-paper sm:h-56" aria-label="Zutok features">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[-4deg] border-y-[2.5px] border-ink bg-ink py-4">
        <Marquee
          items={a.map((t) => (
            <span key={t} className="px-6 font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
              {t}
            </span>
          ))}
          separator={<LogoMark className="h-5 w-6 text-white" />}
          duration={40}
        />
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] border-y-[2.5px] border-ink bg-white py-3">
        <Marquee
          reverse
          items={[...b, ...b].map((t, i) => (
            <span
              key={i}
              className="mx-3 inline-flex items-center rounded-full border-[2.5px] border-ink px-5 pb-0.5 font-serif text-2xl italic text-ink shadow-[3px_3px_0_#0b0b0b] sm:text-3xl"
              style={{ background: t.bg }}
            >
              {t.name}
            </span>
          ))}
          separator={<span className="size-2.5 rotate-45 bg-ink" />}
          duration={30}
        />
      </div>
    </section>
  );
}
