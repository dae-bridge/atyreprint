import { Metadata } from "next";
import { searchProducts, searchCategories } from "@/lib/search";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: "${q}"` : "Search",
    description: q
      ? `Search results for "${q}" on AtyrePrint`
      : "Search for custom clothing, gifts, and more on AtyrePrint",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  const [products, categories] = query
    ? await Promise.all([
        searchProducts(query, 24).catch(() => []),
        searchCategories(query, 5).catch(() => []),
      ])
    : [[], []];

  return (
    <section className="py-8 md:py-12 min-h-[60vh]">
      <Container>
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {query ? (
              <>
                Results for &ldquo;<span className="text-primary">{query}</span>
                &rdquo;
              </>
            ) : (
              "Search Products"
            )}
          </h1>
          {query && (
            <p className="text-text-secondary text-sm">
              {products.length} product{products.length !== 1 ? "s" : ""} found
              {categories.length > 0 &&
                ` · ${categories.length} categor${categories.length !== 1 ? "ies" : "y"}`}
            </p>
          )}
        </div>

        {/* Category Matches */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop/${cat.ancestorSlugs?.length > 0 ? [...cat.ancestorSlugs, cat.slug].join("/") : cat.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {cat.name}
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Product Results */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center">
              <Search size={32} className="text-text-muted" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              No results found
            </h2>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try
              a different search term or browse our categories.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-light transition-colors"
            >
              Browse All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center">
              <Search size={32} className="text-text-muted" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              What are you looking for?
            </h2>
            <p className="text-text-secondary max-w-md mx-auto">
              Search for custom t-shirts, hoodies, mugs, tote bags, and more.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
