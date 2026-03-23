export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductVariant {
  label: string;
  options: string[];
}

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  images: string[];
  category: string;
  colors: ProductColor[];
  variants: ProductVariant[];
  features: string[];
  inStock: boolean;
  badge?: string;
}

export const products: ProductData[] = [
  {
    id: "1",
    slug: "custom-printed-tshirt",
    name: "Custom Printed T-Shirt",
    price: 19.99,
    compareAtPrice: 24.99,
    description:
      "Premium quality custom printed t-shirt. Made from 100% ring-spun cotton for a soft, comfortable feel. Perfect for custom designs, logos, team events, or personalised gifts. Available in multiple colours and sizes.",
    images: [
      "/images/products/custom-printed-tshirt/main.jpg",
      "/images/products/custom-printed-tshirt/thumb-1.jpg",
      "/images/products/custom-printed-tshirt/thumb-2.jpg",
      "/images/products/custom-printed-tshirt/thumb-3.jpg",
    ],
    category: "T-Shirts",
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Red", hex: "#DC2626" },
      { name: "Forest Green", hex: "#3D6B1E" },
      { name: "Grey Marl", hex: "#9CA3AF" },
    ],
    variants: [
      { label: "Size", options: ["XS", "S", "M", "L", "XL", "2XL", "3XL"] },
    ],
    features: [
      "100% ring-spun cotton (180 GSM)",
      "Pre-shrunk fabric",
      "DTG (Direct-to-Garment) printing",
      "Wash-resistant vivid colours",
      "Unisex relaxed fit",
    ],
    inStock: true,
    badge: "New",
  },
  {
    id: "2",
    slug: "embroidered-hoodie",
    name: "Embroidered Hoodie",
    price: 39.99,
    compareAtPrice: 49.99,
    description:
      "Cosy and durable embroidered hoodie with a premium feel. Double-lined hood, front pouch pocket, and ribbed cuffs. Ideal for branded workwear, team kits, or personalised gifts.",
    images: [
      "/images/products/embroidered-hoodie/main.jpg",
      "/images/products/embroidered-hoodie/thumb-1.jpg",
      "/images/products/embroidered-hoodie/thumb-2.jpg",
      "/images/products/embroidered-hoodie/thumb-3.jpg",
    ],
    category: "Hoodies",
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Charcoal", hex: "#374151" },
      { name: "Burgundy", hex: "#7F1D1D" },
      { name: "Forest Green", hex: "#3D6B1E" },
    ],
    variants: [{ label: "Size", options: ["S", "M", "L", "XL", "2XL"] }],
    features: [
      "80% cotton / 20% polyester (300 GSM)",
      "Double-lined hood with drawstring",
      "Precision embroidery up to 15,000 stitches",
      "Front pouch pocket",
      "Ribbed cuffs & hem",
    ],
    inStock: true,
    badge: "Popular",
  },
  {
    id: "3",
    slug: "personalised-mug",
    name: "Personalised Ceramic Mug",
    price: 12.99,
    description:
      "High-quality white ceramic mug with full-colour custom printing. Dishwasher and microwave safe. Perfect for photo gifts, branded merchandise, or personalised presents.",
    images: [
      "/images/products/personalised-mug/main.jpg",
      "/images/products/personalised-mug/thumb-1.jpg",
      "/images/products/personalised-mug/thumb-2.jpg",
      "/images/products/personalised-mug/thumb-3.jpg",
    ],
    category: "Mugs",
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    variants: [{ label: "Size", options: ["11oz", "15oz"] }],
    features: [
      "Premium AAA-grade ceramic",
      "Sublimation full-wrap printing",
      "Dishwasher & microwave safe",
      "Glossy finish",
      "Individually boxed",
    ],
    inStock: true,
  },
  {
    id: "4",
    slug: "custom-tote-bag",
    name: "Custom Tote Bag",
    price: 14.99,
    description:
      "Eco-friendly cotton canvas tote bag with custom print or embroidery. Strong handles and generous capacity. Great for shopping, events, and promotional giveaways.",
    images: [
      "/images/products/custom-tote-bag/main.jpg",
      "/images/products/custom-tote-bag/thumb-1.jpg",
      "/images/products/custom-tote-bag/thumb-2.jpg",
      "/images/products/custom-tote-bag/thumb-3.jpg",
    ],
    category: "Tote Bags",
    colors: [
      { name: "Natural", hex: "#F5F0E1" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    variants: [],
    features: [
      "100% natural cotton canvas (170 GSM)",
      "Reinforced stitched handles",
      "38cm x 42cm generous size",
      "Print or embroidery options",
      "Machine washable",
    ],
    inStock: true,
  },
  {
    id: "5",
    slug: "branded-snapback-cap",
    name: "Branded Snapback Cap",
    price: 16.99,
    description:
      "Classic snapback cap with embroidered branding. Structured 6-panel design with flat peak and adjustable snap closure. Perfect for uniforms, teams, and street style.",
    images: [
      "/images/products/branded-snapback-cap/main.jpg",
      "/images/products/branded-snapback-cap/thumb-1.jpg",
      "/images/products/branded-snapback-cap/thumb-2.jpg",
      "/images/products/branded-snapback-cap/thumb-3.jpg",
    ],
    category: "Caps",
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Red", hex: "#DC2626" },
      { name: "Grey", hex: "#6B7280" },
    ],
    variants: [],
    features: [
      "Structured 6-panel design",
      "Flat peak with green undervisor",
      "Precision front embroidery",
      "Adjustable snap closure",
      "One size fits most",
    ],
    inStock: true,
    badge: "New",
  },
  {
    id: "6",
    slug: "custom-glass-can",
    name: "Custom Glass Can",
    price: 15.99,
    description:
      "Trendy glass can tumbler with bamboo lid and reusable straw. UV-printed with your custom design. Ideal for iced coffee, smoothies, and gift sets.",
    images: [
      "/images/products/custom-glass-can/main.jpg",
      "/images/products/custom-glass-can/thumb-1.jpg",
      "/images/products/custom-glass-can/thumb-2.jpg",
      "/images/products/custom-glass-can/thumb-3.jpg",
    ],
    category: "Glass Cans",
    colors: [
      { name: "Clear", hex: "#E8E8E8" },
      { name: "Frosted", hex: "#D4D4D4" },
    ],
    variants: [{ label: "Size", options: ["16oz", "20oz"] }],
    features: [
      "Borosilicate glass (heat resistant)",
      "Bamboo lid included",
      "Reusable glass straw",
      "UV-printed full-colour design",
      "Hand wash recommended",
    ],
    inStock: true,
  },
  {
    id: "7",
    slug: "embroidered-sweatshirt",
    name: "Embroidered Sweatshirt",
    price: 34.99,
    compareAtPrice: 42.99,
    description:
      "Classic crewneck sweatshirt with premium embroidery. Brushed fleece interior for ultimate comfort. Perfect for casual branding, gifting, or personal style.",
    images: [
      "/images/products/embroidered-sweatshirt/main.jpg",
      "/images/products/embroidered-sweatshirt/thumb-1.jpg",
      "/images/products/embroidered-sweatshirt/thumb-2.jpg",
      "/images/products/embroidered-sweatshirt/thumb-3.jpg",
    ],
    category: "Sweatshirts",
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Grey Marl", hex: "#9CA3AF" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Sand", hex: "#D2B48C" },
    ],
    variants: [{ label: "Size", options: ["S", "M", "L", "XL", "2XL"] }],
    features: [
      "80% cotton / 20% polyester (280 GSM)",
      "Brushed fleece interior",
      "Ribbed crewneck, cuffs & hem",
      "Embroidery up to 10,000 stitches",
      "Relaxed unisex fit",
    ],
    inStock: true,
    badge: "Popular",
  },
  {
    id: "8",
    slug: "personalised-pillowcase",
    name: "Personalised Pillowcase",
    price: 18.99,
    description:
      "Soft white pillowcase with custom full-colour print. Great for photo gifts, birthdays, and home decor. Sublimation printed for vivid, long-lasting designs.",
    images: [
      "/images/products/personalised-pillowcase/main.jpg",
      "/images/products/personalised-pillowcase/thumb-1.jpg",
      "/images/products/personalised-pillowcase/thumb-2.jpg",
      "/images/products/personalised-pillowcase/thumb-3.jpg",
    ],
    category: "Pillowcases",
    colors: [{ name: "White", hex: "#FFFFFF" }],
    variants: [
      { label: "Size", options: ["Standard (50x75cm)", "Square (45x45cm)"] },
    ],
    features: [
      "Soft polyester micro-fibre",
      "Sublimation full-colour printing",
      "Hidden zip closure",
      "Machine washable (30°C)",
      "Fade-resistant print",
    ],
    inStock: true,
  },
  {
    id: "9",
    slug: "custom-apron",
    name: "Custom Apron",
    price: 17.99,
    description:
      "Quality cotton-poly blend apron with adjustable neck strap and front pocket. Customise with print or embroidery — perfect for chefs, baristas, crafters, and branded businesses.",
    images: [
      "/images/products/custom-apron/main.jpg",
      "/images/products/custom-apron/thumb-1.jpg",
      "/images/products/custom-apron/thumb-2.jpg",
      "/images/products/custom-apron/thumb-3.jpg",
    ],
    category: "Aprons",
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Red", hex: "#DC2626" },
    ],
    variants: [],
    features: [
      "65% polyester / 35% cotton",
      "Adjustable neck strap",
      "Front centre pocket",
      "Long tie-back waist straps",
      "Print or embroidery options",
    ],
    inStock: true,
  },
  {
    id: "10",
    slug: "custom-tumbler",
    name: "Custom Tumbler",
    price: 22.99,
    description:
      "Insulated stainless steel tumbler with custom UV printing. Keeps drinks hot for 6 hours or cold for 12. Sliding lid included. Great for corporate gifts and everyday use.",
    images: [
      "/images/products/custom-tumbler/main.jpg",
      "/images/products/custom-tumbler/thumb-1.jpg",
      "/images/products/custom-tumbler/thumb-2.jpg",
      "/images/products/custom-tumbler/thumb-3.jpg",
    ],
    category: "Tumblers",
    colors: [
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Rose Gold", hex: "#B76E79" },
    ],
    variants: [{ label: "Size", options: ["350ml", "500ml"] }],
    features: [
      "304 stainless steel double-wall",
      "Vacuum insulated (6h hot / 12h cold)",
      "BPA-free sliding lid",
      "UV-printed full-wrap design",
      "Hand wash recommended",
    ],
    inStock: true,
  },
];

// Maps URL slugs to product categories and display info
export interface CategoryInfo {
  name: string;
  slug: string;
  parentSlug: string;
  parentName: string;
  description: string;
}

export const categoryGroups: Record<
  string,
  { name: string; description: string; categories: CategoryInfo[] }
> = {
  clothing: {
    name: "Clothing",
    description:
      "Custom printed and embroidered clothing for every occasion. From casual tees to professional workwear.",
    categories: [
      {
        name: "T-Shirts",
        slug: "t-shirts",
        parentSlug: "clothing",
        parentName: "Clothing",
        description:
          "Premium custom printed t-shirts in a range of colours and sizes. Perfect for events, teams, and personal style.",
      },
      {
        name: "Hoodies",
        slug: "hoodies",
        parentSlug: "clothing",
        parentName: "Clothing",
        description:
          "Cosy embroidered and printed hoodies for casual branding, gifts, and everyday comfort.",
      },
      {
        name: "Sweatshirts",
        slug: "sweatshirts",
        parentSlug: "clothing",
        parentName: "Clothing",
        description:
          "Classic crewneck sweatshirts with premium embroidery or print. Comfortable and stylish.",
      },
      {
        name: "Aprons",
        slug: "aprons",
        parentSlug: "clothing",
        parentName: "Clothing",
        description:
          "Custom aprons for chefs, baristas, crafters, and branded businesses. Print or embroidery available.",
      },
    ],
  },
  accessories: {
    name: "Accessories",
    description:
      "Personalised accessories including caps, bags, and more. Make everyday items uniquely yours.",
    categories: [
      {
        name: "Caps",
        slug: "caps",
        parentSlug: "accessories",
        parentName: "Accessories",
        description:
          "Branded snapback and baseball caps with precision embroidery. Perfect for teams and uniforms.",
      },
      {
        name: "Tote Bags",
        slug: "tote-bags",
        parentSlug: "accessories",
        parentName: "Accessories",
        description:
          "Eco-friendly custom tote bags for shopping, events, and promotional giveaways.",
      },
    ],
  },
  drinkware: {
    name: "Drinkware",
    description:
      "Custom mugs, glass cans, and tumblers. The perfect personalised gift or branded merchandise.",
    categories: [
      {
        name: "Mugs",
        slug: "mugs",
        parentSlug: "drinkware",
        parentName: "Drinkware",
        description:
          "Personalised ceramic mugs with full-colour printing. Dishwasher safe and perfect for gifts.",
      },
      {
        name: "Glass Cans",
        slug: "glass-cans",
        parentSlug: "drinkware",
        parentName: "Drinkware",
        description:
          "Trendy glass can tumblers with bamboo lids. Custom UV-printed with your design.",
      },
      {
        name: "Tumblers",
        slug: "tumblers",
        parentSlug: "drinkware",
        parentName: "Drinkware",
        description:
          "Insulated stainless steel tumblers with custom printing. Keeps drinks hot or cold for hours.",
      },
    ],
  },
  "home-living": {
    name: "Home & Living",
    description:
      "Personalised home products that add a custom touch to any space. From pillowcases to wall art.",
    categories: [
      {
        name: "Pillowcases",
        slug: "pillowcases",
        parentSlug: "home-living",
        parentName: "Home & Living",
        description:
          "Soft personalised pillowcases with full-colour sublimation printing. Great for gifts and home decor.",
      },
    ],
  },
};

// Map product category names to URL slugs
const categoryToSlugMap: Record<string, string> = {
  "T-Shirts": "t-shirts",
  Hoodies: "hoodies",
  Sweatshirts: "sweatshirts",
  Aprons: "aprons",
  Caps: "caps",
  "Tote Bags": "tote-bags",
  Mugs: "mugs",
  "Glass Cans": "glass-cans",
  Tumblers: "tumblers",
  Pillowcases: "pillowcases",
};

// Map sub-category slugs to parent group slugs
const subcategoryToParentMap: Record<string, string> = {
  "t-shirts": "clothing",
  hoodies: "clothing",
  sweatshirts: "clothing",
  aprons: "clothing",
  caps: "accessories",
  "tote-bags": "accessories",
  mugs: "drinkware",
  "glass-cans": "drinkware",
  tumblers: "drinkware",
  pillowcases: "home-living",
};

export function getProductsByGroupSlug(groupSlug: string): ProductData[] {
  const group = categoryGroups[groupSlug];
  if (!group) return [];
  const categorySlugs = group.categories.map((c) => c.slug);
  return products.filter((p) => {
    const pSlug = categoryToSlugMap[p.category];
    return pSlug && categorySlugs.includes(pSlug);
  });
}

export function getProductsByCategorySlug(categorySlug: string): ProductData[] {
  const categoryName = Object.entries(categoryToSlugMap).find(
    ([, slug]) => slug === categorySlug,
  )?.[0];
  if (!categoryName) return [];
  return products.filter((p) => p.category === categoryName);
}

export function getCategorySlug(categoryName: string): string | undefined {
  return categoryToSlugMap[categoryName];
}

export function getParentGroupSlug(
  subcategorySlug: string,
): string | undefined {
  return subcategoryToParentMap[subcategorySlug];
}

export function getProductBySlug(slug: string): ProductData | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 4): ProductData[] {
  const product = getProductBySlug(slug);
  if (!product) return products.slice(0, limit);
  return products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .concat(
      products.filter(
        (p) => p.slug !== slug && p.category !== product.category,
      ),
    )
    .slice(0, limit);
}
