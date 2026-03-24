"use client";

import { useState, useEffect, useCallback } from "react";
import type { DesignCanvasHandle } from "../DesignCanvas";
import { designerColorPalette } from "@/config/designerConfig";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";

interface DrawPanelProps {
  canvasRef: React.RefObject<DesignCanvasHandle | null>;
}

export const DrawPanel = ({ canvasRef }: DrawPanelProps) => {
  const [brushColor, setBrushColor] = useState("#1A1A1A");
  const [brushWidth, setBrushWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);

  const toggleDrawing = useCallback(() => {
    const next = !isDrawing;
    setIsDrawing(next);
    canvasRef.current?.setDrawingMode(next);
  }, [isDrawing, canvasRef]);

  /* Turn off drawing mode when panel unmounts */
  useEffect(() => {
    return () => {
      canvasRef.current?.setDrawingMode(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleColorChange = (color: string) => {
    setBrushColor(color);
    canvasRef.current?.setBrushColor(color);
  };

  const handleWidthChange = (width: number) => {
    setBrushWidth(width);
    canvasRef.current?.setBrushWidth(width);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-2">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
          Free Draw
        </h3>
        <p className="text-xs text-text-muted mt-1">
          Draw freehand on the canvas
        </p>
      </div>

      {/* Toggle drawing */}
      <div className="px-4 pb-4">
        <button
          onClick={toggleDrawing}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors",
            isDrawing
              ? "bg-primary text-white"
              : "bg-surface text-foreground border border-border hover:border-primary/40",
          )}
        >
          <Paintbrush size={16} />
          {isDrawing ? "Drawing Active" : "Start Drawing"}
        </button>
      </div>

      {/* Brush size */}
      <div className="px-4 pb-4">
        <label className="text-[11px] font-medium text-text-secondary uppercase tracking-wider mb-2 block">
          Brush Size: {brushWidth}px
        </label>
        <input
          type="range"
          min={1}
          max={30}
          value={brushWidth}
          onChange={(e) => handleWidthChange(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between mt-1">
          {[1, 3, 6, 12, 20].map((w) => (
            <button
              key={w}
              onClick={() => handleWidthChange(w)}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg border transition-colors",
                brushWidth === w
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30",
              )}
            >
              <div
                className="rounded-full bg-foreground"
                style={{ width: Math.min(w, 20), height: Math.min(w, 20) }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Brush color */}
      <div className="px-4 pb-4">
        <label className="text-[11px] font-medium text-text-secondary uppercase tracking-wider mb-2 block">
          Brush Color
        </label>
        <div className="grid grid-cols-6 gap-1.5">
          {designerColorPalette.slice(0, 18).map((hex) => (
            <button
              key={hex}
              onClick={() => handleColorChange(hex)}
              title={hex}
              className={cn(
                "w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110",
                brushColor === hex
                  ? "border-primary ring-2 ring-primary/30 scale-110"
                  : "border-border",
              )}
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="color"
            value={brushColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border border-border"
          />
          <span className="text-xs text-text-muted font-mono uppercase">
            {brushColor}
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="px-4 mt-auto pb-4">
        <div className="bg-surface rounded-lg p-3">
          <p className="text-[10px] text-text-muted leading-relaxed">
            💡 Click &quot;Start Drawing&quot; to enable freehand mode. Click
            any other tool to stop drawing. Each stroke becomes a separate
            canvas element you can move and resize.
          </p>
        </div>
      </div>
    </div>
  );
};
