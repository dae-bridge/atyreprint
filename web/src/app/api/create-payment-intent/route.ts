import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = "gbp", metadata = {} } = body;

    // Validate amount (in pence, minimum 50p for GBP)
    if (!amount || typeof amount !== "number" || amount < 50) {
      return NextResponse.json(
        { error: "Invalid amount. Minimum charge is £0.50." },
        { status: 400 },
      );
    }

    // Cap at reasonable maximum (£99,999.99)
    if (amount > 9999999) {
      return NextResponse.json(
        { error: "Amount exceeds maximum allowed." },
        { status: 400 },
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        ...metadata,
        source: "atyreprint-web",
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    console.error("Error creating payment intent:", err);
    return NextResponse.json(
      { error: "Failed to create payment intent." },
      { status: 500 },
    );
  }
}
