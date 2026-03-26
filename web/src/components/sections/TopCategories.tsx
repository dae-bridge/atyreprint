"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    title: "Kids Toys",
    count: "4 Products",
    image: "/images/categories/toy-shark.png",
    href: "/shop/toys",
  },
  {
    title: "Baby Kids Clothes",
    count: "13 Products",
    image: "/images/categories/clothes-onesie.png",
    href: "/shop/clothing",
  },
  {
    title: "Baby Kids Shoes",
    count: "12 Products",
    image: "/images/categories/shoes-bunny.png",
    href: "/shop/shoes",
  },
  {
    title: "Baby Lotions",
    count: "8 Products",
    image: "/images/categories/lotion-sebamed.png",
    href: "/shop/care",
  },
  {
    title: "Newborn Essentials",
    count: "15 Products",
    image: "/images/categories/food-mellin.png",
    href: "/shop/newborn",
  },
];

export const TopCategories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="pt-8 md:pt-12 pb-4 md:pb-6 bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Intro Section */}
          <div className="lg:max-w-[320px] w-full pt-4 h-full flex flex-col justify-between">
            <div className="mb-10">
              <span className="inline-block bg-surface text-accent text-[10px] font-bold tracking-[0.2em] px-3 py-1 uppercase rounded-sm mb-6">
                CATEGORIES
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-5.5xl font-bold text-foreground leading-[1.1] mb-8 font-sans">
                Browsing Top Categories
              </h2>
              <p className="text-foreground/60 text-base leading-relaxed max-w-sm">
                Discover our curated selection of high-quality products across all your favourite children's and lifestyle categories.
              </p>
            </div>
            
            {/* Carousel Navigation — Simplified without background card */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-11 h-11 flex items-center justify-center bg-accent text-primary-dark hover:bg-primary hover:text-white transition-all rounded-full shadow-lg active:scale-95"
                aria-label="Previous categories"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-11 h-11 flex items-center justify-center bg-accent text-primary-dark hover:bg-primary hover:text-white transition-all rounded-full shadow-lg active:scale-95"
                aria-label="Next categories"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Categories Carousel */}
          <div 
            ref={scrollRef}
            className="flex-1 w-full overflow-x-auto pb-6 -mb-6 scrollbar-hide snap-x no-scrollbar"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <div className="flex flex-nowrap gap-5 md:gap-6">
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  href={cat.href}
                  className="group block bg-white border border-border/40 transition-all hover:shadow-2xl hover:-translate-y-2 rounded-none w-[280px] md:w-[calc((100%-48px)/2.5)] lg:w-[calc((100%-72px)/4.5)] flex-shrink-0 snap-start"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-[#f9f9f9]">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-contain p-1 scale-[1.1] group-hover:scale-[1.2] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-4 pt-5 overflow-hidden">
                    <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors whitespace-nowrap truncate">
                      {cat.title}
                    </h3>
                    <p className="text-foreground/40 text-sm mt-1">
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
