import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { PromoBanner } from "@/types";

const bgColors = ["bg-[#f3efea]", "bg-[#e6f0e9]"];

interface TwinPromoBannersProps {
  promoBanners?: PromoBanner[];
}

export const TwinPromoBanners = ({ promoBanners }: TwinPromoBannersProps) => {
  const cmsSlice = promoBanners?.filter((b) => b.active).slice(0, 2);

  if (!cmsSlice || cmsSlice.length < 2) return null;

  const banners = cmsSlice.map((b, i) => ({
    overline: b.overline,
    title: b.title,
    titleLine2: b.titleLine2,
    image: b.image?.url || "",
    alt: b.image?.alt || b.title,
    bgColor: b.bgOverlay || bgColors[i % bgColors.length],
    href: b.cta?.href || "/shop",
    cta: b.cta?.label || "Shop Now",
  }));
  return (
    <section className="pt-4 md:pt-5 pb-0">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          {banners.map((banner, i) => (
            <div
              key={i}
              className={`relative rounded-none overflow-hidden min-h-[200px] sm:min-h-[260px] md:min-h-[320px] ${banner.bgColor} group`}
            >
              <div className="flex items-center h-full">
                {/* Image side */}
                <div className="relative w-2/5 sm:w-1/2 h-full min-h-[200px] sm:min-h-[260px] md:min-h-[320px]">
                  {banner.image ? (
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 40vw, (max-width: 768px) 50vw, 25vw"
                      priority={i === 0}
                    />
                  ) : (
                    <PlaceholderImage type="product" />
                  )}
                </div>

                {/* Content side */}
                <div className="w-3/5 sm:w-1/2 p-4 sm:p-6 md:p-10 flex flex-col justify-center">
                  <p className="text-foreground/60 font-medium tracking-widest text-[10px] sm:text-xs mb-2 sm:mb-3 uppercase">
                    {banner.overline}
                  </p>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-4 sm:mb-6 md:mb-8 font-sans">
                    {banner.title} <br /> {banner.titleLine2}
                  </h3>
                  <div>
                    <Link
                      href={banner.href}
                      className="inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-accent text-primary-dark font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-md active:scale-95"
                    >
                      {banner.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
