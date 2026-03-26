import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Shop All Products | AtyrePrint",
  description:
    "Browse our full range of custom clothing, accessories, drinkware and home products. T-shirts, hoodies, mugs, tote bags, caps and more — all personalised for you.",
};

const categories = [
  {
    title: "Clothing",
    href: "/shop/clothing",
    items: [
      { label: "T-Shirts", href: "/shop/clothing/t-shirts", emoji: "👕" },
      { label: "Hoodies", href: "/shop/clothing/hoodies", emoji: "🧥" },
      {
        label: "Sweatshirts",
        href: "/shop/clothing/sweatshirts",
        emoji: "👔",
      },
      { label: "Aprons", href: "/shop/clothing/aprons", emoji: "👨‍🍳" },
    ],
  },
  {
    title: "Accessories",
    href: "/shop/accessories",
    items: [
      { label: "Caps", href: "/shop/accessories/caps", emoji: "🧢" },
      { label: "Tote Bags", href: "/shop/accessories/tote-bags", emoji: "👜" },
    ],
  },
  {
    title: "Drinkware",
    href: "/shop/drinkware",
    items: [
      { label: "Mugs", href: "/shop/drinkware/mugs", emoji: "☕" },
      {
        label: "Glass Cans",
        href: "/shop/drinkware/glass-cans",
        emoji: "🥛",
      },
      { label: "Tumblers", href: "/shop/drinkware/tumblers", emoji: "🥤" },
    ],
  },
  {
    title: "Home & Living",
    href: "/shop/home-living",
    items: [
      {
        label: "Pillowcases",
        href: "/shop/home-living/pillowcases",
        emoji: "🛏️",
      },
    ],
  },
];

export default function ShopPage() {
  return (
    <>
      <PageHeader
        title="Shop All Products"
        subtitle={`Explore our full range of ${siteConfig.products.length}+ customisable products. Print, embroider, personalise — make it yours.`}
        badge="Our Collection"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories grid */}
          {categories.map((category) => (
            <div key={category.title} className="mb-14 last:mb-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-jost text-2xl font-bold text-foreground">
                  {category.title}
                </h2>
                <Link
                  href={category.href}
                  className="text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group bg-white rounded-xl border border-border-light p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all"
                  >
                    <div className="text-5xl mb-4">{item.emoji}</div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="mt-16 bg-surface rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-jost text-2xl font-bold text-foreground mb-3">
              Can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="text-text-secondary mb-6 max-w-lg mx-auto">
              We can customise almost anything. Get in touch and let us know
              what you need — we&apos;ll make it happen.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/personalise-it"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Design Your Own
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
