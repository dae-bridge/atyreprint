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
        label: "Our Services",
        href: "/services",
        children: [
          { label: "Embroidery", href: "/services/embroidery" },
          { label: "Screen Printing", href: "/services/screen-printing" },
          { label: "Bulk Ordering", href: "/services/bulk" },
          { label: "Design Support", href: "/services/design" },
        ],
      },
      {
        label: "Best Selling",
        href: "/shop?sort=bestselling",
        children: [
          { label: "Eco-Friendly T-Shirt", href: "/shop/product/custom-printed-tshirt" },
          { label: "Premium Hoodie", href: "/shop/product/embroidered-hoodie" },
          { label: "Custom Ceramic Mug", href: "/shop/product/personalised-mug" },
          { label: "Printed Tote Bag", href: "/shop/product/custom-tote-bag", badge: "POPULAR", badgeColor: "bg-orange-400" },
        ],
      },
      {
        label: "Trending",
        href: "/shop?sort=trending",
        children: [
          { label: "Branded Snapback", href: "/shop/product/branded-snapback-cap", badge: "NEW", badgeColor: "bg-blue-400" },
          { label: "Personalised Pillowcase", href: "/shop/product/personalised-pillowcase" },
          { label: "Custom Tumbler", href: "/shop/product/custom-tumbler", badge: "HOT", badgeColor: "bg-accent" },
          { label: "Embroidered Sweatshirt", href: "/shop/product/embroidered-sweatshirt" },
        ],
      },
      {
        label: "Popular",
        href: "/shop?sort=popular",
        children: [
          { label: "Custom Glass Can", href: "/shop/product/custom-glass-can" },
          { label: "Tote Bags", href: "/shop/accessories/tote-bags" },
          { label: "Custom Aprons", href: "/shop/product/custom-apron" },
          { label: "Mugs Collection", href: "/shop/drinkware/mugs", badge: "SALE", badgeColor: "bg-accent" },
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
        ],
      },
      {
        label: "Drinkware & Gifts",
        href: "/shop/drinkware",
        children: [
          { label: "Mugs", href: "/shop/drinkware/mugs" },
          { label: "Glass Cans", href: "/shop/drinkware/glass-cans" },
          { label: "Tumblers", href: "/shop/drinkware/tumblers" },
          { label: "Pillowcases", href: "/shop/home-living/pillowcases" },
        ],
      },
      {
        label: "Accessories",
        href: "/shop/accessories",
        children: [
          { label: "Caps & Hats", href: "/shop/accessories/caps" },
          { label: "Tote Bags", href: "/shop/accessories/tote-bags" },
        ],
      },
    ],
  },
  { label: "Top deals", href: "/shop?tag=deals", megaMenu: true },
  {
    label: "Personalise",
    href: "/personalise-it",
    megaMenu: true,
    badge: "HOT",
    badgeColor: "bg-primary-light",
    children: [
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Best Sellers", href: "/shop?sort=popular" },
    ],
  },
  { label: "Design your own", href: "/personalise-it" },
];

export const footerLinks = {
  helpAndSupport: [
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Order Tracking", href: "/order-tracking" },
  ],
  legalAndPolicies: [
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Returns Policy", href: "/returns" },
  ],
  quickLinks: [
    { label: "Shop All", href: "/shop" },
    { label: "Custom Orders", href: "/personalise-it" },
    { label: "My Account", href: "/account" },
  ],
} as const;
