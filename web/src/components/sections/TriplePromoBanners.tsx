import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const promos = [
  {
    id: "promo-1",
    badge: null,
    overline: "UP TO 25% OFF",
    title: "Swimming Bathtub Pool Kids Toys",
    image: "/images/products/trending/pink-tent.jpg", // Placeholder
    alt: "Swimming Bathtub Pool Kids Toys",
    bgColor: "bg-[#edf4ec]", // Light green
    linkText: "SHOP NOW",
    href: "/shop/toys/bath",
    buttonVariant: "link", // Just text with underline
  },
  {
    id: "promo-2",
    badge: "NEW & IMPROVED",
    overline: "UP TO 30% OFF",
    title: "Super Muesli Nuts And Cookies",
    image: "/images/products/trending/puppy-toy.jpg", // Placeholder
    alt: "Super Muesli Nuts And Cookies",
    bgColor: "bg-[#e5e1f1]", // Light purple
    linkText: "SHOP NOW",
    href: "/shop/food/snacks",
    buttonVariant: "solid", // Filled pink button
  },
  {
    id: "promo-3",
    badge: null,
    overline: "UP TO 20% OFF",
    title: "Cute And Soft Orange Teddy Bear",
    image: "/images/products/trending/backpack.jpg", // Placeholder
    alt: "Cute And Soft Orange Teddy Bear",
    bgColor: "bg-[#f2ece2]", // Beige
    linkText: "SHOP NOW",
    href: "/shop/toys/soft-toys",
    buttonVariant: "link",
  },
];

export const TriplePromoBanners = () => {
  return (
    <section className="pb-20 md:pb-28 pt-2 bg-[#f8f9fa]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`relative rounded-xl overflow-hidden p-6 sm:p-8 flex items-center min-h-[260px] md:min-h-[300px] ${promo.bgColor} group`}
            >
              {/* Optional Top-Left Badge */}
              {promo.badge && (
                <div className="absolute top-4 left-4 z-20 bg-foreground text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                  {promo.badge}
                </div>
              )}

              {/* Left Side: Image */}
              <div className="relative w-[45%] h-full min-h-[200px] md:min-h-[240px] mr-4 flex-shrink-0 z-10 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={promo.image}
                  alt={promo.alt}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Right Side: Content */}
              <div className="flex flex-col justify-center z-10">
                <p className="font-jost text-xs font-bold tracking-widest text-foreground uppercase mb-2">
                  {promo.overline}
                </p>
                <h3 className="font-jost text-lg sm:text-xl font-bold text-foreground leading-tight mb-5">
                  {promo.title}
                </h3>
                <div>
                  {promo.buttonVariant === "solid" ? (
                    <Link
                      href={promo.href}
                      className="inline-block px-5 py-2.5 bg-[#f04c7c] text-white text-[11px] font-bold uppercase tracking-wider rounded-md hover:bg-[#d83866] transition-colors shadow-sm"
                    >
                      {promo.linkText}
                    </Link>
                  ) : (
                    <Link
                      href={promo.href}
                      className="inline-block text-[#f04c7c] text-[12px] font-bold uppercase tracking-wider hover:text-[#d83866] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[1px] after:bg-[#f04c7c] after:origin-left hover:after:scale-x-110 after:transition-transform"
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
