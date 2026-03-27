import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategorySidebar } from "@/components/shop/CategorySidebar";
import { CategoryTopbar } from "@/components/shop/CategoryTopbar";
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
    
  const currentCategorySlug = isGroup ? undefined : data.category.slug;

  return (
    <>
      {/* 
        Breadcrumb/Page Header 
        Matching the reference site's prominent header container 
      */}
      <div className="bg-[#f5f5f5] py-12 border-b border-border-light text-center">
        <h1 className="font-jost text-4xl md:text-5xl font-bold text-foreground mb-4 uppercase tracking-wide">
          {title}
        </h1>
        <nav className="flex items-center justify-center gap-2 text-[15px] font-jost text-text-secondary">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          {isGroup ? (
            <span className="text-foreground capitalize">{data.group.name}</span>
          ) : (
            <>
              <Link
                href={`/shop/${data.groupSlug}`}
                className="hover:text-primary transition-colors capitalize"
              >
                {data.group.name}
              </Link>
              <span>/</span>
              <span className="text-foreground capitalize">{data.category.name}</span>
            </>
          )}
        </nav>
      </div>

      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar (Left Column) */}
            <CategorySidebar currentCategorySlug={currentCategorySlug} />
            
            {/* Main Content (Right Column) */}
            <div className="flex-1 min-w-0">
              
              {/* Topbar */}
              <CategoryTopbar totalResults={data.products.length} categoryName={title} />
              
              {/* Product Grid */}
              {data.products.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination (Mock UI to match reference) */}
                  {data.products.length > 0 && (
                     <div className="mt-12 flex justify-center">
                        <nav className="flex items-center gap-2">
                           <span className="w-10 h-10 flex items-center justify-center rounded-sm bg-primary text-white font-medium text-sm">1</span>
                           <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-white text-text-secondary hover:bg-primary hover:text-white border border-border-light font-medium text-sm transition-colors">→</button>
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
