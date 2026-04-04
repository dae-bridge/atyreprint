"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useAuth } from "@/lib/auth";
import { createOrder, generateOrderNumber } from "@/lib/orders";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  ChevronDown,
  ShoppingBag,
  Lock,
  Truck,
  Loader2,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { PaymentIcons } from "@/components/ui/PaymentIcons";
import { validateCoupon, type CouponResult } from "@/lib/coupon";
import { StripePaymentForm } from "@/components/forms/StripePaymentForm";

interface BillingInfo {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  street1: string;
  street2: string;
  city: string;
  county: string;
  postcode: string;
  phone: string;
  email: string;
  notes: string;
}

const emptyBilling: BillingInfo = {
  firstName: "",
  lastName: "",
  company: "",
  country: "United Kingdom (UK)",
  street1: "",
  street2: "",
  city: "",
  county: "",
  postcode: "",
  phone: "",
  email: "",
  notes: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalItems, clearCart } = useCartStore();
  const { user } = useAuth();
  const [shippingMethod, setShippingMethod] = useState<"flat" | "local">(
    "flat",
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "bank" | "cheque" | "cod"
  >("card");
  const [showCoupon, setShowCoupon] = useState(false);
  const [differentShipping, setDifferentShipping] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState<CouponResult | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [billing, setBilling] = useState<BillingInfo>(emptyBilling);
  const [shippingInfo, setShippingInfo] = useState<BillingInfo>(emptyBilling);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const total = totalPrice();
  const count = totalItems();
  const discountPounds =
    couponResult?.valid && couponResult.discountAmount
      ? couponResult.discountAmount / 100
      : 0;

  // Free shipping logic (Threshold: £100) — same as cart page
  const threshold = 100;
  const remaining = Math.max(0, threshold - total);
  const progress = Math.min((total / threshold) * 100, 100);
  const isFreeShipping = total >= threshold;
  const shippingCost = isFreeShipping ? 0 : shippingMethod === "flat" ? 5 : 0;
  const finalTotal = Math.max(0, total - discountPounds) + shippingCost;
  const finalTotalPence = Math.round(finalTotal * 100);

  // Pre-fill email from auth
  useEffect(() => {
    if (user?.email && !billing.email) {
      setBilling((prev) => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  // Create Stripe PaymentIntent when card is selected and total changes
  useEffect(() => {
    if (paymentMethod !== "card" || finalTotalPence < 50 || count === 0) {
      setClientSecret(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: finalTotalPence }),
        });
        const data = await res.json();
        if (!cancelled && data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      } catch (err) {
        console.error("Failed to create payment intent:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [paymentMethod, finalTotalPence, count]);

  const updateBilling = (field: keyof BillingInfo, value: string) =>
    setBilling((prev) => ({ ...prev, [field]: value }));

  const updateShipping = (field: keyof BillingInfo, value: string) =>
    setShippingInfo((prev) => ({ ...prev, [field]: value }));

  const validateForm = (): string[] => {
    const errors: string[] = [];
    if (!billing.firstName.trim()) errors.push("First name is required");
    if (!billing.lastName.trim()) errors.push("Last name is required");
    if (!billing.street1.trim()) errors.push("Street address is required");
    if (!billing.city.trim()) errors.push("Town / City is required");
    if (!billing.postcode.trim()) errors.push("Postcode is required");
    if (!billing.phone.trim()) errors.push("Phone is required");
    if (!billing.email.trim()) errors.push("Email is required");
    if (!termsAccepted) errors.push("You must accept terms and conditions");
    return errors;
  };

  const createFirestoreOrder = async (
    paymentStatus: string,
    paymentMethodLabel: string,
    stripePaymentIntentId?: string,
  ) => {
    const pence = (n: number) => ({
      amount: Math.round(n * 100),
      currency: "GBP",
    });
    const orderNumber = generateOrderNumber();
    const addr = {
      line1: billing.street1,
      line2: billing.street2 || "",
      city: billing.city,
      county: billing.county || "",
      postcode: billing.postcode,
      country: billing.country,
    };
    const shipAddr = differentShipping
      ? {
          line1: shippingInfo.street1,
          line2: shippingInfo.street2 || "",
          city: shippingInfo.city,
          county: shippingInfo.county || "",
          postcode: shippingInfo.postcode,
          country: shippingInfo.country,
        }
      : addr;

    await createOrder({
      orderNumber,
      customerId: user?.uid || null,
      customerEmail: billing.email,
      customerName: `${billing.firstName} ${billing.lastName}`.trim(),
      customerPhone: billing.phone || "",
      shippingAddress: shipAddr,
      billingAddress: addr,
      items: items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        productImage: item.image,
        sku: "",
        quantity: item.quantity,
        unitPrice: pence(item.price),
        totalPrice: pence(item.price * item.quantity),
        selectedColor: item.color || "",
        selectedOptions: item.variants || [],
      })),
      subtotal: pence(total),
      shippingCost: pence(shippingCost),
      discount: pence(discountPounds),
      tax: { amount: 0, currency: "GBP" },
      total: pence(finalTotal),
      couponCode:
        couponResult?.valid && couponResult.coupon
          ? couponResult.coupon.code
          : null,
      status: "pending",
      paymentStatus: paymentStatus as
        | "pending"
        | "paid"
        | "failed"
        | "refunded",
      paymentMethod: paymentMethodLabel,
      shippingMethod: shippingMethod === "flat" ? "flat_rate" : "local_pickup",
      trackingNumber: null,
      trackingUrl: null,
      statusHistory: [
        { status: "pending", timestamp: new Date().toISOString() },
      ],
      customerNote: billing.notes || "",
      ...(stripePaymentIntentId ? { stripePaymentIntentId } : {}),
    });

    return orderNumber;
  };

  const saveOrderSnapshot = (orderNumber: string) => {
    try {
      sessionStorage.setItem(
        "atyreprint-order-snapshot",
        JSON.stringify({
          orderId: orderNumber,
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            image: item.image,
            price: item.price,
            color: item.color,
            variants: item.variants,
            quantity: item.quantity,
          })),
          subtotal: total,
          shipping: shippingCost,
          discount: discountPounds,
          total: finalTotal,
          date: new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          paymentMethod,
        }),
      );
    } catch {
      /* sessionStorage not available */
    }
  };

  // Card payment success handler
  const handleCardSuccess = async (paymentIntentId: string) => {
    try {
      const orderNumber = await createFirestoreOrder(
        "paid",
        "stripe_card",
        paymentIntentId,
      );
      saveOrderSnapshot(orderNumber);
      clearCart();
      router.push("/order-confirmation?status=success");
    } catch (err) {
      console.error("Failed to create order:", err);
      setPaymentError(
        "Payment succeeded but order creation failed. Please contact support.",
      );
      setProcessing(false);
    }
  };

  // Non-card order (bank transfer, cheque, COD)
  const handleNonCardOrder = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setFormErrors([]);
    setOrderSubmitting(true);
    try {
      const methodMap: Record<string, string> = {
        bank: "bank_transfer",
        cheque: "cheque",
        cod: "cash_on_delivery",
      };
      const orderNumber = await createFirestoreOrder(
        "pending",
        methodMap[paymentMethod] || paymentMethod,
      );
      saveOrderSnapshot(orderNumber);
      clearCart();
      router.push("/order-confirmation?status=success");
    } catch (err) {
      console.error("Failed to create order:", err);
      setPaymentError("Failed to place order. Please try again.");
    } finally {
      setOrderSubmitting(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const result = await validateCoupon(couponCode, Math.round(total * 100));
      setCouponResult(result);
    } catch {
      setCouponResult({ valid: false, error: "Failed to validate coupon." });
    } finally {
      setCouponLoading(false);
    }
  };

  if (count === 0) {
    return (
      <div className="bg-white min-h-screen">
        <PageHeader
          title="Checkout"
          subtitle="Complete your order"
          badge="Secure Checkout"
        />
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShoppingBag
              size={64}
              className="mx-auto mb-6 text-text-secondary opacity-30"
            />
            <h2 className="text-2xl font-bold font-jost mb-4 text-foreground">
              Your cart is empty
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Add some products to your cart before proceeding to checkout.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center px-10 py-4 bg-[#a9cb5b] text-white font-bold rounded uppercase tracking-widest text-sm hover:opacity-90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Checkout"
        subtitle="Complete your order securely"
        badge="Secure Checkout"
      />

      <section className="py-12 md:py-16">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Billing Details */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold font-jost uppercase tracking-widest mb-8 text-[#1a3014] border-b border-border pb-4">
                Billing Details
              </h2>

              {/* Form validation errors */}
              {formErrors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <ul className="space-y-1">
                    {formErrors.map((err, i) => (
                      <li key={i} className="text-sm text-red-600">
                        • {err}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {paymentError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{paymentError}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={billing.firstName}
                      onChange={(e) =>
                        updateBilling("firstName", e.target.value)
                      }
                      className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={billing.lastName}
                      onChange={(e) =>
                        updateBilling("lastName", e.target.value)
                      }
                      className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    Company name (optional)
                  </label>
                  <input
                    type="text"
                    value={billing.company}
                    onChange={(e) => updateBilling("company", e.target.value)}
                    className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    Country / Region <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={billing.country}
                      onChange={(e) => updateBilling("country", e.target.value)}
                      className="w-full h-12 px-4 pr-10 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors appearance-none"
                    >
                      <option>United Kingdom (UK)</option>
                      <option>United States (US)</option>
                      <option>India</option>
                      <option>Ghana</option>
                      <option>Nigeria</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    Street address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="House number and street name"
                    value={billing.street1}
                    onChange={(e) => updateBilling("street1", e.target.value)}
                    className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors placeholder:text-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    value={billing.street2}
                    onChange={(e) => updateBilling("street2", e.target.value)}
                    className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors placeholder:text-gray-300"
                  />
                </div>

                {/* Town / City */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    Town / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={billing.city}
                    onChange={(e) => updateBilling("city", e.target.value)}
                    className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                  />
                </div>

                {/* State / County */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    State / County <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={billing.county}
                      onChange={(e) => updateBilling("county", e.target.value)}
                      className="w-full h-12 px-4 pr-10 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors appearance-none"
                    >
                      <option value="">Select an option...</option>
                      <option>Greater London</option>
                      <option>Accra</option>
                      <option>Gujarat</option>
                      <option>Manchester</option>
                      <option>Birmingham</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                    />
                  </div>
                </div>

                {/* Postcode */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    Postcode / ZIP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={billing.postcode}
                    onChange={(e) => updateBilling("postcode", e.target.value)}
                    className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                  />
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={billing.phone}
                      onChange={(e) => updateBilling("phone", e.target.value)}
                      className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={billing.email}
                      onChange={(e) => updateBilling("email", e.target.value)}
                      className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                    />
                  </div>
                </div>

                {/* Create Account Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer group pt-2">
                  <input type="checkbox" className="w-4 h-4 accent-[#a9cb5b]" />
                  <span className="text-sm text-text-secondary group-hover:text-foreground transition-colors">
                    Create an account?
                  </span>
                </label>

                {/* Ship to Different Address */}
                <div className="pt-6 border-t border-border mt-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={differentShipping}
                      onChange={() => setDifferentShipping(!differentShipping)}
                      className="w-4 h-4 accent-[#a9cb5b]"
                    />
                    <span className="text-lg font-bold font-jost uppercase tracking-widest text-[#1a3014] group-hover:text-[#a9cb5b] transition-colors">
                      Ship to a different address?
                    </span>
                  </label>

                  {differentShipping && (
                    <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                            First name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={shippingInfo.firstName}
                            onChange={(e) =>
                              updateShipping("firstName", e.target.value)
                            }
                            className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                            Last name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={shippingInfo.lastName}
                            onChange={(e) =>
                              updateShipping("lastName", e.target.value)
                            }
                            className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                          Company name (optional)
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.company}
                          onChange={(e) =>
                            updateShipping("company", e.target.value)
                          }
                          className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                          Country / Region{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={shippingInfo.country}
                            onChange={(e) =>
                              updateShipping("country", e.target.value)
                            }
                            className="w-full h-12 px-4 pr-10 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors appearance-none"
                          >
                            <option>United Kingdom (UK)</option>
                            <option>United States (US)</option>
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                          Street address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="House number and street name"
                          value={shippingInfo.street1}
                          onChange={(e) =>
                            updateShipping("street1", e.target.value)
                          }
                          className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors placeholder:text-gray-300"
                        />
                        <input
                          type="text"
                          placeholder="Apartment, suite, unit, etc. (optional)"
                          value={shippingInfo.street2}
                          onChange={(e) =>
                            updateShipping("street2", e.target.value)
                          }
                          className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors placeholder:text-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                          Town / City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            updateShipping("city", e.target.value)
                          }
                          className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                          Postcode / ZIP <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.postcode}
                          onChange={(e) =>
                            updateShipping("postcode", e.target.value)
                          }
                          className="w-full h-12 px-4 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Notes */}
                <div className="space-y-2 pt-6 border-t border-border mt-6">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    Order notes (optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    value={billing.notes}
                    onChange={(e) => updateBilling("notes", e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b] transition-colors placeholder:text-gray-300 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
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
                  Your Order
                </h2>

                {/* Order Items Header */}
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-text-secondary pb-3 border-b border-border">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-border">
                  {items.map((item) => {
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

                {/* Subtotal */}
                <div className="flex justify-between items-center py-4 border-t border-border">
                  <span className="text-sm font-bold font-jost uppercase tracking-wider text-text-secondary">
                    Subtotal
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="py-4 border-t border-border">
                  <span className="block text-sm font-bold font-jost uppercase tracking-wider text-text-secondary mb-3">
                    Shipping
                  </span>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="checkout-shipping"
                          checked={shippingMethod === "flat"}
                          onChange={() => setShippingMethod("flat")}
                          className="w-4 h-4 accent-[#a9cb5b]"
                        />
                        <span className="text-sm text-foreground group-hover:text-[#a9cb5b] transition-colors">
                          Flat rate
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[#a9cb5b]">
                        £5.00
                      </span>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="checkout-shipping"
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
                </div>

                {/* Total */}
                <div className="py-5 border-t-2 border-border space-y-3">
                  {discountPounds > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-green-600">
                        Discount ({couponResult?.coupon?.code})
                      </span>
                      <span className="font-bold text-green-600">
                        -{formatPrice(discountPounds)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold font-jost uppercase tracking-widest text-[#1a3014]">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#a9cb5b]">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Coupon Code (below total) */}
                <div className="py-4 border-t border-border">
                  <button
                    onClick={() => setShowCoupon(!showCoupon)}
                    className="text-sm font-semibold text-[#a9cb5b] hover:underline transition-all flex items-center gap-2"
                  >
                    {showCoupon
                      ? "Hide coupon"
                      : "Have a coupon? Click to enter code"}
                  </button>
                  {showCoupon && (
                    <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyCoupon()
                          }
                          className="flex-1 h-10 px-3 border border-border rounded bg-white text-sm focus:outline-none focus:border-[#a9cb5b]"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          disabled={couponLoading}
                          className="px-5 h-10 bg-[#a9cb5b] text-white font-bold rounded uppercase tracking-widest text-[10px] hover:opacity-90 transition-colors disabled:opacity-50"
                        >
                          {couponLoading ? "..." : "Apply"}
                        </button>
                      </div>
                      {couponResult && !couponResult.valid && (
                        <p className="text-red-500 text-xs">
                          {couponResult.error}
                        </p>
                      )}
                      {couponResult?.valid && couponResult.coupon && (
                        <p className="text-green-600 text-xs font-medium">
                          ✓ {couponResult.coupon.code} applied!
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Payment Methods */}
                <div className="pt-4 border-t border-border">
                  <div className="space-y-3">
                    {/* Credit / Debit Card (Stripe) */}
                    <div
                      className={`border rounded-lg overflow-hidden transition-all ${paymentMethod === "card" ? "border-[#a9cb5b] bg-white" : "border-border"}`}
                    >
                      <label className="flex items-center gap-3 p-4 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="w-4 h-4 accent-[#a9cb5b] flex-shrink-0"
                        />
                        <div className="flex items-center gap-2 flex-1">
                          <CreditCard size={18} className="text-[#1a3014]" />
                          <span className="text-sm font-bold text-foreground">
                            Credit / Debit Card
                          </span>
                        </div>
                      </label>
                      {paymentMethod === "card" && (
                        <div className="px-4 pb-4 pt-0 animate-in fade-in duration-200">
                          {clientSecret ? (
                            <StripePaymentForm
                              clientSecret={clientSecret}
                              onSuccess={async (paymentIntentId) => {
                                const errors = validateForm();
                                if (errors.length > 0) {
                                  setFormErrors(errors);
                                  setProcessing(false);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                  return;
                                }
                                setFormErrors([]);
                                await handleCardSuccess(paymentIntentId);
                              }}
                              onError={(msg) => setPaymentError(msg)}
                              processing={processing}
                              setProcessing={setProcessing}
                            />
                          ) : (
                            <div className="flex items-center justify-center py-6">
                              <Loader2
                                size={20}
                                className="animate-spin text-[#a9cb5b] mr-2"
                              />
                              <span className="text-sm text-text-secondary">
                                Loading payment form...
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Direct Bank Transfer */}
                    <div
                      className={`border rounded-lg overflow-hidden transition-all ${paymentMethod === "bank" ? "border-[#a9cb5b] bg-white" : "border-border"}`}
                    >
                      <label className="flex items-center gap-3 p-4 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "bank"}
                          onChange={() => setPaymentMethod("bank")}
                          className="w-4 h-4 accent-[#a9cb5b] flex-shrink-0"
                        />
                        <div className="flex items-center gap-2 flex-1">
                          <Banknote size={18} className="text-[#1a3014]" />
                          <span className="text-sm font-bold text-foreground">
                            Direct bank transfer
                          </span>
                        </div>
                      </label>
                      {paymentMethod === "bank" && (
                        <div className="px-4 pb-4 pt-0 animate-in fade-in duration-200">
                          <p className="text-[12px] text-text-secondary leading-relaxed bg-[#f8f9fa] p-3 rounded-lg border border-border-light">
                            Make your payment directly into our bank account.
                            Please use your Order ID as the payment reference.
                            Your order will not be shipped until the funds have
                            cleared in our account.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Cheque Payment */}
                    <div
                      className={`border rounded-lg overflow-hidden transition-all ${paymentMethod === "cheque" ? "border-[#a9cb5b] bg-white" : "border-border"}`}
                    >
                      <label className="flex items-center gap-3 p-4 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "cheque"}
                          onChange={() => setPaymentMethod("cheque")}
                          className="w-4 h-4 accent-[#a9cb5b] flex-shrink-0"
                        />
                        <div className="flex items-center gap-2 flex-1">
                          <CreditCard size={18} className="text-[#1a3014]" />
                          <span className="text-sm font-bold text-foreground">
                            Check payments
                          </span>
                        </div>
                      </label>
                      {paymentMethod === "cheque" && (
                        <div className="px-4 pb-4 pt-0 animate-in fade-in duration-200">
                          <p className="text-[12px] text-text-secondary leading-relaxed bg-[#f8f9fa] p-3 rounded-lg border border-border-light">
                            Please send your cheque to Store Name, Store Street,
                            Store Town, Store State / County, Store Postcode.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Cash on Delivery */}
                    <div
                      className={`border rounded-lg overflow-hidden transition-all ${paymentMethod === "cod" ? "border-[#a9cb5b] bg-white" : "border-border"}`}
                    >
                      <label className="flex items-center gap-3 p-4 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="w-4 h-4 accent-[#a9cb5b] flex-shrink-0"
                        />
                        <div className="flex items-center gap-2 flex-1">
                          <Banknote size={18} className="text-[#1a3014]" />
                          <span className="text-sm font-bold text-foreground">
                            Cash on delivery
                          </span>
                        </div>
                      </label>
                      {paymentMethod === "cod" && (
                        <div className="px-4 pb-4 pt-0 animate-in fade-in duration-200">
                          <p className="text-[12px] text-text-secondary leading-relaxed bg-[#f8f9fa] p-3 rounded-lg border border-border-light">
                            Pay with cash upon delivery.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Privacy Notice */}
                <p className="text-[11px] text-text-secondary mt-6 leading-relaxed">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#a9cb5b] hover:underline"
                  >
                    privacy policy
                  </Link>
                  .
                </p>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 accent-[#a9cb5b] mt-0.5 flex-shrink-0"
                  />
                  <span className="text-[11px] text-text-secondary leading-relaxed group-hover:text-foreground transition-colors">
                    I have read and agree to the website{" "}
                    <Link
                      href="/terms"
                      className="text-[#a9cb5b] hover:underline"
                    >
                      terms and conditions
                    </Link>{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>

                {/* Place Order Button (for non-card methods) */}
                {paymentMethod !== "card" && (
                  <button
                    onClick={handleNonCardOrder}
                    disabled={orderSubmitting}
                    className="w-full mt-6 py-5 bg-[#a9cb5b] text-white font-bold rounded uppercase tracking-widest text-sm hover:opacity-95 transition-all shadow-lg shadow-[#a9cb5b]/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {orderSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        Place Order
                      </>
                    )}
                  </button>
                )}

                {/* Trust Badges */}
                <div className="pt-6 text-center border-t border-border mt-6">
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
      </section>
    </div>
  );
}
