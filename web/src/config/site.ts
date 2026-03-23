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
      icon: "Scissors",
    },
    {
      title: "Printing",
      description:
        "Vibrant prints on clothing, glassware, ceramics, leather, and more.",
      icon: "Printer",
    },
    {
      title: "Design",
      description:
        "We bring your vision to life with stunning graphics and layouts.",
      icon: "Palette",
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
  trustStats: [
    { value: "5+", label: "Years Experience" },
    { value: "3", label: "Continents Served" },
    { value: "10+", label: "Product Types" },
    { value: "100%", label: "Quality Guaranteed" },
  ],
  featureBadges: [
    {
      title: "Free UK Shipping",
      description: "On orders over £50",
      icon: "Truck",
    },
    {
      title: "Quality Guarantee",
      description: "Premium materials always",
      icon: "ShieldCheck",
    },
    {
      title: "Fast Turnaround",
      description: "Quick production & delivery",
      icon: "Zap",
    },
    {
      title: "24/7 Support",
      description: "Email us anytime",
      icon: "Headphones",
    },
  ],
} as const;

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  featured?: boolean;
  megaMenu?: boolean;
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  children?: NavChild[];
}

export const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    megaMenu: true,
    children: [
      {
        label: "Clothing",
        href: "/shop/clothing",
        children: [
          { label: "T-Shirts", href: "/shop/clothing/t-shirts" },
          { label: "Hoodies", href: "/shop/clothing/hoodies" },
          { label: "Sweatshirts", href: "/shop/clothing/sweatshirts" },
          { label: "Aprons", href: "/shop/clothing/aprons" },
        ],
      },
      {
        label: "Accessories",
        href: "/shop/accessories",
        children: [
          { label: "Caps", href: "/shop/accessories/caps" },
          { label: "Tote Bags", href: "/shop/accessories/tote-bags" },
        ],
      },
      {
        label: "Drinkware",
        href: "/shop/drinkware",
        children: [
          { label: "Mugs", href: "/shop/drinkware/mugs" },
          { label: "Glass Cans", href: "/shop/drinkware/glass-cans" },
          { label: "Tumblers", href: "/shop/drinkware/tumblers" },
        ],
      },
      {
        label: "Home & Living",
        href: "/shop/home-living",
        children: [
          { label: "Pillowcases", href: "/shop/home-living/pillowcases" },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Embroidery",
        href: "/services/embroidery",
        description: "Personalise fabric items with logos, names, or designs",
      },
      {
        label: "Printing",
        href: "/services/printing",
        description: "Vibrant prints on clothing, glassware, ceramics & more",
      },
      {
        label: "Design",
        href: "/services/design",
        description: "Stunning graphics and layouts brought to life",
      },
    ],
  },
  {
    label: "Personalise It",
    href: "/personalise-it",
    featured: true,
  },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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
