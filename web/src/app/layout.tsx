import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atyreprint.com"),
  title: {
    default: "AtyrePrint | Custom Clothing & Gifts that Speak for You",
    template: "%s | AtyrePrint",
  },
  description:
    "Premium print-on-demand and embroidery services. Custom t-shirts, hoodies, mugs, tote bags, caps & more. Serving the UK, Africa & Europe with 5+ years of quality craftsmanship.",
  keywords: [
    "custom clothing",
    "print on demand",
    "embroidery services",
    "custom t-shirts",
    "personalised gifts",
    "custom hoodies",
    "branded merchandise",
    "custom mugs",
    "tote bags",
    "corporate branding",
    "custom caps",
    "embroidered clothing",
    "custom sweatshirts",
    "personalised clothing UK",
    "custom printed gifts",
    "bulk custom orders",
    "custom aprons",
    "glass cans printing",
    "tumbler printing",
    "pillowcase printing",
    "London embroidery",
    "UK print services",
    "AtyrePrint",
  ],
  authors: [{ name: "AtyrePrint" }],
  creator: "AtyrePrint",
  publisher: "AtyrePrint",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://atyreprint.com",
    siteName: "AtyrePrint",
    title: "AtyrePrint | Custom Clothing & Gifts that Speak for You",
    description:
      "Premium print-on-demand and embroidery services. Custom t-shirts, hoodies, mugs, tote bags & more. Serving the UK, Africa & Europe.",
    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "AtyrePrint - Custom Clothing & Gifts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AtyrePrint | Custom Clothing & Gifts that Speak for You",
    description:
      "Premium print-on-demand and embroidery services. Custom t-shirts, hoodies, mugs, tote bags & more.",
    images: ["/images/og/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
