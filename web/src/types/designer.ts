/* ─── Design Tool Type Definitions ─── */

/** Supported product types */
export type ProductType =
  | "t-shirt"
  | "hoodie"
  | "sweatshirt"
  | "tote-bag"
  | "mug"
  | "cap"
  | "apron"
  | "glass-can"
  | "tumbler"
  | "pillowcase";

/** A view/side of a product (e.g. front, back) */
export interface ProductView {
  id: string;
  label: string;
  /** Printable area in % relative to product image */
  printArea: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  /** Product mockup image path */
  mockupImage: string;
}

/** A product template that can be customised */
export interface ProductTemplate {
  id: string;
  type: ProductType;
  name: string;
  description: string;
  /** Available base colors for this product */
  colors: ProductColor[];
  /** Available views (front, back, etc.) */
  views: ProductView[];
  /** Base price in pence */
  basePriceInPence: number;
  /** Category for grouping */
  category: string;
  /** Thumbnail image path */
  thumbnail: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

/** Types of design elements */
export type DesignElementType = "text" | "image" | "shape" | "clipart";

/** A single design element on the canvas */
export interface DesignElement {
  id: string;
  type: DesignElementType;
  fabricObjectId: string;
  name: string;
  visible: boolean;
  locked: boolean;
  zIndex: number;
}

/** Font category for the font picker */
export interface FontOption {
  family: string;
  category: "sans-serif" | "serif" | "display" | "handwriting" | "monospace";
  url?: string;
}

/** A clipart item */
export interface ClipartItem {
  id: string;
  name: string;
  category: string;
  url: string;
  tags: string[];
}

/** Clipart category */
export interface ClipartCategory {
  id: string;
  name: string;
  icon: string;
}

/** The full state of a design (serialisable) */
export interface DesignState {
  id: string;
  productId: string;
  productColor: string;
  activeViewId: string;
  /** Fabric.js JSON for each view */
  viewCanvasData: Record<string, object>;
  createdAt: string;
  updatedAt: string;
}

/** Active tool in the editor */
export type DesignTool =
  | "select"
  | "text"
  | "shapes"
  | "draw"
  | "upload"
  | "clipart"
  | "templates";

/** A pre-made design template users can load and customise */
export interface DesignTemplate {
  id: string;
  name: string;
  /** Template category (e.g. "Business", "Birthday", "Sports") */
  category: string;
  /** Which product types this template works with */
  productTypes: ProductType[];
  /** Emoji preview shown in the panel */
  emoji: string;
  /** Brief description */
  description: string;
  /** Fabric.js canvas JSON to load onto the canvas */
  canvasJSON: object;
  /** Optional tags for search/filtering */
  tags?: string[];
}

/** Category for grouping design templates */
export interface DesignTemplateCategory {
  id: string;
  name: string;
  emoji: string;
}

/** Shape types available */
export type ShapeType =
  | "rectangle"
  | "circle"
  | "triangle"
  | "line"
  | "star"
  | "heart"
  | "arrow";

/** Text effect options */
export interface TextEffectOptions {
  curve: number;
  shadow: {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  } | null;
  outline: {
    color: string;
    width: number;
  } | null;
}

/** Export format for final design */
export type ExportFormat = "png" | "svg" | "pdf" | "json";

/** Design export result */
export interface DesignExport {
  format: ExportFormat;
  dataUrl: string;
  width: number;
  height: number;
}
