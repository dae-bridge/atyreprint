import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | AtyrePrint",
  description:
    "Reset your AtyrePrint account password. Enter your email and we'll send you a link to set a new password.",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
