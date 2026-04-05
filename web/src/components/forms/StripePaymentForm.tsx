"use client";

import { useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import { Lock, Loader2 } from "lucide-react";

// ─── Inner form (must be inside <Elements>) ──────────────────────────────
interface CheckoutFormProps {
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
  processing: boolean;
  setProcessing: (v: boolean) => void;
}

function CheckoutForm({
  onSuccess,
  onError,
  processing,
  setProcessing,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    onError("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
      redirect: "if_required",
    });

    if (error) {
      onError(error.message || "Payment failed. Please try again.");
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent.id);
    } else {
      // Payment requires additional action or is processing
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full mt-6 py-5 bg-[#a9cb5b] text-white font-bold rounded uppercase tracking-widest text-sm hover:opacity-95 transition-all shadow-lg shadow-[#a9cb5b]/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock size={16} />
            Pay Now
          </>
        )}
      </button>
    </form>
  );
}

// ─── Wrapper that initialises Elements with clientSecret ─────────────────
interface StripePaymentFormProps {
  clientSecret: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
  processing: boolean;
  setProcessing: (v: boolean) => void;
}

export function StripePaymentForm({
  clientSecret,
  onSuccess,
  onError,
  processing,
  setProcessing,
}: StripePaymentFormProps) {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#a9cb5b",
            colorBackground: "#ffffff",
            colorText: "#1a1a1a",
            borderRadius: "6px",
            fontFamily: "Inter, system-ui, sans-serif",
          },
        },
      }}
    >
      <CheckoutForm
        onSuccess={onSuccess}
        onError={onError}
        processing={processing}
        setProcessing={setProcessing}
      />
    </Elements>
  );
}
