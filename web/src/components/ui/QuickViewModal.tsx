"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, Heart, ShoppingBag, Plus, Minus } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, priceToPounds, getImageUrl } from "@/types";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || "",
  );
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >(() => {
    const out: Record<string, string> = {};
    product.variants?.forEach((v) => {
      if (v.options.length > 0) out[v.label] = v.options[0];
    });
    return out;
  });

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist)(product.id);

  const price = priceToPounds(product.price);
  const compareAt = priceToPounds(product.compareAtPrice);
  const hasDiscount = compareAt > 0 && compareAt > price;
  const mainImage = getImageUrl(
    product.images?.[selectedImage] || product.images?.[0],
  );

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price,
      image: getImageUrl(product.images?.[0]),
      color: selectedColor,
      variants: selectedVariants,
      quantity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-foreground hover:bg-gray-50 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image side */}
          <div className="p-6 bg-[#f9f9f9]">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 350px"
              />
              {hasDiscount && (
                <div className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                  -{Math.round(((compareAt - price) / compareAt) * 100)}%
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 rounded border-2 shrink-0 overflow-hidden ${
                      selectedImage === i
                        ? "border-accent"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={getImageUrl(img)}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info side */}
          <div className="p-6 flex flex-col">
            <h2 className="font-jost text-xl font-bold text-foreground mb-2 uppercase tracking-tight">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(product.rating || 5)
                        ? "fill-[#ffb503] text-[#ffb503]"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                ))}
              </div>
              {product.reviewCount > 0 && (
                <span className="text-xs text-text-secondary">
                  ({product.reviewCount})
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              {hasDiscount && (
                <span className="text-base text-gray-400 line-through">
                  £{formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className="text-2xl font-bold text-[#ff4d6d]">
                £{formatPrice(product.price)}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
              {product.description}
            </p>

            {/* Colours */}
            {product.colors?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                  Colour: {selectedColor}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === c.name
                          ? "border-accent scale-110"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Variants */}
            {product.variants?.map((v) => (
              <div key={v.label} className="mb-4">
                <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                  {v.label}: {selectedVariants[v.label]}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {v.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() =>
                        setSelectedVariants((prev) => ({
                          ...prev,
                          [v.label]: opt,
                        }))
                      }
                      className={`px-3 py-1.5 text-xs font-semibold border rounded transition-colors ${
                        selectedVariants[v.label] === opt
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-text-secondary hover:border-gray-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-3 mt-auto pt-4">
              <div className="flex items-center border border-border rounded">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-foreground transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-9 h-9 flex items-center justify-center text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-foreground transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-accent text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-[#8ba83a] transition-colors"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>

              <button
                onClick={() =>
                  toggleWishlist({
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    price,
                    image: getImageUrl(product.images?.[0]),
                  })
                }
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                  isInWishlist
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-border text-text-secondary hover:text-accent hover:border-accent"
                }`}
              >
                <Heart
                  size={18}
                  className={isInWishlist ? "fill-red-500" : ""}
                />
              </button>
            </div>

            {/* View full detail link */}
            <Link
              href={`/shop/product/${product.slug}`}
              className="mt-4 text-center text-sm text-accent font-semibold hover:underline"
              onClick={onClose}
            >
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
