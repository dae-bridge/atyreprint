import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const PromoBanner = () => {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Banner 1 — Embroidery */}
          <ScrollReveal variant="fade-right">
            <div className="relative rounded-2xl overflow-hidden min-h-[280px]">
              <Image
                src="/images/services/embroidery.jpg"
                alt="Custom embroidery services"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-primary/80" />
              <div className="relative z-10 p-8 md:p-10 flex flex-col justify-center h-full">
                <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">
                  Custom Embroidery
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-3">
                  Add Your Logo <br /> to Any Fabric
                </h3>
                <p className="text-white/70 text-sm mb-5 max-w-sm">
                  Perfect for workwear, uniforms, team apparel &amp;
                  personalised gifts.
                </p>
                <div>
                  <Button
                    href="/services/embroidery"
                    variant="secondary"
                    size="sm"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Banner 2 — Bulk Orders */}
          <ScrollReveal variant="fade-left" delay={150}>
            <div className="relative rounded-2xl overflow-hidden min-h-[280px]">
              <Image
                src="/images/banners/promo-1.jpg"
                alt="Bulk order discounts"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-primary-dark/80" />
              <div className="relative z-10 p-8 md:p-10 flex flex-col justify-center h-full">
                <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">
                  Bulk Orders
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-3">
                  Volume Discounts <br /> Available
                </h3>
                <p className="text-white/70 text-sm mb-5 max-w-sm">
                  Get special pricing for corporate orders, events, and team
                  kits. Contact us for a quote.
                </p>
                <div>
                  <Button href="/contact" variant="secondary" size="sm">
                    Get a Quote
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};
