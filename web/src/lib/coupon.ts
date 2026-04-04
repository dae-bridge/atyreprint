import { queryDocuments } from "@/lib/firestore";
import type { Coupon } from "@/types";

export interface CouponResult {
  valid: boolean;
  coupon?: Coupon;
  error?: string;
  discountAmount?: number;
}

/**
 * Validate a coupon code against Firestore coupons collection.
 * Returns the coupon data and calculated discount amount.
 */
export async function validateCoupon(
  code: string,
  subtotalPence: number,
): Promise<CouponResult> {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) return { valid: false, error: "Please enter a coupon code." };

  const coupons = await queryDocuments<Coupon>("coupons", {
    filters: [
      { field: "code", operator: "==", value: trimmed },
      { field: "active", operator: "==", value: true },
    ],
    pageSize: 1,
  });

  if (coupons.length === 0) {
    return { valid: false, error: "Invalid coupon code." };
  }

  const coupon = coupons[0];

  // Check date validity
  const now = new Date();
  if (coupon.validFrom && new Date(coupon.validFrom) > now) {
    return { valid: false, error: "This coupon is not yet active." };
  }
  if (coupon.validUntil && new Date(coupon.validUntil) < now) {
    return { valid: false, error: "This coupon has expired." };
  }

  // Check usage limit
  if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
    return { valid: false, error: "This coupon has reached its usage limit." };
  }

  // Check minimum order value
  if (
    coupon.minimumOrderValue &&
    subtotalPence < coupon.minimumOrderValue.amount
  ) {
    const minPounds = (coupon.minimumOrderValue.amount / 100).toFixed(2);
    return {
      valid: false,
      error: `Minimum order of £${minPounds} required for this coupon.`,
    };
  }

  // Calculate discount
  let discountAmount: number;
  if (coupon.discountType === "percentage") {
    discountAmount = Math.round(subtotalPence * (coupon.discountValue / 100));
  } else {
    // Fixed amount (stored in pence)
    discountAmount = Math.min(coupon.discountValue, subtotalPence);
  }

  return {
    valid: true,
    coupon,
    discountAmount,
  };
}
