import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { AuthProvider } from "@/lib/auth";
import {
  getCategoryTree,
  getFeaturedProducts,
  getProductsByTag,
  getTopRatedProducts,
} from "@/lib/products";
import { getSiteSettings } from "@/lib/settings";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "AtyrePrint | Custom Clothing & Gifts that Speak for You",
    description:
      "Premium print-on-demand and embroidery services. Custom t-shirts, hoodies, mugs, tote bags & more.",
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
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch categories, settings, and nav product data server-side
  // Product queries may fail if Firestore indexes aren't created yet — gracefully fallback to []
  const [categoryTree, settings] = await Promise.all([
    getCategoryTree(),
    getSiteSettings(),
  ]);

  const [
    featuredProducts,
    bestSellingProducts,
    trendingProducts,
    popularProducts,
    topRatedProducts,
  ] = await Promise.all([
    getFeaturedProducts(5).catch(() => []),
    getProductsByTag("bestselling", 4).catch(() => []),
    getProductsByTag("trending", 4).catch(() => []),
    getProductsByTag("popular", 4).catch(() => []),
    getTopRatedProducts(6).catch(() => []),
  ]);
  const navCategories = categoryTree.map(({ parent, children }) => ({
    id: parent.id,
    name: parent.name,
    slug: parent.slug,
    children: children.map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
  }));

  return (
    <html lang="en" className={`${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Header
            navCategories={navCategories}
            settings={settings}
            featuredProducts={featuredProducts}
            bestSellingProducts={bestSellingProducts}
            trendingProducts={trendingProducts}
            popularProducts={popularProducts}
            topRatedProducts={topRatedProducts}
          />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
          <ScrollToTop />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
