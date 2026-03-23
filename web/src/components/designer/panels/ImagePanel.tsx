"use client";

import { useRef, useState } from "react";
import type { DesignCanvasHandle } from "../DesignCanvas";
import {
  MAX_UPLOAD_SIZE_BYTES,
  ALLOWED_IMAGE_TYPES,
} from "@/config/designerConfig";
import { Upload, AlertCircle, Image } from "lucide-react";

interface ImagePanelProps {
  canvasRef: React.RefObject<DesignCanvasHandle | null>;
}

export const ImagePanel = ({ canvasRef }: ImagePanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentImages, setRecentImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Please upload a JPEG, PNG, SVG, or WebP image.");
      return;
    }

    // Validate file size (5 MB)
    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setError("File size must be under 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      canvasRef.current?.addImage(dataUrl);
      setRecentImages((prev) => [dataUrl, ...prev].slice(0, 12));
    };
    reader.readAsDataURL(file);

    // Reset the input so the same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="p-4 space-y-5">
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
        Upload Image
      </h3>

      {/* Drop zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
      >
        <Upload size={32} className="mx-auto text-text-muted mb-3" />
        <p className="text-sm font-medium text-foreground mb-1">
          Click to upload
        </p>
        <p className="text-xs text-text-muted">
          JPEG, PNG, SVG, or WebP (max 5 MB)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_IMAGE_TYPES.join(",")}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-error bg-error/10 px-3 py-2 rounded-lg">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Tips */}
      <div className="bg-surface rounded-lg p-3">
        <p className="text-xs font-semibold text-foreground mb-1">Tips</p>
        <ul className="text-xs text-text-muted space-y-1">
          <li>• Use high-resolution images (300 DPI) for best print quality</li>
          <li>• PNG with transparent background works best for logos</li>
          <li>• SVG files will scale perfectly at any size</li>
        </ul>
      </div>

      {/* Recently uploaded */}
      {recentImages.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">
            Recently Uploaded
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {recentImages.map((url, i) => (
              <button
                key={i}
                onClick={() => canvasRef.current?.addImage(url)}
                className="aspect-square rounded-lg border border-border overflow-hidden hover:border-primary transition-colors bg-white"
              >
                <img
                  src={url}
                  alt={`Upload ${i + 1}`}
                  className="w-full h-full object-contain p-1"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
