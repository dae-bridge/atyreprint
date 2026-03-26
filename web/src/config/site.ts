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
      title: "Worldwide Shipping",
      description: "For all Orders Over $100",
      icon: "Truck",
    },
    {
      title: "Money Back Guarantee",
      description: "Guarantee With In 30 Days",
      icon: "PiggyBank",
    },
    {
      title: "Offers And Discounts",
      description: "Back Returns In 7 Days",
      icon: "BadgePercent",
    },
    {
      title: "24/7 Support Services",
      description: "Contact us Anytime",
      icon: "Headphones",
    },
  ],
  topBarLinks: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
  ],
};

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  featured?: boolean;
  megaMenu?: boolean;
  badge?: string;
  badgeColor?: string;
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  children?: NavChild[];
  badge?: string;
  badgeColor?: string;
}

export const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    megaMenu: true,
    children: [
      {
        label: "Product Types",
        href: "/shop",
        children: [
          { label: "Simple Product", href: "/shop" },
          { label: "Grouped Product", href: "/shop" },
          { label: "Variable Product", href: "/shop", badge: "NEW", badgeColor: "bg-blue-400" },
          { label: "External Product", href: "/shop" },
          { label: "Sale Product", href: "/shop", badge: "SALE", badgeColor: "bg-orange-400" },
          { label: "Upsell Products", href: "/shop" },
          { label: "Cross-Sell Product", href: "/shop" },
        ],
      },
      {
        label: "Our Services",
        href: "/services",
        children: [
          { label: "Embroidery", href: "/services/embroidery" },
          { label: "Screen Printing", href: "/services/screen-printing" },
          { label: "Transfer Printing", href: "/services/transfer-printing", badge: "HOT", badgeColor: "bg-accent" },
          { label: "Sublimation", href: "/services/sublimation" },
          { label: "Bulk Ordering", href: "/services/bulk" },
          { label: "Design Support", href: "/services/design" },
        ],
      },
      {
        label: "Shop Features",
        href: "/shop",
        children: [
          { label: "Stock Progress Bar", href: "/shop" },
          { label: "Color Swatches", href: "/shop" },
          { label: "Size Guide Table", href: "/shop", badge: "POPULAR", badgeColor: "bg-orange-400" },
          { label: "Custom Tab", href: "/shop" },
          { label: "Countdown Timer", href: "/shop" },
          { label: "Product Video", href: "/shop", badge: "FEATURED", badgeColor: "bg-accent" },
        ],
      },
    ],
  },
  {
    label: "Categories",
    href: "/shop",
    megaMenu: true,
    badge: "SALE",
    badgeColor: "bg-accent",
    children: [
      {
        label: "Custom Clothing",
        href: "/shop/clothing",
        children: [
          { label: "T-Shirts", href: "/shop/clothing/t-shirts" },
          { label: "Hoodies", href: "/shop/clothing/hoodies" },
          { label: "Sweatshirts", href: "/shop/clothing/sweatshirts" },
          { label: "Aprons", href: "/shop/clothing/aprons" },
          { label: "Pillowcases", href: "/shop/clothing/pillowcases" },
        ],
      },
      {
        label: "Personalised Gifts",
        href: "/shop/gifts",
        children: [
          { label: "Mugs", href: "/shop/gifts/mugs" },
          { label: "Glass Cans", href: "/shop/gifts/glass-cans" },
          { label: "Tumblers", href: "/shop/gifts/tumblers" },
          { label: "Tote Bags", href: "/shop/gifts/tote-bags" },
          { label: "Custom Embroidery", href: "/shop/gifts/embroidery" },
        ],
      },
      {
        label: "Accessories",
        href: "/shop/accessories",
        children: [
          { label: "Caps & Hats", href: "/shop/accessories/caps" },
          { label: "Bags", href: "/shop/accessories/bags" },
          { label: "Textiles", href: "/shop/accessories/textiles" },
          { label: "Home Decor", href: "/shop/accessories/home" },
          { label: "Office Gifts", href: "/shop/accessories/office" },
        ],
      },
    ],
  },
  {
    label: "Products",
    href: "/shop",
    megaMenu: true,
    badge: "HOT",
    badgeColor: "bg-primary-light",
    children: [
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Best Sellers", href: "/shop?sort=popular" },
    ],
  },
  { label: "Top deals", href: "/shop?tag=deals", megaMenu: true },
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
