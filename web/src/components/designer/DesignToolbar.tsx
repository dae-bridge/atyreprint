"use client";

import { useDesignStore } from "@/hooks/useDesignStore";
import type { DesignCanvasHandle } from "./DesignCanvas";
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Save,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DesignToolbarProps {
  canvasRef: React.RefObject<DesignCanvasHandle | null>;
}

export const DesignToolbar = ({ canvasRef }: DesignToolbarProps) => {
  const { canUndo, canRedo, zoom } = useDesignStore();

  const ToolbarButton = ({
    icon: Icon,
    label,
    onClick,
    disabled,
    variant,
  }: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: "danger";
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={cn(
        "p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
        variant === "danger"
          ? "text-error hover:bg-error/10"
          : "text-text-secondary hover:bg-surface hover:text-primary",
      )}
    >
      <Icon size={18} />
    </button>
  );

  const handleExport = () => {
    const dataUrl = canvasRef.current?.exportImage("png", 1);
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = "design.png";
    link.href = dataUrl;
    link.click();
  };

  const handleSaveJSON = () => {
    const json = canvasRef.current?.exportJSON();
    if (!json) return;
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.download = "design.json";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-border">
      {/* Left — Undo / Redo */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={Undo2}
          label="Undo (Ctrl+Z)"
          onClick={() => canvasRef.current?.undo()}
          disabled={!canUndo}
        />
        <ToolbarButton
          icon={Redo2}
          label="Redo (Ctrl+Y)"
          onClick={() => canvasRef.current?.redo()}
          disabled={!canRedo}
        />
        <div className="w-px h-5 bg-border mx-2" />
        <ToolbarButton
          icon={Trash2}
          label="Delete Selected"
          onClick={() => canvasRef.current?.deleteSelected()}
          variant="danger"
        />
      </div>

      {/* Center — Zoom */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={ZoomOut}
          label="Zoom Out"
          onClick={() => canvasRef.current?.zoomOut()}
        />
        <span className="text-xs font-medium text-text-secondary w-12 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <ToolbarButton
          icon={ZoomIn}
          label="Zoom In"
          onClick={() => canvasRef.current?.zoomIn()}
        />
        <ToolbarButton
          icon={RotateCcw}
          label="Reset Zoom"
          onClick={() => canvasRef.current?.zoomReset()}
        />
      </div>

      {/* Right — Export */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={Save}
          label="Save Design (JSON)"
          onClick={handleSaveJSON}
        />
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
        >
          <Download size={16} />
          Export PNG
        </button>
      </div>
    </div>
  );
};
