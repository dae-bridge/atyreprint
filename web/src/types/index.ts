// ─── Base / Shared ───────────────────────────────────────────────────────

export interface BaseDocument {
  id: string;
  createdAt: string; // ISO string (serialized from Firestore Timestamp)
  updatedAt: string; // ISO string (serialized from Firestore Timestamp)
}

export type PublishStatus = "draft" | "published" | "archived";

export interface SEOMeta {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl?: string;
}

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  storagePath?: string;
}

export interface Money {
  amount: number; // in pence (e.g. 1999 = £19.99)
  currency: string; // ISO 4217 e.g. "GBP"
}

// ─── Products ────────────────────────────────────────────────────────────

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex: number; // @deprecated — kept for backward compat
  images: ImageAsset[]; // per-color gallery images
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

/** Firestore product document — matches admin schema */
export interface Product extends BaseDocument {
  sku: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: Money;
  compareAtPrice: Money | null;
  images: ImageAsset[];
  bannerImage: ImageAsset | null;
  categoryId: string;
  categoryPath: string[];
  tags: string[];
  colors: ProductColor[];
  variants: ProductVariant[];
  features: string[];
  additionalInfo: ProductAdditionalInfo[];
  inStock: boolean;
  stockQuantity: number | null;
  badge: string | null;
  buttonLabel: string;
  featured: boolean;
  customisable: boolean;
  sortOrder: number;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  status: PublishStatus;
  seo: SEOMeta;
  isDeleted: boolean;
  deletedAt: string | null;
}

// ─── Categories ──────────────────────────────────────────────────────────

/** Firestore category document — matches admin schema */
export interface Category extends BaseDocument {
  name: string;
  slug: string;
  description: string;
  image: ImageAsset | null;
  icon?: string;
  parentId: string | null;
  parentSlug: string | null;
  ancestorSlugs: string[];
  depth: number;
  sortOrder: number;
  productCount: number;
  featured: boolean;
  status: PublishStatus;
  seo: SEOMeta;
}

// ─── CTA / Navigation Shared ─────────────────────────────────────────────

export interface CTALink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

// ─── Homepage CMS ────────────────────────────────────────────────────────

/** Firestore: cms/homepage */
export interface HomepageCMS {
  heroSlides: HeroSlide[];
  featureBadges: FeatureBadge[];
  promoBanners: PromoBanner[];
  trustStats: TrustStat[];
  brandLogos: BrandLogo[];
  updatedAt: string;
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
  icon: string;
  sortOrder: number;
}

export interface PromoBanner {
  id: string;
  overline: string;
  title: string;
  titleLine2: string;
  description: string;
  image: ImageAsset;
  bgOverlay: string;
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
  logo: ImageAsset | null;
  url?: string;
  sortOrder: number;
  active: boolean;
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

  topBarMessage: string;
  topBarLink: CTALink | null;

  freeShippingThreshold: Money;

  navLinks: NavLinkConfig[];
  footerLinks: Record<string, FooterLink[]>;

  updatedAt: string;
}

export interface NavLinkConfig {
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  megaMenu?: boolean;
  children?: NavLinkConfig[];
}

// ─── Utility Types ───────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
}

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
  answer: string;
  sortOrder: number;
  status: PublishStatus;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────

/** Convert Money (pence) to display pounds: 1999 → 19.99 */
export function formatPrice(money: Money | null | undefined): string {
  if (!money) return "0.00";
  return (money.amount / 100).toFixed(2);
}

/** Convert Money to number in pounds: 1999 → 19.99 */
export function priceToPounds(money: Money | null | undefined): number {
  if (!money) return 0;
  return money.amount / 100;
}

/** Get image URL from ImageAsset, with fallback */
export function getImageUrl(
  image: ImageAsset | null | undefined,
  fallback = "/images/placeholder.jpg",
): string {
  return image?.url || fallback;
}
