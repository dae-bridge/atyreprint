"use client";

import {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDesignStore } from "@/hooks/useDesignStore";
import { canvasDefaults } from "@/config/designerConfig";
import type { DesignElement } from "@/types/designer";

/** Methods exposed to parent via ref */
export interface DesignCanvasHandle {
  addText: (text?: string) => void;
  addShape: (type: string) => void;
  addImage: (url: string) => void;
  deleteSelected: () => void;
  undo: () => void;
  redo: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  zoomReset: () => void;
  exportImage: (format?: string, quality?: number) => string | null;
  exportPrintArea: (format?: string, quality?: number) => string | null;
  exportJSON: () => object | null;
  loadJSON: (json: object) => void;
  clearCanvas: () => void;
  setDrawingMode: (enabled: boolean) => void;
  setBrushColor: (color: string) => void;
  setBrushWidth: (width: number) => void;
  getCanvas: () => unknown;
}

let idCounter = 0;
const nextId = () => `el-${Date.now()}-${++idCounter}`;

export const DesignCanvas = forwardRef<DesignCanvasHandle>(
  function DesignCanvas(_, ref) {
    const canvasElRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<import("fabric").Canvas | null>(null);
    const historyRef = useRef<string[]>([]);
    const historyIndexRef = useRef(-1);
    const isRestoringRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const {
      activeView,
      selectedColor,
      setCanvasReady,
      setElements,
      setActiveElement,
      addElement,
      removeElement,
      setCanUndo,
      setCanRedo,
      zoom,
      setZoom,
      saveViewCanvas,
    } = useDesignStore();

    /* ─── Save history snapshot ─── */
    const saveHistory = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas || isRestoringRef.current) return;
      const json = JSON.stringify(canvas.toObject(["id", "name"]));
      // Truncate future states
      historyRef.current = historyRef.current.slice(
        0,
        historyIndexRef.current + 1,
      );
      historyRef.current.push(json);
      historyIndexRef.current = historyRef.current.length - 1;
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(false);
    }, [setCanUndo, setCanRedo]);

    /* ─── Sync elements list from canvas objects ─── */
    const syncElements = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const objects = canvas.getObjects();
      const els: DesignElement[] = objects.map((obj, i) => ({
        id: (obj as unknown as Record<string, string>).id || nextId(),
        type: getElementType(obj),
        fabricObjectId:
          (obj as unknown as Record<string, string>).id || String(i),
        name:
          (obj as unknown as Record<string, string>).name ||
          getElementType(obj),
        visible: obj.visible !== false,
        locked: obj.selectable === false,
        zIndex: i,
      }));
      setElements(els);
    }, [setElements]);

    /* ─── Initialise Fabric canvas ─── */
    useEffect(() => {
      let canvas: import("fabric").Canvas | null = null;
      let disposed = false;

      const init = async () => {
        // Dynamically import fabric (client-side only)
        const fabric = await import("fabric");

        // Guard: if cleanup ran while we were awaiting, bail out
        if (disposed || !canvasElRef.current) return;

        canvas = new fabric.Canvas(canvasElRef.current, {
          width: canvasDefaults.width,
          height: canvasDefaults.height,
          backgroundColor: canvasDefaults.backgroundColor,
          selection: true,
          selectionColor: canvasDefaults.selectionColor,
          selectionBorderColor: canvasDefaults.selectionBorderColor,
          selectionLineWidth: canvasDefaults.selectionLineWidth,
          preserveObjectStacking: true,
        });

        fabricRef.current = canvas;
        setCanvasReady(true);

        // Default control styles
        fabric.FabricObject.prototype.set({
          cornerColor: canvasDefaults.cornerColor,
          cornerStyle: canvasDefaults.cornerStyle,
          cornerSize: canvasDefaults.cornerSize,
          transparentCorners: canvasDefaults.transparentCorners,
          borderColor: canvasDefaults.borderColor,
          borderScaleFactor: canvasDefaults.borderScaleFactor,
        });

        // Event listeners
        canvas.on("selection:created", (e) => {
          const target = e.selected?.[0] as
            | (import("fabric").FabricObject & { id?: string })
            | undefined;
          if (target?.id) setActiveElement(target.id);
        });

        canvas.on("selection:updated", (e) => {
          const target = e.selected?.[0] as
            | (import("fabric").FabricObject & { id?: string })
            | undefined;
          if (target?.id) setActiveElement(target.id);
        });

        canvas.on("selection:cleared", () => {
          setActiveElement(null);
        });

        canvas.on("object:modified", () => {
          syncElements();
          saveHistory();
        });

        canvas.on("object:added", () => {
          if (!isRestoringRef.current) {
            syncElements();
            saveHistory();
          }
        });

        canvas.on("object:removed", () => {
          if (!isRestoringRef.current) {
            syncElements();
            saveHistory();
          }
        });

        // Initial history snapshot
        saveHistory();
      };

      init();

      return () => {
        disposed = true;
        if (canvas) {
          canvas.dispose();
          fabricRef.current = null;
        }
      };
      // Only init once
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ─── Save/restore canvas when switching views ─── */
    const prevViewRef = useRef<string | null>(null);

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas || !activeView) return;

      // Save current view data before switching
      if (prevViewRef.current && prevViewRef.current !== activeView.id) {
        saveViewCanvas(prevViewRef.current, canvas.toObject(["id", "name"]));
      }

      // Load the new view's data if it exists
      const { viewCanvasData } = useDesignStore.getState();
      const viewData = viewCanvasData[activeView.id];

      if (viewData && prevViewRef.current !== activeView.id) {
        isRestoringRef.current = true;
        canvas.loadFromJSON(viewData).then(() => {
          canvas.renderAll();
          syncElements();
          isRestoringRef.current = false;
        });
      } else if (!viewData && prevViewRef.current !== activeView.id) {
        canvas.clear();
        canvas.backgroundColor = canvasDefaults.backgroundColor;
        canvas.renderAll();
        syncElements();
      }

      prevViewRef.current = activeView.id;
    }, [activeView, saveViewCanvas, syncElements]);

    /* ─── Imperative handle ─── */
    useImperativeHandle(
      ref,
      () => ({
        addText: (text = "Your Text Here") => {
          const canvas = fabricRef.current;
          if (!canvas) return;
          import("fabric").then((fabric) => {
            const id = nextId();
            const textObj = new fabric.FabricText(text, {
              left: canvasDefaults.width / 2 - 80,
              top: canvasDefaults.height / 2 - 20,
              fontSize: 36,
              fontFamily: "Inter",
              fill: "#1A1A1A",
              textAlign: "center",
            });
            (textObj as unknown as Record<string, string>).id = id;
            (textObj as unknown as Record<string, string>).name = "Text";
            canvas.add(textObj);
            canvas.setActiveObject(textObj);
            canvas.renderAll();
          });
        },

        addShape: (type = "rectangle") => {
          const canvas = fabricRef.current;
          if (!canvas) return;
          import("fabric").then((fabric) => {
            const id = nextId();
            let shape: import("fabric").FabricObject;

            const baseProps = {
              left: canvasDefaults.width / 2 - 50,
              top: canvasDefaults.height / 2 - 50,
              fill: "#a7cf45",
              stroke: "#8ab52e",
              strokeWidth: 1,
            };

            switch (type) {
              case "circle":
                shape = new fabric.Circle({ ...baseProps, radius: 50 });
                break;
              case "triangle":
                shape = new fabric.Triangle({
                  ...baseProps,
                  width: 100,
                  height: 100,
                });
                break;
              case "line":
                shape = new fabric.Line([0, 0, 200, 0], {
                  left: canvasDefaults.width / 2 - 100,
                  top: canvasDefaults.height / 2,
                  stroke: "#1A1A1A",
                  strokeWidth: 3,
                });
                break;
              default:
                shape = new fabric.Rect({
                  ...baseProps,
                  width: 100,
                  height: 100,
                  rx: 4,
                  ry: 4,
                });
            }

            (shape as unknown as Record<string, string>).id = id;
            (shape as unknown as Record<string, string>).name =
              type.charAt(0).toUpperCase() + type.slice(1);
            canvas.add(shape);
            canvas.setActiveObject(shape);
            canvas.renderAll();
          });
        },

        addImage: (url: string) => {
          const canvas = fabricRef.current;
          if (!canvas) return;
          import("fabric").then((fabric) => {
            const id = nextId();
            const imgEl = new Image();
            imgEl.crossOrigin = "anonymous";
            imgEl.onload = () => {
              const img = new fabric.FabricImage(imgEl, {
                left: canvasDefaults.width / 2 - 75,
                top: canvasDefaults.height / 2 - 75,
              });
              // Scale to fit within 150x150
              const scale = Math.min(
                150 / (img.width || 150),
                150 / (img.height || 150),
              );
              img.scale(scale);
              (img as unknown as Record<string, string>).id = id;
              (img as unknown as Record<string, string>).name = "Image";
              canvas.add(img);
              canvas.setActiveObject(img);
              canvas.renderAll();
            };
            imgEl.src = url;
          });
        },

        deleteSelected: () => {
          const canvas = fabricRef.current;
          if (!canvas) return;
          const active = canvas.getActiveObjects();
          active.forEach((obj) => canvas.remove(obj));
          canvas.discardActiveObject();
          canvas.renderAll();
        },

        undo: () => {
          const canvas = fabricRef.current;
          if (!canvas || historyIndexRef.current <= 0) return;
          historyIndexRef.current--;
          isRestoringRef.current = true;
          const json = historyRef.current[historyIndexRef.current];
          canvas.loadFromJSON(JSON.parse(json)).then(() => {
            canvas.renderAll();
            syncElements();
            isRestoringRef.current = false;
            setCanUndo(historyIndexRef.current > 0);
            setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
          });
        },

        redo: () => {
          const canvas = fabricRef.current;
          if (
            !canvas ||
            historyIndexRef.current >= historyRef.current.length - 1
          )
            return;
          historyIndexRef.current++;
          isRestoringRef.current = true;
          const json = historyRef.current[historyIndexRef.current];
          canvas.loadFromJSON(JSON.parse(json)).then(() => {
            canvas.renderAll();
            syncElements();
            isRestoringRef.current = false;
            setCanUndo(historyIndexRef.current > 0);
            setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
          });
        },

        zoomIn: () => {
          const canvas = fabricRef.current;
          if (!canvas) return;
          const newZoom = Math.min((zoom || 1) + 0.1, 3);
          canvas.setZoom(newZoom);
          setZoom(newZoom);
          canvas.renderAll();
        },

        zoomOut: () => {
          const canvas = fabricRef.current;
          if (!canvas) return;
          const newZoom = Math.max((zoom || 1) - 0.1, 0.25);
          canvas.setZoom(newZoom);
          setZoom(newZoom);
          canvas.renderAll();
        },

        zoomReset: () => {
          const canvas = fabricRef.current;
          if (!canvas) return;
          canvas.setZoom(1);
          setZoom(1);
          canvas.renderAll();
        },

        exportImage: (format = "png", quality = 1) => {
          const canvas = fabricRef.current;
          if (!canvas) return null;
          return canvas.toDataURL({
            format: format as "png" | "jpeg",
            quality,
            multiplier: 3,
          });
        },

        exportPrintArea: (format = "png", quality = 1) => {
          const canvas = fabricRef.current;
          const pa = activeView?.printArea;
          if (!canvas || !pa) return null;
          const cw = canvasDefaults.width;
          const ch = canvasDefaults.height;
          return canvas.toDataURL({
            format: format as "png" | "jpeg",
            quality,
            multiplier: 3,
            left: (pa.left / 100) * cw,
            top: (pa.top / 100) * ch,
            width: (pa.width / 100) * cw,
            height: (pa.height / 100) * ch,
          });
        },

        exportJSON: () => {
          const canvas = fabricRef.current;
          if (!canvas) return null;
          return canvas.toObject(["id", "name"]);
        },

        loadJSON: (json: object) => {
          const canvas = fabricRef.current;
          if (!canvas) return;
          isRestoringRef.current = true;
          canvas.loadFromJSON(json).then(() => {
            canvas.renderAll();
            syncElements();
            isRestoringRef.current = false;
            saveHistory();
          });
        },

        clearCanvas: () => {
          const canvas = fabricRef.current;
          if (!canvas) return;
          canvas.clear();
          canvas.backgroundColor = canvasDefaults.backgroundColor;
          canvas.renderAll();
          syncElements();
          saveHistory();
        },

        setDrawingMode: (enabled: boolean) => {
          const canvas = fabricRef.current;
          if (!canvas) return;
          canvas.isDrawingMode = enabled;
          if (enabled && canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = "#1A1A1A";
            canvas.freeDrawingBrush.width = 3;
          }
          canvas.renderAll();
        },

        setBrushColor: (color: string) => {
          const canvas = fabricRef.current;
          if (!canvas?.freeDrawingBrush) return;
          canvas.freeDrawingBrush.color = color;
        },

        setBrushWidth: (width: number) => {
          const canvas = fabricRef.current;
          if (!canvas?.freeDrawingBrush) return;
          canvas.freeDrawingBrush.width = width;
        },

        getCanvas: () => fabricRef.current,
      }),
      [zoom, setZoom, syncElements, saveHistory, setCanUndo, setCanRedo],
    );

    /* ─── Print area overlay ─── */
    const printArea = activeView?.printArea;

    return (
      <div
        ref={containerRef}
        className="relative flex items-center justify-center"
        style={{ minHeight: 500 }}
      >
        {/* Canvas-sized wrapper — overlay + canvas are both positioned inside */}
        <div
          className="relative"
          style={{
            width: canvasDefaults.width,
            height: canvasDefaults.height,
          }}
        >
          {/* Product color background */}
          <div
            className="absolute inset-0 rounded-lg shadow-inner"
            style={{ backgroundColor: selectedColor }}
          />

          {/* Print area guide */}
          {printArea && (
            <div
              className="absolute pointer-events-none z-10"
              style={{
                top: `${printArea.top}%`,
                left: `${printArea.left}%`,
                width: `${printArea.width}%`,
                height: `${printArea.height}%`,
              }}
            >
              <div className="w-full h-full border-2 border-dashed border-primary/40 rounded" />
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-primary/60 whitespace-nowrap">
                Print Area
              </span>
            </div>
          )}

          {/* Fabric.js canvas */}
          <canvas ref={canvasElRef} className="relative z-20" />
        </div>
      </div>
    );
  },
);

/* ─── Helpers ─── */
function getElementType(
  obj: import("fabric").FabricObject,
): DesignElement["type"] {
  const type = obj.type;
  if (type === "text" || type === "i-text" || type === "textbox") return "text";
  if (type === "image") return "image";
  return "shape";
}
