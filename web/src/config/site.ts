export const siteConfig = {
  name: "AtyrePrint",
  tagline: "Custom Clothing & Gifts that Speak for You",
  description:
    "Premium print-on-demand and embroidery services. Custom t-shirts, hoodies, mugs, tote bags, caps & more. Serving the UK, Africa & Europe with 5+ years of quality craftsmanship.",
  url: "https://atyreprint.com",
  ogImage: "/images/og/og-default.jpg",
  contact: {
    email: "info@atyreprint.com",
    phone: "+44 7309 503295",
    address: "Notting Hill, London, United Kingdom, UB1 1JY",
  },
  social: {
    facebook: "https://web.facebook.com/AtyreEmb",
    instagram: "https://www.instagram.com/atyreembroidery/",
  },
  businessHours: {
    weekdays: "8am – 5pm",
    weekend: "Closed",
  },
  services: [
    {
      title: "Embroidery",
      description: "Personalise fabric items with logos, names, or designs.",
    },
    {
      title: "Printing",
      description:
        "Vibrant prints on clothing, glassware, ceramics, leather, and more.",
    },
    {
      title: "Design",
      description:
        "We bring your vision to life with stunning graphics and layouts.",
    },
  ],
  products: [
    "T-Shirts",
    "Hoodies",
    "Sweatshirts",
    "Tote Bags",
    "Aprons",
    "Mugs",
    "Glass Cans",
    "Tumblers",
    "Caps",
    "Pillowcases",
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Personalise It", href: "/personalise-it" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  helpAndSupport: [
    { label: "FAQs", href: "/faqs" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Order Tracking", href: "/order-tracking" },
  ],
  legalAndPolicies: [
    { label: "About Us", href: "/about" },
    { label: "Cookies & Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Returns Policy", href: "/returns" },
  ],
  quickLinks: [
    { label: "Shop All", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Best Sellers", href: "/shop?sort=popular" },
    { label: "Custom Orders", href: "/personalise-it" },
  ],
} as const;
