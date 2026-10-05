import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  JsonLd,
  OG_SIZE,
  SITE_URL,
  absoluteUrl,
  ogImage,
  organizationLd,
  websiteLd,
} from "@/lib/seo";
import { fontVariables } from "./fonts";
import "./globals.css";
import { cx } from "@/lib/cx";

// Search engine ownership tokens, read at build time. Leave unset until Search Console / Bing Webmaster give you one.
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

const siteImage = [{ url: absoluteUrl(ogImage("site")), ...OG_SIZE, alt: HOME_TITLE, type: "image/png" }];

// Defaults for every page. Pages set their own canonical URL, og:url and social card through `pageMetadata`;
// there is deliberately no canonical here, because a page that forgot one would inherit the home page's.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    // The short brand keeps long page titles near 60 characters; og:site_name and the JSON-LD keep the full name.
    template: `%s | ${site.name}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: site.name,
  keywords: [
    "Zutok",
    "Zutok Softwares",
    "Zutok CRM",
    "CRM for Indian businesses",
    "WhatsApp CRM",
    "ZChat",
    "ZShop",
    "Zloya",
  ],
  authors: [{ name: site.company, url: absoluteUrl("/") }],
  creator: site.company,
  publisher: site.company,
  category: "business software",
  openGraph: {
    type: "website",
    siteName: site.company,
    locale: "en_IN",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: siteImage,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: siteImage,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
  formatDetection: { email: false, address: false, telephone: false },
  // Setting icons here replaces the automatic icon.svg link, so it is listed again. The PNGs come from app/brand.
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={cx(`${fontVariables} antialiased`)}>
      <body className="min-h-screen">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <Providers>
          <SmoothScroll />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
