import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/lib/firebase";

/**
 * Upload a file to Firebase Storage and return the download URL + path.
 * @param file The file to upload
 * @param folder Storage folder path, e.g. "products/images"
 * @param fileName Optional custom filename (defaults to timestamped original name)
 */
export async function uploadFile(
  file: File,
  folder: string,
  fileName?: string,
): Promise<{ url: string; storagePath: string }> {
  const safeName =
    fileName ?? `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const storagePath = `${folder}/${safeName}`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file, {
    contentType: file.type,
  });

  const url = await getDownloadURL(storageRef);
  return { url, storagePath };
}

/**
 * Delete a file from Firebase Storage by its path.
 */
export async function deleteFile(storagePath: string): Promise<void> {
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error: unknown) {
    // Ignore "object not found" errors (already deleted)
    if (
      error instanceof Error &&
      error.message.includes("storage/object-not-found")
    ) {
      return;
    }
    throw error;
  }
}
