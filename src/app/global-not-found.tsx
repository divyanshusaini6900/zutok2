import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { productList } from "@/lib/products";
import { site } from "@/lib/site";
import { brandedName } from "@/lib/seo";
import { cx } from "@/lib/cx";
import { fontVariables } from "./fonts";
import "./globals.css";

/*
 * The 404 page, exported as out/404.html, which GitHub Pages serves for every unknown URL.
 * It renders outside the root layout, so it brings its own fonts, styles and head tags instead of the home page's.
 * Next adds the noindex robots tag to 404 pages itself.
 */

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
  description: "This page doesn't exist. Go to the Zutok home page, pricing, or one of the Zutok products.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function GlobalNotFound() {
  return (
    <html lang="en-IN" className={cx(`${fontVariables} antialiased`)}>
      <body className="min-h-screen">
        <Navbar />
        <main>
          <section className="relative overflow-hidden bg-paper pb-24 pt-36 sm:pb-32 sm:pt-44">
            <div className="dots pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
              <span className="inline-block rounded-full border-2 border-ink bg-[#ff6b1a] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-ink shadow-[3px_3px_0_#0b0b0b]">
                Error 404
              </span>
              <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                This page <span className="font-serif font-normal italic">doesn&apos;t exist.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-ink/75">
                The link may be old or mistyped. Start from the home page, see every plan on the pricing page, or pick a
                product below.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/">Go to the home page</Button>
                <Button href="/pricing/" variant="ghost" arrow={false}>
                  See pricing in ₹
                </Button>
              </div>
              <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {productList.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}/`}
                      className="group flex h-full items-start justify-between gap-4 rounded-[2rem] border-[2.5px] border-ink p-6 shadow-[6px_6px_0_#0b0b0b] transition duration-500 hover:-translate-y-1 hover:shadow-[9px_9px_0_#0b0b0b]"
                      style={{ background: p.theme.pop, color: p.theme.popOn }}
                    >
                      <span>
                        <span className="block font-display text-3xl uppercase leading-none tracking-wide">{brandedName(p)}</span>
                        <span className="mt-2 block text-sm font-semibold opacity-80">{p.kicker}</span>
                      </span>
                      <ArrowUpRight className="size-5 shrink-0 transition duration-500 group-hover:rotate-45" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
