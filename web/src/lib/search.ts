/* ═══════════════════════════════════════════════════════════════════════════
 * Product Search — Client-side Firestore text search
 * Uses simple field matching since Firestore doesn't have full-text search.
 * For production, consider Algolia or Typesense.
 * ═══════════════════════════════════════════════════════════════════════════ */

import { queryDocuments } from "@/lib/firestore";
import type { Product, Category } from "@/types";

/** Search products by matching name (uses Firestore >= and <= for prefix match) */
export async function searchProducts(
  term: string,
  max = 20,
): Promise<Product[]> {
  if (!term.trim()) return [];

  // Firestore doesn't support full-text search, so we fetch published products
  // and filter client-side. For large catalogs, replace with Algolia/Typesense.
  const allProducts = await queryDocuments<Product>("products", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "isDeleted", operator: "==", value: false },
    ],
    sortBy: "sortOrder",
    sortDirection: "asc",
  });

  const lower = term.toLowerCase();
  const words = lower.split(/\s+/).filter(Boolean);

  const scored = allProducts
    .map((product) => {
      const name = product.name.toLowerCase();
      const desc = product.description.toLowerCase();
      const tags = product.tags.map((t) => t.toLowerCase());

      let score = 0;

      // Exact name match
      if (name === lower) score += 100;
      // Name starts with term
      else if (name.startsWith(lower)) score += 50;
      // Name contains term
      else if (name.includes(lower)) score += 30;

      // Word matching
      for (const word of words) {
        if (name.includes(word)) score += 10;
        if (desc.includes(word)) score += 3;
        if (tags.some((t) => t.includes(word))) score += 5;
      }

      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max);

  return scored.map((s) => s.product);
}

/** Search categories by name */
export async function searchCategories(
  term: string,
  max = 5,
): Promise<Category[]> {
  if (!term.trim()) return [];

  const allCategories = await queryDocuments<Category>("categories", {
    filters: [{ field: "status", operator: "==", value: "published" }],
    sortBy: "sortOrder",
    sortDirection: "asc",
  });

  const lower = term.toLowerCase();

  return allCategories
    .filter((cat) => cat.name.toLowerCase().includes(lower))
    .slice(0, max);
}
