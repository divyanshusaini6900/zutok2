import { ImageResponse } from "next/og";
import { productList, products, type ProductSlug } from "@/lib/products";
import { pricing } from "@/lib/pricing";
import { site } from "@/lib/site";
import { OG_SIZE, brandedName, ogCards, type OgCard } from "@/lib/seo";

// 1200×630 social cards, exported as /og/<card>.png at build time and referenced through `pageMetadata`.
export const dynamic = "force-static";
export const dynamicParams = false;

const INK = "#0b0b0b";
const onColor = (c: string) => (c === "#6c2bd9" ? "#ffffff" : INK);

type Card = {
  kicker: string;
  title: string;
  /** The last line is set in the serif italic, like the site's headings. */
  lines: string[];
  pop: string;
  chips: { label: string; color: string }[];
  stripe: string[];
};

// A product card shows its first four marquee items, except the CRM, whose list starts with lead sources.
function productCard(slug: ProductSlug, chips = products[slug].marquee.slice(0, 4)): Card {
  const p = products[slug];
  return {
    kicker: p.kicker,
    title: p.name,
    lines: p.headline,
    pop: p.theme.pop,
    chips: chips.map((label) => ({ label, color: "#ffffff" })),
    stripe: [p.theme.pop],
  };
}

const cards: Record<OgCard, Card> = {
  site: {
    kicker: "All-in-one CRM for India",
    title: site.name,
    lines: ["One CRM for every", "conversation, order and customer."],
    pop: "#22c55e",
    chips: productList.map((p) => ({ label: brandedName(p), color: p.theme.pop })),
    stripe: ["#22c55e", "#ff6b1a", "#ff4d8d", "#6c2bd9"],
  },
  pricing: {
    kicker: "Plans & pricing",
    title: "Pricing",
    lines: ["Simple plans,", "priced in rupees."],
    pop: "#22c55e",
    chips: pricing.map((g) => ({ label: g.label, color: g.pop })),
    stripe: ["#22c55e", "#ff6b1a", "#ff4d8d", "#6c2bd9"],
  },
  zchat: productCard("zchat"),
  zshop: productCard("zshop"),
  zloya: productCard("zloya"),
  crm: productCard("crm", ["Leads", "GST invoices", "HRM & payroll", "Inventory"]),
};

// Brand fonts from Google Fonts, subset to the characters the cards use. If a download fails the card still
// renders in the default font, so a flaky network never breaks the build.
const allText = Object.values(cards)
  .flatMap((c) => [c.kicker, c.title, ...c.lines, ...c.chips.map((x) => x.label)])
  .concat([site.company, "zutok.in"])
  .join(" ");
const charset = [...new Set(allText + allText.toUpperCase())].join("");

async function googleFont(family: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(charset)}`;
    const css = await fetch(cssUrl, { signal: AbortSignal.timeout(10_000) }).then((r) => r.text());
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src, { signal: AbortSignal.timeout(10_000) });
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

type Font = { name: string; data: ArrayBuffer; weight: 400 | 600 | 800; style: "normal" | "italic" };

const fontsReady: Promise<Font[]> = Promise.all([
  googleFont("Anton").then((data) => data && ({ name: "Anton", data, weight: 400, style: "normal" }) as Font),
  googleFont("Poppins:wght@600").then((data) => data && ({ name: "Poppins", data, weight: 600, style: "normal" }) as Font),
  googleFont("Poppins:wght@800").then((data) => data && ({ name: "Poppins", data, weight: 800, style: "normal" }) as Font),
  googleFont("Instrument+Serif:ital@1").then(
    (data) => data && ({ name: "Instrument Serif", data, weight: 400, style: "italic" }) as Font,
  ),
]).then((list) => list.filter((f): f is Font => Boolean(f)));

export function generateStaticParams() {
  return ogCards.map((card) => ({ card: `${card}.png` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ card: string }> }) {
  const { card: file } = await params;
  const card = cards[file.replace(/\.png$/, "") as OgCard];
  if (!card) return new Response("Not found", { status: 404 });
  const fonts = await fontsReady;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          color: INK,
          fontFamily: "Poppins",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "52px 64px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `4px solid ${INK}`,
                borderRadius: 999,
                padding: "10px 26px 10px 20px",
                background: "#ffffff",
                boxShadow: `6px 6px 0 ${INK}`,
              }}
            >
              <svg width="46" height="40" viewBox="0 0 432 372" fill={INK}>
                <path d="M122 0H432L277 170Z" />
                <path d="M152 205L307 372H0Z" />
                <path d="M77 35L357 340" fill="none" stroke={INK} strokeWidth="46" strokeLinecap="round" />
              </svg>
              <span style={{ marginLeft: 14, fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>{site.company}</span>
            </div>
            <div
              style={{
                display: "flex",
                border: `4px solid ${INK}`,
                borderRadius: 999,
                padding: "10px 24px",
                background: card.pop,
                color: onColor(card.pop),
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: "uppercase",
                boxShadow: `5px 5px 0 ${INK}`,
              }}
            >
              {card.kicker}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontFamily: "Anton",
              fontSize: 172,
              lineHeight: 1,
              letterSpacing: 3,
              textTransform: "uppercase",
              textShadow: `8px 8px 0 ${card.pop}`,
            }}
          >
            {card.title}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", marginTop: 26, fontSize: 46, fontWeight: 800 }}>
            {card.lines.map((line, i) =>
              i === card.lines.length - 1 ? (
                <span key={line} style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, fontSize: 56 }}>
                  {line}
                </span>
              ) : (
                <span key={line} style={{ marginRight: 14, letterSpacing: -1 }}>
                  {line}
                </span>
              ),
            )}
          </div>

          <div style={{ display: "flex", marginTop: "auto", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex" }}>
              {card.chips.map((chip) => (
                <span
                  key={chip.label}
                  style={{
                    display: "flex",
                    marginRight: 12,
                    border: `3px solid ${INK}`,
                    borderRadius: 999,
                    padding: "6px 16px",
                    background: chip.color,
                    color: onColor(chip.color),
                    fontSize: 20,
                    fontWeight: 600,
                  }}
                >
                  {chip.label}
                </span>
              ))}
            </div>
            <span style={{ fontSize: 26, fontWeight: 800 }}>zutok.in</span>
          </div>
        </div>
        <div style={{ display: "flex", height: 22, borderTop: `4px solid ${INK}` }}>
          {card.stripe.map((c) => (
            <div key={c} style={{ display: "flex", flex: 1, background: c }} />
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length ? fonts : undefined },
  );
}
