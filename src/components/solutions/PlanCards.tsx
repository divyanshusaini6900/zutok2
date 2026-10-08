import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { formatINR, getGroup, pricedPlans, yearlyTotal } from "@/lib/pricing";
import type { ProductSlug } from "@/lib/products";
import { solutionStart } from "@/lib/solution-kit";
import type { SolutionPlan } from "@/lib/solutions";
import { cx } from "@/lib/cx";

/**
 * The plans that sell a solution's product, with their real monthly and yearly prices.
 *
 * Zutok CRM pages show its three per-user prices (1 user, 3 users, 5 or more users) with no starting tier, since no
 * CRM module depends on the number of users. What Zutok CRM includes is listed once under the cards rather than
 * repeated on each one.
 *
 * ZChat, ZShop and Zloya pages show ZChat plans with each plan's own list (contacts, channels, CRM licenses, and
 * ZShop + Zloya on Growth and Scale), since which ZChat plan has which feature isn't published. ZShop and Zloya pages
 * show only the ZChat plans that include them free.
 */
export function PlanCards({ product, plan, pop }: { product: ProductSlug; plan: SolutionPlan; pop: string }) {
  const { group: groupId, bundled, plan: startPlan } = solutionStart(product, plan);
  const group = getGroup(groupId);
  const perUser = Boolean(group.perUser);
  const plans = pricedPlans(group).filter((p) => !bundled || p.includesZShopAndZloya);
  const label = group.label.startsWith("Zutok") ? group.label : `Zutok ${group.label}`;
  // Zutok CRM prices are per user; ZChat prices are per plan.
  const u = perUser ? " per user" : "";

  return (
    <div>
      <div className={cx("grid grid-cols-1 gap-6", plans.length === 2 ? "md:grid-cols-2 lg:max-w-4xl" : "md:grid-cols-3")}>
        {plans.map((p, n) => {
          // Zutok CRM has no starting tier: every module comes at every user count.
          const first = !perUser && p.name === startPlan.name;
          const year = yearlyTotal(p) ?? 0;
          // ZChat cards list the plan's own allowances. Zutok CRM's list is the same for every user count, so it's below.
          const rows = group.sharedFeatures ? [] : p.features;
          // A ZChat blurb would only repeat the contacts, channels and licenses in the list, so ZChat cards have no line here.
          const highlight = perUser ? p.blurb : undefined;
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
              <h3 className="text-xl font-extrabold">{perUser ? `${label}, ${p.name}` : `${label} ${p.name}`}</h3>
              {highlight && <p className="mt-1.5 text-sm font-medium opacity-70">{highlight}</p>}
              <p className="mt-6">
                <span className="font-display text-5xl tracking-wide">₹{formatINR(p.monthly)}</span>
                <span className="text-base font-bold">{perUser ? "/user/month" : "/month"}</span>
              </p>
              <p className="mt-1 text-xs font-semibold opacity-70">
                {perUser ? "Per user, billed monthly" : "Billed monthly"}, or ₹{formatINR(year)}
                {u}/year billed yearly (₹{formatINR(p.yearly.perMonth)}
                {u}/month{group.yearlyOff ? `, ${group.yearlyOff}% off` : ""}). Excl. 18% GST.
              </p>
              {rows.length > 0 && (
                <ul className={cx("mt-6 space-y-2.5 border-t-2 pt-5", first ? "border-white/15" : "border-ink/10")}>
                  {rows.map((row) => (
                    <li key={row} className="flex items-start gap-2.5 text-sm font-semibold">
                      <span
                        className="mt-px grid size-5 shrink-0 place-items-center rounded-full border-2 border-ink text-ink"
                        style={{ background: pop }}
                        role="img"
                        aria-label="Included:"
                      >
                        <Check className="size-3" aria-hidden />
                      </span>
                      <span>{row}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          );
        })}
      </div>
      {group.sharedFeatures && (
        <Reveal
          delay={0.1}
          className="mt-6 rounded-[2rem] border-[2.5px] border-ink bg-white p-7 text-ink shadow-[6px_6px_0_#0b0b0b]"
        >
          <h3 className="text-lg font-extrabold">Part of {label}, priced per user</h3>
          <p className="mt-1 text-sm font-medium opacity-70">No module depends on the number of users.</p>
          <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {group.sharedFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm font-semibold">
                <span
                  className="mt-px grid size-5 shrink-0 place-items-center rounded-full border-2 border-ink text-ink"
                  style={{ background: pop }}
                  role="img"
                  aria-label="Included:"
                >
                  <Check className="size-3" aria-hidden />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </div>
  );
}
