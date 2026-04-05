"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Copy,
  Check,
  ShoppingBag,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface OrderSnapshotItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  color: string;
  variants: Record<string, string>;
  quantity: number;
}

interface OrderSnapshot {
  orderId: string;
  items: OrderSnapshotItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  date: string;
  paymentMethod: string;
}

const paymentMethodLabels: Record<string, string> = {
  card: "Credit / Debit Card",
  bank: "Direct bank transfer",
  cheque: "Check payment",
  cod: "Cash on delivery",
};

export default function OrderConfirmationPage() {
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState<OrderSnapshot | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("atyreprint-order-snapshot");
      if (raw) {
        setOrder(JSON.parse(raw));
        sessionStorage.removeItem("atyreprint-order-snapshot");
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleCopy = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Empty state — no order snapshot found
  if (!order) {
    return (
      <div className="bg-white min-h-screen">
        <PageHeader
          title="Order Confirmation"
          subtitle="Your order details"
          badge="Thank You"
        />
        <section className="py-20">
          <div className="max-w-lg mx-auto px-4 text-center">
            <ShoppingBag
              size={64}
              className="mx-auto mb-6 text-text-secondary opacity-30"
            />
            <h2 className="text-2xl font-bold font-jost mb-4 text-foreground">
              No order found
            </h2>
            <p className="text-text-secondary mb-8">
              It looks like you haven&apos;t placed an order yet, or you&apos;ve
              already viewed your confirmation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#a9cb5b] text-white font-bold rounded uppercase tracking-widest text-sm hover:opacity-90 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/order-tracking"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#1a3014] border-2 border-[#1a3014] font-bold rounded uppercase tracking-widest text-sm hover:bg-[#1a3014] hover:text-white transition-colors"
              >
                Track Order
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!order) return null;

  const steps = [
    { icon: CheckCircle2, label: "Order Placed", active: true },
    { icon: Package, label: "Processing", active: false },
    { icon: Truck, label: "Shipped", active: false },
    { icon: MapPin, label: "Delivered", active: false },
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Order Confirmed"
        subtitle="Thank you for your purchase!"
        badge="Success"
      />

      <section className="py-12 md:py-16">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Banner */}
          <div className="mb-10 bg-gradient-to-r from-[#1a3014]/5 to-[#a9cb5b]/10 border border-[#a9cb5b]/20 rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-[#a9cb5b] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#a9cb5b]/30">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold font-jost text-[#1a3014] mb-2">
              Thank You for Your Order!
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              Your order has been placed successfully. We&apos;ve sent a
              confirmation email with all the details.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 bg-white border border-border rounded-xl px-6 py-3 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Order No.
              </span>
              <span className="text-lg font-bold font-jost text-[#1a3014] tracking-wider">
                {order.orderId}
              </span>
              <button
                onClick={handleCopy}
                className="w-8 h-8 rounded-lg bg-[#f8f9fa] flex items-center justify-center hover:bg-[#a9cb5b]/10 transition-colors"
                title="Copy order number"
              >
                {copied ? (
                  <Check size={14} className="text-[#a9cb5b]" />
                ) : (
                  <Copy size={14} className="text-text-secondary" />
                )}
              </button>
            </div>
          </div>

          {/* Order Progress Timeline */}
          <div className="mb-10 bg-[#f8f9fa] border border-border rounded-xl p-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, idx) => (
                <div key={step.label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${step.active ? "bg-[#a9cb5b] text-white shadow-lg shadow-[#a9cb5b]/30" : "bg-white border-2 border-border text-text-secondary"}`}
                    >
                      <step.icon size={20} />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${step.active ? "text-[#1a3014]" : "text-text-secondary"}`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-3 mt-[-20px] ${idx === 0 ? "bg-[#a9cb5b]" : "bg-border"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column: Details + Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Order Details */}
            <div className="lg:col-span-7">
              <div className="bg-[#f8f9fa] border border-border rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-bold font-jost uppercase tracking-widest text-[#1a3014] mb-6 border-b border-border pb-4">
                  Order Details
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary block mb-1">
                      Order Number
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {order.orderId}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary block mb-1">
                      Date
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {order.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary block mb-1">
                      Payment Method
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {paymentMethodLabels[order.paymentMethod] ||
                        order.paymentMethod}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary block mb-1">
                      Status
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#a9cb5b]">
                      <span className="w-2 h-2 rounded-full bg-[#a9cb5b] animate-pulse" />
                      Processing
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t border-border pt-6">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-text-secondary pb-3 border-b border-border">
                    <span>Product</span>
                    <span>Total</span>
                  </div>
                  <div className="divide-y divide-border">
                    {order.items.map((item) => {
                      const variantStr = Object.values(item.variants)
                        .filter(Boolean)
                        .join(" / ");
                      return (
                        <div
                          key={`${item.productId}-${item.color}-${JSON.stringify(item.variants)}`}
                          className="flex items-center gap-4 py-4"
                        >
                          <div className="relative w-16 h-16 bg-white rounded-lg border border-border-light overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-text-secondary mt-0.5">
                              {item.color && `${item.color}`}
                              {item.color && variantStr && " / "}
                              {variantStr} × {item.quantity}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-foreground flex-shrink-0">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Summary */}
            <div className="lg:col-span-5">
              <div className="bg-[#f8f9fa] border border-border rounded-xl p-6 sm:p-8 sticky top-24">
                <h3 className="text-lg font-bold font-jost uppercase tracking-widest text-[#1a3014] mb-6 border-b border-border pb-4">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">
                      Subtotal
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {formatPrice(order.subtotal)}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600">Discount</span>
                      <span className="text-sm font-bold text-green-600">
                        -{formatPrice(order.discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">
                      Shipping
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {order.shipping === 0 ? (
                        <span className="text-[#a9cb5b]">FREE</span>
                      ) : (
                        formatPrice(order.shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-t-2 border-border">
                    <span className="text-lg font-bold font-jost uppercase tracking-widest text-[#1a3014]">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#a9cb5b]">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                {/* Bank Transfer Details (only for bank transfer orders) */}
                {order.paymentMethod === "bank" && (
                  <div className="mt-6 p-5 bg-white rounded-xl border border-border">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4">
                      Bank Transfer Details
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Bank</span>
                        <span className="font-bold text-foreground">
                          Barclays
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">
                          Account Name
                        </span>
                        <span className="font-bold text-foreground">
                          AtyrePrint Ltd
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Sort Code</span>
                        <span className="font-bold text-foreground">
                          20-45-67
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Account No.</span>
                        <span className="font-bold text-foreground">
                          12345678
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Reference</span>
                        <span className="font-bold text-[#a9cb5b]">
                          {order.orderId}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Link
                    href="/shop"
                    className="w-full py-4 bg-[#a9cb5b] text-white font-bold rounded uppercase tracking-widest text-sm hover:opacity-95 transition-all shadow-lg shadow-[#a9cb5b]/20 flex items-center justify-center gap-2"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    href="/order-tracking"
                    className="w-full py-4 bg-white text-[#1a3014] border-2 border-[#1a3014] font-bold rounded uppercase tracking-widest text-sm hover:bg-[#1a3014] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    Track Your Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
