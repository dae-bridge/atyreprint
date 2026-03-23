import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

/* Placeholder products until Firestore integration */
const placeholderProducts = [
  {
    id: "1",
    name: "Custom Printed T-Shirt",
    price: "£19.99",
    category: "T-Shirts",
    badge: "New",
  },
  {
    id: "2",
    name: "Embroidered Hoodie",
    price: "£39.99",
    category: "Hoodies",
    badge: "Popular",
  },
  {
    id: "3",
    name: "Personalised Ceramic Mug",
    price: "£12.99",
    category: "Mugs",
    badge: null,
  },
  {
    id: "4",
    name: "Custom Tote Bag",
    price: "£14.99",
    category: "Tote Bags",
    badge: null,
  },
  {
    id: "5",
    name: "Branded Snapback Cap",
    price: "£16.99",
    category: "Caps",
    badge: "New",
  },
  {
    id: "6",
    name: "Custom Glass Can",
    price: "£15.99",
    category: "Glass Cans",
    badge: null,
  },
  {
    id: "7",
    name: "Embroidered Sweatshirt",
    price: "£34.99",
    category: "Sweatshirts",
    badge: "Popular",
  },
  {
    id: "8",
    name: "Personalised Pillowcase",
    price: "£18.99",
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
          {placeholderProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden border border-border-light hover:shadow-lg transition-all"
            >
              {/* Image placeholder */}
              <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                <div className="text-center text-text-muted">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-2xl">{product.category[0]}</span>
                  </div>
                  <p className="text-xs">Product Image</p>
                </div>
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
            </div>
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
