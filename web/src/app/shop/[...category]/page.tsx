import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  categoryGroups,
  getProductsByGroupSlug,
  getProductsByCategorySlug,
} from "@/lib/products";

interface CategoryPageProps {
  params: Promise<{ category: string[] }>;
}

function getCategoryData(segments: string[]) {
  if (segments.length === 1) {
    // Group page: /shop/clothing
    const groupSlug = segments[0];
    const group = categoryGroups[groupSlug];
    if (!group) return null;
    return {
      type: "group" as const,
      groupSlug,
      group,
      products: getProductsByGroupSlug(groupSlug),
    };
  }

  if (segments.length === 2) {
    // Sub-category page: /shop/clothing/t-shirts
    const [groupSlug, subSlug] = segments;
    const group = categoryGroups[groupSlug];
    if (!group) return null;
    const category = group.categories.find((c) => c.slug === subSlug);
    if (!category) return null;
    return {
      type: "subcategory" as const,
      groupSlug,
      group,
      category,
      products: getProductsByCategorySlug(subSlug),
    };
  }

  return null;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const data = getCategoryData(category);
  if (!data) return { title: "Not Found" };

  if (data.type === "group") {
    return {
      title: `${data.group.name} | AtyrePrint`,
      description: data.group.description,
    };
  }

  return {
    title: `${data.category.name} — ${data.group.name} | AtyrePrint`,
    description: data.category.description,
  };
}

export function generateStaticParams() {
  const paths: { category: string[] }[] = [];

  for (const [groupSlug, group] of Object.entries(categoryGroups)) {
    paths.push({ category: [groupSlug] });
    for (const cat of group.categories) {
      paths.push({ category: [groupSlug, cat.slug] });
    }
  }

  return paths;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const data = getCategoryData(category);
  if (!data) notFound();

  const isGroup = data.type === "group";
  const title = isGroup ? data.group.name : data.category.name;
  const description = isGroup
    ? data.group.description
    : data.category.description;

  return (
    <>
      <PageHeader
        title={title}
        subtitle={description}
        badge={isGroup ? "Shop" : data.group.name}
      />

      <section className="py-16 md:py-20">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            {isGroup ? (
              <>
                <span>/</span>
                <span className="text-foreground font-medium">
                  {data.group.name}
                </span>
              </>
            ) : (
              <>
                <span>/</span>
                <Link
                  href={`/shop/${data.groupSlug}`}
                  className="hover:text-primary transition-colors"
                >
                  {data.group.name}
                </Link>
                <span>/</span>
                <span className="text-foreground font-medium">
                  {data.category.name}
                </span>
              </>
            )}
          </nav>

          {/* Sub-category links (on group pages) */}
          {isGroup && (
            <div className="flex flex-wrap gap-3 mb-10">
              {data.group.categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${data.groupSlug}/${cat.slug}`}
                  className="px-4 py-2 bg-surface rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Product grid */}
          {data.products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg mb-4">
                No products found in this category yet.
              </p>
              <p className="text-text-muted mb-6">
                We&apos;re adding new products regularly. Check back soon!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          )}

          {/* CTA for custom orders */}
          <div className="mt-16 bg-surface rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-jost text-2xl font-bold text-foreground mb-3">
              Need something custom?
            </h3>
            <p className="text-text-secondary mb-6 max-w-lg mx-auto">
              We can customise any product in this range. Upload your design or
              let our team create one for you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/personalise-it"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Design Your Own
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
