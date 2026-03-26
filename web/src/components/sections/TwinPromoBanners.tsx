import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const banners = [
  {
    overline: "UP TO 30% OFF",
    title: "Rainbow Stacker",
    titleLine2: "Wooden Ring",
    image: "/images/promo/kids-rainbow.png",
    alt: "Rainbow Stacker Wooden Ring",
    bgColor: "bg-[#f3efea]",
    href: "/shop/toys/wooden-toys",
  },
  {
    overline: "UP TO 25% OFF",
    title: "Instax Mini Instant",
    titleLine2: "Toys Camera",
    image: "/images/categories/clothes.png", // High-quality placeholder
    alt: "Instax Mini Instant Toys Camera",
    bgColor: "bg-[#e6f0e9]",
    href: "/shop/toys/cameras",
  },
];

export const TwinPromoBanners = () => {
  return (
    <section className="pt-4 md:pt-5 pb-0">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {banners.map((banner, i) => (
            <div
              key={i}
              className={`relative rounded-none overflow-hidden min-h-[280px] md:min-h-[320px] ${banner.bgColor} group`}
            >
              <div className="flex items-center h-full">
                {/* Image side */}
                <div className="relative w-1/2 h-full min-h-[280px] md:min-h-[320px]">
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority={i === 0}
                  />
                </div>

                {/* Content side */}
                <div className="w-1/2 p-6 md:p-10 flex flex-col justify-center">
                  <p className="text-foreground/60 font-medium tracking-widest text-xs mb-3 uppercase">
                    {banner.overline}
                  </p>
                  <h3 className="text-2xl md:text-3xl lg:text-3.5xl font-bold text-foreground leading-tight mb-6 md:mb-8 font-sans">
                    {banner.title} <br /> {banner.titleLine2}
                  </h3>
                  <div>
                    <Link
                      href={banner.href}
                      className="inline-flex items-center justify-center px-8 py-3 bg-accent text-primary-dark font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-md active:scale-95"
                    >
                      Shop Now
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
