"use client";

import { useDesignStore } from "@/hooks/useDesignStore";
import { productTemplates } from "@/config/designerConfig";
import { cn } from "@/lib/utils";

export const ProductSelector = () => {
  const {
    selectedProduct,
    selectedColor,
    activeView,
    setProduct,
    setProductColor,
    setActiveView,
  } = useDesignStore();

  /* ─── Product not yet selected — show product picker ─── */
  if (!selectedProduct) {
    const categories = [...new Set(productTemplates.map((p) => p.category))];

    return (
      <div className="min-h-screen bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="text-center mb-10">
            <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2">
              Personalise It
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-foreground mb-3">
              Choose Your Product
            </h1>
            <p className="text-text-secondary max-w-lg mx-auto">
              Select a product to start customising. Add your own text, images,
              logos &amp; designs — we&apos;ll print or embroider it for you.
            </p>
          </div>

          {categories.map((category) => (
            <div key={category} className="mb-10">
              <h2 className="text-lg font-bold text-foreground mb-4">
                {category}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {productTemplates
                  .filter((p) => p.category === category)
                  .map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setProduct(product)}
                      className="group bg-white rounded-xl border border-border-light p-4 text-center hover:shadow-lg hover:border-primary/30 transition-all"
                    >
                      {/* Thumbnail placeholder */}
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                        <span className="text-3xl">
                          {product.type === "t-shirt"
                            ? "👕"
                            : product.type === "hoodie"
                              ? "🧥"
                              : product.type === "mug"
                                ? "☕"
                                : product.type === "tote-bag"
                                  ? "👜"
                                  : product.type === "cap"
                                    ? "🧢"
                                    : product.type === "apron"
                                      ? "👨‍🍳"
                                      : product.type === "tumbler"
                                        ? "🥤"
                                        : product.type === "pillowcase"
                                          ? "🛏️"
                                          : "📦"}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        From £{(product.basePriceInPence / 100).toFixed(2)}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ─── Product selected — show color & view selector ─── */
  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-white border-b border-border">
      {/* Product name */}
      <button
        onClick={() => useDesignStore.getState().resetDesign()}
        className="text-sm text-text-secondary hover:text-primary transition-colors"
        title="Change product"
      >
        ← Products
      </button>
      <div className="w-px h-5 bg-border" />
      <span className="text-sm font-semibold text-foreground">
        {selectedProduct.name}
      </span>

      {/* Color swatches */}
      <div className="flex items-center gap-1.5 ml-4">
        <span className="text-xs text-text-muted mr-1">Color:</span>
        {selectedProduct.colors.map((color) => (
          <button
            key={color.hex}
            onClick={() => setProductColor(color.hex)}
            title={color.name}
            className={cn(
              "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110",
              selectedColor === color.hex
                ? "border-primary ring-2 ring-primary/30"
                : "border-border",
            )}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>

      {/* View tabs */}
      {selectedProduct.views.length > 1 && (
        <div className="flex items-center gap-1 ml-auto">
          {selectedProduct.views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                activeView?.id === view.id
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-surface",
              )}
            >
              {view.label}
            </button>
          ))}
        </div>
      )}

      {/* Price */}
      <div className="ml-auto text-sm">
        <span className="text-text-muted">From </span>
        <span className="font-bold text-primary">
          £{(selectedProduct.basePriceInPence / 100).toFixed(2)}
        </span>
      </div>
    </div>
  );
};
