import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { TrustStat } from "@/types";

interface TrustBannerProps {
  trustStats?: TrustStat[];
}

export const TrustBanner = ({ trustStats }: TrustBannerProps) => {
  const stats =
    trustStats && trustStats.length > 0
      ? trustStats
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((s) => ({ value: s.value, label: s.label }))
      : siteConfig.trustStats;

  return (
    <section className="py-10 md:py-16 bg-primary">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center text-white">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              variant="zoom-in"
              delay={index * 120}
            >
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">
                  {stat.value}
                </p>
                <p className="text-white/80 mt-1 text-xs md:text-sm">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
