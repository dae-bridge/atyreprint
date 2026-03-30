"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Truck, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { priceToPounds, type Money } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  freeShippingThreshold?: Money;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  freeShippingThreshold: thresholdMoney,
}: CartDrawerProps) => {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = totalPrice();
  const freeShippingThreshold = thresholdMoney
    ? priceToPounds(thresholdMoney)
    : 100;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - total);
  const progressPercent = Math.min(100, (total / freeShippingThreshold) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[101] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-bold font-jost text-foreground">
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-foreground transition-colors group"
          >
            <X
              size={24}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="p-5 border-b border-border-light bg-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors border",
                  progressPercent >= 100
                    ? "bg-green-500 border-green-500"
                    : "bg-white border-[#ffda15]",
                )}
              >
                <Truck
                  size={18}
                  className={
                    progressPercent >= 100 ? "text-white" : "text-[#ffda15]"
                  }
                />
              </div>
              <p className="text-sm font-medium text-foreground">
                {amountToFreeShipping > 0 ? (
                  <>
                    Add items worth{" "}
                    <span className="font-bold text-[#a9cb5b]">
                      £{amountToFreeShipping.toFixed(2)}
                    </span>{" "}
                    for <span className="font-bold">FREE Delivery!</span>
                  </>
                ) : (
                  <span className="font-bold text-green-600">
                    You've unlocked FREE Delivery!
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ffda15] transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-20 h-20 bg-surface-alt rounded-full flex items-center justify-center mb-5 text-text-muted">
                <ShoppingBag size={40} />
              </div>
              <p className="text-lg font-medium text-foreground mb-2">
                Your cart is empty
              </p>
              <p className="text-text-muted mb-8 max-w-[250px]">
                Looks like you haven't added anything to your cart yet.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#1a3014] text-white font-bold rounded hover:opacity-90 transition-opacity font-jost uppercase tracking-wider text-sm"
              >
                Return to Shop
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.color}-${JSON.stringify(item.variants)}`}
                  className="flex gap-4 group"
                >
                  <div className="relative w-24 h-24 bg-[#f8f9fa] rounded-lg overflow-hidden flex-shrink-0 border border-border-light">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2 mb-1">
                      <h3 className="text-[15px] font-bold text-foreground hover:text-[#a9cb5b] transition-colors line-clamp-2 leading-tight">
                        <Link
                          href={`/shop/product/${item.slug}`}
                          onClick={onClose}
                        >
                          {item.name}
                        </Link>
                      </h3>
                      <button
                        onClick={() =>
                          removeItem(item.productId, item.color, item.variants)
                        }
                        className="text-text-muted hover:text-red-500 transition-colors p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded h-9">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.color,
                              item.variants,
                              item.quantity - 1,
                            )
                          }
                          className="px-2 h-full hover:text-primary transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.color,
                              item.variants,
                              item.quantity + 1,
                            )
                          }
                          className="px-2 h-full hover:text-primary transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-[15px] font-bold text-foreground">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-border shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold font-jost uppercase tracking-wider">
                Subtotal:
              </span>
              <span className="text-xl font-bold text-[#a9cb5b]">
                £{total.toFixed(2)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={onClose}
                className="flex items-center justify-center py-4 bg-[#1a3014] text-white font-bold rounded hover:bg-black transition-all font-jost uppercase tracking-wider text-[13px]"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className="flex items-center justify-center py-4 bg-[#a9cb5b] text-white font-bold rounded hover:opacity-90 transition-all font-jost uppercase tracking-wider text-[13px]"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
