"use client";

import { create } from "zustand";
import type {
  ProductTemplate,
  ProductView,
  DesignElement,
  DesignTool,
  ShapeType,
} from "@/types/designer";

interface DesignStore {
  /* ─── Product ─── */
  selectedProduct: ProductTemplate | null;
  selectedColor: string;
  activeView: ProductView | null;
  setProduct: (product: ProductTemplate) => void;
  setProductColor: (hex: string) => void;
  setActiveView: (view: ProductView) => void;

  /* ─── Tool ─── */
  activeTool: DesignTool;
  setActiveTool: (tool: DesignTool) => void;

  /* ─── Canvas ─── */
  canvasReady: boolean;
  setCanvasReady: (ready: boolean) => void;
  zoom: number;
  setZoom: (zoom: number) => void;

  /* ─── Elements / Layers ─── */
  elements: DesignElement[];
  activeElementId: string | null;
  setElements: (elements: DesignElement[]) => void;
  setActiveElement: (id: string | null) => void;
  addElement: (element: DesignElement) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, updates: Partial<DesignElement>) => void;
  reorderElement: (id: string, direction: "up" | "down") => void;

  /* ─── History ─── */
  canUndo: boolean;
  canRedo: boolean;
  setCanUndo: (v: boolean) => void;
  setCanRedo: (v: boolean) => void;

  /* ─── Per-view canvas data (Fabric JSON) ─── */
  viewCanvasData: Record<string, object>;
  saveViewCanvas: (viewId: string, data: object) => void;

  /* ─── Panels ─── */
  rightPanelOpen: boolean;
  setRightPanelOpen: (open: boolean) => void;

  /* ─── Reset ─── */
  resetDesign: () => void;
}

const initialState = {
  selectedProduct: null,
  selectedColor: "#FFFFFF",
  activeView: null,
  activeTool: "select" as DesignTool,
  canvasReady: false,
  zoom: 1,
  elements: [],
  activeElementId: null,
  canUndo: false,
  canRedo: false,
  viewCanvasData: {},
  rightPanelOpen: true,
};

export const useDesignStore = create<DesignStore>((set, get) => ({
  ...initialState,

  /* ─── Product ─── */
  setProduct: (product) =>
    set({
      selectedProduct: product,
      activeView: product.views[0],
      selectedColor: product.colors[0]?.hex ?? "#FFFFFF",
      elements: [],
      activeElementId: null,
      viewCanvasData: {},
    }),

  setProductColor: (hex) => set({ selectedColor: hex }),

  setActiveView: (view) => {
    const { activeView, viewCanvasData } = get();
    set({ activeView: view });
  },

  /* ─── Tool ─── */
  setActiveTool: (tool) => set({ activeTool: tool }),

  /* ─── Canvas ─── */
  setCanvasReady: (ready) => set({ canvasReady: ready }),
  setZoom: (zoom) => set({ zoom: Math.max(0.25, Math.min(3, zoom)) }),

  /* ─── Elements ─── */
  setElements: (elements) => set({ elements }),
  setActiveElement: (id) => set({ activeElementId: id }),

  addElement: (element) =>
    set((state) => ({ elements: [...state.elements, element] })),

  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      activeElementId:
        state.activeElementId === id ? null : state.activeElementId,
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el,
      ),
    })),

  reorderElement: (id, direction) =>
    set((state) => {
      const idx = state.elements.findIndex((el) => el.id === id);
      if (idx === -1) return state;
      const newElements = [...state.elements];
      const swapIdx = direction === "up" ? idx + 1 : idx - 1;
      if (swapIdx < 0 || swapIdx >= newElements.length) return state;
      [newElements[idx], newElements[swapIdx]] = [
        newElements[swapIdx],
        newElements[idx],
      ];
      return {
        elements: newElements.map((el, i) => ({ ...el, zIndex: i })),
      };
    }),

  /* ─── History ─── */
  setCanUndo: (v) => set({ canUndo: v }),
  setCanRedo: (v) => set({ canRedo: v }),

  /* ─── Per-view canvas data ─── */
  saveViewCanvas: (viewId, data) =>
    set((state) => ({
      viewCanvasData: { ...state.viewCanvasData, [viewId]: data },
    })),

  /* ─── Panels ─── */
  setRightPanelOpen: (open) => set({ rightPanelOpen: open }),

  /* ─── Reset ─── */
  resetDesign: () => set(initialState),
}));
