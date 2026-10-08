"use client";

import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { InlineText } from "@/components/ui/InlineText";

export type QA = { q: string; a: string };

export function FAQ({
  items,
  accent = "#0b0b0b",
  onAccent = "#ffffff",
  pop = "#a78bfa",
}: {
  items: QA[];
  accent?: string;
  onAccent?: string;
  /** Colour of the hard shadow under the open question. */
  pop?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <div className="space-y-3.5">
      {items.map((it, i) => {
        const isOpen = open === i;
        const qid = `${uid}-q${i}`;
        const aid = `${uid}-a${i}`;
        return (
          <motion.div
            key={it.q}
            layout
            className="overflow-hidden rounded-3xl border-[2.5px] border-ink transition-[background-color,color,box-shadow] duration-500"
            style={{
              background: isOpen ? accent : "#ffffff",
              color: isOpen ? onAccent : "#0b0b0b",
              boxShadow: isOpen ? `6px 6px 0 ${pop}` : "3px 3px 0 #0b0b0b",
            }}
          >
            <h3>
              <button
                type="button"
                id={qid}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={aid}
              >
                <span className="text-lg font-bold sm:text-xl">{it.q}</span>
                <motion.span
                  className="grid size-10 shrink-0 place-items-center rounded-full border-2"
                  style={{
                    background: isOpen ? pop : "#ffffff",
                    borderColor: isOpen ? pop : "#0b0b0b",
                    color: "#0b0b0b",
                  }}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                >
                  <Plus className="size-5" aria-hidden />
                </motion.span>
              </button>
            </h3>
            {/* Every answer stays mounted so it is in the static HTML; closed ones collapse to zero height and go inert. */}
            <motion.div
              id={aid}
              role="region"
              aria-labelledby={qid}
              inert={!isOpen}
              initial={false}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-3xl px-6 pb-6 font-medium leading-relaxed opacity-85">
                <InlineText text={it.a} />
              </p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
