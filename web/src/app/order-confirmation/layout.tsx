import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed | AtyrePrint",
  description:
    "Thank you for your order! Your custom print order has been confirmed and is being processed.",
};

export default function OrderConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
