import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const PromoBanner = () => {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Banner 1 — Embroidery */}
          <div className="relative rounded-2xl overflow-hidden bg-primary p-8 md:p-10 flex flex-col justify-center min-h-[280px]">
            <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">
              Custom Embroidery
            </p>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-3">
              Add Your Logo <br /> to Any Fabric
            </h3>
            <p className="text-white/70 text-sm mb-5 max-w-sm">
              Perfect for workwear, uniforms, team apparel &amp; personalised
              gifts.
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

          {/* Banner 2 — Bulk Orders */}
          <div className="relative rounded-2xl overflow-hidden bg-primary-dark p-8 md:p-10 flex flex-col justify-center min-h-[280px]">
            <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">
              Bulk Orders
            </p>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-3">
              Volume Discounts <br /> Available
            </h3>
            <p className="text-white/70 text-sm mb-5 max-w-sm">
              Get special pricing for corporate orders, events, and team kits.
              Contact us for a quote.
            </p>
            <div>
              <Button href="/contact" variant="secondary" size="sm">
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
