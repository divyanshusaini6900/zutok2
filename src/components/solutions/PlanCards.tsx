import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { formatINR, getGroup, pricedPlans, yearlyTotal } from "@/lib/pricing";
import type { ProductSlug } from "@/lib/products";
import { solutionStart } from "@/lib/solution-kit";
import type { SolutionPlan } from "@/lib/solutions";
import { cx } from "@/lib/cx";

type Include = NonNullable<SolutionPlan["includes"]>[number];

/**
 * The plans that sell a solution's product, with their real monthly and yearly prices.
 *
 * Zutok CRM pages tick which of the page's features each plan includes. A plan above the starting one gets a tick only
 * where pricing.ts says so: its own feature list names the feature, or it lists "Everything in" the plan below.
 * Otherwise the row is left off that card rather than guessed.
 *
 * ZChat, ZShop and Zloya pages show ZChat plans with each plan's own list (contacts, channels, CRM licenses, and
 * ZShop + Zloya on Growth and Scale), since which ZChat plan has which feature isn't published. ZShop and Zloya pages
 * show only the ZChat plans that include them free.
 */
export function PlanCards({ product, plan, pop }: { product: ProductSlug; plan: SolutionPlan; pop: string }) {
  const { group: groupId, bundled, plan: startPlan } = solutionStart(product, plan);
  const group = getGroup(groupId);
  const plans = pricedPlans(group).filter((p) => !bundled || p.includesZShopAndZloya);
  const tier = (name: string) => group.plans.findIndex((p) => p.name === name);
  const includes = groupId === "crm" ? (plan.includes ?? []) : [];
  const lists = (i: number, inc: Include) =>
    group.plans[i].features.some((f) => f.toLowerCase().includes(inc.label.toLowerCase()));
  const inherits = (i: number) => i > 0 && group.plans[i].features.includes(`Everything in ${group.plans[i - 1].name}`);
  const has = (i: number, inc: Include): boolean => {
    const from = tier(inc.from);
    if (i < from) return false;
    return i === from || lists(i, inc) || (inherits(i) && has(i - 1, inc));
  };
  const label = group.label.startsWith("Zutok") ? group.label : `Zutok ${group.label}`;

  return (
    <div className={cx("grid grid-cols-1 gap-6", plans.length === 2 ? "md:grid-cols-2 lg:max-w-4xl" : "md:grid-cols-3")}>
      {plans.map((p, n) => {
        const i = tier(p.name);
        const first = p.name === startPlan.name;
        const year = yearlyTotal(p) ?? 0;
        // CRM pages: the page's features, ticked per plan. Other pages: the plan's own feature list, all included.
        const rows: { label: string; on: boolean }[] = includes.length
          ? includes.filter((inc) => has(i, inc) || i < tier(inc.from)).map((inc) => ({ label: inc.label, on: has(i, inc) }))
          : p.features.map((f) => ({ label: f, on: true }));
        // Per-plan highlights are CRM-only, so no unpublished ZChat gating can show. A ZChat blurb would only repeat the
        // contacts, channels and licenses in the list below, so ZChat cards have no line here.
        const highlight = groupId === "crm" ? plan.highlights?.[p.name] : undefined;
        return (
          <Reveal
            key={p.name}
            delay={n * 0.08}
            className={cx(
              "relative flex h-full flex-col rounded-[2rem] border-[2.5px] border-ink p-7",
              first ? "bg-ink text-white" : "bg-white text-ink shadow-[6px_6px_0_#0b0b0b]",
            )}
            style={first ? { boxShadow: `6px 6px 0 ${pop}` } : undefined}
          >
            {first && (
              <span
                className="absolute -top-3.5 left-6 rounded-full border-2 border-ink px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink"
                style={{ background: pop }}
              >
                Starts here
              </span>
            )}
            <h3 className="text-xl font-extrabold">
              {label} {p.name}
            </h3>
            {highlight && <p className="mt-1.5 text-sm font-medium opacity-70">{highlight}</p>}
            <p className="mt-6">
              <span className="font-display text-5xl tracking-wide">₹{formatINR(p.monthly)}</span>
              <span className="text-base font-bold">/month</span>
            </p>
            <p className="mt-1 text-xs font-semibold opacity-70">
              Billed monthly, or ₹{formatINR(year)}/year billed yearly
              {p.yearly ? ` (₹${formatINR(p.yearly.perMonth)}/month)` : ""}. Excl. 18% GST.
            </p>
            {rows.length > 0 && (
              <ul className={cx("mt-6 space-y-2.5 border-t-2 pt-5", first ? "border-white/15" : "border-ink/10")}>
                {rows.map((row) => (
                  <li key={row.label} className="flex items-start gap-2.5 text-sm font-semibold">
                    {row.on ? (
                      <span
                        className="mt-px grid size-5 shrink-0 place-items-center rounded-full border-2 border-ink text-ink"
                        style={{ background: pop }}
                        role="img"
                        aria-label="Included:"
                      >
                        <Check className="size-3" aria-hidden />
                      </span>
                    ) : (
                      <span className="mt-px grid size-5 shrink-0 place-items-center opacity-40" role="img" aria-label="Not included:">
                        <Minus className="size-4" aria-hidden />
                      </span>
                    )}
                    <span className={row.on ? "" : "opacity-50"}>{row.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
