export interface ProductColor {
  name: string;
  hex: string;
  imageIndex: number;
}

export interface ProductVariant {
  label: string;
  options: string[];
}

export interface ProductAdditionalInfo {
  label: string;
  value: string;
}

export interface ProductReview {
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  longDescription: string;
  images: string[];
  category: string;
  colors: ProductColor[];
  variants: ProductVariant[];
  features: string[];
  additionalInfo: ProductAdditionalInfo[];
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
  sku: string;
  tags: string[];
  inStock: boolean;
  badge?: string;
  bannerImage: string;
}

const defaultShippingInfo = `We offer fast and reliable shipping on all orders.\n\n- **Dispatch:** Within 24 hours\n- **Free shipping** on all orders over £99\n- **Standard delivery:** 3–5 business days\n- **Express delivery:** 1–2 business days (additional charge)\n- **International delivery:** 5–10 business days\n\nPlease note delivery times are estimates and may vary.`;

const defaultReturnPolicy = `We want you to be completely happy with your purchase.\n\n1. Items must be unused, undamaged, and in original condition.\n2. Original tags, labels, and packaging must be intact.\n3. Returns must be initiated within 30 days of delivery.\n4. Proof of purchase is required for all returns.\n5. Custom/personalised items cannot be returned unless defective.\n\nContact us at support@atyreprint.com to start a return.`;

export const shippingAndReturnInfo = { shipping: defaultShippingInfo, returns: defaultReturnPolicy };

export const products: ProductData[] = [
  {
    id: "1",
    slug: "custom-printed-tshirt",
    name: "Custom Printed T-Shirt",
    price: 19.99,
    compareAtPrice: 24.99,
    description:
      "Premium quality custom printed t-shirt. Made from 100% ring-spun cotton for a soft, comfortable feel. Perfect for custom designs, logos, team events, or personalised gifts.",
    longDescription:
      "Our Custom Printed T-Shirt is the ultimate canvas for your creativity and the cornerstone of a versatile wardrobe. Crafted from 100% ring-spun combed cotton at a substantial 180 GSM, it delivers a luxuriously soft feel against the skin while maintaining exceptional durability wash after wash. The tight knit of the ring-spun cotton provides a superior printing surface, ensuring your designs are crisp, clear, and long-lasting.\n\nUsing state-of-the-art Direct-To-Garment (DTG) printing technology, we reproduce your designs with photographic precision and vibrant, wash-resistant colours. This eco-friendly process uses water-based inks that penetrate deep into the fabric fibres, resulting in a soft-hand feel that doesn't crack or peel over time. Whether you need a single personalised gift, a limited-run artist collection, or a bulk order for your corporate team, every shirt is printed to the highest retail standards.\n\nThe relaxed unisex fit ensures comfort for everyone, featuring a modern side-seamed construction that prevents twisting and loss of shape. The pre-shrunk fabric means your shirt stays true to size from the first wear. Available in a curated palette of 6 contemporary colours and 7 sizes ranging from XS to 3XL, this T-shirt is designed to be lived in, loved, and worn with pride.",
    bannerImage: "/images/banners/apparel-banner.png",
    images: [
      "/images/products/custom-printed-tshirt/main.jpg",
      "/images/products/custom-printed-tshirt/thumb-1.jpg",
      "/images/products/custom-printed-tshirt/thumb-2.jpg",
      "/images/products/custom-printed-tshirt/thumb-3.jpg",
    ],
    category: "T-Shirts",
    colors: [
      { name: "White", hex: "#FFFFFF", imageIndex: 0 },
      { name: "Black", hex: "#1A1A1A", imageIndex: 1 },
      { name: "Navy", hex: "#1B2A4A", imageIndex: 2 },
      { name: "Red", hex: "#DC2626", imageIndex: 3 },
      { name: "Forest Green", hex: "#3D6B1E", imageIndex: 0 },
      { name: "Grey Marl", hex: "#9CA3AF", imageIndex: 1 },
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
    additionalInfo: [
      { label: "Material", value: "100% Ring-spun Cotton" },
      { label: "Weight", value: "180 GSM" },
      { label: "Print Method", value: "DTG (Direct-to-Garment)" },
      { label: "Fit", value: "Unisex Relaxed" },
      { label: "Care", value: "Machine wash 30°C, tumble dry low" },
    ],
    reviews: [
      { author: "Sarah M.", rating: 5, date: "15 March 2026", text: "Fantastic quality! The print is crisp and the cotton feels premium. Ordered 20 for our team event." },
      { author: "James K.", rating: 5, date: "10 March 2026", text: "Brilliant colours, fast delivery. Will definitely order again." },
    ],
    rating: 5,
    reviewCount: 2,
    sku: "AP-TSH-001",
    tags: ["T-Shirt", "Custom Print", "DTG", "Workwear"],
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
    longDescription:
      "The Embroidered Hoodie is built for those who demand both supreme comfort and professional-grade durability. At 300 GSM with a premium 80/20 cotton-polyester blend, it strikes the perfect balance between the breathable softness of cotton and the shape-retaining strength of polyester. The interior is finished with a brushed fleece that provides immediate warmth and a cloud-like feel, making it the perfect year-round companion.\n\nOur precision embroidery service handles up to 15,000 stitches per design, ensuring your logo, crest, or custom artwork is rendered with stunning three-dimensional detail and vibrant, fade-resistant thread. Unlike prints, embroidery offers a life-long permanence and a premium texture that elevates the entire garment. The double-lined hood with adjustable drawstrings, large front pouch pocket, and heavy-duty ribbed cuffs and hem provide a structural integrity that withstands the rigours of everyday use.\n\nDesigned for impact, this hoodie is ideal for high-end branded workwear, university societies, sports team kits, or high-quality personalised gifts. The tailored unisex silhouette is available in 5 rich colours that complement any brand identity. Experience the intersection of boutique quality and commercial-grade durability.",
    bannerImage: "/images/banners/apparel-banner.png",
    images: [
      "/images/products/embroidered-hoodie/main.jpg",
      "/images/products/embroidered-hoodie/thumb-1.jpg",
      "/images/products/embroidered-hoodie/thumb-2.jpg",
      "/images/products/embroidered-hoodie/thumb-3.jpg",
    ],
    category: "Hoodies",
    colors: [
      { name: "Black", hex: "#1A1A1A", imageIndex: 0 },
      { name: "Navy", hex: "#1B2A4A", imageIndex: 1 },
      { name: "Charcoal", hex: "#374151", imageIndex: 2 },
      { name: "Burgundy", hex: "#7F1D1D", imageIndex: 3 },
      { name: "Forest Green", hex: "#3D6B1E", imageIndex: 0 },
    ],
    variants: [{ label: "Size", options: ["S", "M", "L", "XL", "2XL"] }],
    features: [
      "80% cotton / 20% polyester (300 GSM)",
      "Double-lined hood with drawstring",
      "Precision embroidery up to 15,000 stitches",
      "Front pouch pocket",
      "Ribbed cuffs & hem",
    ],
    additionalInfo: [
      { label: "Material", value: "80% Cotton / 20% Polyester" },
      { label: "Weight", value: "300 GSM" },
      { label: "Print Method", value: "Precision Embroidery" },
      { label: "Fit", value: "Regular Unisex" },
      { label: "Care", value: "Machine wash 30°C, do not tumble dry" },
    ],
    reviews: [
      { author: "Amara O.", rating: 5, date: "8 March 2026", text: "The embroidery quality is absolutely stunning. Our company logo looks incredible." },
    ],
    rating: 5,
    reviewCount: 1,
    sku: "AP-HOD-002",
    tags: ["Hoodie", "Embroidery", "Workwear", "Team Kit"],
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
    longDescription:
      "Our Personalised Ceramic Mug is the definitive choice for morning coffee, afternoon tea, and everything in between. Each mug is crafted from premium AAA-grade ceramic, selected for its bright white finish and high thermal resistance. The glossy glaze provides a smooth, non-porous surface that is as satisfying to hold as it is beautiful to look at.\n\nUtilising advanced sublimation full-wrap printing technology, your custom photos, logos, or quotes are permanently bonded to the ceramic at a molecular level. This results in edge-to-edge, photographic quality designs with vivid, high-definition colours that won't crack, peel, or fade. Because the print is part of the mug itself, it is 100% dishwasher and microwave safe, ensuring your memories stay vibrant through thousands of cycles.\n\nWhether you're creating a thoughtful photo gift for a loved one, outfitting a modern office with branded merchandise, or designing a unique commemorative item, this mug delivers a retail-ready feel. Each mug is individually quality-checked and comes securely packaged in a crush-proof box. Available in the classic 11oz size for standard use and the generous 15oz size for the serious beverage enthusiast.",
    bannerImage: "/images/banners/drinkware-banner.png",
    images: [
      "/images/products/personalised-mug/main.jpg",
      "/images/products/personalised-mug/thumb-1.jpg",
      "/images/products/personalised-mug/thumb-2.jpg",
      "/images/products/personalised-mug/thumb-3.jpg",
    ],
    category: "Mugs",
    colors: [
      { name: "White", hex: "#FFFFFF", imageIndex: 0 },
      { name: "Black", hex: "#1A1A1A", imageIndex: 1 },
    ],
    variants: [{ label: "Size", options: ["11oz", "15oz"] }],
    features: [
      "Premium AAA-grade ceramic",
      "Sublimation full-wrap printing",
      "Dishwasher & microwave safe",
      "Glossy finish",
      "Individually boxed",
    ],
    additionalInfo: [
      { label: "Material", value: "AAA-grade Ceramic" },
      { label: "Capacity", value: "11oz / 15oz" },
      { label: "Print Method", value: "Sublimation Full-Wrap" },
      { label: "Finish", value: "Glossy" },
      { label: "Care", value: "Dishwasher & microwave safe" },
    ],
    reviews: [
      { author: "David T.", rating: 4, date: "1 March 2026", text: "Really nice print quality. The colours are vibrant and it survived many dishwasher cycles." },
    ],
    rating: 4,
    reviewCount: 1,
    sku: "AP-MUG-003",
    tags: ["Mug", "Ceramic", "Gift", "Sublimation"],
    inStock: true,
  },
  {
    id: "4",
    slug: "custom-tote-bag",
    name: "Custom Tote Bag",
    price: 14.99,
    description:
      "Eco-friendly cotton canvas tote bag with custom print or embroidery. Strong handles and generous capacity. Great for shopping, events, and promotional giveaways.",
    longDescription:
      "Elevate your daily carry with our Custom Tote Bag, a perfect blend of eco-conscious design and functional durability. Made from 100% natural cotton canvas at a heavy-duty 170 GSM, this bag is engineered for longevity. It serves as a stylish, sustainable alternative to single-use plastics, and with your custom design, it becomes a powerful mobile advertisement for your brand or artistic vision.\n\nThe generous 38cm x 42cm main compartment provides ample space for everything from bulky groceries and gym gear to laptop sleeves and textbooks. To ensure it can handle heavy loads, we've integrated reinforced cross-stitched handles that distribute weight evenly across the shoulder. The natural canvas texture is ideal for both bold screened graphics and high-density embroidery, offering two distinct paths for customisation.\n\nCompletely machine washable and built to survive years of daily use, this tote is the ideal choice for retail packaging, subscription boxes, promotional event giveaways, or as a standalone piece of artist merchandise. Durable, eco-friendly, and infinitely useful.",
    bannerImage: "/images/banners/accessories-banner.png",
    images: [
      "/images/products/custom-tote-bag/main.jpg",
      "/images/products/custom-tote-bag/thumb-1.jpg",
      "/images/products/custom-tote-bag/thumb-2.jpg",
      "/images/products/custom-tote-bag/thumb-3.jpg",
    ],
    category: "Tote Bags",
    colors: [
      { name: "Natural", hex: "#F5F0E1", imageIndex: 0 },
      { name: "Black", hex: "#1A1A1A", imageIndex: 1 },
      { name: "Navy", hex: "#1B2A4A", imageIndex: 2 },
    ],
    variants: [],
    features: [
      "100% natural cotton canvas (170 GSM)",
      "Reinforced stitched handles",
      "38cm x 42cm generous size",
      "Print or embroidery options",
      "Machine washable",
    ],
    additionalInfo: [
      { label: "Material", value: "100% Natural Cotton Canvas" },
      { label: "Weight", value: "170 GSM" },
      { label: "Dimensions", value: "38cm x 42cm" },
      { label: "Handle Length", value: "67cm" },
      { label: "Care", value: "Machine wash 30°C" },
    ],
    reviews: [
      { author: "Emily R.", rating: 5, date: "20 February 2026", text: "Ordered 100 for our conference. Amazing quality at a great price!" },
    ],
    rating: 5,
    reviewCount: 1,
    sku: "AP-TOT-004",
    tags: ["Tote Bag", "Eco-Friendly", "Cotton", "Promotional"],
    inStock: true,
  },
  {
    id: "5",
    slug: "branded-snapback-cap",
    name: "Branded Snapback Cap",
    price: 16.99,
    description:
      "Classic snapback cap with embroidered branding. Structured 6-panel design with flat peak and adjustable snap closure. Perfect for uniforms, teams, and street style.",
    longDescription:
      "The Branded Snapback Cap is the ultimate street-style essential, offering a professional platform for your custom branding. It features a classic 6-panel structured design with a high-profile crown that maintains its clean, architectural shape even with regular wear. The flat peak is finished with a traditional green undervisor, a subtle 'throwback' detail that signals premium quality and heritage styling.\n\nOur state-of-the-art precision embroidery technology brings your logos and typography to life with sharp, clean lines and vibrant thread colours. The front panel layout is reinforced with buckram to provide a stable, wrinkle-free foundation for even the most complex embroidered designs. At the back, a traditional adjustable snap closure ensures a comfortable, secure 'one size fits most' fit for all-day wearability.\n\nWhether you are outfitting a creative team, launching a lifestyle brand, or seeking high-impact headwear for an event, this snapback delivers a retail-quality finish that stands out from the crowd. Durable cotton twill construction and meticulous stitching make this a cap that looks as good as it feels.",
    bannerImage: "/images/banners/accessories-banner.png",
    images: [
      "/images/products/branded-snapback-cap/main.jpg",
      "/images/products/branded-snapback-cap/thumb-1.jpg",
      "/images/products/branded-snapback-cap/thumb-2.jpg",
      "/images/products/branded-snapback-cap/thumb-3.jpg",
    ],
    category: "Caps",
    colors: [
      { name: "Black", hex: "#1A1A1A", imageIndex: 0 },
      { name: "Navy", hex: "#1B2A4A", imageIndex: 1 },
      { name: "White", hex: "#FFFFFF", imageIndex: 2 },
      { name: "Red", hex: "#DC2626", imageIndex: 3 },
      { name: "Grey", hex: "#6B7280", imageIndex: 0 },
    ],
    variants: [],
    features: [
      "Structured 6-panel design",
      "Flat peak with green undervisor",
      "Precision front embroidery",
      "Adjustable snap closure",
      "One size fits most",
    ],
    additionalInfo: [
      { label: "Material", value: "Cotton Twill" },
      { label: "Construction", value: "6-Panel Structured" },
      { label: "Print Method", value: "Front Embroidery" },
      { label: "Closure", value: "Adjustable Snap" },
      { label: "Size", value: "One Size Fits Most" },
    ],
    reviews: [
      { author: "Marcus L.", rating: 5, date: "25 February 2026", text: "Embroidery is spot on. Caps look professional and feel well-made." },
    ],
    rating: 5,
    reviewCount: 1,
    sku: "AP-CAP-005",
    tags: ["Cap", "Snapback", "Embroidery", "Street Style"],
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
    longDescription:
      "The Custom Glass Can is the contemporary choice for the modern, design-conscious drinker. Crafted from high-borosilicate glass, it is exceptionally durable and thermal-shock resistant, capable of handling rapid temperature changes from iced coffee to hot lattes without fracturing. The iconic can-inspired silhouette is not just a trend; it is designed for a comfortable, ergonomic grip.\n\nOur advanced UV-printing technology allows for vibrant, full-colour designs with photographic detail. The UV-curing process creates a hard, scratch-resistant layer that maintains its clarity and colour saturation through daily use. Each glass can comes with a natural, sustainably sourced bamboo lid featuring a silicone ring for a snug, spill-resistant fit, and a reusable glass straw for a completely eco-friendly drinking experience.\n\nWhether you are designing a personalised gift for a friend, creating a stylish desk accessory for yourself, or outfitting a chic cafe with branded glassware, this set delivers a premium, boutique aesthetic. Hand-washing is recommended to maintain the natural bamboo and the integrity of the print over long-term use.",
    bannerImage: "/images/banners/drinkware-banner.png",
    images: [
      "/images/products/custom-glass-can/main.jpg",
      "/images/products/custom-glass-can/thumb-1.jpg",
      "/images/products/custom-glass-can/thumb-2.jpg",
      "/images/products/custom-glass-can/thumb-3.jpg",
    ],
    category: "Glass Cans",
    colors: [
      { name: "Clear", hex: "#E8E8E8", imageIndex: 0 },
      { name: "Frosted", hex: "#D4D4D4", imageIndex: 1 },
    ],
    variants: [{ label: "Size", options: ["16oz", "20oz"] }],
    features: [
      "Borosilicate glass (heat resistant)",
      "Bamboo lid included",
      "Reusable glass straw",
      "UV-printed full-colour design",
      "Hand wash recommended",
    ],
    additionalInfo: [
      { label: "Material", value: "Borosilicate Glass" },
      { label: "Capacity", value: "16oz / 20oz" },
      { label: "Print Method", value: "UV Full-Colour" },
      { label: "Includes", value: "Bamboo Lid + Glass Straw" },
      { label: "Care", value: "Hand wash recommended" },
    ],
    reviews: [
      { author: "Priya K.", rating: 4, date: "5 March 2026", text: "Beautiful design and great quality glass. Love the bamboo lid detail." },
    ],
    rating: 4,
    reviewCount: 1,
    sku: "AP-GLC-006",
    tags: ["Glass Can", "Drinkware", "Eco-Friendly", "UV Print"],
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
    longDescription:
      "The Embroidered Sweatshirt is a masterclass in understated luxury and classical comfort. It is constructed from a heavy-weight 280 GSM cotton-polyester blend that offers a substantial, high-quality feel without the bulk. The interior is meticulously finished with a brushed fleece that remains incredibly soft and insulating, providing the ultimate layer for cooler climates or relaxed indoor settings.\n\nOur embroidery expertise supports designs with up to 10,000 individual stitches, ensuring that your company logos, monograms, or intricate line-art are rendered with crisp precision and zero puckering. The high-density thread used is resistant to fading and bleach, maintaining its professional look for the life of the garment. To ensure long-term durability, the sweatshirt features twin-needle stitching on the seams and heavy-duty ribbing on the crewneck, cuffs, and hem to maintain its structural integrity.\n\nWith a relaxed unisex fit that is universally flattering, this sweatshirt is the perfect canvas for creative branding or high-end personal gifts. Available in a palette of 4 sophisticated, easy-to-style shades ranging from deep Navy to minimalist Sand.",
    bannerImage: "/images/banners/apparel-banner.png",
    images: [
      "/images/products/embroidered-sweatshirt/main.jpg",
      "/images/products/embroidered-sweatshirt/thumb-1.jpg",
      "/images/products/embroidered-sweatshirt/thumb-2.jpg",
      "/images/products/embroidered-sweatshirt/thumb-3.jpg",
    ],
    category: "Sweatshirts",
    colors: [
      { name: "Black", hex: "#1A1A1A", imageIndex: 0 },
      { name: "Grey Marl", hex: "#9CA3AF", imageIndex: 1 },
      { name: "Navy", hex: "#1B2A4A", imageIndex: 2 },
      { name: "Sand", hex: "#D2B48C", imageIndex: 3 },
    ],
    variants: [{ label: "Size", options: ["S", "M", "L", "XL", "2XL"] }],
    features: [
      "80% cotton / 20% polyester (280 GSM)",
      "Brushed fleece interior",
      "Ribbed crewneck, cuffs & hem",
      "Embroidery up to 10,000 stitches",
      "Relaxed unisex fit",
    ],
    additionalInfo: [
      { label: "Material", value: "80% Cotton / 20% Polyester" },
      { label: "Weight", value: "280 GSM" },
      { label: "Print Method", value: "Precision Embroidery" },
      { label: "Fit", value: "Relaxed Unisex" },
      { label: "Care", value: "Machine wash 30°C, reshape while damp" },
    ],
    reviews: [
      { author: "Tom W.", rating: 5, date: "12 March 2026", text: "The fleece interior is so cosy. Embroidery looks premium. Ordered for our whole office!" },
      { author: "Lisa H.", rating: 4, date: "28 February 2026", text: "Great quality for the price. The Sand colour is gorgeous." },
    ],
    rating: 4.5,
    reviewCount: 2,
    sku: "AP-SWT-007",
    tags: ["Sweatshirt", "Embroidery", "Casual", "Branding"],
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
    longDescription:
      "Transform any bedroom into a personal sanctuary with our Personalised Pillowcase. Each piece is crafted from premium 120 GSM polyester micro-fibre, a material specifically chosen for its ultra-smooth, silk-like texture and superior breathability. The fabric is naturally hypoallergenic and moisture-wicking, ensuring a comfortable and refreshing night's sleep while providing a perfect, flat surface for high-resolution printing.\n\nUtilising the most advanced sublimation full-colour printing process, your personal photographs, wedding memories, or custom patterns are integrated directly into the fabric fibres. This creates a photographic-quality print that is completely imperceptible to the touch — no stiff or plastic-feeling layers. The colours are permanent, vibrant, and guaranteed not to bleed or fade even when machine washed. A concealed 'invisible' zip closure ensures the pillow stays securely inside while maintaining a clean, professional aesthetic.\n\nIdeal for deeply personal gifts like birthdays, weddings, or Mother's Day, or for creating a cohesive branded look in a boutique hotel or AirBnB. Available in Standard rectangular and Square formats to suit any bedding arrangement.",
    bannerImage: "/images/banners/home-office-banner.png",
    images: [
      "/images/products/personalised-pillowcase/main.jpg",
      "/images/products/personalised-pillowcase/thumb-1.jpg",
      "/images/products/personalised-pillowcase/thumb-2.jpg",
      "/images/products/personalised-pillowcase/thumb-3.jpg",
    ],
    category: "Pillowcases",
    colors: [{ name: "White", hex: "#FFFFFF", imageIndex: 0 }],
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
    additionalInfo: [
      { label: "Material", value: "Polyester Micro-Fibre" },
      { label: "Sizes", value: "Standard 50x75cm / Square 45x45cm" },
      { label: "Print Method", value: "Sublimation Full-Colour" },
      { label: "Closure", value: "Hidden Zip" },
      { label: "Care", value: "Machine wash 30°C, no bleach" },
    ],
    reviews: [
      { author: "Hannah G.", rating: 5, date: "14 February 2026", text: "Perfect Valentine's gift! The photo print is incredibly clear." },
    ],
    rating: 5,
    reviewCount: 1,
    sku: "AP-PIL-008",
    tags: ["Pillowcase", "Home Decor", "Gift", "Sublimation"],
    inStock: true,
  },
  {
    id: "9",
    slug: "custom-apron",
    name: "Custom Apron",
    price: 17.99,
    description:
      "Quality cotton-poly blend apron with adjustable neck strap and front pocket. Customise with print or embroidery — perfect for chefs, baristas, crafters, and branded businesses.",
    longDescription:
      "Our Custom Apron is engineered for the professional who demands performance in the kitchen, workshop, or studio. It is crafted from a high-quality 65/35 poly-cotton twill blend (190 GSM), a fabric carefully selected for its balance of natural comfort and industrial durability. This blend is naturally resistant to wrinkles and stains, ensuring you look sharp from the first prep to the final plate-up.\n\nThe apron features a fully adjustable neck strap and extra-long 100cm waist ties, ensuring a secure and comfortable fit for all body types. A large, reinforced double front pocket provides ample space for essential tools like thermometers, pens, or tasting spoons. Whether you choose our high-impact screen printing for bold graphics or our professional embroidery for a high-end textured logo, the result is a piece of gear that reflects the quality of your craft.\n\nDesigned for the rigours of commercial environments, this apron is fully machine washable and colour-fast. It is the perfect professional outfitting solution for restaurant chefs, baristas, crafters, barbers, and creative workshops. Available in 4 timeless professional colours.",
    bannerImage: "/images/banners/home-office-banner.png",
    images: [
      "/images/products/custom-apron/main.jpg",
      "/images/products/custom-apron/thumb-1.jpg",
      "/images/products/custom-apron/thumb-2.jpg",
      "/images/products/custom-apron/thumb-3.jpg",
    ],
    category: "Aprons",
    colors: [
      { name: "Black", hex: "#1A1A1A", imageIndex: 0 },
      { name: "White", hex: "#FFFFFF", imageIndex: 1 },
      { name: "Navy", hex: "#1B2A4A", imageIndex: 2 },
      { name: "Red", hex: "#DC2626", imageIndex: 3 },
    ],
    variants: [],
    features: [
      "65% polyester / 35% cotton",
      "Adjustable neck strap",
      "Front centre pocket",
      "Long tie-back waist straps",
      "Print or embroidery options",
    ],
    additionalInfo: [
      { label: "Material", value: "65% Polyester / 35% Cotton" },
      { label: "Dimensions", value: "70cm x 90cm" },
      { label: "Print Method", value: "Screen Print or Embroidery" },
      { label: "Pocket", value: "Front Centre" },
      { label: "Care", value: "Machine wash 40°C, iron safe" },
    ],
    reviews: [
      { author: "Chef Marco", rating: 5, date: "18 February 2026", text: "Embroidered our restaurant logo. Looks incredible and holds up well in a busy kitchen." },
    ],
    rating: 5,
    reviewCount: 1,
    sku: "AP-APR-009",
    tags: ["Apron", "Kitchen", "Workwear", "Embroidery"],
    inStock: true,
  },
  {
    id: "10",
    slug: "custom-tumbler",
    name: "Custom Tumbler",
    price: 22.99,
    description:
      "Insulated stainless steel tumbler with custom UV printing. Keeps drinks hot for 6 hours or cold for 12. Sliding lid included. Great for corporate gifts and everyday use.",
    longDescription:
      "The Custom Tumbler is the ultimate vessel for the high-performance professional. Constructed from premium 18/8 food-grade stainless steel with a high-density double-wall vacuum insulation, it is engineered to maintain temperature for extended periods. Your morning coffee stays piping hot for up to 6 hours, and your iced beverages remain refreshingly cold for a full 12 hours, with zero external condensation.\n\nOur industrial-grade UV-printing technology allows for 360-degree, full-wrap customisations with stunning colour fidelity and a hard-wearing, scratch-resistant finish. The BPA-free, crystal-clear sliding lid features a silicone gasket for a splash-resistant seal, making it as functional on the morning commute as it is at the gym. The sleek, tapered design fits comfortably in most standard vehicle cup holders, ensuring your hydration is always within reach.\n\nAvailable in a selection of premium metallic and matte finishes, this tumbler is a sophisticated choice for high-end corporate gifts, personalised presents, or branded lifestyle merchandise. Meticulously designed for a lifetime of use. Hand-washing is recommended to preserve the vacuum seal and the integrity of the custom print.",
    bannerImage: "/images/banners/drinkware-banner.png",
    images: [
      "/images/products/custom-tumbler/main.jpg",
      "/images/products/custom-tumbler/thumb-1.jpg",
      "/images/products/custom-tumbler/thumb-2.jpg",
      "/images/products/custom-tumbler/thumb-3.jpg",
    ],
    category: "Tumblers",
    colors: [
      { name: "Silver", hex: "#C0C0C0", imageIndex: 0 },
      { name: "Black", hex: "#1A1A1A", imageIndex: 1 },
      { name: "White", hex: "#FFFFFF", imageIndex: 2 },
      { name: "Rose Gold", hex: "#B76E79", imageIndex: 3 },
    ],
    variants: [{ label: "Size", options: ["350ml", "500ml"] }],
    features: [
      "304 stainless steel double-wall",
      "Vacuum insulated (6h hot / 12h cold)",
      "BPA-free sliding lid",
      "UV-printed full-wrap design",
      "Hand wash recommended",
    ],
    additionalInfo: [
      { label: "Material", value: "304 Stainless Steel" },
      { label: "Insulation", value: "Double-Wall Vacuum" },
      { label: "Capacity", value: "350ml / 500ml" },
      { label: "Print Method", value: "UV Full-Wrap" },
      { label: "Care", value: "Hand wash, do not microwave" },
    ],
    reviews: [
      { author: "Ryan P.", rating: 5, date: "22 February 2026", text: "Keeps my coffee hot all morning. The Rose Gold finish is stunning." },
      { author: "Natalie W.", rating: 4, date: "10 February 2026", text: "Great quality tumbler. Print is sharp and hasn't faded after weeks of use." },
    ],
    rating: 4.5,
    reviewCount: 2,
    sku: "AP-TUM-010",
    tags: ["Tumbler", "Stainless Steel", "Corporate Gift", "UV Print"],
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
