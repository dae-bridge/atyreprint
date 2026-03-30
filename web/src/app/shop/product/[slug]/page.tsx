import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductDetailClient } from "@/components/sections/ProductDetailClient";
import { RelatedProductsCarousel } from "@/components/sections/RelatedProductsCarousel";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { getImageUrl, formatPrice } from "@/types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found | AtyrePrint" };

  return {
    title: `${product.name} | AtyrePrint`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [
        { url: getImageUrl(product.images[0]), width: 800, height: 800 },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = await getRelatedProducts(product, 6);

  // Derive category name from categoryPath for breadcrumb
  const categoryName =
    product.categoryPath?.length > 0
      ? product.categoryPath[product.categoryPath.length - 1]
      : "Shop";

  return (
    <>
      {/* Hero Banner with Breadcrumbs */}
      <section className="relative h-[180px] md:h-[240px] flex items-center justify-center overflow-hidden">
        {/* Banner Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl(
              product.bannerImage,
              "/images/banners/apparel-banner.png",
            )}
            alt={categoryName}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
        </div>

        {/* Content */}
        <Container className="relative z-10">
          <nav className="flex flex-col items-center">
            <ol className="flex flex-wrap items-center justify-center gap-2 text-sm md:text-base font-medium text-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-primary transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-400 truncate max-w-[200px] md:max-w-none capitalize">
                {categoryName}
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-foreground font-bold truncate max-w-[200px] md:max-w-none">
                {product.name}
              </li>
            </ol>
          </nav>
        </Container>
      </section>

      {/* Product Detail */}
      <section className="py-10 md:py-14">
        <Container>
          <ProductDetailClient product={product} />
        </Container>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-12 md:py-16 bg-[#f9f9f9] border-t border-gray-200">
          <Container>
            <RelatedProductsCarousel products={related} />
          </Container>
        </section>
      )}
    </>
  );
}
