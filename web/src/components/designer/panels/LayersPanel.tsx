"use client";

import { useDesignStore } from "@/hooks/useDesignStore";
import type { DesignCanvasHandle } from "../DesignCanvas";
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  ChevronUp,
  ChevronDown,
  Type,
  Image,
  Shapes,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayersPanelProps {
  canvasRef: React.RefObject<DesignCanvasHandle | null>;
}

const typeIcons = {
  text: Type,
  image: Image,
  shape: Shapes,
  clipart: Image,
} as const;

export const LayersPanel = ({ canvasRef }: LayersPanelProps) => {
  const {
    elements,
    activeElementId,
    setActiveElement,
    updateElement,
    removeElement,
    reorderElement,
  } = useDesignStore();

  const handleDelete = (id: string) => {
    // Also remove from fabric canvas
    const canvas = canvasRef.current?.getCanvas() as
      | (import("fabric").Canvas & {
          getObjects: () => Array<
            import("fabric").FabricObject & { id?: string }
          >;
        })
      | null;
    if (canvas) {
      const obj = canvas
        .getObjects()
        .find(
          (o: import("fabric").FabricObject & { id?: string }) => o.id === id,
        );
      if (obj) {
        canvas.remove(obj);
        canvas.renderAll();
      }
    }
    removeElement(id);
  };

  // Show in reverse order (top layer first)
  const sortedElements = [...elements].reverse();

  return (
    <div className="p-4 space-y-3">
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
        Layers
      </h3>

      {sortedElements.length === 0 ? (
        <p className="text-xs text-text-muted py-4 text-center">
          No elements yet. Add text, images, or shapes to get started.
        </p>
      ) : (
        <div className="space-y-1">
          {sortedElements.map((el) => {
            const Icon = typeIcons[el.type] || Shapes;
            const isActive = activeElementId === el.id;

            return (
              <div
                key={el.id}
                onClick={() => setActiveElement(el.id)}
                className={cn(
                  "flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-colors",
                  isActive
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-surface",
                )}
              >
                <Icon size={14} className="text-text-muted shrink-0" />
                <span className="flex-1 text-sm text-foreground truncate">
                  {el.name}
                </span>

                {/* Controls */}
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateElement(el.id, { visible: !el.visible });
                    }}
                    className="p-1 text-text-muted hover:text-primary transition-colors"
                    title={el.visible ? "Hide" : "Show"}
                  >
                    {el.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateElement(el.id, { locked: !el.locked });
                    }}
                    className="p-1 text-text-muted hover:text-primary transition-colors"
                    title={el.locked ? "Unlock" : "Lock"}
                  >
                    {el.locked ? <Lock size={12} /> : <Unlock size={12} />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      reorderElement(el.id, "up");
                    }}
                    className="p-1 text-text-muted hover:text-primary transition-colors"
                    title="Move Up"
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      reorderElement(el.id, "down");
                    }}
                    className="p-1 text-text-muted hover:text-primary transition-colors"
                    title="Move Down"
                  >
                    <ChevronDown size={12} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(el.id);
                    }}
                    className="p-1 text-text-muted hover:text-error transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
