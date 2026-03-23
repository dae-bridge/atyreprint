import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const CTASection = () => {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let&apos;s Create Something Special
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Got an idea? Let&apos;s make it real. Whether it&apos;s for business
            branding, personal gifts, or bulk orders — we&apos;re ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
            <Button href="/personalise-it" variant="outline" size="lg">
              Start Designing
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
