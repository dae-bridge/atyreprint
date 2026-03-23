import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* Placeholder products until Firestore integration */
const placeholderProducts = [
  {
    id: "1",
    slug: "custom-printed-tshirt",
    name: "Custom Printed T-Shirt",
    price: "£19.99",
    image: "/images/products/custom-printed-tshirt/main.jpg",
    category: "T-Shirts",
    badge: "New",
  },
  {
    id: "2",
    slug: "embroidered-hoodie",
    name: "Embroidered Hoodie",
    price: "£39.99",
    image: "/images/products/embroidered-hoodie/main.jpg",
    category: "Hoodies",
    badge: "Popular",
  },
  {
    id: "3",
    slug: "personalised-mug",
    name: "Personalised Ceramic Mug",
    price: "£12.99",
    image: "/images/products/personalised-mug/main.jpg",
    category: "Mugs",
    badge: null,
  },
  {
    id: "4",
    slug: "custom-tote-bag",
    name: "Custom Tote Bag",
    price: "£14.99",
    image: "/images/products/custom-tote-bag/main.jpg",
    category: "Tote Bags",
    badge: null,
  },
  {
    id: "5",
    slug: "branded-snapback-cap",
    name: "Branded Snapback Cap",
    price: "£16.99",
    image: "/images/products/branded-snapback-cap/main.jpg",
    category: "Caps",
    badge: "New",
  },
  {
    id: "6",
    slug: "custom-glass-can",
    name: "Custom Glass Can",
    price: "£15.99",
    image: "/images/products/custom-glass-can/main.jpg",
    category: "Glass Cans",
    badge: null,
  },
  {
    id: "7",
    slug: "embroidered-sweatshirt",
    name: "Embroidered Sweatshirt",
    price: "£34.99",
    image: "/images/products/embroidered-sweatshirt/main.jpg",
    category: "Sweatshirts",
    badge: "Popular",
  },
  {
    id: "8",
    slug: "personalised-pillowcase",
    name: "Personalised Pillowcase",
    price: "£18.99",
    image: "/images/products/personalised-pillowcase/main.jpg",
    category: "Pillowcases",
    badge: null,
  },
];

export const TrendingProducts = () => {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <Container>
        <SectionHeading
          overline="Trending Now"
          title="Popular Products"
          description="Discover our best-selling custom products loved by customers"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
          {placeholderProducts.map((product, index) => (
            <ScrollReveal key={product.id} variant="fade-up" delay={index * 80}>
              <Link
                href={`/shop/product/${product.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-border-light hover:shadow-lg transition-all"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-secondary text-primary-dark text-xs font-bold px-2.5 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-base font-bold text-primary">
                    {product.price}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button href="/shop" variant="primary">
            View All Products
          </Button>
        </div>
      </Container>
    </section>
  );
};
