import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Scissors, Printer, Palette, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Scissors,
  Printer,
  Palette,
};

const serviceImages: Record<string, string> = {
  Embroidery: "/images/services/embroidery.jpg",
  Printing: "/images/services/printing.jpg",
  Design: "/images/services/design.jpg",
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
          {siteConfig.services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <ScrollReveal
                key={service.title}
                variant="fade-up"
                delay={index * 150}
              >
                <div className="group bg-surface rounded-xl p-8 text-center hover:bg-primary transition-colors duration-300">
                  <div className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden relative">
                    <Image
                      src={
                        serviceImages[service.title] ||
                        "/images/services/embroidery.jpg"
                      }
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary group-hover:text-white/80 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
