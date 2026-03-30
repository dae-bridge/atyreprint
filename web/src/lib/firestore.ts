/* ═══════════════════════════════════════════════════════════════════════════
 * Web Firestore Service — Read-Only
 * Public-facing queries for categories, products, and CMS content
 * ═══════════════════════════════════════════════════════════════════════════ */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  type WhereFilterOp,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// ─── Serialization (strip Firestore Timestamp → ISO string) ──────────────

/**
 * Recursively convert Firestore Timestamp objects to ISO strings
 * so data can safely pass from Server Components → Client Components.
 */
export function serialize<T>(data: T): T {
  if (data === null || data === undefined) return data;
  if (data instanceof Timestamp) return data.toDate().toISOString() as unknown as T;
  if (Array.isArray(data)) return data.map((item) => serialize(item)) as unknown as T;
  if (typeof data === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      result[key] = serialize(value);
    }
    return result as T;
  }
  return data;
}

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
}

// ─── Generic Read Operations ─────────────────────────────────────────────

/** Get a single document by ID */
export async function getDocument<T>(
  collectionName: string,
  id: string,
): Promise<T | null> {
  const snap = await getDoc(doc(db, collectionName, id));
  if (!snap.exists()) return null;
  return serialize({ id: snap.id, ...snap.data() } as T);
}

/** Query documents with filters, sorting, and limit */
export async function queryDocuments<T>(
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

  const q = query(collection(db, collectionName), ...constraints);
  const snap = await getDocs(q);

  return snap.docs.map((d) => serialize({ id: d.id, ...d.data() } as T));
}

/** Get all documents in a collection */
export async function getAllDocuments<T>(
  collectionName: string,
  sortField: string = "sortOrder",
  sortDir: "asc" | "desc" = "asc",
): Promise<T[]> {
  const q = query(collection(db, collectionName), orderBy(sortField, sortDir));
  const snap = await getDocs(q);
  return snap.docs.map((d) => serialize({ id: d.id, ...d.data() }) as T);
}

/** Get a singleton document (e.g. settings, CMS) */
export async function getSingleton<T>(
  collectionName: string,
  docId: string,
): Promise<T | null> {
  const snap = await getDoc(doc(db, collectionName, docId));
  if (!snap.exists()) return null;
  return serialize(snap.data() as T);
}
