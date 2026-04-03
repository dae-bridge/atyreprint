import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order | AtyrePrint",
  description:
    "Track your AtyrePrint order status using your order number and email address.",
};

export default function OrderTrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
