"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore, type CartItem } from "@/lib/cartStore";
import { PageHeader } from "@/components/ui/PageHeader";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const CartItemRow = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const variantLabel = Object.values(item.variants).filter(Boolean).join(" / ");

  return (
    <div className="flex gap-4 py-5 border-b border-border-light last:border-b-0">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-surface flex-shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
      </div>
      <div className="flex-1 min-w-0">
        <Link
          href={`/shop/product/${item.slug}`}
          className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
        >
          {item.name}
        </Link>
        <div className="text-sm text-text-secondary mt-0.5">
          {item.color}
          {variantLabel && <> &middot; {variantLabel}</>}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-border-light rounded-lg overflow-hidden">
            <button
              onClick={() => updateQuantity(item.productId, item.color, item.variants, item.quantity - 1)}
              className="px-2.5 py-1.5 hover:bg-surface transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 py-1.5 text-sm font-semibold min-w-[36px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.color, item.variants, item.quantity + 1)}
              className="px-2.5 py-1.5 hover:bg-surface transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-primary">
              £{(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeItem(item.productId, item.color, item.variants)}
              className="p-1.5 text-text-muted hover:text-error transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCartStore();
  const count = totalItems();

  return (
    <>
      <PageHeader
        title="Your Cart"
        subtitle={count > 0 ? `${count} item${count !== 1 ? "s" : ""} in your cart` : undefined}
        badge="Shopping Cart"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={56} className="mx-auto text-text-muted mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-text-secondary mb-6">
                Looks like you haven&apos;t added anything yet. Browse our products and find something you love!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-text-muted hover:text-error transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-border-light p-4 sm:p-6">
                  {items.map((item) => (
                    <CartItemRow
                      key={`${item.productId}-${item.color}-${JSON.stringify(item.variants)}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-surface rounded-xl p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm text-text-secondary">
                      <span>Subtotal ({count} items)</span>
                      <span>£{totalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-text-secondary">
                      <span>Shipping</span>
                      <span className="text-success font-medium">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-border-light pt-3 flex justify-between font-semibold text-foreground">
                      <span>Total</span>
                      <span className="text-primary text-lg">£{totalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors mb-3">
                    Proceed to Checkout
                  </button>
                  <Link
                    href="/shop"
                    className="block w-full text-center py-3 border border-border-light text-foreground font-medium rounded-lg hover:bg-white transition-colors text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
