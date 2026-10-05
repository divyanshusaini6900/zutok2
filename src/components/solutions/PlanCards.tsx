import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { formatINR, pricing, YEARLY_MONTHS_CHARGED } from "@/lib/pricing";
import type { ProductSlug } from "@/lib/products";
import type { SolutionPlan } from "@/lib/solutions";
import { cx } from "@/lib/cx";

type Include = SolutionPlan["includes"][number];

/**
 * Every plan of one product with its real monthly and yearly price, and which of the page's features each plan
 * includes. A plan above the starting one gets a tick only where pricing.ts says so: its own feature list names the
 * feature, or it lists "Everything in" the plan below. Otherwise the row is left off that card rather than guessed.
 */
export function PlanCards({ product, plan, pop }: { product: ProductSlug; plan: SolutionPlan; pop: string }) {
  const group = pricing.find((g) => g.id === product);
  if (!group) return null;
  const tier = (name: string) => group.plans.findIndex((p) => p.name === name);
  const start = tier(plan.includes[0].from);
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {group.plans.map((p, i) => {
        if (p.monthly === null) return null;
        const first = i === start;
        const rows = plan.includes.filter((inc) => has(i, inc) || i < tier(inc.from));
        return (
          <Reveal
            key={p.name}
            delay={i * 0.08}
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
            {plan.highlights[p.name] && <p className="mt-1.5 text-sm font-medium opacity-70">{plan.highlights[p.name]}</p>}
            <p className="mt-6">
              <span className="font-display text-5xl tracking-wide">₹{formatINR(p.monthly)}</span>
              <span className="text-base font-bold">/month</span>
            </p>
            <p className="mt-1 text-xs font-semibold opacity-70">
              Billed monthly, or ₹{formatINR(p.monthly * YEARLY_MONTHS_CHARGED)}/year billed yearly. Excl. 18% GST.
            </p>
            {rows.length > 0 && (
              <ul className={cx("mt-6 space-y-2.5 border-t-2 pt-5", first ? "border-white/15" : "border-ink/10")}>
                {rows.map((inc) => {
                  const on = has(i, inc);
                  return (
                    <li key={inc.label} className="flex items-start gap-2.5 text-sm font-semibold">
                      {on ? (
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
                      <span className={on ? "" : "opacity-50"}>{inc.label}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
