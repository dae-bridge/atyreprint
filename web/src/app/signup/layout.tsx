import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | AtyrePrint",
  description:
    "Create your free AtyrePrint account to order custom printed and embroidered clothing, save designs, and track your orders.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
