"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Dialog } from "./Dialog";
import { Button } from "@/components/ui";

interface ImageCropDialogProps {
  open: boolean;
  onClose: () => void;
  imageFile: File | null;
  /** Aspect ratio (width/height). Null = free crop. */
  aspectRatio?: number | null;
  onCrop: (croppedFile: File) => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ImageCropDialog = ({
  open,
  onClose,
  imageFile,
  aspectRatio = null,
  onCrop,
}: ImageCropDialogProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [imgUrl, setImgUrl] = useState<string>("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [crop, setCrop] = useState<CropArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [dragging, setDragging] = useState(false);
  const [dragType, setDragType] = useState<"move" | "resize" | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

  // Load image when file changes
  useEffect(() => {
    if (!imageFile || !open) return;
    const url = URL.createObjectURL(imageFile);
    setImgUrl(url);
    setImgLoaded(false);
    return () => URL.revokeObjectURL(url);
  }, [imageFile, open]);

  // Initialize crop area when image loads
  const handleImageLoad = useCallback(() => {
    if (!imgRef.current || !containerRef.current) return;

    const img = imgRef.current;
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const maxHeight = 400;

    // Calculate display size
    let dw = containerWidth;
    let dh = (img.naturalHeight / img.naturalWidth) * containerWidth;
    if (dh > maxHeight) {
      dh = maxHeight;
      dw = (img.naturalWidth / img.naturalHeight) * maxHeight;
    }

    setDisplaySize({ width: dw, height: dh });

    // Default crop to center 80%
    const margin = 0.1;
    let cw = dw * (1 - margin * 2);
    let ch = dh * (1 - margin * 2);

    if (aspectRatio) {
      if (cw / ch > aspectRatio) {
        cw = ch * aspectRatio;
      } else {
        ch = cw / aspectRatio;
      }
    }

    setCrop({
      x: (dw - cw) / 2,
      y: (dh - ch) / 2,
      width: cw,
      height: ch,
    });

    setImgLoaded(true);
  }, [aspectRatio]);

  // Draw overlay
  useEffect(() => {
    if (!imgLoaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = displaySize.width;
    canvas.height = displaySize.height;

    // Darken outside crop area
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clear crop area
    ctx.clearRect(crop.x, crop.y, crop.width, crop.height);

    // Draw border
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(crop.x, crop.y, crop.width, crop.height);

    // Draw grid lines (rule of thirds)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(crop.x + (crop.width * i) / 3, crop.y);
      ctx.lineTo(crop.x + (crop.width * i) / 3, crop.y + crop.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crop.x, crop.y + (crop.height * i) / 3);
      ctx.lineTo(crop.x + crop.width, crop.y + (crop.height * i) / 3);
      ctx.stroke();
    }

    // Draw resize handle (bottom-right corner)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(crop.x + crop.width - 8, crop.y + crop.height - 8, 8, 8);
  }, [imgLoaded, crop, displaySize]);

  const getMousePos = (e: React.MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const pos = getMousePos(e);

    // Check if on resize handle
    if (
      pos.x >= crop.x + crop.width - 16 &&
      pos.x <= crop.x + crop.width + 4 &&
      pos.y >= crop.y + crop.height - 16 &&
      pos.y <= crop.y + crop.height + 4
    ) {
      setDragType("resize");
      setDragging(true);
      setDragStart(pos);
      return;
    }

    // Check if inside crop area
    if (
      pos.x >= crop.x &&
      pos.x <= crop.x + crop.width &&
      pos.y >= crop.y &&
      pos.y <= crop.y + crop.height
    ) {
      setDragType("move");
      setDragging(true);
      setDragStart(pos);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !dragType) return;
    const pos = getMousePos(e);
    const dx = pos.x - dragStart.x;
    const dy = pos.y - dragStart.y;

    if (dragType === "move") {
      setCrop((prev) => {
        const newX = Math.max(
          0,
          Math.min(displaySize.width - prev.width, prev.x + dx),
        );
        const newY = Math.max(
          0,
          Math.min(displaySize.height - prev.height, prev.y + dy),
        );
        return { ...prev, x: newX, y: newY };
      });
    } else if (dragType === "resize") {
      setCrop((prev) => {
        let newW = Math.max(40, prev.width + dx);
        let newH = Math.max(40, prev.height + dy);

        if (aspectRatio) {
          newH = newW / aspectRatio;
        }

        // Clamp to bounds
        if (prev.x + newW > displaySize.width)
          newW = displaySize.width - prev.x;
        if (prev.y + newH > displaySize.height)
          newH = displaySize.height - prev.y;

        if (aspectRatio) {
          newW = Math.min(newW, newH * aspectRatio);
          newH = newW / aspectRatio;
        }

        return { ...prev, width: newW, height: newH };
      });
    }

    setDragStart(pos);
  };

  const handleMouseUp = () => {
    setDragging(false);
    setDragType(null);
  };

  const handleCrop = async () => {
    if (!imgRef.current || !imageFile) return;

    const img = imgRef.current;
    const scaleX = img.naturalWidth / displaySize.width;
    const scaleY = img.naturalHeight / displaySize.height;

    const canvas = document.createElement("canvas");
    const srcX = crop.x * scaleX;
    const srcY = crop.y * scaleY;
    const srcW = crop.width * scaleX;
    const srcH = crop.height * scaleY;

    canvas.width = srcW;
    canvas.height = srcH;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const croppedFile = new File([blob], imageFile.name, {
          type: imageFile.type,
          lastModified: Date.now(),
        });
        onCrop(croppedFile);
        onClose();
      },
      imageFile.type,
      0.9,
    );
  };

  const handleSkipCrop = () => {
    if (imageFile) {
      onCrop(imageFile);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Crop Image" size="xl">
      <div ref={containerRef} className="relative select-none">
        {imgUrl && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imgUrl}
              alt="Crop preview"
              onLoad={handleImageLoad}
              style={{
                width: displaySize.width || "100%",
                height: displaySize.height || "auto",
                display: "block",
              }}
              draggable={false}
            />
            {imgLoaded && (
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 cursor-crosshair"
                style={{ width: displaySize.width, height: displaySize.height }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            )}
          </>
        )}
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline" onClick={handleSkipCrop}>
          Skip Crop
        </Button>
        <Button onClick={handleCrop}>Apply Crop</Button>
      </div>
    </Dialog>
  );
};
