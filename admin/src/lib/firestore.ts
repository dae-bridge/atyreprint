/* ═══════════════════════════════════════════════════════════════════════════
 * Generic Firestore CRUD Service
 * Provides type-safe read/write/delete operations for any collection
 * ═══════════════════════════════════════════════════════════════════════════ */

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  DocumentReference,
  QueryConstraint,
  setDoc,
  writeBatch,
  serverTimestamp,
  type DocumentData,
  type WhereFilterOp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BaseDocument } from "@/types";

// ─── Query helpers ───────────────────────────────────────────────────────

export interface QueryFilter {
  field: string;
  operator: WhereFilterOp;
  value: unknown;
}

export interface QueryOptions {
  filters?: QueryFilter[];
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  pageSize?: number;
  lastDoc?: DocumentData;
}

// ─── Generic CRUD ────────────────────────────────────────────────────────

/** Create a document with auto-generated ID */
export async function createDocument<T extends BaseDocument>(
  collectionName: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/** Create a document with a specific ID */
export async function setDocument<T extends BaseDocument>(
  collectionName: string,
  id: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">,
): Promise<void> {
  await setDoc(doc(db, collectionName, id), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/** Get a single document by ID */
export async function getDocument<T extends BaseDocument>(
  collectionName: string,
  id: string,
): Promise<T | null> {
  const snap = await getDoc(doc(db, collectionName, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as T;
}

/** Update specific fields on a document */
export async function updateDocument(
  collectionName: string,
  id: string,
  data: Record<string, unknown>,
): Promise<void> {
  await updateDoc(doc(db, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Hard delete a document */
export async function deleteDocument(
  collectionName: string,
  id: string,
): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}

/** Soft delete — sets isDeleted flag */
export async function softDeleteDocument(
  collectionName: string,
  id: string,
): Promise<void> {
  await updateDoc(doc(db, collectionName, id), {
    isDeleted: true,
    deletedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/** Query documents with filters, sorting, and pagination */
export async function queryDocuments<T extends BaseDocument>(
  collectionName: string,
  options: QueryOptions = {},
): Promise<T[]> {
  const constraints: QueryConstraint[] = [];

  if (options.filters) {
    for (const f of options.filters) {
      constraints.push(where(f.field, f.operator, f.value));
    }
  }

  if (options.sortBy) {
    constraints.push(orderBy(options.sortBy, options.sortDirection ?? "asc"));
  }

  if (options.pageSize) {
    constraints.push(limit(options.pageSize));
  }

  if (options.lastDoc) {
    constraints.push(startAfter(options.lastDoc));
  }

  const q = query(collection(db, collectionName), ...constraints);
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

/** Get all documents in a collection (use sparingly) */
export async function getAllDocuments<T extends BaseDocument>(
  collectionName: string,
  sortField: string = "createdAt",
  sortDir: "asc" | "desc" = "desc",
): Promise<T[]> {
  const q = query(
    collection(db, collectionName),
    orderBy(sortField, sortDir),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

/** Batch write (up to 500 operations) */
export async function batchUpdate(
  operations: {
    type: "set" | "update" | "delete";
    collection: string;
    id: string;
    data?: Record<string, unknown>;
  }[],
): Promise<void> {
  const batch = writeBatch(db);

  for (const op of operations) {
    const ref = doc(db, op.collection, op.id);
    switch (op.type) {
      case "set":
        batch.set(ref, {
          ...op.data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        break;
      case "update":
        batch.update(ref, {
          ...op.data,
          updatedAt: serverTimestamp(),
        });
        break;
      case "delete":
        batch.delete(ref);
        break;
    }
  }

  await batch.commit();
}

// ─── Singleton document helpers (for settings/cms) ───────────────────────

/** Get a singleton document (e.g. settings/general, cms/homepage) */
export async function getSingleton<T>(
  collectionName: string,
  docId: string,
): Promise<T | null> {
  const snap = await getDoc(doc(db, collectionName, docId));
  if (!snap.exists()) return null;
  return snap.data() as T;
}

/** Set/overwrite a singleton document */
export async function setSingleton<T extends Record<string, unknown>>(
  collectionName: string,
  docId: string,
  data: T,
): Promise<void> {
  await setDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Update specific fields on a singleton */
export async function updateSingleton(
  collectionName: string,
  docId: string,
  data: Record<string, unknown>,
): Promise<void> {
  await updateDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}
