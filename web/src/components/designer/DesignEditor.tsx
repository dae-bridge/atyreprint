"use client";

import { useRef, useEffect, useCallback } from "react";
import { useDesignStore } from "@/hooks/useDesignStore";
import { DesignCanvas, type DesignCanvasHandle } from "./DesignCanvas";
import { DesignToolbar } from "./DesignToolbar";
import { ToolPanel } from "./ToolPanel";
import { ProductSelector } from "./ProductSelector";
import { TextPanel } from "./panels/TextPanel";
import { ImagePanel } from "./panels/ImagePanel";
import { ShapesPanel } from "./panels/ShapesPanel";
import { LayersPanel } from "./panels/LayersPanel";
import { TemplatesPanel } from "./panels/TemplatesPanel";
import { ClipartPanel } from "./panels/ClipartPanel";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

export const DesignEditor = () => {
  const canvasRef = useRef<DesignCanvasHandle>(null);
  const { selectedProduct, activeTool, rightPanelOpen, setRightPanelOpen } =
    useDesignStore();

  /* ─── Keyboard shortcuts ─── */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    )
      return;

    const isCtrl = e.ctrlKey || e.metaKey;

    if (isCtrl && e.key === "z" && !e.shiftKey) {
      e.preventDefault();
      canvasRef.current?.undo();
    } else if (
      (isCtrl && e.key === "z" && e.shiftKey) ||
      (isCtrl && e.key === "y")
    ) {
      e.preventDefault();
      canvasRef.current?.redo();
    } else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      canvasRef.current?.deleteSelected();
    } else if (isCtrl && e.key === "=") {
      e.preventDefault();
      canvasRef.current?.zoomIn();
    } else if (isCtrl && e.key === "-") {
      e.preventDefault();
      canvasRef.current?.zoomOut();
    } else if (isCtrl && e.key === "0") {
      e.preventDefault();
      canvasRef.current?.zoomReset();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* ─── Product not yet selected → show picker ─── */
  if (!selectedProduct) {
    return <ProductSelector />;
  }

  /* ─── Render active tool panel ─── */
  const renderToolContent = () => {
    switch (activeTool) {
      case "text":
        return <TextPanel canvasRef={canvasRef} />;
      case "upload":
        return <ImagePanel canvasRef={canvasRef} />;
      case "shapes":
        return <ShapesPanel canvasRef={canvasRef} />;
      case "templates":
        return <TemplatesPanel canvasRef={canvasRef} />;
      case "clipart":
        return <ClipartPanel canvasRef={canvasRef} />;
      default:
        return (
          <div className="p-4">
            <p className="text-xs text-text-muted text-center py-8">
              Select a tool from the left panel to get started, or click on the
              canvas to select elements.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
      {/* Product bar */}
      <ProductSelector />

      {/* Main toolbar */}
      <DesignToolbar canvasRef={canvasRef} />

      {/* Editor body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — Tool icons */}
        <ToolPanel />

        {/* Left — Tool content panel */}
        <div className="w-64 bg-white border-r border-border overflow-y-auto hidden md:block">
          {renderToolContent()}
        </div>

        {/* Center — Canvas */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-6 bg-[#F0F0F0]">
          <DesignCanvas ref={canvasRef} />
        </div>

        {/* Right — Layers panel */}
        {rightPanelOpen && (
          <div className="w-64 bg-white border-l border-border overflow-y-auto hidden lg:block">
            <LayersPanel canvasRef={canvasRef} />
          </div>
        )}
      </div>

      {/* Bottom bar — toggle right panel + hints */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-t border-border text-xs text-text-muted">
        <span>
          Ctrl+Z Undo · Ctrl+Y Redo · Delete to remove · Ctrl+0 Reset zoom
        </span>
        <button
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          {rightPanelOpen ? (
            <>
              <PanelRightClose size={14} />
              Hide Layers
            </>
          ) : (
            <>
              <PanelRightOpen size={14} />
              Show Layers
            </>
          )}
        </button>
      </div>
    </div>
  );
};
