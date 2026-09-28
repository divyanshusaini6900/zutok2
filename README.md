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

- `src/app` holds the pages: home, `/pricing` and `/products/[slug]` (zchat, zshop, zloya).
- `src/components/sections` holds the home page sections, and `src/components/mock` holds the product mockups.
- `src/lib/products.ts` and `src/lib/pricing.ts` hold product copy, colours and prices (INR).
- `public/contact.html`, `services.html` and `case-studies.html` redirect links from the old site to the new one.
