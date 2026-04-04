/* ═══════════════════════════════════════════════════════════════════════════
 * Product & Category Data Layer — Firestore-backed
 * Replaces the old static data with live Firestore queries.
 * Re-exports shared types for backward compatibility.
 * ═══════════════════════════════════════════════════════════════════════════ */

import { queryDocuments, getAllDocuments, getDocument } from "@/lib/firestore";
import type {
  Product,
  Category,
  ProductColor,
  ProductVariant,
  ProductAdditionalInfo,
  ProductReview,
  Money,
  ImageAsset,
} from "@/types";

// Re-export types so existing imports keep working
export type {
  Product,
  ProductColor,
  ProductVariant,
  ProductAdditionalInfo,
  ProductReview,
};

// ─── Backward-compat alias ───────────────────────────────────────────────
// Components that import `ProductData` can keep working unchanged.
export type ProductData = Product;

// ─── Shipping / Returns (static, not in Firestore) ──────────────────────

const defaultShippingInfo = `We offer fast and reliable shipping on all orders.\n\n- **Dispatch:** Within 24 hours\n- **Free shipping** on all orders over £99\n- **Standard delivery:** 3–5 business days\n- **Express delivery:** 1–2 business days (additional charge)\n- **International delivery:** 5–10 business days\n\nPlease note delivery times are estimates and may vary.`;

const defaultReturnPolicy = `We want you to be completely happy with your purchase.\n\n1. Items must be unused, undamaged, and in original condition.\n2. Original tags, labels, and packaging must be intact.\n3. Returns must be initiated within 30 days of delivery.\n4. Proof of purchase is required for all returns.\n5. Custom/personalised items cannot be returned unless defective.\n\nContact us at support@atyreprint.com to start a return.`;

export const shippingAndReturnInfo = {
  shipping: defaultShippingInfo,
  returns: defaultReturnPolicy,
};

// ─── Category Queries ────────────────────────────────────────────────────

/** Get all published categories (sorted by sortOrder) */
export async function getAllCategories(): Promise<Category[]> {
  return queryDocuments<Category>("categories", {
    filters: [{ field: "status", operator: "==", value: "published" }],
    sortBy: "sortOrder",
    sortDirection: "asc",
  });
}

/** Get root categories (depth 0) */
export async function getRootCategories(): Promise<Category[]> {
  return queryDocuments<Category>("categories", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "depth", operator: "==", value: 0 },
    ],
    sortBy: "sortOrder",
    sortDirection: "asc",
  });
}

/** Get child categories of a parent */
export async function getChildCategories(
  parentId: string,
): Promise<Category[]> {
  return queryDocuments<Category>("categories", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "parentId", operator: "==", value: parentId },
    ],
    sortBy: "sortOrder",
    sortDirection: "asc",
  });
}

/** Get a category by its slug */
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const results = await queryDocuments<Category>("categories", {
    filters: [{ field: "slug", operator: "==", value: slug }],
    pageSize: 1,
  });
  return results[0] || null;
}

/** Build category tree: root categories with their children */
export async function getCategoryTree(): Promise<
  { parent: Category; children: Category[] }[]
> {
  const all = await getAllCategories();
  const roots = all.filter((c) => c.depth === 0);
  return roots.map((parent) => ({
    parent,
    children: all.filter((c) => c.parentId === parent.id),
  }));
}

// ─── Product Queries ─────────────────────────────────────────────────────

/** Get all published, non-deleted products */
export async function getAllProducts(): Promise<Product[]> {
  return queryDocuments<Product>("products", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "isDeleted", operator: "==", value: false },
    ],
    sortBy: "sortOrder",
    sortDirection: "asc",
  });
}

/** Get products by category ID */
export async function getProductsByCategoryId(
  categoryId: string,
): Promise<Product[]> {
  return queryDocuments<Product>("products", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "isDeleted", operator: "==", value: false },
      { field: "categoryId", operator: "==", value: categoryId },
    ],
    sortBy: "sortOrder",
    sortDirection: "asc",
  });
}

/** Get products whose categoryPath contains a given slug (for group pages) */
export async function getProductsByCategoryPath(
  slug: string,
): Promise<Product[]> {
  return queryDocuments<Product>("products", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "isDeleted", operator: "==", value: false },
      { field: "categoryPath", operator: "array-contains", value: slug },
    ],
    sortBy: "sortOrder",
    sortDirection: "asc",
  });
}

/** Get a single product by slug */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const results = await queryDocuments<Product>("products", {
    filters: [
      { field: "slug", operator: "==", value: slug },
      { field: "isDeleted", operator: "==", value: false },
    ],
    pageSize: 1,
  });
  return results[0] || null;
}

/** Get featured products */
export async function getFeaturedProducts(max = 10): Promise<Product[]> {
  return queryDocuments<Product>("products", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "isDeleted", operator: "==", value: false },
      { field: "featured", operator: "==", value: true },
    ],
    sortBy: "sortOrder",
    sortDirection: "asc",
    pageSize: max,
  });
}

/** Get products that have a specific tag (e.g. "bestselling", "trending", "popular") */
export async function getProductsByTag(
  tag: string,
  max = 4,
): Promise<Product[]> {
  return queryDocuments<Product>("products", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "isDeleted", operator: "==", value: false },
      { field: "tags", operator: "array-contains", value: tag },
    ],
    sortBy: "sortOrder",
    sortDirection: "asc",
    pageSize: max,
  });
}

/** Get top-rated products sorted by rating descending */
export async function getTopRatedProducts(max = 6): Promise<Product[]> {
  return queryDocuments<Product>("products", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "isDeleted", operator: "==", value: false },
    ],
    sortBy: "rating",
    sortDirection: "desc",
    pageSize: max,
  });
}

/** Get related products (same category, excluding current) */
export async function getRelatedProducts(
  product: Product,
  max = 6,
): Promise<Product[]> {
  const sameCategory = await queryDocuments<Product>("products", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "isDeleted", operator: "==", value: false },
      { field: "categoryId", operator: "==", value: product.categoryId },
    ],
    sortBy: "sortOrder",
    sortDirection: "asc",
    pageSize: max + 1,
  });
  const filtered = sameCategory.filter((p) => p.id !== product.id);
  if (filtered.length >= max) return filtered.slice(0, max);

  // Fill remaining slots with other products
  const others = await queryDocuments<Product>("products", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "isDeleted", operator: "==", value: false },
    ],
    sortBy: "sortOrder",
    sortDirection: "asc",
    pageSize: max + 1,
  });
  const moreFiltered = others.filter(
    (p) => p.id !== product.id && !filtered.some((f) => f.id === p.id),
  );
  return [...filtered, ...moreFiltered].slice(0, max);
}
