import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategorySidebar } from "@/components/shop/CategorySidebar";
import { CategoryTopbar } from "@/components/shop/CategoryTopbar";
import {
  getCategoryBySlug,
  getChildCategories,
  getProductsByCategoryPath,
  getProductsByCategoryId,
  getCategoryTree,
} from "@/lib/products";

interface CategoryPageProps {
  params: Promise<{ category: string[] }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const segments = category;

  if (segments.length === 1) {
    const parent = await getCategoryBySlug(segments[0]);
    if (!parent) return { title: "Not Found" };
    return {
      title: `${parent.name} | AtyrePrint`,
      description: parent.description,
    };
  }

  if (segments.length === 2) {
    const parent = await getCategoryBySlug(segments[0]);
    const child = await getCategoryBySlug(segments[1]);
    if (!parent || !child) return { title: "Not Found" };
    return {
      title: `${child.name} — ${parent.name} | AtyrePrint`,
      description: child.description,
    };
  }

  return { title: "Not Found" };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const segments = category;

  // Fetch the full category tree for sidebar
  const categoryTree = await getCategoryTree();

  if (segments.length === 1) {
    // Group page: /shop/clothing
    const parentCategory = await getCategoryBySlug(segments[0]);
    if (!parentCategory) notFound();

    const products = await getProductsByCategoryPath(parentCategory.slug);
    const children = await getChildCategories(parentCategory.id);

    return (
      <>
        <div className="bg-[#f5f5f5] py-12 border-b border-border-light text-center">
          <h1 className="font-jost text-4xl md:text-5xl font-bold text-foreground mb-4 uppercase tracking-wide">
            {parentCategory.name}
          </h1>
          <nav className="flex items-center justify-center gap-2 text-[15px] font-jost text-text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground capitalize">
              {parentCategory.name}
            </span>
          </nav>
        </div>

        <section className="py-12 md:py-16 bg-[#f8f9fa]">
          <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <CategorySidebar
                categoryTree={categoryTree}
                currentCategorySlug={undefined}
              />
              <div className="flex-1 min-w-0">
                <CategoryTopbar
                  totalResults={products.length}
                  categoryName={parentCategory.name}
                />
                {products.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    {products.length > 0 && (
                      <div className="mt-12 flex justify-center">
                        <nav className="flex items-center gap-2">
                          <span className="w-10 h-10 flex items-center justify-center rounded-sm bg-primary text-white font-medium text-sm">
                            1
                          </span>
                          <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-white text-text-secondary hover:bg-primary hover:text-white border border-border-light font-medium text-sm transition-colors">
                            →
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 bg-white border border-border-light rounded-sm shadow-sm">
                    <p className="text-text-secondary text-lg mb-4">
                      No products found in this category yet.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center px-8 py-3 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-primary-dark transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (segments.length === 2) {
    // Sub-category page: /shop/clothing/t-shirts
    const parentCategory = await getCategoryBySlug(segments[0]);
    const childCategory = await getCategoryBySlug(segments[1]);
    if (!parentCategory || !childCategory) notFound();

    const products = await getProductsByCategoryId(childCategory.id);

    return (
      <>
        <div className="bg-[#f5f5f5] py-12 border-b border-border-light text-center">
          <h1 className="font-jost text-4xl md:text-5xl font-bold text-foreground mb-4 uppercase tracking-wide">
            {childCategory.name}
          </h1>
          <nav className="flex items-center justify-center gap-2 text-[15px] font-jost text-text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/shop/${parentCategory.slug}`}
              className="hover:text-primary transition-colors capitalize"
            >
              {parentCategory.name}
            </Link>
            <span>/</span>
            <span className="text-foreground capitalize">
              {childCategory.name}
            </span>
          </nav>
        </div>

        <section className="py-12 md:py-16 bg-[#f8f9fa]">
          <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <CategorySidebar
                categoryTree={categoryTree}
                currentCategorySlug={childCategory.slug}
              />
              <div className="flex-1 min-w-0">
                <CategoryTopbar
                  totalResults={products.length}
                  categoryName={childCategory.name}
                />
                {products.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    {products.length > 0 && (
                      <div className="mt-12 flex justify-center">
                        <nav className="flex items-center gap-2">
                          <span className="w-10 h-10 flex items-center justify-center rounded-sm bg-primary text-white font-medium text-sm">
                            1
                          </span>
                          <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-white text-text-secondary hover:bg-primary hover:text-white border border-border-light font-medium text-sm transition-colors">
                            →
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 bg-white border border-border-light rounded-sm shadow-sm">
                    <p className="text-text-secondary text-lg mb-4">
                      No products found in this category yet.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center px-8 py-3 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-primary-dark transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  notFound();
}
