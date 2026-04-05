"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  Search,
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import { trackOrder } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";

const statusSteps: {
  status: OrderStatus;
  icon: typeof CheckCircle2;
  label: string;
}[] = [
  { status: "pending", icon: CheckCircle2, label: "Order Placed" },
  { status: "processing", icon: Package, label: "Processing" },
  { status: "shipped", icon: Truck, label: "Shipped" },
  { status: "delivered", icon: MapPin, label: "Delivered" },
];

function getStepIndex(status: OrderStatus): number {
  const map: Record<string, number> = {
    pending: 0,
    confirmed: 0,
    processing: 1,
    printing: 1,
    shipped: 2,
    delivered: 3,
  };
  return map[status] ?? 0;
}

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) return;
    setLoading(true);
    setError("");
    setOrder(null);
    setSearched(true);

    try {
      const result = await trackOrder(orderNumber, email);
      if (result) {
        setOrder(result);
      } else {
        setError(
          "No order found. Please check your order number and email address.",
        );
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order ? getStepIndex(order.status) : 0;
  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Order Tracking"
        subtitle="Check the status of your order."
        badge="Track Order"
      />

      <section className="py-16 md:py-20 bg-[#f8f9fa]">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Tracking Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl border border-border p-8 md:p-10">
                <h2 className="text-xl font-bold font-jost uppercase tracking-widest text-[#1a3014] mb-2 border-b border-border pb-4">
                  Track Your Order
                </h2>
                <p className="text-sm text-text-secondary mb-8 mt-4">
                  Enter your order number and email address to view your order
                  status and delivery updates.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="orderNumber"
                      className="text-[11px] font-bold uppercase tracking-wider text-text-secondary"
                    >
                      Order Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="orderNumber"
                      name="orderNumber"
                      type="text"
                      required
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                      placeholder="e.g. AP-20260327-001"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="trackEmail"
                      className="text-[11px] font-bold uppercase tracking-wider text-text-secondary"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="trackEmail"
                      name="trackEmail"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                      placeholder="The email used when placing your order"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#a9cb5b] text-white font-bold rounded uppercase tracking-widest text-sm hover:opacity-95 transition-all shadow-lg shadow-[#a9cb5b]/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Search size={18} />
                    )}
                    {loading ? "Searching..." : "Track Order"}
                  </button>
                </form>

                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}

                {order && (
                  <div className="mt-8 border-t border-border pt-6">
                    <h3 className="text-base font-bold font-jost uppercase tracking-widest text-[#1a3014] mb-4">
                      Order #{order.orderNumber}
                    </h3>

                    {/* Status Timeline */}
                    <div className="flex items-center justify-between mb-6">
                      {statusSteps.map((step, idx) => (
                        <div
                          key={step.label}
                          className="flex items-center flex-1"
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${idx <= currentStep ? "bg-[#a9cb5b] text-white" : "bg-gray-100 text-text-muted"}`}
                            >
                              <step.icon size={18} />
                            </div>
                            <span
                              className={`text-[9px] font-bold uppercase tracking-widest mt-1.5 ${idx <= currentStep ? "text-[#1a3014]" : "text-text-muted"}`}
                            >
                              {step.label}
                            </span>
                          </div>
                          {idx < statusSteps.length - 1 && (
                            <div
                              className={`flex-1 h-0.5 mx-2 mt-[-18px] ${idx < currentStep ? "bg-[#a9cb5b]" : "bg-gray-200"}`}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Order Details */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Status</span>
                        <span className="font-bold capitalize text-foreground">
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Total</span>
                        <span className="font-bold text-[#a9cb5b]">
                          {formatPrice(order.total.amount / 100)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Items</span>
                        <span className="font-bold text-foreground">
                          {order.items.length}
                        </span>
                      </div>
                      {order.trackingNumber && (
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Tracking</span>
                          {order.trackingUrl ? (
                            <a
                              href={order.trackingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-[#a9cb5b] hover:underline"
                            >
                              {order.trackingNumber}
                            </a>
                          ) : (
                            <span className="font-bold text-foreground">
                              {order.trackingNumber}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-text-secondary mt-6 text-center leading-relaxed">
                  Order tracking is available once your order has been
                  dispatched. For urgent enquiries, please{" "}
                  <a
                    href="/contact"
                    className="text-[#a9cb5b] font-semibold hover:underline transition-colors"
                  >
                    contact us
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Right Column: Info & Help */}
            <div className="lg:col-span-5 space-y-6">
              {/* How It Works */}
              <div className="bg-white rounded-xl border border-border p-8">
                <h3 className="text-lg font-bold font-jost uppercase tracking-widest text-[#1a3014] mb-6 border-b border-border pb-4">
                  How It Works
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: CheckCircle2,
                      title: "Order Placed",
                      desc: "Your order is confirmed and being prepared.",
                    },
                    {
                      icon: Package,
                      title: "Processing",
                      desc: "We're custom printing/embroidering your items.",
                    },
                    {
                      icon: Truck,
                      title: "Shipped",
                      desc: "Your order is on its way! Track it in real-time.",
                    },
                    {
                      icon: MapPin,
                      title: "Delivered",
                      desc: "Your items have arrived. Enjoy!",
                    },
                  ].map((step, idx) => (
                    <div key={step.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#a9cb5b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <step.icon size={18} className="text-[#a9cb5b]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">
                          {step.title}
                        </h4>
                        <p className="text-[12px] text-text-secondary mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help? */}
              <div className="bg-gradient-to-br from-[#1a3014] to-[#2d4a24] rounded-xl p-8 text-white">
                <h3 className="text-lg font-bold font-jost uppercase tracking-widest mb-4">
                  Need Help?
                </h3>
                <p className="text-sm text-white/70 mb-6 leading-relaxed">
                  Can&apos;t find your order or need assistance? Our support
                  team is here to help.
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:support@atyreprint.com"
                    className="flex items-center gap-3 text-sm text-white/90 hover:text-[#a9cb5b] transition-colors"
                  >
                    <Mail size={16} />
                    support@atyreprint.com
                  </a>
                  <a
                    href="tel:+447309503295"
                    className="flex items-center gap-3 text-sm text-white/90 hover:text-[#a9cb5b] transition-colors"
                  >
                    <Phone size={16} />
                    +44 7309 503295
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
