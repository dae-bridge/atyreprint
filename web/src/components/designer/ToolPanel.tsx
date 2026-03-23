"use client";

import { useDesignStore } from "@/hooks/useDesignStore";
import type { DesignTool } from "@/types/designer";
import {
  MousePointer2,
  Type,
  Shapes,
  Pencil,
  Upload,
  Image,
  LayoutTemplate,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tools: { id: DesignTool; icon: React.ElementType; label: string }[] = [
  { id: "select", icon: MousePointer2, label: "Select" },
  { id: "text", icon: Type, label: "Text" },
  { id: "shapes", icon: Shapes, label: "Shapes" },
  { id: "draw", icon: Pencil, label: "Draw" },
  { id: "upload", icon: Upload, label: "Upload" },
  { id: "clipart", icon: Image, label: "Clipart" },
  { id: "templates", icon: LayoutTemplate, label: "Templates" },
];

export const ToolPanel = () => {
  const { activeTool, setActiveTool } = useDesignStore();

  return (
    <div className="w-16 bg-white border-r border-border flex flex-col items-center py-3 gap-1">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.id;
        return (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            title={tool.label}
            className={cn(
              "w-11 h-11 flex flex-col items-center justify-center rounded-lg transition-colors",
              isActive
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-surface hover:text-primary",
            )}
          >
            <Icon size={18} />
            <span className="text-[9px] mt-0.5 leading-none">{tool.label}</span>
          </button>
        );
      })}
    </div>
  );
};
