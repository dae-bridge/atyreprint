import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const TrustBanner = () => {
  return (
    <section className="py-16 bg-primary">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {siteConfig.trustStats.map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              variant="zoom-in"
              delay={index * 120}
            >
              <div>
                <p className="text-3xl md:text-4xl font-bold text-secondary">
                  {stat.value}
                </p>
                <p className="text-white/80 mt-1 text-sm">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
