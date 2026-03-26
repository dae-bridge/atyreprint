import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const banners = [
  {
    overline: "Custom Embroidery",
    title: "Add Your Logo",
    titleLine2: "to Any Fabric",
    description:
      "Perfect for workwear, uniforms, team apparel & personalised gifts.",
    image: "/images/services/embroidery.jpg",
    alt: "Custom embroidery services",
    bg: "bg-primary/80",
    href: "/services/embroidery",
    cta: "Learn More",
  },
  {
    overline: "Bulk Orders",
    title: "Volume Discounts",
    titleLine2: "Available",
    description:
      "Get special pricing for corporate orders, events, and team kits. Contact us for a quote.",
    image: "/images/banners/promo-1.jpg",
    alt: "Bulk order discounts",
    bg: "bg-primary-dark/80",
    href: "/contact",
    cta: "Get a Quote",
  },
  {
    overline: "Design Your Own",
    title: "Personalise It,",
    titleLine2: "Make It Yours",
    description:
      "Use our online design tool to create unique products with your own artwork and text.",
    image: "/images/services/design.jpg",
    alt: "Custom design tool",
    bg: "bg-primary/85",
    href: "/personalise-it",
    cta: "Start Designing",
  },
];

export const PromoBanner = () => {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid md:grid-cols-3 gap-6">
          {banners.map((banner, i) => (
            <ScrollReveal
              key={banner.overline}
              variant="fade-up"
              delay={i * 120}
            >
              <div className="relative rounded-2xl overflow-hidden min-h-[300px]">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={`absolute inset-0 ${banner.bg}`} />
                <div className="relative z-10 p-8 md:p-10 flex flex-col justify-center h-full">
                  <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">
                    {banner.overline}
                  </p>
                  <h3 className="font-jost text-2xl md:text-3xl font-bold text-white mb-3">
                    {banner.title} <br /> {banner.titleLine2}
                  </h3>
                  <p className="text-white/70 text-sm mb-5 max-w-sm">
                    {banner.description}
                  </p>
                  <div>
                    <Button href={banner.href} variant="secondary" size="sm">
                      {banner.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
