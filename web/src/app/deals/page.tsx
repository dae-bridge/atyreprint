import { Container } from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { Tag, Star } from "lucide-react";
import { getProductsByTag } from "@/lib/products";
import { getImageUrl } from "@/types";
import type { Product } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today's Deals",
  description:
    "Grab exclusive limited-time offers on premium custom printed and embroidered products at AtyrePrint.",
};

function DealProductCard({ product }: { product: Product }) {
  const price = product.price.amount / 100;
  const compareAt = product.compareAtPrice
    ? product.compareAtPrice.amount / 100
    : null;
  const discount = compareAt
    ? Math.round(((compareAt - price) / compareAt) * 100)
    : null;

  return (
    <div className="bg-white rounded-lg border border-border hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden">
        {discount && (
          <div className="absolute top-3 left-3 z-10 bg-error text-white text-[11px] font-bold px-2.5 py-1 rounded-sm flex items-center gap-1">
            <Tag size={10} />-{discount}%
          </div>
        )}
        {product.badge && (
          <div className="absolute top-3 right-3 z-10 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
            {product.badge}
          </div>
        )}
        <Link href={`/shop/product/${product.slug}`}>
          <Image
            src={getImageUrl(product.images?.[0])}
            alt={product.images?.[0]?.alt || product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>
      </div>
      <div className="p-5">
        <Link href={`/shop/product/${product.slug}`}>
          <h3 className="text-[15px] font-medium text-foreground leading-snug mb-2 line-clamp-2 min-h-[40px] hover:text-accent transition-colors uppercase tracking-tight font-jost">
            {product.name}
          </h3>
        </Link>
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              className={
                i < product.rating
                  ? "fill-[#ffb503] text-[#ffb503]"
                  : "fill-gray-200 text-gray-200"
              }
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mb-5">
          {compareAt && (
            <span className="text-sm text-gray-400 line-through">
              £{compareAt.toFixed(2)}
            </span>
          )}
          <span className="text-base font-bold text-[#ff4d6d]">
            £{price.toFixed(2)}
          </span>
        </div>
        <Link
          href={
            product.customisable
              ? `/personalise-it?product=${product.slug}`
              : `/shop/product/${product.slug}`
          }
          className="w-full py-3 bg-[#eeeeee] text-[13px] font-bold text-foreground hover:bg-accent hover:text-white transition-colors tracking-wide uppercase font-jost text-center block"
        >
          {product.customisable ? "CUSTOMISE" : "ADD TO CART"}
        </Link>
      </div>
    </div>
  );
}

export default async function DealsPage() {
  const dealProducts = await getProductsByTag("deals", 20).catch(() => []);

  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-32 pb-24 font-jost">
      <Container>
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm text-error">
            <Tag size={32} />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-tight">
            Today&apos;s Deals
          </h1>
          <p className="text-text-muted text-lg max-w-lg mx-auto leading-relaxed">
            Grab our exclusive limited-time offers on premium printed and
            embroidered products.
          </p>
        </div>

        {dealProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dealProducts.map((product) => (
              <DealProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-12 rounded shadow-sm border border-dashed border-accent mb-10 text-center">
              <p className="text-accent font-bold text-xl uppercase tracking-widest mb-2 font-jost">
                No active deals right now
              </p>
              <p className="text-text-muted">
                Sign up for our newsletter to get notified about the next big
                flash sale!
              </p>
            </div>
            <div className="text-center">
              <Link
                href="/shop"
                className="inline-block px-10 py-4 bg-accent text-white font-bold text-[14px] tracking-widest uppercase hover:bg-[#8ba83a] transition-all rounded shadow-lg"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
