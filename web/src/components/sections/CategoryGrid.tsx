import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const CategoryGrid = () => {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <Container>
        <SectionHeading
          overline="Categories"
          title="Browse Top Categories"
          description="Find the perfect canvas for your custom designs"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          {siteConfig.products.map((product) => (
            <Link
              key={product}
              href={`/shop?category=${encodeURIComponent(product.toLowerCase())}`}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center border border-border-light hover:border-primary/30"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-primary text-2xl font-bold">
                  {product[0]}
                </span>
              </div>
              <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                {product}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
