import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { PromoBanner as PromoBannerType } from "@/types";

interface PromoBannerProps {
  promoBanners?: PromoBannerType[];
}

export const PromoBanner = ({ promoBanners }: PromoBannerProps) => {
  const activeCMS = promoBanners
    ?.filter((b) => b.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (!activeCMS || activeCMS.length === 0) return null;

  const banners = activeCMS.map((b) => ({
    overline: b.overline,
    title: b.title,
    titleLine2: b.titleLine2,
    description: b.description,
    image: b.image?.url || "",
    alt: b.image?.alt || b.title,
    bg: b.bgOverlay || "bg-primary/80",
    href: b.cta.href,
    cta: b.cta.label,
  }));

  return (
    <section className="py-10 md:py-20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {banners.map((banner, i) => (
            <ScrollReveal
              key={banner.overline}
              variant="fade-up"
              delay={i * 120}
            >
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden min-h-[250px] md:min-h-[300px]">
                {banner.image ? (
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                  <PlaceholderImage type="service" />
                )}
                <div className={`absolute inset-0 ${banner.bg}`} />
                <div className="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col justify-center h-full">
                  <p className="text-secondary font-semibold text-xs md:text-sm uppercase tracking-wider mb-2">
                    {banner.overline}
                  </p>
                  <h3 className="font-jost text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
                    {banner.title} <br /> {banner.titleLine2}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm mb-4 md:mb-5 max-w-sm">
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
