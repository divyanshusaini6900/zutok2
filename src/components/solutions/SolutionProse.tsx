import type { SolutionSection } from "@/lib/solutions";

/** A question-style H2, its direct answer first, then the detail. Plain reading width and size. */
export function SolutionProse({ section, pop }: { section: SolutionSection; pop: string }) {
  return (
    <section>
      <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-4xl">{section.heading}</h2>
      <p className="mt-5 text-lg font-semibold leading-relaxed text-ink">{section.lead}</p>
      {section.body?.map((p) => (
        <p key={p} className="mt-4 text-[17px] leading-relaxed text-ink/75">
          {p}
        </p>
      ))}
      {section.bullets && (
        <ul className="mt-6 space-y-3">
          {section.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[17px] font-semibold text-ink/85">
              <span className="mt-2 size-3 shrink-0 rotate-45 border-2 border-ink" style={{ background: pop }} />
              {b}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
