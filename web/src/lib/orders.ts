import { addDocument, queryDocuments, getDocument } from "@/lib/firestore";
import type { Order } from "@/types";

/**
 * Generate a human-readable order number: AP-YYYYMMDD-XXXX
 */
export function generateOrderNumber(): string {
  const d = new Date();
  const dateStr = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `AP-${dateStr}-${rand}`;
}

/**
 * Create an order in Firestore. Returns the order document ID.
 */
export async function createOrder(
  orderData: Omit<Order, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  return addDocument("orders", orderData as unknown as Record<string, unknown>);
}

/**
 * Get orders for a specific user, sorted by newest first.
 */
export async function getOrdersByUser(userId: string): Promise<Order[]> {
  return queryDocuments<Order>("orders", {
    filters: [{ field: "customerId", operator: "==", value: userId }],
    sortBy: "createdAt",
    sortDirection: "desc",
  });
}

/**
 * Get a single order by ID.
 */
export async function getOrderById(id: string): Promise<Order | null> {
  return getDocument<Order>("orders", id);
}

/**
 * Look up an order by order number and email (for guest tracking).
 */
export async function trackOrder(
  orderNumber: string,
  email: string,
): Promise<Order | null> {
  const results = await queryDocuments<Order>("orders", {
    filters: [
      {
        field: "orderNumber",
        operator: "==",
        value: orderNumber.trim().toUpperCase(),
      },
      {
        field: "customerEmail",
        operator: "==",
        value: email.trim().toLowerCase(),
      },
    ],
    pageSize: 1,
  });
  return results[0] || null;
}
