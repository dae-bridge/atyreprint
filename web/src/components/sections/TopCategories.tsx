"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    title: "T-Shirts & Polos",
    count: "Custom Print & Embroidery",
    image: "/images/categories/tshirts.png",
    href: "/shop/clothing/t-shirts",
  },
  {
    title: "Hoodies & Sweatshirts",
    count: "Personalised Designs",
    image: "/images/categories/hoodies.png",
    href: "/shop/clothing/hoodies",
  },
  {
    title: "Mugs & Drinkware",
    count: "Ceramic, Glass & Tumblers",
    image: "/images/categories/mugs.png",
    href: "/shop/drinkware",
  },
  {
    title: "Caps & Headwear",
    count: "Embroidered & Printed",
    image: "/images/categories/caps.png",
    href: "/shop/accessories/caps",
  },
  {
    title: "Tote Bags",
    count: "Canvas & Cotton",
    image: "/images/categories/tote-bags.png",
    href: "/shop/accessories/bags",
  },
  {
    title: "Workwear",
    count: "Hi-Vis, Aprons & More",
    image: "/images/categories/workwear.png",
    href: "/shop/clothing/workwear",
  },
];

export const TopCategories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="pt-8 md:pt-12 pb-4 md:pb-6 bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Intro Section */}
          <div className="lg:max-w-[320px] w-full pt-4 h-full flex flex-col justify-between">
            <div className="mb-6 lg:mb-10">
              <span className="inline-block bg-surface text-accent text-[10px] font-bold tracking-[0.2em] px-3 py-1 uppercase rounded-sm mb-4 lg:mb-6">
                CATEGORIES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4 lg:mb-8 font-sans">
                Browse Our Product Range
              </h2>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed max-w-sm">
                Explore our curated selection of customisable products — from
                premium clothing to branded giftware.
              </p>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center gap-3 mb-4 lg:mb-0">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-accent text-primary-dark hover:bg-primary hover:text-white transition-all rounded-full shadow-lg active:scale-95"
                aria-label="Previous categories"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-accent text-primary-dark hover:bg-primary hover:text-white transition-all rounded-full shadow-lg active:scale-95"
                aria-label="Next categories"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Categories Carousel */}
          <div
            ref={scrollRef}
            className="flex-1 w-full overflow-x-auto pb-6 -mb-6 scrollbar-hide snap-x no-scrollbar"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <div className="flex flex-nowrap gap-4 md:gap-6">
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  href={cat.href}
                  className="group block bg-white border border-border/40 transition-all hover:shadow-2xl hover:-translate-y-2 rounded-none w-[220px] sm:w-[260px] md:w-[calc((100%-48px)/2.5)] lg:w-[calc((100%-72px)/4.5)] flex-shrink-0 snap-start"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-[#f9f9f9]">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-contain p-1 scale-[1.1] group-hover:scale-[1.2] transition-transform duration-500"
                      sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, 25vw"
                    />
                  </div>
                  <div className="p-3 sm:p-4 pt-4 sm:pt-5 overflow-hidden">
                    <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-accent transition-colors whitespace-nowrap truncate">
                      {cat.title}
                    </h3>
                    <p className="text-foreground/40 text-xs sm:text-sm mt-1">
                      {cat.count}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
