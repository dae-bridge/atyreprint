"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface PurchaseToastProps {
  products?: Product[];
}

export const PurchaseToast = ({ products }: PurchaseToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = products?.filter((p) => p.rating >= 4) ?? [];

  useEffect(() => {
    if (items.length === 0) return;

    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 13000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [items.length]);

  if (!isVisible || items.length === 0) return null;

  const product = items[currentIndex % items.length];
  const imageUrl =
    product.images?.[0]?.url ||
    "/images/products/custom-printed-tshirt/main.jpg";

  return (
    <div className="fixed bottom-8 left-8 z-[60] animate-fade-in-up">
      <Link
        href={`/shop/product/${product.slug}`}
        className="bg-white rounded-lg shadow-2xl border border-border/40 p-4 min-w-[320px] relative flex gap-4 group"
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsVisible(false);
          }}
          className="absolute top-2 right-2 text-foreground/30 hover:text-foreground/60 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="relative w-16 h-16 flex-shrink-0 bg-surface rounded-md overflow-hidden p-2">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>

        <div className="flex-1 pr-4">
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={10}
                className={cn(
                  i < Math.round(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-200",
                )}
              />
            ))}
            <span className="text-[10px] text-foreground/40 ml-1">
              ({product.reviewCount})
            </span>
          </div>
          <h4 className="text-sm font-bold text-foreground leading-tight mb-1 pr-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h4>
          <span className="text-xs font-semibold text-accent">
            £{(product.price.amount / 100).toFixed(2)}
          </span>
        </div>
      </Link>
    </div>
  );
};
