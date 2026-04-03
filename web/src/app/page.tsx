import { getHomepageCMS } from "@/lib/settings";
import { getProductsByTag } from "@/lib/products";
import { getTestimonials } from "@/lib/content";
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
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";

export default async function Home() {
  const [cms, trendingProducts, dealProducts, testimonials] = await Promise.all(
    [
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
    ],
  );

  return (
    <>
      <HeroBanner heroSlides={cms.heroSlides} />
      <TwinPromoBanners />
      <TopCategories />
      <Activities />
      <TrendingProducts products={trendingProducts} />
      <FeatureBadges featureBadges={cms.featureBadges} />
      <TopDeals products={dealProducts} />
      <TriplePromoBanners />
      <Testimonials testimonials={testimonials} />
      <BrandLogos brandLogos={cms.brandLogos} />
      <NewsletterSignup />
    </>
  );
}
