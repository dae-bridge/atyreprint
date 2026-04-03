import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const banners = [
  {
    overline: "CUSTOM CLOTHING",
    title: "Personalised",
    titleLine2: "T-Shirts & Hoodies",
    image: "/images/products/embroidered-hoodie/main.jpg",
    alt: "Custom printed t-shirts and hoodies",
    bgColor: "bg-[#f3efea]",
    href: "/shop/custom-clothing",
    cta: "Shop Clothing",
  },
  {
    overline: "CORPORATE & GIFTS",
    title: "Branded Mugs",
    titleLine2: "& Drinkware",
    image: "/images/products/personalised-mug/main.jpg",
    alt: "Custom printed mugs and drinkware",
    bgColor: "bg-[#e6f0e9]",
    href: "/shop/drinkware-gifts",
    cta: "Shop Drinkware",
  },
];

export const TwinPromoBanners = () => {
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
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 40vw, (max-width: 768px) 50vw, 25vw"
                    priority={i === 0}
                  />
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
