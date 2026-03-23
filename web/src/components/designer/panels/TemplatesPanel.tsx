"use client";

import { useState, useMemo } from "react";
import type { DesignCanvasHandle } from "../DesignCanvas";
import { useDesignStore } from "@/hooks/useDesignStore";
import {
  designTemplates,
  designTemplateCategories,
} from "@/config/designerConfig";
import { cn } from "@/lib/utils";
import { Search, Check } from "lucide-react";

interface TemplatesPanelProps {
  canvasRef: React.RefObject<DesignCanvasHandle | null>;
}

export const TemplatesPanel = ({ canvasRef }: TemplatesPanelProps) => {
  const { selectedProduct } = useDesignStore();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedId, setAppliedId] = useState<string | null>(null);

  /* Filter templates by selected product type + category + search */
  const filteredTemplates = useMemo(() => {
    return designTemplates.filter((tpl) => {
      // Must match the selected product type
      if (selectedProduct && !tpl.productTypes.includes(selectedProduct.type)) {
        return false;
      }

      // Filter by category
      if (activeCategory !== "all" && tpl.category !== activeCategory) {
        return false;
      }

      // Filter by search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          tpl.name.toLowerCase().includes(q) ||
          tpl.description.toLowerCase().includes(q) ||
          tpl.tags?.some((t) => t.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [selectedProduct, activeCategory, searchQuery]);

  /* Count templates available per category for badges */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of designTemplateCategories) {
      if (cat.id === "all") {
        counts[cat.id] = designTemplates.filter(
          (tpl) =>
            !selectedProduct || tpl.productTypes.includes(selectedProduct.type),
        ).length;
      } else {
        counts[cat.id] = designTemplates.filter(
          (tpl) =>
            tpl.category === cat.id &&
            (!selectedProduct ||
              tpl.productTypes.includes(selectedProduct.type)),
        ).length;
      }
    }
    return counts;
  }, [selectedProduct]);

  const handleApplyTemplate = (template: (typeof designTemplates)[0]) => {
    if (!canvasRef.current) return;

    canvasRef.current.clearCanvas();
    canvasRef.current.loadJSON(template.canvasJSON);
    setAppliedId(template.id);

    // Reset "applied" indicator after a short delay
    setTimeout(() => setAppliedId(null), 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-2">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
          Templates
        </h3>
        <p className="text-xs text-text-muted mt-1">
          Pick a design, then customise it
        </p>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs border border-border rounded-lg bg-surface focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 pb-3 flex gap-1.5 flex-wrap">
        {designTemplateCategories
          .filter((cat) => categoryCounts[cat.id] > 0)
          .map((cat) => (
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
              {cat.emoji} {cat.name.split(" ")[0]}
            </button>
          ))}
      </div>

      {/* Template grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-text-muted">
              No templates found for this product
              {searchQuery ? " and search" : ""}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredTemplates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => handleApplyTemplate(tpl)}
                className={cn(
                  "group relative flex flex-col items-center p-3 rounded-lg border transition-all text-center",
                  appliedId === tpl.id
                    ? "border-green-500 bg-green-50"
                    : "border-border hover:border-primary/40 hover:bg-surface",
                )}
              >
                {/* Applied check */}
                {appliedId === tpl.id && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}

                {/* Emoji preview */}
                <div className="text-3xl mb-1.5">{tpl.emoji}</div>

                {/* Name */}
                <p className="text-[10px] font-medium text-foreground leading-tight group-hover:text-primary transition-colors">
                  {tpl.name}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
