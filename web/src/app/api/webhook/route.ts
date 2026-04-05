import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

// Disable Next.js body parsing — Stripe needs the raw body for signature verification
export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 },
    );
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `[Stripe] PaymentIntent succeeded: ${paymentIntent.id}`,
        `Amount: ${paymentIntent.amount} ${paymentIntent.currency}`,
      );
      // Order is already created client-side when payment succeeds.
      // This webhook can be used for reconciliation or to update payment status
      // in Firestore if needed via admin SDK.
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error(
        `[Stripe] PaymentIntent failed: ${paymentIntent.id}`,
        paymentIntent.last_payment_error?.message,
      );
      break;
    }

    default:
      // Unhandled event type — log for debugging
      console.log(`[Stripe] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
