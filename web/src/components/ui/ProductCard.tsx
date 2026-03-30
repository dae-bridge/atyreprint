"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, priceToPounds, getImageUrl } from "@/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const productHref = `/shop/product/${product.slug}`;

  const price = priceToPounds(product.price);
  const compareAt = priceToPounds(product.compareAtPrice);

  // Calculate discount percentage if both prices exist
  const hasDiscount = compareAt > 0 && compareAt > price;
  const discountPercentage = hasDiscount
    ? Math.round(((compareAt - price) / compareAt) * 100)
    : 0;

  const buttonLabel =
    product.buttonLabel ||
    (product.variants &&
    product.variants.length > 0 &&
    product.variants[0].options.length > 0
      ? "SELECT OPTIONS"
      : "CUSTOMISE");

  const mainImage = getImageUrl(product.images?.[0]);
  const hoverImage =
    product.images?.length > 1 ? getImageUrl(product.images[1]) : mainImage;

  return (
    <div className="relative bg-white border border-transparent hover:border-gray-100 transition-all duration-500 w-full hover:shadow-2xl hover:z-30 group h-full flex flex-col">
      {/* Product Image Wrapper */}
      <div className="group/image relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden">
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-4 left-4 z-20 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
            -{discountPercentage}%
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
              onClick={(e) => e.preventDefault()}
            >
              <item.icon size={18} strokeWidth={1.5} />
            </button>
          ))}
        </div>

        {/* Image */}
        <Link href={productHref} className="relative w-full h-full block">
          {/* Default Image */}
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain transition-opacity duration-500 group-hover/image:opacity-0"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover Image */}
          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${product.name} - alternate`}
              fill
              className="object-contain transition-opacity duration-500 opacity-0 group-hover/image:opacity-100"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col items-start text-left flex-1 bg-white">
        <Link href={productHref}>
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
                i < Math.floor(product.rating || 5)
                  ? "fill-[#ffb503] text-[#ffb503]"
                  : "fill-gray-200 text-gray-200"
              }
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-5 mt-auto">
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              £{formatPrice(product.compareAtPrice)}
            </span>
          )}
          <span className="text-base font-bold text-[#ff4d6d]">
            £{formatPrice(product.price)}
          </span>
        </div>

        {/* Action Button */}
        {buttonLabel === "CUSTOMISE" ? (
          <Link
            href={`/personalise-it?product=${product.slug}`}
            className="w-full py-3 bg-[#eeeeee] text-[13px] font-bold text-foreground hover:bg-accent hover:text-white transition-colors tracking-wide uppercase font-jost text-center block"
          >
            CUSTOMISE
          </Link>
        ) : (
          <button
            className="w-full py-3 bg-[#eeeeee] text-[13px] font-bold text-foreground hover:bg-accent hover:text-white transition-colors tracking-wide uppercase font-jost"
            onClick={(e) => e.preventDefault()}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};
