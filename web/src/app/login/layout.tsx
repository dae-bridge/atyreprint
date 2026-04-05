import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | AtyrePrint",
  description:
    "Sign in to your AtyrePrint account to manage orders, saved designs, and wishlist items.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
