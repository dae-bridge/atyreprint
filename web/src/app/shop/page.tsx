import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
      { label: "T-Shirts", href: "/shop/clothing/t-shirts", image: "/images/products/custom-printed-tshirt/main.jpg" },
      { label: "Hoodies", href: "/shop/clothing/hoodies", image: "/images/products/embroidered-hoodie/main.jpg" },
      { label: "Sweatshirts", href: "/shop/clothing/sweatshirts", image: "/images/products/embroidered-sweatshirt/main.jpg" },
      { label: "Aprons", href: "/shop/clothing/aprons", image: "/images/products/custom-apron/main.jpg" },
    ],
  },
  {
    title: "Accessories",
    href: "/shop/accessories",
    items: [
      { label: "Caps", href: "/shop/accessories/caps", image: "/images/products/branded-snapback-cap/main.jpg" },
      { label: "Tote Bags", href: "/shop/accessories/tote-bags", image: "/images/products/custom-tote-bag/main.jpg" },
    ],
  },
  {
    title: "Drinkware",
    href: "/shop/drinkware",
    items: [
      { label: "Mugs", href: "/shop/drinkware/mugs", image: "/images/products/personalised-mug/main.jpg" },
      { label: "Glass Cans", href: "/shop/drinkware/glass-cans", image: "/images/products/custom-glass-can/main.jpg" },
      { label: "Tumblers", href: "/shop/drinkware/tumblers", image: "/images/products/custom-tumbler/main.jpg" },
    ],
  },
  {
    title: "Home & Living",
    href: "/shop/home-living",
    items: [
      { label: "Pillowcases", href: "/shop/home-living/pillowcases", image: "/images/products/personalised-pillowcase/main.jpg" },
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

      <section className="py-10 md:py-16">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories grid */}
          {categories.map((category) => (
            <div key={category.title} className="mb-10 last:mb-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-jost text-xl font-bold text-foreground">
                  {category.title}
                </h2>
                <Link
                  href={category.href}
                  className="text-xs font-semibold text-primary hover:text-primary-light transition-colors uppercase tracking-wider"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group block"
                  >
                    <div className="relative aspect-square bg-[#f8f9fa] rounded-xl overflow-hidden border border-transparent group-hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] transition-all duration-300">
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out z-0"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-100 group-hover:from-black/70 transition-colors z-10" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-center z-20">
                        <p className="text-[14px] font-jost font-bold text-white uppercase tracking-widest drop-shadow-sm">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="mt-20 bg-[#f8f9fa] rounded-3xl p-10 md:p-16 text-center border border-border-light relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-jost text-3xl md:text-4xl font-bold text-foreground mb-4">
                Can&apos;t find what you&apos;re looking for?
              </h3>
              <p className="text-text-secondary mb-8 max-w-xl mx-auto text-lg">
                We can customise almost anything. Get in touch and let us know
                what you need — we&apos;ll make it happen.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/personalise-it"
                  className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold tracking-wide rounded hover:bg-primary-dark transition-colors font-jost text-[15px] uppercase"
                >
                  Design Your Own
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-foreground text-foreground font-bold tracking-wide rounded hover:bg-foreground hover:text-white transition-colors font-jost text-[15px] uppercase"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
