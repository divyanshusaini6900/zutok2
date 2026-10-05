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
- `src/lib/products.ts` and `src/lib/pricing.ts` hold product copy, colours and prices (INR). `src/lib/solutions.ts` and `src/lib/industries.ts` hold the solution and industry pages, and `src/lib/company.ts` holds the home and billing FAQs and the onboarding steps.
- `public/contact.html`, `services.html` and `case-studies.html` redirect links from the old site to the new one.

## SEO & AEO

Everything is generated from the data modules above at build time, so titles, prices, structured data and the AI files can't drift from the pages.

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

### Adding a solution or industry page

1. Add an entry to `src/lib/solutions.ts` (and its slug to `SolutionSlug`) or to `src/lib/industries.ts` (and `IndustrySlug`, `industries` and `industryList`). Write only what the product data supports, and take prices from `pricing.ts`, never as typed numbers.
2. If it fits an industry guide, add the pair to `src/lib/crosslinks.ts` so the guide and the solution link to each other.
3. That's all: the page, its metadata and JSON-LD, the sitemap entry, the hub card, the product page's "Popular use cases" list and both `llms` files pick it up on the next build. Check it with `npm run dev`, then run `npm run deploy` and `npm run indexnow`.
