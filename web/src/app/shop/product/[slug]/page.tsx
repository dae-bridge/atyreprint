import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductDetailClient } from "@/components/sections/ProductDetailClient";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ChevronRight } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found | AtyrePrint" };

  return {
    title: `${product.name} | AtyrePrint`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [{ url: product.images[0], width: 800, height: 800 }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(slug, 4);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-surface border-b border-border-light">
        <Container className="py-3">
          <ol className="flex items-center gap-1.5 text-sm text-text-muted">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={14} />
            </li>
            <li>
              <Link
                href="/shop"
                className="hover:text-primary transition-colors"
              >
                Shop
              </Link>
            </li>
            <li>
              <ChevronRight size={14} />
            </li>
            <li className="text-foreground font-medium truncate max-w-[200px]">
              {product.name}
            </li>
          </ol>
        </Container>
      </nav>

      {/* Product Detail */}
      <section className="py-10 md:py-16">
        <Container>
          <ProductDetailClient product={product} />
        </Container>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-12 md:py-16 bg-surface">
          <Container>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/shop/product/${item.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-border-light hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    {item.badge && (
                      <span className="absolute top-3 left-3 bg-secondary text-primary-dark text-xs font-bold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-base font-bold text-primary">
                      £{item.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
