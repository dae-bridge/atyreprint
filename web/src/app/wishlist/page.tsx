"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/lib/wishlistStore";
import { useCartStore } from "@/lib/cartStore";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="bg-[#f9f9f9] min-h-screen pt-32 pb-24 font-jost">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-tight">
              Your Wishlist
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#f9f9f9] min-h-screen pt-32 pb-24 font-jost">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
              <Heart size={32} className="text-accent" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-tight">
              Your Wishlist
            </h1>
            <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto">
              You haven&apos;t saved any items to your wishlist yet. Start
              browsing our shop and click the heart icon to save your
              favourites!
            </p>
            <Link
              href="/shop"
              className="inline-block px-10 py-4 bg-primary text-white font-bold text-[14px] tracking-widest uppercase hover:bg-black transition-colors rounded shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-12 pb-24 font-jost">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground uppercase tracking-tight">
            Your Wishlist
          </h1>
          <p className="text-text-muted text-sm mt-1">
            {items.length} item{items.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-white rounded-lg overflow-hidden group"
            >
              <Link href={`/shop/product/${item.slug}`}>
                <div className="relative aspect-square bg-surface overflow-hidden">
                  <Image
                    src={
                      item.image ||
                      "/images/products/custom-printed-tshirt/main.jpg"
                    }
                    alt={item.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/shop/product/${item.slug}`}>
                  <h3 className="text-sm font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-accent font-bold text-sm mb-3">
                  £{item.price.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      addToCart({
                        productId: item.productId,
                        slug: item.slug,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        color: "",
                        variants: {},
                        quantity: 1,
                      })
                    }
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-black transition-colors"
                  >
                    <ShoppingBag size={14} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-2 border border-border rounded text-text-muted hover:text-red-500 hover:border-red-200 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
