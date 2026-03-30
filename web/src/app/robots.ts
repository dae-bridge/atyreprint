import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/account",
          "/cart",
          "/checkout",
          "/order-confirmation",
          "/order-tracking",
          "/login",
          "/signup",
          "/forgot-password",
          "/wishlist",
        ],
      },
    ],
    sitemap: "https://atyreprint.com/sitemap.xml",
  };
}
