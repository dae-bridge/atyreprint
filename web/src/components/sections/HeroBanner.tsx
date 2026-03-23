import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const HeroBanner = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-primary overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />

      <Container className="relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div className="text-white">
            <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4">
              Premium Print-on-Demand &amp; Embroidery
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Custom Clothing &amp; Gifts that{" "}
              <span className="text-secondary">Speak for You</span>
            </h1>
            <p className="text-lg text-white/80 max-w-lg mb-8 leading-relaxed">
              5+ years crafting premium custom products — t-shirts, hoodies,
              mugs, tote bags &amp; more. Serving the UK, Africa &amp; Europe
              with quality you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/shop" variant="secondary" size="lg">
                Shop Now
              </Button>
              <Button
                href="/personalise-it"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Personalise It
              </Button>
            </div>
          </div>

          {/* Right — Hero image placeholder */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div className="text-center text-white/60">
                <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-4xl">👕</span>
                </div>
                <p className="text-sm">Hero Image</p>
                <p className="text-xs text-white/40 mt-1">900 &times; 900px</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
