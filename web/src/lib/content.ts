/* ═══════════════════════════════════════════════════════════════════════════
 * Content Data Layer — Firestore-backed
 * Fetches testimonials, FAQs, and other content collections.
 * ═══════════════════════════════════════════════════════════════════════════ */

import { queryDocuments } from "@/lib/firestore";
import type { Testimonial, FAQCategory, FAQItem } from "@/types";

// ─── Testimonials ────────────────────────────────────────────────────────

/** Get published testimonials, sorted by sortOrder */
export async function getTestimonials(max = 10): Promise<Testimonial[]> {
  return queryDocuments<Testimonial>("testimonials", {
    filters: [{ field: "status", operator: "==", value: "published" }],
    sortBy: "sortOrder",
    sortDirection: "asc",
    pageSize: max,
  });
}

/** Get featured testimonials only */
export async function getFeaturedTestimonials(max = 6): Promise<Testimonial[]> {
  return queryDocuments<Testimonial>("testimonials", {
    filters: [
      { field: "status", operator: "==", value: "published" },
      { field: "featured", operator: "==", value: true },
    ],
    sortBy: "sortOrder",
    sortDirection: "asc",
    pageSize: max,
  });
}

// ─── FAQs ────────────────────────────────────────────────────────────────

/** Get all FAQ categories, sorted by sortOrder */
export async function getFAQCategories(): Promise<FAQCategory[]> {
  return queryDocuments<FAQCategory>("faq-categories", {
    sortBy: "sortOrder",
    sortDirection: "asc",
  });
}

/** Get published FAQ items for a specific category */
export async function getFAQItems(categoryId: string): Promise<FAQItem[]> {
  return queryDocuments<FAQItem>(`faq-categories/${categoryId}/items`, {
    filters: [{ field: "status", operator: "==", value: "published" }],
    sortBy: "sortOrder",
    sortDirection: "asc",
  });
}

/** Get all FAQ categories with their items (for the FAQs page) */
export async function getFAQsWithItems(): Promise<
  { category: FAQCategory; items: FAQItem[] }[]
> {
  const categories = await getFAQCategories();
  const results = await Promise.all(
    categories.map(async (category) => ({
      category,
      items: await getFAQItems(category.id),
    })),
  );
  // Only return categories that have published items
  return results.filter((r) => r.items.length > 0);
}
