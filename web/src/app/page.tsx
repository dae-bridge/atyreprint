import { getHomepageCMS } from "@/lib/settings";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { FeatureBadges } from "@/components/sections/FeatureBadges";
import { TriplePromoBanners } from "@/components/sections/TriplePromoBanners";
import { TwinPromoBanners } from "@/components/sections/TwinPromoBanners";
import { TopCategories } from "@/components/sections/TopCategories";
import { Activities } from "@/components/sections/Activities";
import { TrendingProducts } from "@/components/sections/TrendingProducts";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Testimonials } from "@/components/sections/Testimonials";
import { BrandLogos } from "@/components/sections/BrandLogos";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";

export default async function Home() {
  const cms = await getHomepageCMS();

  return (
    <>
      <HeroBanner heroSlides={cms.heroSlides} />
      <TwinPromoBanners />
      <TopCategories />
      <Activities />
      <TrendingProducts />
      <FeatureBadges featureBadges={cms.featureBadges} />
      <TriplePromoBanners />
      <Testimonials />
      <BrandLogos brandLogos={cms.brandLogos} />
      <NewsletterSignup />
    </>
  );
}
