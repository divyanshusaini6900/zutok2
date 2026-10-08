import Link from "next/link";
import { bundlePlanNames, formatINR, priceFor, pricing, yearlyTotal, type PricingGroupId } from "@/lib/pricing";
import { groupName } from "@/lib/seo";

/**
 * Every plan's monthly and yearly price as a plain table. The tabbed PricingTable only renders one group at a time,
 * so this is what puts all of them in the page's HTML, matching the OfferCatalog JSON-LD on /pricing/. Zutok CRM's
 * rows are its per-user prices for 1 user, 3 users and 5 or more users, with the CRM note in the group header.
 * With `linkProducts`, each group heading links to its product page, and the ZChat group's last row links to ZShop
 * and Zloya, which come free with ZChat Growth and Scale.
 */
export function PlanPriceTable({ ids, linkProducts = false }: { ids?: PricingGroupId[]; linkProducts?: boolean }) {
  const groups = ids ? pricing.filter((g) => ids.includes(g.id)) : pricing;
  // ZChat rows are plans; Zutok CRM rows are user counts ("1 user", "3 users", "5 or more users").
  const rowHeading = groups.every((g) => g.perUser) ? "Users" : groups.some((g) => g.perUser) ? "Plan or users" : "Plan";
  return (
    <div className="overflow-x-auto rounded-[2rem] border-[2.5px] border-ink bg-white shadow-[6px_6px_0_#0b0b0b]">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="bg-ink text-sm text-white">
            <th scope="col" className="p-5 font-bold">
              {rowHeading}
            </th>
            <th scope="col" className="p-5 font-bold">
              What it covers
            </th>
            <th scope="col" className="p-5 text-right font-extrabold">
              Billed monthly
            </th>
            <th scope="col" className="p-5 text-right font-extrabold">
              Billed yearly
            </th>
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g.id} className="border-b-[2.5px] border-ink last:border-0">
            <tr className="bg-smoke">
              <th scope="colgroup" colSpan={4} className="px-5 py-3 text-sm font-extrabold text-ink">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full ring-1 ring-ink/20" style={{ background: g.stripe }} />
                    {linkProducts ? (
                      <Link href={`/products/${g.id}/`} className="underline decoration-2 underline-offset-4 hover:decoration-[3px]">
                        {g.perUser ? `${groupName(g)} prices per user` : `${groupName(g)} plans`}
                      </Link>
                    ) : g.perUser ? (
                      `${groupName(g)} prices per user`
                    ) : (
                      groupName(g)
                    )}
                  </span>
                  {/* ZChat's note is about ZShop and Zloya, which get their own row below; /pricing/ covers Meta's charges under the table. */}
                  {g.note && !g.plans.some((p) => p.includesZShopAndZloya) && (
                    <span className="text-xs font-medium text-ink/60">{g.note}</span>
                  )}
                </span>
              </th>
            </tr>
            {g.plans.map((p) => {
              const year = yearlyTotal(p);
              return (
                <tr key={p.name} className="border-t border-ink/5">
                  <th scope="row" className="p-5 align-top text-sm font-extrabold text-ink">
                    {p.name}
                    {p.popular && (
                      <span
                        className="mt-1.5 block w-fit rounded-full border-2 border-ink px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider"
                        style={{ background: g.pop, color: g.pop === "#6c2bd9" ? "#ffffff" : "#0b0b0b" }}
                      >
                        {p.badge ?? "Popular"}
                      </span>
                    )}
                  </th>
                  <td className="p-5 align-top text-sm font-medium text-ink/70">{p.blurb}</td>
                  <td className="whitespace-nowrap p-5 text-right align-top">
                    {p.monthly === null ? (
                      <span className="text-sm font-extrabold">Custom</span>
                    ) : (
                      <>
                        <span className="text-lg font-extrabold text-ink">₹{formatINR(p.monthly)}</span>
                        <span className="text-xs font-semibold text-ink/55">{g.perUser ? "/user/month" : "/month"}</span>
                      </>
                    )}
                  </td>
                  <td className="whitespace-nowrap p-5 text-right align-top">
                    {year === null ? (
                      <span className="text-sm font-extrabold">Custom</span>
                    ) : (
                      <>
                        <span className="text-lg font-extrabold text-ink">₹{formatINR(year)}</span>
                        <span className="text-xs font-semibold text-ink/55">{g.perUser ? "/user/year" : "/year"}</span>
                        <span className="block whitespace-normal text-xs font-medium text-ink/55">
                          ₹{formatINR(priceFor(p, true) ?? 0)}
                          {g.perUser ? " per user" : ""}/month billed yearly
                          {g.yearlyOff ? ` (${g.yearlyOff}% off)` : ""}
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
            {g.plans.some((p) => p.includesZShopAndZloya) && (
              <tr className="border-t border-ink/5">
                <th scope="row" className="p-5 align-top text-sm font-extrabold text-ink">
                  ZShop and Zloya
                </th>
                <td colSpan={3} className="p-5 align-top text-sm font-medium text-ink/70">
                  {linkProducts ? (
                    <>
                      <Link href="/products/zshop/" className="font-bold text-ink underline underline-offset-4">
                        Zutok ZShop
                      </Link>{" "}
                      and{" "}
                      <Link href="/products/zloya/" className="font-bold text-ink underline underline-offset-4">
                        Zutok Zloya
                      </Link>
                    </>
                  ) : (
                    "Zutok ZShop and Zutok Zloya"
                  )}{" "}
                  aren&apos;t sold separately: they&apos;re included free with ZChat {bundlePlanNames()}.
                </td>
              </tr>
            )}
          </tbody>
        ))}
      </table>
    </div>
  );
}
