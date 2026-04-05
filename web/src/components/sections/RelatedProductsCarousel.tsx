"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ProductData } from "@/lib/products";
import { formatPrice, getImageUrl } from "@/types";
import { ChevronLeft, ChevronRight, Star, Heart, Eye } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={12}
        className={
          star <= Math.round(rating)
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
        }
      />
    ))}
  </div>
);

interface RelatedProductsCarouselProps {
  products: ProductData[];
}

export const RelatedProductsCarousel = ({
  products,
}: RelatedProductsCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.clientWidth ?? 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth - 20 : cardWidth + 20,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-jost text-2xl font-bold text-foreground uppercase tracking-wide">
          Related Products
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-foreground hover:text-white hover:border-foreground transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-foreground hover:text-white hover:border-foreground transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/product/${product.slug}`}
            className="group/card shrink-0 w-[220px] md:w-[240px] bg-white snap-start border border-transparent hover:border-gray-100 transition-all hover:shadow-lg"
          >
            {/* Image */}
            <div className="group/image relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden">
              <Image
                src={getImageUrl(product.images[0])}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-500 group-hover/image:scale-110"
                sizes="240px"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#a9cb5b] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                  {product.badge}
                </span>
              )}
              {/* Hover Actions */}
              <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 translate-x-12 group-hover/image:translate-x-0 transition-transform duration-300">
                <button
                  className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                  title="Wishlist"
                  onClick={(e) => e.preventDefault()}
                >
                  <Heart size={14} />
                </button>
                <button
                  className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                  title="Quick View"
                  onClick={(e) => e.preventDefault()}
                >
                  <Eye size={14} />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col items-start text-left">
              <h3 className="text-[13px] font-bold text-foreground uppercase tracking-wide line-clamp-2 mb-2 transition-colors group-hover/card:text-[#a9cb5b]">
                {product.name}
              </h3>
              <div className="mb-2">
                <StarRating rating={product.rating} />
              </div>
              <div className="flex items-center gap-2">
                {product.compareAtPrice && (
                  <span className="text-[13px] text-gray-400 line-through font-medium">
                    £{formatPrice(product.compareAtPrice)}
                  </span>
                )}
                <span className="text-[15px] font-bold text-[#1a1a1a]">
                  £{formatPrice(product.price)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
