import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | AtyrePrint",
  description:
    "Manage your AtyrePrint account — view orders, saved designs, addresses, and account settings.",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
