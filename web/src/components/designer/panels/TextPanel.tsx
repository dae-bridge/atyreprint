"use client";

import { useState } from "react";
import type { DesignCanvasHandle } from "../DesignCanvas";
import { designerFonts, designerColorPalette } from "@/config/designerConfig";
import { cn } from "@/lib/utils";

interface TextPanelProps {
  canvasRef: React.RefObject<DesignCanvasHandle | null>;
}

export const TextPanel = ({ canvasRef }: TextPanelProps) => {
  const [text, setText] = useState("Your Text Here");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [fontSize, setFontSize] = useState(36);
  const [fontColor, setFontColor] = useState("#1A1A1A");
  const [fontWeight, setFontWeight] = useState<"normal" | "bold">("normal");
  const [fontStyle, setFontStyle] = useState<"normal" | "italic">("normal");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "center",
  );

  const handleAddText = () => {
    canvasRef.current?.addText(text);
    // After adding, we could update the active object properties
    // but keeping it simple for now — user edits inline on canvas
  };

  const fontCategories = [
    "sans-serif",
    "serif",
    "display",
    "handwriting",
    "monospace",
  ] as const;

  const [activeCategory, setActiveCategory] =
    useState<(typeof fontCategories)[number]>("sans-serif");

  const filteredFonts = designerFonts.filter(
    (f) => f.category === activeCategory,
  );

  return (
    <div className="p-4 space-y-5">
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
        Add Text
      </h3>

      {/* Text input */}
      <div>
        <label className="text-xs text-text-muted mb-1 block">
          Text Content
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          placeholder="Type your text..."
        />
      </div>

      {/* Quick add buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleAddText}
          className="flex-1 px-3 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
        >
          Add Text
        </button>
        <button
          onClick={() => {
            setText("HEADING");
            canvasRef.current?.addText("HEADING");
          }}
          className="px-3 py-2 border border-border text-sm font-medium rounded-lg hover:bg-surface transition-colors"
        >
          Heading
        </button>
        <button
          onClick={() => {
            setText("Subtitle text");
            canvasRef.current?.addText("Subtitle text");
          }}
          className="px-3 py-2 border border-border text-sm font-medium rounded-lg hover:bg-surface transition-colors"
        >
          Subtitle
        </button>
      </div>

      {/* Font categories */}
      <div>
        <label className="text-xs text-text-muted mb-1.5 block">
          Font Category
        </label>
        <div className="flex flex-wrap gap-1">
          {fontCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-2 py-1 text-xs rounded-md transition-colors capitalize",
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-surface text-text-secondary hover:text-primary",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Font list */}
      <div className="max-h-40 overflow-y-auto space-y-0.5 border border-border rounded-lg p-1">
        {filteredFonts.map((font) => (
          <button
            key={font.family}
            onClick={() => setFontFamily(font.family)}
            className={cn(
              "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
              fontFamily === font.family
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-surface",
            )}
            style={{ fontFamily: font.family }}
          >
            {font.family}
          </button>
        ))}
      </div>

      {/* Font size */}
      <div>
        <label className="text-xs text-text-muted mb-1 block">Font Size</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={8}
            max={120}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-sm font-medium text-foreground w-10 text-right">
            {fontSize}px
          </span>
        </div>
      </div>

      {/* Style buttons */}
      <div className="flex gap-2">
        <button
          onClick={() =>
            setFontWeight(fontWeight === "bold" ? "normal" : "bold")
          }
          className={cn(
            "px-3 py-1.5 text-sm font-bold rounded-md border transition-colors",
            fontWeight === "bold"
              ? "bg-primary text-white border-primary"
              : "border-border hover:bg-surface",
          )}
        >
          B
        </button>
        <button
          onClick={() =>
            setFontStyle(fontStyle === "italic" ? "normal" : "italic")
          }
          className={cn(
            "px-3 py-1.5 text-sm italic rounded-md border transition-colors",
            fontStyle === "italic"
              ? "bg-primary text-white border-primary"
              : "border-border hover:bg-surface",
          )}
        >
          I
        </button>
        {(["left", "center", "right"] as const).map((align) => (
          <button
            key={align}
            onClick={() => setTextAlign(align)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-md border transition-colors capitalize",
              textAlign === align
                ? "bg-primary text-white border-primary"
                : "border-border hover:bg-surface",
            )}
          >
            {align[0].toUpperCase()}
          </button>
        ))}
      </div>

      {/* Color palette */}
      <div>
        <label className="text-xs text-text-muted mb-1.5 block">Color</label>
        <div className="grid grid-cols-8 gap-1.5">
          {designerColorPalette.map((color) => (
            <button
              key={color}
              onClick={() => setFontColor(color)}
              className={cn(
                "w-7 h-7 rounded-md border-2 transition-transform hover:scale-110",
                fontColor === color ? "border-primary" : "border-border-light",
              )}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
          <span className="text-xs text-text-muted">{fontColor}</span>
        </div>
      </div>
    </div>
  );
};
