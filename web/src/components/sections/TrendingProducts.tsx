"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  RefreshCw,
  Eye,
  Star,
} from "lucide-react";

const trendingProducts = [
  {
    id: "1",
    slug: "custom-printed-tshirt",
    name: "Custom Printed T-Shirt",
    originalPrice: "£24.99",
    price: "£19.99",
    discount: "-20%",
    rating: 5,
    image: "/images/products/custom-printed-tshirt/main.jpg",
    hoverImage: "/images/products/custom-printed-tshirt/thumb-1.jpg",
    countdown: "208d : 01h : 03m : 18s",
    buttonLabel: "CUSTOMISE",
  },
  {
    id: "2",
    slug: "embroidered-hoodie",
    name: "Embroidered Hoodie",
    originalPrice: "£49.99",
    price: "£39.99",
    discount: "-20%",
    rating: 5,
    image: "/images/products/embroidered-hoodie/main.jpg",
    hoverImage: "/images/products/embroidered-hoodie/thumb-1.jpg",
    countdown: "237d : 01h : 03m : 18s",
    buttonLabel: "ADD TO CART",
  },
  {
    id: "3",
    slug: "personalised-mug",
    name: "Personalised Ceramic Mug",
    originalPrice: null,
    price: "£12.99",
    discount: null,
    rating: 4,
    image: "/images/products/personalised-mug/main.jpg",
    hoverImage: "/images/products/personalised-mug/thumb-1.jpg",
    countdown: null,
    buttonLabel: "CUSTOMISE",
  },
  {
    id: "4",
    slug: "custom-tote-bag",
    name: "Custom Tote Bag",
    originalPrice: null,
    price: "£14.99",
    discount: null,
    rating: 5,
    image: "/images/products/custom-tote-bag/main.jpg",
    hoverImage: "/images/products/custom-tote-bag/thumb-1.jpg",
    countdown: null,
    buttonLabel: "ADD TO CART",
  },
  {
    id: "5",
    slug: "branded-snapback-cap",
    name: "Branded Snapback Cap",
    originalPrice: "£20.00",
    price: "£16.99",
    discount: "-15%",
    rating: 5,
    image: "/images/products/branded-snapback-cap/main.jpg",
    hoverImage: "/images/products/branded-snapback-cap/thumb-1.jpg",
    countdown: null,
    buttonLabel: "CUSTOMISE",
  },
  {
    id: "6",
    slug: "custom-glass-can",
    name: "Custom Glass Can",
    originalPrice: "£18.00",
    price: "£15.99",
    discount: "-11%",
    rating: 4,
    image: "/images/products/custom-glass-can/main.jpg",
    hoverImage: "/images/products/custom-glass-can/thumb-1.jpg",
    countdown: "12d : 05h : 20m : 10s",
    buttonLabel: "ADD TO CART",
  },
];

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="relative bg-white border border-transparent hover:border-gray-100 transition-all duration-500 w-full snap-start hover:shadow-2xl hover:z-30">
      {/* Product Image Wrapper */}
      <div className="group/image relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden">
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 left-4 z-20 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
            {product.discount}
          </div>
        )}

        {/* Hover Action Icons */}
        <div className="absolute top-4 right-5 z-20 flex flex-col gap-2 translate-x-16 group-hover/image:translate-x-0 transition-transform duration-300">
          {[
            { icon: Heart, label: "Wishlist" },
            { icon: Eye, label: "Quick View" },
          ].map((item, idx) => (
            <button
              key={idx}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:bg-accent hover:text-primary transition-colors hover:scale-110 duration-200"
              title={item.label}
            >
              <item.icon size={18} strokeWidth={1.5} />
            </button>
          ))}
        </div>

        {/* Image */}
        <Link
          href={`/shop/product/${product.slug}`}
          className="relative w-full h-full block"
        >
          {/* Default Image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-opacity duration-500 group-hover/image:opacity-0"
            sizes="(max-width: 768px) 100vw, 20vw"
          />
          {/* Hover Image */}
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={`${product.name} - alternate`}
              fill
              className="object-contain transition-opacity duration-500 opacity-0 group-hover/image:opacity-100"
              sizes="(max-width: 768px) 100vw, 20vw"
            />
          )}
        </Link>

        {/* Countdown */}
        {product.countdown && (
          <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/90 backdrop-blur-sm py-2 px-3 text-center">
            <span className="text-[11px] font-bold text-accent tracking-wider uppercase">
              {product.countdown}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col items-start text-left">
        <Link href={`/shop/product/${product.slug}`}>
          <h3 className="text-[15px] font-medium text-foreground leading-snug mb-2 line-clamp-2 min-h-[40px] hover:text-accent cursor-pointer transition-colors uppercase tracking-tight font-jost">
            {product.name}
          </h3>
        </Link>

        {/* Ratings */}
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              className={
                i < product.rating
                  ? "fill-[#ffb503] text-[#ffb503]"
                  : "fill-gray-200 text-gray-200"
              }
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-5">
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.originalPrice}
            </span>
          )}
          <span className="text-base font-bold text-[#ff4d6d]">
            {product.price}
          </span>
        </div>

        {/* Action Button */}
        {product.buttonLabel === "CUSTOMISE" ? (
          <Link
            href={`/personalise-it?product=${product.slug}`}
            className="w-full py-3 bg-[#eeeeee] text-[13px] font-bold text-foreground hover:bg-accent hover:text-white transition-colors tracking-wide uppercase font-jost text-center block"
          >
            CUSTOMISE
          </Link>
        ) : (
          <button className="w-full py-3 bg-[#eeeeee] text-[13px] font-bold text-foreground hover:bg-accent hover:text-white transition-colors tracking-wide uppercase font-jost">
            {product.buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export const TrendingProducts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 2;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-10 md:pt-12 pb-6 md:pb-8 bg-white overflow-hidden relative">
      <Container>
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3 md:mb-4 block font-jost">
            BEST SELLING PRODUCTS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 font-jost">
            Browsing Our Trending Items
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto" />
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel px-4">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[70%] sm:w-[45%] md:w-[30%] lg:w-[18.2%] snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Navigation Buttons (Overlapping row, Hover only) */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-foreground hover:bg-accent hover:text-primary transition-all opacity-0 group-hover/carousel:opacity-100 -translate-x-1/2 group-hover/carousel:translate-x-0"
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-foreground hover:bg-accent hover:text-primary transition-all opacity-0 group-hover/carousel:opacity-100 translate-x-1/2 group-hover/carousel:translate-x-0"
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </Container>
    </section>
  );
};
