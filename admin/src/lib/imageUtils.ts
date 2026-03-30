/**
 * Client-side image compression using Canvas API.
 * Resizes large images and re-encodes to reduce file size.
 */

interface CompressOptions {
  /** Max dimension (width or height). Default: 1920 */
  maxDimension?: number;
  /** JPEG/WebP quality 0–1. Default: 0.8 */
  quality?: number;
  /** Output type. Default: "image/webp" */
  outputType?: string;
}

export async function compressImage(
  file: File,
  options: CompressOptions = {},
): Promise<File> {
  const {
    maxDimension = 1920,
    quality = 0.8,
    outputType = "image/webp",
  } = options;

  // Skip non-image files
  if (!file.type.startsWith("image/")) return file;

  // Skip SVGs — can't be compressed this way
  if (file.type === "image/svg+xml") return file;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

      // Scale down if larger than maxDimension
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }

          // Determine extension from output type
          const ext = outputType === "image/webp" ? ".webp" : outputType === "image/png" ? ".png" : ".jpg";
          const baseName = file.name.replace(/\.[^.]+$/, "");

          const compressed = new File([blob], `${baseName}${ext}`, {
            type: outputType,
            lastModified: Date.now(),
          });

          // Only use compressed version if it's actually smaller
          resolve(compressed.size < file.size ? compressed : file);
        },
        outputType,
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image for compression"));
    };

    img.src = url;
  });
}
