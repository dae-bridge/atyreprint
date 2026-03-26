"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductData } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";
import { Minus, Plus, ShoppingCart, Heart, Share2, Check } from "lucide-react";

interface ProductDetailClientProps {
  product: ProductData;
}

export const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name ?? "",
  );
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    for (const v of product.variants) {
      initial[v.label] = v.options[0] ?? "";
    }
    return initial;
  });
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      variants: selectedVariants,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      {/* ─── Image Gallery ─── */}
      <div>
        {/* Main image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-secondary text-primary-dark text-sm font-bold px-3 py-1.5 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-4 gap-3">
          {product.images.map((img, i) => (
            <button
              key={img}
              onClick={() => setSelectedImage(i)}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                i === selectedImage
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border-light hover:border-primary/40",
              )}
            >
              <Image
                src={img}
                alt={`${product.name} view ${i + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ─── Product Info ─── */}
      <div>
        <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-2">
          {product.category}
        </p>

        <h1 className="font-jost text-3xl md:text-4xl font-bold text-foreground mb-4">
          {product.name}
        </h1>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-bold text-primary">
            £{product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && (
            <span className="text-lg text-text-muted line-through">
              £{product.compareAtPrice.toFixed(2)}
            </span>
          )}
          {product.compareAtPrice && (
            <span className="bg-error/10 text-error text-sm font-semibold px-2 py-0.5 rounded">
              Save £{(product.compareAtPrice - product.price).toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-text-secondary leading-relaxed mb-8">
          {product.description}
        </p>

        {/* ─── Colour Picker ─── */}
        {product.colors.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-foreground mb-3">
              Colour:{" "}
              <span className="font-normal text-text-secondary">
                {selectedColor}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedColor === color.name
                      ? "border-primary scale-110"
                      : "border-border hover:border-primary/50",
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <Check
                      size={16}
                      className={
                        color.hex === "#FFFFFF" ||
                        color.hex === "#F5F0E1" ||
                        color.hex === "#E8E8E8"
                          ? "text-foreground"
                          : "text-white"
                      }
                      strokeWidth={3}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── Variant Selectors ─── */}
        {product.variants.map((variant) => (
          <div key={variant.label} className="mb-6">
            <p className="text-sm font-semibold text-foreground mb-3">
              {variant.label}:{" "}
              <span className="font-normal text-text-secondary">
                {selectedVariants[variant.label]}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {variant.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() =>
                    setSelectedVariants((prev) => ({
                      ...prev,
                      [variant.label]: opt,
                    }))
                  }
                  className={cn(
                    "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                    selectedVariants[variant.label] === opt
                      ? "border-primary bg-primary text-white"
                      : "border-border-light text-foreground hover:border-primary/50",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* ─── Quantity & Add to Cart ─── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
          {/* Quantity */}
          <div className="flex items-center border-2 border-border-light rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-3 hover:bg-surface transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-5 py-3 font-semibold text-foreground min-w-[48px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-3 hover:bg-surface transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 font-semibold rounded-lg transition-colors text-lg",
              addedToCart
                ? "bg-success text-white"
                : "bg-primary text-white hover:bg-primary-light",
            )}
          >
            {addedToCart ? (
              <>
                <Check size={20} />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Add to Cart
              </>
            )}
          </button>
        </div>

        {/* Wishlist & Share */}
        <div className="flex gap-3 mb-8">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-border-light rounded-lg text-sm text-text-secondary hover:text-primary hover:border-primary/30 transition-colors">
            <Heart size={16} /> Add to Wishlist
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-border-light rounded-lg text-sm text-text-secondary hover:text-primary hover:border-primary/30 transition-colors">
            <Share2 size={16} /> Share
          </button>
        </div>

        {/* ─── Features ─── */}
        <div className="border-t border-border-light pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            Product Features
          </h3>
          <ul className="space-y-2">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <Check size={14} className="text-success mt-0.5 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
