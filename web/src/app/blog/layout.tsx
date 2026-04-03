import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | AtyrePrint",
  description:
    "Tips, trends, and inspiration for custom clothing, embroidery techniques, and personalised gift ideas from the AtyrePrint team.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
