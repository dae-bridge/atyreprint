import Link from "next/link";
import Image from "next/image";
import type { ProductData } from "@/lib/products";
import { getCategorySlug, getParentGroupSlug } from "@/lib/products";

interface ProductCardProps {
  product: ProductData;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const categorySlug = getCategorySlug(product.category);
  const parentSlug = categorySlug
    ? getParentGroupSlug(categorySlug)
    : undefined;
  const productHref = `/shop/product/${product.slug}`;

  return (
    <Link href={productHref} className="group block">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-surface mb-3">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-accent text-primary-dark text-xs font-bold px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div>
        {parentSlug && categorySlug && (
          <p className="text-xs text-text-muted uppercase tracking-wide mb-0.5">
            {product.category}
          </p>
        )}
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-primary">
            £{product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-text-muted line-through">
              £{product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1 mt-2">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color.name}
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-text-muted ml-1">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};
