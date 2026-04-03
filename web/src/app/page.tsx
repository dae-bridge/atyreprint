import { getHomepageCMS } from "@/lib/settings";
import {
  getProductsByTag,
  getCategoryTree,
  getFeaturedProducts,
} from "@/lib/products";
import { getTestimonials } from "@/lib/content";
import { queryDocuments } from "@/lib/firestore";
import type { BlogPost } from "@/types";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { FeatureBadges } from "@/components/sections/FeatureBadges";
import { TriplePromoBanners } from "@/components/sections/TriplePromoBanners";
import { TwinPromoBanners } from "@/components/sections/TwinPromoBanners";
import { TopCategories } from "@/components/sections/TopCategories";
import { Activities } from "@/components/sections/Activities";
import { TrendingProducts } from "@/components/sections/TrendingProducts";
import { TopDeals } from "@/components/sections/TopDeals";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Testimonials } from "@/components/sections/Testimonials";
import { BrandLogos } from "@/components/sections/BrandLogos";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { PurchaseToast } from "@/components/ui/PurchaseToast";

export default async function Home() {
  const [
    cms,
    trendingProducts,
    dealProducts,
    testimonials,
    categoryTree,
    featuredProducts,
    blogPosts,
  ] = await Promise.all([
    getHomepageCMS(),
    getProductsByTag("trending", 8).catch((e) => {
      console.error("[Home] Failed to fetch trending products:", e);
      return [];
    }),
    getProductsByTag("deals", 8).catch((e) => {
      console.error("[Home] Failed to fetch deal products:", e);
      return [];
    }),
    getTestimonials(10).catch((e) => {
      console.error("[Home] Failed to fetch testimonials:", e);
      return [];
    }),
    getCategoryTree().catch((e) => {
      console.error("[Home] Failed to fetch category tree:", e);
      return [];
    }),
    getFeaturedProducts(6).catch((e) => {
      console.error("[Home] Failed to fetch featured products:", e);
      return [];
    }),
    queryDocuments<BlogPost>("blog-posts", {
      filters: [{ field: "status", operator: "==", value: "published" }],
      sortBy: "publishedAt",
      sortDirection: "desc",
      pageSize: 3,
    }).catch((e) => {
      console.error("[Home] Failed to fetch blog posts:", e);
      return [];
    }),
  ]);

  // Split promo banners: first 2 for Twin, next 3 for Triple
  const activePromos = cms.promoBanners
    .filter((b) => b.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const twinPromos = activePromos.slice(0, 2);
  const triplePromos = activePromos.slice(2, 5);

  return (
    <>
      <HeroBanner heroSlides={cms.heroSlides} />
      <TwinPromoBanners
        promoBanners={twinPromos.length >= 2 ? twinPromos : undefined}
      />
      <TopCategories
        categoryTree={categoryTree.length > 0 ? categoryTree : undefined}
      />
      <Activities />
      <TrendingProducts products={trendingProducts} />
      <FeatureBadges featureBadges={cms.featureBadges} />
      <TopDeals products={dealProducts} />
      <TriplePromoBanners
        promoBanners={triplePromos.length >= 3 ? triplePromos : undefined}
      />
      <Testimonials testimonials={testimonials} />
      <BrandLogos brandLogos={cms.brandLogos} />
      <BlogPreview posts={blogPosts.length > 0 ? blogPosts : undefined} />
      <NewsletterSignup />
      <PurchaseToast products={featuredProducts} />
    </>
  );
}
