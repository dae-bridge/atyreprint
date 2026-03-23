"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { DesignCanvasHandle } from "../DesignCanvas";
import { clipartCategories, clipartItems } from "@/config/designerConfig";
import { cn } from "@/lib/utils";
import { Search, Check } from "lucide-react";

interface ClipartPanelProps {
  canvasRef: React.RefObject<DesignCanvasHandle | null>;
}

export const ClipartPanel = ({ canvasRef }: ClipartPanelProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return clipartItems.filter((item) => {
      if (activeCategory && item.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  const handleAddClipart = (item: (typeof clipartItems)[0]) => {
    canvasRef.current?.addImage(item.url);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-2">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
          Clipart
        </h3>
        <p className="text-xs text-text-muted mt-1">
          Click to add graphics to your design
        </p>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
          <input
            type="text"
            placeholder="Search clipart..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs border border-border rounded-lg bg-surface focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="px-4 pb-3 flex gap-1.5 flex-wrap">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "text-[10px] px-2 py-1 rounded-full border transition-colors",
            !activeCategory
              ? "bg-primary text-white border-primary"
              : "bg-white text-text-secondary border-border hover:border-primary/30",
          )}
        >
          All
        </button>
        {clipartCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "text-[10px] px-2 py-1 rounded-full border transition-colors whitespace-nowrap",
              activeCategory === cat.id
                ? "bg-primary text-white border-primary"
                : "bg-white text-text-secondary border-border hover:border-primary/30",
            )}
          >
            {cat.name.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Clipart grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-text-muted">
              No clipart found{searchQuery ? " for this search" : ""}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleAddClipart(item)}
                title={item.name}
                className={cn(
                  "group relative flex items-center justify-center p-3 rounded-lg border aspect-square transition-all",
                  addedId === item.id
                    ? "border-green-500 bg-green-50"
                    : "border-border hover:border-primary/40 hover:bg-surface",
                )}
              >
                {addedId === item.id && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
                <Image
                  src={item.url}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain group-hover:scale-110 transition-transform"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
