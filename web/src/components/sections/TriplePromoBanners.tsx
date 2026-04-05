import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { PromoBanner } from "@/types";

const bgColors = ["bg-[#edf4ec]", "bg-[#e5e1f1]", "bg-[#f2ece2]"];

interface TriplePromoBannersProps {
  promoBanners?: PromoBanner[];
}

export const TriplePromoBanners = ({
  promoBanners,
}: TriplePromoBannersProps) => {
  const cmsSlice = promoBanners?.filter((b) => b.active).slice(0, 3);

  if (!cmsSlice || cmsSlice.length < 3) return null;

  const promos = cmsSlice.map((b, i) => ({
    id: b.id,
    badge: i === 1 ? "BEST SELLER" : (null as string | null),
    overline: b.overline,
    title: b.title + (b.titleLine2 ? ` ${b.titleLine2}` : ""),
    image: b.image?.url || "",
    alt: b.image?.alt || b.title,
    bgColor: b.bgOverlay || bgColors[i % bgColors.length],
    linkText: b.cta?.label || "SHOP NOW",
    href: b.cta?.href || "/shop",
    buttonVariant: i === 1 ? "solid" : "link",
  }));
  return (
    <section className="pb-12 md:pb-28 pt-2 bg-[#f8f9fa]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`relative rounded-xl overflow-hidden p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center min-h-[200px] sm:min-h-[240px] md:min-h-[300px] ${promo.bgColor} group`}
            >
              {/* Optional Top-Left Badge */}
              {promo.badge && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-foreground text-white text-[8px] sm:text-[9px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                  {promo.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative w-full sm:w-[45%] h-[140px] sm:h-full sm:min-h-[200px] md:min-h-[240px] mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 z-10 transition-transform duration-500 group-hover:scale-105">
                {promo.image ? (
                  <Image
                    src={promo.image}
                    alt={promo.alt}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <PlaceholderImage type="service" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center z-10 text-center sm:text-left">
                <p className="font-jost text-[10px] sm:text-xs font-bold tracking-widest text-foreground uppercase mb-1 sm:mb-2">
                  {promo.overline}
                </p>
                <h3 className="font-jost text-base sm:text-lg md:text-xl font-bold text-foreground leading-tight mb-3 sm:mb-5">
                  {promo.title}
                </h3>
                <div>
                  {promo.buttonVariant === "solid" ? (
                    <Link
                      href={promo.href}
                      className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-accent text-primary-dark text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-md hover:bg-primary hover:text-white transition-colors shadow-sm"
                    >
                      {promo.linkText}
                    </Link>
                  ) : (
                    <Link
                      href={promo.href}
                      className="inline-block text-accent text-[11px] sm:text-[12px] font-bold uppercase tracking-wider hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[1px] after:bg-accent after:origin-left hover:after:scale-x-110 after:transition-transform"
                    >
                      {promo.linkText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
