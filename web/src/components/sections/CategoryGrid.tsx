import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const categories = [
  { label: "T-Shirts", href: "/shop/clothing/t-shirts", emoji: "👕" },
  { label: "Hoodies", href: "/shop/clothing/hoodies", emoji: "🧥" },
  { label: "Sweatshirts", href: "/shop/clothing/sweatshirts", emoji: "👔" },
  { label: "Tote Bags", href: "/shop/accessories/tote-bags", emoji: "👜" },
  { label: "Aprons", href: "/shop/clothing/aprons", emoji: "👨‍🍳" },
  { label: "Mugs", href: "/shop/drinkware/mugs", emoji: "☕" },
  { label: "Glass Cans", href: "/shop/drinkware/glass-cans", emoji: "🥛" },
  { label: "Tumblers", href: "/shop/drinkware/tumblers", emoji: "🥤" },
  { label: "Caps", href: "/shop/accessories/caps", emoji: "🧢" },
  { label: "Pillowcases", href: "/shop/home-living/pillowcases", emoji: "🛏️" },
];

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
          {categories.map((cat, index) => (
            <ScrollReveal key={cat.label} variant="fade-up" delay={index * 80}>
              <Link
                href={cat.href}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center border border-border-light hover:border-primary/30"
              >
                <div className="text-5xl mb-4">{cat.emoji}</div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {cat.label}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
