"use client";

import type { DesignCanvasHandle } from "../DesignCanvas";
import { cn } from "@/lib/utils";
import { designerColorPalette } from "@/config/designerConfig";
import { useState } from "react";

interface ShapesPanelProps {
  canvasRef: React.RefObject<DesignCanvasHandle | null>;
}

const shapes = [
  { id: "rectangle", label: "Rectangle", preview: "□" },
  { id: "circle", label: "Circle", preview: "○" },
  { id: "triangle", label: "Triangle", preview: "△" },
  { id: "line", label: "Line", preview: "—" },
] as const;

export const ShapesPanel = ({ canvasRef }: ShapesPanelProps) => {
  const [fillColor, setFillColor] = useState("#a7cf45");

  return (
    <div className="p-4 space-y-5">
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
        Shapes
      </h3>

      {/* Shape grid */}
      <div className="grid grid-cols-2 gap-2">
        {shapes.map((shape) => (
          <button
            key={shape.id}
            onClick={() => canvasRef.current?.addShape(shape.id)}
            className="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-surface hover:border-primary/30 transition-colors group"
          >
            <span className="text-3xl text-text-secondary group-hover:text-primary transition-colors">
              {shape.preview}
            </span>
            <span className="text-xs text-text-muted mt-1">{shape.label}</span>
          </button>
        ))}
      </div>

      {/* Fill Color */}
      <div>
        <label className="text-xs text-text-muted mb-1.5 block">
          Fill Color
        </label>
        <div className="grid grid-cols-8 gap-1.5">
          {designerColorPalette.slice(0, 16).map((color) => (
            <button
              key={color}
              onClick={() => setFillColor(color)}
              className={cn(
                "w-7 h-7 rounded-md border-2 transition-transform hover:scale-110",
                fillColor === color ? "border-primary" : "border-border-light",
              )}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
          <span className="text-xs text-text-muted">{fillColor}</span>
        </div>
      </div>
    </div>
  );
};
