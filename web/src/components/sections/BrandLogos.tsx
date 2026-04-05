import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { BrandLogo } from "@/types";

const defaultBrands = [
  "Gildan",
  "Fruit of the Loom",
  "AWDis",
  "Russell",
  "Bella+Canvas",
  "Stanley/Stella",
];

interface BrandLogosProps {
  brandLogos?: BrandLogo[];
}

export const BrandLogos = ({ brandLogos }: BrandLogosProps) => {
  const activeBrands = brandLogos
    ?.filter((b) => b.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const hasCMSBrands = activeBrands && activeBrands.length > 0;

  return (
    <section className="py-10 md:py-16 border-y border-border bg-surface">
      <Container>
        <ScrollReveal variant="fade-up">
          <p className="text-center text-text-muted text-xs md:text-sm font-medium uppercase tracking-wider mb-6 md:mb-8">
            Trusted Brands We Work With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-14">
            {hasCMSBrands
              ? activeBrands.map((brand) => (
                  <a
                    key={brand.id}
                    href={brand.url || "#"}
                    target={brand.url ? "_blank" : undefined}
                    rel={brand.url ? "noopener noreferrer" : undefined}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {brand.logo?.url ? (
                      <div className="relative w-24 h-10 md:w-32 md:h-12">
                        <Image
                          src={brand.logo.url}
                          alt={brand.name}
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </div>
                    ) : (
                      <span className="text-text-secondary/60 font-bold text-base md:text-xl tracking-wide hover:text-primary transition-colors select-none">
                        {brand.name}
                      </span>
                    )}
                  </a>
                ))
              : defaultBrands.map((brand) => (
                  <span
                    key={brand}
                    className="text-text-secondary/60 font-bold text-base md:text-xl tracking-wide hover:text-primary transition-colors select-none"
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
