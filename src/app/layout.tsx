import type { Metadata, Viewport } from "next";
import { Anton, Instrument_Serif, Poppins } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";
import { cx } from "@/lib/cx";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Zutok Softwares: CRM, WhatsApp AI inbox, store automation & loyalty",
    template: "%s | Zutok Softwares",
  },
  description:
    "Zutok is an all-in-one CRM for Indian businesses. ZChat unifies WhatsApp, Instagram, Messenger and Telegram with an AI sales agent, ZShop automates orders, COD and carts, and Zloya runs loyalty and retention.",
  openGraph: {
    title: "Zutok Softwares: One CRM for every conversation, order and customer",
    description: "ZChat, ZShop and Zloya on one CRM. Built for Indian businesses.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={cx(`${poppins.variable} ${instrumentSerif.variable} ${anton.variable} antialiased`)}>
      <body className="min-h-screen">
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
