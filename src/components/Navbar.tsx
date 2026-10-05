"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { productList } from "@/lib/products";
import { site } from "@/lib/site";
import { cx } from "@/lib/cx";

const links = [
  { label: "Solutions", href: "/solutions/" },
  { label: "Industries", href: "/industries/" },
  { label: "Platform", href: "/#platform" },
  { label: "Pricing", href: "/pricing/" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const pathname = usePathname();
  const dropId = useId();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 500 && !open);
  });

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setDrop(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className="flex w-full max-w-6xl items-center justify-between rounded-full border-[2.5px] border-ink bg-white py-2 pl-5 pr-2 shadow-[4px_4px_0_#111]"
          aria-label="Main"
        >
          <Link href="/" aria-label="Zutok Softwares home" className="shrink-0 text-[15px] sm:text-base">
            <Logo pill={false} />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            <li className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
              <button
                type="button"
                className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink transition hover:bg-smoke xl:px-4"
                aria-expanded={drop}
                aria-controls={dropId}
                onClick={() => setDrop((d) => !d)}
              >
                Products <ChevronDown className={cx(`size-4 transition ${drop ? "rotate-180" : ""}`)} aria-hidden />
              </button>
              {/* Stays mounted so the product links are crawlable; hidden and inert while closed. */}
              <motion.div
                id={dropId}
                inert={!drop}
                initial={false}
                animate={drop ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className={cx(`absolute left-1/2 top-full w-[46rem] -translate-x-1/2 pt-4 transition-[visibility] duration-[250ms] ${
                  drop ? "visible" : "pointer-events-none invisible"
                }`)}
              >
                <div className="brut grid grid-cols-4 gap-2.5 rounded-3xl bg-white p-2.5">
                  {productList.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="brut-sm group relative overflow-hidden rounded-2xl p-4 transition duration-300 hover:-translate-y-1"
                      style={{ background: p.theme.color, color: p.theme.on }}
                    >
                      <span
                        className="absolute -right-6 -top-6 size-20 rounded-full opacity-80 blur-xl transition group-hover:scale-150"
                        style={{ background: p.theme.pop }}
                      />
                      <span className="relative mb-10 flex items-center justify-between">
                        <span className="font-display text-2xl uppercase tracking-wide">{p.name}</span>
                        <ArrowUpRight className="size-4 transition group-hover:rotate-45" aria-hidden />
                      </span>{" "}
                      <span className="relative block text-xs font-semibold leading-snug opacity-90">{p.kicker}</span>{" "}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-full px-3 py-2 text-sm font-semibold text-ink transition hover:bg-smoke xl:px-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.loginUrl}
              className="hidden whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-smoke sm:block"
            >
              Log in
            </a>{" "}
            <Link
              href="/#demo"
              className="hidden whitespace-nowrap rounded-full border-2 border-ink bg-ink px-5 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#111] sm:block"
            >
              Book a demo
            </Link>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full bg-ink text-white lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-paper flex flex-col px-5 pb-8 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-2 pr-1">
              {productList.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                >
                  <Link
                    href={`/products/${p.slug}`}
                    className="brut-sm flex items-center justify-between gap-4 rounded-3xl px-5 py-5"
                    style={{ background: p.theme.color, color: p.theme.on }}
                  >
                    <span className="flex items-center gap-3 font-display text-4xl uppercase tracking-wide">
                      <span className="size-3.5 rounded-full border-2 border-current" style={{ background: p.theme.pop }} />
                      {p.name}
                    </span>
                    <span className="max-w-[9rem] text-right text-xs font-semibold opacity-90">{p.kicker}</span>
                  </Link>
                </motion.div>
              ))}
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.41 + i * 0.07 }}
                >
                  <Link href={l.href} className="block px-2 py-1.5 font-display text-5xl uppercase text-ink">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a href={site.loginUrl} className="rounded-full border-2 border-ink bg-white py-3.5 text-center font-bold">
                Log in
              </a>
              <Link href="/#demo" onClick={() => setOpen(false)} className="rounded-full border-2 border-ink bg-ink py-3.5 text-center font-bold text-white">
                Book a demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
