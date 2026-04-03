/* ═══════════════════════════════════════════════════════════════════════════
 * AtyrePrint Admin — Firestore Data Models
 * Enterprise-grade type definitions for all collections
 * ═══════════════════════════════════════════════════════════════════════════ */

import { Timestamp } from "firebase/firestore";

// ─── Base / Shared ───────────────────────────────────────────────────────

/** Every Firestore document gets these fields automatically */
export interface BaseDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/** Soft-delete support */
export interface SoftDeletable {
  deletedAt: Timestamp | null;
  isDeleted: boolean;
}

/** Publishing workflow */
export type PublishStatus = "draft" | "published" | "archived";

/** SEO metadata reusable across pages/products/blogs */
export interface SEOMeta {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl?: string;
}

/** Reusable image object */
export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  /** Firebase Storage path for deletion */
  storagePath?: string;
}

/** CTA link */
export interface CTALink {
  label: string;
  href: string;
}

/** Address */
export interface Address {
  line1: string;
  line2?: string;
  city: string;
  county?: string;
  postcode: string;
  country: string;
}

/** Money (stored as integer pence to avoid floating-point) */
export interface Money {
  amount: number; // in pence (e.g. 1999 = £19.99)
  currency: string; // ISO 4217 e.g. "GBP"
}

// ─── Products ────────────────────────────────────────────────────────────

/** Firestore: products/{id} */
export interface Product extends BaseDocument, SoftDeletable {
  /** Human-readable SKU */
  sku: string;
  /** URL-safe slug (unique) */
  slug: string;
  name: string;
  description: string;
  longDescription: string;

  /** Pricing */
  price: Money;
  compareAtPrice: Money | null;

  /** Media */
  images: ImageAsset[];
  bannerImage: ImageAsset | null;

  /** Taxonomy */
  categoryId: string;
  categoryPath: string[]; // ['clothing', 'hoodies'] for breadcrumbs
  tags: string[];

  /** Variants */
  colors: ProductColor[];
  variants: ProductVariant[];

  /** Details */
  features: string[];
  additionalInfo: ProductAdditionalInfo[];

  /** Inventory */
  inStock: boolean;
  stockQuantity: number | null; // null = unlimited

  /** Display */
  badge: string | null; // "New", "Popular", "Hot", "Sale"
  buttonLabel: string; // "Add to Cart", "Customise", etc.
  featured: boolean;
  customisable: boolean; // Allows customers to use the product designer
  sortOrder: number;

  /** Stats (denormalized for fast reads) */
  rating: number;
  reviewCount: number;

  /** Publishing */
  status: PublishStatus;
  seo: SEOMeta;
}

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex: number; // @deprecated — kept for backward compat
  images: ImageAsset[]; // per-color gallery images
}

export interface ProductVariant {
  label: string; // "Size", "Capacity"
  options: string[]; // ["XS", "S", "M", "L", "XL"]
}

export interface ProductAdditionalInfo {
  label: string;
  value: string;
}

// ─── Product Reviews ─────────────────────────────────────────────────────

/** Firestore: products/{productId}/reviews/{id} */
export interface ProductReview extends BaseDocument {
  productId: string;
  author: string;
  email?: string;
  rating: number; // 1-5
  text: string;
  approved: boolean;
}

// ─── Categories ──────────────────────────────────────────────────────────

/** Firestore: categories/{id} */
export interface Category extends BaseDocument {
  name: string;
  slug: string;
  description: string;
  image: ImageAsset | null;
  icon?: string; // emoji or lucide icon name

  /** Tree structure */
  parentId: string | null;
  parentSlug: string | null;
  /** Full ancestor path for queries: ['clothing'] or ['clothing', 'hoodies'] */
  ancestorSlugs: string[];
  depth: number; // 0 = root, 1 = child, 2 = grandchild

  /** Display */
  sortOrder: number;
  productCount: number; // denormalized
  featured: boolean;

  status: PublishStatus;
  seo: SEOMeta;
}

// ─── Orders ──────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "printing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

/** Firestore: orders/{id} */
export interface Order extends BaseDocument {
  /** Human-readable order number: AP-20260328-XXXX */
  orderNumber: string;

  /** Customer info */
  customerId: string | null; // null = guest checkout
  customerEmail: string;
  customerName: string;
  customerPhone?: string;

  /** Addresses */
  shippingAddress: Address;
  billingAddress: Address;

  /** Line items (snapshot at time of order) */
  items: OrderItem[];

  /** Totals (all in pence) */
  subtotal: Money;
  shippingCost: Money;
  discount: Money;
  tax: Money;
  total: Money;

  /** Coupon */
  couponCode: string | null;

  /** Status tracking */
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentIntentId?: string;

  /** Shipping */
  shippingMethod: string;
  trackingNumber: string | null;
  trackingUrl: string | null;

  /** Timeline */
  statusHistory: OrderStatusEvent[];

  /** Notes */
  customerNote?: string;
  internalNote?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  quantity: number;
  unitPrice: Money;
  totalPrice: Money;
  /** Selected options snapshot */
  selectedColor?: string;
  selectedSize?: string;
  selectedOptions?: Record<string, string>;
  /** If customised, link to design */
  designId?: string;
}

export interface OrderStatusEvent {
  status: OrderStatus;
  timestamp: Timestamp;
  note?: string;
  updatedBy?: string; // admin user email
}

// ─── Customers ───────────────────────────────────────────────────────────

/** Firestore: customers/{id} (id = Firebase Auth UID) */
export interface Customer extends BaseDocument {
  email: string;
  displayName: string;
  phone?: string;
  avatar?: string;

  /** Addresses */
  defaultShippingAddress: Address | null;
  defaultBillingAddress: Address | null;

  /** Stats (denormalized) */
  orderCount: number;
  totalSpent: Money;
  lastOrderAt: Timestamp | null;

  /** Marketing */
  newsletterSubscribed: boolean;
  tags: string[];

  status: "active" | "blocked";
}

// ─── Homepage CMS ────────────────────────────────────────────────────────

/** Firestore: cms/homepage */
export interface HomepageCMS {
  heroSlides: HeroSlide[];
  featureBadges: FeatureBadge[];
  promoBanners: PromoBanner[];
  trustStats: TrustStat[];
  brandLogos: BrandLogo[];
  updatedAt: Timestamp;
}

export interface HeroSlide {
  id: string;
  image: ImageAsset;
  overline: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: CTALink;
  secondaryCta: CTALink;
  sortOrder: number;
  active: boolean;
}

export interface FeatureBadge {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  sortOrder: number;
}

export interface PromoBanner {
  id: string;
  overline: string;
  title: string;
  titleLine2: string;
  description: string;
  image: ImageAsset;
  bgOverlay: string; // tailwind class e.g. "bg-primary/80"
  cta: CTALink;
  sortOrder: number;
  active: boolean;
}

export interface TrustStat {
  id: string;
  value: string;
  label: string;
  sortOrder: number;
}

export interface BrandLogo {
  id: string;
  name: string;
  logo: ImageAsset | null; // null = text-only fallback
  url?: string;
  sortOrder: number;
  active: boolean;
}

// ─── Testimonials ────────────────────────────────────────────────────────

/** Firestore: testimonials/{id} */
export interface Testimonial extends BaseDocument {
  name: string;
  location: string;
  role?: string;
  avatar: ImageAsset | null;
  text: string;
  rating: number; // 1-5
  featured: boolean;
  sortOrder: number;
  status: PublishStatus;
}

// ─── Blog ────────────────────────────────────────────────────────────────

/** Firestore: blog-posts/{id} */
export interface BlogPost extends BaseDocument, SoftDeletable {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Rich text / Markdown
  coverImage: ImageAsset;
  author: string;
  tags: string[];
  featured: boolean;
  publishedAt: Timestamp | null;
  status: PublishStatus;
  seo: SEOMeta;
}

// ─── FAQ ─────────────────────────────────────────────────────────────────

/** Firestore: faq-categories/{id} */
export interface FAQCategory extends BaseDocument {
  name: string;
  slug: string;
  sortOrder: number;
}

/** Firestore: faq-categories/{categoryId}/items/{id} */
export interface FAQItem extends BaseDocument {
  categoryId: string;
  question: string;
  answer: string; // supports markdown
  sortOrder: number;
  status: PublishStatus;
}

// ─── Services ────────────────────────────────────────────────────────────

/** Firestore: services/{id} */
export interface ServicePage extends BaseDocument {
  title: string;
  slug: string;
  shortDescription: string;
  icon: string; // lucide icon name
  image: ImageAsset | null;
  content: string; // rich text / markdown
  features: string[];
  sortOrder: number;
  status: PublishStatus;
  seo: SEOMeta;
}

// ─── Site Settings ───────────────────────────────────────────────────────

/** Firestore: settings/general */
export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: ImageAsset | null;

  contact: {
    email: string;
    phone: string;
    address: string;
  };

  social: {
    facebook: string;
    instagram: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };

  businessHours: {
    weekdays: string;
    weekend: string;
  };

  /** Top bar promo message */
  topBarMessage: string;
  topBarLink: CTALink | null;

  /** Shipping thresholds */
  freeShippingThreshold: Money;

  /** Navigation menu config (stored as JSON) */
  navLinks: NavLinkConfig[];

  /** Footer link groups */
  footerLinks: Record<string, FooterLink[]>;

  updatedAt: Timestamp;
}

export interface NavLinkConfig {
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  megaMenu?: boolean;
  children?: NavLinkConfig[];
}

export interface FooterLink {
  label: string;
  href: string;
}

// ─── Newsletter Subscribers ──────────────────────────────────────────────

/** Firestore: newsletter-subscribers/{id} */
export interface NewsletterSubscriber extends BaseDocument {
  email: string;
  subscribedAt: Timestamp;
  unsubscribedAt: Timestamp | null;
  active: boolean;
  source: string; // "homepage", "checkout", "footer"
}

// ─── Custom Designs ──────────────────────────────────────────────────────

/** Firestore: designs/{id} — saved customer designs */
export interface SavedDesign extends BaseDocument {
  customerId: string | null;
  sessionId: string;
  productType: string;
  productColor: string;
  canvasData: Record<string, unknown>; // Fabric.js JSON per view
  thumbnailUrl: string | null;
  exportUrls: string[];
  status: "draft" | "submitted" | "approved" | "rejected";
}

// ─── Coupons ─────────────────────────────────────────────────────────────

export type DiscountType = "percentage" | "fixed";

/** Firestore: coupons/{id} */
export interface Coupon extends BaseDocument {
  code: string; // uppercase, unique
  description: string;
  discountType: DiscountType;
  discountValue: number; // percentage (0-100) or pence
  minimumOrderValue: Money | null;
  maxUses: number | null; // null = unlimited
  usedCount: number;
  validFrom: Timestamp;
  validUntil: Timestamp;
  applicableCategories: string[]; // empty = all
  applicableProducts: string[]; // empty = all
  active: boolean;
}

// ─── Dashboard Analytics (in-memory, not stored) ─────────────────────────

export interface DashboardStats {
  totalRevenue: Money;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: Order[];
  topProducts: { productId: string; name: string; soldCount: number }[];
  revenueByMonth: { month: string; amount: number }[];
}

// ─── Contact Messages ────────────────────────────────────────────────────

export type ContactMessageStatus = "new" | "read" | "replied";

/** Firestore: contact-messages/{id} */
export interface ContactMessage extends BaseDocument {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
}

// ─── Collection name constants ───────────────────────────────────────────

export const COLLECTIONS = {
  PRODUCTS: "products",
  CATEGORIES: "categories",
  ORDERS: "orders",
  CUSTOMERS: "customers",
  TESTIMONIALS: "testimonials",
  BLOG_POSTS: "blog-posts",
  FAQ_CATEGORIES: "faq-categories",
  SERVICES: "services",
  COUPONS: "coupons",
  NEWSLETTER: "newsletter-subscribers",
  CONTACT_MESSAGES: "contact-messages",
  DESIGNS: "designs",
  CMS: "cms",
  SETTINGS: "settings",
} as const;
