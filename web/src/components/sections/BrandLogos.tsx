import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const brands = [
  "Gildan",
  "Fruit of the Loom",
  "AWDis",
  "Russell",
  "Bella+Canvas",
  "Stanley/Stella",
];

export const BrandLogos = () => {
  return (
    <section className="py-12 md:py-16 border-y border-border bg-surface">
      <Container>
        <ScrollReveal variant="fade-up">
          <p className="text-center text-text-muted text-sm font-medium uppercase tracking-wider mb-8">
            Trusted Brands We Work With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-text-secondary/60 font-bold text-lg md:text-xl tracking-wide hover:text-primary transition-colors select-none"
              >
                {brand}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
