"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore, type CartItem } from "@/lib/cartStore";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  Heart,
  RefreshCw,
  Gift,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { PaymentIcons } from "@/components/ui/PaymentIcons";
import { ProductCard } from "@/components/ui/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import type { Product } from "@/types";

/**
 * Trust Benefit Component
 */
const BenefitBox = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center text-center p-6 bg-[#f8f9fa] rounded-lg transition-all hover:shadow-md border border-transparent hover:border-[#a9cb5b]/20">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#1a3014]">
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-foreground mb-1 font-jost uppercase tracking-wider text-sm">
      {title}
    </h3>
    <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
  </div>
);

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();
  const [shippingMethod, setShippingMethod] = useState<"flat" | "local">(
    "flat",
  );
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [crossSellProducts, setCrossSellProducts] = useState<Product[]>([]);
  const total = totalPrice();

  // Free shipping logic (Threshold: £100)
  const threshold = 100;
  const remaining = Math.max(0, threshold - total);
  const progress = Math.min((total / threshold) * 100, 100);
  const isFreeShipping = total >= threshold;

  const shippingCost = isFreeShipping ? 0 : shippingMethod === "flat" ? 5 : 0;
  const count = totalItems();

  useEffect(() => {
    getFeaturedProducts(5)
      .then(setCrossSellProducts)
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Shopping Cart"
        subtitle={
          count > 0
            ? `You have ${count} item${count !== 1 ? "s" : ""} in your cart`
            : undefined
        }
        badge="Your Bag"
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-2xl border border-dashed border-border-light">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-text-muted">
                <ShoppingBag size={48} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3 font-jost uppercase tracking-widest">
                Your cart is empty
              </h2>
              <p className="text-text-secondary mb-10 max-w-md mx-auto">
                Looks like you haven't added any AtyrePrint items yet. Explore
                our collections and find your style!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center px-10 py-4 bg-[#1a3014] text-white font-bold rounded hover:bg-black transition-all font-jost uppercase tracking-widest text-sm"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Cart Items & Actions */}
              <div className="lg:col-span-8 space-y-8">
                {/* Promo Banner */}
                <div className="bg-[#f1f8e9] border border-[#a9cb5b]/30 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#a9cb5b] rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <Gift size={20} />
                    </div>
                    <p className="text-sm font-medium text-[#1a3014]">
                      Use <span className="font-bold">ATYREFREE</span> coupon
                      code to get 10% off on your first order!
                    </p>
                  </div>
                  <button className="px-5 py-2 bg-white border border-[#a9cb5b] text-[#a9cb5b] font-bold rounded text-xs uppercase tracking-widest hover:bg-[#a9cb5b] hover:text-white transition-all">
                    Apply Coupon
                  </button>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-border text-left">
                        <th className="pb-4 font-bold font-jost uppercase tracking-wider text-xs">
                          Product
                        </th>
                        <th className="pb-4 font-bold font-jost uppercase tracking-wider text-xs text-center">
                          Price
                        </th>
                        <th className="pb-4 font-bold font-jost uppercase tracking-wider text-xs text-center">
                          Quantity
                        </th>
                        <th className="pb-4 font-bold font-jost uppercase tracking-wider text-xs text-right">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={`${item.productId}-${item.color}-${JSON.stringify(item.variants)}`}
                          className="border-b border-border-light group"
                        >
                          <td className="py-6">
                            <div className="flex items-center gap-5">
                              <button
                                onClick={() =>
                                  removeItem(
                                    item.productId,
                                    item.color,
                                    item.variants,
                                  )
                                }
                                className="text-text-muted hover:text-red-500 transition-colors p-1"
                              >
                                <X size={18} />
                              </button>
                              <div className="relative w-20 h-20 bg-[#f8f9fa] rounded overflow-hidden flex-shrink-0 border border-border-light group-hover:border-[#a9cb5b]/30 transition-colors">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-contain p-2"
                                />
                              </div>
                              <div className="min-w-0">
                                <Link
                                  href={`/shop/product/${item.slug}`}
                                  className="font-bold text-foreground hover:text-[#a9cb5b] transition-colors line-clamp-1 text-[15px]"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-xs text-text-secondary mt-1">
                                  {item.color}{" "}
                                  {Object.values(item.variants).filter(Boolean)
                                    .length > 0 &&
                                    ` / ${Object.values(item.variants).filter(Boolean).join(" / ")}`}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-6 text-center text-sm font-medium text-text-secondary">
                            {formatPrice(item.price)}
                          </td>
                          <td className="py-6">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center border border-border rounded h-10 w-32">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.color,
                                      item.variants,
                                      item.quantity - 1,
                                    )
                                  }
                                  className="flex-1 h-full flex items-center justify-center hover:bg-surface transition-colors"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-10 text-center text-sm font-bold">
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
                                  className="flex-1 h-full flex items-center justify-center hover:bg-surface transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-6 text-right font-bold text-foreground">
                            {formatPrice(item.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.color}-${JSON.stringify(item.variants)}`}
                      className="p-4 border border-border rounded-xl"
                    >
                      <div className="flex gap-4 mb-4">
                        <div className="relative w-20 h-20 bg-[#f8f9fa] rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/shop/product/${item.slug}`}
                            className="font-bold text-foreground block truncate"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-text-secondary mt-1">
                            {item.color}
                          </p>
                          <p className="mt-2 font-bold text-[#a9cb5b]">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(
                              item.productId,
                              item.color,
                              item.variants,
                            )
                          }
                          className="text-text-muted h-fit"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border-light">
                        <div className="flex items-center border border-border rounded h-9 w-28">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.color,
                                item.variants,
                                item.quantity - 1,
                              )
                            }
                            className="flex-1 flex items-center justify-center"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">
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
                            className="flex-1 flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-bold">
                          Subtotal: {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6">
                  <div className="flex items-center w-full sm:w-auto gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="flex-1 sm:w-64 h-12 px-4 border border-border rounded focus:outline-none focus:border-[#a9cb5b] text-sm"
                    />
                    <button className="h-12 px-6 bg-[#1a3014] text-white font-bold rounded uppercase tracking-widest text-[11px] hover:bg-black transition-colors">
                      Apply Coupon
                    </button>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={clearCart}
                      className="flex-1 sm:flex-none h-12 px-8 border border-border text-foreground font-bold rounded uppercase tracking-widest text-[11px] hover:bg-[#f8f9fa] transition-colors"
                    >
                      Empty Cart
                    </button>
                    <button className="flex-1 sm:flex-none h-12 px-8 bg-[#a9cb5b] text-white font-bold rounded uppercase tracking-widest text-[11px] hover:opacity-90 transition-colors">
                      Update Cart
                    </button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
                  <BenefitBox
                    icon={Heart}
                    title="Loved by Thousands"
                    description="Join 50k+ happy customers who trust AtyrePrint quality."
                  />
                  <BenefitBox
                    icon={RefreshCw}
                    title="Easy Returns"
                    description="Hassle-free 30-day returns and exchanges policy."
                  />
                  <BenefitBox
                    icon={Gift}
                    title="Order Now & Get Gift!"
                    description="Special surprise gifts with orders over £150."
                  />
                </div>
              </div>

              {/* Right Column: Totals Sidebar */}
              <div className="lg:col-span-4">
                {/* Free Delivery Progress */}
                <div className="mb-6 p-6 border-2 border-dashed border-[#a9cb5b]/30 rounded-xl bg-white text-center relative overflow-hidden shadow-sm">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-full h-1.5 bg-gray-100 rounded-full relative overflow-visible">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#a9cb5b] transition-all duration-1000 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                      {/* Truck Icon that moves with progress */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 bg-white border-2 border-[#a9cb5b] rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-1000 ease-out z-10"
                        style={{ left: `calc(${progress}% - 16px)` }}
                      >
                        <Truck size={16} className="text-[#1a3014]" />
                      </div>
                    </div>
                    <p className="text-[13px] font-medium text-text-secondary">
                      {remaining > 0 ? (
                        <>
                          Add items worth{" "}
                          <span className="font-bold text-[#a9cb5b]">
                            {formatPrice(remaining)}
                          </span>{" "}
                          for{" "}
                          <span className="font-bold uppercase tracking-wider text-[#1a3014]">
                            FREE Delivery!
                          </span>
                        </>
                      ) : (
                        <span className="text-[#1a3014] font-bold uppercase tracking-widest flex items-center gap-2">
                          🎉 You've unlocked FREE Delivery!
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-[#f8f9fa] border border-border rounded-xl p-6 sm:p-8 sticky top-24">
                  <h2 className="text-xl font-bold font-jost uppercase tracking-widest border-b border-border pb-4 mb-6 text-[#1a3014]">
                    Cart Totals
                  </h2>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold font-jost uppercase tracking-wider text-text-secondary">
                        Subtotal
                      </span>
                      <span className="font-bold text-foreground text-lg">
                        {formatPrice(total)}
                      </span>
                    </div>

                    <div className="border-t border-border pt-6">
                      <span className="block font-bold font-jost uppercase tracking-wider text-xs text-text-secondary mb-4">
                        Shipping
                      </span>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              checked={shippingMethod === "flat"}
                              onChange={() => setShippingMethod("flat")}
                              className="w-4 h-4 accent-[#a9cb5b]"
                            />
                            <span className="text-sm text-foreground group-hover:text-[#a9cb5b] transition-colors">
                              Flat rate
                            </span>
                          </div>
                          <span className="text-sm font-bold text-[#a9cb5b]">
                            {isFreeShipping ? "Free" : "£5.00"}
                          </span>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              checked={shippingMethod === "local"}
                              onChange={() => setShippingMethod("local")}
                              className="w-4 h-4 accent-[#a9cb5b]"
                            />
                            <span className="text-sm text-foreground group-hover:text-[#a9cb5b] transition-colors">
                              Local pickup
                            </span>
                          </div>
                          <span className="text-sm font-bold text-text-secondary">
                            Free
                          </span>
                        </label>
                      </div>
                      <p className="text-[11px] text-text-secondary mt-4 leading-relaxed">
                        Shipping to{" "}
                        <span className="font-bold text-foreground">
                          United Kingdom
                        </span>
                        .
                        <button
                          onClick={() => setShowAddressForm(!showAddressForm)}
                          className="ml-1 text-[#a9cb5b] hover:underline transition-all"
                        >
                          Change address
                        </button>
                      </p>

                      {/* Address Form */}
                      {showAddressForm && (
                        <div className="mt-6 space-y-4 pt-6 border-t border-border-light animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                              Country / region
                            </label>
                            <select className="w-full h-11 px-3 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b]">
                              <option>United Kingdom</option>
                              <option>United States</option>
                              <option>India</option>
                              <option>Ghana</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                              State / County{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <select className="w-full h-11 px-3 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b]">
                              <option>Select an option...</option>
                              <option>Greater London</option>
                              <option>Accra</option>
                              <option>Gujarat</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full h-11 px-3 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                              Postcode / ZIP{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full h-11 px-3 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b]"
                            />
                          </div>
                          <div className="flex justify-end pt-2">
                            <button
                              className="px-10 h-11 bg-[#a9cb5b] text-white font-bold rounded uppercase tracking-widest text-[11px] hover:opacity-90 transition-all shadow-sm"
                              onClick={() => setShowAddressForm(false)}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t-2 border-border pt-6 flex justify-between items-center">
                      <span className="text-lg font-bold font-jost uppercase tracking-widest text-[#1a3014]">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-[#a9cb5b]">
                        {formatPrice(total + shippingCost)}
                      </span>
                    </div>

                    <Link
                      href="/checkout"
                      className="w-full py-5 bg-[#a9cb5b] text-white font-bold rounded uppercase tracking-widest text-sm hover:opacity-95 transition-all shadow-lg shadow-[#a9cb5b]/20 flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout
                    </Link>

                    <div className="pt-6 text-center">
                      <div className="inline-flex items-center gap-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-4">
                        <ShieldCheck size={14} className="text-green-600" />
                        Guaranteed Safe Checkout
                      </div>
                      <PaymentIcons />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      {items.length > 0 && crossSellProducts.length > 0 && (
        <section className="py-20 border-t border-border bg-[#f8f9fa]">
          <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-jost uppercase tracking-widest mb-4 text-[#1a3014]">
                You may be interested in...
              </h2>
              <div className="w-20 h-1 bg-[#a9cb5b] mx-auto"></div>
            </div>
            {/* Actual Product Grid for cross-sell section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {crossSellProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
