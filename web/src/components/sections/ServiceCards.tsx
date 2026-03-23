import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Scissors, Printer, Palette, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Scissors,
  Printer,
  Palette,
};

export const ServiceCards = () => {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          overline="What We Do"
          title="Our Services"
          description="From concept to creation — we handle it all with care"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {siteConfig.services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.title}
                className="group bg-surface rounded-xl p-8 text-center hover:bg-primary transition-colors duration-300"
              >
                <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                  {Icon ? (
                    <Icon
                      size={32}
                      className="text-white group-hover:text-primary transition-colors duration-300"
                    />
                  ) : (
                    <span className="text-white text-3xl font-bold group-hover:text-primary transition-colors duration-300">
                      {service.title[0]}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-text-secondary group-hover:text-white/80 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
