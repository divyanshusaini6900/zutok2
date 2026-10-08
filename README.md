# Zutok Softwares website

Marketing site for Zutok CRM and its products ZChat, ZShop and Zloya. It is live at [www.zutok.in](https://www.zutok.in).

Built with Next.js 16 (App Router), Tailwind CSS 4, Motion and Lenis. The site is exported as static files and hosted on GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
npm run deploy
```

This builds the static export into `out/`, then:

- replaces the `main` branch of [divyanshusaini6900/zutok2](https://github.com/divyanshusaini6900/zutok2) with the built site, keeping `CNAME` (www.zutok.in) and `.nojekyll`. GitHub Pages serves `main` from the branch root.
- updates the `source` branch with this project's code.

The new version is usually live within a few minutes.

## Where things live

- `src/app` holds the pages: home, `/pricing/`, `/about/`, `/products/[slug]/` (zchat, zshop, zloya, crm), `/solutions/` and `/solutions/[slug]/`, and `/industries/` and `/industries/[slug]/`.
- `src/components/sections` holds the home page sections, and `src/components/mock` holds the product mockups.
- `src/lib/products.ts` and `src/lib/pricing.ts` hold product copy, colours and prices (INR). `src/lib/industries.ts` holds the industry guides, and `src/lib/company.ts` holds the home and billing FAQs and the onboarding steps.
- Solution pages: `src/lib/solutions.ts` is the registry (page order, the hub copy, the checks) and still holds the older pages inline. Newer pages live one per file in `src/lib/solution-pages/<slug>.ts`. Their shared types and price helpers (`perMonth`, `priceLine`) are in `src/lib/solution-kit.ts`, which must never import `solutions.ts` or a page file.
- `src/lib/crosslinks.ts` holds the links between industry guides and solution pages, and the solution pages a product page lists even though they're filed under another product.
- `public/contact.html`, `services.html` and `case-studies.html` redirect links from the old site to the new one.

## SEO & AEO

Everything is generated from the data modules above at build time, so titles, prices, structured data and the AI files can't drift from the pages.

The sitemap currently lists 33 URLs: home, `/pricing/` and `/about/`, 4 product pages, the `/solutions/` hub with 18 solution pages (9 ZChat, 3 ZShop, 3 Zloya, 3 CRM), and the `/industries/` hub with 6 industry guides. The `/solutions/` hub groups its cards by product under one H2 each, in the key order of `data` in `solutions.ts`. `/solutions/whatsapp-automation/` is the WhatsApp hub: its `spokes` list links every WhatsApp page, and each of those links back to it through `related`.

- **Metadata:** every page calls `pageMetadata()` from `src/lib/seo.ts`, which sets the title, description, canonical URL (always with a trailing slash), Open Graph and Twitter tags.
- **Structured data (JSON-LD):** Organization and WebSite on every page (`src/app/layout.tsx`); WebPage, BreadcrumbList and FAQPage on content pages; SoftwareApplication with INR offers on product pages; an OfferCatalog on `/pricing/`; AboutPage on `/about/`. Markup only describes what is visible on the same page, and there are deliberately no ratings, reviews or `sameAs` links.
- **Crawling:** `src/app/robots.ts` → `/robots.txt` (search and AI crawlers allowed) and `src/app/sitemap.ts` → `/sitemap.xml`, which lists every page, including each solution and industry page.
- **AI files:** `/llms.txt` (short index) and `/llms-full.txt` (every feature, plan, price and FAQ), built by `src/lib/llms.ts` and served by `src/app/llms.txt/route.ts` and `src/app/llms-full.txt/route.ts`.
- **Social images:** 1200×630 cards at `/og/<card>.png` (`src/app/og/[card]/route.tsx`) and brand icons at `/brand/*.png` (`src/app/brand/[file]/route.tsx`).

### Search Console and Bing verification

Set these at build time (for example in `.env.local`) and redeploy. Each tag is only output when its variable is set.

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-token
NEXT_PUBLIC_BING_SITE_VERIFICATION=your-bing-token
```

Then submit `https://www.zutok.in/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

### IndexNow after a deploy

```bash
npm run indexnow             # or: node scripts/indexnow.mjs --dry-run
```

Run it once the deploy is live. It reads `out/sitemap.xml` and tells IndexNow engines (Bing, Yandex, Seznam; Bing also feeds ChatGPT search and Copilot) which URLs to recrawl. The key file `public/974d7fc0f4093e3f3e7196913bee410a.txt` must stay deployed; the key is also set in `scripts/indexnow.mjs`.

### Adding a solution page

1. Add the slug to `SolutionSlug` in `src/lib/solution-kit.ts`.
2. Create `src/lib/solution-pages/<slug>.ts` exporting `export const page: SolutionEntry = { ... }`. Import from the kit only: `import { perMonth, priceLine, type SolutionEntry } from "@/lib/solution-kit";`. Copy the shape of an existing page file. `relatedProduct` decides which hub group and product page it appears under, and the first `plan.includes` item's `from` is the plan the page starts on.
3. Register it in `src/lib/solutions.ts`: import the file, then add `"<slug>": <name>,` to `data` at the place it should appear. The key order of `data` is the order on the hub, on the product page and in the sitemap.
4. Link it in: list it in the `related` of at least one other page (and give the new page up to 6 `related` slugs of its own), and add it to `spokes` on `whatsapp-automation` if it is a WhatsApp page. If an industry guide already describes the use case, add the pair to `industrySolutions` in `src/lib/crosslinks.ts`. Add it to the footer's Solutions column (`src/components/Footer.tsx`) only if it is a head-term page.
5. Write only what the product data supports, take prices from `pricing.ts` through the helpers rather than as typed numbers, and give each page its own search intent rather than reusing another page's copy with a different noun. Keep the title at 57 characters or fewer (the layout adds " | Zutok"), the meta description at 120–160 characters and the `answer` at 40–70 words.
6. The page, its metadata and JSON-LD, the sitemap entry, the hub card, the product page's use-case list and both `llms` files pick it up on the next build. The checks at the end of `solutions.ts` fail the build on an unknown plan name, an `h1Accent` that isn't the end of `h1`, or a bad `related` or `spokes` slug. Check it with `npm run dev`, then run `npm run deploy` and `npm run indexnow`.

### Adding an industry guide

1. Add an entry to `src/lib/industries.ts` (and its slug to `IndustrySlug`, `industries` and `industryList`), writing only what the product data supports.
2. Add its solution pages to `industrySolutions` in `src/lib/crosslinks.ts`, only where the guide itself describes the use case, so the guide and the solution link to each other.
