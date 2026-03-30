/* ═══════════════════════════════════════════════════════════════════════════
 * AtyrePrint — Cloud Functions
 *
 * Central entry point for all Firebase Cloud Functions.
 * Organised by domain — add new function files in src/ and re-export here.
 * ═══════════════════════════════════════════════════════════════════════════ */

import * as admin from "firebase-admin";

// Initialise Firebase Admin SDK (once)
admin.initializeApp();

export const db = admin.firestore();
export const storage = admin.storage();

// ─── Re-export function groups ───────────────────────────────────────────
// Uncomment as you add function files:
//
// export { onOrderCreated, onOrderStatusChanged } from "./orders";
// export { onProductWrite } from "./products";
// export { sendContactEmail } from "./email";
// export { setAdminClaim } from "./auth";

// ─── Callable: Set admin custom claim ────────────────────────────────────
// Use this to grant admin access to a user. Call from a secure context
// (Firebase console or a one-off script) — NOT from the client.

import { onCall, HttpsError } from "firebase-functions/v2/https";

export const setAdminClaim = onCall(async (request) => {
  // Only existing admins can promote other users
  if (!request.auth?.token?.admin) {
    throw new HttpsError(
      "permission-denied",
      "Only admins can set admin claims.",
    );
  }

  const { uid } = request.data;
  if (!uid || typeof uid !== "string") {
    throw new HttpsError("invalid-argument", "A valid uid is required.");
  }

  await admin.auth().setCustomUserClaims(uid, { admin: true });
  return { message: `Admin claim set for user ${uid}` };
});

// ─── Firestore Trigger: Update category product count ────────────────────

import { onDocumentWritten } from "firebase-functions/v2/firestore";

export const onProductWrite = onDocumentWritten(
  "products/{productId}",
  async (event) => {
    const before = event.data?.before?.data();
    const after = event.data?.after?.data();

    const oldCategory = before?.categoryId as string | undefined;
    const newCategory = after?.categoryId as string | undefined;

    // Category didn't change — skip
    if (oldCategory === newCategory) return;

    const batch = db.batch();

    // Decrement old category count
    if (oldCategory) {
      const ref = db.collection("categories").doc(oldCategory);
      batch.update(ref, {
        productCount: admin.firestore.FieldValue.increment(-1),
      });
    }

    // Increment new category count
    if (newCategory) {
      const ref = db.collection("categories").doc(newCategory);
      batch.update(ref, {
        productCount: admin.firestore.FieldValue.increment(1),
      });
    }

    await batch.commit();
  },
);

// ─── Firestore Trigger: Update order totals on status change ─────────────

export const onOrderStatusChanged = onDocumentWritten(
  "orders/{orderId}",
  async (event) => {
    const before = event.data?.before?.data();
    const after = event.data?.after?.data();

    if (!after || before?.status === after.status) return;

    // Update customer's order stats when order is delivered
    if (after.status === "delivered" && after.customerId) {
      const customerRef = db.collection("customers").doc(after.customerId);
      await customerRef.update({
        totalOrders: admin.firestore.FieldValue.increment(1),
        totalSpent: admin.firestore.FieldValue.increment(
          after.totals?.total ?? 0,
        ),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  },
);
