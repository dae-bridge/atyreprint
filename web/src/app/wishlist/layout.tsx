import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist | AtyrePrint",
  description:
    "View and manage your saved items. Add wishlist products to your cart with one click.",
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
